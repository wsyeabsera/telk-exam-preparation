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

function extractJsonObject(s: string): string {
  const start = s.indexOf("{");
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
    if (c === "{") depth++;
    else if (c === "}") {
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
    const { word, contextSentence } = body as {
      word?: string;
      contextSentence?: string;
    };

    if (typeof word !== "string" || !word.trim()) {
      return NextResponse.json(
        { error: "Missing or invalid word" },
        { status: 400 }
      );
    }

    const contextLine = contextSentence
      ? `\nContext sentence: ${contextSentence}`
      : "";

    const prompt = `Translate the German word "${word}" to English. Provide the translation and an example sentence in German that uses this word.
${contextLine}
Output ONLY valid JSON. No markdown, no code fences, no text before or after.
Format: {"translation":"English translation","exampleSentence":"Example sentence in German"}`;

    const raw = callClaude(prompt);
    const extracted = extractJsonObject(stripMarkdownJson(raw));
    const repaired = repairTrailingCommas(extracted);
    const parsed = JSON.parse(repaired) as Record<string, unknown>;

    const translation =
      typeof parsed.translation === "string" ? parsed.translation : "";
    const exampleSentence =
      typeof parsed.exampleSentence === "string"
        ? parsed.exampleSentence
        : "";

    return NextResponse.json({ translation, exampleSentence });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    const isNotFound =
      message.includes("ENOENT") ||
      message.includes("not found") ||
      message.includes("spawn claude");
    return NextResponse.json(
      {
        error: isNotFound
          ? "Translation not available. Make sure the claude CLI is installed and in PATH."
          : message,
      },
      { status: 500 }
    );
  }
}
