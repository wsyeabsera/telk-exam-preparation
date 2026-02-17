"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import type { VocabCard } from "@/lib/db/schema";
import {
  getAllVocabCards,
  getDueVocabCards,
  getAllVocabTags,
  reviewVocabCard,
  deleteVocabCard,
  addVocabCard,
} from "@/lib/vocab/operations";
import { Button } from "@/components/ui/Button";
import { FlashCard } from "@/components/flashcards/FlashCard";
import { AddWordModal } from "@/components/flashcards/AddWordModal";

type TabFilter = "all" | "due" | "new" | "mastered";

function isNew(card: VocabCard) {
  return card.repetitions === 0;
}

function isMastered(card: VocabCard) {
  return card.repetitions >= 3 && card.interval >= 21;
}

export default function FlashcardsPage() {
  const [allCards, setAllCards] = useState<VocabCard[]>([]);
  const [dueCards, setDueCards] = useState<VocabCard[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<TabFilter>("all");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const loadCards = useCallback(async () => {
    const [all, due, allTags] = await Promise.all([
      getAllVocabCards(),
      getDueVocabCards(100),
      getAllVocabTags(),
    ]);
    setAllCards(all);
    setDueCards(due);
    setTags(allTags);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadCards();
  }, [loadCards]);

  const filteredCards = (() => {
    let cards: VocabCard[];
    switch (tab) {
      case "due":
        cards = dueCards;
        break;
      case "new":
        cards = allCards.filter(isNew);
        break;
      case "mastered":
        cards = allCards.filter(isMastered);
        break;
      default:
        cards = allCards;
    }
    if (selectedTag) {
      cards = cards.filter((c) => c.tags.includes(selectedTag));
    }
    return cards;
  })();

  const currentCard = filteredCards[currentIndex] ?? null;

  const counts = {
    all: allCards.length,
    due: dueCards.length,
    new: allCards.filter(isNew).length,
    mastered: allCards.filter(isMastered).length,
  };

  const goTo = (index: number) => {
    setCurrentIndex(index);
    setIsFlipped(false);
  };

  const handleReview = async (correct: boolean) => {
    if (!currentCard) return;
    await reviewVocabCard(currentCard.id, correct);
    await loadCards();
    if (currentIndex >= filteredCards.length - 1) {
      setCurrentIndex(Math.max(0, filteredCards.length - 2));
    }
    setIsFlipped(false);
  };

  const handleDelete = async () => {
    if (!currentCard) return;
    await deleteVocabCard(currentCard.id);
    await loadCards();
    if (currentIndex >= filteredCards.length - 1) {
      setCurrentIndex(Math.max(0, filteredCards.length - 2));
    }
    setIsFlipped(false);
  };

  const handleSaveWord = async (data: {
    word: string;
    translation: string;
    exampleSentence: string;
    tags: string[];
  }) => {
    await addVocabCard(data);
    await loadCards();
  };

  const tabItems: { key: TabFilter; label: string; count: number }[] = [
    { key: "all", label: "All", count: counts.all },
    { key: "due", label: "Due", count: counts.due },
    { key: "new", label: "New", count: counts.new },
    { key: "mastered", label: "Mastered", count: counts.mastered },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <p className="text-zinc-500">Loading flashcards…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-4 md:p-6">
      <div className="max-w-2xl mx-auto">
        <Link
          href="/"
          className="inline-block text-sm text-amber-600 dark:text-amber-400 hover:underline mb-4"
        >
          ← Dashboard
        </Link>

        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            Vocabulary Flashcards
          </h1>
          <Button size="sm" onClick={() => setShowModal(true)}>
            Add Word
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-4 overflow-x-auto">
          {tabItems.map((item) => (
            <button
              key={item.key}
              onClick={() => {
                setTab(item.key);
                setCurrentIndex(0);
                setIsFlipped(false);
              }}
              className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
                tab === item.key
                  ? "bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300"
                  : "text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              }`}
            >
              {item.label} ({item.count})
            </button>
          ))}
        </div>

        {/* Tag filter */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-6">
            <button
              onClick={() => {
                setSelectedTag(null);
                setCurrentIndex(0);
                setIsFlipped(false);
              }}
              className={`px-2.5 py-1 text-xs rounded-full transition-colors ${
                selectedTag === null
                  ? "bg-amber-500 text-white"
                  : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700"
              }`}
            >
              All tags
            </button>
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => {
                  setSelectedTag(selectedTag === tag ? null : tag);
                  setCurrentIndex(0);
                  setIsFlipped(false);
                }}
                className={`px-2.5 py-1 text-xs rounded-full transition-colors ${
                  selectedTag === tag
                    ? "bg-amber-500 text-white"
                    : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        )}

        {/* Card display */}
        {filteredCards.length === 0 ? (
          <div className="rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-8 text-center">
            <p className="text-zinc-500 dark:text-zinc-400">
              {tab === "due"
                ? "No cards due for review. Great job!"
                : tab === "new"
                  ? "No new cards. Add some words to get started!"
                  : tab === "mastered"
                    ? "No mastered cards yet. Keep reviewing!"
                    : "No vocabulary cards yet. Add words from test results or manually!"}
            </p>
          </div>
        ) : (
          <>
            <FlashCard
              card={currentCard!}
              isFlipped={isFlipped}
              onFlip={() => setIsFlipped((f) => !f)}
            />

            {/* Navigation */}
            <div className="flex items-center justify-between mt-4">
              <Button
                variant="outline"
                size="sm"
                disabled={currentIndex === 0}
                onClick={() => goTo(currentIndex - 1)}
              >
                Previous
              </Button>
              <span className="text-sm text-zinc-500 dark:text-zinc-400">
                {currentIndex + 1} of {filteredCards.length}
              </span>
              <Button
                variant="outline"
                size="sm"
                disabled={currentIndex >= filteredCards.length - 1}
                onClick={() => goTo(currentIndex + 1)}
              >
                Next
              </Button>
            </div>

            {/* Review buttons (shown after flip) */}
            {isFlipped && (
              <div className="flex justify-center gap-3 mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleReview(false)}
                >
                  Review again
                </Button>
                <Button size="sm" onClick={() => handleReview(true)}>
                  Got it
                </Button>
              </div>
            )}

            {/* Delete */}
            <div className="flex justify-center mt-4">
              <button
                onClick={handleDelete}
                className="text-xs text-zinc-400 hover:text-red-500 transition-colors"
              >
                Delete card
              </button>
            </div>
          </>
        )}

        <AddWordModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onSave={handleSaveWord}
        />
      </div>
    </div>
  );
}
