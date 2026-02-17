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

export class GermanB1Database extends Dexie {
  attempts!: Table<TestAttempt, string>;
  progress!: Table<ProgressRecord, string>;
  generatedTests!: Table<GeneratedTest, string>;

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
  }
}

export const db = new GermanB1Database();
