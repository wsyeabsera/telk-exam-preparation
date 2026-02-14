"use client";

import { cn } from "@/lib/utils/cn";
import type { MultipleChoiceQuestion } from "@/types/question";

interface MultipleChoiceProps {
  question: MultipleChoiceQuestion;
  value: string | null;
  onChange: (answerId: string) => void;
  disabled?: boolean;
  showResult?: boolean;
  correctAnswerId?: string;
}

export function MultipleChoice({
  question,
  value,
  onChange,
  disabled = false,
  showResult = false,
  correctAnswerId,
}: MultipleChoiceProps) {
  const correctId = correctAnswerId ?? question.correctAnswerId;

  return (
    <div className="space-y-3">
      <p className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
        {question.text}
      </p>
      <ul className="space-y-2" role="listbox" aria-label="Answer options">
        {question.options.map((option) => {
          const isSelected = value === option.id;
          const isCorrect = showResult && option.id === correctId;
          const isWrong = showResult && isSelected && option.id !== correctId;

          return (
            <li key={option.id}>
              <button
                type="button"
                role="option"
                aria-selected={isSelected}
                disabled={disabled}
                onClick={() => !disabled && onChange(option.id)}
                className={cn(
                  "w-full text-left px-4 py-3 rounded-lg border-2 transition-colors",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2",
                  !showResult &&
                    "border-zinc-200 dark:border-zinc-600 hover:border-amber-400 dark:hover:border-amber-500",
                  isSelected &&
                    !showResult &&
                    "border-amber-500 bg-amber-50 dark:bg-amber-950/30",
                  showResult && isCorrect && "border-green-500 bg-green-50 dark:bg-green-950/30",
                  showResult && isWrong && "border-red-500 bg-red-50 dark:bg-red-950/30"
                )}
              >
                <span className="flex items-center gap-2">
                  <span
                    className={cn(
                      "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 text-xs font-medium",
                      isSelected && !showResult && "border-amber-500 bg-amber-500 text-black",
                      showResult && isCorrect && "border-green-500 bg-green-500 text-white",
                      showResult && isWrong && "border-red-500 bg-red-500 text-white",
                      !isSelected && !showResult && "border-zinc-400 dark:border-zinc-500"
                    )}
                  >
                    {String.fromCharCode(64 + question.options.indexOf(option) + 1)}
                  </span>
                  {option.text}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
