/* ═══════════════════════════════════════════════════════════
   ReviewApp · flashcards.js
   Leitner spaced-repetition engine + 3D flip UI helpers
   ═══════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var App = window.ReviewApp;
  var utils = App.core.utils;

  var session = null;
  var pendingStartCard = null;

  function cardKey(card) {
    return card._key || card._id;
  }

  function buildDeck(opts) {
    opts = opts || {};
    var all = App.content.getAll('flashcards');
    if (opts.cert) {
      all = all.filter(function (c) { return c._cert === opts.cert; });
    }
    if (opts.chapter) {
      all = all.filter(function (c) { return c._chapter === opts.chapter; });
    }
    if (opts.tags && opts.tags.length) {
      all = all.filter(function (c) {
        return (c.tags || []).some(function (t) { return opts.tags.indexOf(t) >= 0; });
      });
    }
    return all;
  }

  function startSession(deck, opts) {
    opts = opts || {};
    if (!deck || !deck.length) {
      App.toast('No cards in this deck', 'error');
      return null;
    }
    var keys = deck.map(cardKey);
    var dueKeys = App.store.cardsDue(keys);
    var dueSet = {};
    dueKeys.forEach(function (k) { dueSet[k] = true; });

    // Due first, then rest shuffled
    var due = [];
    var rest = [];
    deck.forEach(function (c) {
      if (dueSet[cardKey(c)]) due.push(c);
      else rest.push(c);
    });
    rest = utils.shuffle(rest);
    var order = due.concat(rest);

    if (opts.startCard) {
      var idx = order.findIndex(function (c) { return cardKey(c) === cardKey(opts.startCard); });
      if (idx > 0) {
        var item = order.splice(idx, 1)[0];
        order.unshift(item);
      }
    }

    session = {
      deck: order,
      index: 0,
      flipped: false,
      graded: 0,
      again: 0,
      good: 0,
      easy: 0
    };
    App.store.setLastStudy({ type: 'flashcards', ts: Date.now() });
    return session;
  }

  function currentCard() {
    if (!session) return null;
    return session.deck[session.index];
  }

  function flip() {
    if (!session) return;
    session.flipped = !session.flipped;
  }

  function grade(gradeName) {
    if (!session) return null;
    var card = currentCard();
    if (!card) return null;
    App.store.gradeCard(cardKey(card), gradeName);
    session.graded++;
    if (gradeName === 'again') session.again++;
    else if (gradeName === 'good') session.good++;
    else if (gradeName === 'easy') session.easy++;

    session.flipped = false;
    if (session.index < session.deck.length - 1) {
      session.index++;
      return true;
    }
    return false; // finished
  }

  function next() {
    if (!session) return false;
    session.flipped = false;
    if (session.index < session.deck.length - 1) {
      session.index++;
      return true;
    }
    return false;
  }

  function prev() {
    if (!session) return false;
    session.flipped = false;
    if (session.index > 0) {
      session.index--;
      return true;
    }
    return false;
  }

  function endSession() {
    var result = session ? {
      total: session.deck.length,
      graded: session.graded,
      again: session.again,
      good: session.good,
      easy: session.easy
    } : null;
    session = null;
    return result;
  }

  function getSession() { return session; }

  function startWithCard(card) {
    pendingStartCard = card;
    // views will pick this up
  }

  function consumePendingCard() {
    var c = pendingStartCard;
    pendingStartCard = null;
    return c;
  }

  App.flashcards = {
    buildDeck: buildDeck,
    startSession: startSession,
    currentCard: currentCard,
    flip: flip,
    grade: grade,
    next: next,
    prev: prev,
    endSession: endSession,
    getSession: getSession,
    startWithCard: startWithCard,
    consumePendingCard: consumePendingCard,
    cardKey: cardKey
  };
})();
