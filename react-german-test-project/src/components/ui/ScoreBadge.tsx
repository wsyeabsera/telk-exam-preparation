"use client";

import { cn } from "@/lib/utils/cn";

interface ScoreBadgeProps {
  score: number;
  className?: string;
}

export function ScoreBadge({ score, className }: ScoreBadgeProps) {
  const variant =
    score >= 80 ? "good" : score >= 60 ? "medium" : "low";
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-full px-2.5 py-0.5 text-sm font-semibold",
        {
          "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300":
            variant === "good",
          "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300":
            variant === "medium",
          "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300":
            variant === "low",
        },
        className
      )}
    >
      {score}%
    </span>
  );
}
