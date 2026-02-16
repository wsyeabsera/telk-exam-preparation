"use client";

import { useState, useMemo } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Tabs";
import { SearchBar } from "@/components/dashboard/SearchBar";
import { TestCard } from "@/components/dashboard/TestCard";
import type { QuickPracticeEntry } from "@/lib/data/load-tests";

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
const TAB_MINI_TEST = "mini-test";
const TAB_MOCK_EXAM = "mock-exam";
const TAB_LISTENING = "listening";
const TAB_QUICK_TEST = "quick-test";

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

  const miniTests = useMemo(
    () => tests.filter((t) => t.category === "mini-test"),
    [tests]
  );
  const mockExams = useMemo(
    () => tests.filter((t) => t.category === "mock-exam"),
    [tests]
  );
  const listeningTests = useMemo(
    () => tests.filter((t) => t.category === "listening-test"),
    [tests]
  );
  const quickTests = useMemo(
    () => tests.filter((t) => t.category === "quick-test"),
    [tests]
  );

  const searchResults = useMemo(() => {
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
    for (const t of tests) {
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
  }, [searchQuery, quickPracticeConfig, tests]);

  const isSearchActive = searchQuery.trim().length > 0;

  return (
    <>
      <div className="mb-4">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
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
            <TabsTrigger value={TAB_QUICK_PRACTICE}>Quick Practice</TabsTrigger>
            <TabsTrigger value={TAB_MINI_TEST}>Mini Tests</TabsTrigger>
            <TabsTrigger value={TAB_MOCK_EXAM}>Mock Exams</TabsTrigger>
            <TabsTrigger value={TAB_LISTENING}>Listening</TabsTrigger>
            <TabsTrigger value={TAB_QUICK_TEST}>Quick Tests</TabsTrigger>
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

          <TabsContent value={TAB_MINI_TEST}>
            <div className="grid gap-4 sm:grid-cols-2">
              {miniTests.map((t) => (
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

          <TabsContent value={TAB_MOCK_EXAM}>
            <div className="grid gap-4 sm:grid-cols-2">
              {mockExams.map((t) => (
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
        </Tabs>
      )}
    </>
  );
}
