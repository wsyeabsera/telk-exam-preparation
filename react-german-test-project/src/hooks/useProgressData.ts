"use client";

import { useEffect, useState } from "react";
import { getAllAttempts } from "@/lib/db/operations";
import { getMetadata, getTestTitle, getTest, getTagQuestionPoolSize } from "@/lib/data/load-tests";
import { db } from "@/lib/db/schema";
import type { Question } from "@/types/question";
import type { TestAttempt } from "@/types/result";
import {
  isMultipleChoice,
  isTrueFalse,
  isFillBlank,
  isWritingPrompt,
} from "@/types/question";

const CATEGORY_MAP: Record<string, { category: string; label: string }> = {
  grammar: { category: "grammar", label: "Grammar" },
  "mock-exam": { category: "reading", label: "Reading" },
  "listening-test": { category: "listening", label: "Listening" },
  "writing-practice": { category: "writing", label: "Writing" },
};

const CATEGORY_COLORS: Record<string, string> = {
  grammar: "#3b82f6",
  reading: "#10b981",
  listening: "#a855f7",
  writing: "#f59e0b",
};

// --- Existing types ---

export interface ScorePoint {
  date: number;
  score: number;
  testTitle: string;
  category: string;
  isPersonalBest: boolean;
}

export interface CategoryAvg {
  category: string;
  label: string;
  avgScore: number;
  count: number;
  color: string;
}

export interface ImprovementData {
  earlierAvg: number;
  recentAvg: number;
  delta: number;
  hasEnoughData: boolean;
}

export interface PersonalBest {
  testId: string;
  testTitle: string;
  score: number;
  date: number;
  category: string;
}

// --- New types ---

export interface TopicAccuracy {
  tag: string;
  correct: number;
  total: number;
  accuracy: number; // 0-100
  strength: "weak" | "medium" | "strong"; // <60, 60-80, >80
  trend: "improving" | "declining" | "stable";
  poolSize: number; // available drill questions for this tag
}

export interface SrsHealth {
  totalCards: number;
  dueNow: number;
  mastered: number; // interval >= 21 days
  learning: number; // interval < 21 and repetitions > 0
  newCards: number; // repetitions === 0
  avgEaseFactor: number;
}

export interface VocabHealth {
  totalWords: number;
  dueNow: number;
  mastered: number;
  learning: number;
  topTags: { tag: string; count: number }[];
}

export interface StudyDay {
  date: string; // YYYY-MM-DD
  count: number;
  totalScore: number;
}

export interface StudyTimeStats {
  totalTimeMs: number;
  avgSessionMs: number;
  avgTimePerQuestion: number; // ms
  sessionsCount: number;
}

export interface ProgressData {
  loading: boolean;
  scoreTimeline: ScorePoint[];
  categoryAverages: CategoryAvg[];
  improvement: ImprovementData;
  personalBests: PersonalBest[];
  totalAttempts: number;
  topicAccuracies: TopicAccuracy[];
  srsHealth: SrsHealth;
  vocabHealth: VocabHealth;
  studyActivity: StudyDay[];
  studyTime: StudyTimeStats;
}

function normalizeAnswer(s: string): string {
  return s.trim().toLowerCase().replace(/\s+/g, " ");
}

function checkCorrect(q: Question, userAnswer: string): boolean | null {
  if (isWritingPrompt(q)) return null; // not auto-scored
  if (isMultipleChoice(q)) return userAnswer === q.correctAnswerId;
  if (isTrueFalse(q)) {
    if (userAnswer === "true") return q.correctAnswer;
    if (userAnswer === "false") return !q.correctAnswer;
    return false;
  }
  if (isFillBlank(q)) return normalizeAnswer(userAnswer) === normalizeAnswer(q.correctAnswer);
  return null;
}

