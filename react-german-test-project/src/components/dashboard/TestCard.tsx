"use client";

import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

interface TestCardProps {
  id: string;
  title: string;
  description: string;
  duration?: number;
  questionCount: number;
  focus?: string;
  category: string;
  comingSoon?: boolean;
}

export function TestCard({
  id,
  title,
  description,
  duration,
  questionCount,
  focus,
  comingSoon = false,
}: TestCardProps) {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="flex flex-wrap items-center gap-2">
          <CardTitle className="text-lg">{title}</CardTitle>
          {comingSoon && (
            <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400 border border-zinc-300 dark:border-zinc-600 rounded px-2 py-0.5">
              Coming soon
            </span>
          )}
        </div>
        {focus && (
          <span className="text-xs font-medium text-amber-600 dark:text-amber-400">
            {focus}
          </span>
        )}
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardFooter className="mt-auto pt-4">
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mr-auto">
          {questionCount > 0 ? `${questionCount} Q` : "—"}
          {duration ? ` · ${duration} min` : ""}
        </p>
        <Link href={`/test/${id}`}>
          <Button size="sm">Start</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
