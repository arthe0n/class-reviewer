/* ═══════════════════════════════════════════════════════════
   ReviewApp · answer-validation.test.js
   Fill-answer matching tests for app/js/quiz.js

   Covers: case-insensitive matching, whitespace tolerance, acronym
   derivation from "Full Name (ACR)", the optional `accepts` array,
   rejection of incomplete/unrelated answers, and regression checks
   that the other question types keep their behavior.

   Run with:  node tests/answer-validation.test.js
   ═══════════════════════════════════════════════════════════ */
'use strict';

// quiz.js expects the ReviewApp namespace; stub enough to load the module.
global.window = { ReviewApp: { core: { utils: {} } } };
require('../app/js/quiz.js');

var quiz = global.window.ReviewApp.quiz;
var passed = 0;
var failed = 0;

function expect(label, actual, expected) {
  if (actual === expected) { passed++; return; }
  failed++;
  console.error('FAIL: ' + label + ' — expected ' + expected + ', got ' + actual);
}

function check(q, input, expected, label) {
  expect((label || q.answer) + ' / "' + input + '"', quiz.checkAnswer(q, input), expected);
}

var CA = { type: 'fill', answer: 'Certificate Authority' };

/* ── 1. Case-insensitive matching ─────────────────────────── */
check(CA, 'Certificate Authority', true, 'exact case');
check(CA, 'certificate authority', true, 'all lower');
check(CA, 'CERTIFICATE AUTHORITY', true, 'all upper');
check(CA, 'Certificate authority', true, 'mixed case');

/* ── 2. Whitespace normalization ──────────────────────────── */
check(CA, '  Certificate Authority  ', true, 'leading/trailing spaces');
check(CA, 'certificate   authority', true, 'repeated inner spaces');
check(CA, 'certificate\tauthority', true, 'tab between words');
check(CA, 'certificate\nauthority', true, 'newline between words');

/* ── 3. Acronym derivation from "Full Name (ACR)" ─────────── */
var CA_ACR = { type: 'fill', answer: 'Certificate Authority (CA)' };
check(CA_ACR, 'Certificate Authority (CA)', true, 'parenthesized canonical');
check(CA_ACR, 'Certificate Authority', true, 'full name alone');
check(CA_ACR, 'certificate authority', true, 'full name, lower case');
check(CA_ACR, 'CA', true, 'acronym alone');
check(CA_ACR, 'ca', true, 'acronym, lower case');
check(CA_ACR, 'Certificate Authority (ca)', true, 'acronym, lower case in parens');

var DNS_ACR = { type: 'fill', answer: 'Domain Name System (DNS)' };
check(DNS_ACR, 'Domain Name System', true, 'DNS full name alone');
check(DNS_ACR, 'DNS', true, 'DNS acronym alone');
check(DNS_ACR, 'dns', true, 'DNS acronym, lower case');

/* ── 4. Explicit equivalents via `accepts` ────────────────── */
var LAMP = { type: 'fill', answer: 'LAMP', accepts: ['LAMP stack', 'Linux Apache MySQL PHP'] };
check(LAMP, 'LAMP', true, 'LAMP canonical');
check(LAMP, 'lamp', true, 'LAMP lower case');
check(LAMP, 'LAMP stack', true, 'LAMP stack');
check(LAMP, 'linux apache mysql php', true, 'LAMP expansion');
check(LAMP, 'lamps', false, 'near-miss rejected');
check(LAMP, 'Linux', false, 'partial expansion rejected');

var IPP = { type: 'fill', answer: 'IPP', accepts: ['Internet Printing Protocol'] };
check(IPP, 'Internet Printing Protocol', true, 'IPP full name');
check(IPP, 'ipp', true, 'IPP acronym');
check(IPP, 'printing', false, 'shared word rejected');

/* ── 5. The certificate-authority question shape ──────────── */
var CA_Q = { type: 'fill', answer: 'Certificate Authority (CA)', accepts: ['a certificate authority'] };
check(CA_Q, 'Certificate Authority (CA)', true, 'ca canonical');
check(CA_Q, 'certificate authority', true, 'ca full name');
check(CA_Q, 'CA', true, 'ca acronym');
check(CA_Q, 'ca', true, 'ca acronym lower');
check(CA_Q, 'a certificate authority', true, 'ca with article');
check(CA_Q, 'Certificate', false, 'incomplete rejected');
check(CA_Q, 'Authority', false, 'single word rejected');
check(CA_Q, 'Certificate Management', false, 'unrelated phrase rejected');
check(CA_Q, 'Certificate of Authority', false, 'near-miss phrase rejected');

/* ── 6. Incorrect / incomplete answers still rejected ─────── */
check(CA, 'Certificate', false, 'first word only');
check(CA, 'Authority', false, 'second word only');
check(CA, 'Certificate Management', false, 'shared first word');
check(CA, 'Management Authority', false, 'shared second word');
check(CA, 'certificate authorit', false, 'typo rejected');
check(CA, '', false, 'empty rejected');

/* ── 7. Other question types keep exact behavior ──────────── */
expect('tf true', quiz.checkAnswer({ type: 'tf', answer: true }, true), true);
expect('tf false', quiz.checkAnswer({ type: 'tf', answer: true }, false), false);
expect('mcq correct', quiz.checkAnswer({ type: 'mcq', _correctShuffled: 2 }, 2), true);
expect('mcq wrong', quiz.checkAnswer({ type: 'mcq', _correctShuffled: 2 }, 1), false);
expect('multi correct', quiz.checkAnswer({ type: 'multi', _correctShuffled: [1, 0] }, [1, 0]), true);
expect('multi wrong', quiz.checkAnswer({ type: 'multi', _correctShuffled: [1, 0] }, [0, 2]), false);
expect('command_match correct',
  quiz.checkAnswer({ type: 'command_match', _valid: true, _correctDescIdx: [2, 0] }, [2, 0]), true);
expect('command_match wrong',
  quiz.checkAnswer({ type: 'command_match', _valid: true, _correctDescIdx: [2, 0] }, [0, 2]), false);

/* ── 8. Normalization / acronym helpers ───────────────────── */
var n = quiz.normalizeAnswer;
expect('normalize collapse', n('  Certificate   Authority\t\n '), 'certificate authority');
expect('normalize null', n(null), '');
expect('normalize empty', n(''), '');

var ac = quiz.splitAnswerAcronym('Certificate Authority (CA)');
expect('split acronym full', ac && ac.full, 'Certificate Authority');
expect('split acronym token', ac && ac.acronym, 'ca');
expect('split no parens', quiz.splitAnswerAcronym('Certificate Authority'), null);
expect('split prose parens', quiz.splitAnswerAcronym('chmod (change mode)'), null);

var forms = quiz.acceptedAnswerForms({
  answer: 'LDAP',
  accepts: ['Lightweight Directory Access Protocol', '  ldap server  ']
});
expect('forms include canonical', forms.indexOf('ldap') >= 0, true);
expect('forms include accepts', forms.indexOf('lightweight directory access protocol') >= 0, true);
expect('forms normalize accepts', forms.indexOf('ldap server') >= 0, true);
expect('forms skip blanks',
  quiz.acceptedAnswerForms({ answer: 'CA', accepts: ['  '] }).indexOf('') >= 0, false);

/* ── Summary ──────────────────────────────────────────────── */
console.log(passed + ' passed, ' + failed + ' failed');
process.exit(failed ? 1 : 0);