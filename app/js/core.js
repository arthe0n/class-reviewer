/* ═══════════════════════════════════════════════════════════
   ReviewApp · core.js
   Namespace, utils, hash router, toasts, modal
   ═══════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  if (!window.ReviewApp) window.ReviewApp = {};

  var App = window.ReviewApp;

  /* ── Utils ──────────────────────────────────────────────── */
  var utils = {
    $: function (sel, ctx) { return (ctx || document).querySelector(sel); },
    $$: function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); },

    el: function (tag, attrs, children) {
      var node = document.createElement(tag);
      if (attrs) {
        Object.keys(attrs).forEach(function (k) {
          if (k === 'className') node.className = attrs[k];
          else if (k === 'text') node.textContent = attrs[k];
          else if (k === 'html') node.innerHTML = attrs[k];
          else if (k === 'style' && typeof attrs[k] === 'object') {
            Object.keys(attrs[k]).forEach(function (s) { node.style[s] = attrs[k][s]; });
          } else if (k.slice(0, 2) === 'on' && typeof attrs[k] === 'function') {
            node.addEventListener(k.slice(2).toLowerCase(), attrs[k]);
          } else if (attrs[k] !== undefined && attrs[k] !== null) {
            node.setAttribute(k, attrs[k]);
          }
        });
      }
      if (children) {
        (Array.isArray(children) ? children : [children]).forEach(function (c) {
          if (c == null) return;
          if (typeof c === 'string') node.appendChild(document.createTextNode(c));
          else node.appendChild(c);
        });
      }
      return node;
    },

    shuffle: function (arr) {
      var a = arr.slice();
      for (var i = a.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var t = a[i]; a[i] = a[j]; a[j] = t;
      }
      return a;
    },

    uid: function () {
      return 'id_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
    },

    clamp: function (n, min, max) { return Math.max(min, Math.min(max, n)); },

    formatTime: function (secs) {
      var m = Math.floor(secs / 60);
      var s = secs % 60;
      return (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
    },

    formatDate: function (ts) {
      var d = new Date(ts);
      return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
    },

    debounce: function (fn, ms) {
      var t;
      return function () {
        var ctx = this, args = arguments;
        clearTimeout(t);
        t = setTimeout(function () { fn.apply(ctx, args); }, ms);
      };
    },

    downloadBlob: function (blob, filename) {
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      setTimeout(function () {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, 100);
    },

    copyText: function (text) {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        return navigator.clipboard.writeText(text).then(function () { return true; }).catch(function () {
          return utils._fallbackCopy(text);
        });
      }
      return Promise.resolve(utils._fallbackCopy(text));
    },

    _fallbackCopy: function (text) {
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.left = '-9999px';
      document.body.appendChild(ta);
      ta.select();
      var ok = false;
      try { ok = document.execCommand('copy'); } catch (e) {}
      document.body.removeChild(ta);
      return ok;
    },

    prefersReducedMotion: function () {
      return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    },

    countUp: function (el, target, duration) {
      if (!motionEnabled()) {
        el.textContent = String(target);
        return;
      }
      var start = 0;
      var startTime = null;
      duration = duration || 800;
      function step(ts) {
        if (!startTime) startTime = ts;
        var p = Math.min((ts - startTime) / duration, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = String(Math.round(start + (target - start) * eased));
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    },

    escapeHtml: function (str) {
      var d = document.createElement('div');
      d.textContent = str;
      return d.innerHTML;
    }
  };

  /* ── Toasts ─────────────────────────────────────────────── */
  var toastRoot = null;
  function toast(msg, type, ms) {
    type = type || 'info';
    ms = ms || 3200;
    if (!toastRoot) toastRoot = utils.$('#toast-root');
    var t = utils.el('div', { className: 'toast ' + type, role: 'status' }, [
      utils.el('span', { text: msg })
    ]);
    toastRoot.appendChild(t);
    setTimeout(function () {
      t.style.opacity = '0';
      t.style.transform = 'translateY(8px)';
      t.style.transition = 'opacity 0.25s, transform 0.25s';
      setTimeout(function () { if (t.parentNode) t.parentNode.removeChild(t); }, 280);
    }, ms);
  }

  /* ── Modal ──────────────────────────────────────────────── */
  var _modalCloseTimer = null;
  function openModal(content, opts) {
    opts = opts || {};
    var root = utils.$('#modal-root');
    if (_modalCloseTimer) { clearTimeout(_modalCloseTimer); _modalCloseTimer = null; }
    root.classList.remove('closing');
    root.innerHTML = '';
    root.hidden = false;
    var modal = utils.el('div', { className: 'modal', role: 'dialog', 'aria-modal': 'true' });
    if (opts.title) {
      var header = utils.el('div', { className: 'modal-header' }, [
        utils.el('h2', { text: opts.title }),
        utils.el('button', {
          className: 'modal-close',
          'aria-label': 'Close',
          onClick: closeModal
        }, [utils.el('span', { html: '&times;', style: { fontSize: '1.4rem' } })])
      ]);
      modal.appendChild(header);
    }
    if (typeof content === 'string') {
      modal.appendChild(utils.el('div', { html: content }));
    } else {
      modal.appendChild(content);
    }
    root.appendChild(modal);
    document.addEventListener('keydown', _modalEsc);
    root.addEventListener('click', _modalBackdrop);
    var focusable = modal.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (focusable) focusable.focus();
  }

  function closeModal() {
    var root = utils.$('#modal-root');
    if (!root || root.hidden) return;
    root.classList.add('closing');
    if (_modalCloseTimer) clearTimeout(_modalCloseTimer);
    _modalCloseTimer = setTimeout(function () {
      _modalCloseTimer = null;
      root.hidden = true;
      root.classList.remove('closing');
      root.innerHTML = '';
      document.removeEventListener('keydown', _modalEsc);
      root.removeEventListener('click', _modalBackdrop);
    }, 130);
  }

  function _modalEsc(e) { if (e.key === 'Escape') closeModal(); }
  function _modalBackdrop(e) { if (e.target === utils.$('#modal-root')) closeModal(); }

  /* ── Hash Router ────────────────────────────────────────── */
  var routes = {};
  var currentRoute = null;
  var currentParams = {};

  function registerRoute(path, handler) {
    routes[path] = handler;
  }

  function navigate(hash) {
    if (hash.charAt(0) !== '#') hash = '#' + hash;
    if (location.hash !== hash) location.hash = hash;
    else handleRoute();
  }

  function parseHash() {
    var h = (location.hash || '#/dashboard').replace(/^#\/?/, '');
    var parts = h.split('/').filter(Boolean);
    return { path: parts[0] || 'dashboard', parts: parts, params: parts.slice(1) };
  }

  function handleRoute() {
    var parsed = parseHash();
    currentRoute = parsed.path;
    currentParams = parsed;
    // Update nav active state
    utils.$$('.nav-item').forEach(function (a) {
      var r = a.getAttribute('data-route');
      a.classList.toggle('active', r === currentRoute);
      if (r === currentRoute) a.setAttribute('aria-current', 'page');
      else a.removeAttribute('aria-current');
    });
    var handler = routes[currentRoute] || routes['dashboard'];
    var root = utils.$('#view-root');
    root.innerHTML = '';
    if (handler) {
      try {
        handler(root, parsed);
      } catch (err) {
        console.error('Route error:', err);
        root.appendChild(utils.el('div', { className: 'empty-state' }, [
          utils.el('h3', { text: 'Something went wrong' }),
          utils.el('p', { text: String(err.message || err) })
        ]));
      }
    }
    // Animate progress indicators into their final values (visual only)
    if (motionEnabled()) {
      utils.$$('.progress-fill', root).forEach(function (fill) {
        var w = fill.style.width;
        if (w) {
          fill.style.width = '0%';
          requestAnimationFrame(function () {
            requestAnimationFrame(function () { fill.style.width = w; });
          });
        }
      });
      utils.$$('.progress-ring-fg', root).forEach(function (ring) {
        var dash = ring.getAttribute('stroke-dasharray');
        var off = ring.getAttribute('stroke-dashoffset');
        if (dash && off) {
          ring.setAttribute('stroke-dashoffset', dash);
          requestAnimationFrame(function () {
            requestAnimationFrame(function () { ring.setAttribute('stroke-dashoffset', off); });
          });
        }
      });
    }
  }

  /* ── Sidebar ────────────────────────────────────────────── */
  function initSidebar() {
    var sidebar = utils.$('#sidebar');
    var toggle = utils.$('#sidebar-toggle');
    var mobile = utils.$('#mobile-menu');
    var collapsed = localStorage.getItem('reviewapp.v1.sidebar') === '1';
    if (collapsed) sidebar.classList.add('collapsed');

    if (toggle) {
      function setToggleLabel(isCollapsed) {
        toggle.setAttribute('aria-label', isCollapsed ? 'Expand sidebar' : 'Collapse sidebar');
        toggle.setAttribute('title', isCollapsed ? 'Expand sidebar' : 'Collapse sidebar');
      }
      setToggleLabel(collapsed);
      toggle.addEventListener('click', function () {
        var isCollapsed = sidebar.classList.toggle('collapsed');
        localStorage.setItem('reviewapp.v1.sidebar', isCollapsed ? '1' : '0');
        setToggleLabel(isCollapsed);
      });
    }
    if (mobile) {
      mobile.addEventListener('click', function () {
        sidebar.classList.toggle('open');
      });
    }
    // Close mobile sidebar on nav click
    utils.$$('.nav-item').forEach(function (a) {
      a.addEventListener('click', function () {
        sidebar.classList.remove('open');
      });
    });
  }

  /* ── Global search ──────────────────────────────────────── */
  function initSearch() {
    var input = utils.$('#global-search');
    var results = utils.$('#search-results');
    if (!input || !results) return;
    var activeIndex = -1;

    function resultButtons() {
      return utils.$$('.search-item:not(.text-muted)', results);
    }

    function setActive(index) {
      var buttons = resultButtons();
      if (!buttons.length) { activeIndex = -1; return; }
      activeIndex = (index + buttons.length) % buttons.length;
      buttons.forEach(function (btn, i) {
        btn.classList.toggle('active', i === activeIndex);
        btn.setAttribute('aria-selected', i === activeIndex ? 'true' : 'false');
      });
      buttons[activeIndex].scrollIntoView({ block: 'nearest' });
    }

    function closeResults(clearInput) {
      results.hidden = true;
      results.innerHTML = '';
      activeIndex = -1;
      if (clearInput) input.value = '';
    }

    var run = utils.debounce(function () {
      var q = input.value.trim().toLowerCase();
      if (q.length < 2) {
        closeResults(false);
        return;
      }
      var hits = App.content.search(q);
      results.innerHTML = '';
      activeIndex = -1;
      if (!hits.length) {
        results.appendChild(utils.el('div', { className: 'search-group' }, [
          utils.el('div', { className: 'search-item text-muted', text: 'No results' })
        ]));
        results.hidden = false;
        return;
      }
      var groups = {};
      hits.forEach(function (h) {
        if (!groups[h.group]) groups[h.group] = [];
        groups[h.group].push(h);
      });
      Object.keys(groups).forEach(function (g) {
        var wrap = utils.el('div', { className: 'search-group' });
        wrap.appendChild(utils.el('div', { className: 'search-group-label', text: g }));
        groups[g].slice(0, 8).forEach(function (h) {
          var btn = utils.el('button', {
            className: 'search-item',
            role: 'option',
            'aria-selected': 'false',
            onClick: function () {
              closeResults(true);
              if (h.action) h.action();
            }
          }, [
            utils.el('div', { text: h.title }),
            h.meta ? utils.el('div', { className: 'meta', text: h.meta }) : null
          ]);
          btn.addEventListener('mouseenter', function () {
            var buttons = resultButtons();
            setActive(buttons.indexOf(btn));
          });
          wrap.appendChild(btn);
        });
        results.appendChild(wrap);
      });
      results.hidden = false;
    }, 180);

    input.addEventListener('input', run);
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        closeResults(true);
        input.blur();
      } else if (!results.hidden && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
        e.preventDefault();
        setActive(activeIndex + (e.key === 'ArrowDown' ? 1 : -1));
      } else if (!results.hidden && e.key === 'Enter' && activeIndex >= 0) {
        var buttons = resultButtons();
        if (buttons[activeIndex]) {
          e.preventDefault();
          buttons[activeIndex].click();
        }
      }
    });
    document.addEventListener('click', function (e) {
      if (!input.contains(e.target) && !results.contains(e.target)) {
        closeResults(false);
      }
    });
  }

  /* ── Theme ──────────────────────────────────────────────── */
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme === 'light' ? 'light' : 'dark');
    localStorage.setItem('reviewapp.v1.theme', theme);
  }

  function initTheme() {
    var saved = localStorage.getItem('reviewapp.v1.theme') || 'dark';
    applyTheme(saved);
  }

  function applyTextSize(size) {
    var allowed = { small: true, medium: true, large: true };
    document.documentElement.setAttribute('data-text-size', allowed[size] ? size : 'medium');
  }

  /* ── Motion ─────────────────────────────────────────────── */
  // Animations are on unless the user explicitly disables them in Settings,
  // or the OS/browser asks for reduced motion.
  function motionEnabled() {
    if (utils.prefersReducedMotion()) return false;
    return document.documentElement.getAttribute('data-motion') !== 'off';
  }

  function applyMotion() {
    var on = true;
    try {
      var s = App.store && App.store.getSettings ? App.store.getSettings() : {};
      on = s.animations !== false;
    } catch (e) { on = true; }
    document.documentElement.setAttribute('data-motion', on ? 'on' : 'off');
  }

  /* ── Boot ───────────────────────────────────────────────── */
  function init() {
    initTheme();
    var settings = App.store && App.store.getSettings ? App.store.getSettings() : {};
    applyTextSize(settings.textSize || 'medium');
    applyMotion();
    initSidebar();
    initSearch();

    // Reload button
    var reloadBtn = utils.$('#reload-content');
    if (reloadBtn) {
      reloadBtn.addEventListener('click', function () {
        if (App.content && App.content.reload) App.content.reload();
      });
    }

    // Register routes (views will fill them)
    window.addEventListener('hashchange', handleRoute);

    // Load content then route
    if (App.content && App.content.load) {
      App.content.load(function () {
        handleRoute();
      });
    } else {
      handleRoute();
    }
  }

  App.core = {
    utils: utils,
    toast: toast,
    openModal: openModal,
    closeModal: closeModal,
    registerRoute: registerRoute,
    navigate: navigate,
    handleRoute: handleRoute,
    getRoute: function () { return currentRoute; },
    getParams: function () { return currentParams; },
    applyTheme: applyTheme,
    applyTextSize: applyTextSize,
    applyMotion: applyMotion,
    motionEnabled: motionEnabled,
    init: init
  };

  // Shorthand
  App.$ = utils.$;
  App.$$ = utils.$$;
  App.el = utils.el;
  App.toast = toast;
})();
