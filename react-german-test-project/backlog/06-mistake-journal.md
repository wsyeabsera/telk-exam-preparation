# Mistake Journal

## Summary
A dedicated page that collects every wrong answer across all tests into a searchable, filterable log — so users can study their exact errors instead of re-taking entire tests.

## Problem
After completing tests, users can only see mistakes by navigating to individual result pages. There's no unified view of "all the things I keep getting wrong." Patterns like repeatedly confusing Dativ/Akkusativ or misusing a conjunction stay invisible.

## Proposed Solution
- **`/mistakes` page** aggregating all incorrect answers from `attempts` (using `questionSnapshot` + `answers`)
- Group by tag, sort by frequency (questions missed multiple times float to top)
- Each entry shows: question text, user's wrong answer, correct answer, explanation, and how many times it was missed
- Filter by tag, date range, or test category
- "Re-test these" button that generates a mini-test from selected mistakes (reuse `drill-tag-*` pattern or new `drill-mistakes-*` convention)
- Dismiss/archive a mistake once the user feels confident

## Key Changes

| File | Action |
|------|--------|
| `src/app/mistakes/page.tsx` | Create — mistake journal page |
| `src/hooks/useMistakeData.ts` | Create — aggregate wrong answers from all attempts |
| `src/components/mistakes/MistakeCard.tsx` | Create — individual mistake entry with expand/collapse |
| `src/lib/data/load-tests.ts` | Modify — add `getMistakeQuestions()` to build a test from specific globalIds |
| `src/app/test/[id]/page.tsx` | Modify — handle `drill-mistakes-*` test IDs |
| `src/app/page.tsx` | Modify — add "Mistakes" nav link to dashboard |

## Acceptance Criteria
- [ ] `/mistakes` page shows all incorrect answers grouped by tag
- [ ] Questions missed multiple times show a repeat count
- [ ] Filter by tag and category works
- [ ] "Re-test these" generates a working mini-test
- [ ] Completing the re-test updates SRS cards
- [ ] Dismissing a mistake hides it from the list
