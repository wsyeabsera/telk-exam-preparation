import type { GermanGrammarExerciseSet } from "./types";

/**
 * Sample exercise set: Dativ Mastery Part 1.
 * All baseForm values are in Nominativ. Correct answers unchanged from original logic.
 */
export const sampleDativExerciseSet: GermanGrammarExerciseSet = {
  title: "Dativ Mastery – Part 1",
  instruction:
    "Fill in the correct form (Dativ). The word in brackets is in the nominative.",
  instructionDe:
    "Setzen Sie das Wort in der richtigen Form ein. Das Wort in Klammern steht im Nominativ.",
  part1Label: "Part 1: Regular Questions (1–15)",
  part2Label: "Part 2: Tricky Questions (16–20)",
  part1: [
    { sentence: "Ich helfe ___ .", baseForm: "der Mann", correctAnswer: "dem Mann" },
    { sentence: "Er dankt ___ .", baseForm: "die Mutter", correctAnswer: "der Mutter" },
    {
      sentence: "Sie schreibt ___ eine E-Mail.",
      baseForm: "eine Kollegin",
      correctAnswer: "einer Kollegin",
    },
    {
      sentence: "Wir gratulieren ___ .",
      baseForm: "die Kinder",
      correctAnswer: "den Kindern",
    },
    {
      sentence: "Das Buch gehört ___ .",
      baseForm: "du",
      correctAnswer: "dir",
    },
    {
      sentence: "Sie wohnt bei ___ .",
      baseForm: "ihre Eltern",
      correctAnswer: "ihren Eltern",
    },
    {
      sentence: "Ich fahre mit ___ .",
      baseForm: "der Zug",
      correctAnswer: "dem Zug",
    },
    {
      sentence: "Er spricht von ___ .",
      baseForm: "eine lange Reise",
      correctAnswer: "einer langen Reise",
    },
    {
      sentence: "Nach ___ gehen wir spazieren.",
      baseForm: "das Essen",
      correctAnswer: "dem Essen",
    },
    {
      sentence: "Kannst du ___ helfen?",
      baseForm: "ich",
      correctAnswer: "mir",
    },
    {
      sentence: "Sie antwortet ___ nicht.",
      baseForm: "er",
      correctAnswer: "ihm",
    },
    {
      sentence: "Ich danke ___ herzlich.",
      baseForm: "Sie",
      correctAnswer: "Ihnen",
    },
    {
      sentence: "Das gefällt ___ .",
      baseForm: "die Gäste",
      correctAnswer: "den Gästen",
    },
    {
      sentence: "Wir folgen ___ .",
      baseForm: "der Lehrer",
      correctAnswer: "dem Lehrer",
    },
    {
      sentence: "Von ___ habe ich das gehört.",
      baseForm: "ein Freund",
      correctAnswer: "einem Freund",
    },
  ],
  part2: [
    {
      sentence: "Bei ___ brauche ich Hilfe.",
      baseForm: "die schwierige Aufgabe",
      correctAnswer: "der schwierigen Aufgabe",
    },
    {
      sentence: "Sie wohnt in ___ .",
      baseForm: "eine große Stadt",
      correctAnswer: "einer großen Stadt",
    },
    {
      sentence: "Mit ___ fahre ich in den Urlaub.",
      baseForm: "meine Eltern",
      correctAnswer: "meinen Eltern",
    },
    {
      sentence: "Ich gebe ___ das Buch.",
      baseForm: "die nette Kollegin",
      correctAnswer: "der netten Kollegin",
    },
    {
      sentence: "Er hat ___ geholfen.",
      baseForm: "die kleinen Kinder",
      correctAnswer: "den kleinen Kindern",
    },
  ],
};
