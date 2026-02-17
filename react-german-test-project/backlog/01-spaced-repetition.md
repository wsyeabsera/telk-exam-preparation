# Spaced Repetition System

## Summary
Resurface questions the user got wrong at optimal intervals to improve long-term retention.

## Problem
Currently, once a test is completed, there's no systematic way to revisit missed questions. Learners forget what they got wrong and keep making the same mistakes.

## Proposed Solution
- Track every incorrectly answered question per user
- Implement a spaced repetition algorithm (e.g., SM-2 or Leitner system) to schedule review intervals
- Create a dedicated "Review" mode on the dashboard that pulls due questions from across all completed tests
- Show review stats: cards due today, upcoming, mastered

## Key Changes
- New Dexie table: `reviewCards` with fields like `questionId`, `testId`, `nextReviewDate`, `interval`, `easeFactor`, `repetitions`
- New DB operations for scheduling and fetching due cards
- New `/review` page with a card-based UI for reviewing due questions
- Dashboard widget showing "X questions due for review"
- Update `completeAttempt` to create/update review cards for wrong answers

## Acceptance Criteria
- [ ] Wrong answers automatically enter the review queue
- [ ] Review intervals increase with each correct recall
- [ ] Dedicated review page with question rendering
- [ ] Dashboard shows review count badge
- [ ] Correct reviews extend interval; wrong reviews reset it
