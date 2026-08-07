# ReviewApp

**Offline study & review hub for CompTIA Linux+ and Network+.**

No install. No account. No network. Double-click `index.html` and study.

---

## Quick start

1. Open the `Review` folder.
2. Double-click **`index.html`**.
3. Use Chrome, Edge, Firefox, or Safari.

That’s it. All progress lives in your browser’s `localStorage`.

> **Tip:** If content doesn’t load on a strict `file://` environment, open **Settings → Deep-scan folder…** and select the `certifications` directory.

---

## What you get

| Area | Features |
|------|----------|
| **Dashboard** | Certification progress, study recommendations, activity, and continue-study shortcuts |
| **Quiz** | 5 modes: chapter focus, random mix, theme (tags), weak spots, speed run |
| **Exam sim** | Timed CompTIA-style exam, question palette, flag-for-review, pass threshold |
| **Flashcards** | 3D flip + Leitner boxes 1–5 (spaced repetition) |
| **Labs** | Certification and chapter filters, scenario, objectives checklist, step hints/solutions with copy |
| **Notes** | Certification and chapter filters, focused bundled-note view, personal notes with live preview |
| **Stats** | Accuracy, question coverage, chapter progress, streak, activity chart, weak tags, exam history, CSV/JSON/MD export |
| **Tools** | Subnet calculator, number converter, common ports, Linux command reference |
| **Search** | Live search across questions, cards, labs, notes, ports, and commands; keyboard navigation with arrows, Enter, and Esc |

Dark theme by default. Light theme and small, medium, or large text options are available in Settings. Fully keyboard-accessible.

---

## Keyboard shortcuts

### Quiz
| Key | Action |
|-----|--------|
| `1`–`4` | Select option A–D |
| `Enter` | Next question (after answering) |

### Flashcards
| Key | Action |
|-----|--------|
| `Space` | Flip card |
| `1` / `2` / `3` | Again / Good / Easy |
| `←` `→` | Previous / next card |

### Global
| Key | Action |
|-----|--------|
| `Tab` | Move focus |
| `↑` / `↓` | Move through open search results |
| `Enter` | Open the selected search result |
| `Esc` | Close modal / clear search |

---

## Project layout

```
Review/
├── index.html                 ← open this
├── app/
│   ├── css/styles.css
│   └── js/
│       ├── core.js            namespace, router, toasts, modal
│       ├── store.js           localStorage + stats engine
│       ├── content.js         manifest loader + deep-scan
│       ├── markdown.js        safe markdown renderer
│       ├── quiz.js            quiz + exam engines
│       ├── flashcards.js      Leitner engine
│       ├── views.js           all screens
│       └── tools.js           subnet, converter, refs
├── certifications/
│   ├── _manifest.js           ← only file you edit to add content
│   ├── linux-plus/
│   │   ├── questions/
│   │   ├── flashcards/
│   │   ├── labs/
│   │   └── notes/
│   └── network-plus/
│       └── questions/
└── docs/
    └── CONTENT_FORMAT.md      full schema + templates
```

---

## Adding study content

Content files are plain JavaScript that self-register. No build step.

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
      type: "mcq",              // mcq | multi | tf | fill
      options: ["pwd", "cd", "ls", "cwd"],
      answer: 0,
      explain: "pwd = print working directory.",
      tags: ["paths", "navigation"]
    }
  ]
});
```

See **`docs/CONTENT_FORMAT.md`** for full schemas (flashcards, labs, notes) and copy-paste templates.

### 2. Register it in the manifest

Edit `certifications/_manifest.js` and append the path:

```js
files: [
  // …
  "linux-plus/questions/ch02-working-with-files.js"
]
```

### 3. Reload

Click the **reload** button in the top bar (or Settings → Reload).  
A toast confirms how many questions, cards, labs, and notes were loaded.

### Generating content from your notes

Feed unit notes to an AI with the prompts described in your workflow (questions / flashcards / labs / notes separately). Save each reply as a `.js` file under the matching folder, then update the manifest and reload.

**Check [Prompt Generator](./prompt-generator.txt) file for the templates.**

---

## Data & privacy

| What | Where |
|------|--------|
| Answers, accuracy, streak | `localStorage` (`reviewapp.v1.*`) |
| Leitner card boxes | `localStorage` |
| Exam history | `localStorage` |
| Personal notes | `localStorage` |
| Settings (theme, pass %) | `localStorage` |

Nothing leaves your machine.  
**Settings → Export backup** downloads a full JSON snapshot.  
**Settings → Wipe progress** clears study data (with confirmation).

---

## Design notes

- **Vanilla HTML + CSS + JS only** — no npm, no frameworks, no CDNs, no external fonts/images.
- Runs on the `file://` protocol (classic `<script>` tags, no ES modules).
- Inline SVG icons; system font stacks (mono for terminal flavor, sans for body).
- Honors `prefers-reduced-motion`.
- Ambient grid + soft glows; layered dark-blue surfaces; green / amber / cyan accents.

---


## Troubleshooting

| Symptom | Fix |
|---------|-----|
| Blank content / zero counts | Click reload, or use **Settings → Deep-scan** on the `certifications` folder |
| Clicks do nothing, Tab still works | Hard-refresh (Ctrl+F5). An old CSS bug left a hidden modal overlay; fixed in current build |
| Progress disappeared | Different browser or profile, or storage was cleared. Restore from a JSON backup if you have one |
| Script errors on Safari | Prefer Chrome/Firefox for local `file://`; or use Deep-scan |

---

## License / intent

Built as a personal, offline study tool for CompTIA Linux+ and Network+.  
Ship your own content, keep your data local, study without distraction.
