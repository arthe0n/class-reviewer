/* ReviewApp · backup-import.test.js
 *
 * Regression checks for the Settings ZIP backup import merge rules. These use
 * the real backup service with small in-memory application stubs, so they do
 * not require a browser or IndexedDB.
 *
 * Run with: node tests/backup-import.test.js
 */
'use strict';

var assert = require('assert');

global.window = { ReviewApp: {} };
var App = global.window.ReviewApp;
var data = {};
var registry = { certs: [], questions: [], flashcards: [], labs: [], notes: [] };

function copy(value) { return value == null ? value : JSON.parse(JSON.stringify(value)); }

App.core = {
  utils: {},
  restoreCurrentCert: function () {},
  updateCertSelector: function () {}
};
App.store = {
  get: function (key, fallback) { return data[key] === undefined ? fallback : data[key]; },
  set: function (key, value) { data[key] = copy(value); },
  flush: function () { return Promise.resolve(); },
  saveContentSnapshot: function (snapshot) { registry = copy(snapshot.registry); }
};
App.content = {
  getRegistry: function () { return registry; },
  getCerts: function () { return registry.certs; },
  load: function (done) { done(); }
};

require('../app/js/backup.js');

var userKeys = [
  'currentCert', 'settings', 'answers', 'streak', 'exams', 'labsDone', 'labStepsDone', 'leitner', 'cardReviews',
  'flashSessions', 'flashSession', 'quizSession', 'examSession', 'personalNotes', 'timeOnTask'
];

function jsonBytes(value) { return new TextEncoder().encode(JSON.stringify(value)); }

function userPackage(values, certifications) {
  var entries = { 'user-data/index.json': jsonBytes({ certifications: certifications || [] }) };
  userKeys.forEach(function (key) {
    entries['user-data/' + key + '.json'] = jsonBytes(values[key]);
  });
  return {
    manifest: {
      format: 'reviewapp-backup',
      version: 2,
      createdAt: new Date(0).toISOString(),
      exportType: 'user',
      certifications: [],
      includesUserData: true,
      includesStudyMaterial: false
    },
    entries: entries
  };
}

function materialPackage() {
  var cert = { id: 'linux-plus', name: 'Linux+' };
  var question = { _id: 'linux-plus:questions:ch01:0', _key: 'linux-plus:questions:ch01:0', _cert: cert.id, q: 'Question' };
  return {
    manifest: {
      format: 'reviewapp-backup',
      version: 2,
      createdAt: new Date(0).toISOString(),
      exportType: 'material',
      certifications: [cert],
      includesUserData: false,
      includesStudyMaterial: true
    },
    entries: {},
    snapshot: {
      registry: {
        certs: [cert, cert],
        questions: [question, question],
        flashcards: [],
        labs: [],
        notes: []
      }
    },
    certifications: [cert]
  };
}

function baseUserData() {
  return {
    currentCert: 'linux-plus',
    settings: { theme: 'monokai' },
    answers: [],
    streak: { last: null, count: 0, best: 0 },
    exams: [],
    labsDone: {},
    labStepsDone: {},
    leitner: {},
    cardReviews: [],
    flashSessions: [],
    flashSession: null,
    quizSession: null,
    examSession: null,
    personalNotes: [],
    timeOnTask: 0
  };
}

async function run() {
  data = {
    answers: [
      { id: 'answer-1', cert: 'linux-plus', correct: false },
      { id: 'answer-local', cert: 'network-plus', correct: true }
    ],
    personalNotes: [
      { id: 'note-1', title: 'Old title', body: 'old' },
      { id: 'note-local', title: 'Local note', body: 'keep' }
    ],
    quizSession: { cert: 'network-plus', index: 2 }
  };
  var values = baseUserData();
  values.answers = [
    { id: 'answer-1', cert: 'linux-plus', correct: true },
    { id: 'answer-imported', cert: 'linux-plus', correct: true }
  ];
  values.personalNotes = [
    { id: 'note-1', title: 'Restored title', body: 'restored' },
    { id: 'note-imported', title: 'Imported note', body: 'new' }
  ];

  await App.backup.importPackage(userPackage(values, ['linux-plus']));
  await App.backup.importPackage(userPackage(values, ['linux-plus']));

  assert.strictEqual(data.answers.length, 3, 're-importing must not duplicate scoped answer records');
  assert.strictEqual(data.answers.filter(function (answer) { return answer.id === 'answer-1'; }).length, 1);
  assert.strictEqual(data.personalNotes.length, 3, 're-importing must not duplicate unscoped personal notes');
  assert.strictEqual(data.personalNotes.filter(function (note) { return note.id === 'note-1'; }).length, 1);
  assert.strictEqual(data.personalNotes.filter(function (note) { return note.id === 'note-imported'; }).length, 1);
  assert.strictEqual(data.quizSession.cert, 'network-plus', 'an unrelated active session must survive a clean backup import');
  assert.strictEqual(data.answers.filter(function (answer) { return answer.id === 'answer-local'; }).length, 1);

  data = { personalNotes: [{ id: 'unrelated', title: 'Keep me', body: 'local' }] };
  var noScope = baseUserData();
  noScope.currentCert = null;
  noScope.personalNotes = [{ id: 'portable', title: 'Portable note', body: 'backup' }];
  await App.backup.importPackage(userPackage(noScope, []));
  await App.backup.importPackage(userPackage(noScope, []));
  assert.strictEqual(data.personalNotes.length, 2, 'a backup without certification scope must retain local notes without multiplying imported notes');

  registry = {
    certs: [{ id: 'linux-plus', name: 'Existing' }],
    questions: [{ _id: 'linux-plus:questions:old', _cert: 'linux-plus' }],
    flashcards: [],
    labs: [],
    notes: []
  };
  var material = materialPackage();
  await App.backup.importPackage(material);
  await App.backup.importPackage(material);
  assert.strictEqual(registry.certs.length, 1, 're-importing material must keep one certification');
  assert.strictEqual(registry.questions.length, 1, 'duplicate material identities must be collapsed');

  console.log('PASS: backup import regression checks');
}

run().catch(function (err) {
  console.error(err.stack || err);
  process.exitCode = 1;
});
