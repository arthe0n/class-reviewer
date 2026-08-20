/* ═══════════════════════════════════════════════════════════
   ReviewApp · quiz-retry.test.js
   Quiz retry-queue tests for app/js/quiz.js

   Covers: wrong answers are re-shown at the end of a quiz,
   retried answers are practice-only (never counted toward the
   score or written to the stats log), and skipped questions are
   not re-shown.

   Run with:  node tests/quiz-retry.test.js
   ═══════════════════════════════════════════════════════════ */
'use strict';

var logged = [];

global.window = {
  ReviewApp: {
    core: {
      utils: {
        // Identity shuffle keeps option/question order deterministic so the
        // tests can rely on _correctShuffled being the authored answer index.
        shuffle: function (arr) { return arr.slice(); }
      }
    },
    store: {
      setLastStudy: function () {},
      saveQuizSession: function () {},
      clearQuizSession: function () {},
      addTimeOnTask: function () {},
      logAnswer: function (a) { logged.push(a); }
    },
    toast: function () {}
  }
};

require('../app/js/quiz.js');

var quiz = global.window.ReviewApp.quiz;
var passed = 0;
var failed = 0;

function expect(label, actual, expected) {
  if (actual === expected) { passed++; return; }
  failed++;
  console.error('FAIL: ' + label + ' — expected ' + expected + ', got ' + actual);
}

function mcq(id, answer) {
  return {
    _id: id,
    type: 'mcq',
    q: 'Question ' + id,
    options: [id + '-a', id + '-b', id + '-c', id + '-d', id + '-e'],
    answer: answer,
    tags: ['tag'],
    _cert: 'CERT',
    _chapter: 'CH'
  };
}

// Answer the current question from `outcomes` ({ qId: 'correct'|'wrong'|'skip' }).
// A wrong mcq answer is the option right after the correct one.
function answerCurrent(outcomes) {
  var q = quiz.currentQ();
  var action = outcomes[q._id];
  if (action === 'skip') {
    quiz.skipQuestion(); // advances itself
    return;
  }
  if (action === 'correct') quiz.submitAnswer(q._correctShuffled);
  else quiz.submitAnswer((q._correctShuffled + 1) % q._shuffledOptions.length);
  quiz.nextQuestion();
}

function runFirstPass(outcomes) {
  // One slot per authored question; the retry queue is appended, so it is not
  // reached until every first-pass question has been handled.
  Object.keys(outcomes).forEach(function () {
    answerCurrent(outcomes);
  });
}

function runRetries(retryOutcomes) {
  var seen = [];
  // Each wrong first-pass answer queues exactly one re-show.
  Object.keys(retryOutcomes).forEach(function () {
    var q = quiz.currentQ();
    seen.push(q._id);
    answerCurrent(retryOutcomes);
  });
  return seen;
}

/* ── 1. A wrong answer is re-shown, and only the first attempt counts ── */
logged = [];
quiz.startQuiz({ mode: 'random', cert: 'CERT', questions: [mcq('q1', 0), mcq('q2', 1), mcq('q3', 2)] });
runFirstPass({ q1: 'correct', q2: 'wrong', q3: 'correct' });
var retries = runRetries({ q2: 'correct' });
var result = quiz.endQuiz();

expect('1 retry ids', retries.join(','), 'q2');
expect('1 total', result.total, 3);
expect('1 answered', result.answered, 3);
expect('1 correct (first attempt only)', result.correct, 2);
expect('1 score', result.score, 67);
expect('1 result answers', result.answers.length, 3);
expect('1 logged count', logged.length, 3);
expect('1 q2 logged once', logged.filter(function (a) { return a.qId === 'q2'; }).length, 1);
expect('1 q2 first attempt wrong', logged.filter(function (a) { return a.qId === 'q2'; })[0].correct, false);

/* ── 2. Multiple wrong answers re-shown; retries never re-score ── */
logged = [];
quiz.startQuiz({ mode: 'random', cert: 'CERT', questions: [mcq('q1', 0), mcq('q2', 1), mcq('q3', 2)] });
runFirstPass({ q1: 'wrong', q2: 'wrong', q3: 'correct' });
var retries2 = runRetries({ q1: 'correct', q2: 'wrong' });
var result2 = quiz.endQuiz();

expect('2 retry set', retries2.slice().sort().join(','), 'q1,q2');
expect('2 total', result2.total, 3);
expect('2 correct (first attempt only)', result2.correct, 1);
expect('2 score', result2.score, 33);
expect('2 result answers', result2.answers.length, 3);
expect('2 logged count', logged.length, 3);
expect('2 q1 logged once', logged.filter(function (a) { return a.qId === 'q1'; }).length, 1);
expect('2 q2 logged once', logged.filter(function (a) { return a.qId === 'q2'; }).length, 1);
expect('2 q1 first attempt wrong', logged.filter(function (a) { return a.qId === 'q1'; })[0].correct, false);
expect('2 q2 first attempt wrong', logged.filter(function (a) { return a.qId === 'q2'; })[0].correct, false);

/* ── 3. Skipped questions are not re-shown ────────────────── */
logged = [];
quiz.startQuiz({ mode: 'random', cert: 'CERT', questions: [mcq('q1', 0), mcq('q2', 1), mcq('q3', 2)] });
runFirstPass({ q1: 'skip', q2: 'wrong', q3: 'correct' });
var retries3 = runRetries({ q2: 'correct' });
var result3 = quiz.endQuiz();

expect('3 retry ids', retries3.join(','), 'q2');
expect('3 total', result3.total, 3);
expect('3 correct (skip counts wrong once)', result3.correct, 1);
expect('3 logged count', logged.length, 3);
expect('3 q1 logged once (skip)', logged.filter(function (a) { return a.qId === 'q1'; }).length, 1);
expect('3 q1 skip not retried', retries3.indexOf('q1') === -1, true);

/* ── Summary ──────────────────────────────────────────────── */
console.log(passed + ' passed, ' + failed + ' failed');
process.exit(failed ? 1 : 0);
