import { db } from "@/lib/db/schema";
import type { SrsCard } from "@/lib/db/schema";
import { sm2, defaultSrsState } from "./sm2";

const DAY_MS = 24 * 60 * 60 * 1000;

export interface SrsQuestionResult {
  globalQuestionId: string;
  correct: boolean;
  tags?: string[];
  difficulty?: "easy" | "medium" | "hard";
  sourceTestId?: string;
}

/**
 * Ingest results from a completed test. Creates SRS cards for questions
 * not yet tracked. Existing cards are left unchanged (they'll be updated
 * during review sessions).
 */
export async function ingestTestResults(
  results: SrsQuestionResult[]
): Promise<void> {
  const existingIds = new Set(
    (await db.srsCards.toArray()).map((c) => c.globalQuestionId)
  );

  const newCards: SrsCard[] = [];
  for (const r of results) {
    if (existingIds.has(r.globalQuestionId)) continue;

    const state = defaultSrsState(r.correct);
    const now = Date.now();
    newCards.push({
      globalQuestionId: r.globalQuestionId,
      interval: state.interval,
      easeFactor: state.easeFactor,
      repetitions: state.repetitions,
      dueAt: now,
      lastReviewedAt: now,
      tags: r.tags,
      difficulty: r.difficulty,
      sourceTestId: r.sourceTestId,
    });
  }

  if (newCards.length > 0) {
    await db.srsCards.bulkAdd(newCards);
  }
}

/**
 * Update an existing SRS card after a review session answer.
 */
export async function reviewCard(
  globalQuestionId: string,
  correct: boolean
): Promise<void> {
  const card = await db.srsCards.get(globalQuestionId);
  if (!card) return;

  const updated = sm2(
    {
      interval: card.interval,
      easeFactor: card.easeFactor,
      repetitions: card.repetitions,
    },
    correct
  );

  const now = Date.now();
  await db.srsCards.update(globalQuestionId, {
    interval: updated.interval,
    easeFactor: updated.easeFactor,
    repetitions: updated.repetitions,
    dueAt: now + updated.interval * DAY_MS,
    lastReviewedAt: now,
  });
}

/**
 * Get cards that are due for review, sorted by most overdue first.
 */
export async function getDueCards(limit = 20): Promise<SrsCard[]> {
  const now = Date.now();
  const due = await db.srsCards
    .where("dueAt")
    .belowOrEqual(now)
    .sortBy("dueAt");
  return due.slice(0, limit);
}

/**
 * Count of cards currently due for review.
 */
export async function getDueCardCount(): Promise<number> {
  return db.srsCards.where("dueAt").belowOrEqual(Date.now()).count();
}

/**
 * Total number of SRS cards tracked.
 */
export async function getTotalCardCount(): Promise<number> {
  return db.srsCards.count();
}
