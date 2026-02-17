"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  getTest,
  getSuperShortQuestions,
  getTestWithRandomSubset,
  getQuestionsPerAttempt,
  isQuickPracticeTestId,
  getQuickPracticeConfig,
} from "@/lib/data/load-tests";
import type { Test } from "@/types/test";
import type { Question } from "@/types/question";
import { createAttempt, updateAttemptAnswer, completeAttempt, updateAttemptQuestionSnapshot } from "@/lib/db/operations";
import { scoreTest } from "@/lib/test-engine/scorer";
import { ingestTestResults } from "@/lib/srs/operations";
import type { SrsQuestionResult } from "@/lib/srs/operations";
import { isWritingPrompt } from "@/types/question";
import { shuffleTest } from "@/lib/test-engine/randomizer";
import { minutesToMs } from "@/lib/test-engine/timer";
import { QuestionRenderer } from "@/components/test/QuestionRenderer";
import { PassageViewer } from "@/components/test/PassageViewer";
import { TestProgress } from "@/components/test/TestProgress";
import { TestTimer } from "@/components/test/TestTimer";
import { Button } from "@/components/ui/Button";

export default function TestPage() {
  const params = useParams();
  const router = useRouter();
  const testId = params.id as string;

  const [test, setTest] = useState<Test | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [attemptId, setAttemptId] = useState<string | null>(null);
  const [startTime, setStartTime] = useState<number>(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isQuickPracticeTestId(testId)) {
      const config = getQuickPracticeConfig(testId);
      if (!config) {
        setError("Test not found");
        setLoading(false);
        return;
      }
      const superShortQuestions = getSuperShortQuestions(config.variant);
      const shuffled = shuffleTest(superShortQuestions);
      setTest({
        id: config.id,
        title: config.title,
        description: config.description,
        duration: config.duration,
        category: "practice",
        focus:
          config.variant === "mixed"
            ? "Mixed"
            : config.variant === "reading"
              ? "Reading"
              : config.variant === "grammar"
                ? "Grammar"
                : config.variant === "writing"
                  ? "Writing"
                  : config.variant === "verbs"
                    ? "Verbs"
                    : config.variant === "cases"
                      ? "Cases"
                      : config.variant === "conjunctions"
                        ? "Conjunctions"
                        : config.variant === "pronouns"
                          ? "Pronouns"
                          : config.variant === "adjectives"
                            ? "Adjectives"
                            : "Mixed",
        questions: shuffled,
      });
      setQuestions(shuffled);
      setLoading(false);
      return;
    }
    let cancelled = false;
    getTest(testId).then((testData) => {
      if (cancelled) return;
      if (!testData) {
        setError("Test not found");
        setLoading(false);
        return;
      }
      const questionsPerAttempt = getQuestionsPerAttempt(testId);
      if (questionsPerAttempt != null) {
        getTestWithRandomSubset(testId, questionsPerAttempt).then(
          (questionsToUse) => {
            if (cancelled) return;
            setTest({ ...testData, questions: questionsToUse });
            setQuestions(shuffleTest(questionsToUse));
            setLoading(false);
          }
        );
      } else {
        setTest({ ...testData, questions: testData.questions });
        setQuestions(shuffleTest(testData.questions));
        setLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [testId]);

  useEffect(() => {
    if (!test || attemptId || questions.length === 0) return;
    createAttempt(testId).then((attempt) => {
      setAttemptId(attempt.id);
      setStartTime(attempt.startTime);
      updateAttemptQuestionSnapshot(attempt.id, questions);
    });
  }, [test, testId, attemptId, questions]);

  const saveAnswer = useCallback(
    (questionId: string, answerId: string) => {
      setAnswers((prev) => ({ ...prev, [questionId]: answerId }));
      if (attemptId) {
        updateAttemptAnswer(attemptId, questionId, answerId);
      }
    },
    [attemptId]
  );

  const handleComplete = useCallback(() => {
    if (!test || !attemptId) return;
    const { score, questionResults } = scoreTest(questions, answers);

    // Build SRS results for non-writing questions
    const isQuickPractice = isQuickPracticeTestId(testId);
    const srsResults: SrsQuestionResult[] = [];
    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      if (isWritingPrompt(q)) continue;
      const globalId = isQuickPractice
        ? q.originalGlobalId
        : `${testId}-${q.id}`;
      if (!globalId) continue;
      const result = questionResults[i];
      srsResults.push({
        globalQuestionId: globalId,
        correct: result.isCorrect,
        tags: q.tags,
        difficulty: q.difficulty,
        sourceTestId: testId,
      });
    }

    completeAttempt(attemptId, score).then(() => {
      ingestTestResults(srsResults);
      router.push(`/results/${attemptId}`);
    });
  }, [test, testId, attemptId, questions, answers, router]);

  if (loading || error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        {error ? (
          <div className="text-center">
            <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
            <Link href="/">
              <Button>Back to Dashboard</Button>
            </Link>
          </div>
        ) : (
          <p className="text-zinc-500">Loading test…</p>
        )}
      </div>
    );
  }

  if (!test || questions.length === 0) {
    const isComingSoon = test && getQuickPracticeConfig(test.id)?.questionCount === 0;
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-zinc-500 mb-4">
            {isComingSoon ? "Coming soon." : "No questions in this test."}
          </p>
          <Link href="/">
            <Button>Back to Dashboard</Button>
          </Link>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];
  const isLast = currentIndex === questions.length - 1;
  const durationMs = test.duration ? minutesToMs(test.duration) : 0;

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-4 md:p-6">
      <div className="max-w-2xl mx-auto">
        <Link
          href="/"
          className="inline-block text-sm text-amber-600 dark:text-amber-400 hover:underline mb-4"
        >
          ← Dashboard
        </Link>
        <header className="flex flex-wrap items-center justify-between gap-2 mb-6">
          <div>
            <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
              {test.title}
            </h1>
            {test.focus && (
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                {test.focus}
              </p>
            )}
          </div>
          {durationMs > 0 && startTime > 0 && (
            <TestTimer
              durationMs={durationMs}
              startTime={startTime}
              onExpire={handleComplete}
              className="px-3 py-1.5 rounded-lg bg-zinc-200 dark:bg-zinc-800"
            />
          )}
        </header>

        <TestProgress
          current={currentIndex + 1}
          total={questions.length}
          className="mb-6"
        />

        <div className="rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-6 shadow-sm mb-6">
          {currentQuestion.passageId && (
            <PassageViewer
              passageId={currentQuestion.passageId}
              hideTextByDefault={currentQuestion.hidePassageText ?? false}
              className="mb-4"
            />
          )}
          <QuestionRenderer
            question={currentQuestion}
            value={answers[currentQuestion.id] ?? null}
            onChange={(answerId) => saveAnswer(currentQuestion.id, answerId)}
          />
        </div>

        <div className="flex justify-between gap-4">
          <Button
            variant="outline"
            onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))}
            disabled={currentIndex === 0}
          >
            Previous
          </Button>
          {isLast ? (
            <Button onClick={handleComplete}>Finish test</Button>
          ) : (
            <Button onClick={() => setCurrentIndex((i) => i + 1)}>Next</Button>
          )}
        </div>
      </div>
    </div>
  );
}
