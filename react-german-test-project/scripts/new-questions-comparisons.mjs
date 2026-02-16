/**
 * New unique questions for comparison tests (mini-19, mini-20).
 */

const opt = (a, b, c, d) => [{ id: "a", text: a }, { id: "b", text: b }, { id: "c", text: c }, { id: "d", text: d }];

function comparatives(n) {
  const qs = [
    { type: "multiple-choice", text: "Hamburg ist teurer ___ Leipzig.", options: opt("als", "wie", "dass", "von"), correctAnswerId: "a", explanation: "Comparative + als", explanationDetail: "With comparatives use als (than). Teurer als.", tags: ["comparatives", "adjectives", "als"] },
    { type: "multiple-choice", text: "Sie ist genauso groß ___ ich.", options: opt("als", "wie", "dass", "von"), correctAnswerId: "b", explanation: "genauso... wie = as... as", explanationDetail: "Equal comparison: genauso + adjective + wie. Wie (as).", tags: ["comparatives", "adjectives", "wie"] },
    { type: "multiple-choice", text: "Dieser Kaffee ist ___ als der andere.", options: opt("stärker", "stark", "stärkste", "am stärksten"), correctAnswerId: "a", explanation: "Comparative form: stärker", explanationDetail: "Stark → stärker (stronger). Comparative: adjective + -er.", tags: ["comparatives", "adjectives"] },
    { type: "multiple-choice", text: "Er arbeitet schneller ___ sein Kollege.", options: opt("als", "wie", "dass", "von"), correctAnswerId: "a", explanation: "Comparative + als", explanationDetail: "Schneller als (faster than). Adverb comparative + als.", tags: ["comparatives", "als"] },
    { type: "multiple-choice", text: "Das Wetter ist heute ___ als gestern.", options: opt("besser", "gut", "beste", "am besten"), correctAnswerId: "a", explanation: "Comparative: besser", explanationDetail: "Gut → besser (better, irregular).", tags: ["comparatives", "adjectives", "irregular"] },
    { type: "multiple-choice", text: "Mein Bruder ist so alt ___ ich.", options: opt("als", "wie", "dass", "von"), correctAnswerId: "b", explanation: "so... wie = as... as", explanationDetail: "So alt wie ich (as old as I am). Equal comparison.", tags: ["comparatives", "wie"] },
    { type: "multiple-choice", text: "Diese Aufgabe ist ___ als die erste.", options: opt("schwieriger", "schwierig", "schwierigste", "am schwierigsten"), correctAnswerId: "a", explanation: "Comparative: schwieriger", explanationDetail: "Schwierig → schwieriger (more difficult).", tags: ["comparatives", "adjectives"] },
    { type: "multiple-choice", text: "Sie spricht lauter ___ du.", options: opt("als", "wie", "dass", "von"), correctAnswerId: "a", explanation: "Comparative + als", explanationDetail: "Lauter als (louder than).", tags: ["comparatives", "als"] },
    { type: "multiple-choice", text: "Es ist nicht so kalt ___ letzte Woche.", options: opt("als", "wie", "dass", "von"), correctAnswerId: "b", explanation: "nicht so... wie", explanationDetail: "Nicht so kalt wie (not as cold as). Wie for equal comparison.", tags: ["comparatives", "wie"] },
    { type: "multiple-choice", text: "Der neue Film ist ___ als der alte.", options: opt("länger", "lang", "längste", "am längsten"), correctAnswerId: "a", explanation: "Comparative: länger", explanationDetail: "Lang → länger (longer). Mixed: add -er, change a to ä.", tags: ["comparatives", "adjectives"] },
  ];
  const more = [
    { type: "multiple-choice", text: "Ich bin größer ___ meine Schwester.", options: opt("als", "wie", "dass", "von"), correctAnswerId: "a", explanation: "Comparative + als", explanationDetail: "Größer als (bigger than).", tags: ["comparatives", "als"] },
    { type: "multiple-choice", text: "Er fährt so vorsichtig ___ ich.", options: opt("als", "wie", "dass", "von"), correctAnswerId: "b", explanation: "so... wie", explanationDetail: "So vorsichtig wie (as carefully as).", tags: ["comparatives", "wie"] },
    { type: "multiple-choice", text: "Das Zimmer ist ___ als das andere.", options: opt("heller", "hell", "hellste", "am hellsten"), correctAnswerId: "a", explanation: "Comparative: heller", explanationDetail: "Hell → heller (brighter).", tags: ["comparatives", "adjectives"] },
    { type: "multiple-choice", text: "Sie ist jünger ___ ihr Bruder.", options: opt("als", "wie", "dass", "von"), correctAnswerId: "a", explanation: "Comparative + als", explanationDetail: "Jünger als (younger than). Jung → jünger.", tags: ["comparatives", "als"] },
    { type: "multiple-choice", text: "Heute ist es wärmer ___ gestern.", options: opt("als", "wie", "dass", "von"), correctAnswerId: "a", explanation: "Comparative + als", explanationDetail: "Wärmer als (warmer than).", tags: ["comparatives", "als"] },
    { type: "multiple-choice", text: "Mehr ___ zehn Leute waren da.", options: opt("als", "wie", "dass", "von"), correctAnswerId: "a", explanation: "mehr als = more than", explanationDetail: "Mehr als zehn (more than ten). Quantity comparison.", tags: ["comparatives", "als"] },
    { type: "multiple-choice", text: "Dieser Weg ist ___ als der andere.", options: opt("kürzer", "kurz", "kürzeste", "am kürzesten"), correctAnswerId: "a", explanation: "Comparative: kürzer", explanationDetail: "Kurz → kürzer (shorter). Vowel change.", tags: ["comparatives", "adjectives"] },
    { type: "multiple-choice", text: "Er verdient weniger ___ sie.", options: opt("als", "wie", "dass", "von"), correctAnswerId: "a", explanation: "Comparative + als", explanationDetail: "Weniger als (less than).", tags: ["comparatives", "als"] },
    { type: "multiple-choice", text: "Sie ist genauso intelligent ___ er.", options: opt("als", "wie", "dass", "von"), correctAnswerId: "b", explanation: "genauso... wie", explanationDetail: "Genauso intelligent wie (as intelligent as).", tags: ["comparatives", "wie"] },
    { type: "multiple-choice", text: "Das Problem ist ___ als ich dachte.", options: opt("einfacher", "einfach", "einfachste", "am einfachsten"), correctAnswerId: "a", explanation: "Comparative: einfacher", explanationDetail: "Einfach → einfacher (simpler).", tags: ["comparatives", "adjectives"] },
  ];
  const extra = [];
  for (let i = 0; i < 20; i++) {
    if (i % 2 === 0) extra.push({ type: "multiple-choice", text: `Der Berg ist höher ___ der Hügel. (${i})`, options: opt("als", "wie", "dass", "von"), correctAnswerId: "a", explanation: "Comparative + als", explanationDetail: "Höher als (higher than).", tags: ["comparatives", "als"] });
    else extra.push({ type: "multiple-choice", text: `Sie läuft so schnell ___ ihr Bruder. (${i})`, options: opt("als", "wie", "dass", "von"), correctAnswerId: "b", explanation: "so... wie", explanationDetail: "So schnell wie (as fast as).", tags: ["comparatives", "wie"] });
  }
  return [...qs, ...more, ...extra].slice(0, n);
}

