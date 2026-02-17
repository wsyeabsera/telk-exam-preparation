import type { Test, TestCategory } from "@/types/test";
import type { Question } from "@/types/question";
import { getGeneratedTest } from "@/lib/db/operations";
import metadata from "@/data/metadata.json";
import miniTest01 from "@/data/tests/mini-test-01-dativ.json";
import miniTest02 from "@/data/tests/mini-test-02-adjectives.json";
import miniTest03 from "@/data/tests/mini-test-03-fill-blank.json";
import miniTest04 from "@/data/tests/mini-test-04-akkusativ.json";
import miniTest05 from "@/data/tests/mini-test-05-praepositionen.json";
import miniTest06 from "@/data/tests/mini-test-06-perfekt.json";
import miniTest07 from "@/data/tests/mini-test-07-praeteritum.json";
import miniTest08 from "@/data/tests/mini-test-08-modal-verbs.json";
import miniTest09 from "@/data/tests/mini-test-09-separable-verbs.json";
import miniTest10 from "@/data/tests/mini-test-10-verb-forms-mixed.json";
import miniTest11 from "@/data/tests/mini-test-11-verbs-quick.json";
import miniTest12 from "@/data/tests/mini-test-12-weil-dass.json";
import miniTest13 from "@/data/tests/mini-test-13-wenn-als.json";
import miniTest14 from "@/data/tests/mini-test-14-contrast-consequence.json";
import miniTest15 from "@/data/tests/mini-test-15-conjunctions-mixed.json";
import miniTest16 from "@/data/tests/mini-test-16-reflexive-pronouns.json";
import miniTest17 from "@/data/tests/mini-test-17-relative-pronouns.json";
import miniTest18 from "@/data/tests/mini-test-18-pronouns-mixed.json";
import miniTest19 from "@/data/tests/mini-test-19-comparatives.json";
import miniTest20 from "@/data/tests/mini-test-20-superlatives.json";
import miniTest21 from "@/data/tests/mini-test-21-passive-voice.json";
import miniTest22 from "@/data/tests/mini-test-22-passive-modal.json";
import miniTest23 from "@/data/tests/mini-test-23-konjunktiv-wuerde.json";
import miniTest24 from "@/data/tests/mini-test-24-konjunktiv-irregular.json";
import mockExam01 from "@/data/tests/mock-exam-01-reading.json";
import mockExam02 from "@/data/tests/mock-exam-02-reading.json";
import mockExam03 from "@/data/tests/mock-exam-03-reading.json";
import mockExam04 from "@/data/tests/mock-exam-04-email-job.json";
import mockExam05 from "@/data/tests/mock-exam-05-email-apartment.json";
import mockExam06 from "@/data/tests/mock-exam-06-article-learning.json";
import mockExam07 from "@/data/tests/mock-exam-07-article-health.json";
import mockExam08 from "@/data/tests/mock-exam-08-notice-library.json";
import mockExam09 from "@/data/tests/mock-exam-09-ad-language.json";
import mockExam10 from "@/data/tests/mock-exam-10-article-recycling.json";
import mockExam11 from "@/data/tests/mock-exam-11-email-feedback.json";
import mockExam12 from "@/data/tests/mock-exam-12-article-transport.json";
import mockExam13 from "@/data/tests/mock-exam-13-email-course-cancellation.json";
import mockExam14 from "@/data/tests/mock-exam-14-ad-gym.json";
import mockExam15 from "@/data/tests/mock-exam-15-job-posting.json";
import mockExam16 from "@/data/tests/mock-exam-16-travel-info.json";
import mockExam17 from "@/data/tests/mock-exam-17-blog-post.json";
import mockExam18 from "@/data/tests/mock-exam-18-product-review.json";
import mockExam19 from "@/data/tests/mock-exam-19-event-invitation.json";
import miniTest25 from "@/data/tests/mini-test-25-genitiv.json";
import miniTest26 from "@/data/tests/mini-test-26-futur-i.json";
import miniTest27 from "@/data/tests/mini-test-27-infinitive-zu.json";
import miniTest28 from "@/data/tests/mini-test-28-two-part-conjunctions.json";
import miniTest29 from "@/data/tests/mini-test-29-demonstrative-pronouns.json";
import miniTest30 from "@/data/tests/mini-test-30-possessive-pronouns.json";
import miniTest31 from "@/data/tests/mini-test-31-time-expressions.json";
import miniTest32 from "@/data/tests/mini-test-32-negation.json";
import miniTest33 from "@/data/tests/mini-test-33-impersonal.json";
import quickTest01 from "@/data/tests/quick-test-01-dativ-akkusativ.json";
import quickTest02 from "@/data/tests/quick-test-02-adjective-endings.json";
import quickTest03 from "@/data/tests/quick-test-03-word-order.json";
import quickTest04 from "@/data/tests/quick-test-04-prepositions-location.json";
import quickTest05 from "@/data/tests/quick-test-05-common-mistakes.json";
import writingPractice01 from "@/data/tests/writing-practice-01.json";
import writingPractice02 from "@/data/tests/writing-practice-02.json";
import writingPractice03 from "@/data/tests/writing-practice-03.json";
import writingPractice04 from "@/data/tests/writing-practice-04.json";
import listeningTest01 from "@/data/tests/listening-test-01.json";
import listeningTest02 from "@/data/tests/listening-test-02.json";
import listeningTest03 from "@/data/tests/listening-test-03.json";
import listeningTest04 from "@/data/tests/listening-test-04.json";
import listeningTest05 from "@/data/tests/listening-test-05.json";
import practiceExam01 from "@/data/tests/practice-exam-01.json";
import practiceExam02 from "@/data/tests/practice-exam-02.json";
import practiceExam03 from "@/data/tests/practice-exam-03.json";
import practiceExam04 from "@/data/tests/practice-exam-04.json";
import practiceExam05 from "@/data/tests/practice-exam-05.json";

