"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { getCompletedAttempts } from "@/lib/db/operations";
import { getTestTitle, getTestCategory } from "@/lib/data/load-tests";
import { formatTimeTaken, formatTotalTime } from "@/lib/test-engine/timer";
import { format, isToday, isYesterday, isThisWeek } from "date-fns";
import type { TestAttempt } from "@/types/result";
import type { TestCategory } from "@/types/test";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { ScoreBadge } from "@/components/ui/ScoreBadge";

const CATEGORY_LABELS: Record<string, string> = {
  grammar: "Grammar",
  "mock-exam": "Reading",
  "writing-practice": "Writing",
  "listening-test": "Listening",
  "quick-test": "Quick Test",
  "practice-exam": "Practice Exam",
  practice: "Quick Practice",
  "quick-practice": "Quick Practice",
  "mini-test": "Mini Test",
  "ai-generated": "AI-Generated",
};

type SortBy = "date" | "score";
type DateGroup = "today" | "yesterday" | "thisWeek" | "earlier";

function getDateGroup(ts: number): DateGroup {
  const d = new Date(ts);
  if (isToday(d)) return "today";
  if (isYesterday(d)) return "yesterday";
  if (isThisWeek(d, { weekStartsOn: 1 })) return "thisWeek";
  return "earlier";
}

const GROUP_LABELS: Record<DateGroup, string> = {
  today: "Today",
  yesterday: "Yesterday",
  thisWeek: "This week",
  earlier: "Earlier",
};

