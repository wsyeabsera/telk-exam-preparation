"use client";

import { cn } from "@/lib/utils/cn";
import type { FillBlankQuestion } from "@/types/question";

interface FillBlankProps {
  question: FillBlankQuestion;
  value: string | null;
  onChange: (answer: string) => void;
  disabled?: boolean;
  showResult?: boolean;
  correctAnswer?: string;
}

function normalize(s: string): string {
  return s.trim().toLowerCase().replace(/\s+/g, " ");
}

export function FillBlank({
  question,
  value,
  onChange,
  disabled = false,
  showResult = false,
  correctAnswer: correctAnswerOverride,
}: FillBlankProps) {
  const correct = correctAnswerOverride ?? question.correctAnswer;
  const userAnswer = value ?? "";
  const isCorrect = showResult && normalize(userAnswer) === normalize(correct);
  const isWrong = showResult && userAnswer !== "" && !isCorrect;

  return (
    <div className="space-y-3">
      <p className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
        {question.text}
      </p>
      {question.nominativeHint && !showResult && (
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Nominativ: {question.nominativeHint}
        </p>
      )}
      <div className="flex flex-wrap items-center gap-2">
        <input
          type="text"
          value={userAnswer}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          placeholder="Antwort eingeben"
          className={cn(
            "min-w-[120px] px-3 py-2 rounded-lg border-2 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-amber-500",
            !showResult && "border-zinc-300 dark:border-zinc-600",
            !showResult && userAnswer && "border-amber-500 bg-amber-50/50 dark:bg-amber-950/20",
            showResult && isCorrect && "border-green-500 bg-green-50 dark:bg-green-950/30",
            showResult && isWrong && "border-red-500 bg-red-50 dark:bg-red-950/30"
          )}
          aria-label="Your answer"
        />
        {showResult && (
          <span className="text-sm font-medium">
            {isCorrect ? (
              <span className="text-green-600 dark:text-green-400">Richtig</span>
            ) : isWrong ? (
              <span className="text-red-600 dark:text-red-400">
                Richtig: {correct}
              </span>
            ) : null}
          </span>
        )}
      </div>
    </div>
  );
}
