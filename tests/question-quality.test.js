/* ReviewApp · question-quality.test.js
 *
 * The LLM prompt is the generator in this project, so its output cannot be
 * tested deterministically. These checks cover the prompt contract, the
 * schema of the checked-in question banks, and the runtime's answer remapping
 * when choices are shuffled.
 *
 * Run with: node tests/question-quality.test.js
 */
'use strict';

var assert = require('assert');
var fs = require('fs');
var path = require('path');
var vm = require('vm');

var promptPath = path.join(__dirname, '..', 'docs', 'prompt-generator.md');
var prompt = fs.readFileSync(promptPath, 'utf8');

[
  'ANSWER-CHOICE QUALITY',
  'balanced set of answers',
  'type: "match"',
  'analyze the notes',
  'coherent group',
  'counterpart',
  'supported by the supplied notes',
  'do not force',
  'Balance the options, not the question stem',
  'short, direct questions',
  'QUESTION STEM STYLE',
  'Never refer to the source material in the question stem',
  'systematically be the longest or shortest',
  'not the longest',
  'not make it the shortest',
  'plausible',
  'blind clue review',
  'source order',
  'exactly 5 options for every mcq and multi question',
  '1, 2, 3, or 4 correct choices',
  '45% mcq, 20% multi, 10% tf, 10% fill, and 15% match'
].forEach(function (requiredText) {
  assert.ok(prompt.toLowerCase().indexOf(requiredText.toLowerCase()) >= 0,
    'questions prompt should contain: ' + requiredText);
});

function loadQuestionPayloads() {
  var files = [
    'ch01-exploring-linux-questions.js',
    'ch02-servers-services-security-questions.js',
    'ch03-files-directories-search-questions.js'
  ];
  var payloads = [];
  files.forEach(function (file) {
    var source = fs.readFileSync(path.join(__dirname, '..', 'certifications', 'linux-plus', 'questions', file), 'utf8');
    var context = {
      window: {
        ReviewApp: {
          content: {
            register: function (payload) { payloads.push(payload); }
          }
        }
      }
    };
    vm.runInNewContext(source, context, { filename: file });
  });
  return payloads;
}

var payloads = loadQuestionPayloads();
assert.strictEqual(payloads.length, 3, 'all checked-in question banks should register');

var questionCount = 0;
var sourceFraming = /\b(?:according to|based on|from|in|supported by)\s+(?:the\s+)?notes\b/i;
payloads.forEach(function (payload) {
  assert.strictEqual(payload.type, 'questions');
  assert.ok(Array.isArray(payload.items) && payload.items.length > 0);

  payload.items.forEach(function (question) {
    questionCount++;
    assert.ok(question.q && question.type, 'every question needs text and a type');
    assert.ok(!sourceFraming.test(question.q),
      'question stems should ask directly instead of referring to the notes: ' + question.q);

    if (question.type === 'mcq' || question.type === 'multi') {
      assert.ok(Array.isArray(question.options), 'choice question needs an options array');
      assert.ok(question.options.length >= 4, 'legacy choice questions still need at least four options');

      var normalized = question.options.map(function (option) {
        assert.strictEqual(typeof option, 'string');
        assert.ok(option.trim(), 'choices must not be blank');
        return option.trim().toLowerCase();
      });
      assert.strictEqual(new Set(normalized).size, normalized.length,
        'choices must be distinct: ' + question.q);

      if (question.type === 'mcq') {
        assert.ok(Number.isInteger(question.answer));
        assert.ok(question.answer >= 0 && question.answer < question.options.length,
          'mcq answer index must point to an option: ' + question.q);
      } else {
        assert.ok(Array.isArray(question.answer));
        assert.ok(question.answer.length >= 1 && question.answer.length <= 4,
          'multi questions should have 1–4 correct choices: ' + question.q);
        assert.strictEqual(new Set(question.answer).size, question.answer.length,
          'multi answer indices must be distinct: ' + question.q);
        question.answer.forEach(function (index) {
          assert.ok(Number.isInteger(index) && index >= 0 && index < question.options.length,
            'multi answer index must point to an option: ' + question.q);
        });
        assert.ok(question.answer.length < question.options.length,
          'multi questions need at least one distractor: ' + question.q);
      }
    }

    if (question.type === 'match' || question.type === 'command_match') {
      var legacyMatch = question.type === 'command_match';
      if (legacyMatch) assert.ok(question.command, 'legacy command matches need a command context');
      assert.ok(Array.isArray(question.pairs));
      assert.ok(question.pairs.length >= 2, 'matching questions need at least two pairs');
      var items = question.pairs.map(function (pair) {
        return String(pair.item != null ? pair.item : pair.option).trim().toLowerCase();
      });
      var counterparts = question.pairs.map(function (pair) {
        return String(pair.match != null ? pair.match : pair.description).trim().toLowerCase();
      });
      assert.strictEqual(new Set(items).size, items.length);
      assert.strictEqual(new Set(counterparts).size, counterparts.length);
      question.pairs.forEach(function (pair) {
        assert.ok(String(pair.item != null ? pair.item : pair.option).trim());
        assert.ok(String(pair.match != null ? pair.match : pair.description).trim());
        if (!legacyMatch) {
          assert.ok(pair.item != null && pair.match != null, 'generic matches use item/match pairs');
        }
      });
    }
  });
});

assert.ok(questionCount >= 100, 'checked-in question banks should contain a meaningful sample');