const testMap: Record<string, Test> = {
  "mini-test-01-dativ": miniTest01 as Test,
  "mini-test-02-adjectives": miniTest02 as Test,
  "mini-test-03-fill-blank": miniTest03 as Test,
  "mini-test-04-akkusativ": miniTest04 as Test,
  "mini-test-05-praepositionen": miniTest05 as Test,
  "mini-test-06-perfekt": miniTest06 as Test,
  "mini-test-07-praeteritum": miniTest07 as Test,
  "mini-test-08-modal-verbs": miniTest08 as Test,
  "mini-test-09-separable-verbs": miniTest09 as Test,
  "mini-test-10-verb-forms-mixed": miniTest10 as Test,
  "mini-test-11-verbs-quick": miniTest11 as Test,
  "mini-test-12-weil-dass": miniTest12 as Test,
  "mini-test-13-wenn-als": miniTest13 as Test,
  "mini-test-14-contrast-consequence": miniTest14 as Test,
  "mini-test-15-conjunctions-mixed": miniTest15 as Test,
  "mini-test-16-reflexive-pronouns": miniTest16 as Test,
  "mini-test-17-relative-pronouns": miniTest17 as Test,
  "mini-test-18-pronouns-mixed": miniTest18 as Test,
  "mini-test-19-comparatives": miniTest19 as Test,
  "mini-test-20-superlatives": miniTest20 as Test,
  "mini-test-21-passive-voice": miniTest21 as Test,
  "mini-test-22-passive-modal": miniTest22 as Test,
  "mini-test-23-konjunktiv-wuerde": miniTest23 as Test,
  "mini-test-24-konjunktiv-irregular": miniTest24 as Test,
  "mock-exam-01-reading": mockExam01 as Test,
  "mock-exam-02-reading": mockExam02 as Test,
  "mock-exam-03-reading": mockExam03 as Test,
  "mock-exam-04-email-job": mockExam04 as Test,
  "mock-exam-05-email-apartment": mockExam05 as Test,
  "mock-exam-06-article-learning": mockExam06 as Test,
  "mock-exam-07-article-health": mockExam07 as Test,
  "mock-exam-08-notice-library": mockExam08 as Test,
  "mock-exam-09-ad-language": mockExam09 as Test,
  "mock-exam-10-article-recycling": mockExam10 as Test,
  "mock-exam-11-email-feedback": mockExam11 as Test,
  "mock-exam-12-article-transport": mockExam12 as Test,
  "mock-exam-13-email-course-cancellation": mockExam13 as Test,
  "mock-exam-14-ad-gym": mockExam14 as Test,
  "mock-exam-15-job-posting": mockExam15 as Test,
  "mock-exam-16-travel-info": mockExam16 as Test,
  "mock-exam-17-blog-post": mockExam17 as Test,
  "mock-exam-18-product-review": mockExam18 as Test,
  "mock-exam-19-event-invitation": mockExam19 as Test,
  "mini-test-25-genitiv": miniTest25 as Test,
  "mini-test-26-futur-i": miniTest26 as Test,
  "mini-test-27-infinitive-zu": miniTest27 as Test,
  "mini-test-28-two-part-conjunctions": miniTest28 as Test,
  "mini-test-29-demonstrative-pronouns": miniTest29 as Test,
  "mini-test-30-possessive-pronouns": miniTest30 as Test,
  "mini-test-31-time-expressions": miniTest31 as Test,
  "mini-test-32-negation": miniTest32 as Test,
  "mini-test-33-impersonal": miniTest33 as Test,
  "quick-test-01-dativ-akkusativ": quickTest01 as Test,
  "quick-test-02-adjective-endings": quickTest02 as Test,
  "quick-test-03-word-order": quickTest03 as Test,
  "quick-test-04-prepositions-location": quickTest04 as Test,
  "quick-test-05-common-mistakes": quickTest05 as Test,
  "writing-practice-01": writingPractice01 as Test,
  "writing-practice-02": writingPractice02 as Test,
  "writing-practice-03": writingPractice03 as Test,
  "writing-practice-04": writingPractice04 as Test,
  "listening-test-01": listeningTest01 as Test,
  "listening-test-02": listeningTest02 as Test,
  "listening-test-03": listeningTest03 as Test,
  "listening-test-04": listeningTest04 as Test,
  "listening-test-05": listeningTest05 as Test,
  "practice-exam-01": practiceExam01 as Test,
  "practice-exam-02": practiceExam02 as Test,
  "practice-exam-03": practiceExam03 as Test,
  "practice-exam-04": practiceExam04 as Test,
  "practice-exam-05": practiceExam05 as Test,
};

