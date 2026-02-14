import type { Question } from "@/types/question";
import type { TestResult, QuestionResult } from "@/types/result";
import { isMultipleChoice, isTrueFalse } from "@/types/question";

export function scoreTest(
  questions: Question[],
  answers: Record<string, string>
): { score: number; questionResults: QuestionResult[] } {
  const questionResults: QuestionResult[] = [];
  let correctCount = 0;

  for (const question of questions) {
    const userAnswer = answers[question.id] ?? "";
    let correctAnswer: string;
    let isCorrect: boolean;

    if (isMultipleChoice(question)) {
      correctAnswer = question.correctAnswerId;
      isCorrect = userAnswer === question.correctAnswerId;
    } else if (isTrueFalse(question)) {
      correctAnswer = question.correctAnswer ? "true" : "false";
      isCorrect =
        userAnswer === "true"
          ? question.correctAnswer
          : userAnswer === "false"
            ? !question.correctAnswer
            : false;
    } else {
      correctAnswer = "";
      isCorrect = false;
    }

    if (isCorrect) correctCount++;

    questionResults.push({
      questionId: question.id,
      userAnswer,
      correctAnswer,
      isCorrect,
      explanation: question.explanation,
    });
  }

  const score =
    questions.length > 0
      ? Math.round((correctCount / questions.length) * 100)
      : 0;

  return { score, questionResults };
}

export function buildTestResult(
  attemptId: string,
  testId: string,
  startTime: number,
  questions: Question[],
  questionResults: QuestionResult[]
): TestResult {
  const correctCount = questionResults.filter((r) => r.isCorrect).length;
  const endTime = Date.now();
  const score =
    questions.length > 0
      ? Math.round((correctCount / questions.length) * 100)
      : 0;

  return {
    attemptId,
    testId,
    totalQuestions: questions.length,
    correctCount,
    score,
    timeTakenMs: endTime - startTime,
    questionResults,
    completedAt: endTime,
  };
}
