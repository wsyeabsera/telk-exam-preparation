# Adaptive Difficulty Quick Practice

## Summary
A "Smart Practice" mode that picks questions based on SRS data — prioritizing weak topics and avoiding already-mastered material.

## Problem
Quick practice draws questions randomly. A user who has mastered Dativ but struggles with Konjunktiv II gets an even mix of both, wasting time on topics they already know. The SRS review page only resurfaces questions previously answered wrong — it doesn't proactively test weak areas with fresh questions.

## Proposed Solution
- New quick practice variant: `"super-short-smart"` that uses SRS card data to weight question selection
- Algorithm: score each question's tags against the user's `topicAccuracies` — questions from weak topics get higher selection probability
- Exclude questions the user has answered correctly 3+ times in a row (mastered in SRS)
- Include a small percentage (~20%) of random questions to prevent tunnel vision
- Show the user which topics were targeted after completing the test

## Key Changes

| File | Action |
|------|--------|
| `src/lib/data/load-tests.ts` | Modify — add `getSmartPracticeQuestions()` that accepts topic weights |
| `src/lib/srs/operations.ts` | Modify — add `getMasteredQuestionIds()` to identify questions to skip |
| `src/hooks/useProgressData.ts` | Export topic accuracy data in a format consumable by smart selection |
| `src/app/test/[id]/page.tsx` | Modify — handle `super-short-smart` test ID |
| `src/components/dashboard/DashboardHero.tsx` | Modify — add "Smart Practice" button alongside existing quick practice |

## Acceptance Criteria
- [ ] "Smart Practice" button on dashboard
- [ ] Questions skew toward weak topics based on actual performance data
- [ ] Already-mastered questions are deprioritized
- [ ] At least 20% of questions are random (not all from weakest topic)
- [ ] Results page shows which topics were targeted
- [ ] Falls back to regular random if no SRS data exists yet
