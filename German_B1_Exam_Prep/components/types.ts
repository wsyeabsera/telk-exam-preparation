/**
 * Single grammar exercise item.
 * - sentence: template with one blank (use ___ for the gap)
 * - baseForm: the word/phrase in nominative shown in brackets to the learner
 * - correctAnswer: the expected inflected form (not shown to learner until check)
 */
export interface GermanGrammarExercise {
  sentence: string;
  baseForm: string;
  correctAnswer: string;
}

export interface GermanGrammarExerciseSet {
  title: string;
  instruction: string;
  instructionDe: string;
  part1Label: string;
  part2Label?: string;
  part1: GermanGrammarExercise[];
  part2?: GermanGrammarExercise[];
  answers?: Record<string, { explanationEn?: string; explanationDe?: string }>;
}
