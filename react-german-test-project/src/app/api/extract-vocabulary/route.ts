import { NextResponse } from "next/server";
import { execFileSync } from "child_process";

const MAX_BUFFER = 1024 * 1024;

function stripMarkdownJson(raw: string): string {
  let s = raw.trim();
  const codeBlockMatch = s.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (codeBlockMatch) s = codeBlockMatch[1].trim();
  return s;
}

function repairTrailingCommas(s: string): string {
  return s.replace(/,(\s*[}\]])/g, "$1");
}

function extractJsonArray(s: string): string {
  const start = s.indexOf("[");
  if (start === -1) return s;
  let depth = 0;
  let inString = false;
  let escape = false;
  for (let i = start; i < s.length; i++) {
    const c = s[i];
    if (escape) { escape = false; continue; }
    if (c === "\\" && inString) { escape = true; continue; }
    if (inString) { if (c === '"') inString = false; continue; }
    if (c === '"') { inString = true; continue; }
    if (c === "[") depth++;
    else if (c === "]") {
      depth--;
      if (depth === 0) return s.slice(start, i + 1);
    }
  }
  return s.slice(start);
}

function callClaude(prompt: string): string {
  return execFileSync("claude", ["-p", prompt], {
    encoding: "utf-8",
    maxBuffer: MAX_BUFFER,
  }).trim();
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { questionText, context } = body as {
      questionText?: string;
      context?: string;
    };

    if (typeof questionText !== "string" || !questionText.trim()) {
      return NextResponse.json(
        { error: "Missing or invalid questionText" },
        { status: 400 }
      );
    }

    const contextLine = context ? `\nContext: ${context}` : "";

    const prompt = `Extract 3-7 key German B1-level vocabulary words from this text. For each word, provide the German word, its English translation, and an example sentence in German.
${contextLine}
Text: ${questionText}

Output ONLY a valid JSON array. No markdown, no code fences, no text before or after.
Format: [{"word":"German word","translation":"English translation","exampleSentence":"Example sentence in German"}]`;

    let words: Array<{ word: string; translation: string; exampleSentence: string }> | null = null;

    for (let attempt = 0; attempt < 2 && words === null; attempt++) {
      try {
        const raw = callClaude(prompt);
        const extracted = extractJsonArray(stripMarkdownJson(raw));
        const repaired = repairTrailingCommas(extracted);
        const parsed = JSON.parse(repaired);
        if (Array.isArray(parsed)) {
          words = parsed.filter(
            (w: Record<string, unknown>) =>
              typeof w.word === "string" &&
              typeof w.translation === "string" &&
              typeof w.exampleSentence === "string"
          );
        }
      } catch {
        continue;
      }
    }

    if (!words || words.length === 0) {
      return NextResponse.json(
        { error: "Could not extract vocabulary. Try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ words });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    const isNotFound =
      message.includes("ENOENT") ||
      message.includes("not found") ||
      message.includes("spawn claude");
    return NextResponse.json(
      {
        error: isNotFound
          ? "Vocabulary extraction not available. Make sure the claude CLI is installed and in PATH."
          : message,
      },
      { status: 500 }
    );
  }
}
