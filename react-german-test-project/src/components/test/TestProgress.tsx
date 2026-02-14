"use client";

import { cn } from "@/lib/utils/cn";

interface TestProgressProps {
  current: number;
  total: number;
  className?: string;
}

export function TestProgress({ current, total, className }: TestProgressProps) {
  const percent = total > 0 ? (current / total) * 100 : 0;

  return (
    <div className={cn("space-y-2", className)}>
      <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
        Question {current} of {total}
      </p>
      <div className="h-2 w-full rounded-full bg-zinc-200 dark:bg-zinc-700 overflow-hidden">
        <div
          className="h-full rounded-full bg-amber-500 transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
