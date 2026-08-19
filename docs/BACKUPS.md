# Backups & Data

ReviewApp can export and import your progress and study material as a single
ZIP file from **Settings → Backup & Data**. User data is stored in the local
IndexedDB database; certification material remains file-based and is included
in a backup only when you choose **Study Material** or **Everything**.

## Exporting a backup

Open **Settings → Backup & Data** and choose **Export Backup**. The export
opens with **Everything** selected by default, so a complete backup is one
click away.

Choose what to include:

- **Statistics & Study Data** — progress, answers, flashcard history, exams,
  lab completion, notes, and study activity.
- **Study Material** — questions, flashcards, labs, notes, and certification
  metadata.
- **Everything** — your study data plus the certification material you select.

When **Study Material** or **Everything** is selected, choose the
certifications to include. **All certifications** is selected by default; uncheck
it to pick individual certifications.

Click **Export ZIP**. The app collects the content, compresses it, and
downloads one dated file.

## Importing a backup

Open **Settings → Backup & Data** and choose **Import Backup**, then select the
`.zip` file directly — no manual extraction is needed.

ReviewApp will:

1. Validate the archive and its manifest (current ZIP format is version 2; existing version-1 ReviewApp ZIPs remain importable).
2. Show what is inside (user data and/or certifications) before changing anything.
3. Flag any certifications that already exist so you can keep or replace them.
4. Restore only what the backup contains — unrelated certifications and data are left untouched.

Confirm the import, and the restored certifications and study data become
available immediately. Imported user records are written back to IndexedDB;
settings, the active certification, and resumable Flashcard/Quiz/Exam sessions
are included in new version-2 backups.

## Backup filename

Backups are named with the local date and time:

```text
ReviewApp_FullBackup_2026-08-15_0057.zip   ← Everything
ReviewApp_Stats_2026-08-15_0057.zip        ← Statistics & Study Data
ReviewApp_StudyMaterial_2026-08-15_0057.zip ← Study Material
```

## Persistence and recovery

On first launch after the IndexedDB migration, ReviewApp reads legacy
`reviewapp.v1.*` localStorage keys, validates them, and writes them into the
versioned database without deleting the legacy keys. A failed or interrupted
migration can therefore be retried safely. Normal application writes use
IndexedDB; the legacy localStorage values are no longer used after migration.

Use **Wipe progress** to clear answers, streaks, exams, lab completion, Leitner
state, flashcard history, active study sessions, and time-on-task. It does not
delete certification files, the optional content cache, personal notes, or
appearance settings.

## Important note

Backups stay on your machine. Nothing is uploaded to a server, and imported
ZIPs are treated as untrusted input with path and integrity checks before use.
