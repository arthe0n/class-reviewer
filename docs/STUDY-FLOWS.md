# Study Flows

ReviewApp is built around a simple loop: pick a certification, work through its
chapters, review weak areas, and track progress.

## Current certification

You study **one certification at a time**. Use the **Current certification**
picker in the top-right to switch; all certification-scoped views update to the
new certification automatically. Tools, Settings, and Search stay global.

## Dashboard

The Dashboard is the starting point. It shows the active certification's stats,
recommendations, recent activity, and per-chapter progress. Each chapter row can
launch its Quiz, Flashcards, or Labs directly with the right context.

## Quiz

Five modes, all scoped to the active certification:

- **Chapter Focus** — one chapter's questions.
- **Random Mix** — a set of random questions.
- **Theme Attack** — questions filtered by tags.
- **Weak Spots** — questions answered incorrectly or never seen.
- **Speed Run** — ten questions with a time limit each.

Only **completed** quizzes count toward your statistics. An in-progress quiz is
preserved when you leave it; the Quiz setup page shows **Resume quiz** to finish
and count it, or **Cancel quiz** to discard it without affecting your stats.

### Keyboard shortcuts

Questions are fully usable from the keyboard:

- **`1`–`5`** — select an option in multiple-choice, multiple-select, and
true/false questions. Press the same key again to deselect it (single-answer
questions move the selection when you press a different key).
- **Enter / Space** — submit the current answer, then advance to the next
question. In the fill-in-the-blank answer box, Enter submits.
- **`?`** — show the keyboard shortcut reference panel.
- Matching questions validate all rows before submitting; this includes generic item-to-counterpart questions and legacy command matching.

## Exam Simulation

The Exam is a timed, certification-scoped simulation: configure the question
count and time limit, then answer with immediate feedback only after you submit.
Answers are recorded as you select them and only count toward your statistics
once the exam is submitted. Leaving the exam page pauses the countdown, and an
in-progress exam resumes where you left off. The same keyboard shortcuts apply:
`1`–`5` select or deselect options, Enter (or Space outside a text field) moves
to the next question, and `?` opens the shortcut reference panel.

## Flashcards

Open Flashcards to choose **All chapters** or a single chapter, or **Resume
saved session** when one is in progress. While reviewing:

- **Again** — the card needs review and returns via the retry queue.
- **Next** — the card is done for this session.
- **Shuffle** — randomizes the remaining cards without resetting progress.

A session can't finish while retry cards remain, and an unfinished session is
saved so it can be resumed later. Only **completed** sessions count toward your
statistics: a saved session shows **Resume saved session** to finish and count
it, or **Cancel session** to discard it without affecting your stats.

Flashcards also support keyboard review: **Space** (or clicking the card) flips
it, **S** shuffles the remaining cards, and once a card is flipped **1** marks
**Again** and **2** (or Enter) marks **Next**.

## Labs

Labs are organized as **certification → chapter → lab**. Each chapter is an
expandable section with its own labs, each with objectives, revealable hints and
solutions, and completion tracking.

## Notes

Each chapter has **one user-facing note** that contains all of its source
sections in order, with stable links and search across the combined content.

## Stats

Stats is the analytics view for the active certification: accuracy, question
coverage, streak, activity, flashcard weak areas, and exam history — with CSV,
JSON, and Markdown export options.
