export interface SrsState {
  interval: number;
  easeFactor: number;
  repetitions: number;
}

/**
 * SM-2 algorithm. Correct maps to quality=5, incorrect to quality=1.
 * Returns updated SRS state.
 */
export function sm2(input: SrsState, correct: boolean): SrsState {
  const quality = correct ? 5 : 1;
  let { interval, easeFactor, repetitions } = input;

  if (quality >= 3) {
    // Correct answer
    if (repetitions === 0) {
      interval = 1;
    } else if (repetitions === 1) {
      interval = 6;
    } else {
      interval = Math.round(interval * easeFactor);
    }
    repetitions += 1;
  } else {
    // Incorrect — reset
    repetitions = 0;
    interval = 1;
  }

  // Update ease factor
  easeFactor =
    easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
  if (easeFactor < 1.3) easeFactor = 1.3;

  return { interval, easeFactor, repetitions };
}

/**
 * Initial SRS state for a newly encountered question.
 * Correct on first encounter → longer initial interval.
 * Incorrect → review tomorrow.
 */
export function defaultSrsState(correct: boolean): SrsState {
  if (correct) {
    return { interval: 6, easeFactor: 2.6, repetitions: 1 };
  }
  return { interval: 1, easeFactor: 2.5, repetitions: 0 };
}
