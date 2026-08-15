# ReviewApp

**Offline study & review hub for certification learning.**

ReviewApp is a vanilla HTML/CSS/JavaScript study platform designed to run
locally, without an account, build step, framework, CDN, or network connection.
Open `index.html` and study with certification content loaded from the local
`certifications/` directory.

The application uses a **one-certification-at-a-time** study model. Choose the
active certification from the **Current certification** picker in the top-right
of the top bar and the study experience automatically stays inside that
certification:

- Dashboard and current-chapter progress
- Quiz and Exam Simulation
- Flashcards and review analytics
- Labs
- Notes
- Stats, recommendations, activity, and progress

**Tools**, **Settings**, and **Global Search** remain available independently of
the active certification. The active certification and all study data are
persisted locally in `localStorage`.

---

## Screenshots

The repository includes current screenshots of the main study views in
[`docs/screenshots/`](./docs/screenshots/). They reflect the current dark
terminal-inspired UI, populated study analytics, and certification-scoped
layout.

| Dashboard | Quiz |
|---|---|
| ![ReviewApp Dashboard](docs/screenshots/dashboard.png) | ![ReviewApp Quiz](docs/screenshots/quiz.png) |
| Certification-scoped progress, recommendations, activity, and chapter actions. | Chapter context, question progress, and the available practice modes. |

| Exam Simulation | Flashcards |
|---|---|
| ![ReviewApp Exam Simulation](docs/screenshots/exam.png) | ![ReviewApp Flashcards](docs/screenshots/flashcards.png) |
| Timed exam configuration and question palette. | Card review with the Again / Next workflow and spaced repetition. |

| Labs | Stats |
|---|---|
| ![ReviewApp Labs](docs/screenshots/labs.png) | ![ReviewApp Stats](docs/screenshots/stats.png) |
| Certification → chapter lab organization and hands-on scenarios. | Certification-scoped accuracy, coverage, activity, and weak areas. |

The current interface also includes the global certification picker, current-chapter
progress actions on the Dashboard, a Flashcards menu that opens by default,
direct chapter-start options, explicit saved-session resume, one-note-per-chapter
Notes navigation, and responsive layouts for narrow windows and mobile screens.

The gallery uses representative local study data where a view benefits from it:
answer history, flashcard reviews, exam attempts, lab completion, and activity
across several days. That data is used only while capturing the images and is
not shipped with the app or stored in the repository.

---

## Quick start

1. Open the project folder.
2. Double-click **`index.html`**.
3. Use Chrome, Edge, Firefox, or Safari.

All progress lives in the browser's `localStorage`.

> **Tip:** If content does not load in a strict `file://` environment, open
> **Settings → Deep-scan folder…** and select the `certifications` directory.
> The app can also be served by any simple local static HTTP server.

---

## Current certification workflow

The top-right **Current certification** picker is the single source of truth for
certification-specific views.

### Selecting a certification

- Certifications are read from `certifications/_manifest.js`.
- Every registered certification appears automatically in the picker.
- The picker displays the certification name, brand color, and content counts.
- Switching certification updates the current view without requiring a trip
  back to the Dashboard.
- The selection is saved as `reviewapp.v1.currentCert`.
- If a saved certification is no longer available, the app safely falls back to
  the first available certification.
- If an active Quiz, Exam, or Flashcards session belongs to another
  certification, the app asks before switching and preserves that session for
  later resume.

### Certification-specific views

| View | Behavior |
|---|---|
| **Dashboard** | Shows only the active certification's stats, recommendations, activity, and the last/current chapter's progress. |
| **Quiz** | All modes use only questions from the active certification. Chapter Focus lists only its chapters. |
| **Exam Sim** | Uses the active certification's question pool and defaults to its maximum valid question count. |
| **Flashcards** | Uses only cards from the active certification. The menu is shown by default; selecting All chapters or a specific chapter starts immediately, while an unfinished saved session is resumed only through its explicit Resume saved session action. |
| **Labs** | Shows only the active certification's labs grouped into expandable chapter sections. |
| **Notes** | Shows one complete note per chapter for the active certification, including all source sections. |
| **Stats** | Filters accuracy, coverage, activity, weak areas, exam history, and lab progress by certification. |

