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
}

export function TestCard({
  id,
  title,
  description,
  duration,
  questionCount,
  focus,
}: TestCardProps) {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
        {focus && (
          <span className="text-xs font-medium text-amber-600 dark:text-amber-400">
            {focus}
          </span>
        )}
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardFooter className="mt-auto pt-4">
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mr-auto">
          {questionCount} Q
          {duration ? ` · ${duration} min` : ""}
        </p>
        <Link href={`/test/${id}`}>
          <Button size="sm">Start</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