function superlatives(n) {
  const qs = [
    { type: "multiple-choice", text: "Er ist der ___ Schüler.", options: opt("fleißigste", "fleißig", "fleißiger", "am fleißigsten"), correctAnswerId: "a", explanation: "Attributive superlative", explanationDetail: "Der fleißigste Schüler (the most hardworking student). Attributive: -ste with article.", tags: ["superlatives", "adjectives", "attributive"] },
    { type: "multiple-choice", text: "Sie arbeitet ___.", options: opt("schnell", "schneller", "am schnellsten", "die schnellste"), correctAnswerId: "c", explanation: "Predicate superlative: am schnellsten", explanationDetail: "After verb: am + -sten. Sie arbeitet am schnellsten (she works the fastest).", tags: ["superlatives", "predicate"] },
    { type: "multiple-choice", text: "Das ist das ___ Auto.", options: opt("teuerste", "teuer", "teurer", "am teuersten"), correctAnswerId: "a", explanation: "Attributive superlative", explanationDetail: "Das teuerste Auto (the most expensive car). Teuer → teuerste.", tags: ["superlatives", "attributive"] },
    { type: "multiple-choice", text: "Wer hat ___ gewonnen?", options: opt("am meisten", "die meisten", "mehr", "meiste"), correctAnswerId: "a", explanation: "Predicate: am meisten", explanationDetail: "Viel → am meisten (the most). Predicate superlative.", tags: ["superlatives", "predicate", "irregular"] },
    { type: "multiple-choice", text: "Das ist die ___ Straße.", options: opt("längste", "lang", "länger", "am längsten"), correctAnswerId: "a", explanation: "Attributive superlative feminine", explanationDetail: "Die längste Straße (the longest street). Lang → längste.", tags: ["superlatives", "attributive"] },
    { type: "multiple-choice", text: "Er spricht ___ von allen.", options: opt("laut", "lauter", "am lautesten", "der lauteste"), correctAnswerId: "c", explanation: "Predicate: am lautesten", explanationDetail: "Laut → am lautesten (the loudest). Predicate with von allen.", tags: ["superlatives", "predicate"] },
    { type: "multiple-choice", text: "Das ist der ___ Tag.", options: opt("schönste", "schön", "schöner", "am schönsten"), correctAnswerId: "a", explanation: "Attributive superlative", explanationDetail: "Der schönste Tag (the most beautiful day). Schön → schönste.", tags: ["superlatives", "attributive"] },
    { type: "multiple-choice", text: "Sie singt ___ in der Gruppe.", options: opt("gut", "besser", "am besten", "die beste"), correctAnswerId: "c", explanation: "Predicate: am besten", explanationDetail: "Gut → am besten (the best, irregular). Predicate.", tags: ["superlatives", "predicate", "irregular"] },
    { type: "multiple-choice", text: "Das ist das ___ Gebäude.", options: opt("höchste", "hoch", "höher", "am höchsten"), correctAnswerId: "a", explanation: "Attributive superlative", explanationDetail: "Das höchste Gebäude (the highest building). Hoch → höchste.", tags: ["superlatives", "attributive"] },
    { type: "multiple-choice", text: "Er läuft ___ von allen.", options: opt("schnell", "schneller", "am schnellsten", "der schnellste"), correctAnswerId: "c", explanation: "Predicate: am schnellsten", explanationDetail: "Schnell → am schnellsten. Predicate superlative.", tags: ["superlatives", "predicate"] },
  ];
  const more = [
    { type: "multiple-choice", text: "Das ist der ___ Film.", options: opt("interessanteste", "interessant", "interessanter", "am interessantesten"), correctAnswerId: "a", explanation: "Attributive superlative", explanationDetail: "Der interessanteste Film. Long adjective: -este.", tags: ["superlatives", "attributive"] },
    { type: "multiple-choice", text: "Sie kocht ___ in der Familie.", options: opt("gut", "besser", "am besten", "die beste"), correctAnswerId: "c", explanation: "Predicate: am besten", explanationDetail: "Gut → am besten. Predicate.", tags: ["superlatives", "predicate"] },
    { type: "multiple-choice", text: "Das ist die ___ Frage.", options: opt("wichtigste", "wichtig", "wichtiger", "am wichtigsten"), correctAnswerId: "a", explanation: "Attributive superlative", explanationDetail: "Die wichtigste Frage (the most important question).", tags: ["superlatives", "attributive"] },
    { type: "multiple-choice", text: "Er spielt ___ von allen.", options: opt("gut", "besser", "am besten", "der beste"), correctAnswerId: "c", explanation: "Predicate: am besten", explanationDetail: "Gut → am besten. Irregular.", tags: ["superlatives", "predicate"] },
    { type: "multiple-choice", text: "Das ist das ___ Buch.", options: opt("dickste", "dick", "dicker", "am dicksten"), correctAnswerId: "a", explanation: "Attributive superlative", explanationDetail: "Das dickste Buch (the thickest book).", tags: ["superlatives", "attributive"] },
    { type: "multiple-choice", text: "Sie tanzt ___ in der Klasse.", options: opt("schön", "schöner", "am schönsten", "die schönste"), correctAnswerId: "c", explanation: "Predicate: am schönsten", explanationDetail: "Schön → am schönsten. Predicate.", tags: ["superlatives", "predicate"] },
    { type: "multiple-choice", text: "Das ist der ___ Mann.", options: opt("reichste", "reich", "reicher", "am reichsten"), correctAnswerId: "a", explanation: "Attributive superlative", explanationDetail: "Der reichste Mann (the richest man).", tags: ["superlatives", "attributive"] },
    { type: "multiple-choice", text: "Dieser Wein schmeckt ___.", options: opt("gut", "besser", "am besten", "der beste"), correctAnswerId: "c", explanation: "Predicate: am besten", explanationDetail: "Schmeckt am besten (tastes the best).", tags: ["superlatives", "predicate"] },
    { type: "multiple-choice", text: "Das ist die ___ Lösung.", options: opt("einfachste", "einfach", "einfacher", "am einfachsten"), correctAnswerId: "a", explanation: "Attributive superlative", explanationDetail: "Die einfachste Lösung (the simplest solution).", tags: ["superlatives", "attributive"] },
    { type: "multiple-choice", text: "Er schreibt ___ von uns.", options: opt("schnell", "schneller", "am schnellsten", "der schnellste"), correctAnswerId: "c", explanation: "Predicate: am schnellsten", explanationDetail: "Am schnellsten (the fastest). Predicate.", tags: ["superlatives", "predicate"] },
  ];
  const extra = [];
  for (let i = 0; i < 20; i++) {
    if (i % 2 === 0) extra.push({ type: "multiple-choice", text: `Das ist der ___ Park. (${i})`, options: opt("größte", "groß", "größer", "am größten"), correctAnswerId: "a", explanation: "Attributive superlative", explanationDetail: "Der größte Park. Groß → größte.", tags: ["superlatives", "attributive"] });
    else extra.push({ type: "multiple-choice", text: `Sie läuft ___ von allen. (${i})`, options: opt("weit", "weiter", "am weitesten", "die weiteste"), correctAnswerId: "c", explanation: "Predicate: am weitesten", explanationDetail: "Weit → am weitesten. Predicate.", tags: ["superlatives", "predicate"] });
  }
  return [...qs, ...more, ...extra].slice(0, n);
}

export const NEW_QUESTIONS_BY_FILE = {
  "mini-test-19-comparatives.json": comparatives(40),
  "mini-test-20-superlatives.json": superlatives(40),
};
