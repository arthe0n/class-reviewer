/* ═══════════════════════════════════════════════════════════
   ReviewApp · quiz.js
   Quiz engine (5 modes) + Exam simulation
   ═══════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var App = window.ReviewApp;
  var utils = App.core.utils;
  var el = utils.el;

  /* ── Helpers ────────────────────────────────────────────── */
  function prepareQuestion(raw) {
    var q = Object.assign({}, raw);
    q._origAnswer = q.answer;
    if (q.type === 'mcq' || q.type === 'multi') {
      var opts = (q.options || []).map(function (o, i) { return { text: o, origIdx: i }; });
      opts = utils.shuffle(opts);
      q._shuffledOptions = opts;
      if (q.type === 'mcq') {
        q._correctShuffled = opts.findIndex(function (o) { return o.origIdx === q.answer; });
      } else {
        var ansSet = {};
        (Array.isArray(q.answer) ? q.answer : [q.answer]).forEach(function (i) { ansSet[i] = true; });
        q._correctShuffled = opts.reduce(function (acc, o, i) {
          if (ansSet[o.origIdx]) acc.push(i);
          return acc;
        }, []);
      }
    }
    return q;
  }

  function checkAnswer(q, userAnswer) {
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
      var a = String(q.answer || '').trim().toLowerCase();
      var u = String(userAnswer || '').trim().toLowerCase();
      return a === u;
    }
    return false;
  }

  /* ── Quiz session state ─────────────────────────────────── */
  var session = null;

  function startQuiz(config) {
    // config: { mode, certs, chapter, tags, count, questions }
    var questions = config.questions || [];
    if (!questions.length) {
      App.toast('No questions match your criteria', 'error');
      return null;
    }
    questions = utils.shuffle(questions).map(prepareQuestion);
    if (config.count && config.count < questions.length) {
      questions = questions.slice(0, config.count);
    }
    session = {
      mode: config.mode || 'random',
      questions: questions,
      index: 0,
      answers: [], // { qId, correct, userAnswer }
      startTime: Date.now(),
      speedLimit: config.speedLimit || null, // seconds per Q for speed run
      speedTimer: null,
      speedRemaining: null
    };
    App.store.setLastStudy({ type: 'quiz', mode: session.mode, ts: Date.now() });
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
    App.store.logAnswer({
      qId: q._id,
      cert: q._cert,
      chapter: q._chapter,
      tags: q.tags || [],
      correct: correct,
      type: q.type,
      mode: session.mode
    });
    if (session.speedTimer) {
      clearInterval(session.speedTimer);
      session.speedTimer = null;
    }
    return { correct: correct, q: q };
  }

  function nextQuestion() {
    if (!session) return false;
    if (session.index < session.questions.length - 1) {
      session.index++;
      return true;
    }
    return false;
  }

  function skipQuestion() {
    if (!session) return;
    var q = currentQ();
    session.answers.push({ qId: q._id, correct: false, userAnswer: null, skipped: true, question: q });
    App.store.logAnswer({
      qId: q._id,
      cert: q._cert,
      chapter: q._chapter,
      tags: q.tags || [],
      correct: false,
      type: q.type,
      mode: session.mode + ':skip'
    });
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
    App.store.addTimeOnTask(result.timeMs);
    session = null;
    return result;
  }

  /* ── Build question pool by mode ────────────────────────── */
  function buildPool(mode, opts) {
    opts = opts || {};
    var all = App.content.getAll('questions');
    if (mode === 'chapter') {
      return all.filter(function (q) {
        return (!opts.cert || q._cert === opts.cert) && (!opts.chapter || q._chapter === opts.chapter);
      });
    }
    if (mode === 'random') {
      var certs = opts.certs || [];
      if (certs.length) {
        return all.filter(function (q) { return certs.indexOf(q._cert) >= 0; });
      }
      return all;
    }
    if (mode === 'theme') {
      var tags = opts.tags || [];
      if (!tags.length) return all;
      return all.filter(function (q) {
        return (q.tags || []).some(function (t) { return tags.indexOf(t) >= 0; });
      });
    }
    if (mode === 'weak') {
      var weak = App.store.weakQuestions(60);
      var weakIds = {};
      weak.forEach(function (w) { weakIds[w.qId] = true; });
      var seen = {};
      App.store.getAnswers().forEach(function (a) { seen[a.qId] = true; });
      return all.filter(function (q) {
        return weakIds[q._id] || !seen[q._id];
      });
    }
    if (mode === 'speed') {
      return utils.shuffle(all).slice(0, 10);
    }
    return all;
  }

  /* ── Render single question (for search modal) ──────────── */
  function renderSingle(container, rawQ) {
    var q = prepareQuestion(rawQ);
    var answered = false;
    container.appendChild(el('div', { className: 'question-text', text: q.q }));
    var optsWrap = el('div', { className: 'options-list' });

    function finish(correct, explain) {
      answered = true;
      optsWrap.querySelectorAll('.option-btn').forEach(function (b) { b.disabled = true; });
      var exp = el('div', { className: 'explain-panel' }, [
        el('strong', { text: correct ? 'Correct. ' : 'Incorrect. ' }),
        document.createTextNode(explain || q.explain || '')
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

    if (q.type === 'mcq' || q.type === 'tf') {
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
          el('span', { text: opt.text })
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
          el('span', { text: opt.text })
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
    var count = Math.min(config.count || 50, pool.length);
    var questions = utils.shuffle(pool).slice(0, count).map(prepareQuestion);
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
    return examSession;
  }

  function examAnswer(idx, answer) {
    if (!examSession || examSession.submitted) return;
    examSession.answers[idx] = answer;
  }

  function examFlag(idx) {
    if (!examSession) return;
    examSession.flagged[idx] = !examSession.flagged[idx];
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

  function getExamSession() { return examSession; }
  function getQuizSession() { return session; }

  App.quiz = {
    startQuiz: startQuiz,
    currentQ: currentQ,
    submitAnswer: submitAnswer,
    nextQuestion: nextQuestion,
    skipQuestion: skipQuestion,
    endQuiz: endQuiz,
    buildPool: buildPool,
    prepareQuestion: prepareQuestion,
    checkAnswer: checkAnswer,
    renderSingle: renderSingle,
    startExam: startExam,
    examAnswer: examAnswer,
    examFlag: examFlag,
    submitExam: submitExam,
    getExamSession: getExamSession,
    getQuizSession: getQuizSession
  };
})();
