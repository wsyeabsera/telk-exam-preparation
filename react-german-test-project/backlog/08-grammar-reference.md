# In-App Grammar Reference

## Summary
A searchable grammar reference that links directly from test questions and mistake entries, so users can study the underlying rule without leaving the app.

## Problem
When a user gets a question wrong, the explanation covers that specific question but doesn't teach the broader grammar rule. Users have to leave the app to look up Dativ prepositions or Konjunktiv II conjugation tables. The `explanationDetail` field exists on some questions but coverage is inconsistent.

## Proposed Solution
- **`/grammar` page** with a searchable index of B1 grammar topics
- Each topic is a static markdown page covering: rule summary, table/conjugation, common mistakes, example sentences
- Topics map to existing question tags (akkusativ, dativ, perfekt, konjunktiv-ii, etc.)
- Link from question explanations: "Learn more about Akkusativ" → `/grammar/akkusativ`
- Link from TopicBreakdown and Mistake Journal entries
- Start with ~15 core topics matching the most common tags

## Key Changes

| File | Action |
|------|--------|
| `src/data/grammar/*.md` | Create — markdown files for each grammar topic |
| `src/app/grammar/page.tsx` | Create — grammar index with search |
| `src/app/grammar/[topic]/page.tsx` | Create — individual grammar topic page |
| `src/lib/data/load-grammar.ts` | Create — load and parse grammar markdown files |
| `src/components/test/QuestionRenderer.tsx` | Modify — add "Learn more" link when question tags match a grammar topic |
| `src/components/charts/TopicBreakdown.tsx` | Modify — link topic names to grammar reference |

## Topics to Cover (initial set)
1. Nominativ / Akkusativ / Dativ / Genitiv (cases)
2. Definite & indefinite articles by case
3. Perfekt (haben/sein + Partizip II)
4. Praeteritum (simple past)
5. Modal verbs (word order, meanings)
6. Separable verbs
7. weil/dass (subordinate clause word order)
8. wenn/als (temporal conjunctions)
9. obwohl/trotzdem (contrast)
10. Reflexive pronouns
11. Relative pronouns & relative clauses
12. Comparative & superlative
13. Passive voice (werden + Partizip II)
14. Konjunktiv II (wuerde + irrealis)
15. Prepositions with Akkusativ / Dativ / Wechselpraepositionen

## Acceptance Criteria
- [ ] `/grammar` page lists all available topics
- [ ] Each topic page renders readable markdown with tables
- [ ] Search/filter works on the index page
- [ ] Question explanations link to relevant grammar topic
- [ ] TopicBreakdown topic names link to grammar reference
- [ ] Works fully offline (static markdown, no API calls)
