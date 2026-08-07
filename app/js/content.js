/* ═══════════════════════════════════════════════════════════
   ReviewApp · content.js
   Registry, manifest loader, deep-scan, search
   ═══════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var App = window.ReviewApp;
  var utils = App.core.utils;

  var registry = {
    certs: [],
    questions: [],
    flashcards: [],
    labs: [],
    notes: []
  };
  var manifest = null;
  var loadToken = 0;

  function setManifest(m) {
    manifest = m;
  }

  function register(payload) {
    if (!payload || !payload.type || !payload.cert) {
      console.warn('Invalid register payload', payload);
      return;
    }
    var items = payload.items || [];
    var chapter = payload.chapter || '';
    var type = payload.type;
    var cert = payload.cert;

    items.forEach(function (item, idx) {
      var entry = Object.assign({}, item);
      entry._cert = cert;
      entry._chapter = chapter;
      entry._type = type;
      entry._id = entry.id || (cert + ':' + type + ':' + chapter + ':' + idx);
      entry._key = entry._id;

      if (type === 'questions') {
        entry.qId = entry._id;
        registry.questions.push(entry);
      } else if (type === 'flashcards') {
        registry.flashcards.push(entry);
      } else if (type === 'labs') {
        registry.labs.push(entry);
      } else if (type === 'notes') {
        registry.notes.push(entry);
      }
    });
  }

  function wipe() {
    registry.questions = [];
    registry.flashcards = [];
    registry.labs = [];
    registry.notes = [];
  }

  function injectScript(src, onload, onerror) {
    var s = document.createElement('script');
    s.src = src;
    s.async = false;
    s.onload = onload;
    s.onerror = onerror || function () {
      console.warn('Failed to load', src);
      if (onload) onload();
    };
    document.head.appendChild(s);
    return s;
  }

  function loadManifestFiles(files, cb) {
    if (!files || !files.length) {
      if (cb) cb();
      return;
    }
    var remaining = files.length;
    var t = Date.now();
    files.forEach(function (f) {
      var path = 'certifications/' + f + (f.indexOf('?') >= 0 ? '&' : '?') + 't=' + t;
      injectScript(path, function () {
        remaining--;
        if (remaining <= 0 && cb) cb();
      }, function () {
        remaining--;
        if (remaining <= 0 && cb) cb();
      });
    });
  }

  function load(cb) {
    wipe();
    loadToken++;
    var myToken = loadToken;
    var t = Date.now();

    // Try snapshot first if present
    var snap = App.store.getContentSnapshot();
    if (snap && snap.registry) {
      registry = snap.registry;
      if (snap.manifest) manifest = snap.manifest;
      if (cb) cb();
      return;
    }

    injectScript('certifications/_manifest.js?t=' + t, function () {
      if (myToken !== loadToken) return;
      if (!manifest) {
        console.warn('No manifest loaded');
        if (cb) cb();
        return;
      }
      registry.certs = (manifest.certs || []).slice();
      loadManifestFiles(manifest.files || [], function () {
        if (myToken !== loadToken) return;
        if (cb) cb();
      });
    }, function () {
      console.warn('Manifest missing — using empty registry');
      if (cb) cb();
    });
  }

  function reload() {
    // Clear snapshot so we re-read from files
    App.store.remove('contentSnapshot');
    wipe();
    loadToken++;
    var myToken = loadToken;
    var t = Date.now();

    injectScript('certifications/_manifest.js?t=' + t, function () {
      if (myToken !== loadToken) return;
      if (!manifest) {
        App.toast('No manifest found', 'error');
        return;
      }
      registry.certs = (manifest.certs || []).slice();
      loadManifestFiles(manifest.files || [], function () {
        if (myToken !== loadToken) return;
        var q = registry.questions.length;
        var c = registry.flashcards.length;
        var l = registry.labs.length;
        var n = registry.notes.length;
        var nc = registry.certs.length;
        App.toast('Loaded ' + q + ' questions · ' + c + ' cards · ' + l + ' labs · ' + n + ' notes from ' + nc + ' certifications', 'success', 4000);
        App.core.handleRoute();
      });
    }, function () {
      App.toast('Failed to load manifest', 'error');
    });
  }

  /* ── Deep scan ──────────────────────────────────────────── */
  function deepScan(files, saveSnapshot, cb) {
    wipe();
    var found = { questions: 0, flashcards: 0, labs: 0, notes: 0, files: 0 };
    var pending = 0;
    var done = 0;

    function finishOne() {
      done++;
      if (done >= pending) {
        if (saveSnapshot) {
          App.store.saveContentSnapshot({
            registry: JSON.parse(JSON.stringify(registry)),
            manifest: manifest,
            ts: Date.now()
          });
        }
        if (cb) cb(found);
      }
    }

    Array.prototype.forEach.call(files, function (file) {
      var name = file.name || '';
      var path = (file.webkitRelativePath || name).replace(/\\/g, '/');
      if (!/\.(js|json)$/i.test(name)) return;
      // Skip non-content paths lightly
      pending++;
      found.files++;

      var reader = new FileReader();
      reader.onload = function (e) {
        var text = e.target.result;
        try {
          if (/\.json$/i.test(name)) {
            var data = JSON.parse(text);
            if (data.type && data.cert) {
              register(data);
              found[data.type] = (found[data.type] || 0) + (data.items ? data.items.length : 0);
            }
            finishOne();
          } else {
            // JS: create blob URL and inject
            var blob = new Blob([text], { type: 'application/javascript' });
            var url = URL.createObjectURL(blob);
            var beforeQ = registry.questions.length;
            var beforeC = registry.flashcards.length;
            var beforeL = registry.labs.length;
            var beforeN = registry.notes.length;
            injectScript(url, function () {
              found.questions += registry.questions.length - beforeQ;
              found.flashcards += registry.flashcards.length - beforeC;
              found.labs += registry.labs.length - beforeL;
              found.notes += registry.notes.length - beforeN;
              URL.revokeObjectURL(url);
              finishOne();
            }, function () {
              URL.revokeObjectURL(url);
              finishOne();
            });
          }
        } catch (err) {
          console.warn('Deep-scan parse error', path, err);
          finishOne();
        }
      };
      reader.onerror = function () { finishOne(); };
      reader.readAsText(file);
    });

    if (pending === 0 && cb) cb(found);
  }

  /* ── Accessors ──────────────────────────────────────────── */
  function getCerts() { return registry.certs.slice(); }

  function getCert(id) {
    return registry.certs.find(function (c) { return c.id === id; });
  }

  function getAll(type) {
    if (type === 'questions') return registry.questions.slice();
    if (type === 'flashcards') return registry.flashcards.slice();
    if (type === 'labs') return registry.labs.slice();
    if (type === 'notes') return registry.notes.slice();
    return [];
  }

  function getByCert(type, certId) {
    return getAll(type).filter(function (i) { return i._cert === certId; });
  }

  function getChapters(certId, type) {
    var items = certId ? getByCert(type || 'questions', certId) : getAll(type || 'questions');
    var map = {};
    items.forEach(function (i) {
      var ch = i._chapter || 'General';
      if (!map[ch]) map[ch] = [];
      map[ch].push(i);
    });
    return map;
  }

  function getTags(type) {
    var items = getAll(type || 'questions');
    var set = {};
    items.forEach(function (i) {
      (i.tags || []).forEach(function (t) { set[t] = true; });
    });
    return Object.keys(set).sort();
  }

  function getQuestionById(id) {
    return registry.questions.find(function (q) { return q._id === id || q.qId === id; });
  }

  function counts() {
    return {
      questions: registry.questions.length,
      flashcards: registry.flashcards.length,
      labs: registry.labs.length,
      notes: registry.notes.length,
      certs: registry.certs.length
    };
  }

  /* ── Search ─────────────────────────────────────────────── */
  function search(q) {
    q = (q || '').toLowerCase();
    var results = [];

    registry.questions.forEach(function (item) {
      var text = (item.q || '') + ' ' + (item.explain || '') + ' ' + (item.tags || []).join(' ');
      if (text.toLowerCase().indexOf(q) >= 0) {
        results.push({
          group: 'Questions',
          title: item.q.slice(0, 80) + (item.q.length > 80 ? '…' : ''),
          meta: item._cert + ' · ' + (item._chapter || ''),
          action: function () {
            var body = document.createElement('div');
            if (App.quiz && App.quiz.renderSingle) {
              App.quiz.renderSingle(body, item);
            } else {
              body.textContent = item.q;
            }
            App.core.openModal(body, { title: 'Practice Question' });
          }
        });
      }
    });

    registry.flashcards.forEach(function (item) {
      var text = (item.front || '') + ' ' + (item.back || '') + ' ' + (item.tags || []).join(' ');
      if (text.toLowerCase().indexOf(q) >= 0) {
        results.push({
          group: 'Flashcards',
          title: item.front.slice(0, 70),
          meta: item._cert + ' · ' + (item._chapter || ''),
          action: function () {
            App.core.navigate('#/flashcards');
            setTimeout(function () {
              if (App.flashcards && App.flashcards.startWithCard) {
                App.flashcards.startWithCard(item);
              }
            }, 100);
          }
        });
      }
    });

    registry.labs.forEach(function (item) {
      var text = (item.title || '') + ' ' + (item.tags || []).join(' ') + ' ' + (item.scenario || '');
      if (text.toLowerCase().indexOf(q) >= 0) {
        results.push({
          group: 'Labs',
          title: item.title,
          meta: item._cert + ' · difficulty ' + (item.difficulty || '?'),
          action: function () {
            App.core.navigate('#/labs/' + encodeURIComponent(item._id));
          }
        });
      }
    });

    registry.notes.forEach(function (item) {
      var text = (item.title || '') + ' ' + (item.body || '') + ' ' + (item.tags || []).join(' ');
      if (text.toLowerCase().indexOf(q) >= 0) {
        results.push({
          group: 'Notes',
          title: item.title,
          meta: item._cert || 'bundled',
          action: function () {
            App.core.navigate('#/notes/' + encodeURIComponent(item._id));
          }
        });
      }
    });

    // Tools data
    if (App.tools) {
      var ports = App.tools.getPorts ? App.tools.getPorts() : [];
      ports.forEach(function (p) {
        var text = p.port + ' ' + p.name + ' ' + (p.desc || '');
        if (text.toLowerCase().indexOf(q) >= 0) {
          results.push({
            group: 'Ports',
            title: p.port + ' — ' + p.name,
            meta: p.desc || '',
            action: function () {
              if (App.tools.highlightPort) App.tools.highlightPort(p.port);
              App.core.navigate('#/tools');
            }
          });
        }
      });
      var cmds = App.tools.getCommands ? App.tools.getCommands() : [];
      cmds.forEach(function (c) {
        var text = c.cmd + ' ' + (c.desc || '') + ' ' + (c.example || '');
        if (text.toLowerCase().indexOf(q) >= 0) {
          results.push({
            group: 'Commands',
            title: c.cmd,
            meta: c.desc || '',
            action: function () {
              if (App.tools.highlightCommand) App.tools.highlightCommand(c.cmd);
              App.core.navigate('#/tools');
            }
          });
        }
      });
    }

    // Permissions calculator tool
    if (App.tools && App.tools.getCommonModes) {
      var permKeys = ['chmod', 'permission', 'setuid', 'setgid', 'sticky', 'octal', 'rwx', 'umask', 'symbolic'];
      var qHit = permKeys.some(function (k) { return q.indexOf(k) >= 0; });
      if (qHit) {
        results.push({
          group: 'Tools',
          title: 'Permissions calculator',
          meta: 'chmod · octal ↔ rwx ↔ symbolic · special bits',
          action: function () {
            if (App.tools.highlightTool) App.tools.highlightTool('perms');
            App.core.navigate('#/tools');
          }
        });
      }
    }

    return results.slice(0, 40);
  }

  App.content = {
    setManifest: setManifest,
    register: register,
    load: load,
    reload: reload,
    deepScan: deepScan,
    getCerts: getCerts,
    getCert: getCert,
    getAll: getAll,
    getByCert: getByCert,
    getChapters: getChapters,
    getTags: getTags,
    getQuestionById: getQuestionById,
    counts: counts,
    search: search,
    getRegistry: function () { return registry; }
  };
})();
