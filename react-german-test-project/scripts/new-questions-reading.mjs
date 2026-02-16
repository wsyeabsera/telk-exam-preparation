/**
 * New unique questions for reading comprehension (mock exams 04-09).
 * Each question must include passageId for the passage used in that test.
 */

const opt = (a, b, c, d) => [{ id: "a", text: a }, { id: "b", text: b }, { id: "c", text: c }, { id: "d", text: d }];

function makeReading(passageId, n) {
  const stems = [
    "Was ist das Hauptthema des Textes?",
    "Wer ist der Absender bzw. die Absenderin?",
    "An wen richtet sich der Text?",
    "Wann soll etwas stattfinden?",
    "Wo wird der Leser gebeten hinzugehen?",
    "Was wird im Text angeboten?",
    "Welche Information steht im ersten Absatz?",
    "Was muss der Leser tun?",
    "Welcher Zeitraum wird genannt?",
    "Was ist die Absicht des Textes?",
  ];
  const optionsSets = [
    opt("Eine Einladung", "Eine Absage", "Eine Beschwerde", "Eine Bestellung"),
    opt("Eine Firma", "Eine Behörde", "Eine Privatperson", "Eine Schule"),
    opt("An Bewerber", "An Kunden", "An Mitarbeiter", "An Studenten"),
    opt("Nächste Woche", "Letzten Monat", "In einem Jahr", "Gestern"),
    opt("Ins Büro", "Zur Post", "Nach Hause", "In die Schule"),
    opt("Hilfe", "Information", "Eine Stelle", "Einen Kurs"),
    opt("Eine Begrüßung", "Eine Frage", "Eine Bitte", "Eine Erklärung"),
    opt("Anrufen", "Schreiben", "Warten", "Bezahlen"),
    opt("Eine Woche", "Ein Monat", "Ein Jahr", "Ein Tag"),
    opt("Informieren", "Überzeugen", "Entschuldigen", "Danken"),
  ];
  const qs = [];
  for (let i = 0; i < n; i++) {
    const j = i % stems.length;
    qs.push({
      type: "multiple-choice",
      text: stems[j] + (i >= stems.length ? " (" + (i + 1) + ")" : ""),
      passageId,
      options: optionsSets[j],
      correctAnswerId: "a",
      explanation: "Lies den Text aufmerksam.",
      explanationDetail: "Die richtige Antwort findest du im Text. Achte auf Schlüsselwörter und Details.",
      tags: ["reading", "comprehension"],
    });
  }
  return qs;
}

const PASSAGE_IDS = {
  "mock-exam-04-email-job.json": "email-job-application-response",
  "mock-exam-05-email-apartment.json": "email-apartment-inquiry",
  "mock-exam-06-article-learning.json": "article-german-learning-tips",
  "mock-exam-07-article-health.json": "article-healthy-lifestyle",
  "mock-exam-08-notice-library.json": "notice-library-closure",
  "mock-exam-09-ad-language.json": "advertisement-language-course",
};

export const NEW_QUESTIONS_BY_FILE = {};
for (const [file, passageId] of Object.entries(PASSAGE_IDS)) {
  NEW_QUESTIONS_BY_FILE[file] = makeReading(passageId, 40);
}
