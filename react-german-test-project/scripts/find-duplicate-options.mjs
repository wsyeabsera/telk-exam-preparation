#!/usr/bin/env node
/**
 * Scan all test JSON files for questions where 2+ options have identical text.
 * Outputs detailed report to scripts/duplicate-options-report.json.
 */

import fs from "fs";
import path from "path";

const TESTS_DIR = path.join(process.cwd(), "src/data/tests");
const REPORT_PATH = path.join(process.cwd(), "scripts/duplicate-options-report.json");

const files = fs.readdirSync(TESTS_DIR).filter((f) => f.endsWith(".json"));
const issues = [];

for (const file of files) {
  const data = JSON.parse(fs.readFileSync(path.join(TESTS_DIR, file), "utf8"));
  const questions = data.questions || [];

  questions.forEach((q) => {
    if (q.type !== "multiple-choice" || !q.options) return;
    const opts = q.options;
    const texts = opts.map((o) => o.text);
    const seen = {};
    const duplicateIds = [];
    opts.forEach((o, i) => {
      if (seen[o.text] !== undefined) duplicateIds.push(o.id);
      else seen[o.text] = o.id;
    });

    if (duplicateIds.length > 0) {
      issues.push({
        file,
        questionId: q.id,
        questionText: q.text.slice(0, 80),
        correctAnswerId: q.correctAnswerId,
        options: opts.map((o) => ({ id: o.id, text: o.text })),
        duplicateOptionIds: duplicateIds,
      });
    }
  });
}

fs.writeFileSync(REPORT_PATH, JSON.stringify(issues, null, 2), "utf8");
console.log("Total questions with duplicate options:", issues.length);
console.log("Report written to", REPORT_PATH);
