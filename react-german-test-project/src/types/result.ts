export interface TestAttempt {
  id: string;
  testId: string;
  startTime: number;
  endTime?: number;
  answers: Record<string, string>;
  score?: number;
  completed: boolean;
}

export interface QuestionResult {
  questionId: string;
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  explanation?: string;
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