### Global areas

- **Tools** are shared utilities and reference material. Linux command examples
  are shown in terminal-style boxes with an inline **Copy** button on the right.
- **Settings** control global theme, text size, animation, threshold, backup,
  deep-scan, and reload behavior.
- **Search** indexes questions, flashcards, notes, ports, and commands across
  all loaded certifications. Labs remain scoped to the active certification.
  Search results identify their certification, and opening a result from another
  certification switches to the correct context before opening it.

---

## What you get

| Area | Features |
|---|---|
| **Dashboard** | Certification-scoped stats, recommendations, 14-day activity, continue studying, and focused progress for the last/current chapter. The visible chapter can launch Quiz, Flashcards, or Labs directly. |
| **Quiz** | Chapter Focus, Random Mix, Theme/Tags, Weak Spots, and Speed Run modes, with dynamic certification/chapter context. |
| **Exam Sim** | Timed CompTIA-style exam, maximum-question default, question palette, flag-for-review, pass threshold, and exam history. |
| **Flashcards** | 3D flip cards, direct chapter selection, Shuffle, Again / Next review, retry queue, persistence, summaries, and card-level analytics. |
| **Labs** | Active certification's labs grouped by expandable chapter sections, search, ordering, completion status, objectives, hints, solutions, and copy controls. |
| **Notes** | One user-facing note per certification chapter, with all source sections rendered inside the note and stable deep-linkable IDs. |
| **Stats** | Accuracy, question coverage, chapter progress, streak, activity chart, weak tags, Flashcards weak areas, exam history, and CSV/JSON/Markdown export. |
| **Tools** | Subnet calculator, number converter, common ports, Linux command reference with terminal-style examples and inline Copy buttons, and a live permissions utility for symbolic and octal modes. |
| **Search** | Fast global search across questions, flashcards, notes, ports, and commands; labs stay within the active certification. |
| **Settings** | Global theme, application size, animation toggle, exam threshold, data backup/import, deep scan, reload, and wipe controls. |

### Themes and application size

**Monokai** is the default theme for users without a saved preference. The
selector includes 11 available themes:

- Monokai
- Dracula
- One Dark
- GitHub Dark
- Nord
- Gruvbox Dark
- Tokyo Night
- Catppuccin
- Tomorrow Night
- Xcode
- Light

Purple Night and Solarized Dark are not available in the Settings UI; existing
saved preferences for retired themes are safely normalized for compatibility.

Application size uses the existing root-size architecture:

- **Small** = the previous Medium scale
- **Medium** = the previous Large scale
- **Large** = a new larger scale

The setting scales the existing `rem`-based typography, controls, navigation,
spacing, cards, and component dimensions without introducing a second scaling
system.

---

## Study flows

### Direct chapter launches

From the Dashboard chapter progress section, a user can launch:

```text
Active certification → Chapter → Quiz
Active certification → Chapter → Flashcards
Active certification → Chapter → Labs
```

The destination opens with the certification and chapter context already
selected. The user is not sent through a redundant selection screen.

Chapter matching is data-driven and tolerant of small naming differences such
as `Ch 02` versus `Ch 2` across content types.

### Flashcards review workflow

Opening the generic Flashcards route always shows its menu. It does not open a
saved card automatically. The menu provides:

- **Resume saved session** — explicitly reopens the unfinished saved session.
- **All chapters** — immediately starts a session using the active certification's
  complete deck.
- **A chapter** — immediately starts a session containing that chapter's cards.

Flashcards use a deliberately simple response model:

- **Again** — the card needs review and enters the retry queue.
- **Next** — the card is completed for the current session.
- **Shuffle** — randomizes every unresolved card and immediately presents the
  first card in the new order without resetting progress, losing cards,
  duplicating cards, or discarding retry state.

Cards marked **Again** are not shown immediately. They return after the current
active queue is exhausted and continue returning until answered with **Next**.
A session cannot complete while unresolved retry cards remain. There is no
separate start-session step or in-session chapter switch; use the Flashcards
menu to choose another chapter.

