"use client";

import type { Question } from "@/types/question";
import { MultipleChoice } from "./MultipleChoice";
import { FillBlank } from "./FillBlank";
import { WritingPrompt } from "./WritingPrompt";
import { isMultipleChoice, isTrueFalse, isFillBlank, isWritingPrompt } from "@/types/question";
import { cn } from "@/lib/utils/cn";

interface QuestionRendererProps {
  question: Question;
  value: string | null;
  onChange: (answerId: string) => void;
  disabled?: boolean;
  showResult?: boolean;
  correctAnswerId?: string;
  correctAnswer?: string;
}

export function QuestionRenderer({
  question,
  value,
  onChange,
  disabled = false,
  showResult = false,
  correctAnswerId,
  correctAnswer,
}: QuestionRendererProps) {
  if (isMultipleChoice(question)) {
    return (
      <MultipleChoice
        question={question}
        value={value}
        onChange={onChange}
        disabled={disabled}
        showResult={showResult}
        correctAnswerId={correctAnswerId}
      />
    );
  }

  if (isTrueFalse(question)) {
    return (
      <div className="space-y-3">
        <p className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
          {question.text}
        </p>
        <div className="flex gap-3">
          <button
            type="button"
            disabled={disabled}
            onClick={() => !disabled && onChange("true")}
            className={cn(
              "px-4 py-3 rounded-lg border-2 font-medium transition-colors",
              value === "true" && !showResult && "border-amber-500 bg-amber-50 dark:bg-amber-950/30",
              showResult && question.correctAnswer === true && "border-green-500 bg-green-50 dark:bg-green-950/30",
              value === "true" && showResult && !question.correctAnswer && "border-red-500 bg-red-50 dark:bg-red-950/30"
            )}
          >
            Richtig
          </button>
          <button
            type="button"
            disabled={disabled}
            onClick={() => !disabled && onChange("false")}
            className={cn(
              "px-4 py-3 rounded-lg border-2 font-medium transition-colors",
              value === "false" && !showResult && "border-amber-500 bg-amber-50 dark:bg-amber-950/30",
              showResult && question.correctAnswer === false && "border-green-500 bg-green-50 dark:bg-green-950/30",
              value === "false" && showResult && question.correctAnswer && "border-red-500 bg-red-50 dark:bg-red-950/30"
            )}
          >
            Falsch
          </button>
        </div>
      </div>
    );
  }

  if (isFillBlank(question)) {
    return (
      <FillBlank
        question={question}
        value={value}
        onChange={onChange}
        disabled={disabled}
        showResult={showResult}
        correctAnswer={correctAnswer}
      />
    );
  }

  if (isWritingPrompt(question)) {
    return (
      <WritingPrompt
        question={question}
        value={value}
        onChange={onChange}
        disabled={disabled}
        showResult={showResult}
        modelAnswer={correctAnswer || undefined}
      />
    );
  }

  return (
    <div className="text-zinc-500">
      Unsupported question type: {question.type}
    </div>
  );
}
