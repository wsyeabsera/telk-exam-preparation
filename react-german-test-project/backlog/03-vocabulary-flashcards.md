# Vocabulary Flashcards

## Summary
Extract vocabulary from test passages and questions to create a reviewable flashcard deck.

## Problem
Tests contain rich German vocabulary, but learners have no way to isolate and review individual words or phrases outside of the test context.

## Proposed Solution
- Auto-extract key vocabulary from reading passages and question texts
- Allow users to manually save words they want to review
- Flashcard UI with German on front, English translation + example sentence on back
- Organize by topic tags (from test tags) and difficulty
- Optional integration with AI to generate translations and example sentences

## Key Changes
- New Dexie table: `flashcards` with `word`, `translation`, `example`, `tags`, `mastered`, `reviewCount`
- New `/flashcards` page with card flip UI
- "Save word" button in test/results views for manual saving
- AI-powered bulk vocabulary extraction from passages (via Claude CLI)
- Filter/sort by tag, mastery status, date added

## Acceptance Criteria
- [ ] Users can manually save words during test review
- [ ] Flashcard page with flip animation (German <-> English)
- [ ] AI can extract vocabulary from a passage on demand
- [ ] Cards organized by topic tags
- [ ] Track mastery per card (known/learning/new)
