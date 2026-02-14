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

export function getTest(id: string): Test | null {
  return testMap[id] ?? null;
}

export function getTestIds(): string[] {
  return metadata.tests.map((t: { id: string }) => t.id);
}

export function getMetadata(): { tests: Array<{ id: string; title: string; description: string; duration?: number; questionCount: number; category: string; focus?: string }> } {
  return metadata;
}

/** All questions from all tests (with unique ids by prefixing test id) */
function getAllQuestions(): Question[] {
  const out: Question[] = [];
  for (const test of Object.values(testMap)) {
    for (const q of test.questions) {
      out.push({ ...q, id: `${test.id}-${q.id}` });
    }
  }
  return out;
}

/** Pick 10 random questions from all tests. Each question gets a unique id for the attempt. */
export function getSuperShortQuestions(): Question[] {
  const pool = getAllQuestions();
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  const picked = shuffled.slice(0, SUPER_SHORT_SIZE);
  return picked.map((q, i) => ({ ...q, id: `ss-${i + 1}` }));
}
