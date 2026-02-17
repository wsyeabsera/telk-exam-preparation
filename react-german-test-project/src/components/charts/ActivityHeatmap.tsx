"use client";

import { useMemo } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import type { StudyDay } from "@/hooks/useProgressData";

interface ActivityHeatmapProps {
  data: StudyDay[];
}

function getIntensity(count: number): string {
  if (count === 0) return "bg-zinc-100 dark:bg-zinc-800";
  if (count === 1) return "bg-amber-200 dark:bg-amber-900/40";
  if (count <= 3) return "bg-amber-400 dark:bg-amber-700/60";
  return "bg-amber-600 dark:bg-amber-500";
}

const DAY_LABELS = ["", "Mon", "", "Wed", "", "Fri", ""];

export function ActivityHeatmap({ data }: ActivityHeatmapProps) {
  const { grid, weekLabels, totalTests, activeDays } = useMemo(() => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    // Build lookup
    const dayMap = new Map<string, number>();
    let totalTests = 0;
    for (const d of data) {
      dayMap.set(d.date, d.count);
      totalTests += d.count;
    }

    // Build 12 weeks of cells (84 days) ending today
    // Grid: 7 rows (Sun-Sat), N columns (weeks)
    const numWeeks = 12;
    const cells: { date: string; count: number; dayOfWeek: number; week: number }[] = [];

    // Find the start: go back to the Sunday of 12 weeks ago
    const start = new Date(today);
    start.setDate(start.getDate() - (numWeeks * 7 - 1) - start.getDay());

    const weekLabels: string[] = [];
    let activeDays = 0;

    for (let w = 0; w < numWeeks; w++) {
      const weekStart = new Date(start);
      weekStart.setDate(weekStart.getDate() + w * 7);
      const month = weekStart.toLocaleString("en", { month: "short" });
      // Only add label if it's the first week of the month
      if (weekStart.getDate() <= 7) {
        weekLabels.push(month);
      } else {
        weekLabels.push("");
      }

      for (let d = 0; d < 7; d++) {
        const cellDate = new Date(weekStart);
        cellDate.setDate(cellDate.getDate() + d);
        if (cellDate > today) continue;

        const key = `${cellDate.getFullYear()}-${String(cellDate.getMonth() + 1).padStart(2, "0")}-${String(cellDate.getDate()).padStart(2, "0")}`;
        const count = dayMap.get(key) ?? 0;
        if (count > 0) activeDays++;
        cells.push({ date: key, count, dayOfWeek: d, week: w });
      }
    }

    return { grid: cells, weekLabels, totalTests, activeDays };
  }, [data]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Study Activity</CardTitle>
        <CardDescription>
          {totalTests} tests over {activeDays} active days (last 12 weeks)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto scrollbar-hide">
          <div className="min-w-[400px]">
            {/* Month labels */}
            <div className="flex ml-8 mb-1">
              {weekLabels.map((label, i) => (
                <div key={i} className="flex-1 text-[10px] text-zinc-400 dark:text-zinc-500">
                  {label}
                </div>
              ))}
            </div>
            {/* Grid */}
            <div className="flex gap-0.5">
              {/* Day labels */}
              <div className="flex flex-col gap-0.5 mr-1">
                {DAY_LABELS.map((label, i) => (
                  <div key={i} className="h-3 w-6 text-[10px] text-zinc-400 dark:text-zinc-500 text-right pr-1 leading-3">
                    {label}
                  </div>
                ))}
              </div>
              {/* Weeks */}
              {Array.from({ length: 12 }, (_, w) => {
                const weekCells = grid.filter((c) => c.week === w);
                return (
                  <div key={w} className="flex flex-col gap-0.5 flex-1">
                    {Array.from({ length: 7 }, (_, d) => {
                      const cell = weekCells.find((c) => c.dayOfWeek === d);
                      if (!cell) {
                        return <div key={d} className="h-3 rounded-sm" />;
                      }
                      return (
                        <div
                          key={d}
                          className={`h-3 rounded-sm ${getIntensity(cell.count)}`}
                          title={`${cell.date}: ${cell.count} test${cell.count !== 1 ? "s" : ""}`}
                        />
                      );
                    })}
                  </div>
                );
              })}
            </div>
            {/* Legend */}
            <div className="flex items-center gap-1 mt-2 justify-end text-[10px] text-zinc-400 dark:text-zinc-500">
              <span>Less</span>
              <div className={`w-3 h-3 rounded-sm ${getIntensity(0)}`} />
              <div className={`w-3 h-3 rounded-sm ${getIntensity(1)}`} />
              <div className={`w-3 h-3 rounded-sm ${getIntensity(2)}`} />
              <div className={`w-3 h-3 rounded-sm ${getIntensity(4)}`} />
              <span>More</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
