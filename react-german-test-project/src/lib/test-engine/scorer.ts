import type { Question } from "@/types/question";
import type { TestResult, QuestionResult } from "@/types/result";
import { isMultipleChoice, isTrueFalse, isFillBlank, isWritingPrompt } from "@/types/question";

function normalizeAnswer(s: string): string {
  return s.trim().toLowerCase().replace(/\s+/g, " ");
}

export function scoreTest(
  questions: Question[],
  answers: Record<string, string>
): { score: number; questionResults: QuestionResult[] } {
  const questionResults: QuestionResult[] = [];
  let correctCount = 0;
  let scoredCount = 0;

  for (const question of questions) {
    const userAnswer = answers[question.id] ?? "";
    let correctAnswer: string;
    let isCorrect: boolean;

    if (isWritingPrompt(question)) {
      correctAnswer = question.modelAnswer ?? "";
      isCorrect = true;
      // Writing is not auto-scored; exclude from percentage
    } else if (isMultipleChoice(question)) {
      correctAnswer = question.correctAnswerId;
      isCorrect = userAnswer === question.correctAnswerId;
      scoredCount++;
      if (isCorrect) correctCount++;
    } else if (isTrueFalse(question)) {
      correctAnswer = question.correctAnswer ? "true" : "false";
      isCorrect =
        userAnswer === "true"
          ? question.correctAnswer
          : userAnswer === "false"
            ? !question.correctAnswer
            : false;
      scoredCount++;
      if (isCorrect) correctCount++;
    } else if (isFillBlank(question)) {
      correctAnswer = question.correctAnswer;
      isCorrect = normalizeAnswer(userAnswer) === normalizeAnswer(question.correctAnswer);
      scoredCount++;
      if (isCorrect) correctCount++;
    } else {
      correctAnswer = "";
      isCorrect = false;
      scoredCount++;
    }

    questionResults.push({
      questionId: question.id,
      userAnswer,
      correctAnswer,
      isCorrect,
      explanation: question.explanation,
      explanationDetail: question.explanationDetail,
    });
  }

  const score =
    scoredCount > 0
      ? Math.round((correctCount / scoredCount) * 100)
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
