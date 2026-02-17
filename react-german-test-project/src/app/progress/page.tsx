"use client";

import Link from "next/link";
import { useProgressData } from "@/hooks/useProgressData";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { LineChart } from "@/components/charts/LineChart";
import { BarChart } from "@/components/charts/BarChart";
import { ImprovementCard } from "@/components/charts/ImprovementCard";
import { PersonalBests } from "@/components/charts/PersonalBests";
import { TopicBreakdown } from "@/components/charts/TopicBreakdown";
import { LearningHealth } from "@/components/charts/LearningHealth";
import { ActivityHeatmap } from "@/components/charts/ActivityHeatmap";
import { StudyTimeCard } from "@/components/charts/StudyTimeCard";

function LoadingSkeleton() {
  return (
    <div className="space-y-6">
      <div className="h-8 w-48 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse" />
      <div className="h-[120px] bg-zinc-200 dark:bg-zinc-800 rounded-xl animate-pulse" />
      <div className="h-[300px] bg-zinc-200 dark:bg-zinc-800 rounded-xl animate-pulse" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="h-[280px] bg-zinc-200 dark:bg-zinc-800 rounded-xl animate-pulse" />
        <div className="h-[180px] bg-zinc-200 dark:bg-zinc-800 rounded-xl animate-pulse" />
      </div>
      <div className="h-[300px] bg-zinc-200 dark:bg-zinc-800 rounded-xl animate-pulse" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="h-[240px] bg-zinc-200 dark:bg-zinc-800 rounded-xl animate-pulse" />
        <div className="h-[200px] bg-zinc-200 dark:bg-zinc-800 rounded-xl animate-pulse" />
      </div>
    </div>
  );
}

export default function ProgressPage() {
  const data = useProgressData();

  if (data.loading) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
        <div className="max-w-4xl mx-auto p-4 md:p-6">
          <LoadingSkeleton />
        </div>
      </div>
    );
  }

  if (data.totalAttempts === 0) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
        <div className="max-w-4xl mx-auto p-4 md:p-6">
          <Link
            href="/"
            className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
          >
            &larr; Dashboard
          </Link>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mt-4 mb-6">
            Progress &amp; Charts
          </h1>
          <Card>
            <CardContent className="p-6">
              <p className="text-zinc-500 dark:text-zinc-400 text-center">
                No test attempts yet.{" "}
                <Link href="/" className="text-amber-600 dark:text-amber-400 hover:underline">
                  Go to the dashboard
                </Link>{" "}
                and complete a test to start tracking your progress.
              </p>
            </CardContent>
          </Card>
          {/* Still show learning health even with 0 tests */}
          {(data.srsHealth.totalCards > 0 || data.vocabHealth.totalWords > 0) && (
            <div className="mt-6">
              <LearningHealth srs={data.srsHealth} vocab={data.vocabHealth} />
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="max-w-4xl mx-auto p-4 md:p-6">
        <Link
          href="/"
          className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
        >
          &larr; Dashboard
        </Link>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mt-4 mb-6">
          Progress &amp; Charts
        </h1>

        <div className="space-y-6">
          {/* Study Activity Heatmap */}
          <ActivityHeatmap data={data.studyActivity} />

          {/* Score Over Time */}
          <Card>
            <CardHeader>
              <CardTitle>Score Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto scrollbar-hide">
                <div className="min-w-[500px]">
                  <LineChart data={data.scoreTimeline} />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Category Breakdown + Improvement */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Category Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto scrollbar-hide">
                  <div className="min-w-[320px]">
                    <BarChart data={data.categoryAverages} />
                  </div>
                </div>
              </CardContent>
            </Card>

            <ImprovementCard data={data.improvement} />
          </div>

          {/* Topic Accuracy */}
          <TopicBreakdown data={data.topicAccuracies} />

          {/* Learning Health + Study Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <LearningHealth srs={data.srsHealth} vocab={data.vocabHealth} />
            <StudyTimeCard data={data.studyTime} />
          </div>

          {/* Personal Bests */}
          <PersonalBests data={data.personalBests} />
        </div>
      </div>
    </div>
  );
}
