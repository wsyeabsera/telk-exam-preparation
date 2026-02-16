import type { Question } from "./question";

export type TestCategory =
  | "grammar"
  | "writing-practice"
  | "mock-exam"
  | "listening-test"
  | "quick-test"
  | "practice-exam"
  | "practice";

export interface Test {
  id: string;
  title: string;
  description: string;
  duration?: number;
  questions: Question[];
  category: TestCategory;
  focus?: string;
}

export interface TestMetadata {
  id: string;
  title: string;
  description: string;
  duration?: number;
  questionCount: number;
  category: TestCategory;
  focus?: string;
}
