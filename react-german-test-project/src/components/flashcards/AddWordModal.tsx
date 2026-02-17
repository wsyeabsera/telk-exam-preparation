"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";

interface AddWordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: {
    word: string;
    translation: string;
    exampleSentence: string;
    tags: string[];
  }) => void;
  initialWord?: string;
  initialTags?: string[];
}

export function AddWordModal({
  isOpen,
  onClose,
  onSave,
  initialWord,
  initialTags,
}: AddWordModalProps) {
  const [word, setWord] = useState("");
  const [translation, setTranslation] = useState("");
  const [exampleSentence, setExampleSentence] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [translating, setTranslating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setWord(initialWord ?? "");
      setTranslation("");
      setExampleSentence("");
      setTagsInput(initialTags?.join(", ") ?? "");
    }
  }, [isOpen, initialWord, initialTags]);

  if (!isOpen) return null;

  const handleAutoTranslate = async () => {
    if (!word.trim()) return;
    setTranslating(true);
    try {
      const res = await fetch("/api/translate-word", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ word: word.trim() }),
      });
      const data = await res.json();
      if (data.translation) setTranslation(data.translation);
      if (data.exampleSentence) setExampleSentence(data.exampleSentence);
    } catch {
      // silently fail
    } finally {
      setTranslating(false);
    }
  };

  const handleSave = () => {
    if (!word.trim() || !translation.trim()) return;
    const tags = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    onSave({
      word: word.trim(),
      translation: translation.trim(),
      exampleSentence: exampleSentence.trim(),
      tags,
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-700 p-6 w-full max-w-md mx-4 shadow-xl">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
          Add Vocabulary Word
        </h2>

        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
              German Word
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={word}
                onChange={(e) => setWord(e.target.value)}
                className="flex-1 rounded-lg border border-zinc-300 dark:border-zinc-600 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                placeholder="e.g. Gelegenheit"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleAutoTranslate}
                disabled={!word.trim() || translating}
              >
                {translating ? "…" : "Auto-translate"}
              </Button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
              English Translation
            </label>
            <input
              type="text"
              value={translation}
              onChange={(e) => setTranslation(e.target.value)}
              className="w-full rounded-lg border border-zinc-300 dark:border-zinc-600 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="e.g. opportunity"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
              Example Sentence
            </label>
            <input
              type="text"
              value={exampleSentence}
              onChange={(e) => setExampleSentence(e.target.value)}
              className="w-full rounded-lg border border-zinc-300 dark:border-zinc-600 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="e.g. Ich habe eine gute Gelegenheit gefunden."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
              Tags (comma-separated)
            </label>
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              className="w-full rounded-lg border border-zinc-300 dark:border-zinc-600 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="e.g. nouns, B1, daily-life"
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <Button type="button" variant="ghost" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="button"
            size="sm"
            onClick={handleSave}
            disabled={!word.trim() || !translation.trim()}
          >
            Save Word
          </Button>
        </div>
      </div>
    </div>
  );
}
