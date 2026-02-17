"use client";

import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import type { SrsHealth, VocabHealth } from "@/hooks/useProgressData";

interface LearningHealthProps {
  srs: SrsHealth;
  vocab: VocabHealth;
}

function Ring({ value, max, color, size = 64 }: { value: number; max: number; color: string; size?: number }) {
  const r = (size - 8) / 2;
  const circumference = 2 * Math.PI * r;
  const pct = max > 0 ? value / max : 0;
  const offset = circumference * (1 - pct);

  return (
    <svg width={size} height={size} className="shrink-0">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="currentColor"
        strokeOpacity={0.1}
        strokeWidth={6}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth={6}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
      <text
        x={size / 2}
        y={size / 2}
        textAnchor="middle"
        dy="0.35em"
        className="fill-current text-zinc-900 dark:text-zinc-100"
        fontSize={14}
        fontWeight={700}
      >
        {max > 0 ? Math.round(pct * 100) : 0}%
      </text>
    </svg>
  );
}

function StatBlock({ label, value, sub }: { label: string; value: number | string; sub?: string }) {
  return (
    <div className="text-center">
      <p className="text-lg font-bold text-zinc-900 dark:text-zinc-100">{value}</p>
      <p className="text-xs text-zinc-500 dark:text-zinc-400">{label}</p>
      {sub && <p className="text-xs text-zinc-400 dark:text-zinc-500">{sub}</p>}
    </div>
  );
}

export function LearningHealth({ srs, vocab }: LearningHealthProps) {
  const hasSrs = srs.totalCards > 0;
  const hasVocab = vocab.totalWords > 0;

  if (!hasSrs && !hasVocab) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Learning Health</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Complete tests to build your SRS deck, and use{" "}
            <Link href="/flashcards" className="text-amber-600 dark:text-amber-400 hover:underline">
              Flashcards
            </Link>{" "}
            to grow your vocabulary.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Learning Health</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          {/* SRS Section */}
          {hasSrs && (
            <div>
              <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-3">
                SRS Review Cards
              </p>
              <div className="flex items-center gap-4">
                <Ring value={srs.mastered} max={srs.totalCards} color="#10b981" />
                <div className="flex-1 grid grid-cols-3 gap-2">
                  <StatBlock label="Mastered" value={srs.mastered} />
                  <StatBlock label="Learning" value={srs.learning} />
                  <StatBlock label="New" value={srs.newCards} />
                </div>
              </div>
              {srs.dueNow > 0 && (
                <Link
                  href="/test/review"
                  className="mt-2 inline-block text-xs text-amber-600 dark:text-amber-400 hover:underline"
                >
                  {srs.dueNow} cards due for review &rarr;
                </Link>
              )}
            </div>
          )}

          {/* Vocab Section */}
          {hasVocab && (
            <div>
              <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-3">
                Vocabulary
              </p>
              <div className="flex items-center gap-4">
                <Ring value={vocab.mastered} max={vocab.totalWords} color="#a855f7" />
                <div className="flex-1">
                  <div className="grid grid-cols-3 gap-2">
                    <StatBlock label="Mastered" value={vocab.mastered} />
                    <StatBlock label="Learning" value={vocab.learning} />
                    <StatBlock label="Total" value={vocab.totalWords} />
                  </div>
                  {vocab.topTags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {vocab.topTags.map((t) => (
                        <span
                          key={t.tag}
                          className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400"
                        >
                          {t.tag} ({t.count})
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              {vocab.dueNow > 0 && (
                <Link
                  href="/flashcards"
                  className="mt-2 inline-block text-xs text-amber-600 dark:text-amber-400 hover:underline"
                >
                  {vocab.dueNow} words due for review &rarr;
                </Link>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
