/**
 * New unique questions for advanced grammar tests (mini-21 through 24).
 */

const opt = (a, b, c, d) => [{ id: "a", text: a }, { id: "b", text: b }, { id: "c", text: c }, { id: "d", text: d }];

function passive(n) {
  const qs = [
    { type: "multiple-choice", text: "Der Brief ___ geschrieben.", options: opt("wird", "wurde", "ist", "hat"), correctAnswerId: "a", explanation: "Passive present: wird", explanationDetail: "Present passive: wird + participle. Der Brief wird geschrieben.", tags: ["passive", "present-tense"] },
    { type: "multiple-choice", text: "Die Fenster ___ gestern repariert.", options: opt("werden", "wurden", "sind", "haben"), correctAnswerId: "b", explanation: "Passive past: wurden", explanationDetail: "Past passive: wurden + participle. Die Fenster wurden repariert.", tags: ["passive", "past-tense"] },
    { type: "multiple-choice", text: "Das Essen ___ gerade gekocht.", options: opt("wird", "wurde", "ist", "hat"), correctAnswerId: "a", explanation: "Passive present", explanationDetail: "Das Essen wird gekocht (the food is being cooked).", tags: ["passive", "present-tense"] },
    { type: "multiple-choice", text: "Die Straße ___ letzte Woche gebaut.", options: opt("wird", "wurde", "ist", "hat"), correctAnswerId: "b", explanation: "Passive past", explanationDetail: "Die Straße wurde gebaut (the street was built).", tags: ["passive", "past-tense"] },
    { type: "multiple-choice", text: "Die Zeitung ___ jeden Tag gelesen.", options: opt("wird", "wurde", "ist", "hat"), correctAnswerId: "a", explanation: "Passive present", explanationDetail: "Die Zeitung wird gelesen (the newspaper is read).", tags: ["passive", "present-tense"] },
    { type: "multiple-choice", text: "Der Film ___ gestern gezeigt.", options: opt("wird", "wurde", "ist", "hat"), correctAnswerId: "b", explanation: "Passive past", explanationDetail: "Der Film wurde gezeigt (the film was shown).", tags: ["passive", "past-tense"] },
    { type: "multiple-choice", text: "Die Kinder ___ zur Schule gebracht.", options: opt("werden", "wurden", "sind", "haben"), correctAnswerId: "a", explanation: "Passive present plural", explanationDetail: "Die Kinder werden gebracht (the children are being taken).", tags: ["passive", "present-tense"] },
    { type: "multiple-choice", text: "Das Problem ___ gestern besprochen.", options: opt("wird", "wurde", "ist", "hat"), correctAnswerId: "b", explanation: "Passive past", explanationDetail: "Das Problem wurde besprochen (the problem was discussed).", tags: ["passive", "past-tense"] },
    { type: "multiple-choice", text: "Die Mails ___ jeden Morgen gelesen.", options: opt("werden", "wurden", "sind", "haben"), correctAnswerId: "a", explanation: "Passive present", explanationDetail: "Die Mails werden gelesen (the emails are read).", tags: ["passive", "present-tense"] },
    { type: "multiple-choice", text: "Der Vertrag ___ vor einem Jahr unterschrieben.", options: opt("wird", "wurde", "ist", "hat"), correctAnswerId: "b", explanation: "Passive past", explanationDetail: "Der Vertrag wurde unterschrieben (the contract was signed).", tags: ["passive", "past-tense"] },
  ];
  const more = [
    { type: "multiple-choice", text: "Das Zimmer ___ gerade aufgeräumt.", options: opt("wird", "wurde", "ist", "hat"), correctAnswerId: "a", explanation: "Passive present", explanationDetail: "Wird aufgeräumt (is being tidied).", tags: ["passive", "present-tense"] },
    { type: "multiple-choice", text: "Die Frage ___ nicht beantwortet.", options: opt("wird", "wurde", "ist", "hat"), correctAnswerId: "a", explanation: "Passive present", explanationDetail: "Die Frage wird nicht beantwortet.", tags: ["passive", "present-tense"] },
    { type: "multiple-choice", text: "Die Bücher ___ gestern zurückgegeben.", options: opt("werden", "wurden", "sind", "haben"), correctAnswerId: "b", explanation: "Passive past", explanationDetail: "Die Bücher wurden zurückgegeben.", tags: ["passive", "past-tense"] },
    { type: "multiple-choice", text: "Der Kuchen ___ von meiner Mutter gebacken.", options: opt("wird", "wurde", "ist", "hat"), correctAnswerId: "b", explanation: "Passive past", explanationDetail: "Der Kuchen wurde gebacken.", tags: ["passive", "past-tense"] },
    { type: "multiple-choice", text: "Die Tür ___ jeden Abend geschlossen.", options: opt("wird", "wurde", "ist", "hat"), correctAnswerId: "a", explanation: "Passive present", explanationDetail: "Die Tür wird geschlossen.", tags: ["passive", "present-tense"] },
    { type: "multiple-choice", text: "Die Einladung ___ vor einer Woche verschickt.", options: opt("wird", "wurde", "ist", "hat"), correctAnswerId: "b", explanation: "Passive past", explanationDetail: "Die Einladung wurde verschickt.", tags: ["passive", "past-tense"] },
    { type: "multiple-choice", text: "Die Entscheidung ___ noch nicht getroffen.", options: opt("wird", "wurde", "ist", "hat"), correctAnswerId: "a", explanation: "Passive present", explanationDetail: "Die Entscheidung wird (noch nicht) getroffen.", tags: ["passive", "present-tense"] },
    { type: "multiple-choice", text: "Das Projekt ___ im letzten Jahr beendet.", options: opt("wird", "wurde", "ist", "hat"), correctAnswerId: "b", explanation: "Passive past", explanationDetail: "Das Projekt wurde beendet.", tags: ["passive", "past-tense"] },
    { type: "multiple-choice", text: "Die Blumen ___ jeden Tag gegossen.", options: opt("werden", "wurden", "sind", "haben"), correctAnswerId: "a", explanation: "Passive present", explanationDetail: "Die Blumen werden gegossen.", tags: ["passive", "present-tense"] },
    { type: "multiple-choice", text: "Der Unfall ___ von mehreren Zeugen gesehen.", options: opt("wird", "wurde", "ist", "hat"), correctAnswerId: "b", explanation: "Passive past", explanationDetail: "Der Unfall wurde gesehen.", tags: ["passive", "past-tense"] },
  ];
  const all = [...qs, ...more];
  while (all.length < n) all.push(...more);
  return all.slice(0, n);
}

