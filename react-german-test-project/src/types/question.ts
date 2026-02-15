export type QuestionType =
  | "multiple-choice"
  | "fill-blank"
  | "true-false"
  | "writing-prompt"
  | "reading-comprehension";

export interface BaseQuestion {
  id: string;
  type: QuestionType;
  text: string;
  explanation?: string;
  /** Longer explanation shown on results (multi-line) */
  explanationDetail?: string;
  /** Shown during test: e.g. "die Mutter" for Nominativ hint */
  nominativeHint?: string;
  /** ID of markdown passage to show above question (e.g. "blog-sofia-berlin") */
  passageId?: string;
  /** When true, passage text is hidden by default (listening comprehension) */
  hidePassageText?: boolean;
  difficulty?: "easy" | "medium" | "hard";
  tags?: string[];
}

export interface MultipleChoiceOption {
  id: string;
  text: string;
}

export interface MultipleChoiceQuestion extends BaseQuestion {
  type: "multiple-choice";
  options: MultipleChoiceOption[];
  correctAnswerId: string;
}

export interface TrueFalseQuestion extends BaseQuestion {
  type: "true-false";
  correctAnswer: boolean;
}

export interface FillBlankQuestion extends BaseQuestion {
  type: "fill-blank";
  correctAnswer: string;
}

export interface WritingPromptQuestion extends BaseQuestion {
  type: "writing-prompt";
  prompt: string;
  modelAnswer?: string;
}

export type Question = MultipleChoiceQuestion | TrueFalseQuestion | FillBlankQuestion | WritingPromptQuestion | BaseQuestion;

export function isMultipleChoice(
  q: Question
): q is MultipleChoiceQuestion {
  return q.type === "multiple-choice";
}

export function isTrueFalse(q: Question): q is TrueFalseQuestion {
  return q.type === "true-false";
}

export function isFillBlank(q: Question): q is FillBlankQuestion {
  return q.type === "fill-blank";
}

export function isWritingPrompt(q: Question): q is WritingPromptQuestion {
  return q.type === "writing-prompt";
}
