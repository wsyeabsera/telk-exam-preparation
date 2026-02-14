"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getCompletedAttempts } from "@/lib/db/operations";
import { getTestTitle } from "@/lib/data/load-tests";
import { format } from "date-fns";
import type { TestAttempt } from "@/types/result";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

export default function HistoryPage() {
  const [attempts, setAttempts] = useState<TestAttempt[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCompletedAttempts().then((list) => {
      setAttempts(list);
      setLoading(false);
    });
  }, []);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-4 md:p-6">
      <div className="max-w-2xl mx-auto">
        <Link
          href="/"
          className="inline-block text-sm text-amber-600 dark:text-amber-400 hover:underline mb-4"
        >
          ← Dashboard
        </Link>
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            History
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Your past test results
          </p>
        </header>

        {loading ? (
          <p className="text-zinc-500">Loading…</p>
        ) : attempts.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center text-zinc-500">
              No completed tests yet. Finish a test to see it here.
            </CardContent>
          </Card>
        ) : (
          <ul className="space-y-3">
            {attempts.map((a) => (
              <li key={a.id}>
                <Card>
                  <CardHeader className="py-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <CardTitle className="text-base font-medium">
                        {getTestTitle(a.testId)}
                      </CardTitle>
                      <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                        {a.score ?? 0}%
                      </span>
                    </div>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                      {format(a.endTime ?? a.startTime, "d MMM yyyy, HH:mm")}
                    </p>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <Link href={`/results/${a.id}`}>
                      <Button variant="outline" size="sm">
                        View mistakes
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
