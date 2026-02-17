"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import type { ImprovementData } from "@/hooks/useProgressData";

interface ImprovementCardProps {
  data: ImprovementData;
}

export function ImprovementCard({ data }: ImprovementCardProps) {
  if (!data.hasEnoughData) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Your Improvement</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Complete at least 5 tests to see improvement trends
          </p>
        </CardContent>
      </Card>
    );
  }

  const deltaColor =
    data.delta > 0
      ? "text-emerald-500"
      : data.delta < 0
        ? "text-red-500"
        : "text-zinc-400";

  const arrow =
    data.delta > 0 ? (
      <svg width="16" height="16" viewBox="0 0 16 16" className="inline-block">
        <path d="M8 3l5 6H3z" fill="currentColor" />
      </svg>
    ) : data.delta < 0 ? (
      <svg width="16" height="16" viewBox="0 0 16 16" className="inline-block">
        <path d="M8 13l5-6H3z" fill="currentColor" />
      </svg>
    ) : (
      <svg width="16" height="16" viewBox="0 0 16 16" className="inline-block">
        <path d="M2 8h12" stroke="currentColor" strokeWidth="2" fill="none" />
      </svg>
    );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Improvement</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4">
          <div className="flex-1 text-center">
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">First 5 tests</p>
            <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              {data.earlierAvg}%
            </p>
          </div>
          <div className={`flex flex-col items-center ${deltaColor}`}>
            {arrow}
            <span className="text-lg font-semibold">
              {data.delta > 0 ? "+" : ""}
              {data.delta}%
            </span>
          </div>
          <div className="flex-1 text-center">
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">Last 5 tests</p>
            <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              {data.recentAvg}%
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
