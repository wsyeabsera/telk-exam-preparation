# German B1 Test Generator – Roadmap

## Short term

- **Fill-in-the-blank** – Support `fill-blank` question type: type, component, scorer, one small test (e.g. mini-test-03-fill-blank).
- **Backfill explanationDetail / nominativeHint** – Add `explanationDetail` to all reading questions (mock-exam-01, mock-exam-02); spot-check mini-tests for any missing fields.
- **Minimal Writing** – New `writing-prompt` type, component (textarea), one writing test, “your answer vs model answer” on results; wire “Super short – Writing” to real content (no auto-score for writing).

## Next

- **More content** – Additional grammar mini-tests (e.g. Akkusativ, Präpositionen), more reading passages and mock exams.
- **Tags / difficulty** – Use existing tags and difficulty for filtering (e.g. quick practice by tag) or “weak areas” on dashboard.
- **Optional timer** – Timed vs untimed mode per test or in settings.

## Later

- **Listening** – Audio question type (audio URL + comprehension questions); “Super short – Listening” as coming soon or full implementation.
- **Smarter progress** – Retry wrong questions only, practice by tag, “weak areas” summary.
- **reading-comprehension type** – Formalize (map to MC/TF + passage) or remove from type union.
