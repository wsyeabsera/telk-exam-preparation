import React, { useState } from "react";
import type { GermanGrammarExerciseSet, GermanGrammarExercise } from "./types";

const PLACEHOLDER = "___";

/**
 * Renders one exercise line: sentence with ___ replaced by [input] (baseForm).
 * The word in brackets is always the full nominative base form.
 */
function ExerciseItem({
  item,
  index,
  partNumber,
  showAnswer,
}: {
  item: GermanGrammarExercise;
  index: number;
  partNumber: 1 | 2;
  showAnswer: boolean;
}) {
  const key = `${partNumber}-${index + 1}`;
  const [value, setValue] = useState("");

  if (!item.sentence.includes(PLACEHOLDER)) {
    console.warn(`Exercise ${key}: sentence must contain "${PLACEHOLDER}"`);
  }

  const [before, after] = item.sentence.split(PLACEHOLDER);

  return (
    <div className="german-exercise-item" data-exercise-id={key}>
      <label className="german-exercise-label">
        <span className="german-exercise-checkbox">
          <input type="checkbox" readOnly checked={!!value} />
        </span>
        <span className="german-exercise-number">{index + 1}.</span>
        <span className="german-exercise-sentence">
          {before}
          <input
            type="text"
            className="german-exercise-input"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="?"
            aria-label={`Answer for question ${index + 1}`}
          />
          <span className="german-exercise-base-form"> ({item.baseForm})</span>
          {after}
        </span>
      </label>
      {showAnswer && (
        <div className="german-exercise-answer" role="status">
          <strong>→ {item.correctAnswer}</strong>
        </div>
      )}
    </div>
  );
}

/**
 * German grammar exercise component.
 * Uses full nominative base form in brackets; instruction states that the word in brackets is nominative.
 */
export function GermanGrammarExerciseComponent({
  set,
  showAnswersInitially = false,
}: {
  set: GermanGrammarExerciseSet;
  showAnswersInitially?: boolean;
}) {
  const [showAnswers, setShowAnswers] = useState(showAnswersInitially);

  return (
    <section className="german-grammar-exercise" aria-label="German grammar exercise">
      <p className="german-grammar-instruction german-grammar-instruction-de">
        {set.instructionDe ??
          "Setzen Sie das Wort in der richtigen Form ein. Das Wort in Klammern steht im Nominativ."}
      </p>
      <p className="german-grammar-instruction german-grammar-instruction-en">
        {set.instruction}
      </p>

      <h3 className="german-grammar-part-title">{set.part1Label}</h3>
      <ol className="german-grammar-list" start={1}>
        {set.part1.map((item, index) => (
          <li key={`1-${index}`} className="german-grammar-list-item">
            <ExerciseItem
              item={item}
              index={index}
              partNumber={1}
              showAnswer={showAnswers}
            />
          </li>
        ))}
      </ol>

      {set.part2 && set.part2.length > 0 && (
        <>
          <h3 className="german-grammar-part-title">{set.part2Label}</h3>
          <ol className="german-grammar-list" start={set.part1.length + 1}>
            {set.part2.map((item, index) => (
              <li key={`2-${index}`} className="german-grammar-list-item">
                <ExerciseItem
                  item={item}
                  index={index}
                  partNumber={2}
                  showAnswer={showAnswers}
                />
              </li>
            ))}
          </ol>
        </>
      )}

      <div className="german-grammar-actions">
        <button
          type="button"
          className="german-grammar-toggle-answers"
          onClick={() => setShowAnswers((v) => !v)}
          aria-expanded={showAnswers}
        >
          {showAnswers ? "Antworten ausblenden" : "Antworten anzeigen"}
        </button>
      </div>
    </section>
  );
}

export default GermanGrammarExerciseComponent;
