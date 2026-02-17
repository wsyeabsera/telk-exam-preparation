# Full Exam Simulation Mode

## Summary
A timed, multi-section exam simulation that mirrors the real telc Deutsch B1 format — reading, listening, grammar, and writing sections in sequence with strict time limits.

## Problem
Individual tests cover specific skills, but the real B1 exam is a 2.5-hour multi-section marathon. Users can ace 10-question mini-tests but struggle with stamina, time management, and section transitions under exam conditions. There's no way to simulate the real exam experience end-to-end.

## Proposed Solution
- **Exam simulation** that assembles sections from existing test data:
  - Section 1: Reading (3 passages, ~30 min) — from mock-exams
  - Section 2: Grammar (20 questions, ~15 min) — from mini-tests
  - Section 3: Listening (15 questions, ~20 min) — from listening-tests
  - Section 4: Writing (1-2 prompts, ~30 min) — from writing-practice
- **Section timer** with warnings at 5 min and 1 min remaining
- **No going back** between sections (like the real exam)
- **Section-by-section results** at the end with pass/fail threshold (60%)
- **Exam history** showing overall scores and per-section breakdown

## Key Changes

| File | Action |
|------|--------|
| `src/app/exam/page.tsx` | Create — exam simulation page with section management |
| `src/lib/exam/builder.ts` | Create — assemble exam sections from existing test pools |
| `src/lib/exam/scoring.ts` | Create — per-section scoring with pass/fail logic |
| `src/components/exam/SectionHeader.tsx` | Create — section title, timer, and progress |
| `src/components/exam/ExamResults.tsx` | Create — multi-section results breakdown |
| `src/app/page.tsx` | Modify — add "Simulate Exam" card to dashboard |

## Acceptance Criteria
- [ ] Full exam simulation with 4 sections
- [ ] Each section has its own time limit
- [ ] Cannot navigate back to previous sections
- [ ] Timer warnings at 5 min and 1 min
- [ ] Auto-submit section when time expires
- [ ] Results show per-section scores and overall pass/fail
- [ ] Exam attempts saved to history
- [ ] Questions drawn from existing test data (no new content needed)
