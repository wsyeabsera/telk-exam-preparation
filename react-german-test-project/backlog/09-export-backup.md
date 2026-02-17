# Data Export & Backup

## Summary
Allow users to export their progress data as a JSON file and re-import it, preventing data loss from browser clears and enabling multi-device usage.

## Problem
All data lives in IndexedDB. Clearing browser data, switching browsers, or using a different device means starting from scratch. Users who have built up SRS decks, vocabulary, and test history have no way to protect or transfer that investment.

## Proposed Solution
- **Export button** on the progress or settings page that downloads a single JSON file containing all Dexie tables (attempts, srsCards, vocabCards, generatedTests, progress)
- **Import button** that reads the JSON file and merges into the existing DB (dedup by ID, newer wins)
- Include metadata: export date, app version, record counts
- Optional: auto-backup to localStorage on each test completion as a lightweight safety net

## Key Changes

| File | Action |
|------|--------|
| `src/lib/db/backup.ts` | Create — `exportAllData()` and `importData()` functions |
| `src/app/settings/page.tsx` | Create — settings page with export/import buttons |
| `src/components/settings/BackupControls.tsx` | Create — UI for export/import with status feedback |
| `src/app/page.tsx` | Modify — add settings link to dashboard nav |
| `src/lib/db/operations.ts` | Modify — optional auto-backup hook after `completeAttempt` |

## Export Format
```json
{
  "version": 1,
  "exportedAt": "2026-02-17T...",
  "data": {
    "attempts": [...],
    "srsCards": [...],
    "vocabCards": [...],
    "generatedTests": [...],
    "progress": [...]
  }
}
```

## Acceptance Criteria
- [ ] Export button downloads a JSON file with all user data
- [ ] Import button reads the file and merges records
- [ ] Duplicate records are handled (no duplicates after import)
- [ ] Import shows a summary: "Imported X attempts, Y vocab cards, Z SRS cards"
- [ ] Corrupted/invalid files show a clear error message
- [ ] Export file size is reasonable (< 5 MB for typical usage)