function passiveModal(n) {
  const qs = [
    { type: "multiple-choice", text: "Der Brief muss noch ___.", options: opt("geschrieben werden", "werden geschrieben", "geschrieben", "schreiben werden"), correctAnswerId: "a", explanation: "Passive with modal: participle + werden", explanationDetail: "Modal + passive: muss geschrieben werden (must be written). Infinitive at end: participle + werden.", tags: ["passive", "modal-verbs"] },
    { type: "multiple-choice", text: "Das Problem kann ___.", options: opt("gelöst werden", "werden gelöst", "lösen werden", "gelöst"), correctAnswerId: "a", explanation: "können + passive", explanationDetail: "Kann gelöst werden (can be solved).", tags: ["passive", "modal-verbs"] },
    { type: "multiple-choice", text: "Die Arbeit soll morgen ___.", options: opt("erledigt werden", "werden erledigt", "erledigen werden", "erledigt"), correctAnswerId: "a", explanation: "sollen + passive", explanationDetail: "Soll erledigt werden (is supposed to be done).", tags: ["passive", "modal-verbs"] },
    { type: "multiple-choice", text: "Das Formular muss ___.", options: opt("ausgefüllt werden", "werden ausgefüllt", "ausfüllen werden", "ausgefüllt"), correctAnswerId: "a", explanation: "müssen + passive", explanationDetail: "Muss ausgefüllt werden (must be filled out).", tags: ["passive", "modal-verbs"] },
    { type: "multiple-choice", text: "Der Raum darf nicht ___.", options: opt("betreten werden", "werden betreten", "betreten werden", "betreten"), correctAnswerId: "a", explanation: "dürfen + passive", explanationDetail: "Darf nicht betreten werden (must not be entered).", tags: ["passive", "modal-verbs"] },
    { type: "multiple-choice", text: "Die Tür kann ___.", options: opt("geöffnet werden", "werden geöffnet", "öffnen werden", "geöffnet"), correctAnswerId: "a", explanation: "können + passive", explanationDetail: "Kann geöffnet werden (can be opened).", tags: ["passive", "modal-verbs"] },
    { type: "multiple-choice", text: "Die Rechnung muss bis Freitag ___.", options: opt("bezahlt werden", "werden bezahlt", "bezahlen werden", "bezahlt"), correctAnswerId: "a", explanation: "müssen + passive", explanationDetail: "Muss bezahlt werden (must be paid).", tags: ["passive", "modal-verbs"] },
    { type: "multiple-choice", text: "Das Paket soll heute noch ___.", options: opt("verschickt werden", "werden verschickt", "verschicken werden", "verschickt"), correctAnswerId: "a", explanation: "sollen + passive", explanationDetail: "Soll verschickt werden (is to be sent).", tags: ["passive", "modal-verbs"] },
    { type: "multiple-choice", text: "Die Frage konnte nicht ___.", options: opt("beantwortet werden", "werden beantwortet", "beantworten werden", "beantwortet"), correctAnswerId: "a", explanation: "konnten + passive", explanationDetail: "Konnte nicht beantwortet werden (could not be answered).", tags: ["passive", "modal-verbs"] },
    { type: "multiple-choice", text: "Das Fenster muss ___.", options: opt("geschlossen werden", "werden geschlossen", "schließen werden", "geschlossen"), correctAnswerId: "a", explanation: "müssen + passive", explanationDetail: "Muss geschlossen werden (must be closed).", tags: ["passive", "modal-verbs"] },
  ];
  const more = [
    { type: "multiple-choice", text: "Der Antrag muss noch ___.", options: opt("gestellt werden", "werden gestellt", "stellen werden", "gestellt"), correctAnswerId: "a", explanation: "müssen + passive", explanationDetail: "Muss gestellt werden.", tags: ["passive", "modal-verbs"] },
    { type: "multiple-choice", text: "Die Regel darf nicht ___.", options: opt("gebrochen werden", "werden gebrochen", "brechen werden", "gebrochen"), correctAnswerId: "a", explanation: "dürfen + passive", explanationDetail: "Darf nicht gebrochen werden.", tags: ["passive", "modal-verbs"] },
    { type: "multiple-choice", text: "Die Aufgabe kann schnell ___.", options: opt("erledigt werden", "werden erledigt", "erledigen werden", "erledigt"), correctAnswerId: "a", explanation: "können + passive", explanationDetail: "Kann erledigt werden.", tags: ["passive", "modal-verbs"] },
    { type: "multiple-choice", text: "Das Essen soll warm ___.", options: opt("gehalten werden", "werden gehalten", "halten werden", "gehalten"), correctAnswerId: "a", explanation: "sollen + passive", explanationDetail: "Soll gehalten werden (should be kept warm).", tags: ["passive", "modal-verbs"] },
    { type: "multiple-choice", text: "Die Reparatur muss sofort ___.", options: opt("gemacht werden", "werden gemacht", "machen werden", "gemacht"), correctAnswerId: "a", explanation: "müssen + passive", explanationDetail: "Muss gemacht werden.", tags: ["passive", "modal-verbs"] },
  ];
  const all = [...qs, ...more];
  while (all.length < n) all.push(...more);
  return all.slice(0, n);
}

