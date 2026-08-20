/* ReviewApp · markdown.test.js
 *
 * Regression checks for the inline Markdown renderer used by quiz question
 * titles. Run with: node tests/markdown.test.js
 */
'use strict';

var assert = require('assert');

global.window = {
  ReviewApp: {
    core: {
      utils: {
        escapeHtml: function (value) {
          return String(value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
        }
      }
    }
  }
};

require('../app/js/markdown.js');
var markdown = global.window.ReviewApp.markdown;

var question = 'Which `ls` option lists hidden files?';
var rendered = markdown.renderInline(question);
assert.strictEqual(rendered, 'Which <code>ls</code> option lists hidden files?');
assert.strictEqual(rendered.indexOf('`'), -1, 'inline code delimiters should not be shown');
assert.strictEqual(
  markdown.renderInline('\uE000 literal \uE001'),
  '\uE000 literal \uE001',
  'marker-like literal text should remain visible'
);

assert.strictEqual(
  markdown.renderInline('Use `<script>alert(1)</script>` safely.'),
  'Use <code>&lt;script&gt;alert(1)&lt;/script&gt;</code> safely.'
);
assert.strictEqual(
  markdown.renderInline('A <b>literal</b> command.'),
  'A &lt;b&gt;literal&lt;/b&gt; command.'
);
assert.strictEqual(
  markdown.renderInline('Use **bold** and *italic*.'),
  'Use <strong>bold</strong> and <em>italic</em>.'
);

console.log('PASS: inline Markdown rendering checks');
