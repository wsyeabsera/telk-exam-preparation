"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Tabs";
import { SearchBar } from "@/components/dashboard/SearchBar";
import { TestCard } from "@/components/dashboard/TestCard";
import type { QuickPracticeEntry } from "@/lib/data/load-tests";
import { getAllGeneratedTests } from "@/lib/db/operations";
import type { Test } from "@/types/test";

const variantToFocus: Record<string, string> = {
  mixed: "Mixed",
  reading: "Reading",
  grammar: "Grammar",
  writing: "Writing",
  verbs: "Verbs",
  cases: "Cases",
  conjunctions: "Conjunctions",
  pronouns: "Pronouns",
  adjectives: "Adjectives",
};

const GENERAL_QUICK_VARIANTS = ["mixed", "reading", "grammar", "writing"] as const;
const TOPIC_QUICK_VARIANTS = ["verbs", "cases", "conjunctions", "pronouns", "adjectives"] as const;

export interface MetadataTest {
  id: string;
  title: string;
  description: string;
  duration?: number;
  questionCount: number;
  category: string;
  focus?: string;
}

interface DashboardContentProps {
  tests: MetadataTest[];
  quickPracticeConfig: QuickPracticeEntry[];
}

const TAB_QUICK_PRACTICE = "quick-practice";
const TAB_GRAMMAR = "grammar";
const TAB_READING = "reading";
const TAB_LISTENING = "listening";
const TAB_WRITING = "writing";
const TAB_PRACTICE_EXAM = "practice-exam";
const TAB_QUICK_TEST = "quick-test";
const TAB_AI_GENERATED = "ai-generated";

function normalizeForSearch(s: string): string {
  return s.toLowerCase().trim();
}

function matchesSearch(
  query: string,
  title: string,
  description: string,
  focus?: string
): boolean {
  const q = normalizeForSearch(query);
  if (!q) return true;
  const titleN = normalizeForSearch(title);
  const descN = normalizeForSearch(description);
  const focusN = focus ? normalizeForSearch(focus) : "";
  return (
    titleN.includes(q) || descN.includes(q) || focusN.includes(q)
  );
}

