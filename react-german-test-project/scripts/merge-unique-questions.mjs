#!/usr/bin/env node
/**
 * Merge unique questions: keep first N unique by text, then append new questions.
 * Usage: node scripts/merge-unique-questions.mjs <testFile> <keepCount> <newQuestionsJsonPath>
 * Or: node scripts/merge-unique-questions.mjs inline <testFile> <keepCount>
 *   (then reads new questions from NEW_QUESTIONS in this file for testFile)
 */

import fs from "fs";
import path from "path";

const [, , testFile, keepCountStr, newQuestionsPath] = process.argv;
const keepCount = parseInt(keepCountStr, 10);

if (!testFile || !keepCount) {
  console.error("Usage: merge-unique-questions.mjs <testFile> <keepCount> [newQuestionsJsonPath]");
  process.exit(1);
}

const testPath = path.join(process.cwd(), "src/data/tests", testFile.endsWith(".json") ? testFile : testFile + ".json");
const data = JSON.parse(fs.readFileSync(testPath, "utf8"));

const seen = new Set();
const kept = [];
for (const q of data.questions) {
  if (seen.has(q.text)) continue;
  seen.add(q.text);
  kept.push(q);
  if (kept.length >= keepCount) break;
}

let newQuestions;
if (newQuestionsPath) {
  const fullPath = path.isAbsolute(newQuestionsPath) ? newQuestionsPath : path.join(process.cwd(), newQuestionsPath);
  newQuestions = JSON.parse(fs.readFileSync(fullPath, "utf8"));
} else {
  const modules = ["./new-questions-verb-tests.mjs", "./new-questions-conjunctions.mjs", "./new-questions-pronouns.mjs", "./new-questions-comparisons.mjs", "./new-questions-advanced.mjs", "./new-questions-reading.mjs", "./new-questions-quick.mjs"];
  const key = testFile.replace(/\.json$/, "") === testFile ? testFile + ".json" : testFile;
  const keyAlt = path.basename(testFile, ".json");
  let raw;
  for (const modPath of modules) {
    try {
      const mod = await import(modPath);
      raw = mod.NEW_QUESTIONS_BY_FILE?.[key] || mod.NEW_QUESTIONS_BY_FILE?.[keyAlt];
      if (raw) break;
    } catch (_) {}
  }
  if (!raw) {
    console.error("No new questions found for", testFile);
    process.exit(1);
  }
  const need = 50 - kept.length;
  newQuestions = raw.slice(0, need);
}

// Re-id kept questions (q1, q2, ...) and new questions (q(keepCount+1), ...)
const reid = (q, i) => ({ ...q, id: "q" + (i + 1) });
const reidNew = (q, i) => ({ ...q, id: "q" + (kept.length + i + 1) });

const all = [...kept.map(reid), ...newQuestions.map(reidNew)];
data.questions = all;

fs.writeFileSync(testPath, JSON.stringify(data, null, 2), "utf8");
console.log(testPath, "updated:", kept.length, "kept +", newQuestions.length, "new =", all.length);
