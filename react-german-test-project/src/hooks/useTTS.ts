"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { markdownToPlainText } from "@/lib/utils/markdown-to-text";

const DEFAULT_LANG = "de-DE";
const DEFAULT_RATE = 0.9;

export function useTTS(text: string, lang: string = DEFAULT_LANG) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [rate, setRateState] = useState(DEFAULT_RATE);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const plainText = markdownToPlainText(text);

  const cancel = useCallback(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    utteranceRef.current = null;
    setIsPlaying(false);
    setIsPaused(false);
  }, []);

  const stop = useCallback(() => {
    cancel();
  }, [cancel]);

  const speak = useCallback(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    if (!plainText.trim()) return;

    cancel();

    const utterance = new SpeechSynthesisUtterance(plainText);
    utterance.lang = lang;
    utterance.rate = rate;
    utteranceRef.current = utterance;

    utterance.onstart = () => {
      setIsPlaying(true);
      setIsPaused(false);
    };
    utterance.onend = () => {
      utteranceRef.current = null;
      setIsPlaying(false);
      setIsPaused(false);
    };
    utterance.onerror = () => {
      utteranceRef.current = null;
      setIsPlaying(false);
      setIsPaused(false);
    };

    window.speechSynthesis.speak(utterance);
  }, [plainText, lang, rate, cancel]);

  const pause = useCallback(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.pause();
    setIsPaused(true);
  }, []);

  const resume = useCallback(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.resume();
    setIsPaused(false);
  }, []);

  const setRate = useCallback((newRate: number) => {
    setRateState(newRate);
  }, []);

  useEffect(() => {
    return () => {
      cancel();
    };
  }, [cancel]);

  const supported =
    typeof window !== "undefined" && "speechSynthesis" in window;

  return {
    isPlaying,
    isPaused,
    rate,
    speak,
    pause,
    resume,
    stop,
    setRate,
    cancel,
    supported,
    hasContent: plainText.trim().length > 0,
  };
}
