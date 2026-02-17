"use client";

import type { VocabCard } from "@/lib/db/schema";

interface FlashCardProps {
  card: VocabCard;
  isFlipped: boolean;
  onFlip: () => void;
}

export function FlashCard({ card, isFlipped, onFlip }: FlashCardProps) {
  return (
    <div
      className="flashcard-scene w-full cursor-pointer"
      style={{ height: 280 }}
      onClick={onFlip}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onFlip();
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={isFlipped ? "Show German word" : "Reveal translation"}
    >
      <div className={`flashcard-inner ${isFlipped ? "is-flipped" : ""}`}>
        {/* Front */}
        <div className="flashcard-face flex flex-col items-center justify-center rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-6">
          <p className="text-3xl font-bold text-amber-600 dark:text-amber-400 mb-4 text-center">
            {card.word}
          </p>
          {card.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-4 justify-center">
              {card.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 text-xs rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          <p className="text-sm text-zinc-400 dark:text-zinc-500">
            Tap to reveal
          </p>
        </div>

        {/* Back */}
        <div className="flashcard-face flashcard-back flex flex-col items-center justify-center rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-6">
          <p className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3 text-center">
            {card.translation}
          </p>
          {card.exampleSentence && (
            <p className="text-sm text-zinc-500 dark:text-zinc-400 italic text-center">
              {card.exampleSentence}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
