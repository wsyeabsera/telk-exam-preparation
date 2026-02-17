# Test Comparison & Progress Charts

## Summary
Visual charts comparing scores over time, broken down by test category, to help learners see their progress.

## Problem
The history page shows a flat list of attempts. There's no visual way to see trends, compare categories, or understand overall improvement trajectory.

## Proposed Solution
- **Score Over Time Chart:** Line chart showing scores across all attempts chronologically
- **Category Comparison:** Bar chart comparing average scores per category (grammar, reading, listening, writing)
- **Recent vs. Earlier:** Compare average score of last 5 attempts vs. first 5 to show improvement
- **Personal Bests:** Highlight highest scores per test
- Keep it lightweight — use SVG-based charts or a minimal library

## Key Changes
- New `/progress` page (or expand existing dashboard stats)
- Chart components using lightweight SVG rendering (no heavy chart library needed)
- Data aggregation utilities: scores by date, by category, rolling averages
- Responsive chart layout for mobile and desktop
- Optional: export/share progress as image

## Acceptance Criteria
- [ ] Line chart showing score progression over time
- [ ] Bar chart comparing average scores across categories
- [ ] Improvement indicator (e.g., "+12% since you started")
- [ ] Charts render correctly on mobile and desktop
- [ ] Works with existing IndexedDB data (no migration needed)
- [ ] Lightweight implementation (no large chart dependencies)
