"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { ScoreBadge } from "@/components/ui/ScoreBadge";
import type { PersonalBest } from "@/hooks/useProgressData";

const CATEGORY_COLORS: Record<string, string> = {
  grammar: "bg-blue-500",
  reading: "bg-emerald-500",
  listening: "bg-purple-500",
  writing: "bg-amber-500",
  other: "bg-zinc-400",
};

interface PersonalBestsProps {
  data: PersonalBest[];
}

export function PersonalBests({ data }: PersonalBestsProps) {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? data : data.slice(0, 8);

  if (data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Personal Bests</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            No personal bests yet. Complete some tests to see your top scores.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Bests</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {visible.map((pb) => (
            <div
              key={pb.testId}
              className="flex items-center gap-3"
            >
              <span
                className={`w-2.5 h-2.5 rounded-full shrink-0 ${CATEGORY_COLORS[pb.category] ?? CATEGORY_COLORS.other}`}
              />
              <span className="flex-1 text-sm text-zinc-700 dark:text-zinc-300 truncate">
                {pb.testTitle}
              </span>
              <ScoreBadge score={pb.score} />
              <span className="text-xs text-zinc-400 dark:text-zinc-500 shrink-0">
                {format(new Date(pb.date), "MMM d")}
              </span>
            </div>
          ))}
        </div>
        {data.length > 8 && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="mt-3 text-sm text-amber-600 dark:text-amber-400 hover:underline"
          >
            {showAll ? "Show less" : "Show all"}
          </button>
        )}
      </CardContent>
    </Card>
  );
}
