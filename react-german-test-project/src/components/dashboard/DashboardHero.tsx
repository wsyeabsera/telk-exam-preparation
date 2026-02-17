"use client";

import Link from "next/link";
import { useDashboardStats } from "@/hooks/useDashboardStats";
import { useSrsStats } from "@/hooks/useSrsStats";
import { useVocabStats } from "@/hooks/useVocabStats";
import { StatsOverview } from "./StatsOverview";
import { RecentActivity } from "./RecentActivity";

export function DashboardHero() {
  const stats = useDashboardStats();
  const srs = useSrsStats();
  const vocab = useVocabStats();

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
      {!srs.loading && srs.dueCount > 0 && (
        <div className="mb-6 rounded-xl border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/40 p-4 flex items-center justify-between gap-4">
          <div>
            <p className="font-semibold text-amber-900 dark:text-amber-100">
              {srs.dueCount} card{srs.dueCount !== 1 ? "s" : ""} due for review
            </p>
            <p className="text-sm text-amber-700 dark:text-amber-300">
              {srs.totalCards} total card{srs.totalCards !== 1 ? "s" : ""} tracked
            </p>
          </div>
          <Link href="/test/review">
            <button className="px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-medium text-sm transition-colors">
              Start Review
            </button>
          </Link>
        </div>
      )}
      {!vocab.loading && vocab.dueCount > 0 && (
        <div className="mb-6 rounded-xl border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/40 p-4 flex items-center justify-between gap-4">
          <div>
            <p className="font-semibold text-amber-900 dark:text-amber-100">
              {vocab.dueCount} vocab word{vocab.dueCount !== 1 ? "s" : ""} due for review
            </p>
            <p className="text-sm text-amber-700 dark:text-amber-300">
              {vocab.totalCards} total word{vocab.totalCards !== 1 ? "s" : ""} saved
            </p>
          </div>
          <Link href="/flashcards">
            <button className="px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-medium text-sm transition-colors">
              Review Words
            </button>
          </Link>
        </div>
      )}
      <RecentActivity
        recentActivity={stats.recentActivity}
        incompleteAttempt={stats.incompleteAttempt}
      />
    </>
  );
}
