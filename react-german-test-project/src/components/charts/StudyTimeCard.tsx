"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import type { StudyTimeStats } from "@/hooks/useProgressData";

interface StudyTimeCardProps {
  data: StudyTimeStats;
}

function formatDuration(ms: number): string {
  if (ms === 0) return "0m";
  const totalMin = Math.round(ms / 60000);
  if (totalMin < 60) return `${totalMin}m`;
  const h = Math.floor(totalMin / 60);
  const m = totalMin % 60;
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
}

function formatSeconds(ms: number): string {
  const sec = Math.round(ms / 1000);
  if (sec < 60) return `${sec}s`;
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return s > 0 ? `${m}m ${s}s` : `${m}m`;
}

export function StudyTimeCard({ data }: StudyTimeCardProps) {
  if (data.sessionsCount === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Study Time</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            No study sessions recorded yet.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Study Time</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              {formatDuration(data.totalTimeMs)}
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">Total study time</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              {data.sessionsCount}
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">Sessions</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              {formatDuration(data.avgSessionMs)}
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">Avg per session</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              {formatSeconds(data.avgTimePerQuestion)}
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">Avg per question</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