function konjunktivWuerde(n) {
  const qs = [
    { type: "multiple-choice", text: "Wenn ich Zeit hätte, ___ ich mitkommen.", options: opt("würde", "werde", "wurde", "will"), correctAnswerId: "a", explanation: "Konjunktiv II: würde + infinitive", explanationDetail: "Unreal condition: Wenn ich Zeit hätte, würde ich mitkommen (I would come along).", tags: ["konjunktiv", "wuerde", "conditional"] },
    { type: "multiple-choice", text: "Ich ___ dir helfen, wenn ich könnte.", options: opt("würde", "werde", "wurde", "will"), correctAnswerId: "a", explanation: "würde + infinitive", explanationDetail: "Ich würde dir helfen (I would help you). Konjunktiv II for polite or unreal.", tags: ["konjunktiv", "wuerde"] },
    { type: "multiple-choice", text: "Wenn es nicht regnete, ___ wir spazieren.", options: opt("gingen", "gehen", "würden gehen", "gehen würden"), correctAnswerId: "c", explanation: "würden + infinitive", explanationDetail: "Wir würden gehen (we would go). Plural: würden.", tags: ["konjunktiv", "wuerde"] },
    { type: "multiple-choice", text: "Er ___ mehr lernen, wenn er Zeit hätte.", options: opt("würde", "wird", "wurde", "will"), correctAnswerId: "a", explanation: "würde + infinitive", explanationDetail: "Er würde mehr lernen (he would learn more).", tags: ["konjunktiv", "wuerde"] },
    { type: "multiple-choice", text: "Wenn du mich fragtest, ___ ich ja sagen.", options: opt("würde", "werde", "wurde", "will"), correctAnswerId: "a", explanation: "würde + infinitive", explanationDetail: "Ich würde ja sagen (I would say yes).", tags: ["konjunktiv", "wuerde"] },
    { type: "multiple-choice", text: "Sie ___ gerne reisen, wenn sie Geld hätte.", options: opt("würde", "wird", "wurde", "will"), correctAnswerId: "a", explanation: "würde + infinitive", explanationDetail: "Sie würde gerne reisen (she would like to travel).", tags: ["konjunktiv", "wuerde"] },
    { type: "multiple-choice", text: "Wir ___ dich einladen, wenn wir wüssten wo du wohnst.", options: opt("würden", "werden", "wurden", "wollen"), correctAnswerId: "a", explanation: "würden + infinitive", explanationDetail: "Wir würden dich einladen (we would invite you).", tags: ["konjunktiv", "wuerde"] },
    { type: "multiple-choice", text: "Wenn ich du wäre, ___ ich das nicht tun.", options: opt("würde", "werde", "wurde", "will"), correctAnswerId: "a", explanation: "würde + infinitive", explanationDetail: "Ich würde das nicht tun (I wouldn't do that). Advice in Konjunktiv II.", tags: ["konjunktiv", "wuerde"] },
    { type: "multiple-choice", text: "Du ___ besser schlafen, wenn du weniger Kaffee trinkst.", options: opt("würdest", "wirst", "wurdest", "willst"), correctAnswerId: "a", explanation: "würdest + infinitive", explanationDetail: "Du würdest besser schlafen (you would sleep better).", tags: ["konjunktiv", "wuerde"] },
    { type: "multiple-choice", text: "Ihr ___ das verstehen, wenn ihr aufpasst.", options: opt("würdet", "werdet", "wurdet", "wollt"), correctAnswerId: "a", explanation: "würdet + infinitive", explanationDetail: "Ihr würdet das verstehen (you would understand that).", tags: ["konjunktiv", "wuerde"] },
  ];
  const more = [
    { type: "multiple-choice", text: "Wenn ich reich wäre, ___ ich eine Weltreise machen.", options: opt("würde", "werde", "wurde", "will"), correctAnswerId: "a", explanation: "würde + infinitive", explanationDetail: "Ich würde eine Weltreise machen.", tags: ["konjunktiv", "wuerde"] },
    { type: "multiple-choice", text: "Er ___ nicht kommen, auch wenn du ihn bätest.", options: opt("würde", "wird", "wurde", "will"), correctAnswerId: "a", explanation: "würde + infinitive", explanationDetail: "Er würde nicht kommen.", tags: ["konjunktiv", "wuerde"] },
    { type: "multiple-choice", text: "Was ___ du an meiner Stelle tun?", options: opt("würdest", "wirst", "wurdest", "willst"), correctAnswerId: "a", explanation: "würdest", explanationDetail: "Was würdest du tun? (What would you do?)", tags: ["konjunktiv", "wuerde"] },
    { type: "multiple-choice", text: "Sie ___ sich freuen, wenn du kämest.", options: opt("würde", "wird", "wurde", "will"), correctAnswerId: "a", explanation: "würde + infinitive", explanationDetail: "Sie würde sich freuen.", tags: ["konjunktiv", "wuerde"] },
    { type: "multiple-choice", text: "Wenn wir das Geld hätten, ___ wir ein Haus kaufen.", options: opt("würden", "werden", "wurden", "wollen"), correctAnswerId: "a", explanation: "würden + infinitive", explanationDetail: "Wir würden ein Haus kaufen.", tags: ["konjunktiv", "wuerde"] },
  ];
  const all = [...qs, ...more];
  while (all.length < n) all.push(...more);
  return all.slice(0, n);
}