export default function HistoryPage() {
  const [attempts, setAttempts] = useState<TestAttempt[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<SortBy>("date");
  const [categoryFilter, setCategoryFilter] = useState<TestCategory | "all">("all");

  useEffect(() => {
    getCompletedAttempts().then((list) => {
      setAttempts(list);
      setLoading(false);
    });
  }, []);

  const stats = useMemo(() => {
    const completed = attempts.filter((a) => a.completed && a.score != null);
    const count = completed.length;
    if (count === 0) {
      return { count: 0, avgScore: 0, bestScore: 0, totalTimeMs: 0 };
    }
    const totalScore = completed.reduce((s, a) => s + (a.score ?? 0), 0);
    const best = Math.max(...completed.map((a) => a.score ?? 0));
    const totalTimeMs = completed.reduce((sum, a) => {
      const end = a.endTime ?? a.startTime;
      return sum + (end - a.startTime);
    }, 0);
    return {
      count,
      avgScore: Math.round(totalScore / count),
      bestScore: best,
      totalTimeMs,
    };
  }, [attempts]);

  const categoriesInUse = useMemo(() => {
    const set = new Set<TestCategory>();
    attempts.forEach((a) => set.add(getTestCategory(a.testId)));
    return Array.from(set).sort();
  }, [attempts]);

  const filteredAndSorted = useMemo(() => {
    let list = attempts;
    if (categoryFilter !== "all") {
      list = list.filter((a) => getTestCategory(a.testId) === categoryFilter);
    }
    list = [...list];
    if (sortBy === "score") {
      list.sort((a, b) => (b.score ?? 0) - (a.score ?? 0));
    } else {
      list.sort((a, b) => (b.endTime ?? b.startTime) - (a.endTime ?? a.startTime));
    }
    return list;
  }, [attempts, categoryFilter, sortBy]);

  const grouped = useMemo(() => {
    const groups: { group: DateGroup; attempts: TestAttempt[] }[] = [];
    const byGroup: Record<DateGroup, TestAttempt[]> = {
      today: [],
      yesterday: [],
      thisWeek: [],
      earlier: [],
    };
    filteredAndSorted.forEach((a) => {
      const t = a.endTime ?? a.startTime;
      byGroup[getDateGroup(t)].push(a);
    });
    (["today", "yesterday", "thisWeek", "earlier"] as const).forEach((key) => {
      if (byGroup[key].length > 0) {
        groups.push({ group: key, attempts: byGroup[key] });
      }
    });
    return groups;
  }, [filteredAndSorted]);

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
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-20 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800/50 animate-pulse"
                />
              ))}
            </div>
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="h-24 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800/50 animate-pulse"
                />
              ))}
            </div>
          </div>
        ) : attempts.length === 0 ? (
          <Card>
            <CardContent className="py-10 text-center">
              <p className="text-zinc-500 dark:text-zinc-400 mb-4">
                No completed tests yet. Finish a test to see it here.
              </p>
              <Link href="/">
                <Button>Go to Dashboard</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              <Card>
                <CardContent className="py-4">
                  <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
                    Tests completed
                  </p>
                  <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mt-1">
                    {stats.count}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="py-4">
                  <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
                    Average score
                  </p>
                  <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mt-1">
                    {stats.avgScore}%
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="py-4">
                  <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
                    Best score
                  </p>
                  <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mt-1">
                    {stats.bestScore}%
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="py-4">
                  <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
                    Total study time
                  </p>
                  <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mt-1">
                    {formatTotalTime(stats.totalTimeMs)}
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="flex flex-wrap items-center gap-3 mb-4">
              <label className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                <span>Sort by</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortBy)}
                  className="rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="date">Newest first</option>
                  <option value="score">Highest score</option>
                </select>
              </label>
              <label className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                <span>Category</span>
                <select
                  value={categoryFilter}
                  onChange={(e) =>
                    setCategoryFilter(e.target.value as TestCategory | "all")
                  }
                  className="rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="all">All</option>
                  {categoriesInUse.map((cat) => (
                    <option key={cat} value={cat}>
                      {CATEGORY_LABELS[cat] ?? cat}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <ul className="space-y-6">
              {grouped.map(({ group, attempts: groupAttempts }) => (
                <li key={group}>
                  <h2 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wide mb-3 sticky top-0 bg-zinc-50 dark:bg-zinc-950 py-1 -mx-1 px-1">
                    {GROUP_LABELS[group]}
                  </h2>
                  <ul className="space-y-3">
                    {groupAttempts.map((a) => {
                      const timeTakenMs = (a.endTime ?? a.startTime) - a.startTime;
                      const questionCount = Object.keys(a.answers).length;
                      const category = getTestCategory(a.testId);
                      const hasInsights = Boolean(a.overallAiInsights);
                      return (
                        <li key={a.id}>
                          <Card>
                            <CardHeader className="py-4">
                              <div className="flex flex-wrap items-start justify-between gap-2">
                                <div className="min-w-0 flex-1">
                                  <CardTitle className="text-base font-medium text-zinc-900 dark:text-zinc-100">
                                    {getTestTitle(a.testId)}
                                  </CardTitle>
                                  <div className="flex flex-wrap items-center gap-2 mt-1.5">
                                    <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400 border border-zinc-300 dark:border-zinc-600 rounded px-2 py-0.5">
                                      {CATEGORY_LABELS[category] ?? category}
                                    </span>
                                    {hasInsights && (
                                      <span
                                        className="text-xs text-amber-600 dark:text-amber-400"
                                        title="AI insights available"
                                      >
                                        Insights
                                      </span>
                                    )}
                                  </div>
                                </div>
                                <ScoreBadge score={a.score ?? 0} />
                              </div>
                              <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2">
                                {format(a.endTime ?? a.startTime, "d MMM yyyy, HH:mm")}
                                {" · "}
                                {formatTimeTaken(timeTakenMs)}
                                {questionCount > 0 && ` · ${questionCount} Q`}
                              </p>
                            </CardHeader>
                            <CardContent className="pt-0">
                              <Link href={`/results/${a.id}`}>
                                <Button variant="outline" size="sm">
                                  View Results
                                </Button>
                              </Link>
                            </CardContent>
                          </Card>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              ))}
            </ul>

            {filteredAndSorted.length === 0 && (
              <p className="text-sm text-zinc-500 dark:text-zinc-400 text-center py-6">
                No attempts match the selected filter.
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
