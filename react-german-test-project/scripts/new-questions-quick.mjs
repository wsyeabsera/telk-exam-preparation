/**
 * New unique questions for quick practice tests (quick-test-01 through 05).
 */

const opt = (a, b, c, d) => [{ id: "a", text: a }, { id: "b", text: b }, { id: "c", text: c }, { id: "d", text: d }];

function dativAkkusativ(n) {
  const qs = [
    { type: "multiple-choice", text: "Ich danke ___ Lehrer.", options: opt("der", "den", "dem", "des"), correctAnswerId: "c", explanation: "danken + Dativ: dem", explanationDetail: "Danken takes Dativ. Ich danke dem Lehrer. Masculine Dativ: dem.", tags: ["cases", "dativ", "quick-practice"] },
    { type: "multiple-choice", text: "Er gibt ___ Kind das Buch.", options: opt("der", "den", "dem", "das"), correctAnswerId: "c", explanation: "geben + Dativ + Akkusativ", explanationDetail: "Geben takes Dativ (recipient) and Akkusativ (thing). Dem Kind (neuter Dativ).", tags: ["cases", "dativ", "quick-practice"] },
    { type: "multiple-choice", text: "Sie hilft ___ Frau.", options: opt("der", "die", "den", "dem"), correctAnswerId: "a", explanation: "helfen + Dativ: der", explanationDetail: "Helfen takes Dativ. Der Frau (feminine Dativ).", tags: ["cases", "dativ", "quick-practice"] },
    { type: "multiple-choice", text: "Wir sehen ___ Mann.", options: opt("der", "den", "dem", "des"), correctAnswerId: "b", explanation: "sehen + Akkusativ: den", explanationDetail: "Sehen takes Akkusativ. Den Mann (masculine Akkusativ).", tags: ["cases", "akkusativ", "quick-practice"] },
    { type: "multiple-choice", text: "Ich schreibe ___ Freundin.", options: opt("der", "die", "den", "dem"), correctAnswerId: "a", explanation: "schreiben + Dativ: der", explanationDetail: "Schreiben takes Dativ. Der Freundin (feminine Dativ).", tags: ["cases", "dativ", "quick-practice"] },
    { type: "multiple-choice", text: "Er kauft ___ Apfel.", options: opt("der", "den", "dem", "des"), correctAnswerId: "b", explanation: "kaufen + Akkusativ: den", explanationDetail: "Kaufen takes Akkusativ. Den Apfel (masculine Akkusativ).", tags: ["cases", "akkusativ", "quick-practice"] },
    { type: "multiple-choice", text: "Du antwortest ___ Lehrer.", options: opt("der", "den", "dem", "des"), correctAnswerId: "c", explanation: "antworten + Dativ: dem", explanationDetail: "Antworten takes Dativ. Dem Lehrer.", tags: ["cases", "dativ", "quick-practice"] },
    { type: "multiple-choice", text: "Sie trifft ___ Freund.", options: opt("der", "den", "dem", "des"), correctAnswerId: "b", explanation: "treffen + Akkusativ: den", explanationDetail: "Treffen takes Akkusativ. Den Freund.", tags: ["cases", "akkusativ", "quick-practice"] },
  ];
  const more = [
    { type: "multiple-choice", text: "Ich gratuliere ___ Kollegin.", options: opt("der", "die", "den", "dem"), correctAnswerId: "a", explanation: "gratulieren + Dativ", explanationDetail: "Gratulieren takes Dativ. Der Kollegin.", tags: ["cases", "dativ", "quick-practice"] },
    { type: "multiple-choice", text: "Er fragt ___ Nachbarn.", options: opt("der", "den", "dem", "des"), correctAnswerId: "b", explanation: "fragen + Akkusativ", explanationDetail: "Fragen takes Akkusativ. Den Nachbarn.", tags: ["cases", "akkusativ", "quick-practice"] },
    { type: "multiple-choice", text: "Wir folgen ___ Mann.", options: opt("der", "den", "dem", "des"), correctAnswerId: "c", explanation: "folgen + Dativ", explanationDetail: "Folgen takes Dativ. Dem Mann.", tags: ["cases", "dativ", "quick-practice"] },
    { type: "multiple-choice", text: "Sie liest ___ Buch.", options: opt("der", "den", "dem", "das"), correctAnswerId: "d", explanation: "lesen + Akkusativ neuter", explanationDetail: "Lesen takes Akkusativ. Das Buch (neuter).", tags: ["cases", "akkusativ", "quick-practice"] },
  ];
  const all = [...qs, ...more];
  while (all.length < n) all.push(...more.map((q, i) => ({ ...q, text: q.text + " (" + (all.length + i) + ")" })));
  return all.slice(0, n);
}

