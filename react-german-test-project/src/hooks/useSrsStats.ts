"use client";

import { useEffect, useState } from "react";
import { getDueCardCount, getTotalCardCount } from "@/lib/srs/operations";

interface SrsStats {
  loading: boolean;
  dueCount: number;
  totalCards: number;
}

export function useSrsStats(): SrsStats {
  const [loading, setLoading] = useState(true);
  const [dueCount, setDueCount] = useState(0);
  const [totalCards, setTotalCards] = useState(0);

  useEffect(() => {
    let cancelled = false;
    Promise.all([getDueCardCount(), getTotalCardCount()]).then(
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
