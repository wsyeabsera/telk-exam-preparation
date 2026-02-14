import type { Test } from "@/types/test";
import type { Question } from "@/types/question";
import metadata from "@/data/metadata.json";
import miniTest01 from "@/data/tests/mini-test-01-dativ.json";
import miniTest02 from "@/data/tests/mini-test-02-adjectives.json";
import mockExam01 from "@/data/tests/mock-exam-01-reading.json";
import mockExam02 from "@/data/tests/mock-exam-02-reading.json";

const testMap: Record<string, Test> = {
  "mini-test-01-dativ": miniTest01 as Test,
  "mini-test-02-adjectives": miniTest02 as Test,
  "mock-exam-01-reading": mockExam01 as Test,
  "mock-exam-02-reading": mockExam02 as Test,
};

const SUPER_SHORT_SIZE = 10;

export const QUICK_PRACTICE_IDS = [
  "super-short",
  "super-short-reading",
  "super-short-grammar",
  "super-short-writing",
] as const;

export type QuickPracticeVariant = "mixed" | "reading" | "grammar" | "writing";

export interface QuickPracticeEntry {
  id: string;
  variant: QuickPracticeVariant;
  title: string;
  description: string;
  questionCount: number;
  duration: number;
}

export const quickPracticeConfig: QuickPracticeEntry[] = [
  {
    id: "super-short",
    variant: "mixed",
    title: "Super short",
    description: "10 random questions from all tests",
    questionCount: 10,
    duration: 10,
  },
  {
    id: "super-short-reading",
    variant: "reading",
    title: "Super short – Reading",
    description: "10 random reading questions",
    questionCount: 10,
    duration: 10,
  },
  {
    id: "super-short-grammar",
    variant: "grammar",
    title: "Super short – Grammar",
    description: "10 random grammar questions",
    questionCount: 10,
    duration: 10,
  },
  {
    id: "super-short-writing",
    variant: "writing",
    title: "Super short – Writing",
    description: "Coming soon",
    questionCount: 0,
    duration: 5,
  },
];

export function isQuickPracticeTestId(testId: string): boolean {
  return (QUICK_PRACTICE_IDS as readonly string[]).includes(testId);
}

export function getQuickPracticeConfig(testId: string): QuickPracticeEntry | null {
  return quickPracticeConfig.find((e) => e.id === testId) ?? null;
}

export function getTest(id: string): Test | null {
  return testMap[id] ?? null;
}

export function getTestIds(): string[] {
  return metadata.tests.map((t: { id: string }) => t.id);
}

export function getMetadata(): { tests: Array<{ id: string; title: string; description: string; duration?: number; questionCount: number; category: string; focus?: string }> } {
  return metadata;
}

/** Questions from tests (with unique ids by prefixing test id). Optional filter by focus. */
function getQuestions(focusFilter?: (focus: string | undefined) => boolean): Question[] {
  const out: Question[] = [];
  for (const test of Object.values(testMap)) {
    if (focusFilter && !focusFilter(test.focus)) continue;
    for (const q of test.questions) {
      out.push({ ...q, id: `${test.id}-${q.id}` });
    }
  }
  return out;
}

/** Pick up to SUPER_SHORT_SIZE random questions by variant. Each gets id ss-1, ss-2, ... */
export function getSuperShortQuestions(variant: QuickPracticeVariant): Question[] {
  let pool: Question[];
  if (variant === "mixed") {
    pool = getQuestions();
  } else if (variant === "reading") {
    pool = getQuestions((f) => f === "Reading");
  } else if (variant === "grammar") {
    pool = getQuestions((f) => f === "Dativ" || f === "Adjective Endings");
  } else {
    return [];
  }
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  const count = Math.min(SUPER_SHORT_SIZE, shuffled.length);
  const picked = shuffled.slice(0, count);
  return picked.map((q, i) => ({ ...q, id: `ss-${i + 1}` }));
}

/** Display title for a test id (quick-practice or regular test). */
export function getTestTitle(testId: string): string {
  const qp = getQuickPracticeConfig(testId);
  if (qp) return qp.title;
  const test = getTest(testId);
  return test?.title ?? testId;
}