const SUPER_SHORT_SIZE = 10;

export const QUICK_PRACTICE_IDS = [
  "super-short",
  "super-short-reading",
  "super-short-grammar",
  "super-short-writing",
  "super-short-verbs",
  "super-short-cases",
  "super-short-conjunctions",
  "super-short-pronouns",
  "super-short-adjectives",
] as const;

export type QuickPracticeVariant =
  | "mixed"
  | "reading"
  | "grammar"
  | "writing"
  | "verbs"
  | "cases"
  | "conjunctions"
  | "pronouns"
  | "adjectives";

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
    description: "5 short writing prompts with model answers",
    questionCount: 5,
    duration: 15,
  },
  {
    id: "super-short-verbs",
    variant: "verbs",
    title: "Super short – Verbs",
    description: "10 random verb questions (Perfekt, Präteritum, modal, separable)",
    questionCount: 10,
    duration: 10,
  },
  {
    id: "super-short-cases",
    variant: "cases",
    title: "Super short – Cases",
    description: "10 random questions on Dativ, Akkusativ, and cases",
    questionCount: 10,
    duration: 10,
  },
  {
    id: "super-short-conjunctions",
    variant: "conjunctions",
    title: "Super short – Conjunctions",
    description: "10 random conjunction questions (weil, dass, wenn, als, obwohl)",
    questionCount: 10,
    duration: 10,
  },
  {
    id: "super-short-pronouns",
    variant: "pronouns",
    title: "Super short – Pronouns",
    description: "10 random pronoun questions (reflexive, relative, personal)",
    questionCount: 10,
    duration: 10,
  },
  {
    id: "super-short-adjectives",
    variant: "adjectives",
    title: "Super short – Adjectives",
    description: "10 random adjective questions (endings, comparatives, superlatives)",
    questionCount: 10,
    duration: 10,
  },
];

