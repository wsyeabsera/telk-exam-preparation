# Streak & Gamification System

## Summary
Add daily streaks, badges, and an XP system to keep learners motivated and engaged.

## Problem
Language learning requires consistency. Without motivation mechanics, users may lose interest or forget to practice regularly.

## Proposed Solution
- **Daily Streak:** Track consecutive days of practice. Show a flame icon with streak count on the dashboard.
- **XP System:** Award points for completing tests, reviewing questions, and hitting milestones (e.g., perfect scores).
- **Badges/Achievements:** Unlock badges for milestones like "First Test Completed", "7-Day Streak", "Grammar Master (90%+ on 10 grammar tests)", etc.
- **Level System:** Accumulate XP to level up (Anfanger -> Fortgeschritten -> Profi -> Meister).

## Key Changes
- New Dexie table: `gamification` with fields for `streakCount`, `lastActiveDate`, `totalXP`, `level`, `unlockedBadges`
- Badge definitions file with criteria and icons
- Dashboard streak widget and XP bar
- Toast notifications on badge unlock
- Update `completeAttempt` to award XP and check streak

## Acceptance Criteria
- [ ] Streak counter increments daily on any test completion
- [ ] Streak resets after missing a day
- [ ] XP awarded per test based on score and difficulty
- [ ] At least 10 badges defined with unlock criteria
- [ ] Level progression visible on dashboard
- [ ] Badge unlock notification shown to user