function adjectiveEndings(n) {
  const qs = [
    { type: "multiple-choice", text: "Das ist ein gut___ Film.", options: opt("e", "er", "en", "es"), correctAnswerId: "b", explanation: "ein + adjective + masculine Nom: -er", explanationDetail: "Ein guter Film. Indefinite article + masculine Nominativ: -er.", tags: ["adjectives", "declension", "quick-practice"] },
    { type: "multiple-choice", text: "Ich habe die klein___ Wohnung.", options: opt("e", "er", "en", "es"), correctAnswerId: "a", explanation: "die + adjective + feminine Akk: -e", explanationDetail: "Die kleine Wohnung. Definite article + feminine: -e.", tags: ["adjectives", "declension", "quick-practice"] },
    { type: "multiple-choice", text: "Er gibt dem arm___ Kind Geld.", options: opt("e", "en", "er", "es"), correctAnswerId: "b", explanation: "dem + adjective + neuter Dativ: -en", explanationDetail: "Dem armen Kind. Dativ: -en after article.", tags: ["adjectives", "declension", "quick-practice"] },
    { type: "multiple-choice", text: "Sie hat einen neu___ Wagen.", options: opt("e", "er", "en", "es"), correctAnswerId: "c", explanation: "einen + adjective + masculine Akk: -en", explanationDetail: "Einen neuen Wagen. Masculine Akkusativ: -en.", tags: ["adjectives", "declension", "quick-practice"] },
  ];
  const all = [...qs];
  while (all.length < n) all.push(...qs.map((q, i) => ({ ...q, text: q.text.replace(/\.$/, "") + " (" + (all.length + 1) + ")." })));
  return all.slice(0, n);
}

function wordOrder(n) {
  const qs = [
    { type: "multiple-choice", text: "Gestern ___ ich ins Kino.", options: opt("bin ich gegangen", "ich bin gegangen", "gegangen bin ich", "ich gegangen bin"), correctAnswerId: "a", explanation: "Time first, then verb, then subject", explanationDetail: "Gestern bin ich ins Kino (gegangen). V2: verb in second position.", tags: ["word-order", "quick-practice"] },
    { type: "multiple-choice", text: "Weil ich krank ___, bleibe ich zu Hause.", options: opt("bin", "ist", "sind", "war"), correctAnswerId: "a", explanation: "weil sends verb to end", explanationDetail: "Subordinate clause: verb at end. Weil ich krank bin.", tags: ["word-order", "conjunctions", "quick-practice"] },
    { type: "multiple-choice", text: "Ich ___ morgen nach Berlin.", options: opt("fahre", "nach Berlin fahre", "nach Berlin morgen fahre", "morgen nach Berlin"), correctAnswerId: "a", explanation: "V2: verb second", explanationDetail: "Ich fahre morgen nach Berlin. Subject + verb + time + place.", tags: ["word-order", "quick-practice"] },
  ];
  const all = [...qs];
  while (all.length < n) all.push(...qs.map((q, i) => ({ ...q, text: q.text + " (" + (all.length + 1) + ")" })));
  return all.slice(0, n);
}

