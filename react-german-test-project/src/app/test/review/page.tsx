"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { getDueCards, reviewCard } from "@/lib/srs/operations";
import { getQuestionByGlobalId } from "@/lib/data/load-tests";
import type { Question } from "@/types/question";
import { isWritingPrompt } from "@/types/question";
import { scoreTest } from "@/lib/test-engine/scorer";
import { QuestionRenderer } from "@/components/test/QuestionRenderer";
import { PassageViewer } from "@/components/test/PassageViewer";
import { TestProgress } from "@/components/test/TestProgress";
import { Button } from "@/components/ui/Button";

interface ReviewQuestion {
  question: Question;
  globalQuestionId: string;
}

export default function ReviewPage() {
  const [reviewQuestions, setReviewQuestions] = useState<ReviewQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [finished, setFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const dueCards = await getDueCards(20);
      const resolved: ReviewQuestion[] = [];
      for (const card of dueCards) {
        const q = await getQuestionByGlobalId(card.globalQuestionId);
        if (!q || isWritingPrompt(q)) continue;
        resolved.push({
          question: { ...q, id: `review-${resolved.length + 1}` },
          globalQuestionId: card.globalQuestionId,
        });
      }
      if (!cancelled) {
        setReviewQuestions(resolved);
        setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const saveAnswer = useCallback(
    (questionId: string, answerId: string) => {
      setAnswers((prev) => ({ ...prev, [questionId]: answerId }));
    },
    []
  );

  const handleFinish = useCallback(async () => {
    const questions = reviewQuestions.map((rq) => rq.question);
    const { score: s, questionResults } = scoreTest(questions, answers);

    // Update each SRS card
    for (let i = 0; i < reviewQuestions.length; i++) {
      const result = questionResults[i];
      await reviewCard(reviewQuestions[i].globalQuestionId, result.isCorrect);
    }

    setScore(s);
    setCorrectCount(questionResults.filter((r) => r.isCorrect).length);
    setFinished(true);
  }, [reviewQuestions, answers]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <p className="text-zinc-500">Loading review cards...</p>
      </div>
    );
  }

  if (reviewQuestions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-zinc-500 mb-4">No cards due for review.</p>
          <Link href="/">
            <Button>Back to Dashboard</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (finished) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center p-4">
        <div className="max-w-md w-full rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-8 shadow-sm text-center">
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
            Review Complete
          </h1>
          <p className="text-4xl font-bold text-amber-600 dark:text-amber-400 mb-2">
            {score}%
          </p>
          <p className="text-zinc-500 dark:text-zinc-400 mb-6">
            {correctCount} / {reviewQuestions.length} correct
          </p>
          <Link href="/">
            <Button>Back to Dashboard</Button>
          </Link>
        </div>
      </div>
    );
  }

  const currentRQ = reviewQuestions[currentIndex];
  const currentQuestion = currentRQ.question;
  const isLast = currentIndex === reviewQuestions.length - 1;

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-4 md:p-6">
      <div className="max-w-2xl mx-auto">
        <Link
          href="/"
          className="inline-block text-sm text-amber-600 dark:text-amber-400 hover:underline mb-4"
        >
          &larr; Dashboard
        </Link>
        <header className="mb-6">
          <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
            Review
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Spaced repetition &mdash; {reviewQuestions.length} cards due
          </p>
        </header>

        <TestProgress
          current={currentIndex + 1}
          total={reviewQuestions.length}
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
            <Button onClick={handleFinish}>Finish Review</Button>
          ) : (
            <Button onClick={() => setCurrentIndex((i) => i + 1)}>Next</Button>
          )}
        </div>
      </div>
    </div>
  );
}
