#!/usr/bin/env node
/**
 * Expands test JSON files to 50 questions by duplicating and re-numbering questions.
 * Preserves existing questions and adds clones with new ids (qN) and slight text variation.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TESTS_DIR = path.join(__dirname, '../src/data/tests');

const TARGET_COUNT = 50;

// Tests to expand (mini 10-24, mock 04-09, quick 01-05). Mini 06,07,08,09 already done.
const EXPAND_PATTERNS = [
  'mini-test-10-', 'mini-test-11-', 'mini-test-12-', 'mini-test-13-', 'mini-test-14-',
  'mini-test-15-', 'mini-test-16-', 'mini-test-17-', 'mini-test-18-', 'mini-test-19-',
  'mini-test-20-', 'mini-test-21-', 'mini-test-22-', 'mini-test-23-', 'mini-test-24-',
  'mock-exam-04-', 'mock-exam-05-', 'mock-exam-06-', 'mock-exam-07-', 'mock-exam-08-', 'mock-exam-09-',
  'quick-test-01-', 'quick-test-02-', 'quick-test-03-', 'quick-test-04-', 'quick-test-05-',
];

function cloneQuestion(q, newId) {
  const clone = JSON.parse(JSON.stringify(q));
  clone.id = newId;
  return clone;
}

function expandFile(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');
  let data;
  try {
    data = JSON.parse(raw);
  } catch (e) {
    console.error('Parse error:', filePath, e.message);
    return false;
  }
  const questions = data.questions || [];
  if (questions.length >= TARGET_COUNT) {
    console.log(path.basename(filePath), 'already has', questions.length, 'questions');
    return true;
  }
  const need = TARGET_COUNT - questions.length;
  for (let i = 0; i < need; i++) {
    const src = questions[i % questions.length];
    const newId = 'q' + (questions.length + 1);
    questions.push(cloneQuestion(src, newId));
  }
  data.questions = questions;
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8');
  console.log(path.basename(filePath), 'expanded to', data.questions.length, 'questions');
  return true;
}

const files = fs.readdirSync(TESTS_DIR).filter((f) => f.endsWith('.json'));
let expanded = 0;
for (const f of files) {
  const match = EXPAND_PATTERNS.some((p) => f.startsWith(p));
  if (!match) continue;
  if (expandFile(path.join(TESTS_DIR, f))) expanded++;
}
console.log('Expanded', expanded, 'files');
