"use client";

import { useEffect, useState } from "react";
import { getDueVocabCardCount, getTotalVocabCardCount } from "@/lib/vocab/operations";

interface VocabStats {
  loading: boolean;
  dueCount: number;
  totalCards: number;
}

export function useVocabStats(): VocabStats {
  const [loading, setLoading] = useState(true);
  const [dueCount, setDueCount] = useState(0);
  const [totalCards, setTotalCards] = useState(0);

  useEffect(() => {
    let cancelled = false;
    Promise.all([getDueVocabCardCount(), getTotalVocabCardCount()]).then(
      ([due, total]) => {
        if (cancelled) return;
        setDueCount(due);
        setTotalCards(total);
        setLoading(false);
      }
    );
    return () => { cancelled = true; };
  }, []);

  return { loading, dueCount, totalCards };
}