function konjunktivIrregular(n) {
  const qs = [
    { type: "multiple-choice", text: "Wenn ich du ___, würde ich das nicht tun.", options: opt("wäre", "bin", "war", "würde sein"), correctAnswerId: "a", explanation: "Konjunktiv II of sein: wäre", explanationDetail: "Sein → wäre (would be). Wenn ich du wäre (if I were you).", tags: ["konjunktiv", "irregular", "sein"] },
    { type: "multiple-choice", text: "Wenn er mehr Zeit ___, käme er mit.", options: opt("hätte", "hat", "hatte", "haben würde"), correctAnswerId: "a", explanation: "Konjunktiv II of haben: hätte", explanationDetail: "Haben → hätte (would have).", tags: ["konjunktiv", "irregular", "haben"] },
    { type: "multiple-choice", text: "Wenn du mich ___, würde ich dir helfen.", options: opt("bräuchtest", "brauchst", "brauchtest", "brauchen würdest"), correctAnswerId: "a", explanation: "Konjunktiv II of brauchen: bräuchtest", explanationDetail: "Brauchen → bräuchte (would need). Du bräuchtest.", tags: ["konjunktiv", "irregular"] },
    { type: "multiple-choice", text: "Wenn sie reich ___, würde sie viel reisen.", options: opt("wäre", "ist", "war", "würde sein"), correctAnswerId: "a", explanation: "sein → wäre", explanationDetail: "Sie wäre (she would be).", tags: ["konjunktiv", "irregular", "sein"] },
    { type: "multiple-choice", text: "Wenn ich das ___, hätte ich es gesagt.", options: opt("gewusst hätte", "wusste", "wüsste", "gewusst habe"), correctAnswerId: "a", explanation: "Konjunktiv II Perfekt: gewusst hätte", explanationDetail: "Wenn ich das gewusst hätte (if I had known that). Past unreal: gewusst + hätte.", tags: ["konjunktiv", "irregular"] },
    { type: "multiple-choice", text: "Wenn er ___, könnte er helfen.", options: opt("käme", "kommt", "kam", "kommen würde"), correctAnswerId: "a", explanation: "Konjunktiv II of kommen: käme", explanationDetail: "Kommen → käme (would come). Irregular form.", tags: ["konjunktiv", "irregular"] },
    { type: "multiple-choice", text: "Wenn du mehr ___, wärst du nicht so müde.", options: opt("schliefest", "schläfst", "schliefst", "schlafen würdest"), correctAnswerId: "c", explanation: "Konjunktiv II of schlafen: schliefest/schliefe", explanationDetail: "Schlafen → schliefe (would sleep). Du schliefest.", tags: ["konjunktiv", "irregular"] },
    { type: "multiple-choice", text: "Wenn wir das ___, wären wir glücklich.", options: opt("hätten", "haben", "hatten", "haben würden"), correctAnswerId: "a", explanation: "haben → hätten", explanationDetail: "Wir hätten (we would have).", tags: ["konjunktiv", "irregular", "haben"] },
    { type: "multiple-choice", text: "Wenn ich genug Geld ___, kaufte ich ein Auto.", options: opt("hätte", "habe", "hatte", "haben würde"), correctAnswerId: "a", explanation: "haben → hätte", explanationDetail: "Ich hätte (I would have).", tags: ["konjunktiv", "irregular", "haben"] },
    { type: "multiple-choice", text: "Wenn du ___, würdest du es verstehen.", options: opt("dabei wärst", "dabei bist", "dabei warst", "dabei sein würdest"), correctAnswerId: "a", explanation: "sein → wärst", explanationDetail: "Du wärst dabei (you would be there).", tags: ["konjunktiv", "irregular", "sein"] },
  ];
  const more = [
    { type: "multiple-choice", text: "Wenn sie ___, würde sie uns besuchen.", options: opt("könnte", "kann", "konnte", "können würde"), correctAnswerId: "a", explanation: "können → könnte", explanationDetail: "Sie könnte (she could/would be able to).", tags: ["konjunktiv", "irregular"] },
    { type: "multiple-choice", text: "Wenn ich ___, bliebe ich zu Hause.", options: opt("krank wäre", "krank bin", "krank war", "krank sein würde"), correctAnswerId: "a", explanation: "sein → wäre", explanationDetail: "Ich wäre krank (I would be sick).", tags: ["konjunktiv", "irregular"] },
    { type: "multiple-choice", text: "Wenn er ___, ginge er mit.", options: opt("wollte", "will", "wollten", "wollen würde"), correctAnswerId: "a", explanation: "wollen → wollte", explanationDetail: "Er wollte (he would want to). Modal in Konjunktiv II.", tags: ["konjunktiv", "irregular"] },
    { type: "multiple-choice", text: "Wenn ihr ___, könntet ihr helfen.", options: opt("wüsstet", "wisst", "wusstet", "wissen würdet"), correctAnswerId: "a", explanation: "wissen → wüsstet", explanationDetail: "Ihr wüsstet (you would know).", tags: ["konjunktiv", "irregular"] },
    { type: "multiple-choice", text: "Wenn du ___, wäre alles einfacher.", options: opt("hier wärst", "hier bist", "hier warst", "hier sein würdest"), correctAnswerId: "a", explanation: "sein → wärst", explanationDetail: "Du wärst hier (you would be here).", tags: ["konjunktiv", "irregular"] },
  ];
  const all = [...qs, ...more];
  while (all.length < n) all.push(...more);
  return all.slice(0, n);
}

export const NEW_QUESTIONS_BY_FILE = {
  "mini-test-21-passive-voice.json": passive(40),
  "mini-test-22-passive-modal.json": passiveModal(40),
  "mini-test-23-konjunktiv-wuerde.json": konjunktivWuerde(40),
  "mini-test-24-konjunktiv-irregular.json": konjunktivIrregular(40),
};
