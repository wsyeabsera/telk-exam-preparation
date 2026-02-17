# Study Goals & Streak System

## Summary
A configurable daily study goal (e.g., "3 tests per day" or "15 minutes") with streak tracking, visual progress ring, and gentle reminders to keep learners consistent.

## Problem
The dashboard shows a basic streak counter from `useDashboardStats`, but there's no configurable goal, no visual feedback during the day, and the streak is easy to lose without realizing it. Consistency is the biggest factor in language learning success, and the app doesn't actively encourage it.

## Proposed Solution
- **Daily goal setting**: users pick a target (tests per day, questions per day, or minutes per day)
- **Progress ring** on the dashboard showing today's progress toward the goal (e.g., 2/3 tests done)
- **Streak calendar** on the progress page — a month view showing which days the goal was met
- **Streak freeze**: allow 1 missed day per week without breaking the streak (earned by hitting goal 5 days in a row)
- Store goals and streak data in a new Dexie table

## Key Changes

| File | Action |
|------|--------|
| `src/lib/db/schema.ts` | Modify — add `studyGoals` table (goalType, target, streakFreezes) |
| `src/lib/db/operations.ts` | Modify — add goal CRUD and streak calculation |
| `src/components/dashboard/GoalRing.tsx` | Create — circular progress indicator |
| `src/components/charts/StreakCalendar.tsx` | Create — month view of streak data |
| `src/components/dashboard/DashboardHero.tsx` | Modify — embed GoalRing |
| `src/app/progress/page.tsx` | Modify — add StreakCalendar section |
| `src/hooks/useDashboardStats.ts` | Modify — compute today's progress toward goal |

## Acceptance Criteria
- [ ] User can set a daily goal (tests, questions, or minutes)
- [ ] Dashboard shows a progress ring for today
- [ ] Completing the daily goal triggers a visual celebration
- [ ] Progress page shows a streak calendar
- [ ] Streak freeze mechanism works (1 free miss per 5 consecutive days)
- [ ] Goal persists across sessions (stored in IndexedDB)
- [ ] Sensible defaults for new users (3 tests/day)
