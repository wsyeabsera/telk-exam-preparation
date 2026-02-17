import { NextResponse } from "next/server";
import { execFileSync } from "child_process";

const MAX_BUFFER = 1024 * 1024;

interface QuestionResultPayload {
  questionId: string;
  questionText: string;
  tags?: string[];
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
}

interface TestMetadata {
  title: string;
  focus?: string;
  score: number;
  correctCount: number;
  totalQuestions: number;
  timeTakenMs: number;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      testMetadata,
      questionResults,
    } = body as {
      testMetadata?: TestMetadata;
      questionResults?: QuestionResultPayload[];
    };

    if (!testMetadata || typeof testMetadata !== "object") {
      return NextResponse.json(
        { error: "Missing or invalid testMetadata" },
        { status: 400 }
      );
    }
    if (!Array.isArray(questionResults) || questionResults.length === 0) {
      return NextResponse.json(
        { error: "Missing or invalid questionResults" },
        { status: 400 }
      );
    }

    const { title, focus, score, correctCount, totalQuestions, timeTakenMs } =
      testMetadata;
    const timeMinutes = Math.round(timeTakenMs / 60_000);

    const resultsBlock = questionResults
      .map((qr, i) => {
        const status = qr.isCorrect ? "CORRECT" : "INCORRECT";
        const tagsStr = (qr.tags?.length ? qr.tags.join(", ") : "—") ?? "—";
        return `${i + 1}. ${qr.questionText} — ${status}
   Tags: ${tagsStr}
   User: ${qr.userAnswer}
   Correct: ${qr.correctAnswer}`;
      })
      .join("\n\n");

    const promptForClaude = `Du bist ein Tutor für die telc Deutsch B1 Prüfung. Analysiere diesen kompletten Testversuch.

Test: ${title}
${focus ? `Schwerpunkt: ${focus}` : ""}
Punktzahl: ${correctCount}/${totalQuestions} (${score}%)
Zeit: ${timeMinutes} Minuten

Fragen und Ergebnisse:
${resultsBlock}

Antworte auf Deutsch in diesem Format (Markdown):

1. **Kurzanalyse** (2–3 Sätze): Gesamteindruck der Leistung.
2. **Schwächen** (Top 3): Wiederkehrende Fehlermuster mit konkreten Beispielen aus den falschen Antworten.
3. **Stärken** (Top 3): Was gut gelaufen ist.
4. **Lernempfehlungen** (3 konkrete Tipps): Was als Nächstes üben.
5. **Prüfungsreife**: Eine Zahl von 0–100 % mit kurzer Begründung.

Halte die Antwort übersichtlich und in Stichpunkten wo sinnvoll.`;

    const analysis = execFileSync("claude", ["-p", promptForClaude], {
      encoding: "utf-8",
      maxBuffer: MAX_BUFFER,
    });

    return NextResponse.json({ insights: analysis.trim() });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    const isNotFound =
      message.includes("ENOENT") ||
      message.includes("not found") ||
      message.includes("spawn claude");
    return NextResponse.json(
      {
        error: isNotFound
          ? "AI insights not available. Make sure the claude CLI is installed and in PATH."
          : message,
      },
      { status: 500 }
    );
  }
}
