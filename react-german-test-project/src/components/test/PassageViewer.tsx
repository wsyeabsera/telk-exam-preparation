"use client";

import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { loadPassage } from "@/lib/data/load-passages";
import { TTSControls } from "@/components/test/TTSControls";

interface PassageViewerProps {
  passageId: string;
  className?: string;
}

const passageCache: Record<string, string> = {};

export function PassageViewer({ passageId, className = "" }: PassageViewerProps) {
  const [content, setContent] = useState<string>(() => passageCache[passageId] ?? "");
  const [loading, setLoading] = useState(!passageCache[passageId]);

  useEffect(() => {
    if (passageCache[passageId]) {
      setContent(passageCache[passageId]);
      setLoading(false);
      return;
    }
    setLoading(true);
    loadPassage(passageId).then((text) => {
      passageCache[passageId] = text;
      setContent(text);
      setLoading(false);
    });
  }, [passageId]);

  if (loading) {
    return (
      <div
        className={`rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 p-4 text-zinc-500 ${className}`}
      >
        Loading passage…
      </div>
    );
  }

  if (!content) return null;

  return (
    <div
      className={`rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 p-4 mb-4 text-zinc-800 dark:text-zinc-200 text-sm leading-relaxed [&_strong]:font-semibold [&_p]:mb-2 [&_p:last-child]:mb-0 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 ${className}`}
    >
      <TTSControls text={content} className="mb-3" />
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}
