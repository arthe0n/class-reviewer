/* ═══════════════════════════════════════════════════════════
   ReviewApp · store.js
   localStorage persistence & stats engine
   Keys: reviewapp.v1.*
   ═══════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var App = window.ReviewApp;
  var PREFIX = 'reviewapp.v1.';

  function key(k) { return PREFIX + k; }

  function get(k, fallback) {
    try {
      var raw = localStorage.getItem(key(k));
      if (raw == null) return fallback;
      return JSON.parse(raw);
    } catch (e) {
      return fallback;
    }
  }

  function set(k, val) {
    try {
      localStorage.setItem(key(k), JSON.stringify(val));
      return true;
    } catch (e) {
      console.warn('localStorage write failed', e);
      return false;
    }
  }

  function remove(k) {
    localStorage.removeItem(key(k));
  }

  /* ── Current certification ──────────────────────────────── */
  function getCurrentCert() {
    return get('currentCert', null);
  }

  function setCurrentCert(id) {
    return set('currentCert', id);
  }

  /* ── Answer log ─────────────────────────────────────────── */
  // { id, qId, cert, chapter, tags, correct, type, ts, mode }
  function logAnswer(entry) {
    var log = get('answers', []);
    entry.id = entry.id || App.core.utils.uid();
    entry.ts = entry.ts || Date.now();
    log.push(entry);
    // Cap at 5000
    if (log.length > 5000) log = log.slice(-5000);
    set('answers', log);
    updateStreak();
    return entry;
  }

  function getAnswers(filter) {
    var log = get('answers', []);
    if (!filter) return log;
    return log.filter(function (a) {
      if (filter.cert && a.cert !== filter.cert) return false;
      if (filter.chapter && a.chapter !== filter.chapter) return false;
      if (filter.since && a.ts < filter.since) return false;
      return true;
    });
  }

  /* ── Accuracy helpers ───────────────────────────────────── */
  function accuracyFor(filter) {
    var ans = getAnswers(filter);
    if (!ans.length) return null;
    var correct = ans.filter(function (a) { return a.correct; }).length;
    return Math.round((correct / ans.length) * 100);
  }

  function questionStats(qId) {
    var ans = getAnswers().filter(function (a) { return a.qId === qId; });
    if (!ans.length) return { seen: 0, correct: 0, accuracy: null };
    var correct = ans.filter(function (a) { return a.correct; }).length;
    return {
      seen: ans.length,
      correct: correct,
      accuracy: Math.round((correct / ans.length) * 100)
    };
  }

  function weakQuestions(threshold, cert) {
    threshold = threshold == null ? 60 : threshold;
    var byQ = {};
    (cert ? getAnswers({ cert: cert }) : getAnswers()).forEach(function (a) {
      if (!byQ[a.qId]) byQ[a.qId] = { correct: 0, total: 0, tags: a.tags, cert: a.cert, chapter: a.chapter };
      byQ[a.qId].total++;
      if (a.correct) byQ[a.qId].correct++;
    });
    var weak = [];
    Object.keys(byQ).forEach(function (id) {
      var s = byQ[id];
      var acc = Math.round((s.correct / s.total) * 100);
      if (acc < threshold) weak.push({ qId: id, accuracy: acc, total: s.total, tags: s.tags, cert: s.cert, chapter: s.chapter });
    });
    // Also include never-seen from registry if available
    return weak.sort(function (a, b) { return a.accuracy - b.accuracy; });
  }

  /* ── Streak ─────────────────────────────────────────────── */
  function updateStreak() {
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    var todayTs = today.getTime();
    var data = get('streak', { last: null, count: 0, best: 0 });
    if (data.last === todayTs) return data;
    var yesterday = todayTs - 86400000;
    if (data.last === yesterday) {
      data.count += 1;
    } else if (data.last !== todayTs) {
      data.count = 1;
    }
    data.last = todayTs;
    if (data.count > data.best) data.best = data.count;
    set('streak', data);
    return data;
  }

  function getStreak() {
    return get('streak', { last: null, count: 0, best: 0 });
  }

  /* ── Activity (14-day) ──────────────────────────────────── */
  function getActivity(days, cert) {
    days = days || 14;
    var ans = cert ? getAnswers({ cert: cert }) : getAnswers();
    var map = {};
    var now = new Date();
    now.setHours(0, 0, 0, 0);
    for (var i = days - 1; i >= 0; i--) {
      var d = new Date(now.getTime() - i * 86400000);
      map[d.getTime()] = { count: 0, correct: 0 };
    }
    ans.forEach(function (a) {
      var d = new Date(a.ts);
      d.setHours(0, 0, 0, 0);
      var k = d.getTime();
      if (map[k]) {
        map[k].count++;
        if (a.correct) map[k].correct++;
      }
    });
    return Object.keys(map).sort().map(function (k) {
      return { date: Number(k), count: map[k].count, correct: map[k].correct };
    });
  }

  /* ── Exam history ───────────────────────────────────────── */
  function saveExamAttempt(attempt) {
    var hist = get('exams', []);
    attempt.id = attempt.id || App.core.utils.uid();
    attempt.ts = attempt.ts || Date.now();
    hist.unshift(attempt);
    if (hist.length > 100) hist = hist.slice(0, 100);
    set('exams', hist);
    return attempt;
  }

  function getExams(cert) {
    var hist = get('exams', []);
    if (!cert) return hist;
    return hist.filter(function (e) { return e.cert === cert; });
  }

  /* ── Labs completed ─────────────────────────────────────── */
  function markLabComplete(labId) {
    var done = get('labsDone', {});
    done[labId] = Date.now();
    set('labsDone', done);
  }

  function isLabDone(labId) {
    var done = get('labsDone', {});
    return !!done[labId];
  }

  /* ── Lab step completion ────────────────────────────────── */
  // Single source of truth for per-step completion, kept in sync with the
  // same persistence pattern as `labsDone`. Key format: '<labId>:<stepIndex>'.
  function stepKey(labId, stepIndex) {
    return labId + ':' + stepIndex;
  }

  function markStepDone(labId, stepIndex) {
    var done = get('labStepsDone', {});
    done[stepKey(labId, stepIndex)] = Date.now();
    set('labStepsDone', done);
  }

  function isStepDone(labId, stepIndex) {
    var done = get('labStepsDone', {});
    return !!done[stepKey(labId, stepIndex)];
  }

  // Idempotent: removing a step that was never completed is a no-op.
  function unmarkStepDone(labId, stepIndex) {
    var done = get('labStepsDone', {});
    var k = stepKey(labId, stepIndex);
    if (done[k]) {
      delete done[k];
      set('labStepsDone', done);
    }
  }

  function labsCompletedCount(cert) {
    var keys = Object.keys(get('labsDone', {}));
    if (!cert) return keys.length;
    return keys.filter(function (k) { return k.indexOf(cert + ':') === 0; }).length;
  }

  /* ── Flashcard Leitner state ────────────────────────────── */
  // cardKey -> { box: 1-5, lastSeen: ts, nextDue: ts }
  function getCardState(cardKey) {
    var all = get('leitner', {});
    return all[cardKey] || { box: 1, lastSeen: 0, nextDue: 0 };
  }

  function setCardState(cardKey, state) {
    var all = get('leitner', {});
    all[cardKey] = state;
    set('leitner', all);
  }

  // Intervals in days by box (after grading Good)
  var BOX_INTERVALS = [0, 1, 3, 7, 14, 30]; // index = box

  function gradeCard(cardKey, grade) {
    // grade: 'again' | 'good' | 'easy'
    var st = getCardState(cardKey);
    var now = Date.now();
    if (grade === 'again') {
      st.box = 1;
      st.nextDue = now; // due immediately
    } else if (grade === 'good') {
      st.box = Math.min(5, (st.box || 1) + 1);
      st.nextDue = now + BOX_INTERVALS[st.box] * 86400000;
    } else if (grade === 'easy') {
      st.box = Math.min(5, (st.box || 1) + 2);
      st.nextDue = now + BOX_INTERVALS[st.box] * 86400000;
    }
    st.lastSeen = now;
    setCardState(cardKey, st);
    return st;
  }

  function cardsDue(keys) {
    var now = Date.now();
    return (keys || []).filter(function (k) {
      var st = getCardState(k);
      return !st.nextDue || st.nextDue <= now;
    });
  }

  function cardsDueCount(cert) {
    if (!App.content) return 0;
    var cards = cert ? App.content.getByCert('flashcards', cert) : App.content.getAll('flashcards');
    var keys = cards.map(function (c) { return c._key; });
    return cardsDue(keys).length;
  }

  /* ── Flashcard review log ───────────────────────────────── */
  // Per-attempt record: { cardId, cert, chapter, tags, outcome, sessionId, sessionTs, attempt, ts }
  function logCardReview(entry) {
    var log = get('cardReviews', []);
    entry.id = entry.id || App.core.utils.uid();
    entry.ts = entry.ts || Date.now();
    log.push(entry);
    if (log.length > 20000) log = log.slice(-20000);
    set('cardReviews', log);
    return entry;
  }

  function getCardReviews(filter) {
    var log = get('cardReviews', []);
    if (!filter) return log;
    return log.filter(function (r) {
      if (filter.cert && r.cert !== filter.cert) return false;
      if (filter.chapter && r.chapter !== filter.chapter) return false;
      if (filter.since && r.ts < filter.since) return false;
      if (filter.until && r.ts > filter.until) return false;
      if (filter.sessionId && r.sessionId !== filter.sessionId) return false;
      return true;
    });
  }

  /* ── Flashcard session state (resume across refresh) ────── */
  function saveFlashSession(state) {
    if (state) set('flashSession', state);
    else remove('flashSession');
  }

  function getFlashSession() {
    return get('flashSession', null);
  }

  function clearFlashSession() {
    remove('flashSession');
  }

  /* ── Flashcard session history ──────────────────────────── */
  function saveFlashSessionSummary(summary) {
    var hist = get('flashSessions', []);
    hist.unshift(summary);
    if (hist.length > 200) hist = hist.slice(0, 200);
    set('flashSessions', hist);
    return summary;
  }

  function getFlashSessions() {
    return get('flashSessions', []);
  }

  /* ── Flashcard weak-area analytics ──────────────────────── */
  function aggregateCardReviews(reviews) {
    var topics = {};
    reviews.forEach(function (r) {
      var tags = (r.tags && r.tags.length) ? r.tags : ['(untagged)'];
      tags.forEach(function (tag) {
        var key = (r.cert || '') + '\u0000' + (r.chapter || '') + '\u0000' + tag;
        var g = topics[key] || (topics[key] = {
          cert: r.cert || null,
          chapter: r.chapter || null,
          tag: tag,
          attempts: 0, agains: 0,
          cards: {}, sessions: {},
          firstTs: Infinity, lastTs: 0
        });
        g.attempts++;
        if (r.outcome === 'again') g.agains++;
        if (r.cardId) g.cards[r.cardId] = true;
        if (r.sessionId) g.sessions[r.sessionId] = true;
        if (r.ts < g.firstTs) g.firstTs = r.ts;
        if (r.ts > g.lastTs) g.lastTs = r.ts;
      });
    });
    return topics;
  }

  function flashcardWeakAreas(opts) {
    opts = opts || {};
    var days = opts.days || 7;
    var now = Date.now();
    var recentSince = now - days * 86400000;
    var olderSince = recentSince - days * 86400000;

    var recent = aggregateCardReviews(getCardReviews({ since: recentSince }));
    var older = aggregateCardReviews(getCardReviews({ since: olderSince, until: recentSince }));

    var list = [];
    Object.keys(recent).forEach(function (key) {
      var g = recent[key];
      if (opts.cert && g.cert !== opts.cert) return; // scope to the active certification
      if (!g.agains) return; // only topics with actual difficulty are weak areas
      var ratio = g.attempts ? g.agains / g.attempts : 0;
      var cards = Object.keys(g.cards).length;
      var sessions = Object.keys(g.sessions).length;
      var daysSince = Math.max(0, (now - g.lastTs) / 86400000);
      var recency = 1 / (1 + daysSince * 0.35);

      // Recent improvement: fewer Again per attempt now than previously.
      var old = older[key];
      var improving = false;
      if (old && old.attempts) {
        improving = ratio < (old.agains / old.attempts);
      }

      var difficulty = g.agains * 2 + cards * 3 + sessions * 2;
      var score = difficulty * (1 + ratio) * recency * (improving ? 0.6 : 1);

      list.push({
        cert: g.cert,
        chapter: g.chapter,
        tag: g.tag,
        agains: g.agains,
        attempts: g.attempts,
        ratio: Math.round(ratio * 100),
        cards: cards,
        sessions: sessions,
        daysSince: Math.round(daysSince),
        improving: improving,
        score: score
      });
    });

    return list.sort(function (a, b) { return b.score - a.score; });
  }

  function weeklyReviewRecommendations(limit, cert) {
    return flashcardWeakAreas({ days: 7, cert: cert || undefined }).slice(0, limit || 5);
  }

  /* ── Personal notes ─────────────────────────────────────── */
  function getPersonalNotes() {
    return get('personalNotes', []);
  }

  function savePersonalNote(note) {
    var notes = getPersonalNotes();
    if (note.id) {
      var idx = notes.findIndex(function (n) { return n.id === note.id; });
      if (idx >= 0) notes[idx] = note;
      else notes.push(note);
    } else {
      note.id = App.core.utils.uid();
      note.created = Date.now();
      notes.push(note);
    }
    note.updated = Date.now();
    set('personalNotes', notes);
    return note;
  }

  function deletePersonalNote(id) {
    var notes = getPersonalNotes().filter(function (n) { return n.id !== id; });
    set('personalNotes', notes);
  }

  /* ── Settings ───────────────────────────────────────────── */
  function getSettings() {
    return get('settings', {
      theme: 'monokai',
      textSize: 'medium',
      animations: true,
      passThreshold: { 'linux-plus': 70, 'network-plus': 70 },
      lastStudy: null
    });
  }

  function saveSettings(s) {
    set('settings', s);
  }

  function setLastStudy(info) {
    var s = getSettings();
    s.lastStudy = info;
    saveSettings(s);
  }

  /* ── Time on task (rough) ───────────────────────────────── */
  function addTimeOnTask(ms) {
    var t = get('timeOnTask', 0);
    set('timeOnTask', t + ms);
  }

  function getTimeOnTask() {
    return get('timeOnTask', 0);
  }

  /* ── Content snapshot (deep-scan) ───────────────────────── */
  function saveContentSnapshot(data) {
    set('contentSnapshot', data);
  }

  function getContentSnapshot() {
    return get('contentSnapshot', null);
  }

  /* ── Export / Import / Wipe ─────────────────────────────── */
  function exportFullBackup() {
    var data = {
      version: 1,
      exported: Date.now(),
      currentCert: get('currentCert', null),
      answers: get('answers', []),
      streak: get('streak', {}),
      exams: get('exams', []),
      labsDone: get('labsDone', {}),
      labStepsDone: get('labStepsDone', {}),
      leitner: get('leitner', {}),
      cardReviews: get('cardReviews', []),
      flashSessions: get('flashSessions', []),
      personalNotes: get('personalNotes', []),
      settings: get('settings', {}),
      timeOnTask: get('timeOnTask', 0)
    };
    return data;
  }

  function importFullBackup(data) {
    if (!data || data.version !== 1) throw new Error('Invalid backup format');
    if (data.currentCert) set('currentCert', data.currentCert);
    if (data.answers) set('answers', data.answers);
    if (data.streak) set('streak', data.streak);
    if (data.exams) set('exams', data.exams);
    if (data.labsDone) set('labsDone', data.labsDone);
    if (data.labStepsDone) set('labStepsDone', data.labStepsDone);
    if (data.leitner) set('leitner', data.leitner);
    if (data.cardReviews) set('cardReviews', data.cardReviews);
    if (data.flashSessions) set('flashSessions', data.flashSessions);
    if (data.personalNotes) set('personalNotes', data.personalNotes);
    if (data.settings) set('settings', data.settings);
    if (data.timeOnTask != null) set('timeOnTask', data.timeOnTask);
  }

  function wipeProgress() {
    ['answers', 'streak', 'exams', 'labsDone', 'labStepsDone', 'leitner', 'cardReviews', 'flashSessions', 'flashSession', 'timeOnTask'].forEach(remove);
  }

  function exportAnswersCSV(cert) {
    var ans = cert ? getAnswers({ cert: cert }) : getAnswers();
    var header = 'id,qId,cert,chapter,tags,correct,type,ts,mode\n';
    var rows = ans.map(function (a) {
      return [
        a.id,
        a.qId,
        a.cert,
        JSON.stringify(a.chapter || ''),
        JSON.stringify((a.tags || []).join(';')),
        a.correct ? 1 : 0,
        a.type || '',
        a.ts,
        a.mode || ''
      ].join(',');
    });
    return header + rows.join('\n');
  }

  /* ── Aggregate stats for dashboard ──────────────────────── */
  function getDashboardStats(cert) {
    var ans = cert ? getAnswers({ cert: cert }) : getAnswers();
    var total = ans.length;
    var correct = ans.filter(function (a) { return a.correct; }).length;
    var accuracy = total ? Math.round((correct / total) * 100) : 0;
    var streak = getStreak();
    return {
      totalAnswered: total,
      accuracy: accuracy,
      streakDays: streak.count || 0,
      cardsDue: cardsDueCount(cert),
      labsDone: labsCompletedCount(cert),
      timeOnTask: getTimeOnTask()
    };
  }

  App.store = {
    get: get,
    set: set,
    remove: remove,
    getCurrentCert: getCurrentCert,
    setCurrentCert: setCurrentCert,
    logAnswer: logAnswer,
    getAnswers: getAnswers,
    accuracyFor: accuracyFor,
    questionStats: questionStats,
    weakQuestions: weakQuestions,
    updateStreak: updateStreak,
    getStreak: getStreak,
    getActivity: getActivity,
    saveExamAttempt: saveExamAttempt,
    getExams: getExams,
    markLabComplete: markLabComplete,
    isLabDone: isLabDone,
    labsCompletedCount: labsCompletedCount,
    markStepDone: markStepDone,
    isStepDone: isStepDone,
    unmarkStepDone: unmarkStepDone,
    getCardState: getCardState,
    setCardState: setCardState,
    gradeCard: gradeCard,
    cardsDue: cardsDue,
    cardsDueCount: cardsDueCount,
    logCardReview: logCardReview,
    getCardReviews: getCardReviews,
    saveFlashSession: saveFlashSession,
    getFlashSession: getFlashSession,
    clearFlashSession: clearFlashSession,
    saveFlashSessionSummary: saveFlashSessionSummary,
    getFlashSessions: getFlashSessions,
    flashcardWeakAreas: flashcardWeakAreas,
    weeklyReviewRecommendations: weeklyReviewRecommendations,
    getPersonalNotes: getPersonalNotes,
    savePersonalNote: savePersonalNote,
    deletePersonalNote: deletePersonalNote,
    getSettings: getSettings,
    saveSettings: saveSettings,
    setLastStudy: setLastStudy,
    addTimeOnTask: addTimeOnTask,
    getTimeOnTask: getTimeOnTask,
    saveContentSnapshot: saveContentSnapshot,
    getContentSnapshot: getContentSnapshot,
    exportFullBackup: exportFullBackup,
    importFullBackup: importFullBackup,
    wipeProgress: wipeProgress,
    exportAnswersCSV: exportAnswersCSV,
    getDashboardStats: getDashboardStats
  };
})();
