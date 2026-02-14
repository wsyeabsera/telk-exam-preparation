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
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
            German B1 Test Generator
          </h1>
          <p className="text-zinc-600 dark:text-zinc-300 mt-1">
            Practice for your telc B1 exam
          </p>
        </header>

        <StatsOverview />

        <section>
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
            Available tests
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
