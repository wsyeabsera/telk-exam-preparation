export type QuestionType =
  | "multiple-choice"
  | "fill-blank"
  | "true-false"
  | "reading-comprehension";

export interface BaseQuestion {
  id: string;
  type: QuestionType;
  text: string;
  explanation?: string;
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

export type Question = MultipleChoiceQuestion | TrueFalseQuestion | BaseQuestion;

export function isMultipleChoice(
  q: Question
): q is MultipleChoiceQuestion {
  return q.type === "multiple-choice";
}

export function isTrueFalse(q: Question): q is TrueFalseQuestion {
  return q.type === "true-false";
}