export function useProgressData(): ProgressData {
  const [data, setData] = useState<ProgressData>({
    loading: true,
    scoreTimeline: [],
    categoryAverages: [],
    improvement: { earlierAvg: 0, recentAvg: 0, delta: 0, hasEnoughData: false },
    personalBests: [],
    totalAttempts: 0,
    topicAccuracies: [],
    srsHealth: { totalCards: 0, dueNow: 0, mastered: 0, learning: 0, newCards: 0, avgEaseFactor: 2.5 },
    vocabHealth: { totalWords: 0, dueNow: 0, mastered: 0, learning: 0, topTags: [] },
    studyActivity: [],
    studyTime: { totalTimeMs: 0, avgSessionMs: 0, avgTimePerQuestion: 0, sessionsCount: 0 },
  });

  useEffect(() => {
    async function load() {
      const [allAttempts, srsCards, vocabCards] = await Promise.all([
        getAllAttempts(),
        db.srsCards.toArray(),
        db.vocabCards.toArray(),
      ]);

      const completed = allAttempts.filter((a) => a.completed && a.score != null);

      if (completed.length === 0) {
        // Still compute SRS/vocab even with 0 test attempts
        const now = Date.now();
        const srsHealth = computeSrsHealth(srsCards, now);
        const vocabHealth = computeVocabHealth(vocabCards, now);
        setData((prev) => ({ ...prev, loading: false, srsHealth, vocabHealth }));
        return;
      }

      const metadata = getMetadata();
      const testCategoryMap = new Map<string, { category: string; label: string }>();
      for (const t of metadata.tests) {
        const mapped = CATEGORY_MAP[t.category];
        if (mapped) testCategoryMap.set(t.id, mapped);
      }

      const sorted = [...completed].sort(
        (a, b) => (a.endTime ?? a.startTime) - (b.endTime ?? b.startTime)
      );

      // --- Score timeline ---
      const maxScoreByTest = new Map<string, { score: number; date: number }>();
      for (const a of sorted) {
        const score = a.score ?? 0;
        const date = a.endTime ?? a.startTime;
        const existing = maxScoreByTest.get(a.testId);
        if (!existing || score > existing.score) {
          maxScoreByTest.set(a.testId, { score, date });
        }
      }

      const runningMax = new Map<string, number>();
      const scoreTimeline: ScorePoint[] = sorted.map((a) => {
        const score = a.score ?? 0;
        const prevMax = runningMax.get(a.testId) ?? -1;
        const isPersonalBest = score > prevMax;
        if (isPersonalBest) runningMax.set(a.testId, score);
        const cat = testCategoryMap.get(a.testId);
        return {
          date: a.endTime ?? a.startTime,
          score,
          testTitle: getTestTitle(a.testId),
          category: cat?.category ?? "other",
          isPersonalBest,
        };
      });

      // --- Category averages ---
      const catScores: Record<string, { total: number; count: number; label: string }> = {};
      for (const a of completed) {
        const cat = testCategoryMap.get(a.testId);
        if (!cat) continue;
        if (!catScores[cat.category]) {
          catScores[cat.category] = { total: 0, count: 0, label: cat.label };
        }
        catScores[cat.category].total += a.score ?? 0;
        catScores[cat.category].count++;
      }

      const categoryOrder = ["grammar", "reading", "listening", "writing"];
      const categoryAverages: CategoryAvg[] = categoryOrder.map((key) => {
        const d = catScores[key];
        return {
          category: key,
          label: d?.label ?? key.charAt(0).toUpperCase() + key.slice(1),
          avgScore: d ? Math.round(d.total / d.count) : 0,
          count: d?.count ?? 0,
          color: CATEGORY_COLORS[key] ?? "#71717a",
        };
      });

      // --- Improvement ---
      const scores = sorted.map((a) => a.score ?? 0);
      const hasEnoughData = scores.length >= 5;
      const first5 = scores.slice(0, 5);
      const last5 = scores.slice(-5);
      const earlierAvg = Math.round(first5.reduce((s, v) => s + v, 0) / first5.length);
      const recentAvg = Math.round(last5.reduce((s, v) => s + v, 0) / last5.length);
      const improvement: ImprovementData = { earlierAvg, recentAvg, delta: recentAvg - earlierAvg, hasEnoughData };

      // --- Personal bests ---
      const personalBests: PersonalBest[] = Array.from(maxScoreByTest.entries())
        .map(([testId, { score, date }]) => ({
          testId,
          testTitle: getTestTitle(testId),
          score,
          date,
          category: testCategoryMap.get(testId)?.category ?? "other",
        }))
        .sort((a, b) => b.score - a.score)
        .slice(0, 10);

      // --- Topic accuracy (question-level analysis) ---
      const topicAccuracies = await computeTopicAccuracy(sorted);

      // --- SRS health ---
      const now = Date.now();
      const srsHealth = computeSrsHealth(srsCards, now);

      // --- Vocab health ---
      const vocabHealth = computeVocabHealth(vocabCards, now);

      // --- Study activity (last 12 weeks) ---
      const studyActivity = computeStudyActivity(sorted);

      // --- Study time ---
      const studyTime = computeStudyTime(completed);

      setData({
        loading: false,
        scoreTimeline,
        categoryAverages,
        improvement,
        personalBests,
        totalAttempts: completed.length,
        topicAccuracies,
        srsHealth,
        vocabHealth,
        studyActivity,
        studyTime,
      });
    }

    load();
  }, []);

  return data;
}