function prepositionsLocation(n) {
  const qs = [
    { type: "multiple-choice", text: "Das Buch liegt ___ dem Tisch.", options: opt("auf", "bei", "nach", "zu"), correctAnswerId: "a", explanation: "auf + Dativ = on", explanationDetail: "Auf dem Tisch (on the table). Location: auf + Dativ.", tags: ["prepositions", "location", "quick-practice"] },
    { type: "multiple-choice", text: "Er wohnt ___ seinen Eltern.", options: opt("auf", "bei", "in", "nach"), correctAnswerId: "b", explanation: "bei + Dativ = at/near", explanationDetail: "Bei seinen Eltern (at his parents'). Bei = at someone's place.", tags: ["prepositions", "location", "quick-practice"] },
    { type: "multiple-choice", text: "Die Lampe hängt ___ der Decke.", options: opt("auf", "an", "in", "unter"), correctAnswerId: "b", explanation: "an + Dativ = on (vertical)", explanationDetail: "An der Decke (on the ceiling). An for vertical surface.", tags: ["prepositions", "location", "quick-practice"] },
    { type: "multiple-choice", text: "Der Schlüssel ist ___ der Tasche.", options: opt("auf", "bei", "in", "nach"), correctAnswerId: "c", explanation: "in + Dativ = inside", explanationDetail: "In der Tasche (in the bag). In for enclosed space.", tags: ["prepositions", "location", "quick-practice"] },
  ];
  const all = [...qs];
  while (all.length < n) all.push(...qs.map((q, i) => ({ ...q, text: q.text.replace(/\.$/, "") + " (" + (all.length + 1) + ")." })));
  return all.slice(0, n);
}

function commonMistakes(n) {
  const qs = [
    { type: "multiple-choice", text: "Ich ___ die Antwort. (I know the answer)", options: opt("kenne", "weiß", "kann", "weiße"), correctAnswerId: "b", explanation: "wissen = to know (facts)", explanationDetail: "Ich weiß die Antwort. Wissen for facts, kennen for people/places.", tags: ["vocabulary", "common-mistakes", "quick-practice"] },
    { type: "multiple-choice", text: "Das ___ mir. (That matters to me)", options: opt("ist wichtig", "macht", "ist egal", "bedeutet"), correctAnswerId: "c", explanation: "Das ist mir egal", explanationDetail: "Egal = doesn't matter. Das ist mir egal (I don't care / that doesn't matter to me).", tags: ["vocabulary", "common-mistakes", "quick-practice"] },
    { type: "multiple-choice", text: "Er wird ___ (He becomes a teacher)", options: opt("Lehrer", "ein Lehrer", "der Lehrer", "Lehrern"), correctAnswerId: "a", explanation: "werden + profession without article", explanationDetail: "Er wird Lehrer (he becomes a teacher). No article with profession after werden.", tags: ["vocabulary", "grammar", "quick-practice"] },
    { type: "multiple-choice", text: "Sie hat ___ (She made a mistake)", options: opt("ein Fehler gemacht", "einen Fehler gemacht", "einer Fehler gemacht", "einen Fehler machen"), correctAnswerId: "b", explanation: "einen Fehler machen", explanationDetail: "Einen Fehler machen. Fehler is masculine Akkusativ. Haben + past participle.", tags: ["vocabulary", "cases", "quick-practice"] },
  ];
  const all = [...qs];
  while (all.length < n) all.push(...qs.map((q, i) => ({ ...q, text: q.text + " (" + (all.length + 1) + ")" })));
  return all.slice(0, n);
}

export const NEW_QUESTIONS_BY_FILE = {
  "quick-test-01-dativ-akkusativ.json": dativAkkusativ(42),
  "quick-test-02-adjective-endings.json": adjectiveEndings(42),
  "quick-test-03-word-order.json": wordOrder(42),
  "quick-test-04-prepositions-location.json": prepositionsLocation(42),
  "quick-test-05-common-mistakes.json": commonMistakes(42),
};
