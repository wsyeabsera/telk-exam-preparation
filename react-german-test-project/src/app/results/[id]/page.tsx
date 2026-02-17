"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getTest, getQuickPracticeConfig, isQuickPracticeTestId, isDrillTagTestId, getDrillTag } from "@/lib/data/load-tests";
import { getAttempt, saveAiFeedback, saveOverallAiInsights, saveGeneratedTest } from "@/lib/db/operations";
import { scoreTest } from "@/lib/test-engine/scorer";
import { formatTimeTaken } from "@/lib/test-engine/timer";
import { isWritingPrompt } from "@/types/question";
import type { Test } from "@/types/test";
import type { TestAttempt } from "@/types/result";
import type { QuestionResult } from "@/types/result";
import ReactMarkdown from "react-markdown";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { QuestionRenderer } from "@/components/test/QuestionRenderer";
import { bulkAddVocabCards } from "@/lib/vocab/operations";

export default function ResultsPage() {
  const params = useParams();
  const attemptId = params.id as string;

  const [attempt, setAttempt] = useState<TestAttempt | null>(null);
  const [test, setTest] = useState<Test | null>(null);
  const [result, setResult] = useState<{
    score: number;
    correctCount: number;
    totalQuestions: number;
    timeTakenMs: number;
    questionResults: QuestionResult[];
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [expandQuestion, setExpandQuestion] = useState<string | null>(null);
  const [writingFeedback, setWritingFeedback] = useState<Record<string, string>>({});
  const [loadingFeedback, setLoadingFeedback] = useState<Record<string, boolean>>({});
  const [overallInsights, setOverallInsights] = useState<string | null>(null);
  const [loadingOverallInsights, setLoadingOverallInsights] = useState(false);
  const [generatingTest, setGeneratingTest] = useState(false);
  const [generateTestError, setGenerateTestError] = useState<string | null>(null);
  const [vocabExtractStatus, setVocabExtractStatus] = useState<"idle" | "extracting" | "done" | "error">("idle");
  const [vocabExtractedCount, setVocabExtractedCount] = useState(0);

  useEffect(() => {
    getAttempt(attemptId).then(async (a) => {
      if (!a) {
        setLoading(false);
        return;
      }
      setAttempt(a);
      setWritingFeedback(a.aiFeedback ?? {});
      setOverallInsights(a.overallAiInsights ?? null);
      const hasSnapshot = (a.questionSnapshot?.length ?? 0) > 0;
      const baseTest = await getTest(a.testId);
      const questionsToUse = hasSnapshot ? a.questionSnapshot! : baseTest?.questions ?? [];
      const testData: Test | null =
        isDrillTagTestId(a.testId) && hasSnapshot
          ? (() => {
            const tag = getDrillTag(a.testId);
            return {
              id: a.testId,
              title: `Drill: ${tag}`,
              description: `Practice questions tagged "${tag}"`,
              category: "practice" as const,
              focus: tag,
              questions: a.questionSnapshot!,
            };
          })()
          : isQuickPracticeTestId(a.testId) && hasSnapshot
          ? (() => {
            const config = getQuickPracticeConfig(a.testId);
            return {
              id: a.testId,
              title: config?.title ?? a.testId,
              description: config?.description ?? "",
              category: "practice",
              focus:
                config?.variant === "mixed"
                  ? "Mixed"
                  : config?.variant === "reading"
                    ? "Reading"
                    : config?.variant === "grammar"
                      ? "Grammar"
                      : config?.variant === "writing"
                        ? "Writing"
                        : config?.variant === "verbs"
                          ? "Verbs"
                          : config?.variant === "cases"
                            ? "Cases"
                            : config?.variant === "conjunctions"
                              ? "Conjunctions"
                              : config?.variant === "pronouns"
                                ? "Pronouns"
                                : config?.variant === "adjectives"
                                  ? "Adjectives"
                                  : "Mixed",
              questions: a.questionSnapshot!,
            };
          })()
          : baseTest
            ? hasSnapshot
              ? { ...baseTest, questions: a.questionSnapshot! }
              : baseTest
            : null;
      setTest(testData);
      if (questionsToUse.length > 0) {
        if (a.completed && a.score !== undefined) {
          const { questionResults } = scoreTest(questionsToUse, a.answers);
          setResult({
            score: a.score,
            correctCount: questionResults.filter((r) => r.isCorrect).length,
            totalQuestions: questionsToUse.length,
            timeTakenMs: (a.endTime ?? a.startTime) - a.startTime,
            questionResults,
          });
        } else {
          const { score: computedScore, questionResults } = scoreTest(questionsToUse, a.answers);
          setResult({
            score: computedScore,
            correctCount: questionResults.filter((r) => r.isCorrect).length,
            totalQuestions: questionsToUse.length,
            timeTakenMs: (a.endTime ?? Date.now()) - a.startTime,
            questionResults,
          });
        }
      }
      setLoading(false);
    });
  }, [attemptId]);

  useEffect(() => {
    if (!test || !result || !expandQuestion) return;
    const questions = test.questions ?? [];
    const byId = new Map(questions.map((q) => [q.id, q]));
    const qr = result.questionResults.find((r) => r.questionId === expandQuestion);
    if (!qr) return;
    const question = byId.get(expandQuestion);
    if (!question || !isWritingPrompt(question)) return;
    if (!qr.userAnswer?.trim()) return;
    if (writingFeedback[expandQuestion] !== undefined) return;
    if (loadingFeedback[expandQuestion]) return;
    setLoadingFeedback((prev) => ({ ...prev, [expandQuestion]: true }));
    const prompt = question.prompt ?? (question as { text?: string }).text ?? "";
    const modelAnswer = question.modelAnswer ?? "";
    fetch("/api/evaluate-writing", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt,
        userAnswer: qr.userAnswer,
        modelAnswer,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.feedback != null) {
          setWritingFeedback((prev) => ({ ...prev, [expandQuestion]: data.feedback }));
          saveAiFeedback(attemptId, expandQuestion, data.feedback);
        }
      })
      .finally(() => {
        setLoadingFeedback((prev) => ({ ...prev, [expandQuestion]: false }));
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expandQuestion, test, result]);

  // Auto-extract vocabulary after AI insights become available
  useEffect(() => {
    if (!overallInsights || !test || !result) return;
    if (vocabExtractStatus !== "idle") return;

    const questions = test.questions ?? [];
    if (questions.length === 0) return;

    // Combine all question texts into one block for extraction
    const allText = questions
      .map((q) => {
        const text = ("prompt" in q && q.prompt) || q.text || "";
        return text;
      })
      .filter(Boolean)
      .join("\n\n");

    if (!allText.trim()) return;

    setVocabExtractStatus("extracting");

    fetch("/api/extract-vocabulary", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ questionText: allText }),
    })
      .then((res) => res.json())
      .then(async (data) => {
        if (data.words && Array.isArray(data.words)) {
          // Collect all tags from all questions
          const allTags = new Set<string>();
          for (const q of questions) {
            if ("tags" in q && Array.isArray(q.tags)) {
              for (const t of q.tags as string[]) allTags.add(t);
            }
          }
          const count = await bulkAddVocabCards(
            data.words.map((w: { word: string; translation: string; exampleSentence: string }) => ({
              ...w,
              tags: Array.from(allTags),
              sourceTestId: test.id,
            }))
          );
          setVocabExtractedCount(count);
          setVocabExtractStatus("done");
        } else {
          setVocabExtractStatus("error");
        }
      })
      .catch(() => {
        setVocabExtractStatus("error");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [overallInsights, test, result]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <p className="text-zinc-500">Loading results…</p>
      </div>
    );
  }

  const questions = test?.questions ?? [];
  if (!attempt || !test || questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-zinc-500 mb-4">Results not found.</p>
          <Link href="/">
            <Button>Back to Dashboard</Button>
          </Link>
        </div>
      </div>
    );
  }

  const questionById = new Map(questions.map((q) => [q.id, q]));

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-4 md:p-6">
      <div className="max-w-2xl mx-auto">
        <Link
          href="/"
          className="inline-block text-sm text-amber-600 dark:text-amber-400 hover:underline mb-4"
        >
          ← Dashboard
        </Link>
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            Results: {test.title}
          </h1>
          {test.focus && (
            <p className="text-sm text-zinc-500 dark:text-zinc-400">{test.focus}</p>
          )}
        </header>

        {result && (
          <>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-3xl">
                  {result.score}%
                </CardTitle>
                <CardContent className="pt-0">
                  <p className="text-zinc-600 dark:text-zinc-300">
                    {result.correctCount} of {result.totalQuestions} correct
                  </p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                    Time: {formatTimeTaken(result.timeTakenMs)}
                  </p>
                </CardContent>
              </CardHeader>
            </Card>

            <div className="mb-6">
              {overallInsights ? (
                  <div className="rounded-lg border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/30 p-4">
                    <p className="text-sm font-medium text-amber-800 dark:text-amber-200 mb-2">
                      KI-Analyse
                    </p>
                    <div className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed [&_strong]:font-semibold [&_p]:mb-2 [&_p:last-child]:mb-0 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5">
                      <ReactMarkdown>{overallInsights}</ReactMarkdown>
                    </div>
                    <div className="mt-4 pt-4 border-t border-amber-200 dark:border-amber-700 space-y-3">
                      {generateTestError && (
                        <div className="rounded-md border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/40 p-3 text-sm text-red-800 dark:text-red-200 flex items-start justify-between gap-2">
                          <span>{generateTestError}</span>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => setGenerateTestError(null)}
                          >
                            Try Again
                          </Button>
                        </div>
                      )}
                      {vocabExtractStatus === "extracting" && (
                        <p className="text-sm text-amber-700 dark:text-amber-300">
                          Extracting vocabulary from questions…
                        </p>
                      )}
                      {vocabExtractStatus === "done" && vocabExtractedCount > 0 && (
                        <div className="flex items-center justify-between text-sm">
                          <p className="text-amber-700 dark:text-amber-300">
                            {vocabExtractedCount} new word{vocabExtractedCount !== 1 ? "s" : ""} added to flashcards
                          </p>
                          <Link
                            href="/flashcards"
                            className="text-amber-600 dark:text-amber-400 hover:underline font-medium"
                          >
                            Review →
                          </Link>
                        </div>
                      )}
                      {vocabExtractStatus === "done" && vocabExtractedCount === 0 && (
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">
                          No new vocabulary to add (words already saved)
                        </p>
                      )}
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        disabled={generatingTest}
                        onClick={async () => {
                          if (!test || !result || !overallInsights) return;
                          setGenerateTestError(null);
                          setGeneratingTest(true);
                          try {
                            const res = await fetch(
                              "/api/generate-practice-test",
                              {
                                method: "POST",
                                headers: {
                                  "Content-Type": "application/json",
                                },
                                body: JSON.stringify({
                                  insights: overallInsights,
                                  testMetadata: {
                                    originalTestTitle: test.title,
                                    score: result.score,
                                  },
                                  attemptId,
                                }),
                              }
                            );
                            const data = await res.json();
                            if (data.testId && data.test) {
                              setGenerateTestError(null);
                              await saveGeneratedTest(data.test, attemptId);
                              window.location.href = `/test/${data.testId}`;
                            } else if (data.error) {
                              setGenerateTestError(data.error);
                            }
                          } catch (err) {
                            console.error("Failed to generate test:", err);
                            setGenerateTestError(
                              "Failed to generate practice test. Please try again."
                            );
                          } finally {
                            setGeneratingTest(false);
                          }
                        }}
                      >
                        {generatingTest
                          ? "Generating…"
                          : "Generate Practice Test"}
                      </Button>
                    </div>
                  </div>
                ) : loadingOverallInsights ? (
                  <div className="rounded-lg border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/30 p-4">
                    <p className="text-sm text-amber-800 dark:text-amber-200">
                      KI-Analyse wird erstellt…
                    </p>
                  </div>
                ) : (
                  <Button
                    type="button"
                    onClick={async () => {
                      if (!test || !result) return;
                      const questionById = new Map(
                        (test.questions ?? []).map((q) => [q.id, q])
                      );
                      const questionResults = result.questionResults.map(
                        (qr) => {
                          const q = questionById.get(qr.questionId);
                          const questionText =
                            (q && "prompt" in q && q.prompt) || q?.text || "";
                          return {
                            questionId: qr.questionId,
                            questionText,
                            tags: q && "tags" in q ? q.tags : undefined,
                            userAnswer: qr.userAnswer,
                            correctAnswer: qr.correctAnswer,
                            isCorrect: qr.isCorrect,
                          };
                        }
                      );
                      setLoadingOverallInsights(true);
                      try {
                        const res = await fetch(
                          "/api/evaluate-test-results",
                          {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                              testMetadata: {
                                title: test.title,
                                focus: test.focus,
                                score: result.score,
                                correctCount: result.correctCount,
                                totalQuestions: result.totalQuestions,
                                timeTakenMs: result.timeTakenMs,
                              },
                              questionResults,
                            }),
                          }
                        );
                        const data = await res.json();
                        if (data.insights != null) {
                          setOverallInsights(data.insights);
                          await saveOverallAiInsights(attemptId, data.insights);
                        }
                      } finally {
                        setLoadingOverallInsights(false);
                      }
                    }}
                  >
                    Get AI Insights
                  </Button>
                )}
            </div>

            <div className="space-y-4 mb-6">
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                Question breakdown
              </h2>
              {result.questionResults.map((qr, index) => {
                const question = questionById.get(qr.questionId);
                if (!question) return null;
                const isExpanded = expandQuestion === qr.questionId;
                return (
                  <Card key={qr.questionId}>
                    <CardHeader
                      className="cursor-pointer py-4"
                      onClick={() =>
                        setExpandQuestion(isExpanded ? null : qr.questionId)
                      }
                    >
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base">
                          Question {index + 1}
                          <span
                            className={
                              qr.isCorrect
                                ? " text-green-600 dark:text-green-400"
                                : " text-red-600 dark:text-red-400"
                            }
                          >
                            {" "}
                            ({qr.isCorrect ? "Correct" : "Incorrect"})
                          </span>
                        </CardTitle>
                        <span className="text-sm text-zinc-500">
                          {isExpanded ? "▼" : "▶"}
                        </span>
                      </div>
                    </CardHeader>
                    {isExpanded && (
                      <CardContent className="pt-0 border-t border-zinc-200 dark:border-zinc-700">
                        <div className="pt-4 space-y-3">
                          <QuestionRenderer
                            question={question}
                            value={qr.userAnswer}
                            onChange={() => { }}
                            disabled
                            showResult
                            correctAnswerId={qr.correctAnswer}
                            correctAnswer={qr.correctAnswer}
                          />
                          {qr.explanation && (
                            <p className="text-sm text-zinc-600 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 p-3 rounded-lg">
                              {qr.explanation}
                            </p>
                          )}
                          {qr.explanationDetail && (
                            <div className="text-sm text-zinc-600 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 p-3 rounded-lg whitespace-pre-line border-t border-zinc-200 dark:border-zinc-700 mt-2 pt-3">
                              {qr.explanationDetail}
                            </div>
                          )}
                          {isWritingPrompt(question) && qr.userAnswer?.trim() && (
                            <div className="rounded-lg border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/30 p-3 mt-3">
                              <p className="text-sm font-medium text-amber-800 dark:text-amber-200 mb-1">
                                KI-Feedback
                              </p>
                              {loadingFeedback[qr.questionId] ? (
                                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                                  Lädt…
                                </p>
                              ) : writingFeedback[qr.questionId] ? (
                                <div className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed [&_strong]:font-semibold [&_p]:mb-2 [&_p:last-child]:mb-0 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5">
                                  <ReactMarkdown>{writingFeedback[qr.questionId]}</ReactMarkdown>
                                </div>
                              ) : null}
                            </div>
                          )}
                        </div>
                      </CardContent>
                    )}
                  </Card>
                );
              })}
            </div>
          </>
        )}

        <div className="flex gap-3">
          <Link href="/">
            <Button variant="outline">Back to Dashboard</Button>
          </Link>
          <Link href={`/test/${test.id}`}>
            <Button>Retake test</Button>
          </Link>
        </div>

      </div>
    </div>
  );
}
