"use client";

import { formatTotalTime } from "@/lib/test-engine/timer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import type { CategoryStat } from "@/hooks/useDashboardStats";

interface StatsOverviewProps {
  testsCompleted: number;
  avgScore: number;
  bestScore: number;
  totalPracticeTimeMs: number;
  streak: number;
  categoryStats: CategoryStat[];
}

const CATEGORY_COLORS: Record<string, string> = {
  grammar: "bg-blue-500",
  reading: "bg-emerald-500",
  listening: "bg-purple-500",
  writing: "bg-amber-500",
};

export function StatsOverview({
  testsCompleted,
  avgScore,
  bestScore,
  totalPracticeTimeMs,
  streak,
  categoryStats,
}: StatsOverviewProps) {
  if (testsCompleted === 0) {
    return (
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg">Your progress</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm">
            Complete a test to see your stats here.
          </p>
        </CardContent>
      </Card>
    );
  }

  const statCards = [
    { label: "Tests Completed", value: String(testsCompleted) },
    { label: "Avg Score", value: `${avgScore}%` },
    { label: "Best Score", value: `${bestScore}%` },
    { label: "Total Time", value: formatTotalTime(totalPracticeTimeMs) },
  ];

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-lg">Your progress</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                {s.value}
              </p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                {s.label}
              </p>
            </div>
          ))}
        </div>

        {/* Streak */}
        {streak > 0 && (
          <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-300 border-t border-zinc-200 dark:border-zinc-700 pt-3">
            <span className="text-lg">&#x1F525;</span>
            <span>
              <strong>{streak}</strong> day{streak !== 1 ? "s" : ""} streak
            </span>
          </div>
        )}

        {/* Category progress bars */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 border-t border-zinc-200 dark:border-zinc-700 pt-4">
          {categoryStats.map((cat) => (
            <div key={cat.category}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-zinc-600 dark:text-zinc-300">
                  {cat.label}
                </span>
                <span className="text-xs text-zinc-500 dark:text-zinc-400">
                  {cat.count > 0 ? `${cat.avgScore}%` : "—"}
                </span>
              </div>
              <div className="h-2 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${CATEGORY_COLORS[cat.category] ?? "bg-zinc-400"}`}
                  style={{ width: `${cat.count > 0 ? cat.avgScore : 0}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
