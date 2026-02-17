import type { Question } from "./question";

export interface TestAttempt {
  id: string;
  testId: string;
  startTime: number;
  endTime?: number;
  answers: Record<string, string>;
  score?: number;
  completed: boolean;
  /** When testId is a quick-practice id (e.g. super-short, super-short-reading), the exact questions used for this attempt */
  questionSnapshot?: Question[];
  /** AI feedback for writing questions, keyed by questionId */
  aiFeedback?: Record<string, string>;
  /** Cached AI analysis of entire test (patterns, strengths, recommendations) */
  overallAiInsights?: string;
}

export interface QuestionResult {
  questionId: string;
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  explanation?: string;
  explanationDetail?: string;
}

export interface TestResult {
  attemptId: string;
  testId: string;
  totalQuestions: number;
  correctCount: number;
  score: number;
  timeTakenMs: number;
  questionResults: QuestionResult[];
  completedAt: number;
}
