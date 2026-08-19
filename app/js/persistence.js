/* ═══════════════════════════════════════════════════════════
   ReviewApp · persistence.js
   Native IndexedDB service for user-specific application state.
   Certification content remains file-based under certifications/.
   ═══════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var App = window.ReviewApp;
  var DB_NAME = 'ReviewAppUserData';
  var DB_VERSION = 2;

  var STORE_NAMES = [
    'meta', 'settings', 'answers', 'exams', 'labProgress', 'leitner',
    'cardReviews', 'flashSessions', 'activeSessions', 'personalNotes',
    'contentCache'
  ];

  var dbPromise = null;

  function requestResult(request) {
    return new Promise(function (resolve, reject) {
      request.onsuccess = function () { resolve(request.result); };
      request.onerror = function () { reject(request.error || new Error('IndexedDB request failed')); };
    });
  }

  function addIndex(store, name, keyPath, options) {
    if (!store.indexNames.contains(name)) store.createIndex(name, keyPath, options || { unique: false });
  }

  function configureSchema(db, upgradeTx) {
    var store;
    if (!db.objectStoreNames.contains('meta')) db.createObjectStore('meta', { keyPath: 'key' });
    if (!db.objectStoreNames.contains('settings')) db.createObjectStore('settings', { keyPath: 'key' });

    if (!db.objectStoreNames.contains('answers')) {
      store = db.createObjectStore('answers', { keyPath: 'id' });
      addIndex(store, 'cert', 'cert');
      addIndex(store, 'chapter', 'chapter');
      addIndex(store, 'qId', 'qId');
      addIndex(store, 'ts', 'ts');
      addIndex(store, 'certChapter', ['cert', 'chapter']);
    }

    if (!db.objectStoreNames.contains('exams')) {
      store = db.createObjectStore('exams', { keyPath: 'id' });
      addIndex(store, 'cert', 'cert');
      addIndex(store, 'ts', 'ts');
    }

    if (!db.objectStoreNames.contains('labProgress')) {
      store = db.createObjectStore('labProgress', { keyPath: 'key' });
      addIndex(store, 'cert', 'cert');
      addIndex(store, 'labId', 'labId');
      addIndex(store, 'kind', 'kind');
    }

    if (!db.objectStoreNames.contains('leitner')) {
      store = db.createObjectStore('leitner', { keyPath: 'cardKey' });
      addIndex(store, 'cert', 'cert');
      addIndex(store, 'nextDue', 'nextDue');
      addIndex(store, 'lastSeen', 'lastSeen');
    }

    if (!db.objectStoreNames.contains('cardReviews')) {
      store = db.createObjectStore('cardReviews', { keyPath: 'id' });
      addIndex(store, 'cert', 'cert');
      addIndex(store, 'chapter', 'chapter');
      addIndex(store, 'cardId', 'cardId');
      addIndex(store, 'sessionId', 'sessionId');
      addIndex(store, 'ts', 'ts');
      addIndex(store, 'certChapter', ['cert', 'chapter']);
    }

    if (!db.objectStoreNames.contains('flashSessions')) {
      store = db.createObjectStore('flashSessions', { keyPath: 'id' });
      addIndex(store, 'cert', 'cert');
      addIndex(store, 'ts', 'ts');
    }

    if (!db.objectStoreNames.contains('activeSessions')) {
      store = db.createObjectStore('activeSessions', { keyPath: 'type' });
      addIndex(store, 'cert', 'cert');
      addIndex(store, 'updatedAt', 'updatedAt');
    }

    if (!db.objectStoreNames.contains('personalNotes')) {
      store = db.createObjectStore('personalNotes', { keyPath: 'id' });
      addIndex(store, 'updated', 'updated');
    }

    if (!db.objectStoreNames.contains('contentCache')) {
      store = db.createObjectStore('contentCache', { keyPath: 'key' });
      addIndex(store, 'ts', 'ts');
    }

    // Also add missing indexes during future version upgrades. This keeps the
    // schema evolvable instead of only configuring indexes on first install.
    if (upgradeTx) {
      var indexSpecs = {
        answers: [['cert', 'cert'], ['chapter', 'chapter'], ['qId', 'qId'], ['ts', 'ts'], ['certChapter', ['cert', 'chapter']]],
        exams: [['cert', 'cert'], ['ts', 'ts']],
        labProgress: [['cert', 'cert'], ['labId', 'labId'], ['kind', 'kind']],
        leitner: [['cert', 'cert'], ['nextDue', 'nextDue'], ['lastSeen', 'lastSeen']],
        cardReviews: [['cert', 'cert'], ['chapter', 'chapter'], ['cardId', 'cardId'], ['sessionId', 'sessionId'], ['ts', 'ts'], ['certChapter', ['cert', 'chapter']]],
        flashSessions: [['cert', 'cert'], ['ts', 'ts']],
        activeSessions: [['cert', 'cert'], ['updatedAt', 'updatedAt']],
        personalNotes: [['updated', 'updated']],
        contentCache: [['ts', 'ts']]
      };
      Object.keys(indexSpecs).forEach(function (name) {
        if (!db.objectStoreNames.contains(name)) return;
        var upgradeStore = upgradeTx.objectStore(name);
        indexSpecs[name].forEach(function (spec) { addIndex(upgradeStore, spec[0], spec[1]); });
      });
    }
  }

  function open() {
    if (dbPromise) return dbPromise;
    if (!window.indexedDB) {
      dbPromise = Promise.reject(new Error('IndexedDB is not available in this browser.'));
      return dbPromise;
    }

    dbPromise = new Promise(function (resolve, reject) {
      var request;
      try {
        request = window.indexedDB.open(DB_NAME, DB_VERSION);
      } catch (err) {
        reject(err);
        return;
      }
      request.onupgradeneeded = function (event) {
        try {
          configureSchema(event.target.result, event.target.transaction);
        } catch (err) {
          try { event.target.transaction.abort(); } catch (abortErr) {}
          reject(err);
        }
      };
      request.onblocked = function () {
        reject(new Error('IndexedDB upgrade is blocked by another ReviewApp tab. Close the other tab and reload.'));
      };
      request.onerror = function () {
        reject(request.error || new Error('ReviewApp could not open its local database.'));
      };
      request.onsuccess = function () {
        var db = request.result;
        db.onversionchange = function () {
          db.close();
          dbPromise = null;
        };
        resolve(db);
      };
    });
    return dbPromise;
  }

  function transaction(storeNames, mode, work) {
    return open().then(function (db) {
      return new Promise(function (resolve, reject) {
        var tx;
        var result;
        try {
          tx = db.transaction(storeNames, mode || 'readonly');
          result = work(tx);
        } catch (err) {
          reject(err);
          return;
        }
        tx.oncomplete = function () { resolve(result); };
        tx.onerror = function () { reject(tx.error || new Error('IndexedDB transaction failed')); };
        tx.onabort = function () { reject(tx.error || new Error('IndexedDB transaction was aborted')); };
      });
    });
  }

  function get(storeName, key) {
    return transaction([storeName], 'readonly', function (tx) {
      return requestResult(tx.objectStore(storeName).get(key));
    }).then(function (result) {
      return result;
    });
  }

  function getAll(storeName) {
    return transaction([storeName], 'readonly', function (tx) {
      var store = tx.objectStore(storeName);
      if (store.getAll) return requestResult(store.getAll());
      return new Promise(function (resolve, reject) {
        var values = [];
        var request = store.openCursor();
        request.onsuccess = function (event) {
          var cursor = event.target.result;
          if (!cursor) { resolve(values); return; }
          values.push(cursor.value);
          cursor.continue();
        };
        request.onerror = function () { reject(request.error || new Error('IndexedDB cursor failed')); };
      });
    });
  }

  function put(storeName, value) {
    return transaction([storeName], 'readwrite', function (tx) {
      return requestResult(tx.objectStore(storeName).put(value));
    });
  }

  function remove(storeName, key) {
    return transaction([storeName], 'readwrite', function (tx) {
      return requestResult(tx.objectStore(storeName).delete(key));
    });
  }

  function clear(storeName) {
    return transaction([storeName], 'readwrite', function (tx) {
      return requestResult(tx.objectStore(storeName).clear());
    });
  }

  function replace(storeName, values) {
    values = values || [];
    return transaction([storeName], 'readwrite', function (tx) {
      var store = tx.objectStore(storeName);
      store.clear();
      values.forEach(function (value) { store.put(value); });
      return null;
    });
  }

  function replaceMany(recordsByStore) {
    var names = Object.keys(recordsByStore);
    return transaction(names, 'readwrite', function (tx) {
      names.forEach(function (name) {
        var store = tx.objectStore(name);
        store.clear();
        (recordsByStore[name] || []).forEach(function (value) { store.put(value); });
      });
      return null;
    });
  }

  function putMany(recordsByStore) {
    var names = Object.keys(recordsByStore);
    return transaction(names, 'readwrite', function (tx) {
      names.forEach(function (name) {
        var store = tx.objectStore(name);
        (recordsByStore[name] || []).forEach(function (value) { store.put(value); });
      });
      return null;
    });
  }

  App.persistence = {
    name: DB_NAME,
    version: DB_VERSION,
    stores: STORE_NAMES.slice(),
    open: open,
    transaction: transaction,
    get: get,
    getAll: getAll,
    put: put,
    remove: remove,
    clear: clear,
    replace: replace,
    replaceMany: replaceMany,
    putMany: putMany
  };
})();
