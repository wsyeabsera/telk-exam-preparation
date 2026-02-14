import { NextResponse } from "next/server";
import { execFileSync } from "child_process";

const MAX_BUFFER = 1024 * 1024;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { prompt: taskPrompt, userAnswer, modelAnswer = "" } = body as {
      prompt?: string;
      userAnswer?: string;
      modelAnswer?: string;
    };

    if (!taskPrompt || typeof taskPrompt !== "string") {
      return NextResponse.json(
        { error: "Missing or invalid prompt" },
        { status: 400 }
      );
    }
    if (userAnswer === undefined || typeof userAnswer !== "string") {
      return NextResponse.json(
        { error: "Missing or invalid userAnswer" },
        { status: 400 }
      );
    }

    const promptForClaude = `Du bist ein Prüfer für die telc Deutsch B1 Prüfung. Bewerte die folgende Antwort.

Aufgabe: ${taskPrompt}

Antwort des Lerners:
${userAnswer}

Musterlösung:
${modelAnswer}

Gib Feedback auf Deutsch (3–5 Stichpunkte):
- Grammatik und Rechtschreibung
- Wortschatz (B1-Niveau?)
- Aufgabenerfüllung
- Verbesserungsvorschläge`;

    const feedback = execFileSync("claude", ["-p", promptForClaude], {
      encoding: "utf-8",
      maxBuffer: MAX_BUFFER,
    });

    return NextResponse.json({ feedback: feedback.trim() });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    const isNotFound =
      message.includes("ENOENT") ||
      message.includes("not found") ||
      message.includes("spawn claude");
    return NextResponse.json(
      {
        error: isNotFound
          ? "AI feedback not available. Make sure the claude CLI is installed and in PATH."
          : message,
      },
      { status: 500 }
    );
  }
}
