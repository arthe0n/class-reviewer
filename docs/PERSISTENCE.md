# Persistence Architecture

ReviewApp is offline-first and stores user-specific state locally in the
browser. The application does not use an account, backend, cloud sync, CDN, or
network API for study data.

## What is stored in IndexedDB

The versioned `ReviewAppUserData` database (currently schema version 2) stores:

- active certification and application settings;
- quiz answers, exam attempts, streak, and time-on-task;
- lab completion and per-step progress;
- flashcard Leitner state, review history, summaries, and active sessions;
- active Quiz and Exam sessions so they can be resumed after a reload;
- personal notes; and
- the optional deep-scan content cache.

The application-facing store in `app/js/store.js` keeps a runtime cache so the
existing vanilla JavaScript views can render synchronously after startup. Every
mutation is queued as a targeted IndexedDB write, and startup waits for the
database and migration to finish before rendering the application.

## What remains file-based

Certification material is not migrated into the database as the source of
truth. Questions, flashcards, labs, notes, certification metadata, and the
manifest remain under `certifications/` and are loaded through
`certifications/_manifest.js`.

The deep-scan snapshot is only a local cache for content selected by the user;
Reload from `certifications/` can discard that cache and read the files again.

## Legacy localStorage migration

Older ReviewApp versions used `reviewapp.v1.*` localStorage keys. On the first
launch with the IndexedDB store:

1. the database is opened or upgraded;
2. known legacy values are read and validated independently;
3. arrays, maps, settings, and sessions are transformed into the appropriate
   object stores;
4. the migration completion marker is written in the same IndexedDB transaction
   as the migrated data; and
5. the application starts only after the database-backed runtime cache is ready.

The migration is non-destructive: legacy keys are not deleted automatically.
Malformed values are skipped only for the affected key, valid values from other
keys are preserved, and a recoverable warning is shown when appropriate. A
transaction failure leaves the completion marker unset so a later launch can
retry without appending duplicate records.

## Backup and restore

New version-2 ZIP backups include the IndexedDB-backed user state, including
settings, active certification, resumable sessions, progress, history, and
notes. Study material is included only when requested. Existing version-1
ReviewApp ZIP backups remain supported for import.

The JSON full-backup option accepts both the previous version-1 shape and the
new version-2 shape. Restore operations validate the input, update the runtime
store, flush the IndexedDB write queue, and then refresh the relevant views.

## Reset and storage recovery

**Wipe progress** clears study progress and active sessions while retaining
personal notes, settings, certification files, and the optional content cache.

If IndexedDB is unavailable, blocked by another tab, full, or rejected by the
browser, ReviewApp shows a storage warning and avoids deleting legacy data. The
application can remain usable in memory until storage is repaired; export a
backup and reload after resolving the browser storage problem.