// --- Compute helpers ---

async function computeTopicAccuracy(sorted: TestAttempt[]): Promise<TopicAccuracy[]> {
  const tagStats = new Map<string, { correct: number; total: number }>();

  // Per-attempt tag results for trend calculation (in chronological order)
  const perAttemptTagResults: Map<string, { correct: number; total: number }>[] = [];

  for (const attempt of sorted) {
    let questions: Question[] | undefined = attempt.questionSnapshot;

    if (!questions) {
      const test = await getTest(attempt.testId);
      if (!test) continue;
      questions = test.questions;
    }

    const attemptTags = new Map<string, { correct: number; total: number }>();

    for (const q of questions) {
      const userAnswer = attempt.answers[q.id] ?? "";
      const correct = checkCorrect(q, userAnswer);
      if (correct === null) continue; // skip writing prompts

      const tags = q.tags ?? [];
      if (tags.length === 0) continue;

      for (const tag of tags) {
        const existing = tagStats.get(tag) ?? { correct: 0, total: 0 };
        existing.total++;
        if (correct) existing.correct++;
        tagStats.set(tag, existing);

        const attemptExisting = attemptTags.get(tag) ?? { correct: 0, total: 0 };
        attemptExisting.total++;
        if (correct) attemptExisting.correct++;
        attemptTags.set(tag, attemptExisting);
      }
    }

    perAttemptTagResults.push(attemptTags);
  }

  // Compute trends: split attempts into first-half and second-half
  const mid = Math.floor(perAttemptTagResults.length / 2);
  const firstHalf = perAttemptTagResults.slice(0, mid);
  const secondHalf = perAttemptTagResults.slice(mid);

  function halfAccuracy(half: typeof perAttemptTagResults, tag: string): { accuracy: number; total: number } {
    let correct = 0, total = 0;
    for (const m of half) {
      const s = m.get(tag);
      if (s) { correct += s.correct; total += s.total; }
    }
    return { accuracy: total > 0 ? (correct / total) * 100 : 0, total };
  }

  return Array.from(tagStats.entries())
    .map(([tag, { correct, total }]) => {
      const accuracy = Math.round((correct / total) * 100);
      const first = halfAccuracy(firstHalf, tag);
      const second = halfAccuracy(secondHalf, tag);
      const minQuestions = 4;
      let trend: "improving" | "declining" | "stable" = "stable";
      if (first.total >= minQuestions && second.total >= minQuestions) {
        const delta = second.accuracy - first.accuracy;
        if (delta > 5) trend = "improving";
        else if (delta < -5) trend = "declining";
      }
      return {
        tag,
        correct,
        total,
        accuracy,
        strength: accuracy >= 80 ? "strong" as const : accuracy >= 60 ? "medium" as const : "weak" as const,
        trend,
        poolSize: getTagQuestionPoolSize(tag),
      };
    })
    .sort((a, b) => a.accuracy - b.accuracy); // weakest first
}

