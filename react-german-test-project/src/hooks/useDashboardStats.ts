"use client";

import { useEffect, useState } from "react";
import { getAllAttempts, getIncompleteAttempts } from "@/lib/db/operations";
import { getMetadata, getTestTitle } from "@/lib/data/load-tests";
import type { TestAttempt } from "@/types/result";

export interface CategoryStat {
  category: string;
  label: string;
  avgScore: number;
  count: number;
}

export interface RecentAttempt {
  id: string;
  testId: string;
  title: string;
  score: number;
  completedAt: number;
}

export interface DashboardStats {
  loading: boolean;
  testsCompleted: number;
  avgScore: number;
  bestScore: number;
  totalPracticeTimeMs: number;
  streak: number;
  categoryStats: CategoryStat[];
  recentActivity: RecentAttempt[];
  incompleteAttempt: TestAttempt | null;
}

const CATEGORY_MAP: Record<string, { category: string; label: string }> = {
  grammar: { category: "grammar", label: "Grammar" },
  "mock-exam": { category: "reading", label: "Reading" },
  "listening-test": { category: "listening", label: "Listening" },
  "writing-practice": { category: "writing", label: "Writing" },
};

function computeStreak(completedAttempts: TestAttempt[]): number {
  if (completedAttempts.length === 0) return 0;

  const daySet = new Set<string>();
  for (const a of completedAttempts) {
    const d = new Date(a.endTime ?? a.startTime);
    daySet.add(`${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`);
  }

  const now = new Date();
  let streak = 0;
  const check = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  // Check today first
  const todayKey = `${check.getFullYear()}-${check.getMonth()}-${check.getDate()}`;
  if (!daySet.has(todayKey)) {
    // If no test today, start from yesterday
    check.setDate(check.getDate() - 1);
  }

  while (true) {
    const key = `${check.getFullYear()}-${check.getMonth()}-${check.getDate()}`;
    if (!daySet.has(key)) break;
    streak++;
    check.setDate(check.getDate() - 1);
  }

  return streak;
}

export function useDashboardStats(): DashboardStats {
  const [stats, setStats] = useState<DashboardStats>({
    loading: true,
    testsCompleted: 0,
    avgScore: 0,
    bestScore: 0,
    totalPracticeTimeMs: 0,
    streak: 0,
    categoryStats: [],
    recentActivity: [],
    incompleteAttempt: null,
  });

  useEffect(() => {
    async function load() {
      const [allAttempts, incompleteAttempts] = await Promise.all([
        getAllAttempts(),
        getIncompleteAttempts(),
      ]);

      const completed = allAttempts.filter((a) => a.completed && a.score != null);

      // Basic stats
      const testsCompleted = completed.length;
      const totalScore = completed.reduce((sum, a) => sum + (a.score ?? 0), 0);
      const avgScore = testsCompleted > 0 ? Math.round(totalScore / testsCompleted) : 0;
      const bestScore = testsCompleted > 0 ? Math.max(...completed.map((a) => a.score ?? 0)) : 0;
      const totalPracticeTimeMs = completed.reduce((sum, a) => {
        if (a.endTime && a.startTime) return sum + (a.endTime - a.startTime);
        return sum;
      }, 0);

      // Streak
      const streak = computeStreak(completed);

      // Category stats
      const metadata = getMetadata();
      const testCategoryMap = new Map<string, { category: string; label: string }>();
      for (const t of metadata.tests) {
        const mapped = CATEGORY_MAP[t.category];
        if (mapped) testCategoryMap.set(t.id, mapped);
      }

      const catScores: Record<string, { total: number; count: number; label: string }> = {};
      for (const a of completed) {
        const cat = testCategoryMap.get(a.testId);
        if (!cat) continue;
        if (!catScores[cat.category]) {
          catScores[cat.category] = { total: 0, count: 0, label: cat.label };
        }
        catScores[cat.category].total += a.score ?? 0;
        catScores[cat.category].count++;
      }

      const categoryOrder = ["grammar", "reading", "listening", "writing"];
      const categoryStats: CategoryStat[] = categoryOrder.map((key) => {
        const data = catScores[key];
        return {
          category: key,
          label: data?.label ?? key.charAt(0).toUpperCase() + key.slice(1),
          avgScore: data ? Math.round(data.total / data.count) : 0,
          count: data?.count ?? 0,
        };
      });

      // Recent activity (last 5 completed)
      const recentActivity: RecentAttempt[] = completed.slice(0, 5).map((a) => ({
        id: a.id,
        testId: a.testId,
        title: getTestTitle(a.testId),
        score: a.score ?? 0,
        completedAt: a.endTime ?? a.startTime,
      }));

      // Most recent incomplete attempt
      const incompleteAttempt = incompleteAttempts[0] ?? null;

      setStats({
        loading: false,
        testsCompleted,
        avgScore,
        bestScore,
        totalPracticeTimeMs,
        streak,
        categoryStats,
        recentActivity,
        incompleteAttempt,
      });
    }

    load();
  }, []);

  return stats;
}
