# Weak Topic Drill-Down

## Summary
A dedicated view that analyzes performance by grammar topic and offers targeted mini-drills for the weakest areas.

## Problem
The current dashboard shows overall stats, but doesn't break down performance by topic. Users don't know which specific grammar areas (Dativ, Akkusativ, Konjunktionen, etc.) need the most work.

## Proposed Solution
- Aggregate scores by question tags across all completed attempts
- Display a topic-by-topic breakdown with accuracy percentages
- Color-code topics: red (< 60%), yellow (60-80%), green (> 80%)
- One-click "Drill This Topic" button that creates a mini-test from questions with that tag
- Show improvement trends per topic over time

## Key Changes
- New utility function to aggregate scores by tag from all attempts
- New `/topics` page with topic breakdown grid/list
- Topic accuracy calculation using `questionSnapshot` + answers from attempts
- Dynamic test generation: filter questions by tag from existing test data
- Optional: trend chart per topic using simple SVG or CSS bars

## Acceptance Criteria
- [ ] Topic breakdown page shows all encountered tags with accuracy %
- [ ] Topics sorted by weakest first
- [ ] Color-coded indicators (red/yellow/green)
- [ ] "Drill This Topic" generates a focused mini-test
- [ ] Accuracy updates after each new attempt
- [ ] At least basic trend indicator (improving/declining/stable)