export function DashboardContent({
  tests,
  quickPracticeConfig,
}: DashboardContentProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState(TAB_QUICK_PRACTICE);
  const [aiGeneratedTests, setAiGeneratedTests] = useState<Test[]>([]);

  useEffect(() => {
    getAllGeneratedTests().then(setAiGeneratedTests);
  }, []);

  const quickPracticeGeneral = useMemo(
    () =>
      quickPracticeConfig.filter((entry) =>
        GENERAL_QUICK_VARIANTS.includes(entry.variant as (typeof GENERAL_QUICK_VARIANTS)[number])
      ),
    [quickPracticeConfig]
  );
  const quickPracticeTopic = useMemo(
    () =>
      quickPracticeConfig.filter((entry) =>
        TOPIC_QUICK_VARIANTS.includes(entry.variant as (typeof TOPIC_QUICK_VARIANTS)[number])
      ),
    [quickPracticeConfig]
  );

  const grammarTests = useMemo(
    () => tests.filter((t) => t.category === "grammar"),
    [tests]
  );
  const readingTests = useMemo(
    () => tests.filter((t) => t.category === "mock-exam"),
    [tests]
  );
  const listeningTests = useMemo(
    () => tests.filter((t) => t.category === "listening-test"),
    [tests]
  );
  const writingTests = useMemo(
    () => tests.filter((t) => t.category === "writing-practice"),
    [tests]
  );
  const quickTests = useMemo(
    () => tests.filter((t) => t.category === "quick-test"),
    [tests]
  );
  const practiceExams = useMemo(
    () => tests.filter((t) => t.category === "practice-exam"),
    [tests]
  );

  const searchResults = useMemo(() => {
    const allTests = [...tests, ...aiGeneratedTests.map((t) => ({
      id: t.id,
      title: t.title,
      description: t.description,
      duration: t.duration,
      questionCount: t.questions.length,
      category: t.category,
      focus: t.focus,
    }))];
    if (!searchQuery.trim()) return null;
    const q = searchQuery.trim();
    const results: Array<{
      key: string;
      category: string;
      card: React.ReactNode;
    }> = [];
    for (const entry of quickPracticeConfig) {
      const focus = variantToFocus[entry.variant];
      if (matchesSearch(q, entry.title, entry.description, focus)) {
        results.push({
          key: entry.id,
          category: "practice",
          card: (
            <TestCard
              id={entry.id}
              title={entry.title}
              description={entry.description}
              duration={entry.duration}
              questionCount={entry.questionCount}
              focus={focus}
              category="practice"
              comingSoon={entry.questionCount === 0}
              showCategory
            />
          ),
        });
      }
    }
    for (const t of allTests) {
      if (matchesSearch(q, t.title, t.description, t.focus)) {
        results.push({
          key: t.id,
          category: t.category,
          card: (
            <TestCard
              id={t.id}
              title={t.title}
              description={t.description}
              duration={t.duration}
              questionCount={t.questionCount}
              focus={t.focus}
              category={t.category}
              showCategory
            />
          ),
        });
      }
    }
    return results;
  }, [searchQuery, quickPracticeConfig, tests, aiGeneratedTests]);

  const isSearchActive = searchQuery.trim().length > 0;

  return (
    <>
      <div className="mb-4 flex gap-3 items-center">
        <div className="flex-1">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>
        <Link
          href="/test/super-short"
          className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg bg-amber-500 hover:bg-amber-600 text-white transition-colors"
        >
          Random Practice
        </Link>
      </div>

      {isSearchActive ? (
        <section>
          {searchResults && searchResults.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2">
              {searchResults.map(({ key, card }) => (
                <div key={key}>{card}</div>
              ))}
            </div>
          ) : (
            <p className="text-zinc-500 dark:text-zinc-400 py-8 text-center">
              No tests found matching &quot;{searchQuery.trim()}&quot;
            </p>
          )}
        </section>
      ) : (
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value={TAB_QUICK_PRACTICE}>Quick Practice ({quickPracticeConfig.length})</TabsTrigger>
            <TabsTrigger value={TAB_GRAMMAR}>Grammar ({grammarTests.length})</TabsTrigger>
            <TabsTrigger value={TAB_READING}>Reading ({readingTests.length})</TabsTrigger>
            <TabsTrigger value={TAB_LISTENING}>Listening ({listeningTests.length})</TabsTrigger>
            <TabsTrigger value={TAB_WRITING}>Writing ({writingTests.length})</TabsTrigger>
            <TabsTrigger value={TAB_PRACTICE_EXAM}>Practice Exams ({practiceExams.length})</TabsTrigger>
            <TabsTrigger value={TAB_QUICK_TEST}>Quick Tests ({quickTests.length})</TabsTrigger>
            <TabsTrigger value={TAB_AI_GENERATED}>AI-Generated ({aiGeneratedTests.length})</TabsTrigger>
          </TabsList>

          <TabsContent value={TAB_QUICK_PRACTICE}>
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100 mb-3">
                  General
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  {quickPracticeGeneral.map((entry) => (
                    <TestCard
                      key={entry.id}
                      id={entry.id}
                      title={entry.title}
                      description={entry.description}
                      duration={entry.duration}
                      questionCount={entry.questionCount}
                      focus={variantToFocus[entry.variant]}
                      category="practice"
                      comingSoon={entry.questionCount === 0}
                    />
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100 mb-3">
                  By topic
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  {quickPracticeTopic.map((entry) => (
                    <TestCard
                      key={entry.id}
                      id={entry.id}
                      title={entry.title}
                      description={entry.description}
                      duration={entry.duration}
                      questionCount={entry.questionCount}
                      focus={variantToFocus[entry.variant]}
                      category="practice"
                      comingSoon={entry.questionCount === 0}
                    />
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value={TAB_GRAMMAR}>
            <div className="grid gap-4 sm:grid-cols-2">
              {grammarTests.map((t) => (
                <TestCard
                  key={t.id}
                  id={t.id}
                  title={t.title}
                  description={t.description}
                  duration={t.duration}
                  questionCount={t.questionCount}
                  focus={t.focus}
                  category={t.category}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value={TAB_READING}>
            <div className="grid gap-4 sm:grid-cols-2">
              {readingTests.map((t) => (
                <TestCard
                  key={t.id}
                  id={t.id}
                  title={t.title}
                  description={t.description}
                  duration={t.duration}
                  questionCount={t.questionCount}
                  focus={t.focus}
                  category={t.category}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value={TAB_WRITING}>
            <div className="grid gap-4 sm:grid-cols-2">
              {writingTests.map((t) => (
                <TestCard
                  key={t.id}
                  id={t.id}
                  title={t.title}
                  description={t.description}
                  duration={t.duration}
                  questionCount={t.questionCount}
                  focus={t.focus}
                  category={t.category}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value={TAB_LISTENING}>
            <div className="grid gap-4 sm:grid-cols-2">
              {listeningTests.map((t) => (
                <TestCard
                  key={t.id}
                  id={t.id}
                  title={t.title}
                  description={t.description}
                  duration={t.duration}
                  questionCount={t.questionCount}
                  focus={t.focus}
                  category={t.category}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value={TAB_PRACTICE_EXAM}>
            <div className="grid gap-4 sm:grid-cols-2">
              {practiceExams.map((t) => (
                <TestCard
                  key={t.id}
                  id={t.id}
                  title={t.title}
                  description={t.description}
                  duration={t.duration}
                  questionCount={t.questionCount}
                  focus={t.focus}
                  category={t.category}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value={TAB_QUICK_TEST}>
            <div className="grid gap-4 sm:grid-cols-2">
              {quickTests.map((t) => (
                <TestCard
                  key={t.id}
                  id={t.id}
                  title={t.title}
                  description={t.description}
                  duration={t.duration}
                  questionCount={t.questionCount}
                  focus={t.focus}
                  category={t.category}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value={TAB_AI_GENERATED}>
            {aiGeneratedTests.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2">
                {aiGeneratedTests.map((t) => (
                  <TestCard
                    key={t.id}
                    id={t.id}
                    title={t.title}
                    description={t.description}
                    duration={t.duration}
                    questionCount={t.questions.length}
                    focus={t.focus}
                    category="ai-generated"
                    showCategory
                  />
                ))}
              </div>
            ) : (
              <p className="text-zinc-500 dark:text-zinc-400 py-8 text-center">
                No AI-generated tests yet. Complete a test, get AI insights, then
                use &quot;Generate Practice Test&quot; on the results page.
              </p>
            )}
          </TabsContent>
        </Tabs>
      )}
    </>
  );
}
