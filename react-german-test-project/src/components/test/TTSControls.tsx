"use client";

import { useTTS } from "@/hooks/useTTS";
import { cn } from "@/lib/utils/cn";

const SPEED_OPTIONS = [
  { value: 0.75, label: "0.75×" },
  { value: 0.9, label: "0.9×" },
  { value: 1, label: "1×" },
  { value: 1.25, label: "1.25×" },
] as const;

interface TTSControlsProps {
  text: string;
  lang?: string;
  className?: string;
}

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={cn("w-5 h-5", className)}
    >
      <path d="M8 5v14l11-7L8 5z" />
    </svg>
  );
}

function PauseIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={cn("w-5 h-5", className)}
    >
      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
    </svg>
  );
}

function StopIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={cn("w-5 h-5", className)}
    >
      <path d="M6 6h12v12H6z" />
    </svg>
  );
}

export function TTSControls({ text, lang = "de-DE", className }: TTSControlsProps) {
  const {
    isPlaying,
    isPaused,
    rate,
    speak,
    pause,
    resume,
    stop,
    setRate,
    supported,
    hasContent,
  } = useTTS(text, lang);

  if (!supported) return null;
  if (!hasContent) return null;

  const handlePlayPause = () => {
    if (isPlaying && !isPaused) {
      pause();
    } else if (isPlaying && isPaused) {
      resume();
    } else {
      speak();
    }
  };

  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-2 py-2 border-b border-zinc-200 dark:border-zinc-700 mb-3",
        className
      )}
    >
      <button
        type="button"
        onClick={handlePlayPause}
        aria-label={isPlaying && !isPaused ? "Pause" : "Play"}
        className={cn(
          "inline-flex items-center justify-center w-9 h-9 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-amber-500",
          "bg-amber-500 text-black hover:bg-amber-600 dark:focus-visible:ring-offset-zinc-900",
          isPlaying && !isPaused && "ring-2 ring-amber-500 ring-offset-2 dark:ring-offset-zinc-900"
        )}
      >
        {isPlaying && !isPaused ? (
          <PauseIcon />
        ) : (
          <PlayIcon />
        )}
      </button>
      <button
        type="button"
        onClick={stop}
        disabled={!isPlaying}
        aria-label="Stop"
        className={cn(
          "inline-flex items-center justify-center w-9 h-9 rounded-lg border border-zinc-300 dark:border-zinc-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-900",
          "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-50 disabled:pointer-events-none"
        )}
      >
        <StopIcon />
      </button>
      <div className="flex items-center gap-1.5">
        <label htmlFor="tts-speed" className="text-xs text-zinc-500 dark:text-zinc-400">
          Speed
        </label>
        <select
          id="tts-speed"
          value={rate}
          onChange={(e) => setRate(Number(e.target.value))}
          className={cn(
            "rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-sm py-1.5 px-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-900"
          )}
        >
          {SPEED_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
