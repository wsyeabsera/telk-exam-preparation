"use client";

import { useEffect, useState } from "react";
import { getProgress } from "@/lib/db/operations";
import type { ProgressRecord } from "@/lib/db/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

export function StatsOverview() {
  const [progress, setProgress] = useState<ProgressRecord | null>(null);

  useEffect(() => {
    getProgress().then((p) => setProgress(p ?? null));
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
      <CardContent className="flex flex-wrap gap-6">
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
      </CardContent>
    </Card>
  );
}
