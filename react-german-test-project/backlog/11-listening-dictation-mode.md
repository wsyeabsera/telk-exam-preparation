# Listening & Dictation Mode

## Summary
A dedicated listening practice mode that plays German text via TTS and asks the user to type what they hear, training both listening comprehension and spelling.

## Problem
The existing listening tests use pre-written passages with `hidePassageText: true`, but the TTS integration (`useTTS` hook) is basic. There's no dictation practice — a core B1 exam skill where students must understand spoken German and write it down. The 5 listening tests are limited in variety.

## Proposed Solution
- **Dictation mode**: pick sentences from existing test questions/passages, play via TTS, user types what they hear
- **Scoring**: fuzzy match using Levenshtein distance — allow minor typos but flag real errors
- **Speed control**: 1x, 0.75x, 0.5x playback speed options
- **Replay limit**: configurable max replays per sentence (e.g., 3) to simulate exam conditions
- **Progressive difficulty**: start with short sentences, increase length as accuracy improves
- Generate dictation sets from existing passage markdown files and question texts

## Key Changes

| File | Action |
|------|--------|
| `src/app/test/dictation/page.tsx` | Create — dictation practice page |
| `src/lib/dictation/sentence-pool.ts` | Create — extract sentences from passages and questions |
| `src/lib/dictation/scoring.ts` | Create — fuzzy text comparison with Levenshtein distance |
| `src/components/dictation/DictationPlayer.tsx` | Create — TTS playback with speed control and replay counter |
| `src/components/dictation/DictationInput.tsx` | Create — text input with diff highlighting on reveal |
| `src/hooks/useTTS.ts` | Modify — add speed parameter and replay tracking |
| `src/components/dashboard/DashboardHero.tsx` | Modify — add "Dictation" quick-start button |

## Acceptance Criteria
- [ ] Dictation page plays a German sentence via TTS
- [ ] User types their answer and submits
- [ ] Scoring shows word-level diff (correct in green, wrong in red, missing in gray)
- [ ] Speed control works (1x, 0.75x, 0.5x)
- [ ] Replay limit is enforced
- [ ] Results are saved and count toward study activity
- [ ] Sentences are drawn from existing test content (no new content needed)
