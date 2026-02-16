#!/usr/bin/env node
/**
 * Fix duplicate option texts in test JSON files.
 * Reads duplicate-options-report.json and applies context-aware replacements.
 */

import fs from "fs";
import path from "path";

const TESTS_DIR = path.join(process.cwd(), "src/data/tests");
const REPORT_PATH = path.join(process.cwd(), "scripts/duplicate-options-report.json");

const report = JSON.parse(fs.readFileSync(REPORT_PATH, "utf8"));

/**
 * Choose replacement text for a duplicate option so all 4 options become unique.
 * duplicateId: which option id has the duplicate (e.g. "d")
 * correctId: which option is correct (e.g. "a")
 * options: array of { id, text }
 * Returns new text for the duplicate option.
 */
function chooseReplacement(issue) {
  const { file, correctAnswerId, options } = issue;
  const texts = options.map((o) => o.text);
  const byId = Object.fromEntries(options.map((o) => [o.id, o.text]));

  // Find which option(s) are duplicates (same text as an earlier option)
  const firstOccurrence = {};
  const duplicateIds = [];
  options.forEach((o) => {
    if (firstOccurrence[o.text] !== undefined) {
      duplicateIds.push(o.id);
    } else {
      firstOccurrence[o.text] = o.id;
    }
  });

  const used = new Set(texts);
  const usedCorrect = correctAnswerId ? new Set([byId[correctAnswerId]]) : new Set();

  // Replacement pools by context
  const reflexReplacements = ["mich", "dich", "sich", "uns", "euch", "ihnen", "mir", "dir"];
  const verbReplacements = ["ging", "gegangen", "geht", "gehen"];
  const konjunktivReplacements = ["will", "wird", "werde", "wurde", "wollen", "werden", "wollte", "wurdest", "willst", "wollt", "werdet"];
  const konjunktiv2Replacements = ["wollen", "wollten", "haben würde", "würde haben"];

  for (const dupId of duplicateIds) {
    const dupText = byId[dupId];
    const isCorrect = dupId === correctAnswerId;

    if (file === "mini-test-01-dativ.json") {
      if (dupText === "dich") return "dem";
    }
    if (file === "mini-test-10-verb-forms-mixed.json") {
      if (dupText === "gehen") return "ging";
    }
    if (file === "mini-test-12-weil-dass.json") {
      if (dupText === "schließt") return "schließst";
      if (dupText === "beginnt") return "beginnst";
    }
    if (file === "mini-test-16-reflexive-pronouns.json" || file === "mini-test-18-pronouns-mixed.json") {
      const alt = reflexReplacements.find((r) => !used.has(r) && r !== dupText);
      if (alt) return alt;
      return dupText === "euch" ? "ihnen" : "euch";
    }
    if (file === "mini-test-22-passive-modal.json") {
      if (dupText === "übersetzt") return "wird übersetzt";
      if (dupText === "betreten werden") return "wird betreten";
    }
    if (file === "mini-test-23-konjunktiv-wuerde.json") {
      if (dupText === "würde") return "will";
      if (dupText === "würden") return "wollen";
      if (dupText === "würdest") return "willst";
      if (dupText === "würdet") return "wollt";
    }
    if (file === "mini-test-24-konjunktiv-irregular.json") {
      if (dupText === "hätte") return "haben würde";
      if (dupText === "wollte") return "wollten";
    }

    return dupText + " "; // fallback: add space to make unique (avoid)
  }

  return null;
}

// Group issues by file
const byFile = {};
report.forEach((issue) => {
  if (!byFile[issue.file]) byFile[issue.file] = [];
  byFile[issue.file].push(issue);
});

let fixedCount = 0;

for (const [file, issues] of Object.entries(byFile)) {
  const filePath = path.join(TESTS_DIR, file);
  const data = JSON.parse(fs.readFileSync(filePath, "utf8"));

  for (const issue of issues) {
    const q = data.questions.find((qu) => qu.id === issue.questionId);
    if (!q || !q.options) continue;

    const texts = q.options.map((o) => o.text);
    const firstIdx = {};
    const toReplace = []; // { index, currentText }
    q.options.forEach((opt, idx) => {
      if (firstIdx[opt.text] !== undefined) {
        toReplace.push({ index: idx, id: opt.id, currentText: opt.text });
      } else {
        firstIdx[opt.text] = idx;
      }
    });

    for (const { index, id, currentText } of toReplace) {
      const used = new Set(q.options.map((o) => o.text));
      let newText = null;

      if (file === "mini-test-01-dativ.json" && currentText === "dich") newText = "dem";
      else if (file === "mini-test-10-verb-forms-mixed.json" && currentText === "gehen") newText = "ging";
      else if (file === "mini-test-12-weil-dass.json" && currentText === "schließt") newText = "schließst";
      else if (file === "mini-test-12-weil-dass.json" && currentText === "beginnt") newText = "beginnst";
      else if ((file === "mini-test-16-reflexive-pronouns.json" || file === "mini-test-18-pronouns-mixed.json") && (currentText === "euch" || currentText === "uns")) {
        if (currentText === "euch") newText = "ihnen";
        else newText = used.has("euch") ? "ihnen" : "euch";
        if (used.has(newText)) newText = "mir";
      } else if (file === "mini-test-22-passive-modal.json" && currentText === "übersetzt") newText = "wird übersetzt";
      else if (file === "mini-test-22-passive-modal.json" && currentText === "betreten werden") newText = "wird betreten";
      else if (file === "mini-test-23-konjunktiv-wuerde.json") {
        if (currentText === "würde") newText = "will";
        else if (currentText === "würden") newText = "wollen";
        else if (currentText === "würdest") newText = "willst";
        else if (currentText === "würdet") newText = "wollt";
      } else if (file === "mini-test-24-konjunktiv-irregular.json") {
        if (currentText === "hätte") newText = "haben würde";
        else if (currentText === "wollte") newText = "wollten";
      }

      if (newText && !used.has(newText)) {
        q.options[index].text = newText;
        fixedCount++;
      }
    }
  }

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
}

console.log("Fixed", fixedCount, "duplicate options across", Object.keys(byFile).length, "files.");
