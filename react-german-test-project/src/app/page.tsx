import Link from "next/link";
import { getMetadata, quickPracticeConfig } from "@/lib/data/load-tests";
import { DashboardHero } from "@/components/dashboard/DashboardHero";
import { DashboardContent } from "@/components/dashboard/DashboardContent";

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
                href="/flashcards"
                className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
              >
                Flashcards
              </Link>
              <Link
                href="/history"
                className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
              >
                History
              </Link>
            </nav>
          </div>
        </header>

        <DashboardHero />

        <DashboardContent tests={tests} quickPracticeConfig={quickPracticeConfig} />
      </div>
    </div>
  );
}