function computeSrsHealth(srsCards: Array<{ interval: number; easeFactor: number; repetitions: number; dueAt: number }>, now: number): SrsHealth {
  if (srsCards.length === 0) {
    return { totalCards: 0, dueNow: 0, mastered: 0, learning: 0, newCards: 0, avgEaseFactor: 2.5 };
  }

  let dueNow = 0;
  let mastered = 0;
  let learning = 0;
  let newCards = 0;
  let easeSum = 0;

  for (const c of srsCards) {
    if (c.dueAt <= now) dueNow++;
    if (c.interval >= 21) mastered++;
    else if (c.repetitions > 0) learning++;
    else newCards++;
    easeSum += c.easeFactor;
  }

  return {
    totalCards: srsCards.length,
    dueNow,
    mastered,
    learning,
    newCards,
    avgEaseFactor: Math.round((easeSum / srsCards.length) * 100) / 100,
  };
}

function computeVocabHealth(vocabCards: Array<{ interval: number; repetitions: number; dueAt: number; tags: string[] }>, now: number): VocabHealth {
  if (vocabCards.length === 0) {
    return { totalWords: 0, dueNow: 0, mastered: 0, learning: 0, topTags: [] };
  }

  let dueNow = 0;
  let mastered = 0;
  let learning = 0;
  const tagCounts = new Map<string, number>();

  for (const c of vocabCards) {
    if (c.dueAt <= now) dueNow++;
    if (c.interval >= 21) mastered++;
    else learning++;
    for (const tag of c.tags) {
      tagCounts.set(tag, (tagCounts.get(tag) ?? 0) + 1);
    }
  }

  const topTags = Array.from(tagCounts.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  return { totalWords: vocabCards.length, dueNow, mastered, learning, topTags };
}

function computeStudyActivity(sorted: TestAttempt[]): StudyDay[] {
  const now = new Date();
  const twelvWeeksAgo = new Date(now);
  twelvWeeksAgo.setDate(twelvWeeksAgo.getDate() - 84);

  const dayMap = new Map<string, { count: number; totalScore: number }>();

  for (const a of sorted) {
    const d = new Date(a.endTime ?? a.startTime);
    if (d < twelvWeeksAgo) continue;
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    const existing = dayMap.get(key) ?? { count: 0, totalScore: 0 };
    existing.count++;
    existing.totalScore += a.score ?? 0;
    dayMap.set(key, existing);
  }

  return Array.from(dayMap.entries())
    .map(([date, { count, totalScore }]) => ({ date, count, totalScore }))
    .sort((a, b) => a.date.localeCompare(b.date));
}

function computeStudyTime(completed: TestAttempt[]): StudyTimeStats {
  let totalTimeMs = 0;
  let totalQuestions = 0;
  let sessionsCount = 0;

  for (const a of completed) {
    if (a.endTime && a.startTime) {
      const duration = a.endTime - a.startTime;
      // Ignore sessions > 2 hours (probably left open)
      if (duration < 2 * 60 * 60 * 1000) {
        totalTimeMs += duration;
        sessionsCount++;
        totalQuestions += Object.keys(a.answers).length;
      }
    }
  }

  return {
    totalTimeMs,
    avgSessionMs: sessionsCount > 0 ? Math.round(totalTimeMs / sessionsCount) : 0,
    avgTimePerQuestion: totalQuestions > 0 ? Math.round(totalTimeMs / totalQuestions) : 0,
    sessionsCount,
  };
}
