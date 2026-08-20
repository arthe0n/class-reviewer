/* ═══════════════════════════════════════════════════════════
   ReviewApp · quiz.js
   Quiz engine (5 modes) + Exam simulation
   ═══════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var App = window.ReviewApp;
  var utils = App.core.utils;
  var el = utils.el;

  function inlineHtml(value) {
    return App.markdown.renderInline(value == null ? '' : String(value));
  }

  /* ── Helpers ────────────────────────────────────────────── */
  // `match` is the generic authoring type. `command_match` remains a legacy
  // alias so existing content and saved sessions continue to work.
  function isMatchQuestion(q) {
    return !!q && (q.type === 'match' || q.type === 'command_match');
  }

  function pairItem(pair) {
    return pair && pair.item != null ? pair.item : (pair && pair.option != null ? pair.option : '');
  }

  // Validate/normalize a generic item-to-counterpart question's pairs.
  // Canonical pairs use { item, match }; option/description is accepted for
  // legacy command_match content. Returns null when the question is malformed.
  function sanitizeMatch(q) {
    if (!q || typeof q !== 'object') return null;
    var legacy = q.type === 'command_match';
    var command = String(q.command == null ? '' : q.command).trim();
    if (legacy && !command) return null;
    var pairs = Array.isArray(q.pairs) ? q.pairs : [];
    var seenItems = Object.create(null);
    var seenMatches = Object.create(null);
    var clean = [];
    pairs.forEach(function (p) {
      if (!p || typeof p !== 'object') return;
      var itemValue = p.item != null ? p.item : (p.left != null ? p.left : p.option);
      var matchValue = p.match != null ? p.match : (p.right != null ? p.right : p.description);
      var item = String(itemValue == null ? '' : itemValue).trim();
      var match = String(matchValue == null ? '' : matchValue).trim();
      if (!item || !match) return; // drop pairs missing a side
      var itemKey = item.toLowerCase();
      var matchKey = match.toLowerCase();
      if (seenItems[itemKey] || seenMatches[matchKey]) return; // drop duplicates
      seenItems[itemKey] = true;
      seenMatches[matchKey] = true;
      clean.push({ item: item, match: match });
    });
    if (clean.length < 2) return null; // nothing meaningful to match
    return clean;
  }

  // Public compatibility name retained for callers that used the old helper.
  // Keep its old return shape while the generic engine uses { item, match }.
  function sanitizeCommandMatch(q) {
    var clean = sanitizeMatch(q);
    return clean && clean.map(function (pair) {
      return { option: pair.item, description: pair.match };
    });
  }

  // Multi questions are authored with a variable number of correct choices,
  // but every question must leave at least one distractor. Reject malformed
  // content instead of silently treating duplicate, out-of-range, or all-
  // options answers as valid. This keeps a bad generated question from
  // teaching the learner that selecting everything is a safe strategy.
  function isValidMultiAnswer(q) {
    var options = Array.isArray(q && q.options) ? q.options : [];
    var answer = Array.isArray(q && q.answer) ? q.answer : [];
    if (!options.length || answer.length < 1 || answer.length > 4 || answer.length >= options.length) return false;
    var seen = {};
    return answer.every(function (index) {
      if (!Number.isInteger(index) || index < 0 || index >= options.length || seen[index]) return false;
      seen[index] = true;
      return true;
    });
  }

  function prepareQuestion(raw) {
    var q = Object.assign({}, raw);
    q._origAnswer = q.answer;
    if (isMatchQuestion(q)) {
      var pairs = sanitizeMatch(q);
      if (!pairs) {
        q._invalid = true;
      } else {
        q._pairs = pairs;
        q._shuffledPairs = utils.shuffle(pairs);
        var matches = utils.shuffle(pairs.map(function (p) { return p.match; }));
        q._shuffledMatches = matches;
        q._correctMatchIdx = q._shuffledPairs.map(function (p) { return matches.indexOf(p.match); });
        // Retain the old field names for persisted sessions and callers that
        // still inspect command_match questions directly.
        q._shuffledDescs = matches;
        q._correctDescIdx = q._correctMatchIdx;
        q._matchContext = String(q.context == null ? (q.command == null ? '' : q.command) : q.context).trim();
        q._matchLabel = q.command ? 'COMMAND' : String(q.contextLabel || 'MATCHING').trim();
      }
    } else if (q.type === 'mcq' || q.type === 'multi') {
      var opts = (q.options || []).map(function (o, i) { return { text: o, origIdx: i }; });
      opts = utils.shuffle(opts);
      q._shuffledOptions = opts;
      if (q.type === 'mcq') {
        q._correctShuffled = opts.findIndex(function (o) { return o.origIdx === q.answer; });
      } else {
        if (!isValidMultiAnswer(q)) {
          q._invalid = true;
          q._invalidReason = 'Multi questions need 1–4 distinct correct choices and at least one distractor.';
          q._correctShuffled = [];
          return q;
        }
        var ansSet = {};
        q.answer.forEach(function (i) { ansSet[i] = true; });
        q._correctShuffled = opts.reduce(function (acc, o, i) {
          if (ansSet[o.origIdx]) acc.push(i);
          return acc;
        }, []);
      }
    }
    return q;
  }

  function checkAnswer(q, userAnswer) {
    if (!q || q._invalid) return false;
    if (q.type === 'mcq') {
      return userAnswer === q._correctShuffled;
    }
    if (q.type === 'multi') {
      var correct = (q._correctShuffled || []).slice().sort().join(',');
      var given = (userAnswer || []).slice().sort().join(',');
      return correct === given;
    }
    if (q.type === 'tf') {
      return userAnswer === q.answer;
    }
    if (q.type === 'fill') {
      return acceptedAnswerForms(q).indexOf(normalizeAnswer(userAnswer)) >= 0;
    }
    if (isMatchQuestion(q)) {
      if (q._invalid || !Array.isArray(userAnswer)) return false;
      var correct = q._correctMatchIdx || q._correctDescIdx || [];
      if (userAnswer.length !== correct.length) return false;
      // One wrong match makes the whole question wrong (consistent with multi)
      return correct.every(function (c, i) {
        return Number(userAnswer[i]) === c;
      });
    }
    return false;
  }

  /* ── Fill-answer matching ──────────────────────────────── */
  // Central normalization + accepted-form resolution for free-text answers.
  // Matching is deliberately permissive for legitimate equivalents but never
  // substring- or fuzzy-based: an answer only passes when it equals one of
  // the accepted forms after normalization. Accepted forms come from:
  //   1. the canonical `answer` itself;
  //   2. an acronym written as "Full Name (ACR)" — both the full name alone
  //      and the acronym alone are accepted;
  //   3. the optional `accepts` array on the question (acronyms, synonyms,
  //      alternate spellings declared explicitly by the content).
  // All forms are compared case-insensitively with inner whitespace collapsed.

  // Lowercase, trim, and collapse runs of whitespace (spaces/tabs/newlines)
  // to single spaces, so "  Certificate   Authority\n" == "certificate authority".
  function normalizeAnswer(s) {
    return String(s == null ? '' : s).trim().replace(/\s+/g, ' ').toLowerCase();
  }

  // "Certificate Authority (CA)" -> { full: "Certificate Authority", acronym: "ca" }.
  // Only a trailing parenthetical of all-caps letters/digits (2+) counts as an
  // acronym; prose parentheticals like "(in most cases)" do not.
  function splitAnswerAcronym(answer) {
    var m = String(answer == null ? '' : answer).match(/^(.*?)\s*\(([A-Z0-9]{2,})\)\s*$/);
    return m ? { full: m[1], acronym: m[2].toLowerCase() } : null;
  }

  // Every normalized string the engine will accept for a fill question.
  function acceptedAnswerForms(q) {
    var forms = [String(q.answer == null ? '' : q.answer)];
    var parts = splitAnswerAcronym(q.answer);
    if (parts) {
      forms.push(parts.full);
      forms.push(parts.acronym);
    }
    (q.accepts || []).forEach(function (a) { forms.push(a); });
    return forms.map(normalizeAnswer).filter(function (f) { return f !== ''; });
  }

  /* ── Quiz session state ─────────────────────────────────── */
  var session = null;

  function startQuiz(config) {
    // config: { mode, cert, certs, chapter, tags, count, questions }
    var questions = config.questions || [];
    if (!questions.length) {
      App.toast('No questions match your criteria', 'error');
      return null;
    }
    questions = utils.shuffle(questions).map(prepareQuestion).filter(function (q) { return !q._invalid; });
    if (!questions.length) {
      App.toast('No valid questions match your criteria', 'error');
      return null;
    }
    if (config.count && config.count < questions.length) {
      questions = questions.slice(0, config.count);
    }
    session = {
      mode: config.mode || 'random',
      cert: config.cert || (questions[0] && questions[0]._cert) || null,
      questions: questions,
      index: 0,
      answers: [], // { qId, correct, userAnswer }
      startTime: Date.now(),
      speedLimit: config.speedLimit || null, // seconds per Q for speed run
      speedTimer: null,
      speedRemaining: null
    };
    App.store.setLastStudy({ type: 'quiz', mode: session.mode, cert: session.cert, ts: Date.now() });
    App.store.saveQuizSession(session);
    return session;
  }

  function currentQ() {
    if (!session) return null;
    return session.questions[session.index];
  }

  function submitAnswer(userAnswer) {
    if (!session) return null;
    var q = currentQ();
    var correct = checkAnswer(q, userAnswer);
    session.answers.push({
      qId: q._id,
      correct: correct,
      userAnswer: userAnswer,
      question: q
    });
    // Answers are recorded in the session only. They are written to the stats
    // log when the quiz finishes (see endQuiz), so an abandoned quiz never
    // counts toward statistics.
    if (session.speedTimer) {
      clearInterval(session.speedTimer);
      session.speedTimer = null;
    }
    App.store.saveQuizSession(session);
    return { correct: correct, q: q };
  }

  function nextQuestion() {
    if (!session) return false;
    if (session.index < session.questions.length - 1) {
      session.index++;
      App.store.saveQuizSession(session);
      return true;
    }
    return false;
  }

  function skipQuestion() {
    if (!session) return;
    var q = currentQ();
    session.answers.push({ qId: q._id, correct: false, userAnswer: null, skipped: true, question: q });
    App.store.saveQuizSession(session);
    return nextQuestion();
  }

  function endQuiz() {
    if (!session) return null;
    var result = {
      mode: session.mode,
      total: session.questions.length,
      answered: session.answers.length,
      correct: session.answers.filter(function (a) { return a.correct; }).length,
      timeMs: Date.now() - session.startTime,
      answers: session.answers,
      questions: session.questions
    };
    result.score = result.total ? Math.round((result.correct / result.total) * 100) : 0;
    // per-tag
    var tagMap = {};
    session.answers.forEach(function (a) {
      (a.question.tags || []).forEach(function (t) {
        if (!tagMap[t]) tagMap[t] = { correct: 0, total: 0 };
        tagMap[t].total++;
        if (a.correct) tagMap[t].correct++;
      });
    });
    result.tagBreakdown = Object.keys(tagMap).map(function (t) {
      return { tag: t, correct: tagMap[t].correct, total: tagMap[t].total, pct: Math.round((tagMap[t].correct / tagMap[t].total) * 100) };
    });

    // Commit the completed quiz's answers to the stats log. Answers are held
    // back while the quiz is in progress, so only finished quizzes count.
    session.answers.forEach(function (a) {
      var q = a.question || {};
      App.store.logAnswer({
        qId: a.qId,
        cert: q._cert,
        chapter: q._chapter,
        tags: q.tags || [],
        correct: a.correct,
        type: q.type,
        mode: session.mode + (a.skipped ? ':skip' : '')
      });
    });

    App.store.addTimeOnTask(result.timeMs);
    App.store.clearQuizSession();
    session = null;
    return result;
  }

  /* ── Build question pool by mode ────────────────────────── */
  // Every mode operates inside the active certification (opts.cert). The
  // historical multi-cert 'random' picker is retired: pools are scoped first.
  function buildPool(mode, opts) {
    opts = opts || {};
    var all = App.content.getAll('questions');
    if (opts.cert) {
      all = all.filter(function (q) { return q._cert === opts.cert; });
    }
    if (mode === 'chapter') {
      return all.filter(function (q) {
        return (!opts.chapter || q._chapter === opts.chapter);
      });
    }
    if (mode === 'theme') {
      var tags = opts.tags || [];
      if (!tags.length) return all;
      return all.filter(function (q) {
        return (q.tags || []).some(function (t) { return tags.indexOf(t) >= 0; });
      });
    }
    if (mode === 'weak') {
      var weak = App.store.weakQuestions(60, opts.cert);
      var weakIds = {};
      weak.forEach(function (w) { weakIds[w.qId] = true; });
      var seen = {};
      (opts.cert ? App.store.getAnswers({ cert: opts.cert }) : App.store.getAnswers()).forEach(function (a) { seen[a.qId] = true; });
      return all.filter(function (q) {
        return weakIds[q._id] || !seen[q._id];
      });
    }
    if (mode === 'speed') {
      return utils.shuffle(all).slice(0, 10);
    }
    return all;
  }

  /* ── Generic matching UI builder ────────────────────────── */
  // Shared by the quiz player, exam player and single-question modal.
  // Renders an optional context banner plus one row per item with a <select>
  // of shuffled counterparts. Returns { lock } for answer feedback.
  function renderMatchUI(container, q, opts) {
    opts = opts || {};
    var context = q._matchContext || q.context || q.command || '';
    var label = q._matchLabel || (q.command ? 'COMMAND' : 'MATCHING');
    var banner = el('div', { className: 'match-context' }, [
      el('span', { className: 'match-context-label', text: label }),
      el('span', { className: 'match-context-name', html: inlineHtml(context || 'Related items') })
    ]);
    container.appendChild(banner);

    var rows = el('div', { className: 'match-pairs' });
    var selects = [];
    var initial = Array.isArray(opts.initial) ? opts.initial : [];
    var matches = q._shuffledMatches || q._shuffledDescs || [];
    q._shuffledPairs.forEach(function (pair, i) {
      var item = pairItem(pair);
      var row = el('div', { className: 'match-row' });
      row.appendChild(el('span', { className: 'match-item', html: inlineHtml(item) }));
      var sel = el('select', {
        className: 'form-control match-select',
        'aria-label': 'Match ' + item + ' with its counterpart'
      });
      sel.appendChild(el('option', { value: '', text: '— choose counterpart —' }));
      matches.forEach(function (match, j) {
        sel.appendChild(el('option', { value: String(j), html: inlineHtml(match) }));
      });
      if (initial[i] != null) sel.value = String(initial[i]);
      sel.addEventListener('change', function () {
        if (opts.onChange) opts.onChange(read());
      });
      selects.push(sel);
      row.appendChild(sel);
      rows.appendChild(row);
    });
    container.appendChild(rows);

    function read() {
      return selects.map(function (s) {
        return s.value === '' ? null : Number(s.value);
      });
    }

    var submitBtn = null;

    function lock() {
      selects.forEach(function (s) { s.disabled = true; });
      if (submitBtn) submitBtn.disabled = true;
      q._shuffledPairs.forEach(function (pair, i) {
        var row = rows.children[i];
        var chosen = selects[i].value;
        var correctIdx = (q._correctMatchIdx || q._correctDescIdx || [])[i];
        if (String(correctIdx) === chosen) {
          row.classList.add('correct');
        } else {
          row.classList.add('wrong');
          row.appendChild(el('span', {
            className: 'match-correct',
            html: inlineHtml('→ ' + matches[correctIdx])
          }));
        }
      });
    }

    if (opts.submitLabel) {
      submitBtn = el('button', {
        className: 'btn btn-primary mt-1',
        text: opts.submitLabel,
        onClick: function () {
          if (opts.locked) return;
          var arr = read();
          if (arr.some(function (v) { return v == null; })) {
            App.toast('Match every item before submitting', 'error');
            return;
          }
          opts.onSubmit(arr);
        }
      });
      container.appendChild(submitBtn);
    }

    return { lock: lock, read: read, selects: selects };
  }

  // Public compatibility alias for callers that used the command-specific name.
  var renderCommandMatchUI = renderMatchUI;

  /* ── Render single question (for search modal) ──────────── */
  function renderSingle(container, rawQ) {
    var q = prepareQuestion(rawQ);
    var answered = false;
    container.appendChild(el('div', { className: 'question-text', html: App.markdown.renderInline(q.q || '') }));
    var optsWrap = el('div', { className: 'options-list' });

    function finish(correct, explain) {
      answered = true;
      optsWrap.querySelectorAll('.option-btn').forEach(function (b) { b.disabled = true; });
      var exp = el('div', { className: 'explain-panel' }, [
        el('strong', { text: correct ? 'Correct. ' : 'Incorrect. ' }),
        el('span', { html: App.markdown.renderInline(explain || q.explain || '') })
      ]);
      container.appendChild(exp);
      App.store.logAnswer({
        qId: q._id,
        cert: q._cert,
        chapter: q._chapter,
        tags: q.tags || [],
        correct: correct,
        type: q.type,
        mode: 'practice'
      });
    }

    if (q._invalid) {
      optsWrap.appendChild(el('div', { className: 'empty-state', style: { padding: '1rem' } }, [
        el('h3', { text: 'Question unavailable' }),
        el('p', { text: q._invalidReason || 'This question has invalid answer data and was not shown.' })
      ]));
    } else if (q.type === 'mcq' || q.type === 'tf') {
      var options = q.type === 'tf'
        ? [{ text: 'True', origIdx: true }, { text: 'False', origIdx: false }]
        : q._shuffledOptions;
      options.forEach(function (opt, i) {
        var key = String.fromCharCode(65 + i);
        var btn = el('button', {
          className: 'option-btn',
          onClick: function () {
            if (answered) return;
            var correct = q.type === 'tf' ? (opt.origIdx === q.answer) : (i === q._correctShuffled);
            btn.classList.add(correct ? 'correct' : 'wrong');
            if (!correct && q.type === 'mcq') {
              var correctBtn = optsWrap.children[q._correctShuffled];
              if (correctBtn) correctBtn.classList.add('correct');
            }
            finish(correct, q.explain);
          }
        }, [
          el('span', { className: 'option-key', text: key }),
          el('span', { html: inlineHtml(opt.text) })
        ]);
        optsWrap.appendChild(btn);
      });
    } else if (q.type === 'fill') {
      var input = el('input', { className: 'form-control', type: 'text', placeholder: 'Type your answer…' });
      var submit = el('button', {
        className: 'btn btn-primary mt-1',
        text: 'Check',
        onClick: function () {
          if (answered) return;
          var correct = checkAnswer(q, input.value);
          finish(correct, q.explain);
        }
      });
      optsWrap.appendChild(input);
      optsWrap.appendChild(submit);
    } else if (q.type === 'multi') {
      var selected = {};
      q._shuffledOptions.forEach(function (opt, i) {
        var key = String.fromCharCode(65 + i);
        var btn = el('button', {
          className: 'option-btn',
          onClick: function () {
            if (answered) return;
            selected[i] = !selected[i];
            btn.style.borderColor = selected[i] ? 'var(--accent-cyan)' : '';
          }
        }, [
          el('span', { className: 'option-key', text: key }),
          el('span', { html: inlineHtml(opt.text) })
        ]);
        optsWrap.appendChild(btn);
      });
      optsWrap.appendChild(el('button', {
        className: 'btn btn-primary mt-1',
        text: 'Submit',
        onClick: function () {
          if (answered) return;
          var ua = Object.keys(selected).filter(function (k) { return selected[k]; }).map(Number);
          var correct = checkAnswer(q, ua);
          optsWrap.querySelectorAll('.option-btn').forEach(function (b, i) {
            if ((q._correctShuffled || []).indexOf(i) >= 0) b.classList.add('correct');
            else if (selected[i]) b.classList.add('wrong');
          });
          finish(correct, q.explain);
        }
      }));
    } else if (isMatchQuestion(q)) {
      if (q._invalid) {
        optsWrap.appendChild(el('div', { className: 'empty-state', style: { padding: '1rem' } }, [
          el('h3', { text: 'Question unavailable' }),
          el('p', { text: 'This matching question is missing required data (pairs or a valid counterpart on each side).' })
        ]));
      } else {
        var ui = renderMatchUI(optsWrap, q, {
          submitLabel: 'Check',
          onSubmit: function (arr) {
            if (answered) return;
            ui.lock();
            finish(checkAnswer(q, arr), q.explain);
          }
        });
      }
    }
    container.appendChild(optsWrap);
  }

  /* ── Exam simulation ────────────────────────────────────── */
  var examSession = null;

  function startExam(config) {
    var pool = App.content.getByCert('questions', config.cert);
    if (!pool.length) {
      App.toast('No questions for this cert', 'error');
      return null;
    }
    var questions = utils.shuffle(pool).map(prepareQuestion).filter(function (q) { return !q._invalid; });
    var count = Math.min(config.count || 50, questions.length);
    questions = questions.slice(0, count);
    if (!questions.length) {
      App.toast('No valid questions for this certification', 'error');
      return null;
    }
    var timeLimit = config.timeLimit || (count * 75); // seconds
    examSession = {
      cert: config.cert,
      questions: questions,
      answers: {}, // index -> userAnswer
      flagged: {},
      index: 0,
      startTime: Date.now(),
      timeLimit: timeLimit,
      remaining: timeLimit,
      timer: null,
      submitted: false
    };
    App.store.saveExamSession(examSession);
    return examSession;
  }

  function examAnswer(idx, answer) {
    if (!examSession || examSession.submitted) return;
    examSession.answers[idx] = answer;
    App.store.saveExamSession(examSession);
  }

  function examFlag(idx) {
    if (!examSession) return;
    examSession.flagged[idx] = !examSession.flagged[idx];
    App.store.saveExamSession(examSession);
  }

  function submitExam() {
    if (!examSession || examSession.submitted) return null;
    examSession.submitted = true;
    if (examSession.timer) clearInterval(examSession.timer);

    var results = [];
    var correctCount = 0;
    examSession.questions.forEach(function (q, i) {
      var ua = examSession.answers[i];
      var ok = ua !== undefined && checkAnswer(q, ua);
      if (ok) correctCount++;
      results.push({ question: q, userAnswer: ua, correct: ok });
    });
    var score = Math.round((correctCount / examSession.questions.length) * 100);
    var settings = App.store.getSettings();
    var threshold = (settings.passThreshold && settings.passThreshold[examSession.cert]) || 70;
    var passed = score >= threshold;

    var attempt = {
      cert: examSession.cert,
      score: score,
      passed: passed,
      correct: correctCount,
      total: examSession.questions.length,
      timeMs: Date.now() - examSession.startTime,
      threshold: threshold
    };
    App.store.saveExamAttempt(attempt);

    // Log each answer
    results.forEach(function (r) {
      App.store.logAnswer({
        qId: r.question._id,
        cert: r.question._cert,
        chapter: r.question._chapter,
        tags: r.question.tags || [],
        correct: r.correct,
        type: r.question.type,
        mode: 'exam'
      });
    });

    App.store.addTimeOnTask(attempt.timeMs);
    App.store.clearExamSession();

    var tagMap = {};
    results.forEach(function (r) {
      (r.question.tags || []).forEach(function (t) {
        if (!tagMap[t]) tagMap[t] = { correct: 0, total: 0 };
        tagMap[t].total++;
        if (r.correct) tagMap[t].correct++;
      });
    });

    var full = {
      attempt: attempt,
      results: results,
      tagBreakdown: Object.keys(tagMap).map(function (t) {
        return { tag: t, correct: tagMap[t].correct, total: tagMap[t].total, pct: Math.round((tagMap[t].correct / tagMap[t].total) * 100) };
      })
    };
    examSession = null;
    return full;
  }

  // Discard an in-progress quiz without counting it: nothing was written to
  // the stats log yet (answers commit only in endQuiz), so clearing the
  // in-memory session leaves statistics untouched.
  function discardQuiz() {
    if (session && session.speedTimer) clearInterval(session.speedTimer);
    App.store.clearQuizSession();
    session = null;
  }

  function discardExam() {
    if (examSession && examSession.timer) clearInterval(examSession.timer);
    App.store.clearExamSession();
    examSession = null;
  }

  function getExamSession() {
    if (!examSession && App.store.getExamSession) examSession = App.store.getExamSession();
    return examSession;
  }
  function getQuizSession() {
    if (!session && App.store.getQuizSession) session = App.store.getQuizSession();
    return session;
  }

  App.quiz = {
    startQuiz: startQuiz,
    currentQ: currentQ,
    submitAnswer: submitAnswer,
    nextQuestion: nextQuestion,
    skipQuestion: skipQuestion,
    endQuiz: endQuiz,
    buildPool: buildPool,
    prepareQuestion: prepareQuestion,
    isValidMultiAnswer: isValidMultiAnswer,
    checkAnswer: checkAnswer,
    normalizeAnswer: normalizeAnswer,
    splitAnswerAcronym: splitAnswerAcronym,
    acceptedAnswerForms: acceptedAnswerForms,
    isMatchQuestion: isMatchQuestion,
    sanitizeMatch: sanitizeMatch,
    sanitizeCommandMatch: sanitizeCommandMatch,
    renderMatchUI: renderMatchUI,
    renderCommandMatchUI: renderCommandMatchUI,
    renderSingle: renderSingle,
    startExam: startExam,
    examAnswer: examAnswer,
    examFlag: examFlag,
    submitExam: submitExam,
    discardQuiz: discardQuiz,
    discardExam: discardExam,
    getExamSession: getExamSession,
    getQuizSession: getQuizSession
  };
})();
