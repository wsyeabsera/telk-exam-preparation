"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import type { TopicAccuracy } from "@/hooks/useProgressData";

interface TopicBreakdownProps {
  data: TopicAccuracy[];
}

const STRENGTH_STYLES = {
  weak: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  medium: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  strong: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
};

const BAR_COLORS = {
  weak: "bg-red-500",
  medium: "bg-amber-500",
  strong: "bg-emerald-500",
};

export function TopicBreakdown({ data }: TopicBreakdownProps) {
  const [showAll, setShowAll] = useState(false);

  if (data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Topic Accuracy</CardTitle>
          <CardDescription>How you perform by grammar topic</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Complete tests with tagged questions to see topic-level accuracy.
          </p>
        </CardContent>
      </Card>
    );
  }

  const visible = showAll ? data : data.slice(0, 10);
  const weakCount = data.filter((t) => t.strength === "weak").length;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Topic Accuracy</CardTitle>
        <CardDescription>
          {data.length} topics tracked
          {weakCount > 0 && (
            <span className="text-red-500 dark:text-red-400 ml-1">
              &middot; {weakCount} need work
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {visible.map((topic) => (
            <div key={topic.tag}>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    {topic.tag}
                  </span>
                  <span
                    className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${STRENGTH_STYLES[topic.strength]}`}
                  >
                    {topic.accuracy}%
                  </span>
                </div>
                <span className="text-xs text-zinc-400 dark:text-zinc-500">
                  {topic.correct}/{topic.total}
                </span>
              </div>
              <div className="h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${BAR_COLORS[topic.strength]}`}
                  style={{ width: `${topic.accuracy}%` }}
                />
              </div>
            </div>
          ))}
        </div>
        {data.length > 10 && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="mt-4 text-sm text-amber-600 dark:text-amber-400 hover:underline"
          >
            {showAll ? "Show less" : `Show all ${data.length} topics`}
          </button>
        )}
      </CardContent>
    </Card>
  );
}
