/* ═══════════════════════════════════════════════════════════
   ReviewApp · views.js
   All view renderers + route registration
   ═══════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var App = window.ReviewApp;
  var utils = App.core.utils;
  var el = utils.el;
  var $ = utils.$;

  function emptyState(title, msg) {
    return el('div', { className: 'empty-state' }, [
      el('h3', { text: title }),
      el('p', { text: msg })
    ]);
  }

  function progressRing(pct, size, color) {
    size = size || 72;
    var r = (size - 8) / 2;
    var c = 2 * Math.PI * r;
    var offset = c - (pct / 100) * c;
    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', size);
    svg.setAttribute('height', size);
    svg.setAttribute('class', 'progress-ring');
    svg.innerHTML =
      '<circle class="progress-ring-bg" cx="' + (size/2) + '" cy="' + (size/2) + '" r="' + r + '" fill="none" stroke-width="6"/>' +
      '<circle class="progress-ring-fg" cx="' + (size/2) + '" cy="' + (size/2) + '" r="' + r + '" fill="none" stroke-width="6" ' +
      'stroke="' + (color || 'var(--accent-green)') + '" stroke-dasharray="' + c + '" stroke-dashoffset="' + offset + '"/>';
    return svg;
  }

  function weekdayOf(ts) {
    return new Date(ts).toLocaleDateString(undefined, { weekday: 'short' });
  }

  var COMMANDS_OF_DAY = [
    { cmd: 'chmod 755 script.sh', tip: 'Owner rwx, group/other rx — classic executable perms.' },
    { cmd: 'ss -tulpn', tip: 'Show listening TCP/UDP sockets with process names.' },
    { cmd: 'find / -name "*.conf" 2>/dev/null', tip: 'Locate config files, suppress permission errors.' },
    { cmd: 'journalctl -u ssh -f', tip: 'Follow SSH service logs in real time.' },
    { cmd: 'ip addr show', tip: 'Modern replacement for ifconfig — list interfaces and IPs.' },
    { cmd: 'sudo systemctl status nginx', tip: 'Check whether a systemd unit is active and recent logs.' },
    { cmd: 'grep -rn "PermitRootLogin" /etc/ssh', tip: 'Search recursively with line numbers.' },
    { cmd: 'df -h && free -h', tip: 'Quick disk and memory health check.' },
    { cmd: 'tar -czvf backup.tar.gz /etc', tip: 'Create a compressed archive of /etc.' },
    { cmd: 'useradd -m -s /bin/bash alice', tip: 'Create user with home dir and bash shell.' }
  ];

  function viewDashboard(root) {
    var counts = App.content.counts();
    var stats = App.store.getDashboardStats();
    var certs = App.content.getCerts();

    var termText = 'reviewapp v1.0 — bank: ' + counts.questions + ' questions · ' +
      counts.flashcards + ' cards · ' + counts.labs + ' labs — SYSTEM READY';
    var strip = el('div', { className: 'terminal-strip', 'aria-label': 'System status' });
    root.appendChild(strip);
    if (!App.core.motionEnabled()) {
      strip.textContent = termText;
    } else {
      var i = 0;
      function type() {
        if (i <= termText.length) {
          strip.innerHTML = utils.escapeHtml(termText.slice(0, i)) + '<span class="terminal-cursor"></span>';
          i++;
          setTimeout(type, 18 + Math.random() * 20);
        } else {
          strip.textContent = termText;
        }
      }
      type();
    }

    var grid = el('div', { className: 'stat-grid' });
    var tiles = [
      { label: 'Accuracy', value: stats.accuracy, suffix: '%' },
      { label: 'Streak', value: stats.streakDays, suffix: 'd' },
      { label: 'Cards Due', value: stats.cardsDue, suffix: '' },
      { label: 'Labs Done', value: stats.labsDone, suffix: '' },
      { label: 'Answered', value: stats.totalAnswered, suffix: '' }
    ];
    tiles.forEach(function (t) {
      var tile = el('div', { className: 'stat-tile' });
      var val = el('div', { className: 'stat-value' });
      tile.appendChild(val);
      tile.appendChild(el('div', { className: 'stat-label', text: t.label }));
      grid.appendChild(tile);
      utils.countUp(val, t.value, 700);
      if (t.suffix) setTimeout(function () { val.textContent = t.value + t.suffix; }, 750);
    });
    root.appendChild(grid);

    var nextStep = el('div', { className: 'panel mt-3 dashboard-next-step' });
    nextStep.appendChild(el('div', { className: 'label-upper mb-1', text: 'Recommended next step' }));
    if (stats.cardsDue) {
      nextStep.appendChild(el('h3', { text: stats.cardsDue + ' flashcard' + (stats.cardsDue === 1 ? '' : 's') + ' due for review' }));
      nextStep.appendChild(el('p', { className: 'text-muted mb-2', text: 'A short review now keeps older material fresh.' }));
      nextStep.appendChild(el('button', { className: 'btn btn-primary btn-sm', text: 'Review flashcards', onClick: function () { App.core.navigate('#/flashcards'); } }));
    } else {
      var weak = App.store.weakQuestions(60);
      if (weak.length) {
        nextStep.appendChild(el('h3', { text: 'Practice your weak spots' }));
        nextStep.appendChild(el('p', { className: 'text-muted mb-2', text: weak.length + ' question' + (weak.length === 1 ? '' : 's') + ' need more practice.' }));
        nextStep.appendChild(el('button', { className: 'btn btn-primary btn-sm', text: 'Start weak-spots quiz', onClick: function () { App.core.navigate('#/quiz'); } }));
      } else {
        nextStep.appendChild(el('h3', { text: 'Keep building momentum' }));
        nextStep.appendChild(el('p', { className: 'text-muted mb-2', text: 'Start a chapter quiz to grow your question coverage.' }));
        nextStep.appendChild(el('button', { className: 'btn btn-primary btn-sm', text: 'Start a quiz', onClick: function () { App.core.navigate('#/quiz'); } }));
      }
    }
    root.appendChild(nextStep);

    if (certs.length) {
      root.appendChild(el('h2', { className: 'mb-2', text: 'Certification Progress' }));
      var certRow = el('div', { className: 'card-grid' });
      certs.forEach(function (c) {
        var qs = App.content.getByCert('questions', c.id);
        var ans = App.store.getAnswers({ cert: c.id });
        var seen = {};
        ans.forEach(function (a) { seen[a.qId] = true; });
        var pct = qs.length ? Math.round((Object.keys(seen).length / qs.length) * 100) : 0;
        var acc = App.store.accuracyFor({ cert: c.id });
        var card = el('div', { className: 'card', style: { display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer' } });
        card.appendChild(progressRing(pct, 68, c.color || 'var(--accent-green)'));
        var info = el('div');
        info.appendChild(el('div', { className: 'mono', style: { fontWeight: '700', color: c.color }, text: c.name }));
        info.appendChild(el('div', { className: 'text-muted', style: { fontSize: '0.85rem' },
          text: pct + '% explored · ' + (acc != null ? acc + '% accuracy' : 'no attempts') }));
        info.appendChild(el('div', { className: 'text-muted', style: { fontSize: '0.8rem' },
          text: qs.length + ' Q · ' + App.content.getByCert('flashcards', c.id).length + ' cards' }));
        card.appendChild(info);
        card.addEventListener('click', function () { App.core.navigate('#/certifications/' + c.id); });
        certRow.appendChild(card);
      });
      root.appendChild(certRow);
    }

    var last = App.store.getSettings().lastStudy;
    var cont = el('div', { className: 'panel mt-3' });
    cont.appendChild(el('div', { className: 'label-upper mb-1', text: 'Continue studying' }));
    if (last) {
      cont.appendChild(el('p', { className: 'mb-1', text: 'Last session: ' + last.type + (last.mode ? ' · ' + last.mode : '') + ' — ' + utils.formatDate(last.ts) }));
      var btnRow = el('div', { className: 'flex gap-sm' });
      btnRow.appendChild(el('button', { className: 'btn btn-primary btn-sm', text: 'Resume Quiz', onClick: function () { App.core.navigate('#/quiz'); } }));
      btnRow.appendChild(el('button', { className: 'btn btn-secondary btn-sm', text: 'Flashcards', onClick: function () { App.core.navigate('#/flashcards'); } }));
      cont.appendChild(btnRow);
    } else {
      cont.appendChild(el('p', { className: 'text-muted', text: 'Start a quiz or flashcard session to track progress here.' }));
    }
    root.appendChild(cont);

    var activity = App.store.getActivity(14);
    var totals = activity.reduce(function (acc, d) {
      acc.count += d.count;
      acc.correct += d.correct || 0;
      return acc;
    }, { count: 0, correct: 0 });
    var best = activity.reduce(function (b, d) { return d.count > b.count ? d : b; }, activity[0] || { date: Date.now(), count: 0 });
    var maxC = Math.max.apply(null, activity.map(function (d) { return d.count; }).concat([1]));
    var nowDay = new Date(); nowDay.setHours(0, 0, 0, 0);
    var todayTs = nowDay.getTime();
    var today = activity.filter(function (d) { return d.date === todayTs; })[0];

    var sparkWrap = el('div', { className: 'panel mt-3' });
    var actHead = el('div', { className: 'flex-between mb-1', style: { flexWrap: 'wrap', alignItems: 'baseline' } });
    actHead.appendChild(el('div', { className: 'label-upper', text: '14-day activity' }));
    if (totals.count) {
      actHead.appendChild(el('span', { className: 'text-muted mono', style: { fontSize: '0.78rem' },
        text: totals.count + ' answers · ' + Math.round((totals.correct / totals.count) * 100) + '% correct · best ' +
          weekdayOf(best.date) + ' (' + best.count + ')' + (today && today.count ? ' · today ' + today.count : '') }));
    } else {
      actHead.appendChild(el('span', { className: 'text-muted mono', style: { fontSize: '0.78rem' }, text: 'No answers logged in the last 14 days' }));
    }
    sparkWrap.appendChild(actHead);
    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'activity-chart dashboard-activity');
    svg.setAttribute('viewBox', '0 0 280 58');
    svg.setAttribute('preserveAspectRatio', 'none');
    svg.setAttribute('role', 'img');
    svg.setAttribute('aria-label', 'Answers per day over the last 14 days');
    var w = 280 / activity.length;
    activity.forEach(function (d, i) {
      var h = Math.max(2, (d.count / maxC) * 50);
      var isToday = d.date === todayTs;
      var rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      rect.setAttribute('x', i * w + 2);
      rect.setAttribute('y', 54 - h);
      rect.setAttribute('width', Math.max(3, w - 4));
      rect.setAttribute('height', h);
      rect.setAttribute('rx', '2');
      rect.setAttribute('fill', d.count ? (isToday ? 'var(--accent-green)' : 'var(--accent-cyan)') : 'var(--border)');
      if (d.count) {
        var tip = document.createElementNS('http://www.w3.org/2000/svg', 'title');
        tip.textContent = utils.formatDate(d.date) + ' — ' + d.count + ' answer' + (d.count === 1 ? '' : 's') +
          (d.correct ? ' (' + d.correct + ' correct)' : '');
        rect.appendChild(tip);
      }
      svg.appendChild(rect);
    });
    sparkWrap.appendChild(svg);
    var labels = el('div', { className: 'activity-labels' });
    activity.forEach(function (d) {
      labels.appendChild(el('span', {
        className: 'activity-label' + (d.date === todayTs ? ' today' : ''),
        title: utils.formatDate(d.date),
        text: weekdayOf(d.date).slice(0, 2)
      }));
    });
    sparkWrap.appendChild(labels);
    root.appendChild(sparkWrap);

    var dayIdx = Math.floor(Date.now() / 86400000) % COMMANDS_OF_DAY.length;
    var cotd = COMMANDS_OF_DAY[dayIdx];
    var daily = el('div', { className: 'daily-grid mt-3' });
    var cmdCard = el('div', { className: 'panel' });
    cmdCard.appendChild(el('div', { className: 'label-upper mb-1', text: 'Command of the day' }));
    cmdCard.appendChild(el('div', { className: 'code-block', text: cotd.cmd }));
    cmdCard.appendChild(el('p', { className: 'text-muted mt-1', style: { fontSize: '0.88rem' }, text: cotd.tip }));
    daily.appendChild(cmdCard);
    var ports = App.tools && App.tools.getPorts ? App.tools.getPorts() : [];
    if (ports.length) {
      var potd = ports[Math.floor(Date.now() / 86400000) % ports.length];
      var portCard = el('div', { className: 'panel' });
      portCard.appendChild(el('div', { className: 'label-upper mb-1', text: 'Port of the day' }));
      portCard.appendChild(el('div', { className: 'code-block port-block' }, [
        el('span', { className: 'port-num', text: potd.port }),
        el('span', { className: 'port-name', text: potd.name })
      ]));
      portCard.appendChild(el('p', { className: 'text-muted mt-1', style: { fontSize: '0.88rem' }, text: potd.desc }));
      portCard.appendChild(el('button', {
        className: 'btn btn-secondary btn-sm mt-1', text: 'Open Port Reference',
        onClick: function () {
          if (App.tools.highlightPort) App.tools.highlightPort(potd.port);
          App.core.navigate('#/tools');
        }
      }));
      daily.appendChild(portCard);
    }
    root.appendChild(daily);
  }

  function viewCertifications(root, parsed) {
    var certId = parsed.params[0];
    if (certId) return viewCertDetail(root, certId);
    var certs = App.content.getCerts();
    root.appendChild(el('h1', { text: 'Certifications' }));
    root.appendChild(el('p', { className: 'text-muted mb-3', text: 'Choose a track to explore chapters and launch practice.' }));
    if (!certs.length) {
      root.appendChild(emptyState('No certifications loaded', 'Drop content into certifications/ and hit the reload button.'));
      return;
    }
    var grid = el('div', { className: 'card-grid' });
    certs.forEach(function (c) {
      var qs = App.content.getByCert('questions', c.id);
      var cards = App.content.getByCert('flashcards', c.id);
      var labs = App.content.getByCert('labs', c.id);
      var acc = App.store.accuracyFor({ cert: c.id });
      var ans = App.store.getAnswers({ cert: c.id });
      var seen = {};
      ans.forEach(function (a) { seen[a.qId] = true; });
      var pct = qs.length ? Math.round((Object.keys(seen).length / qs.length) * 100) : 0;
      var card = el('div', { className: 'card', style: { cursor: 'pointer', borderTop: '3px solid ' + (c.color || 'var(--accent-green)') } });
      card.appendChild(el('h3', { style: { color: c.color }, text: c.name }));
      card.appendChild(el('div', { className: 'flex gap-sm mt-1 mb-2', style: { flexWrap: 'wrap' } }, [
        el('span', { className: 'chip chip-muted', text: qs.length + ' questions' }),
        el('span', { className: 'chip chip-muted', text: cards.length + ' cards' }),
        el('span', { className: 'chip chip-muted', text: labs.length + ' labs' })
      ]));
      var bar = el('div', { className: 'progress-bar mb-1' });
      bar.appendChild(el('div', { className: 'progress-fill', style: { width: pct + '%', background: c.color } }));
      card.appendChild(bar);
      card.appendChild(el('div', { className: 'text-muted', style: { fontSize: '0.82rem' },
        text: pct + '% explored · ' + (acc != null ? acc + '% accuracy' : 'no data') }));
      card.addEventListener('click', function () { App.core.navigate('#/certifications/' + c.id); });
      grid.appendChild(card);
    });
    root.appendChild(grid);
  }

  function viewCertDetail(root, certId) {
    var cert = App.content.getCert(certId);
    if (!cert) { root.appendChild(emptyState('Cert not found', certId)); return; }
    root.appendChild(el('button', { className: 'btn btn-ghost btn-sm mb-2', text: '← All certifications', onClick: function () { App.core.navigate('#/certifications'); } }));
    root.appendChild(el('h1', { style: { color: cert.color }, text: cert.name }));
    var chapters = App.content.getChapters(certId, 'questions');
    var chKeys = Object.keys(chapters).sort();
    if (!chKeys.length) { root.appendChild(emptyState('No chapters yet', 'Add question files for this cert.')); return; }
    chKeys.forEach(function (ch) {
      var items = chapters[ch];
      var ans = App.store.getAnswers({ cert: certId, chapter: ch });
      var seen = {};
      ans.forEach(function (a) { seen[a.qId] = true; });
      var pct = items.length ? Math.round((Object.keys(seen).length / items.length) * 100) : 0;
      var acc = App.store.accuracyFor({ cert: certId, chapter: ch });
      var panel = el('div', { className: 'panel mb-2' });
      panel.appendChild(el('div', { className: 'flex-between mb-1' }, [
        el('h3', { text: ch }),
        el('span', { className: 'chip chip-muted', text: items.length + ' Q' })
      ]));
      var bar = el('div', { className: 'progress-bar mb-1' });
      bar.appendChild(el('div', { className: 'progress-fill', style: { width: pct + '%' } }));
      panel.appendChild(bar);
      panel.appendChild(el('div', { className: 'text-muted mb-2', style: { fontSize: '0.82rem' },
        text: pct + '% seen · ' + (acc != null ? acc + '% accuracy' : '—') }));
      var btns = el('div', { className: 'flex gap-sm' });
      btns.appendChild(el('button', {
        className: 'btn btn-primary btn-sm', text: 'Quiz chapter',
        onClick: function () {
          sessionStorage.setItem('reviewapp.quizSetup', JSON.stringify({ mode: 'chapter', cert: certId, chapter: ch }));
          App.core.navigate('#/quiz');
        }
      }));
      btns.appendChild(el('button', {
        className: 'btn btn-secondary btn-sm', text: 'Cards',
        onClick: function () {
          sessionStorage.setItem('reviewapp.fcSetup', JSON.stringify({ cert: certId, chapter: ch }));
          App.core.navigate('#/flashcards');
        }
      }));
      panel.appendChild(btns);
      root.appendChild(panel);
    });
  }

  function viewQuiz(root) {
    var sess = App.quiz.getQuizSession();
    if (sess) { renderQuizPlayer(root); return; }
    renderQuizSetup(root);
  }

  function renderQuizSetup(root) {
    root.appendChild(el('h1', { text: 'Quiz' }));
    root.appendChild(el('p', { className: 'text-muted mb-3', text: 'Five focused practice modes. Pick one and start.' }));
    var pre = null;
    try { pre = JSON.parse(sessionStorage.getItem('reviewapp.quizSetup') || 'null'); } catch (e) {}
    sessionStorage.removeItem('reviewapp.quizSetup');
    var modes = [
      { id: 'chapter', name: 'Chapter focus', desc: 'All questions from one chapter' },
      { id: 'random', name: 'Random mix', desc: 'N random questions across certs' },
      { id: 'theme', name: 'Theme attack', desc: 'Filter by one or more tags' },
      { id: 'weak', name: 'Weak spots', desc: 'Accuracy < 60% or never seen' },
      { id: 'speed', name: 'Speed run', desc: '10 questions · 20s each' }
    ];
    var selectedMode = (pre && pre.mode) || 'random';
    var modeRow = el('div', { className: 'tools-tabs mb-3' });
    modes.forEach(function (m) {
      var tab = el('button', {
        className: 'tool-tab' + (m.id === selectedMode ? ' active' : ''),
        text: m.name,
        onClick: function () {
          selectedMode = m.id;
          modeRow.querySelectorAll('.tool-tab').forEach(function (t) { t.classList.remove('active'); });
          tab.classList.add('active');
          renderOptions();
        }
      });
      modeRow.appendChild(tab);
    });
    root.appendChild(modeRow);
    var optsPanel = el('div', { className: 'panel mb-3' });
    root.appendChild(optsPanel);
    function renderOptions() {
      optsPanel.innerHTML = '';
      var mode = modes.find(function (m) { return m.id === selectedMode; });
      optsPanel.appendChild(el('p', { className: 'text-muted mb-2', text: mode.desc }));
      if (selectedMode === 'chapter') {
        var certs = App.content.getCerts();
        var certSel = el('select', { className: 'form-control', id: 'qz-cert' });
        certs.forEach(function (c) { certSel.appendChild(el('option', { value: c.id, text: c.name })); });
        if (pre && pre.cert) certSel.value = pre.cert;
        optsPanel.appendChild(el('div', { className: 'form-group mb-2' }, [el('label', { text: 'Certification' }), certSel]));
        var chSel = el('select', { className: 'form-control', id: 'qz-chapter' });
        function fillChapters() {
          chSel.innerHTML = '';
          var chs = App.content.getChapters(certSel.value, 'questions');
          Object.keys(chs).sort().forEach(function (ch) {
            chSel.appendChild(el('option', { value: ch, text: ch + ' (' + chs[ch].length + ')' }));
          });
          if (pre && pre.chapter) chSel.value = pre.chapter;
        }
        fillChapters();
        certSel.addEventListener('change', fillChapters);
        optsPanel.appendChild(el('div', { className: 'form-group' }, [el('label', { text: 'Chapter' }), chSel]));
      } else if (selectedMode === 'random') {
        var certs2 = App.content.getCerts();
        var certChecks = el('div', { className: 'flex gap-sm', style: { flexWrap: 'wrap' } });
        certs2.forEach(function (c) {
          var lab = el('label', { className: 'chip chip-muted', style: { cursor: 'pointer' } });
          var cb = el('input', { type: 'checkbox', value: c.id, checked: 'checked', style: { marginRight: '4px' } });
          lab.appendChild(cb);
          lab.appendChild(document.createTextNode(c.name));
          certChecks.appendChild(lab);
        });
        optsPanel.appendChild(el('div', { className: 'form-group mb-2' }, [el('label', { text: 'Certifications' }), certChecks]));
        optsPanel.appendChild(el('div', { className: 'form-group' }, [
          el('label', { text: 'Question count' }),
          el('input', { className: 'form-control', type: 'number', id: 'qz-count', value: '10', min: '1', max: '100' })
        ]));
      } else if (selectedMode === 'theme') {
        var tags = App.content.getTags('questions');
        var tagWrap = el('div', { className: 'flex gap-sm', style: { flexWrap: 'wrap' } });
        tags.forEach(function (t) {
          var lab = el('label', { className: 'chip chip-muted', style: { cursor: 'pointer' } });
          var cb = el('input', { type: 'checkbox', value: t, style: { marginRight: '4px' } });
          lab.appendChild(cb);
          lab.appendChild(document.createTextNode(t));
          tagWrap.appendChild(lab);
        });
        optsPanel.appendChild(el('div', { className: 'form-group' }, [
          el('label', { text: 'Tags' }), tagWrap.childNodes.length ? tagWrap : el('span', { className: 'text-muted', text: 'No tags found' })
        ]));
      } else if (selectedMode === 'speed') {
        optsPanel.appendChild(el('p', { text: '10 random questions. 20 seconds each. Streak counter on correct answers.' }));
      } else if (selectedMode === 'weak') {
        var weak = App.store.weakQuestions(60);
        optsPanel.appendChild(el('p', { text: weak.length + ' weak or unseen questions available.' }));
      }
    }
    renderOptions();
    root.appendChild(el('button', {
      className: 'btn btn-primary btn-lg', text: 'Start Quiz',
      onClick: function () {
        var opts = {};
        if (selectedMode === 'chapter') {
          opts.cert = ($('#qz-cert') || {}).value;
          opts.chapter = ($('#qz-chapter') || {}).value;
        } else if (selectedMode === 'random') {
          opts.certs = [];
          optsPanel.querySelectorAll('input[type=checkbox]:checked').forEach(function (cb) { opts.certs.push(cb.value); });
          opts.count = parseInt(($('#qz-count') || {}).value, 10) || 10;
        } else if (selectedMode === 'theme') {
          opts.tags = [];
          optsPanel.querySelectorAll('input[type=checkbox]:checked').forEach(function (cb) { opts.tags.push(cb.value); });
        }
        var pool = App.quiz.buildPool(selectedMode, opts);
        var cfg = { mode: selectedMode, questions: pool, count: opts.count };
        if (selectedMode === 'speed') { cfg.count = 10; cfg.speedLimit = 20; }
        if (!App.quiz.startQuiz(cfg)) return;
        root.innerHTML = '';
        renderQuizPlayer(root);
      }
    }));
  }

  function appendQuestionReview(parent, q) {
    parent.appendChild(el('div', { style: { fontWeight: '600' }, text: q.q }));
    if (q.type === 'command_match' && Array.isArray(q.pairs)) {
      var list = el('div', { className: 'cmd-match-answer mt-1' });
      q.pairs.forEach(function (p) {
        list.appendChild(el('div', { className: 'cmd-match-answer-row' }, [
          el('code', { className: 'cmd-match-option', text: p.option }),
          el('span', { className: 'text-muted', text: '→ ' + p.description })
        ]));
      });
      parent.appendChild(list);
    }
    parent.appendChild(el('div', { className: 'explain-panel mt-1', text: q.explain || '' }));
  }

  function renderQuizPlayer(root) {
    var sess = App.quiz.getQuizSession();
    if (!sess) { renderQuizSetup(root); return; }
    var q = App.quiz.currentQ();
    var answered = false;
    var header = el('div', { className: 'quiz-progress' });
    header.appendChild(el('span', { className: 'mono text-muted', text: (sess.index + 1) + ' / ' + sess.questions.length }));
    var bar = el('div', { className: 'progress-bar' });
    bar.appendChild(el('div', { className: 'progress-fill', style: { width: ((sess.index) / sess.questions.length * 100) + '%' } }));
    header.appendChild(bar);
    var timerEl = null;
    if (sess.speedLimit) {
      timerEl = el('span', { className: 'exam-timer', text: sess.speedLimit + 's' });
      header.appendChild(timerEl);
    }
    root.appendChild(header);
    var card = el('div', { className: 'question-card' });
    card.appendChild(el('div', { className: 'question-text', text: q.q }));
    var optsWrap = el('div', { className: 'options-list' });
    var selectedMulti = {};
    var matchUI = null;
    function doSubmit(ua) {
      if (answered) return;
      answered = true;
      if (sess.speedTimer) { clearInterval(sess.speedTimer); sess.speedTimer = null; }
      var result = App.quiz.submitAnswer(ua);
      optsWrap.querySelectorAll('.option-btn').forEach(function (b) { b.disabled = true; });
      if (q.type === 'mcq') {
        optsWrap.querySelectorAll('.option-btn').forEach(function (b, i) {
          if (i === q._correctShuffled) b.classList.add('correct');
          else if (i === ua && !result.correct) b.classList.add('wrong');
        });
      } else if (q.type === 'tf') {
        optsWrap.querySelectorAll('.option-btn').forEach(function (b) {
          var isTrue = b.getAttribute('data-val') === 'true';
          if (isTrue === q.answer) b.classList.add('correct');
          else if (((ua === true && isTrue) || (ua === false && !isTrue)) && !result.correct) b.classList.add('wrong');
        });
      } else if (q.type === 'multi') {
        optsWrap.querySelectorAll('.option-btn').forEach(function (b, i) {
          if ((q._correctShuffled || []).indexOf(i) >= 0) b.classList.add('correct');
          else if (selectedMulti[i]) b.classList.add('wrong');
        });
      } else if (q.type === 'command_match' && matchUI) {
        matchUI.lock();
      }
      card.appendChild(el('div', { className: 'explain-panel' }, [
        el('strong', { text: result.correct ? '✓ Correct. ' : '✗ Incorrect. ' }),
        document.createTextNode(q.explain || '')
      ]));
      actions.innerHTML = '';
      actions.appendChild(el('button', {
        className: 'btn btn-primary', id: 'qz-next',
        text: sess.index < sess.questions.length - 1 ? 'Next →' : 'See Results',
        onClick: goNext
      }));
    }
    function goNext() {
      if (App.quiz.nextQuestion()) { root.innerHTML = ''; renderQuizPlayer(root); }
      else { var result = App.quiz.endQuiz(); root.innerHTML = ''; renderQuizResults(root, result); }
    }
    if (q.type === 'mcq') {
      q._shuffledOptions.forEach(function (opt, i) {
        optsWrap.appendChild(el('button', { className: 'option-btn', onClick: function () { doSubmit(i); } }, [
          el('span', { className: 'option-key', text: String.fromCharCode(65 + i) }),
          el('span', { text: opt.text })
        ]));
      });
    } else if (q.type === 'tf') {
      [true, false].forEach(function (v, i) {
        optsWrap.appendChild(el('button', {
          className: 'option-btn', 'data-val': String(v), onClick: function () { doSubmit(v); }
        }, [
          el('span', { className: 'option-key', text: String.fromCharCode(65 + i) }),
          el('span', { text: v ? 'True' : 'False' })
        ]));
      });
    } else if (q.type === 'multi') {
      q._shuffledOptions.forEach(function (opt, i) {
        optsWrap.appendChild(el('button', {
          className: 'option-btn',
          onClick: function () {
            if (answered) return;
            selectedMulti[i] = !selectedMulti[i];
            this.style.borderColor = selectedMulti[i] ? 'var(--accent-cyan)' : '';
          }
        }, [
          el('span', { className: 'option-key', text: String.fromCharCode(65 + i) }),
          el('span', { text: opt.text })
        ]));
      });
    } else if (q.type === 'fill') {
      optsWrap.appendChild(el('input', { className: 'form-control', type: 'text', id: 'qz-fill', placeholder: 'Type answer…', autocomplete: 'off' }));
    } else if (q.type === 'command_match') {
      if (q._invalid) {
        optsWrap.appendChild(emptyState('Question unavailable', 'This command-matching question is missing required data (command or pairs).'));
      } else {
        matchUI = App.quiz.renderCommandMatchUI(optsWrap, q, {
          submitLabel: 'Submit',
          onSubmit: function (arr) { doSubmit(arr); }
        });
      }
    }
    card.appendChild(optsWrap);
    root.appendChild(card);
    var actions = el('div', { className: 'flex gap-sm mt-2' });
    if (q.type === 'multi' || q.type === 'fill') {
      actions.appendChild(el('button', {
        className: 'btn btn-primary', text: 'Submit',
        onClick: function () {
          if (q.type === 'fill') doSubmit(($('#qz-fill') || {}).value);
          else doSubmit(Object.keys(selectedMulti).filter(function (k) { return selectedMulti[k]; }).map(Number));
        }
      }));
    }
    actions.appendChild(el('button', {
      className: 'btn btn-ghost', text: 'Skip',
      onClick: function () {
        if (answered) return;
        answered = true;
        if (sess.speedTimer) clearInterval(sess.speedTimer);
        App.quiz.skipQuestion();
        root.innerHTML = '';
        if (App.quiz.getQuizSession()) renderQuizPlayer(root);
        else renderQuizResults(root, App.quiz.endQuiz());
      }
    }));
    root.appendChild(actions);
    function onKey(e) {
      if (answered && e.key === 'Enter') { goNext(); return; }
      if (answered) return;
      if (q.type === 'mcq' || q.type === 'tf') {
        var num = parseInt(e.key, 10);
        if (num >= 1 && num <= 4) {
          var idx = num - 1;
          if (q.type === 'tf' && idx < 2) doSubmit(idx === 0);
          else if (q.type === 'mcq' && idx < q._shuffledOptions.length) doSubmit(idx);
        }
      }
    }
    document.addEventListener('keydown', onKey);
    setTimeout(function () {
      var obs = new MutationObserver(function () {
        if (!root.contains(card)) { document.removeEventListener('keydown', onKey); obs.disconnect(); }
      });
      obs.observe(root, { childList: true });
    }, 50);
    if (sess.speedLimit) {
      sess.speedRemaining = sess.speedLimit;
      sess.speedTimer = setInterval(function () {
        sess.speedRemaining--;
        if (timerEl) timerEl.textContent = sess.speedRemaining + 's';
        if (sess.speedRemaining <= 0) {
          clearInterval(sess.speedTimer);
          if (!answered) {
            answered = true;
            App.quiz.skipQuestion();
            root.innerHTML = '';
            if (App.quiz.getQuizSession()) renderQuizPlayer(root);
            else renderQuizResults(root, App.quiz.endQuiz());
          }
        }
      }, 1000);
    }
  }

  function renderQuizResults(root, result) {
    if (!result) { renderQuizSetup(root); return; }
    root.appendChild(el('h1', { text: 'Quiz Results' }));
    var scoreColor = result.score >= 70 ? 'text-green' : result.score >= 50 ? 'text-amber' : 'text-red';
    root.appendChild(el('div', { className: 'stat-grid' }, [
      el('div', { className: 'stat-tile' }, [el('div', { className: 'stat-value ' + scoreColor, text: result.score + '%' }), el('div', { className: 'stat-label', text: 'Score' })]),
      el('div', { className: 'stat-tile' }, [el('div', { className: 'stat-value', text: result.correct + '/' + result.total }), el('div', { className: 'stat-label', text: 'Correct' })]),
      el('div', { className: 'stat-tile' }, [el('div', { className: 'stat-value', text: utils.formatTime(Math.round(result.timeMs / 1000)) }), el('div', { className: 'stat-label', text: 'Time' })])
    ]));
    if (result.tagBreakdown && result.tagBreakdown.length) {
      root.appendChild(el('h3', { className: 'mt-3 mb-1', text: 'By tag' }));
      result.tagBreakdown.forEach(function (t) {
        var row = el('div', { className: 'bar-row' });
        row.appendChild(el('div', { className: 'bar-label', text: t.tag }));
        var track = el('div', { className: 'bar-track' });
        track.appendChild(el('div', { className: 'bar-fill', style: { width: t.pct + '%' } }));
        row.appendChild(track);
        row.appendChild(el('div', { className: 'bar-value', text: t.pct + '%' }));
        root.appendChild(row);
      });
    }
    var missed = result.answers.filter(function (a) { return !a.correct; });
    if (missed.length) {
      root.appendChild(el('h3', { className: 'mt-3 mb-1', text: 'Review missed' }));
      missed.forEach(function (a) {
        var p = el('div', { className: 'panel mb-1' });
        appendQuestionReview(p, a.question);
        root.appendChild(p);
      });
    }
    root.appendChild(el('div', { className: 'flex gap-sm mt-3' }, [
      el('button', { className: 'btn btn-primary', text: 'New Quiz', onClick: function () { App.core.navigate('#/quiz'); } }),
      el('button', { className: 'btn btn-secondary', text: 'Dashboard', onClick: function () { App.core.navigate('#/dashboard'); } })
    ]));
  }

  function viewExam(root) {
    var sess = App.quiz.getExamSession();
    if (sess && !sess.submitted) { renderExamPlayer(root); return; }
    renderExamSetup(root);
  }

  function renderExamSetup(root) {
    root.appendChild(el('h1', { text: 'Exam Simulation' }));
    root.appendChild(el('p', { className: 'text-muted mb-3', text: 'CompTIA-style timed exam. No feedback until you submit.' }));
    var certs = App.content.getCerts();
    if (!certs.length) { root.appendChild(emptyState('No content', 'Load certifications first.')); return; }
    var panel = el('div', { className: 'panel' });
    var certSel = el('select', { className: 'form-control', id: 'ex-cert' });
    certs.forEach(function (c) {
      var n = App.content.getByCert('questions', c.id).length;
      certSel.appendChild(el('option', { value: c.id, text: c.name + ' (' + n + ' available)' }));
    });
    panel.appendChild(el('div', { className: 'form-group mb-2' }, [el('label', { text: 'Certification' }), certSel]));
    panel.appendChild(el('div', { className: 'form-group mb-2' }, [
      el('label', { text: 'Question count' }),
      el('input', { className: 'form-control', type: 'number', id: 'ex-count', value: '20', min: '5', max: '90' })
    ]));
    panel.appendChild(el('div', { className: 'form-group mb-2' }, [
      el('label', { text: 'Time limit (minutes, blank = auto)' }),
      el('input', { className: 'form-control', type: 'number', id: 'ex-time', value: '', min: '5', placeholder: 'Auto (75s × count)' })
    ]));
    root.appendChild(panel);
    root.appendChild(el('button', {
      className: 'btn btn-primary btn-lg mt-2', text: 'Begin Exam',
      onClick: function () {
        var count = parseInt(($('#ex-count') || {}).value, 10) || 20;
        var timeMin = parseInt(($('#ex-time') || {}).value, 10);
        var timeLimit = timeMin ? timeMin * 60 : count * 75;
        if (!App.quiz.startExam({ cert: certSel.value, count: count, timeLimit: timeLimit })) return;
        root.innerHTML = '';
        renderExamPlayer(root);
      }
    }));
  }

  function renderExamPlayer(root) {
    var sess = App.quiz.getExamSession();
    if (!sess) { renderExamSetup(root); return; }
    var layout = el('div', { className: 'exam-layout' });
    var main = el('div');
    var side = el('div', { className: 'panel' });
    var timerEl = el('div', { className: 'exam-timer mb-2', text: utils.formatTime(sess.remaining) });
    side.appendChild(timerEl);
    side.appendChild(el('div', { className: 'label-upper mb-1', text: 'Question palette' }));
    var palette = el('div', { className: 'palette-grid mb-2' });
    sess.questions.forEach(function (_, i) {
      palette.appendChild(el('button', {
        className: 'palette-cell' + (i === sess.index ? ' current' : '') +
          (sess.answers[i] !== undefined ? ' answered' : '') + (sess.flagged[i] ? ' flagged' : ''),
        text: String(i + 1),
        onClick: function () { sess.index = i; root.innerHTML = ''; renderExamPlayer(root); }
      }));
    });
    side.appendChild(palette);
    side.appendChild(el('button', {
      className: 'btn btn-secondary btn-sm mb-1', style: { width: '100%' },
      text: sess.flagged[sess.index] ? 'Unflag' : 'Flag for review',
      onClick: function () { App.quiz.examFlag(sess.index); root.innerHTML = ''; renderExamPlayer(root); }
    }));
    side.appendChild(el('button', {
      className: 'btn btn-danger btn-sm', style: { width: '100%' }, text: 'Submit Exam',
      onClick: function () {
        if (!confirm('Submit exam? You cannot change answers after.')) return;
        var full = App.quiz.submitExam();
        root.innerHTML = '';
        renderExamResults(root, full);
      }
    }));
    var q = sess.questions[sess.index];
    var card = el('div', { className: 'question-card' });
    card.appendChild(el('div', { className: 'label-upper mb-1', text: 'Question ' + (sess.index + 1) + ' of ' + sess.questions.length }));
    card.appendChild(el('div', { className: 'question-text', text: q.q }));
    var optsWrap = el('div', { className: 'options-list' });
    if (q.type === 'mcq') {
      q._shuffledOptions.forEach(function (opt, i) {
        var selected = sess.answers[sess.index] === i;
        optsWrap.appendChild(el('button', {
          className: 'option-btn', style: selected ? { borderColor: 'var(--accent-cyan)' } : {},
          onClick: function () { App.quiz.examAnswer(sess.index, i); root.innerHTML = ''; renderExamPlayer(root); }
        }, [el('span', { className: 'option-key', text: String.fromCharCode(65 + i) }), el('span', { text: opt.text })]));
      });
    } else if (q.type === 'tf') {
      [true, false].forEach(function (v, i) {
        var selected = sess.answers[sess.index] === v;
        optsWrap.appendChild(el('button', {
          className: 'option-btn', style: selected ? { borderColor: 'var(--accent-cyan)' } : {},
          onClick: function () { App.quiz.examAnswer(sess.index, v); root.innerHTML = ''; renderExamPlayer(root); }
        }, [el('span', { className: 'option-key', text: String.fromCharCode(65 + i) }), el('span', { text: v ? 'True' : 'False' })]));
      });
    } else if (q.type === 'fill') {
      optsWrap.appendChild(el('input', {
        className: 'form-control', type: 'text', value: sess.answers[sess.index] || '',
        placeholder: 'Type answer…',
        onInput: function (e) { App.quiz.examAnswer(sess.index, e.target.value); }
      }));
    } else if (q.type === 'multi') {
      var cur = sess.answers[sess.index] || [];
      if (!Array.isArray(cur)) cur = [];
      q._shuffledOptions.forEach(function (opt, i) {
        var selected = cur.indexOf(i) >= 0;
        optsWrap.appendChild(el('button', {
          className: 'option-btn', style: selected ? { borderColor: 'var(--accent-cyan)' } : {},
          onClick: function () {
            var arr = (sess.answers[sess.index] || []).slice();
            if (!Array.isArray(arr)) arr = [];
            var idx = arr.indexOf(i);
            if (idx >= 0) arr.splice(idx, 1); else arr.push(i);
            App.quiz.examAnswer(sess.index, arr);
            root.innerHTML = '';
            renderExamPlayer(root);
          }
        }, [el('span', { className: 'option-key', text: String.fromCharCode(65 + i) }), el('span', { text: opt.text })]));
      });
    } else if (q.type === 'command_match') {
      if (q._invalid) {
        optsWrap.appendChild(emptyState('Question unavailable', 'This command-matching question is missing required data (command or pairs).'));
      } else {
        var curMatch = sess.answers[sess.index];
        if (!Array.isArray(curMatch)) curMatch = null;
        App.quiz.renderCommandMatchUI(optsWrap, q, {
          initial: curMatch,
          onChange: function (arr) {
            App.quiz.examAnswer(sess.index, arr);
            var cell = palette.querySelectorAll('.palette-cell')[sess.index];
            if (cell) cell.classList.add('answered');
          }
        });
      }
    }
    card.appendChild(optsWrap);
    var nav = el('div', { className: 'flex-between mt-2' });
    nav.appendChild(el('button', {
      className: 'btn btn-secondary btn-sm', text: '← Prev',
      disabled: sess.index === 0 ? 'disabled' : null,
      onClick: function () { if (sess.index > 0) { sess.index--; root.innerHTML = ''; renderExamPlayer(root); } }
    }));
    nav.appendChild(el('button', {
      className: 'btn btn-secondary btn-sm', text: 'Next →',
      disabled: sess.index >= sess.questions.length - 1 ? 'disabled' : null,
      onClick: function () { if (sess.index < sess.questions.length - 1) { sess.index++; root.innerHTML = ''; renderExamPlayer(root); } }
    }));
    card.appendChild(nav);
    main.appendChild(card);
    layout.appendChild(main);
    layout.appendChild(side);
    root.appendChild(layout);
    if (sess.timer) clearInterval(sess.timer);
    sess.timer = setInterval(function () {
      sess.remaining--;
      if (timerEl) {
        timerEl.textContent = utils.formatTime(Math.max(0, sess.remaining));
        if (sess.remaining <= 300) timerEl.classList.add('warning');
      }
      if (sess.remaining <= 0) {
        clearInterval(sess.timer);
        App.toast('Time is up — submitting exam', 'info');
        var full = App.quiz.submitExam();
        root.innerHTML = '';
        renderExamResults(root, full);
      }
    }, 1000);
  }

  function renderExamResults(root, full) {
    if (!full) { renderExamSetup(root); return; }
    var a = full.attempt;
    root.appendChild(el('h1', { text: 'Exam Results' }));
    root.appendChild(el('div', { className: 'flex gap-sm mb-2', style: { alignItems: 'center' } }, [
      el('span', { className: 'stat-value', style: { fontSize: '2rem' }, text: a.score + '%' }),
      el('span', { className: 'chip ' + (a.passed ? 'chip-green' : 'chip-red'), text: a.passed ? 'PASS' : 'FAIL' }),
      el('span', { className: 'text-muted', text: '(threshold ' + a.threshold + '%)' })
    ]));
    root.appendChild(el('p', { className: 'text-muted mb-3', text: a.correct + ' / ' + a.total + ' correct · ' + utils.formatTime(Math.round(a.timeMs / 1000)) }));
    if (full.tagBreakdown.length) {
      root.appendChild(el('h3', { className: 'mb-1', text: 'Tag breakdown' }));
      full.tagBreakdown.forEach(function (t) {
        var row = el('div', { className: 'bar-row' });
        row.appendChild(el('div', { className: 'bar-label', text: t.tag }));
        var track = el('div', { className: 'bar-track' });
        track.appendChild(el('div', { className: 'bar-fill', style: { width: t.pct + '%' } }));
        row.appendChild(track);
        row.appendChild(el('div', { className: 'bar-value', text: t.pct + '%' }));
        root.appendChild(row);
      });
    }
    root.appendChild(el('h3', { className: 'mt-3 mb-1', text: 'Full review' }));
    full.results.forEach(function (r, i) {
      var p = el('div', { className: 'panel mb-1' });
      p.appendChild(el('div', { className: 'flex-between' }, [
        el('span', { className: 'label-upper', text: 'Q' + (i + 1) }),
        el('span', { className: 'chip ' + (r.correct ? 'chip-green' : 'chip-red'), text: r.correct ? 'Correct' : 'Wrong' })
      ]));
      appendQuestionReview(p, r.question);
      root.appendChild(p);
    });
    root.appendChild(el('button', { className: 'btn btn-primary mt-3', text: 'Back to Dashboard', onClick: function () { App.core.navigate('#/dashboard'); } }));
  }

  function viewFlashcards(root) {
    var sess = App.flashcards.getSession();
    if (sess) { renderFlashPlayer(root); return; }
    renderFlashSetup(root);
  }

  function renderFlashSetup(root) {
    root.appendChild(el('h1', { text: 'Flashcards' }));
    root.appendChild(el('p', { className: 'text-muted mb-3', text: 'Leitner spaced repetition · boxes 1–5' }));
    var pre = null;
    try { pre = JSON.parse(sessionStorage.getItem('reviewapp.fcSetup') || 'null'); } catch (e) {}
    sessionStorage.removeItem('reviewapp.fcSetup');
    var pending = App.flashcards.consumePendingCard();
    var certs = App.content.getCerts();
    var panel = el('div', { className: 'panel mb-3' });
    var certSel = el('select', { className: 'form-control', id: 'fc-cert' });
    certSel.appendChild(el('option', { value: '', text: 'All certifications' }));
    certs.forEach(function (c) { certSel.appendChild(el('option', { value: c.id, text: c.name })); });
    if (pre && pre.cert) certSel.value = pre.cert;
    panel.appendChild(el('div', { className: 'form-group mb-2' }, [el('label', { text: 'Certification' }), certSel]));
    var chSel = el('select', { className: 'form-control', id: 'fc-chapter' });
    function fillCh() {
      chSel.innerHTML = '';
      chSel.appendChild(el('option', { value: '', text: 'All chapters' }));
      if (certSel.value) {
        var chs = App.content.getChapters(certSel.value, 'flashcards');
        Object.keys(chs).sort().forEach(function (ch) {
          chSel.appendChild(el('option', { value: ch, text: ch + ' (' + chs[ch].length + ')' }));
        });
      }
      if (pre && pre.chapter) chSel.value = pre.chapter;
    }
    fillCh();
    certSel.addEventListener('change', fillCh);
    panel.appendChild(el('div', { className: 'form-group' }, [el('label', { text: 'Chapter' }), chSel]));
    root.appendChild(panel);
    root.appendChild(el('p', { className: 'mb-2', html: '<span class="chip chip-amber">' + App.store.cardsDueCount() + ' cards due</span>' }));
    root.appendChild(el('button', {
      className: 'btn btn-primary btn-lg', text: 'Start Session',
      onClick: function () {
        var deck = App.flashcards.buildDeck({ cert: certSel.value || null, chapter: chSel.value || null });
        if (!App.flashcards.startSession(deck, { startCard: pending })) return;
        root.innerHTML = '';
        renderFlashPlayer(root);
      }
    }));
    if (pending) {
      setTimeout(function () {
        var deck = App.flashcards.buildDeck({});
        App.flashcards.startSession(deck, { startCard: pending });
        root.innerHTML = '';
        renderFlashPlayer(root);
      }, 50);
    }
  }

  function renderFlashPlayer(root) {
    var sess = App.flashcards.getSession();
    if (!sess) { renderFlashSetup(root); return; }
    var card = App.flashcards.currentCard();
    if (!card) {
      var result = App.flashcards.endSession();
      root.appendChild(el('h1', { text: 'Session complete' }));
      root.appendChild(el('p', { text: 'Graded ' + result.graded + ' cards (Again: ' + result.again + ', Good: ' + result.good + ', Easy: ' + result.easy + ')' }));
      root.appendChild(el('button', { className: 'btn btn-primary mt-2', text: 'New session', onClick: function () { App.core.navigate('#/flashcards'); } }));
      return;
    }
    var st = App.store.getCardState(App.flashcards.cardKey(card));
    root.appendChild(el('div', { className: 'quiz-progress' }, [
      el('span', { className: 'mono text-muted', text: (sess.index + 1) + ' / ' + sess.deck.length }),
      el('div', { className: 'progress-bar' }, [el('div', { className: 'progress-fill', style: { width: (sess.index / sess.deck.length * 100) + '%' } })]),
      el('span', { className: 'chip chip-muted', text: 'Box ' + (st.box || 1) })
    ]));
    var stage = el('div', { className: 'flashcard-stage' });
    var fc = el('div', {
      className: 'flashcard' + (sess.flipped ? ' flipped' : ''),
      role: 'button', tabindex: '0', 'aria-label': 'Flashcard, press space to flip',
      onClick: function () { App.flashcards.flip(); root.innerHTML = ''; renderFlashPlayer(root); }
    });
    fc.appendChild(el('div', { className: 'flashcard-face front' }, [
      el('div', { className: 'flashcard-label', text: 'Front' }),
      el('div', { className: 'flashcard-text', text: card.front })
    ]));
    fc.appendChild(el('div', { className: 'flashcard-face back' }, [
      el('div', { className: 'flashcard-label', text: 'Back' }),
      el('div', { className: 'flashcard-text', text: card.back })
    ]));
    stage.appendChild(fc);
    root.appendChild(stage);
    if (sess.flipped) {
      var grades = el('div', { className: 'grade-btns' });
      grades.appendChild(el('button', { className: 'btn btn-danger', text: '1 · Again', onClick: function () { gradeAndRefresh('again'); } }));
      grades.appendChild(el('button', { className: 'btn btn-secondary', text: '2 · Good', onClick: function () { gradeAndRefresh('good'); } }));
      grades.appendChild(el('button', { className: 'btn btn-primary', text: '3 · Easy', onClick: function () { gradeAndRefresh('easy'); } }));
      root.appendChild(grades);
    } else {
      root.appendChild(el('p', { className: 'text-muted', style: { textAlign: 'center' }, text: 'Click card or press Space to flip' }));
    }
    function gradeAndRefresh(g) {
      App.flashcards.grade(g);
      root.innerHTML = '';
      renderFlashPlayer(root);
    }
    function onKey(e) {
      if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault();
        App.flashcards.flip();
        root.innerHTML = '';
        renderFlashPlayer(root);
      } else if (sess.flipped) {
        if (e.key === '1') gradeAndRefresh('again');
        else if (e.key === '2') gradeAndRefresh('good');
        else if (e.key === '3') gradeAndRefresh('easy');
      } else if (e.key === 'ArrowRight') { App.flashcards.next(); root.innerHTML = ''; renderFlashPlayer(root); }
      else if (e.key === 'ArrowLeft') { App.flashcards.prev(); root.innerHTML = ''; renderFlashPlayer(root); }
    }
    document.addEventListener('keydown', onKey);
    setTimeout(function () {
      var obs = new MutationObserver(function () {
        if (!root.contains(stage)) { document.removeEventListener('keydown', onKey); obs.disconnect(); }
      });
      obs.observe(root, { childList: true });
    }, 50);
  }

  function viewLabs(root, parsed) {
    var labId = parsed.params[0] ? decodeURIComponent(parsed.params[0]) : null;
    if (labId) return viewLabDetail(root, labId);
    root.appendChild(el('h1', { text: 'Labs' }));
    var labs = App.content.getAll('labs');
    if (!labs.length) { root.appendChild(emptyState('No labs yet', 'Add lab content files and reload.')); return; }
    root.appendChild(el('p', { className: 'text-muted mb-3', text: 'Choose a certification and chapter to focus your lab practice.' }));
    var controls = el('div', { className: 'panel mb-3' });
    var certSel = el('select', { className: 'form-control', id: 'lab-cert' });
    certSel.appendChild(el('option', { value: '', text: 'All certifications' }));
    App.content.getCerts().forEach(function (cert) {
      var count = App.content.getByCert('labs', cert.id).length;
      if (count) certSel.appendChild(el('option', { value: cert.id, text: cert.name + ' (' + count + ')' }));
    });
    controls.appendChild(el('div', { className: 'form-group mb-2' }, [el('label', { text: 'Certification' }), certSel]));
    var chapterSel = el('select', { className: 'form-control', id: 'lab-chapter' });
    controls.appendChild(el('div', { className: 'form-group mb-2' }, [el('label', { text: 'Chapter' }), chapterSel]));
    var filter = el('input', { className: 'form-control', type: 'search', placeholder: 'Search selected labs…' });
    controls.appendChild(el('div', { className: 'form-group' }, [el('label', { text: 'Find a lab' }), filter]));
    root.appendChild(controls);
    var list = el('div');
    root.appendChild(list);

    function fillChapters() {
      chapterSel.innerHTML = '';
      chapterSel.appendChild(el('option', { value: '', text: 'All chapters' }));
      var chapters = App.content.getChapters(certSel.value || null, 'labs');
      Object.keys(chapters).sort().forEach(function (chapter) {
        chapterSel.appendChild(el('option', { value: chapter, text: chapter + ' (' + chapters[chapter].length + ')' }));
      });
    }

    function renderList() {
      list.innerHTML = '';
      var query = filter.value.trim().toLowerCase();
      var visible = labs.filter(function (l) {
        if (certSel.value && l._cert !== certSel.value) return false;
        if (chapterSel.value && l._chapter !== chapterSel.value) return false;
        return !query || (l.title + ' ' + (l.tags || []).join(' ') + ' ' + (l.scenario || '')).toLowerCase().indexOf(query) >= 0;
      });
      if (!visible.length) {
        list.appendChild(emptyState('No labs found', 'Try a different certification, chapter, or search term.'));
        return;
      }
      visible.forEach(function (lab) {
        var done = App.store.isLabDone(lab._id);
        var card = el('div', {
          className: 'card mb-2', style: { cursor: 'pointer' },
          onClick: function () { App.core.navigate('#/labs/' + encodeURIComponent(lab._id)); }
        });
        card.appendChild(el('div', { className: 'flex-between' }, [
          el('h3', { text: lab.title }),
          done ? el('span', { className: 'chip chip-green', text: 'Completed' }) : null
        ]));
        var meta = el('div', { className: 'flex gap-sm mt-1' });
        meta.appendChild(el('span', { className: 'chip chip-amber', text: '★'.repeat(lab.difficulty || 1) }));
        meta.appendChild(el('span', { className: 'chip chip-muted', text: (lab.minutes || '?') + ' min' }));
        meta.appendChild(el('span', { className: 'chip chip-muted', text: lab._chapter || 'General' }));
        card.appendChild(meta);
        list.appendChild(card);
      });
    }
    fillChapters();
    renderList();
    certSel.addEventListener('change', function () { fillChapters(); renderList(); });
    chapterSel.addEventListener('change', renderList);
    filter.addEventListener('input', renderList);
  }

  function viewLabDetail(root, labId) {
    var labs = App.content.getAll('labs');
    var lab = labs.find(function (l) { return l._id === labId; });
    if (!lab) { root.appendChild(emptyState('Lab not found', labId)); return; }
    root.appendChild(el('button', { className: 'btn btn-ghost btn-sm mb-2', text: '← All labs', onClick: function () { App.core.navigate('#/labs'); } }));
    root.appendChild(el('h1', { text: lab.title }));
    root.appendChild(el('div', { className: 'flex gap-sm mb-2' }, [
      el('span', { className: 'chip chip-amber', text: 'Difficulty ' + (lab.difficulty || 1) }),
      el('span', { className: 'chip chip-muted', text: (lab.minutes || '?') + ' min' })
    ]));
    var scen = el('div', { className: 'panel mb-3' });
    scen.appendChild(el('div', { className: 'label-upper mb-1', text: 'Scenario' }));
    scen.appendChild(el('div', { html: App.markdown.render(lab.scenario || '') }));
    root.appendChild(scen);
    if (lab.objectives && lab.objectives.length) {
      var obj = el('div', { className: 'panel mb-3' });
      obj.appendChild(el('div', { className: 'label-upper mb-1', text: 'Objectives' }));
      lab.objectives.forEach(function (o, i) {
        var labEl = el('label', { style: { display: 'flex', gap: '0.5rem', marginBottom: '0.4rem', cursor: 'pointer' } });
        labEl.appendChild(el('input', { type: 'checkbox', id: 'obj-' + i }));
        labEl.appendChild(document.createTextNode(o));
        obj.appendChild(labEl);
      });
      root.appendChild(obj);
    }
    if (lab.steps && lab.steps.length) {
      root.appendChild(el('h3', { className: 'mb-1', text: 'Steps' }));
      lab.steps.forEach(function (step, i) {
        var wrap = el('div', { className: 'lab-step' });
        wrap.appendChild(el('div', {
          className: 'lab-step-header',
          onClick: function () { wrap.classList.toggle('open'); }
        }, [
          el('span', { className: 'chip chip-muted', text: String(i + 1) }),
          el('span', { text: step.do || 'Step ' + (i + 1) })
        ]));
        var body = el('div', { className: 'lab-step-body' });
        if (step.hint) {
          var hintBtn = el('button', { className: 'btn btn-ghost btn-sm mb-1', text: 'Show hint' });
          var hintEl = el('div', { className: 'text-muted mb-1', style: { display: 'none' }, text: step.hint });
          hintBtn.addEventListener('click', function (e) { e.stopPropagation(); hintEl.style.display = hintEl.style.display === 'none' ? 'block' : 'none'; });
          body.appendChild(hintBtn);
          body.appendChild(hintEl);
        }
        if (step.solution) {
          var solBtn = el('button', { className: 'btn btn-secondary btn-sm mb-1', text: 'Reveal solution' });
          var solEl = el('div', { style: { display: 'none' } });
          var code = el('div', { className: 'code-block' });
          code.textContent = step.solution;
          code.appendChild(el('button', {
            className: 'btn btn-ghost btn-sm copy-btn', text: 'Copy',
            onClick: function (e) {
              e.stopPropagation();
              utils.copyText(step.solution).then(function () { App.toast('Copied', 'success', 1500); });
            }
          }));
          solEl.appendChild(code);
          solBtn.addEventListener('click', function (e) { e.stopPropagation(); solEl.style.display = solEl.style.display === 'none' ? 'block' : 'none'; });
          body.appendChild(solBtn);
          body.appendChild(solEl);
        }
        if (step.check) {
          body.appendChild(el('div', { className: 'mt-1', style: { fontSize: '0.88rem' } }, [
            el('strong', { text: 'Verify: ' }), document.createTextNode(step.check)
          ]));
        }
        wrap.appendChild(body);
        root.appendChild(wrap);
      });
    }
    var done = App.store.isLabDone(lab._id);
    root.appendChild(el('button', {
      className: 'btn ' + (done ? 'btn-secondary' : 'btn-primary') + ' mt-3',
      text: done ? 'Completed ✓' : 'Mark Complete',
      onClick: function () {
        App.store.markLabComplete(lab._id);
        App.toast('Lab marked complete', 'success');
        root.innerHTML = '';
        viewLabDetail(root, labId);
      }
    }));
  }

  function viewStats(root) {
    root.appendChild(el('h1', { text: 'Stats' }));
    var stats = App.store.getDashboardStats();
    var questionTotal = App.content.getAll('questions').length;
    var seenQuestions = {};
    App.store.getAnswers().forEach(function (answer) { seenQuestions[answer.qId] = true; });
    var coverage = questionTotal ? Math.round((Object.keys(seenQuestions).length / questionTotal) * 100) : 0;
    root.appendChild(el('div', { className: 'stat-grid' }, [
      el('div', { className: 'stat-tile' }, [el('div', { className: 'stat-value', text: String(stats.totalAnswered) }), el('div', { className: 'stat-label', text: 'Answered' })]),
      el('div', { className: 'stat-tile' }, [el('div', { className: 'stat-value', text: stats.accuracy + '%' }), el('div', { className: 'stat-label', text: 'Accuracy' })]),
      el('div', { className: 'stat-tile' }, [el('div', { className: 'stat-value', text: coverage + '%' }), el('div', { className: 'stat-label', text: 'Question coverage' })]),
      el('div', { className: 'stat-tile' }, [el('div', { className: 'stat-value', text: String(stats.streakDays) }), el('div', { className: 'stat-label', text: 'Streak' })]),
      el('div', { className: 'stat-tile' }, [el('div', { className: 'stat-value', text: utils.formatTime(Math.round(stats.timeOnTask / 1000)) }), el('div', { className: 'stat-label', text: 'Time on task' })]),
      el('div', { className: 'stat-tile' }, [el('div', { className: 'stat-value', text: String(stats.labsDone) }), el('div', { className: 'stat-label', text: 'Labs done' })]),
      el('div', { className: 'stat-tile' }, [el('div', { className: 'stat-value', text: String(stats.cardsDue) }), el('div', { className: 'stat-label', text: 'Cards due' })])
    ]));
    root.appendChild(el('h3', { className: 'mt-3 mb-1', text: 'Accuracy by certification' }));
    App.content.getCerts().forEach(function (c) {
      var acc = App.store.accuracyFor({ cert: c.id });
      var row = el('div', { className: 'bar-row' });
      row.appendChild(el('div', { className: 'bar-label', text: c.name }));
      var track = el('div', { className: 'bar-track' });
      track.appendChild(el('div', { className: 'bar-fill', style: { width: (acc || 0) + '%', background: c.color } }));
      row.appendChild(track);
      row.appendChild(el('div', { className: 'bar-value', text: acc != null ? acc + '%' : '—' }));
      root.appendChild(row);
    });
    root.appendChild(el('h3', { className: 'mt-3 mb-1', text: 'Progress by chapter' }));
    var chapterTable = el('table', { className: 'ref-table' });
    chapterTable.appendChild(el('thead', {}, [el('tr', {}, [
      el('th', { text: 'Certification' }), el('th', { text: 'Chapter' }), el('th', { text: 'Seen' }), el('th', { text: 'Accuracy' })
    ])]));
    var chapterBody = el('tbody');
    var hasChapters = false;
    App.content.getCerts().forEach(function (cert) {
      var chapters = App.content.getChapters(cert.id, 'questions');
      Object.keys(chapters).sort().forEach(function (chapter) {
        hasChapters = true;
        var questions = chapters[chapter];
        var seen = {};
        App.store.getAnswers({ cert: cert.id, chapter: chapter }).forEach(function (answer) { seen[answer.qId] = true; });
        var acc = App.store.accuracyFor({ cert: cert.id, chapter: chapter });
        chapterBody.appendChild(el('tr', {}, [
          el('td', { text: cert.name }), el('td', { text: chapter }),
          el('td', { text: Object.keys(seen).length + ' / ' + questions.length }),
          el('td', { text: acc != null ? acc + '%' : '—' })
        ]));
      });
    });
    if (hasChapters) {
      chapterTable.appendChild(chapterBody);
      root.appendChild(chapterTable);
    } else root.appendChild(el('p', { className: 'text-muted', text: 'No question chapters are loaded yet.' }));
    root.appendChild(el('h3', { className: 'mt-3 mb-1', text: '14-day activity' }));
    var activity = App.store.getActivity(14);
    var maxC = Math.max.apply(null, activity.map(function (d) { return d.count; }).concat([1]));
    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'activity-chart');
    svg.setAttribute('viewBox', '0 0 420 80');
    var w = 420 / activity.length;
    activity.forEach(function (d, i) {
      var h = Math.max(2, (d.count / maxC) * 65);
      var rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      rect.setAttribute('x', i * w + 3);
      rect.setAttribute('y', 70 - h);
      rect.setAttribute('width', w - 6);
      rect.setAttribute('height', h);
      rect.setAttribute('rx', '3');
      rect.setAttribute('fill', d.count ? 'var(--accent-cyan)' : 'var(--border)');
      svg.appendChild(rect);
    });
    root.appendChild(svg);
    var weak = App.store.weakQuestions(60);
    if (weak.length) {
      root.appendChild(el('h3', { className: 'mt-3 mb-1', text: 'Weakest areas' }));
      var tagWeak = {};
      weak.forEach(function (w) {
        (w.tags || []).forEach(function (t) {
          if (!tagWeak[t]) tagWeak[t] = [];
          tagWeak[t].push(w.accuracy);
        });
      });
      Object.keys(tagWeak).slice(0, 8).forEach(function (t) {
        var avg = Math.round(tagWeak[t].reduce(function (a, b) { return a + b; }, 0) / tagWeak[t].length);
        root.appendChild(el('div', { className: 'flex-between mb-1' }, [
          el('span', { className: 'chip chip-red', text: t }),
          el('span', { className: 'text-muted mono', text: avg + '% avg' })
        ]));
      });
    }
    var exams = App.store.getExams();
    root.appendChild(el('h3', { className: 'mt-3 mb-1', text: 'Exam history' }));
    if (!exams.length) root.appendChild(el('p', { className: 'text-muted', text: 'No exam attempts yet.' }));
    else {
      var table = el('table', { className: 'ref-table' });
      table.appendChild(el('thead', {}, [el('tr', {}, [el('th', { text: 'Date' }), el('th', { text: 'Cert' }), el('th', { text: 'Score' }), el('th', { text: 'Result' })])]));
      var tbody = el('tbody');
      exams.slice(0, 20).forEach(function (ex) {
        tbody.appendChild(el('tr', {}, [
          el('td', { text: utils.formatDate(ex.ts) }),
          el('td', { text: ex.cert }),
          el('td', { text: ex.score + '%' }),
          el('td', {}, [el('span', { className: 'chip ' + (ex.passed ? 'chip-green' : 'chip-red'), text: ex.passed ? 'Pass' : 'Fail' })])
        ]));
      });
      table.appendChild(tbody);
      root.appendChild(table);
    }
    root.appendChild(el('h3', { className: 'mt-3 mb-1', text: 'Export' }));
    var expRow = el('div', { className: 'flex gap-sm', style: { flexWrap: 'wrap' } });
    expRow.appendChild(el('button', {
      className: 'btn btn-secondary btn-sm', text: 'CSV answer log',
      onClick: function () {
        utils.downloadBlob(new Blob([App.store.exportAnswersCSV()], { type: 'text/csv' }), 'reviewapp-answers.csv');
      }
    }));
    expRow.appendChild(el('button', {
      className: 'btn btn-secondary btn-sm', text: 'JSON full backup',
      onClick: function () {
        utils.downloadBlob(new Blob([JSON.stringify(App.store.exportFullBackup(), null, 2)], { type: 'application/json' }), 'reviewapp-backup.json');
      }
    }));
    expRow.appendChild(el('button', {
      className: 'btn btn-secondary btn-sm', text: 'Markdown report',
      onClick: function () {
        var s = App.store.getDashboardStats();
        var md = '# ReviewApp Progress Report\n\n- Total answered: ' + s.totalAnswered + '\n- Accuracy: ' + s.accuracy + '%\n- Streak: ' + s.streakDays + ' days\n- Labs completed: ' + s.labsDone + '\n- Cards due: ' + s.cardsDue + '\n\nGenerated ' + new Date().toISOString() + '\n';
        utils.downloadBlob(new Blob([md], { type: 'text/markdown' }), 'reviewapp-report.md');
      }
    }));
    root.appendChild(expRow);
  }

  function viewNotes(root, parsed) {
    var noteId = parsed.params[0] ? decodeURIComponent(parsed.params[0]) : null;
    if (noteId) return viewNoteDetail(root, noteId);
    root.appendChild(el('h1', { text: 'Notes' }));
    var bundled = App.content.getAll('notes');
    root.appendChild(el('p', { className: 'text-muted mb-3', text: 'Choose a certification and chapter to open the notes you need.' }));
    if (!bundled.length) root.appendChild(el('p', { className: 'text-muted mb-3', text: 'No bundled notes loaded.' }));
    else {
      var controls = el('div', { className: 'panel mb-3' });
      var certSel = el('select', { className: 'form-control', id: 'note-cert' });
      certSel.appendChild(el('option', { value: '', text: 'All certifications' }));
      App.content.getCerts().forEach(function (cert) {
        var count = App.content.getByCert('notes', cert.id).length;
        if (count) certSel.appendChild(el('option', { value: cert.id, text: cert.name + ' (' + count + ')' }));
      });
      controls.appendChild(el('div', { className: 'form-group mb-2' }, [el('label', { text: 'Certification' }), certSel]));
      var chapterSel = el('select', { className: 'form-control', id: 'note-chapter' });
      controls.appendChild(el('div', { className: 'form-group' }, [el('label', { text: 'Chapter' }), chapterSel]));
      root.appendChild(controls);
      var bundledList = el('div');
      root.appendChild(bundledList);
      function fillChapters() {
        chapterSel.innerHTML = '';
        chapterSel.appendChild(el('option', { value: '', text: 'All chapters' }));
        var chapters = App.content.getChapters(certSel.value || null, 'notes');
        Object.keys(chapters).sort().forEach(function (chapter) {
          chapterSel.appendChild(el('option', { value: chapter, text: chapter + ' (' + chapters[chapter].length + ')' }));
        });
      }
      function renderBundled() {
        bundledList.innerHTML = '';
        var visible = bundled.filter(function (n) {
          return (!certSel.value || n._cert === certSel.value) && (!chapterSel.value || n._chapter === chapterSel.value);
        });
        if (!visible.length) {
          bundledList.appendChild(emptyState('No notes found', 'Choose another certification or chapter.'));
          return;
        }
        visible.forEach(function (n) {
          var p = el('div', { className: 'card mb-2', style: { cursor: 'pointer' }, onClick: function () { App.core.navigate('#/notes/' + encodeURIComponent(n._id)); } });
          p.appendChild(el('h3', { text: n.title }));
          p.appendChild(el('div', { className: 'text-muted mt-1', text: n._chapter || 'General' }));
          bundledList.appendChild(p);
        });
      }
      fillChapters();
      renderBundled();
      certSel.addEventListener('change', function () { fillChapters(); renderBundled(); });
      chapterSel.addEventListener('change', renderBundled);
    }
    root.appendChild(el('h2', { className: 'mt-3 mb-1', text: 'Personal notes' }));
    var list = el('div', { id: 'personal-notes-list' });
    root.appendChild(list);
    function refreshPersonal() {
      list.innerHTML = '';
      var personal = App.store.getPersonalNotes();
      if (!personal.length) list.appendChild(el('p', { className: 'text-muted', text: 'No personal notes yet.' }));
      personal.forEach(function (n) {
        var p = el('div', { className: 'panel mb-2' });
        p.appendChild(el('div', { className: 'flex-between' }, [
          el('h3', { text: n.title }),
          el('div', { className: 'flex gap-sm' }, [
            el('button', { className: 'btn btn-ghost btn-sm', text: 'Edit', onClick: function () { openEditor(n); } }),
            el('button', {
              className: 'btn btn-danger btn-sm', text: 'Delete',
              onClick: function () { if (confirm('Delete this note?')) { App.store.deletePersonalNote(n.id); refreshPersonal(); } }
            })
          ])
        ]));
        p.appendChild(el('div', { className: 'notes-preview', html: App.markdown.render(n.body || '') }));
        list.appendChild(p);
      });
    }
    refreshPersonal();
    root.appendChild(el('button', { className: 'btn btn-primary mt-2', text: '+ New note', onClick: function () { openEditor(null); } }));
    function openEditor(note) {
      var body = el('div');
      var titleInp = el('input', { className: 'form-control mb-2', type: 'text', placeholder: 'Title', value: note ? note.title : '' });
      var layout = el('div', { className: 'notes-layout' });
      var ta = el('textarea', { className: 'form-control', placeholder: 'Markdown body…', style: { minHeight: '280px' } });
      ta.value = note ? (note.body || '') : '';
      var preview = el('div', { className: 'notes-preview' });
      function upd() { preview.innerHTML = App.markdown.render(ta.value); }
      ta.addEventListener('input', upd);
      upd();
      layout.appendChild(ta);
      layout.appendChild(preview);
      body.appendChild(titleInp);
      body.appendChild(layout);
      body.appendChild(el('button', {
        className: 'btn btn-primary mt-2', text: 'Save',
        onClick: function () {
          App.store.savePersonalNote({ id: note ? note.id : null, title: titleInp.value || 'Untitled', body: ta.value });
          App.core.closeModal();
          refreshPersonal();
          App.toast('Note saved', 'success');
        }
      }));
      App.core.openModal(body, { title: note ? 'Edit note' : 'New note' });
    }
  }

  function viewNoteDetail(root, noteId) {
    var notes = App.content.getAll('notes');
    var note = notes.find(function (n) { return n._id === noteId; });
    if (!note) { root.appendChild(emptyState('Note not found', noteId)); return; }
    root.appendChild(el('button', { className: 'btn btn-ghost btn-sm mb-2', text: '← All notes', onClick: function () { App.core.navigate('#/notes'); } }));
    root.appendChild(el('h1', { text: note.title }));
    root.appendChild(el('div', { className: 'flex gap-sm mb-2' }, [
      el('span', { className: 'chip chip-muted', text: note._chapter || 'General' })
    ]));
    root.appendChild(el('div', { className: 'notes-preview', html: App.markdown.render(note.body || '') }));
  }

  function buildPermsPanel() {
    var panel = el('div', { className: 'tool-panel' });
    panel.appendChild(el('p', { className: 'text-muted mb-2', style: { fontSize: '0.85rem' },
      text: 'Toggle permissions or type an octal mode — the chmod command updates live. Special bits render as s (setuid/setgid) and t (sticky).' }));

    var state = {
      special: { suid: false, sgid: false, sticky: false },
      user: { r: true, w: true, x: true },
      group: { r: true, w: false, x: true },
      other: { r: true, w: false, x: true }
    };
    var bindings = [];

    var outputPanel = el('div', { className: 'panel perms-output' });
    var octalEl = el('div', { className: 'octal-display' });
    var symEl = el('div', { className: 'symbolic-display' });
    var cmdEl = el('div', { className: 'command-display' });
    var flagRow = el('div', { className: 'flex gap-sm mt-1', style: { flexWrap: 'wrap', alignItems: 'center' } });
    outputPanel.appendChild(octalEl);
    outputPanel.appendChild(symEl);
    outputPanel.appendChild(cmdEl);
    outputPanel.appendChild(flagRow);

    function render() {
      var r = App.tools.permsFromMode(state.special, state.user, state.group, state.other);
      octalEl.textContent = r.octal;
      symEl.textContent = r.symbolic;
      cmdEl.textContent = r.command;
      flagRow.innerHTML = '';
      if (state.special.suid) flagRow.appendChild(el('span', { className: 'chip chip-amber', text: 'chmod u+s · setuid' }));
      if (state.special.sgid) flagRow.appendChild(el('span', { className: 'chip chip-amber', text: 'chmod g+s · setgid' }));
      if (state.special.sticky) flagRow.appendChild(el('span', { className: 'chip chip-amber', text: 'chmod +t · sticky' }));
      if (!state.special.suid && !state.special.sgid && !state.special.sticky) {
        flagRow.appendChild(el('span', { className: 'text-muted mono', style: { fontSize: '0.75rem' }, text: 'No special bits' }));
      }
    }

    function syncChecks() {
      bindings.forEach(function (b) { b.cb.checked = !!state[b.key][b.bit]; });
    }

    var grid = el('div', { className: 'perms-grid' });

    function permCol(label, key) {
      var c = el('div', { className: 'perm-col' });
      c.appendChild(el('div', { className: 'perm-col-label', text: label }));
      var wrap = el('div', { className: 'perm-bits' });
      ['r', 'w', 'x'].forEach(function (b) {
        var lab = el('label', { className: 'perm-bit' });
        var cb = el('input', { type: 'checkbox' });
        bindings.push({ cb: cb, key: key, bit: b });
        cb.addEventListener('change', function () { state[key][b] = cb.checked; render(); });
        lab.appendChild(cb);
        lab.appendChild(el('span', { text: b }));
        wrap.appendChild(lab);
      });
      c.appendChild(wrap);
      return c;
    }

    var specialCol = el('div', { className: 'perm-col perm-col-special' });
    specialCol.appendChild(el('div', { className: 'perm-col-label', text: 'Special bits' }));
    var spWrap = el('div', { className: 'perm-bits perm-bits-stack' });
    [['setuid', 'suid', 's'], ['setgid', 'sgid', 's'], ['sticky', 'sticky', 't']].forEach(function (t) {
      var lab = el('label', { className: 'perm-bit perm-bit-wide' });
      var cb = el('input', { type: 'checkbox' });
      bindings.push({ cb: cb, key: 'special', bit: t[1] });
      cb.addEventListener('change', function () { state.special[t[1]] = cb.checked; render(); });
      lab.appendChild(cb);
      lab.appendChild(el('span', { text: t[0] + ' (' + t[2] + ')' }));
      spWrap.appendChild(lab);
    });
    specialCol.appendChild(spWrap);

    grid.appendChild(specialCol);
    grid.appendChild(permCol('User (u)', 'user'));
    grid.appendChild(permCol('Group (g)', 'group'));
    grid.appendChild(permCol('Other (o)', 'other'));
    panel.appendChild(grid);

    var inputRow = el('div', { className: 'flex gap-sm mt-2', style: { alignItems: 'center', flexWrap: 'wrap' } });
    inputRow.appendChild(el('span', { className: 'text-muted mono', style: { fontSize: '0.8rem' }, text: 'Or type a mode:' }));
    var modeInp = el('input', { className: 'form-control mono', type: 'text', placeholder: 'e.g. 4755', style: { maxWidth: '110px' } });
    modeInp.addEventListener('input', function () {
      var parsed = App.tools.parseMode(modeInp.value);
      if (!parsed) return;
      state.special = parsed.special;
      state.user = parsed.user;
      state.group = parsed.group;
      state.other = parsed.other;
      syncChecks();
      render();
    });
    inputRow.appendChild(modeInp);
    panel.appendChild(inputRow);
    panel.appendChild(outputPanel);

    panel.appendChild(el('div', { className: 'label-upper mb-1 mt-3', text: 'Common modes' }));
    var presetRow = el('div', { className: 'flex gap-sm mb-2', style: { flexWrap: 'wrap' } });
    App.tools.getCommonModes().forEach(function (p) {
      presetRow.appendChild(el('button', {
        className: 'btn btn-secondary btn-sm', text: p.mode, title: p.name + ' — ' + p.note,
        onClick: function () {
          var parsed = App.tools.parseMode(p.mode);
          if (!parsed) return;
          state.special = parsed.special;
          state.user = parsed.user;
          state.group = parsed.group;
          state.other = parsed.other;
          modeInp.value = p.mode;
          syncChecks();
          render();
        }
      }));
    });
    panel.appendChild(presetRow);

    var tbl = el('table', { className: 'ref-table' });
    tbl.appendChild(el('thead', {}, [el('tr', {}, [
      el('th', { text: 'Mode' }), el('th', { text: 'Use case' }), el('th', { text: 'Meaning' })
    ])]));
    var tb = el('tbody');
    App.tools.getCommonModes().forEach(function (p) {
      tb.appendChild(el('tr', {}, [
        el('td', { className: 'mono', style: { fontWeight: '600', color: 'var(--accent-green)' }, text: p.mode }),
        el('td', { text: p.name }),
        el('td', { className: 'text-muted', text: p.note })
      ]));
    });
    tbl.appendChild(tb);
    panel.appendChild(tbl);

    panel.appendChild(el('div', { className: 'panel-raised mt-2' }, [
      el('div', { className: 'label-upper mb-1', text: 'Exam tip' }),
      el('p', { className: 'text-muted', style: { fontSize: '0.85rem' },
        text: 'To read a file you need r on the file itself and x on every directory in its path. setuid (4755) runs a program with the owner’s privileges — e.g. /usr/bin/passwd. Directories need x to be traversed.' })
    ]));

    syncChecks();
    render();
    return panel;
  }

  function viewTools(root) {
    root.appendChild(el('h1', { text: 'Tools' }));
    var tabs = [
      { id: 'subnet', name: 'Subnet Calc' },
      { id: 'convert', name: 'Number Convert' },
      { id: 'ports', name: 'Port Reference' },
      { id: 'cmds', name: 'Linux Commands' },
      { id: 'perms', name: 'Permissions' }
    ];
    var active = 'subnet';
    var tabRow = el('div', { className: 'tools-tabs' });
    var panels = {};
    tabs.forEach(function (t) {
      var btn = el('button', {
        className: 'tool-tab' + (t.id === active ? ' active' : ''), text: t.name,
        onClick: function () {
          active = t.id;
          tabRow.querySelectorAll('.tool-tab').forEach(function (b) { b.classList.remove('active'); });
          btn.classList.add('active');
          Object.keys(panels).forEach(function (k) { panels[k].classList.toggle('active', k === active); });
        }
      });
      tabRow.appendChild(btn);
    });
    root.appendChild(tabRow);

    var subnetPanel = el('div', { className: 'tool-panel active' });
    panels.subnet = subnetPanel;
    var ipInp = el('input', { className: 'form-control', type: 'text', value: '192.168.1.0', placeholder: 'IP address' });
    var cidrInp = el('input', { className: 'form-control', type: 'number', value: '24', min: '0', max: '32' });
    var resultBox = el('div', { className: 'panel mt-2' });
    var splitBox = el('div', { className: 'mt-2' });
    function runSubnet() {
      var r = App.tools.calcSubnet(ipInp.value.trim(), cidrInp.value);
      resultBox.innerHTML = '';
      if (r.error) { resultBox.appendChild(el('p', { className: 'text-red', text: r.error })); return; }
      [['Network', r.network + '/' + r.cidr], ['Broadcast', r.broadcast], ['First usable', r.firstUsable],
       ['Last usable', r.lastUsable], ['Usable hosts', String(r.usableHosts)], ['Subnet mask', r.mask],
       ['Wildcard', r.wildcard], ['Class', r.class], ['Scope', r.scope]].forEach(function (f) {
        resultBox.appendChild(el('div', { className: 'flex-between mb-1' }, [
          el('span', { className: 'text-muted', text: f[0] }), el('span', { className: 'mono', text: f[1] })
        ]));
      });
      splitBox.innerHTML = '';
      splitBox.appendChild(el('div', { className: 'label-upper mb-1', text: 'Split subnets' }));
      var newCidr = el('input', { className: 'form-control', type: 'number', value: String(Number(cidrInp.value) + 1), min: String(Number(cidrInp.value) + 1), max: '32', style: { maxWidth: '100px' } });
      splitBox.appendChild(el('div', { className: 'flex gap-sm mb-1', style: { alignItems: 'center' } }, [
        el('span', { text: 'New prefix:' }), newCidr,
        el('button', {
          className: 'btn btn-secondary btn-sm', text: 'Generate',
          onClick: function () {
            var list = App.tools.splitSubnets(r.networkInt, r.cidr, Number(newCidr.value));
            var tbl = el('table', { className: 'ref-table mt-1' });
            tbl.appendChild(el('thead', {}, [el('tr', {}, [el('th', { text: 'Network' }), el('th', { text: 'Broadcast' }), el('th', { text: 'Hosts' })])]));
            var tb = el('tbody');
            list.slice(0, 64).forEach(function (s) {
              tb.appendChild(el('tr', {}, [
                el('td', { className: 'mono', text: s.network }),
                el('td', { className: 'mono', text: s.broadcast }),
                el('td', { text: String(s.hosts) })
              ]));
            });
            tbl.appendChild(tb);
            var existing = splitBox.querySelector('table');
            if (existing) existing.remove();
            splitBox.appendChild(tbl);
          }
        })
      ]));
    }
    subnetPanel.appendChild(el('div', { className: 'form-row' }, [
      el('div', { className: 'form-group' }, [el('label', { text: 'IP Address' }), ipInp]),
      el('div', { className: 'form-group' }, [el('label', { text: 'CIDR' }), cidrInp])
    ]));
    subnetPanel.appendChild(el('button', { className: 'btn btn-primary', text: 'Calculate', onClick: runSubnet }));
    subnetPanel.appendChild(resultBox);
    subnetPanel.appendChild(splitBox);
    runSubnet();
    root.appendChild(subnetPanel);

    var convPanel = el('div', { className: 'tool-panel' });
    panels.convert = convPanel;
    var bases = [{ id: 'decimal', base: 10, label: 'Decimal' }, { id: 'hex', base: 16, label: 'Hex' }, { id: 'octal', base: 8, label: 'Octal' }, { id: 'binary', base: 2, label: 'Binary' }];
    var inputs = {};
    bases.forEach(function (b) {
      var inp = el('input', { className: 'form-control mono', type: 'text', id: 'num-' + b.id });
      inputs[b.id] = inp;
      convPanel.appendChild(el('div', { className: 'form-group mb-2' }, [el('label', { text: b.label }), inp]));
      inp.addEventListener('input', function () {
        var r = App.tools.convertNumber(inp.value, b.base);
        if (!r) return;
        bases.forEach(function (ob) { if (ob.id !== b.id) inputs[ob.id].value = r[ob.id]; });
      });
    });
    inputs.decimal.value = '255';
    inputs.decimal.dispatchEvent(new Event('input'));
    root.appendChild(convPanel);

    var portPanel = el('div', { className: 'tool-panel' });
    panels.ports = portPanel;
    var portSearch = el('input', { className: 'form-control mb-2', type: 'search', placeholder: 'Search ports…', style: { maxWidth: '280px' } });
    portPanel.appendChild(portSearch);
    var portTable = el('table', { className: 'ref-table' });
    portTable.appendChild(el('thead', {}, [el('tr', {}, [el('th', { text: 'Port' }), el('th', { text: 'Service' }), el('th', { text: 'Description' })])]));
    var portBody = el('tbody');
    portTable.appendChild(portBody);
    portPanel.appendChild(portTable);
    function renderPorts(q) {
      portBody.innerHTML = '';
      q = (q || '').toLowerCase();
      var hl = App.tools.getHighlightPort();
      App.tools.getPorts().filter(function (p) {
        if (!q) return true;
        return (p.port + ' ' + p.name + ' ' + p.desc).toLowerCase().indexOf(q) >= 0;
      }).forEach(function (p) {
        var tr = el('tr', { className: (hl && String(p.port).indexOf(String(hl)) >= 0) ? 'highlight' : '' });
        tr.appendChild(el('td', { className: 'mono', text: p.port }));
        tr.appendChild(el('td', { text: p.name }));
        tr.appendChild(el('td', { text: p.desc }));
        portBody.appendChild(tr);
      });
    }
    renderPorts();
    portSearch.addEventListener('input', function () { renderPorts(portSearch.value); });
    if (App.tools.getHighlightPort()) {
      active = 'ports';
      tabRow.querySelectorAll('.tool-tab').forEach(function (b, i) { b.classList.toggle('active', tabs[i].id === 'ports'); });
      Object.keys(panels).forEach(function (k) { panels[k].classList.toggle('active', k === 'ports'); });
    }
    root.appendChild(portPanel);

    var cmdPanel = el('div', { className: 'tool-panel' });
    panels.cmds = cmdPanel;
    var cmdSearch = el('input', { className: 'form-control mb-2', type: 'search', placeholder: 'Search commands…', style: { maxWidth: '280px' } });
    cmdPanel.appendChild(cmdSearch);
    var cmdTable = el('table', { className: 'ref-table' });
    cmdTable.appendChild(el('thead', {}, [el('tr', {}, [el('th', { text: 'Command' }), el('th', { text: 'Description' }), el('th', { text: 'Example' })])]));
    var cmdBody = el('tbody');
    cmdTable.appendChild(cmdBody);
    cmdPanel.appendChild(cmdTable);
    function renderCmds(q) {
      cmdBody.innerHTML = '';
      q = (q || '').toLowerCase();
      var hl = App.tools.getHighlightCommand();
      App.tools.getCommands().filter(function (c) {
        if (!q) return true;
        return (c.cmd + ' ' + c.desc + ' ' + c.example).toLowerCase().indexOf(q) >= 0;
      }).forEach(function (c) {
        var tr = el('tr', { className: (hl && c.cmd === hl) ? 'highlight' : '' });
        tr.appendChild(el('td', { className: 'mono', text: c.cmd }));
        tr.appendChild(el('td', { text: c.desc }));
        var exTd = el('td');
        exTd.appendChild(el('code', { className: 'mono', text: c.example, style: { fontSize: '0.82rem' } }));
        exTd.appendChild(el('button', {
          className: 'btn btn-ghost btn-sm', text: 'Copy', style: { marginLeft: '0.5rem' },
          onClick: function () { utils.copyText(c.example).then(function () { App.toast('Copied', 'success', 1200); }); }
        }));
        tr.appendChild(exTd);
        cmdBody.appendChild(tr);
      });
    }
    renderCmds();
    cmdSearch.addEventListener('input', function () { renderCmds(cmdSearch.value); });
    if (App.tools.getHighlightCommand()) {
      active = 'cmds';
      tabRow.querySelectorAll('.tool-tab').forEach(function (b, i) { b.classList.toggle('active', tabs[i].id === 'cmds'); });
      Object.keys(panels).forEach(function (k) { panels[k].classList.toggle('active', k === 'cmds'); });
    }
    root.appendChild(cmdPanel);

    var permsPanel = buildPermsPanel();
    panels.perms = permsPanel;
    root.appendChild(permsPanel);
    if (App.tools.getHighlightTool && App.tools.getHighlightTool() === 'perms') {
      active = 'perms';
      tabRow.querySelectorAll('.tool-tab').forEach(function (b, i) { b.classList.toggle('active', tabs[i].id === 'perms'); });
      Object.keys(panels).forEach(function (k) { panels[k].classList.toggle('active', k === 'perms'); });
    }
  }

  function viewSettings(root) {
    root.appendChild(el('h1', { text: 'Settings' }));
    var settings = App.store.getSettings();
    var themePanel = el('div', { className: 'panel mb-3' });
    themePanel.appendChild(el('div', { className: 'label-upper mb-1', text: 'Theme' }));
    var themeRow = el('div', { className: 'flex gap-sm' });
    ['dark', 'light'].forEach(function (t) {
      themeRow.appendChild(el('button', {
        className: 'btn ' + ((settings.theme || 'dark') === t ? 'btn-primary' : 'btn-secondary') + ' btn-sm',
        text: t.charAt(0).toUpperCase() + t.slice(1),
        onClick: function () {
          settings.theme = t;
          App.store.saveSettings(settings);
          App.core.applyTheme(t);
          root.innerHTML = '';
          viewSettings(root);
        }
      }));
    });
    themePanel.appendChild(themeRow);
    root.appendChild(themePanel);

    var accessPanel = el('div', { className: 'panel mb-3' });
    accessPanel.appendChild(el('div', { className: 'label-upper mb-1', text: 'Accessibility' }));
    accessPanel.appendChild(el('p', { className: 'text-muted mb-2', text: 'Choose a comfortable reading size. This setting applies across the app and is saved on this device.' }));
    var sizeRow = el('div', { className: 'flex gap-sm', role: 'group', 'aria-label': 'Text size' });
    ['small', 'medium', 'large'].forEach(function (size) {
      var isCurrent = (settings.textSize || 'medium') === size;
      sizeRow.appendChild(el('button', {
        className: 'btn ' + (isCurrent ? 'btn-primary' : 'btn-secondary') + ' btn-sm',
        text: size.charAt(0).toUpperCase() + size.slice(1),
        'aria-pressed': isCurrent ? 'true' : 'false',
        onClick: function () {
          settings.textSize = size;
          App.store.saveSettings(settings);
          App.core.applyTextSize(size);
          root.innerHTML = '';
          viewSettings(root);
        }
      }));
    });
    accessPanel.appendChild(sizeRow);
    root.appendChild(accessPanel);

    var motionPanel = el('div', { className: 'panel mb-3' });
    motionPanel.appendChild(el('div', { className: 'label-upper mb-1', text: 'Animations' }));
    motionPanel.appendChild(el('p', { className: 'text-muted mb-2', text: 'Smooth transitions and micro-interactions across the app. Turn off for an instantly static interface.' }));
    var motionRow = el('div', { className: 'flex gap-sm', role: 'group', 'aria-label': 'Animations' });
    var motionOn = settings.animations !== false;
    [['On', true], ['Off', false]].forEach(function (opt) {
      var isCurrent = motionOn === opt[1];
      motionRow.appendChild(el('button', {
        className: 'btn ' + (isCurrent ? 'btn-primary' : 'btn-secondary') + ' btn-sm',
        text: opt[0],
        'aria-pressed': isCurrent ? 'true' : 'false',
        onClick: function () {
          settings.animations = opt[1];
          App.store.saveSettings(settings);
          App.core.applyMotion();
          root.innerHTML = '';
          viewSettings(root);
        }
      }));
    });
    motionPanel.appendChild(motionRow);
    root.appendChild(motionPanel);

    var threshPanel = el('div', { className: 'panel mb-3' });
    threshPanel.appendChild(el('div', { className: 'label-upper mb-1', text: 'Exam pass threshold' }));
    if (!settings.passThreshold) settings.passThreshold = {};
    App.content.getCerts().forEach(function (c) {
      var row = el('div', { className: 'form-group mb-1' });
      var inp = el('input', {
        className: 'form-control', type: 'number', min: '1', max: '100',
        value: String(settings.passThreshold[c.id] || 70), style: { maxWidth: '100px' }
      });
      inp.addEventListener('change', function () {
        settings.passThreshold[c.id] = parseInt(inp.value, 10) || 70;
        App.store.saveSettings(settings);
        App.toast('Threshold saved', 'success', 1500);
      });
      row.appendChild(el('label', { text: c.name }));
      row.appendChild(inp);
      threshPanel.appendChild(row);
    });
    root.appendChild(threshPanel);

    var contentPanel = el('div', { className: 'panel mb-3' });
    contentPanel.appendChild(el('div', { className: 'label-upper mb-1', text: 'Content' }));
    contentPanel.appendChild(el('button', { className: 'btn btn-secondary btn-sm mb-2', text: 'Reload from certifications/', onClick: function () { App.content.reload(); } }));
    contentPanel.appendChild(el('p', { className: 'text-muted mb-1', style: { fontSize: '0.85rem' }, text: 'Deep scan: pick the certifications folder to load content without a web server.' }));
    var fileInp = el('input', { type: 'file', webkitdirectory: 'true', multiple: 'true', style: { display: 'none' }, id: 'deep-scan-input' });
    var saveSnap = el('input', { type: 'checkbox', id: 'save-snap' });
    contentPanel.appendChild(el('label', { style: { display: 'flex', gap: '0.4rem', alignItems: 'center', marginBottom: '0.5rem', fontSize: '0.88rem' } }, [
      saveSnap, document.createTextNode('Save snapshot to localStorage (survives refresh)')
    ]));
    contentPanel.appendChild(fileInp);
    contentPanel.appendChild(el('button', { className: 'btn btn-secondary btn-sm', text: 'Deep-scan folder…', onClick: function () { fileInp.click(); } }));
    fileInp.addEventListener('change', function () {
      if (!fileInp.files || !fileInp.files.length) return;
      App.content.deepScan(fileInp.files, saveSnap.checked, function (found) {
        App.toast('Deep-scan: ' + found.questions + ' Q · ' + found.flashcards + ' cards · ' + found.labs + ' labs · ' + found.notes + ' notes from ' + found.files + ' files', 'success', 4500);
        App.core.handleRoute();
      });
    });
    root.appendChild(contentPanel);

    var backupPanel = el('div', { className: 'panel mb-3' });
    backupPanel.appendChild(el('div', { className: 'label-upper mb-1', text: 'Backup & data' }));
    backupPanel.appendChild(el('div', { className: 'flex gap-sm mb-2', style: { flexWrap: 'wrap' } }, [
      el('button', {
        className: 'btn btn-secondary btn-sm', text: 'Export backup',
        onClick: function () {
          utils.downloadBlob(new Blob([JSON.stringify(App.store.exportFullBackup(), null, 2)], { type: 'application/json' }), 'reviewapp-backup.json');
        }
      }),
      el('button', {
        className: 'btn btn-secondary btn-sm', text: 'Import backup',
        onClick: function () {
          var inp = el('input', { type: 'file', accept: '.json' });
          inp.addEventListener('change', function () {
            var f = inp.files[0];
            if (!f) return;
            var reader = new FileReader();
            reader.onload = function (e) {
              try {
                App.store.importFullBackup(JSON.parse(e.target.result));
                App.toast('Backup imported', 'success');
                App.core.handleRoute();
              } catch (err) { App.toast('Import failed: ' + err.message, 'error'); }
            };
            reader.readAsText(f);
          });
          inp.click();
        }
      }),
      el('button', {
        className: 'btn btn-danger btn-sm', text: 'Wipe progress',
        onClick: function () {
          if (confirm('Delete all answers, streaks, exams, and card progress? This cannot be undone.')) {
            App.store.wipeProgress();
            App.toast('Progress wiped', 'info');
            App.core.handleRoute();
          }
        }
      })
    ]));
    root.appendChild(backupPanel);

    var about = el('div', { className: 'panel' });
    about.appendChild(el('div', { className: 'label-upper mb-1', text: 'About' }));
    about.appendChild(el('p', { text: 'ReviewApp v1.0 — offline study hub for CompTIA Linux+ and Network+.' }));
    about.appendChild(el('p', { className: 'text-muted', style: { fontSize: '0.85rem' }, text: 'Vanilla HTML/CSS/JS. No network required. All data stays in your browser.' }));
    var c = App.content.counts();
    about.appendChild(el('p', { className: 'mono text-muted mt-1', style: { fontSize: '0.8rem' }, text: 'Loaded: ' + c.questions + 'Q · ' + c.flashcards + 'C · ' + c.labs + 'L · ' + c.notes + 'N' }));
    root.appendChild(about);
  }

  App.core.registerRoute('dashboard', viewDashboard);
  App.core.registerRoute('certifications', viewCertifications);
  App.core.registerRoute('quiz', viewQuiz);
  App.core.registerRoute('exam', viewExam);
  App.core.registerRoute('flashcards', viewFlashcards);
  App.core.registerRoute('labs', viewLabs);
  App.core.registerRoute('stats', viewStats);
  App.core.registerRoute('notes', viewNotes);
  App.core.registerRoute('tools', viewTools);
  App.core.registerRoute('settings', viewSettings);
})();
