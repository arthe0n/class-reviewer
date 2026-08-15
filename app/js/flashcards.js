/* ═══════════════════════════════════════════════════════════
   ReviewApp · flashcards.js
   Flashcard review engine: Again / Next + retry queue + shuffle
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

  function newSessionId() {
    return 'fc_' + utils.uid();
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

    var cardsById = {};
    order.forEach(function (c) { cardsById[cardKey(c)] = c; });

    var cert = opts.cert || null;
    var chapter = opts.chapter || null;
    if (!cert || !chapter) {
      var first = order[0];
      if (first) {
        if (!cert) cert = first._cert || null;
        if (!chapter) chapter = first._chapter || null;
      }
    }

    session = {
      id: newSessionId(),
      ts: Date.now(),
      cert: cert,
      chapter: chapter,
      cardsById: cardsById,
      totalCards: order.length,
      queue: order.map(cardKey),
      index: 0,
      retry: [],                 // card keys marked Again in the current pass
      done: {},                  // cardKey -> true once answered Next
      stats: {},                 // cardKey -> { attempts, agains }
      flipped: false,
      finished: false,
      completed: 0,              // cards answered Next
      agains: 0,                 // total Again marks
      attempts: 0                // total grades
    };
    App.store.setLastStudy({ type: 'flashcards', cert: session.cert, ts: Date.now() });
    persistSession();
    return session;
  }

  function getSession() {
    if (!session) session = App.store.getFlashSession();
    return session;
  }

  function persistSession() {
    if (session) App.store.saveFlashSession(session);
  }

  function currentKey() {
    if (!session || session.finished) return null;
    return session.queue[session.index] || null;
  }

  function currentCard() {
    var k = currentKey();
    if (!k) return null;
    return session.cardsById[k] || null;
  }

  function flip() {
    if (!session) return;
    session.flipped = !session.flipped;
    persistSession();
  }

  /* Move forward; promote the retry queue when the current pass ends. */
  function advance() {
    if (session.index + 1 < session.queue.length) {
      session.index++;
      return true;
    }
    if (session.retry.length) {
      session.queue = session.retry;
      session.retry = [];
      session.index = 0;
      return true;
    }
    return false; // session complete
  }

  function grade(gradeName) {
    if (!session) return null;
    var k = currentKey();
    if (!k) return null;
    var card = session.cardsById[k];
    var st = session.stats[k] || (session.stats[k] = { attempts: 0, agains: 0 });
    st.attempts++;
    session.attempts++;

    // Spaced-repetition scheduling (existing Leitner boxes)
    App.store.gradeCard(k, gradeName === 'again' ? 'again' : 'good');

    // Card-level analytics record
    App.store.logCardReview({
      cardId: k,
      cert: card._cert || session.cert || null,
      chapter: card._chapter || session.chapter || null,
      tags: card.tags || [],
      outcome: gradeName,       // 'again' | 'next'
      sessionId: session.id,
      sessionTs: session.ts,
      attempt: st.attempts
    });

    if (gradeName === 'again') {
      st.agains++;
      session.agains++;
      session.retry.push(k);    // retry later, never immediately
    } else {
      session.completed++;
      session.done[k] = true;
    }
    session.flipped = false;
    var more = advance();
    if (!more) session.finished = true;
    persistSession();
    return more; // true = more cards remain, false = complete
  }

  /* Shuffle remaining (ungraded) active cards + the retry queue.
     Never drops, duplicates, resets progress, or replaces the current card. */
  function shuffleList(list) {
    if (list.length < 2) return list.slice();
    var original = list.slice();
    var shuffled = utils.shuffle(list);
    var unchanged = shuffled.every(function (item, index) { return item === original[index]; });
    // A random shuffle can coincidentally produce the same order. Make the
    // control visibly meaningful whenever there are at least two cards.
    if (unchanged) {
      var swap = shuffled[0];
      shuffled[0] = shuffled[1];
      shuffled[1] = swap;
    }
    return shuffled;
  }

  function shuffle() {
    if (!session || session.finished) return false;

    // Keep cards already answered Next behind us, but put every unresolved
    // card — including the current card and retry cards — into one new deck.
    // Moving the index to the new deck head makes the shuffled card appear
    // immediately instead of leaving the old card on screen.
    var completedHead = session.queue.slice(0, session.index).filter(function (key) {
      return !!session.done[key];
    });
    var currentKey = session.queue[session.index] || null;
    var unresolved = session.queue.slice(session.index).concat(session.retry);
    if (unresolved.length < 2) {
      persistSession();
      return false;
    }

    var shuffled = shuffleList(unresolved);
    // Do not leave the same card visible after pressing Shuffle when another
    // unresolved card is available.
    if (shuffled[0] === currentKey) {
      var swapIndex = shuffled.findIndex(function (key) { return key !== currentKey; });
      if (swapIndex > 0) {
        var swap = shuffled[0];
        shuffled[0] = shuffled[swapIndex];
        shuffled[swapIndex] = swap;
      }
    }

    session.queue = completedHead.concat(shuffled);
    session.index = completedHead.length;
    session.retry = [];
    session.flipped = false;
    persistSession();
    return true;
  }

  function buildSummary() {
    var neededReview = 0;
    var withoutRetry = 0;
    var tagCount = {};
    Object.keys(session.stats).forEach(function (k) {
      var s = session.stats[k];
      var card = session.cardsById[k] || {};
      if (s.agains > 0) {
        neededReview++;
        (card.tags || []).forEach(function (t) { tagCount[t] = (tagCount[t] || 0) + 1; });
      } else {
        withoutRetry++;
      }
    });
    var focus = Object.keys(tagCount).sort(function (a, b) { return tagCount[b] - tagCount[a]; });
    return {
      id: session.id,
      ts: session.ts,
      cert: session.cert,
      chapter: session.chapter,
      totalCards: session.totalCards,
      completed: session.completed,
      neededReview: neededReview,
      withoutRetry: withoutRetry,
      repeatAttempts: session.agains,
      focusAreas: focus.slice(0, 3)
    };
  }

  function endSession() {
    var summary = null;
    if (session) {
      summary = buildSummary();
      App.store.saveFlashSessionSummary(summary);
      App.store.clearFlashSession();
    }
    session = null;
    return summary;
  }

  function startWithCard(card) {
    pendingStartCard = card;
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
    shuffle: shuffle,
    endSession: endSession,
    getSession: getSession,
    startWithCard: startWithCard,
    consumePendingCard: consumePendingCard,
    cardKey: cardKey
  };
})();
