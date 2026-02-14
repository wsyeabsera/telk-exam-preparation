"use client";

import { useEffect, useState } from "react";
import { formatTimeRemaining } from "@/lib/test-engine/timer";
import { cn } from "@/lib/utils/cn";

interface TestTimerProps {
  durationMs: number;
  startTime: number;
  onExpire?: () => void;
  className?: string;
}

export function TestTimer({
  durationMs,
  startTime,
  onExpire,
  className,
}: TestTimerProps) {
  const [remaining, setRemaining] = useState(() => {
    const elapsed = Date.now() - startTime;
    return Math.max(0, durationMs - elapsed);
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newRemaining = Math.max(0, durationMs - elapsed);
      setRemaining(newRemaining);
      if (newRemaining === 0 && onExpire) {
        onExpire();
        clearInterval(interval);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [durationMs, startTime, onExpire]);

  const isLow = remaining > 0 && remaining <= 60000;

  return (
    <span
      className={cn(
        "font-mono text-sm font-medium tabular-nums",
        isLow && "text-red-600 dark:text-red-400",
        className
      )}
    >
      {formatTimeRemaining(remaining)}
    </span>
  );
}
