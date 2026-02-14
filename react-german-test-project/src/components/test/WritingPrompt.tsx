"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import type { WritingPromptQuestion } from "@/types/question";

const MAX_LENGTH = 500;

interface WritingPromptProps {
  question: WritingPromptQuestion;
  value: string | null;
  onChange: (answer: string) => void;
  disabled?: boolean;
  showResult?: boolean;
  modelAnswer?: string;
}

export function WritingPrompt({
  question,
  value,
  onChange,
  disabled = false,
  showResult = false,
  modelAnswer: modelAnswerOverride,
}: WritingPromptProps) {
  const prompt = question.prompt ?? question.text;
  const userAnswer = value ?? "";
  const modelAnswer = modelAnswerOverride ?? question.modelAnswer ?? "";

  const [feedback, setFeedback] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [feedbackError, setFeedbackError] = useState<string | null>(null);

  async function handleGetFeedback() {
    const trimmed = userAnswer.trim();
    if (!trimmed) {
      setFeedbackError("Bitte zuerst eine Antwort schreiben.");
      return;
    }
    setFeedbackError(null);
    setLoading(true);
    setFeedback(null);
    try {
      const res = await fetch("/api/evaluate-writing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt,
          userAnswer: trimmed,
          modelAnswer: modelAnswer || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setFeedbackError(data.error ?? "Feedback konnte nicht geladen werden.");
        return;
      }
      setFeedback(data.feedback ?? null);
    } catch {
      setFeedbackError("Netzwerkfehler. Bitte später erneut versuchen.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-3">
      <p className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
        {prompt}
      </p>
      {showResult && (
        <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Deine Antwort
        </p>
      )}
      <textarea
        value={userAnswer}
        onChange={(e) => onChange(e.target.value.slice(0, MAX_LENGTH))}
        disabled={disabled}
        placeholder="Deine Antwort (z.B. 2–3 Sätze)…"
        rows={4}
        className="w-full px-3 py-2 rounded-lg border-2 border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-amber-500 resize-y"
        aria-label="Your answer"
      />
      {!showResult && !disabled && (
        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={handleGetFeedback}
            disabled={loading || !userAnswer.trim()}
            className="px-3 py-1.5 text-sm font-medium rounded-lg border border-amber-500 text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 dark:hover:bg-amber-950/60 disabled:opacity-50 disabled:pointer-events-none"
          >
            {loading ? "Lädt…" : "Feedback holen"}
          </button>
          {feedbackError && (
            <span className="text-sm text-red-600 dark:text-red-400">
              {feedbackError}
            </span>
          )}
        </div>
      )}
      {!showResult && feedback && (
        <div className="rounded-lg border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/30 p-3">
          <p className="text-sm font-medium text-amber-800 dark:text-amber-200 mb-1">
            KI-Feedback
          </p>
          <div className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed [&_strong]:font-semibold [&_p]:mb-2 [&_p:last-child]:mb-0 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5">
            <ReactMarkdown>{feedback}</ReactMarkdown>
          </div>
        </div>
      )}
      {!showResult && (
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          {userAnswer.length}/{MAX_LENGTH} Zeichen
        </p>
      )}
      {showResult && modelAnswer && (
        <div className="rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 p-3 mt-3">
          <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
            Musterlösung
          </p>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 whitespace-pre-line">
            {modelAnswer}
          </p>
        </div>
      )}
    </div>
  );
}
