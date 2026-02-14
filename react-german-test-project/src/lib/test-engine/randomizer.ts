import type { Question } from "@/types/question";
import type { MultipleChoiceQuestion } from "@/types/question";

function shuffleArray<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function shuffleQuestions(questions: Question[]): Question[] {
  return shuffleArray(questions);
}

export function shuffleMultipleChoiceOptions(
  question: MultipleChoiceQuestion
): MultipleChoiceQuestion {
  const options = shuffleArray(question.options);
  return { ...question, options };
}

export function shuffleTest(questions: Question[]): Question[] {
  const shuffled = shuffleQuestions(questions);
  return shuffled.map((q) => {
    if (q.type === "multiple-choice") {
      return shuffleMultipleChoiceOptions(q as MultipleChoiceQuestion);
    }
    return q;
  });
}
