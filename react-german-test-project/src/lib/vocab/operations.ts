import { db } from "@/lib/db/schema";
import type { VocabCard } from "@/lib/db/schema";
import { sm2, defaultSrsState } from "@/lib/srs/sm2";

const DAY_MS = 24 * 60 * 60 * 1000;

export interface VocabCardInput {
  word: string;
  translation: string;
  exampleSentence: string;
  tags?: string[];
  sourceQuestionId?: string;
  sourceTestId?: string;
}

export async function addVocabCard(input: VocabCardInput): Promise<string> {
  const now = Date.now();
  const state = defaultSrsState(false);
  const id = crypto.randomUUID();
  const card: VocabCard = {
    id,
    word: input.word,
    translation: input.translation,
    exampleSentence: input.exampleSentence,
    tags: input.tags ?? [],
    sourceQuestionId: input.sourceQuestionId,
    sourceTestId: input.sourceTestId,
    interval: state.interval,
    easeFactor: state.easeFactor,
    repetitions: state.repetitions,
    dueAt: now,
    lastReviewedAt: now,
    createdAt: now,
  };
  await db.vocabCards.add(card);
  return id;
}

export async function bulkAddVocabCards(
  inputs: VocabCardInput[]
): Promise<number> {
  const existing = await db.vocabCards.toArray();
  const existingWords = new Set(
    existing.map((c) => c.word.toLowerCase())
  );

  const now = Date.now();
  const state = defaultSrsState(false);
  const newCards: VocabCard[] = [];

  for (const input of inputs) {
    if (existingWords.has(input.word.toLowerCase())) continue;
    existingWords.add(input.word.toLowerCase());
    newCards.push({
      id: crypto.randomUUID(),
      word: input.word,
      translation: input.translation,
      exampleSentence: input.exampleSentence,
      tags: input.tags ?? [],
      sourceQuestionId: input.sourceQuestionId,
      sourceTestId: input.sourceTestId,
      interval: state.interval,
      easeFactor: state.easeFactor,
      repetitions: state.repetitions,
      dueAt: now,
      lastReviewedAt: now,
      createdAt: now,
    });
  }

  if (newCards.length > 0) {
    await db.vocabCards.bulkAdd(newCards);
  }
  return newCards.length;
}

export async function getAllVocabCards(): Promise<VocabCard[]> {
  const cards = await db.vocabCards.toArray();
  return cards.sort((a, b) => b.createdAt - a.createdAt);
}

export async function getDueVocabCards(limit = 20): Promise<VocabCard[]> {
  const now = Date.now();
  const due = await db.vocabCards
    .where("dueAt")
    .belowOrEqual(now)
    .sortBy("dueAt");
  return due.slice(0, limit);
}

export async function getDueVocabCardCount(): Promise<number> {
  return db.vocabCards.where("dueAt").belowOrEqual(Date.now()).count();
}

export async function getTotalVocabCardCount(): Promise<number> {
  return db.vocabCards.count();
}

export async function getAllVocabTags(): Promise<string[]> {
  const cards = await db.vocabCards.toArray();
  const tagSet = new Set<string>();
  for (const card of cards) {
    for (const tag of card.tags) {
      tagSet.add(tag);
    }
  }
  return Array.from(tagSet).sort();
}

export async function reviewVocabCard(
  id: string,
  correct: boolean
): Promise<void> {
  const card = await db.vocabCards.get(id);
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
  await db.vocabCards.update(id, {
    interval: updated.interval,
    easeFactor: updated.easeFactor,
    repetitions: updated.repetitions,
    dueAt: now + updated.interval * DAY_MS,
    lastReviewedAt: now,
  });
}

export async function deleteVocabCard(id: string): Promise<void> {
  await db.vocabCards.delete(id);
}
