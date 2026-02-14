import { db } from "./schema";
import type { TestAttempt } from "@/types/result";
import type { ProgressRecord } from "./schema";
import type { Question } from "@/types/question";

const DEFAULT_USER_ID = "default";

export async function createAttempt(
  testId: string
): Promise<TestAttempt> {
  const attempt: TestAttempt = {
    id: crypto.randomUUID(),
    testId,
    startTime: Date.now(),
    answers: {},
    completed: false,
  };
  await db.attempts.add(attempt);
  return attempt;
}

export async function updateAttemptQuestionSnapshot(
  attemptId: string,
  questionSnapshot: Question[]
): Promise<void> {
  await db.attempts.update(attemptId, { questionSnapshot });
}

export async function getAttempt(attemptId: string): Promise<TestAttempt | undefined> {
  return db.attempts.get(attemptId);
}

export async function saveAiFeedback(
  attemptId: string,
  questionId: string,
  feedback: string
): Promise<void> {
  const attempt = await db.attempts.get(attemptId);
  if (!attempt) return;
  await db.attempts.update(attemptId, {
    aiFeedback: { ...(attempt.aiFeedback ?? {}), [questionId]: feedback },
  });
}

export async function updateAttemptAnswer(
  attemptId: string,
  questionId: string,
  answerId: string
): Promise<void> {
  const attempt = await db.attempts.get(attemptId);
  if (!attempt) return;
  await db.attempts.update(attemptId, {
    answers: { ...attempt.answers, [questionId]: answerId },
  });
}

export async function completeAttempt(
  attemptId: string,
  score: number
): Promise<void> {
  await db.attempts.update(attemptId, {
    endTime: Date.now(),
    score,
    completed: true,
  });
  await updateProgress(score);
}

async function updateProgress(score: number): Promise<void> {
  const existing = await db.progress.get(DEFAULT_USER_ID);
  const now = Date.now();
  if (existing) {
    await db.progress.update(DEFAULT_USER_ID, {
      testsCompleted: existing.testsCompleted + 1,
      totalScore: existing.totalScore + score,
      attemptCount: existing.attemptCount + 1,
      lastAttemptAt: now,
      updatedAt: now,
    });
  } else {
    await db.progress.add({
      userId: DEFAULT_USER_ID,
      testsCompleted: 1,
      totalScore: score,
      attemptCount: 1,
      lastAttemptAt: now,
      updatedAt: now,
    });
  }
}

export async function getAttemptsByTest(
  testId: string
): Promise<TestAttempt[]> {
  return db.attempts.where("testId").equals(testId).reverse().sortBy("startTime");
}

export async function getProgress(): Promise<ProgressRecord | undefined> {
  return db.progress.get(DEFAULT_USER_ID);
}

export async function getCompletedAttempts(): Promise<TestAttempt[]> {
  const all = await db.attempts.orderBy("startTime").reverse().toArray();
  return all.filter((a) => a.completed);
}
