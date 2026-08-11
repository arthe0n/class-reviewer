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
  // Validate/normalize a command_match question's pairs.
  // Returns an array of { option, description } or null when malformed.
  function sanitizeCommandMatch(q) {
    var command = String(q.command == null ? '' : q.command).trim();
    if (!command) return null;
    var pairs = Array.isArray(q.pairs) ? q.pairs : [];
    var seenOpt = {};
    var seenDesc = {};
    var clean = [];
    pairs.forEach(function (p) {
      if (!p || typeof p !== 'object') return;
      var option = String(p.option == null ? '' : p.option).trim();
      var description = String(p.description == null ? '' : p.description).trim();
      if (!option || !description) return;      // drop pairs missing a side
      if (seenOpt[option] || seenDesc[description]) return; // drop duplicates
      seenOpt[option] = true;
      seenDesc[description] = true;
      clean.push({ option: option, description: description });
    });
    if (clean.length < 2) return null; // nothing meaningful to match
    return clean;
  }

  function prepareQuestion(raw) {
    var q = Object.assign({}, raw);
    q._origAnswer = q.answer;
    if (q.type === 'command_match') {
      var pairs = sanitizeCommandMatch(q);
      if (!pairs) {
        q._invalid = true;
      } else {
        q._pairs = pairs;
        q._shuffledPairs = utils.shuffle(pairs);
        var descs = utils.shuffle(pairs.map(function (p) { return p.description; }));
        q._shuffledDescs = descs;
        q._correctDescIdx = q._shuffledPairs.map(function (p) { return descs.indexOf(p.description); });
      }
    } else if (q.type === 'mcq' || q.type === 'multi') {
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
    if (q.type === 'command_match') {
      if (q._invalid || !Array.isArray(userAnswer)) return false;
      var correct = q._correctDescIdx || [];
      if (userAnswer.length !== correct.length) return false;
      // One wrong match makes the whole question wrong (consistent with multi)
      return correct.every(function (c, i) {
        return Number(userAnswer[i]) === c;
      });
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

  /* ── Command-match UI builder ───────────────────────────── */
  // Shared by the quiz player, exam player and single-question modal.
  // Renders the command banner + one row per option with a <select> of
  // shuffled descriptions. Returns { lock } — lock() disables the rows and
  // paints correct/wrong feedback, revealing the right answer on wrong rows.
  function renderCommandMatchUI(container, q, opts) {
    opts = opts || {};
    var banner = el('div', { className: 'cmd-match-command' }, [
      el('span', { className: 'cmd-match-command-label', text: 'COMMAND' }),
      el('code', { className: 'cmd-match-command-name', text: q.command || '' })
    ]);
    container.appendChild(banner);

    var rows = el('div', { className: 'cmd-match-rows' });
    var selects = [];
    var initial = Array.isArray(opts.initial) ? opts.initial : [];
    q._shuffledPairs.forEach(function (pair, i) {
      var row = el('div', { className: 'cmd-match-row' });
      row.appendChild(el('code', { className: 'cmd-match-option', text: pair.option }));
      var sel = el('select', {
        className: 'form-control cmd-match-select',
        'aria-label': 'Match ' + pair.option + ' with its description'
      });
      sel.appendChild(el('option', { value: '', text: '— choose description —' }));
      q._shuffledDescs.forEach(function (desc, j) {
        sel.appendChild(el('option', { value: String(j), text: desc }));
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
        var correctIdx = q._correctDescIdx[i];
        if (String(correctIdx) === chosen) {
          row.classList.add('correct');
        } else {
          row.classList.add('wrong');
          row.appendChild(el('span', {
            className: 'cmd-match-correct',
            text: '→ ' + q._shuffledDescs[correctIdx]
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
            App.toast('Match every option before submitting', 'error');
            return;
          }
          opts.onSubmit(arr);
        }
      });
      container.appendChild(submitBtn);
    }

    return { lock: lock, read: read, selects: selects };
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
    } else if (q.type === 'command_match') {
      if (q._invalid) {
        optsWrap.appendChild(el('div', { className: 'empty-state', style: { padding: '1rem' } }, [
          el('h3', { text: 'Question unavailable' }),
          el('p', { text: 'This command-matching question is missing required data (command or pairs).' })
        ]));
      } else {
        var ui = renderCommandMatchUI(optsWrap, q, {
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
    sanitizeCommandMatch: sanitizeCommandMatch,
    renderCommandMatchUI: renderCommandMatchUI,
    renderSingle: renderSingle,
    startExam: startExam,
    examAnswer: examAnswer,
    examFlag: examFlag,
    submitExam: submitExam,
    getExamSession: getExamSession,
    getQuizSession: getQuizSession
  };
})();