// Deterministic regression for the anti-length rule used by the prompt: a
// clearly outlying correct choice is detectable, while natural variation is
// accepted. This intentionally tests a quality criterion without requiring an
// arbitrary exact character count for every generated option.
function hasLengthClue(options, correctIndices) {
  var incorrect = options.filter(function (_, index) {
    return correctIndices.indexOf(index) < 0;
  });
  var correctLengths = correctIndices.map(function (index) { return options[index].length; });
  var incorrectLengths = incorrect.map(function (option) { return option.length; });
  var correctMax = Math.max.apply(Math, correctLengths);
  var correctMin = Math.min.apply(Math, correctLengths);
  var incorrectMax = Math.max.apply(Math, incorrectLengths);
  var incorrectMin = Math.min.apply(Math, incorrectLengths);
  return correctMax > incorrectMax * 1.35 || correctMin < incorrectMin * 0.65;
}

assert.strictEqual(hasLengthClue([
  'A short protocol.',
  'A related service.',
  'A network service that translates domain names into addresses used by clients.',
  'A type of cache.'
], [2]), true);
assert.strictEqual(hasLengthClue([
  'A service that maps names to addresses.',
  'A service that maps addresses to names.',
  'A service that routes traffic between hosts.',
  'A service that stores local host records.',
  'A service that discovers nearby systems.'
], [0]), false);

// The quiz engine must remap the correct answer after different option orders;
// this is what prevents authored A/B/C/D placement from becoming a learner-
// facing position clue. Use controlled shuffles so the test is not probabilistic.
var shuffleUtils = {
  el: function () {},
  shuffle: function (items) { return items.slice().reverse(); }
};
global.window = { ReviewApp: { core: { utils: shuffleUtils } } };
require('../app/js/quiz.js');
var quiz = global.window.ReviewApp.quiz;

[
  {
    context: 'Command flags',
    pairs: [{ item: '-i', match: 'Ignore case' }, { item: '-n', match: 'Show line numbers' }]
  },
  {
    context: 'Shell symbols',
    pairs: [{ item: '*', match: 'Match multiple characters' }, { item: '?', match: 'Match one character' }]
  },
  {
    context: 'File extensions',
    pairs: [{ item: '.py', match: 'Python source file' }, { item: '.json', match: 'JSON data' }]
  },
  {
    context: 'Process concepts',
    pairs: [{ item: 'Process', match: 'Running instance of a program' }, { item: 'Thread', match: 'Execution unit within a process' }]
  },
  {
    context: 'Network protocols',
    pairs: [{ item: 'SSH', match: 'Secure remote shell access' }, { item: 'DNS', match: 'Resolves domain names' }]
  },
  {
    context: 'Redirection syntax',
    pairs: [{ item: '>', match: 'Redirect standard output' }, { item: '2>', match: 'Redirect standard error' }]
  }
].forEach(function (fixture) {
  var prepared = quiz.prepareQuestion({ q: 'Match the related items.', type: 'match', context: fixture.context, pairs: fixture.pairs });
  assert.strictEqual(prepared._invalid, undefined);
  assert.strictEqual(prepared._shuffledPairs.length, fixture.pairs.length);
  assert.strictEqual(prepared._matchContext, fixture.context);
  assert.strictEqual(quiz.checkAnswer(prepared, prepared._correctMatchIdx.slice()), true);
});

var legacyPrepared = quiz.prepareQuestion({
  q: 'Match flags.',
  type: 'command_match',
  command: 'grep',
  pairs: [{ option: '-i', description: 'Ignore case' }, { option: '-n', description: 'Show line numbers' }]
});
assert.strictEqual(legacyPrepared._invalid, undefined);
assert.strictEqual(quiz.checkAnswer(legacyPrepared, legacyPrepared._correctDescIdx.slice()), true);
assert.deepStrictEqual(quiz.sanitizeMatch({
  type: 'match',
  pairs: [{ item: 'A', match: 'Alpha' }, { item: 'B', match: 'Beta' }]
}), [
  { item: 'A', match: 'Alpha' },
  { item: 'B', match: 'Beta' }
]);
assert.strictEqual(quiz.sanitizeMatch({
  type: 'match',
  pairs: [{ item: 'A', match: 'Alpha' }, { item: 'A', match: 'Another meaning' }]
}), null);
assert.deepStrictEqual(quiz.sanitizeCommandMatch({
  type: 'command_match',
  command: 'grep',
  pairs: [{ option: '-i', description: 'Ignore case' }, { option: '-n', description: 'Show line numbers' }]
}), [
  { option: '-i', description: 'Ignore case' },
  { option: '-n', description: 'Show line numbers' }
]);

var raw = {
  q: 'Which option is correct?',
  type: 'mcq',
  options: ['Correct', 'Distractor one', 'Distractor two', 'Distractor three', 'Distractor four'],
  answer: 0
};
var reversed = quiz.prepareQuestion(raw);
assert.strictEqual(reversed._correctShuffled, 4);
assert.strictEqual(quiz.checkAnswer(reversed, 4), true);

shuffleUtils.shuffle = function (items) {
  return [items[4], items[0], items[1], items[2], items[3]];
};
var rotated = quiz.prepareQuestion(raw);
assert.strictEqual(rotated._correctShuffled, 1);
assert.strictEqual(quiz.checkAnswer(rotated, 1), true);

var multi = quiz.prepareQuestion({
  q: 'Which options are correct?',
  type: 'multi',
  options: ['Correct one', 'Distractor', 'Correct two', 'Distractor two', 'Distractor three'],
  answer: [0, 2]
});
assert.deepStrictEqual(multi._correctShuffled, [1, 3]);
assert.strictEqual(quiz.checkAnswer(multi, [3, 1]), true);

console.log(questionCount + ' questions checked; prompt and choice-quality checks passed');
