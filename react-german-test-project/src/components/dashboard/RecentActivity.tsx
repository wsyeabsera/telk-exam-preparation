"use client";

import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { getTestTitle } from "@/lib/data/load-tests";
import type { TestAttempt } from "@/types/result";
import type { RecentAttempt } from "@/hooks/useDashboardStats";

interface RecentActivityProps {
  recentActivity: RecentAttempt[];
  incompleteAttempt: TestAttempt | null;
}

export function RecentActivity({
  recentActivity,
  incompleteAttempt,
}: RecentActivityProps) {
  if (recentActivity.length === 0 && !incompleteAttempt) return null;

  return (
    <div className="mb-6 space-y-3">
      {/* Continue card */}
      {incompleteAttempt && (
        <Link
          href={`/test/${incompleteAttempt.testId}`}
          className="block rounded-xl border-2 border-amber-400 dark:border-amber-500 bg-amber-50 dark:bg-amber-950/30 p-4 hover:bg-amber-100 dark:hover:bg-amber-950/50 transition-colors"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-amber-600 dark:text-amber-400 uppercase tracking-wide mb-1">
                Continue where you left off
              </p>
              <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                {getTestTitle(incompleteAttempt.testId)}
              </p>
            </div>
            <span className="text-amber-600 dark:text-amber-400 text-xl">&#x2192;</span>
          </div>
        </Link>
      )}

      {/* Recent completed tests */}
      {recentActivity.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-2">
            Recent activity
          </h3>
          <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-1">
            {recentActivity.map((a) => (
              <Link
                key={a.id}
                href={`/results/${a.id}`}
                className="flex-shrink-0 w-48 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-3 hover:border-amber-400 dark:hover:border-amber-500 transition-colors"
              >
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100 truncate">
                  {a.title}
                </p>
                <div className="flex items-center justify-between mt-1.5">
                  <span className="text-sm font-bold text-amber-600 dark:text-amber-400">
                    {a.score}%
                  </span>
                  <span className="text-xs text-zinc-400 dark:text-zinc-500">
                    {formatDistanceToNow(a.completedAt, { addSuffix: true })}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
