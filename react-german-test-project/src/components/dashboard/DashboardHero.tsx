"use client";

import { useDashboardStats } from "@/hooks/useDashboardStats";
import { StatsOverview } from "./StatsOverview";
import { RecentActivity } from "./RecentActivity";

export function DashboardHero() {
  const stats = useDashboardStats();

  if (stats.loading) {
    return (
      <div className="mb-6 h-32 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 animate-pulse" />
    );
  }

  return (
    <>
      <StatsOverview
        testsCompleted={stats.testsCompleted}
        avgScore={stats.avgScore}
        bestScore={stats.bestScore}
        totalPracticeTimeMs={stats.totalPracticeTimeMs}
        streak={stats.streak}
        categoryStats={stats.categoryStats}
      />
      <RecentActivity
        recentActivity={stats.recentActivity}
        incompleteAttempt={stats.incompleteAttempt}
      />
    </>
  );
}