The in-progress session is persisted locally so refreshes can resume it. Session
summaries include reviewed cards, cards that needed review, repeat attempts, and
focus areas. Each review records card, certification, chapter, tags, outcome,
attempt count, session ID, and timestamp for analytics and recommendations.

### Labs

Labs are organized as:

```text
Current certification
└── Chapter
    ├── Lab 1
    ├── Lab 2
    └── Lab 3
```

Chapter sections expand and collapse independently. Lab order comes from the
content data, completion status comes from persisted study data, and changing
the active certification replaces the hierarchy without mixing content.

### Notes

The Notes menu contains one item per certification chapter. If a source note
contains multiple sections or registered content blocks, those sections remain
inside the chapter note in source order. Search matches the combined content,
and stable note links continue to resolve where possible.

---

## Permissions calculator

The **Tools → Permissions** utility supports both checkbox-based permission
editing and direct octal entry. The mode field accepts standard three- or
four-digit modes, for example:

```text
0644  → regular file: owner read/write, everyone else read-only
0755  → executable file or directory: owner read/write/execute, others read/execute
4755  → setuid executable
2755  → setgid directory or executable
1777  → sticky shared directory such as /tmp
```

The generated `chmod` command, symbolic permissions, and special-bit markers
update as the mode changes. Invalid or incomplete input leaves the current
checkbox state unchanged rather than applying a partial mode.

---

## Keyboard shortcuts

### Quiz

| Key | Action |
|---|---|
| `1`–`4` | Select option A–D |
| `Enter` | Next question after answering |

### Flashcards

| Key | Action |
|---|---|
| `Space` | Flip the current card |
| `1` | Mark Again |
| `2` or `Enter` | Mark Next |
| `S` | Shuffle the remaining cards |

### Global

| Key | Action |
|---|---|
| `Tab` | Move focus through controls |
| `↑` / `↓` | Move through open search results |
| `Enter` | Open the selected search result |
| `Esc` | Close a menu/modal or clear search |

### Practice navigation

The player/detail views in Quiz, Exam Simulation, Flashcards, and Labs use a
styled **Back** control that returns to that area's own menu. It does not send
the user to the Dashboard. Leaving Quiz or Exam returns to setup, while the
Flashcards menu keeps an unfinished session available for explicit resume.

---

## Project layout

```text
Review/
├── index.html                 ← open this
├── app/
│   ├── favicon.svg
│   ├── css/styles.css         themed responsive UI and motion
│   └── js/
│       ├── core.js            namespace, router, global cert context, search, modal
│       ├── store.js           localStorage, progress, analytics, backup
│       ├── content.js         manifest loader, indexes, grouping, search
│       ├── markdown.js        safe Markdown renderer
│       ├── quiz.js            quiz and exam engines
│       ├── flashcards.js      Again/Next, retry queue, Shuffle, persistence
│       ├── views.js            all screens and activity views
│       └── tools.js            calculators and reference data
├── certifications/
│   ├── _manifest.js           ← register certifications and content here
│   └── linux-plus/
│       ├── questions/
│       ├── flashcards/
│       ├── labs/
│       └── notes/
└── docs/
    ├── CONTENT_FORMAT.md      full schema and templates
    ├── prompt-generator.txt   AI content-generation prompts
    └── screenshots/           README screenshots
```

The manifest architecture supports adding more certifications without changing
view code. A certification needs metadata in the manifest and content files
whose `cert` field matches that metadata ID.

---

## Adding study content

Content files are plain JavaScript that self-register. No build step is needed.

### 1. Create a content file

Example — questions:

```js
window.ReviewApp.content.register({
  type: "questions",          // questions | flashcards | labs | notes
  cert: "linux-plus",         // must match a cert id in the manifest
  chapter: "Ch 02 · Working with Files",
  items: [
    {
      q: "Which command prints the current working directory?",
      type: "mcq",              // mcq | multi | tf | fill | command_match
      options: ["pwd", "cd", "ls", "cwd"],
      answer: 0,
      explain: "pwd = print working directory.",
      tags: ["paths", "navigation"]
    }
  ]
});
```

See **[`docs/CONTENT_FORMAT.md`](./docs/CONTENT_FORMAT.md)** for full schemas
for questions, flashcards, labs, notes, and `command_match` items.