export function isQuickPracticeTestId(testId: string): boolean {
  return (QUICK_PRACTICE_IDS as readonly string[]).includes(testId);
}

export function getQuickPracticeConfig(testId: string): QuickPracticeEntry | null {
  return quickPracticeConfig.find((e) => e.id === testId) ?? null;
}

export async function getTest(id: string): Promise<Test | null> {
  const staticTest = testMap[id];
  if (staticTest) return staticTest;
  if (id.startsWith("ai-test-")) {
    return await getGeneratedTest(id);
  }
  return null;
}

/** Returns how many questions to use per attempt, or null to use all questions. */
export function getQuestionsPerAttempt(testId: string): number | null {
  const entry = metadata.tests.find((t: { id: string; questionsPerAttempt?: number }) => t.id === testId);
  return entry?.questionsPerAttempt ?? null;
}

/** Randomly select up to `count` unique questions from a test. Deduplicates by question text so cloned questions are not repeated. */
export async function getTestWithRandomSubset(
  testId: string,
  count: number
): Promise<Question[]> {
  const test = await getTest(testId);
  if (!test) return [];
  const seenText = new Set<string>();
  const unique: Question[] = [];
  for (const q of test.questions) {
    if (seenText.has(q.text)) continue;
    seenText.add(q.text);
    unique.push(q);
  }
  const shuffled = [...unique].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
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
    pool = getQuestions((f) => 
      f === "Dativ" || 
      f === "Adjective Endings" || 
      f === "Akkusativ" || 
      f === "Präpositionen" || 
      f === "Verbs" || 
      f === "Conjunctions" || 
      f === "Pronouns" || 
      f === "Comparatives" || 
      f === "Passive" || 
      f === "Konjunktiv II" || 
      f === "Cases" || 
      f === "Adjectives" || 
      f === "Word Order" || 
      f === "Prepositions" || 
      f === "Vocabulary"
    );
  } else if (variant === "writing") {
    pool = getQuestions((f) => f === "Writing");
  } else if (variant === "verbs") {
    pool = getQuestions((f) => f === "Verbs");
  } else if (variant === "cases") {
    pool = getQuestions((f) => f === "Dativ" || f === "Akkusativ" || f === "Cases");
  } else if (variant === "conjunctions") {
    pool = getQuestions((f) => f === "Conjunctions");
  } else if (variant === "pronouns") {
    pool = getQuestions((f) => f === "Pronouns");
  } else if (variant === "adjectives") {
    pool = getQuestions((f) => f === "Adjectives" || f === "Adjective Endings" || f === "Comparatives");
  } else {
    return [];
  }
  // Deduplicate by question text so cloned questions are not repeated
  const seenText = new Set<string>();
  const unique: Question[] = [];
  for (const q of pool) {
    if (seenText.has(q.text)) continue;
    seenText.add(q.text);
    unique.push(q);
  }
  const shuffled = [...unique].sort(() => Math.random() - 0.5);
  const count = Math.min(SUPER_SHORT_SIZE, shuffled.length);
  const picked = shuffled.slice(0, count);
  return picked.map((q, i) => ({ ...q, id: `ss-${i + 1}` }));
}

/** Display title for a test id (quick-practice or regular test). Sync for static/quick; AI-generated ids return a placeholder. */
export function getTestTitle(testId: string): string {
  const qp = getQuickPracticeConfig(testId);
  if (qp) return qp.title;
  if (testId.startsWith("ai-test-")) return "AI-generated practice";
  const test = testMap[testId];
  return test?.title ?? testId;
}

/** Category for a test id. Sync; used for history badges and filters. */
export function getTestCategory(testId: string): TestCategory {
  if (getQuickPracticeConfig(testId)) return "practice";
  if (testId.startsWith("ai-test-")) return "ai-generated";
  const test = testMap[testId];
  return (test?.category as TestCategory) ?? "grammar";
}
