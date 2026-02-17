import Dexie, { type Table } from "dexie";
import type { TestAttempt } from "@/types/result";
import type { Test } from "@/types/test";

export interface ProgressRecord {
  userId: string;
  testsCompleted: number;
  totalScore: number;
  attemptCount: number;
  lastAttemptAt?: number;
  updatedAt: number;
}

export interface GeneratedTest {
  id: string;
  test: Test;
  generatedFrom: string;
  generatedAt: number;
}

export interface SrsCard {
  globalQuestionId: string;
  interval: number;
  easeFactor: number;
  repetitions: number;
  dueAt: number;
  lastReviewedAt: number;
  tags?: string[];
  difficulty?: "easy" | "medium" | "hard";
  sourceTestId?: string;
}

export class GermanB1Database extends Dexie {
  attempts!: Table<TestAttempt, string>;
  progress!: Table<ProgressRecord, string>;
  generatedTests!: Table<GeneratedTest, string>;
  srsCards!: Table<SrsCard, string>;

  constructor() {
    super("german-b1-tests");
    this.version(1).stores({
      attempts: "id, testId, completed, startTime",
      progress: "userId",
    });
    this.version(2).stores({
      attempts: "id, testId, completed, startTime",
      progress: "userId",
      generatedTests: "id, generatedFrom, generatedAt",
    });
    this.version(3).stores({
      attempts: "id, testId, completed, startTime",
      progress: "userId",
      generatedTests: "id, generatedFrom, generatedAt",
      srsCards: "globalQuestionId, dueAt, sourceTestId",
    });
  }
}

export const db = new GermanB1Database();