### 2. Register it in the manifest

Edit `certifications/_manifest.js` and add the path:

```js
window.ReviewApp.content.setManifest({
  certs: [
    { id: "linux-plus", name: "CompTIA Linux+", color: "#f8a63b" },
    { id: "network-plus", name: "CompTIA Network+", color: "#5ad1e6" }
  ],
  files: [
    "linux-plus/questions/ch02-working-with-files.js"
  ]
});
```

The new certification will then be available in the global Current certification
picker and will automatically work with the certification-scoped views and the
global search index.

### 3. Reload

Click the reload button in the top bar or use **Settings → Reload**. A toast
confirms how many questions, cards, labs, notes, and certifications were loaded.

### Generating content from notes

Use the templates in [`docs/prompt-generator.txt`](./docs/prompt-generator.txt)
to generate questions, flashcards, labs, or notes. Save each response as a
`.js` file under the matching certification folder, update the manifest, and
reload the application.

---

## Data, analytics, and privacy

Everything stays on the user's machine.

| Data | Storage |
|---|---|
| Current certification | `reviewapp.v1.currentCert` |
| Answers and accuracy | `reviewapp.v1.answers` |
| Flashcard session | `reviewapp.v1.flashSession` |
| Flashcard session history | `reviewapp.v1.flashSessions` |
| Card-level review events | `reviewapp.v1.cardReviews` |
| Weak areas and weekly recommendations | `reviewapp.v1.flashcardWeakAreas` and recommendation data |
| Leitner card boxes | `localStorage` under `reviewapp.v1.*` |
| Exam history | `localStorage` under `reviewapp.v1.*` |
| Lab completion | `localStorage` under `reviewapp.v1.*` |
| Personal notes | `localStorage` under `reviewapp.v1.*` |
| Settings | `localStorage` under `reviewapp.v1.*` |

Analytics can aggregate study results through:

```text
Certification → Chapter → Unit/Topic → Question/Card/Lab
```

Flashcard Again marks contribute to weak-point scoring, recent and repeated
difficulties receive more weight, and recommendations remain scoped to the
active certification while historical records for other certifications are
preserved.

**Settings → Export backup** downloads a JSON snapshot. **Settings → Import
backup** restores compatible data. **Settings → Wipe progress** clears study
data only after confirmation.

---

## Design and implementation notes

- Vanilla HTML + CSS + JavaScript only.
- No npm, framework, CDN, external fonts, or external images.
- Runs with classic `<script>` tags and supports `file://` usage.
- Content is loaded once from the manifest and indexed in memory for fast
  certification switching and global search.
- Responsive layouts support desktop, small windows, tablet, and mobile widths.
- Sidebar expansion uses the hat control and smooth width/text transitions.
- Labs and other expandable sections use the shared motion/easing system.
- Scrollbars and numeric steppers are styled with application theme tokens.
- Inline SVG icons and system font stacks keep the app offline and lightweight.
- `prefers-reduced-motion` and the in-app Animations setting are respected.
- Themes use CSS variables; certification branding uses the active
  certification's color without changing the global theme.
- Progress rings, cards, menus, and activity headers are designed to avoid
  clipping at larger application sizes.

---

## Troubleshooting

| Symptom | Fix |
|---|---|
| Blank content or zero counts | Click reload, or use **Settings → Deep-scan** on the `certifications` folder. |
| A new certification is not listed | Check its manifest `certs` entry, file paths, and matching `cert` IDs, then reload. |
| Search does not show new content | Reload after updating the manifest so the global index is rebuilt. |
| Clicks do nothing | Hard-refresh with `Ctrl+F5`; confirm no browser extension is covering the page. |
| Progress disappeared | Check the browser/profile and restore a JSON backup if storage was cleared. |
| A chapter activity opens with no items | Confirm that the content type is registered for that certification and chapter. |
| Script errors on Safari | Prefer Chrome/Firefox for local `file://`, or use Settings → Deep-scan. |

---

## License / intent

Built as a personal offline study tool for certification learning. Ship your
own content, keep your data local, and study without distraction.
