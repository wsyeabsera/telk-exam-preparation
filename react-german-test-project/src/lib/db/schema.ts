import Dexie, { type Table } from "dexie";
import type { TestAttempt } from "@/types/result";

export interface ProgressRecord {
  userId: string;
  testsCompleted: number;
  totalScore: number;
  attemptCount: number;
  lastAttemptAt?: number;
  updatedAt: number;
}

export class GermanB1Database extends Dexie {
  attempts!: Table<TestAttempt, string>;
  progress!: Table<ProgressRecord, string>;

  constructor() {
    super("german-b1-tests");
    this.version(1).stores({
      attempts: "id, testId, completed, startTime",
      progress: "userId",
    });
  }
}

export const db = new GermanB1Database();
