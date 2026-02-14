"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getProgress, getCompletedAttempts } from "@/lib/db/operations";
import { getTestTitle } from "@/lib/data/load-tests";
import type { ProgressRecord } from "@/lib/db/schema";
import type { TestAttempt } from "@/types/result";
import { formatDistanceToNow } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

export function StatsOverview() {
  const [progress, setProgress] = useState<ProgressRecord | null>(null);
  const [lastAttempt, setLastAttempt] = useState<TestAttempt | null>(null);

  useEffect(() => {
    getProgress().then((p) => setProgress(p ?? null));
    getCompletedAttempts().then((list) => setLastAttempt(list[0] ?? null));
  }, []);

  if (!progress || progress.testsCompleted === 0) {
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

  const avgScore =
    progress.attemptCount > 0
      ? Math.round(progress.totalScore / progress.attemptCount)
      : 0;

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-lg">Your progress</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-6">
          <div>
            <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              {progress.testsCompleted}
            </p>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Tests completed
            </p>
          </div>
          <div>
            <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              {avgScore}%
            </p>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Average score
            </p>
          </div>
        </div>
        {lastAttempt && (
          <p className="text-sm text-zinc-600 dark:text-zinc-300 border-t border-zinc-200 dark:border-zinc-700 pt-3">
            Last:{" "}
            <Link
              href={`/results/${lastAttempt.id}`}
              className="text-amber-600 dark:text-amber-400 hover:underline font-medium"
            >
              {getTestTitle(lastAttempt.testId)} – {lastAttempt.score ?? 0}%
            </Link>
            {" "}
            <span className="text-zinc-500 dark:text-zinc-400">
              ({formatDistanceToNow(lastAttempt.endTime ?? lastAttempt.startTime, { addSuffix: true })})
            </span>
          </p>
        )}
      </CardContent>
    </Card>
  );
}
