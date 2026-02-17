import { NextResponse } from "next/server";
import { execFileSync } from "child_process";
import type { Test } from "@/types/test";

const MAX_BUFFER = 1024 * 1024;
const TEST_ID_PREFIX = "ai-test-";

function stripMarkdownJson(raw: string): string {
  let s = raw.trim();
  const codeBlockMatch = s.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (codeBlockMatch) s = codeBlockMatch[1].trim();
  return s;
}

/** Remove trailing commas before } or ] (invalid in JSON). */
function repairTrailingCommas(s: string): string {
  return s.replace(/,(\s*[}\]])/g, "$1");
}

/** Extract the first complete JSON object from the string (handles extra text before/after). */
function extractJsonObject(s: string): string {
  const start = s.indexOf("{");
  if (start === -1) return s;
  let depth = 0;
  let inString = false;
  let escape = false;
  for (let i = start; i < s.length; i++) {
    const c = s[i];
    if (escape) {
      escape = false;
      continue;
    }
    if (c === "\\" && inString) {
      escape = true;
      continue;
    }
    if (inString) {
      if (c === '"') inString = false;
      continue;
    }
    if (c === '"') {
      inString = true;
      continue;
    }
    if (c === "{") depth++;
    else if (c === "}") {
      depth--;
      if (depth === 0) return s.slice(start, i + 1);
    }
  }
  return s.slice(start);
}

function parseGeneratedTest(raw: string, attemptId: string): Test {
  const extracted = extractJsonObject(stripMarkdownJson(raw));
  const repaired = repairTrailingCommas(extracted);
  const parsed = JSON.parse(repaired) as Record<string, unknown>;
  const id =
    (typeof parsed.id === "string" && parsed.id.startsWith(TEST_ID_PREFIX)
      ? parsed.id
      : `${TEST_ID_PREFIX}${Date.now()}`) as string;
  const title =
    typeof parsed.title === "string" ? parsed.title : "Personalized Practice";
  const description =
    typeof parsed.description === "string"
      ? parsed.description
      : "Generated from your test results.";
  const duration =
    typeof parsed.duration === "number" ? parsed.duration : 10;
  const focus = typeof parsed.focus === "string" ? parsed.focus : undefined;
  const questions = Array.isArray(parsed.questions) ? parsed.questions : [];
  const generatedAt = new Date().toISOString();

  const test: Test = {
    id,
    title,
    description,
    duration,
    category: "ai-generated",
    focus,
    questions: questions.map((q: Record<string, unknown>, i: number) => {
      const qid = typeof q.id === "string" ? q.id : `q${i + 1}`;
      const type =
        typeof q.type === "string" && q.type === "fill-blank"
          ? "fill-blank"
          : "multiple-choice";
      const text = typeof q.text === "string" ? q.text : "";
      const explanation =
        typeof q.explanation === "string" ? q.explanation : undefined;
      const explanationDetail =
        typeof q.explanationDetail === "string"
          ? q.explanationDetail
          : undefined;
      const tags = Array.isArray(q.tags)
        ? (q.tags as string[]).filter((t) => typeof t === "string")
        : undefined;

      if (type === "fill-blank") {
        const correctAnswer =
          typeof q.correctAnswer === "string" ? q.correctAnswer : "";
        return {
          id: qid,
          type: "fill-blank",
          text,
          correctAnswer,
          explanation,
          explanationDetail,
          tags,
        };
      }

      const options = Array.isArray(q.options)
        ? (q.options as Array<{ id: string; text: string }>).map((o, j) => ({
            id: typeof o.id === "string" ? o.id : String.fromCharCode(97 + j),
            text: typeof o.text === "string" ? o.text : "",
          }))
        : [];
      const correctAnswerId =
        typeof q.correctAnswerId === "string"
          ? q.correctAnswerId
          : options[0]?.id ?? "a";
      return {
        id: qid,
        type: "multiple-choice",
        text,
        options,
        correctAnswerId,
        explanation,
        explanationDetail,
        tags,
      };
    }),
    generatedFrom: attemptId,
    generatedAt,
  };

  return test;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      insights,
      testMetadata,
      attemptId,
    } = body as {
      insights?: string;
      testMetadata?: { originalTestTitle?: string; score?: number };
      attemptId?: string;
    };

    if (typeof insights !== "string" || !insights.trim()) {
      return NextResponse.json(
        { error: "Missing or invalid insights" },
        { status: 400 }
      );
    }
    if (!attemptId || typeof attemptId !== "string") {
      return NextResponse.json(
        { error: "Missing or invalid attemptId" },
        { status: 400 }
      );
    }

    const title =
      testMetadata?.originalTestTitle ?? "Previous test";
    const score = typeof testMetadata?.score === "number" ? testMetadata.score : 0;
    const testId = `${TEST_ID_PREFIX}${Date.now()}`;

    const promptForClaude = `You are a telc B1 German exam question generator. Based on this student's test analysis, generate a personalized practice test.

Original Test: ${title}
Score: ${score}%
AI Analysis:
${insights}

Generate exactly 5-7 questions targeting the identified weaknesses. The questions should:
1. Focus on the specific error patterns mentioned in the analysis
2. Adapt difficulty based on performance (if score < 60%, make slightly easier; if > 80%, add challenge)
3. Choose question types that best test each weakness (multiple-choice for grammar/cases, fill-blank where appropriate)
4. Include brief explanation and optional explanationDetail for each question
5. Use tags that reflect the weakness area (e.g. dativ, prepositions, word-order)

Output ONLY valid JSON. Rules:
- No markdown, no code fences, no text before or after the JSON
- In string values: escape double quotes as \\\", newlines as \\n
- No trailing commas (e.g. do not write ,} or ,])
- Keep the JSON on one line or use proper line breaks inside strings only when escaped

Structure: {"id":"${testId}","title":"...","description":"...","duration":10,"category":"ai-generated","focus":"...","questions":[{"id":"q1","type":"multiple-choice","text":"...","options":[{"id":"a","text":"..."},{"id":"b","text":"..."}],"correctAnswerId":"a","explanation":"...","tags":["..."]}]}
For fill-blank: use "type":"fill-blank","correctAnswer":"..." instead of options/correctAnswerId.`;

    const raw = execFileSync("claude", ["-p", promptForClaude], {
      encoding: "utf-8",
      maxBuffer: MAX_BUFFER,
    });

    const jsonStr = stripMarkdownJson(raw.trim());
    let test: Test;
    try {
      test = parseGeneratedTest(jsonStr, attemptId);
    } catch (parseErr) {
      const msg = parseErr instanceof Error ? parseErr.message : String(parseErr);
      return NextResponse.json(
        {
          error: `Invalid JSON from AI: ${msg}. The model may have produced malformed output. Try "Generate Practice Test" again.`,
        },
        { status: 500 }
      );
    }
    if (test.questions.length === 0) {
      return NextResponse.json(
        { error: "Generated test had no valid questions" },
        { status: 500 }
      );
    }

    return NextResponse.json({ testId: test.id, test });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    const isNotFound =
      message.includes("ENOENT") ||
      message.includes("not found") ||
      message.includes("spawn claude");
    return NextResponse.json(
      {
        error: isNotFound
          ? "AI test generation not available. Make sure the claude CLI is installed and in PATH."
          : message,
      },
      { status: 500 }
    );
  }
}
