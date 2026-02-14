import Link from "next/link";
import { getMetadata } from "@/lib/data/load-tests";
import { TestCard } from "@/components/dashboard/TestCard";
import { StatsOverview } from "@/components/dashboard/StatsOverview";

export default function HomePage() {
  const metadata = getMetadata();
  const tests = metadata.tests;

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="max-w-4xl mx-auto p-4 md:p-6">
        <header className="mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
                German B1 Test Generator
              </h1>
              <p className="text-zinc-600 dark:text-zinc-300 mt-1">
                Practice for your telc B1 exam
              </p>
            </div>
            <nav className="flex gap-4 text-sm font-medium">
              <span className="text-amber-600 dark:text-amber-400">Tests</span>
              <Link
                href="/history"
                className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
              >
                History
              </Link>
            </nav>
          </div>
        </header>

        <StatsOverview />

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
            Quick practice
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <TestCard
              id="super-short"
              title="Super short"
              description="10 random questions from all tests"
              duration={10}
              questionCount={10}
              focus="Mixed"
              category="practice"
            />
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
            Full tests
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {tests.map(
              (
                t: {
                  id: string;
                  title: string;
                  description: string;
                  duration?: number;
                  questionCount: number;
                  category: string;
                  focus?: string;
                }
              ) => (
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
              )
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
