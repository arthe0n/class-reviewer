/* ═══════════════════════════════════════════════════════════
   ReviewApp · markdown.js
   Tiny safe markdown renderer (no HTML injection)
   Supports: headings, bold, italic, code, code blocks,
   lists, links (http only), paragraphs, horizontal rules
   ═══════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var App = window.ReviewApp;
  var utils = App.core.utils;

  function escape(s) {
    return utils.escapeHtml(String(s));
  }

  function inline(text) {
    // code first
    text = text.replace(/`([^`]+)`/g, function (_, c) {
      return '<code>' + escape(c) + '</code>';
    });
    // bold
    text = text.replace(/\*\*([^*]+)\*\*/g, function (_, c) {
      return '<strong>' + escape(c) + '</strong>';
    });
    // italic
    text = text.replace(/\*([^*]+)\*/g, function (_, c) {
      return '<em>' + escape(c) + '</em>';
    });
    // links (http/https only)
    text = text.replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g, function (_, label, url) {
      return '<a href="' + escape(url) + '" target="_blank" rel="noopener noreferrer">' + escape(label) + '</a>';
    });
    return text;
  }

  function render(src) {
    if (!src) return '';
    var lines = String(src).replace(/\r\n/g, '\n').split('\n');
    var html = [];
    var i = 0;
    var inCode = false;
    var codeBuf = [];
    var inList = false;
    var listType = null;

    function closeList() {
      if (inList) {
        html.push(listType === 'ol' ? '</ol>' : '</ul>');
        inList = false;
        listType = null;
      }
    }

    while (i < lines.length) {
      var line = lines[i];

      // fenced code
      if (line.trim().indexOf('```') === 0) {
        if (inCode) {
          html.push('<pre><code>' + escape(codeBuf.join('\n')) + '</code></pre>');
          codeBuf = [];
          inCode = false;
        } else {
          closeList();
          inCode = true;
        }
        i++;
        continue;
      }
      if (inCode) {
        codeBuf.push(line);
        i++;
        continue;
      }

      // horizontal rule
      if (/^---+$/.test(line.trim()) || /^\*\*\*+$/.test(line.trim())) {
        closeList();
        html.push('<hr/>');
        i++;
        continue;
      }

      // headings
      var hm = line.match(/^(#{1,3})\s+(.+)$/);
      if (hm) {
        closeList();
        var level = hm[1].length;
        html.push('<h' + level + '>' + inline(hm[2]) + '</h' + level + '>');
        i++;
        continue;
      }

      // unordered list
      var ulm = line.match(/^[\*\-\+]\s+(.+)$/);
      if (ulm) {
        if (!inList || listType !== 'ul') {
          closeList();
          html.push('<ul>');
          inList = true;
          listType = 'ul';
        }
        html.push('<li>' + inline(ulm[1]) + '</li>');
        i++;
        continue;
      }

      // ordered list
      var olm = line.match(/^\d+\.\s+(.+)$/);
      if (olm) {
        if (!inList || listType !== 'ol') {
          closeList();
          html.push('<ol>');
          inList = true;
          listType = 'ol';
        }
        html.push('<li>' + inline(olm[1]) + '</li>');
        i++;
        continue;
      }

      // blank
      if (!line.trim()) {
        closeList();
        i++;
        continue;
      }

      // paragraph
      closeList();
      html.push('<p>' + inline(line) + '</p>');
      i++;
    }
    closeList();
    if (inCode) {
      html.push('<pre><code>' + escape(codeBuf.join('\n')) + '</code></pre>');
    }
    return html.join('\n');
  }

  App.markdown = { render: render };
})();
