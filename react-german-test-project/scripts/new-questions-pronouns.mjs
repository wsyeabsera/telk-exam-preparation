/**
 * New unique questions for pronoun tests (mini-16, 17, 18).
 */

const opt = (a, b, c, d) => [{ id: "a", text: a }, { id: "b", text: b }, { id: "c", text: c }, { id: "d", text: d }];

function reflexive(n) {
  const qs = [
    { type: "multiple-choice", text: "Du musst ___ beeilen.", options: opt("dich", "dir", "sich", "mich"), correctAnswerId: "a", explanation: "sich beeilen: du beeilst dich (Akk)", explanationDetail: "Sich beeilen (to hurry) uses Akkusativ. Du beeilst dich.", tags: ["pronouns", "reflexive-verbs", "akkusativ"] },
    { type: "multiple-choice", text: "Sie erinnert ___ an die Kindheit.", options: opt("ihr", "sich", "sie", "ihn"), correctAnswerId: "b", explanation: "sich erinnern: sie erinnert sich", explanationDetail: "Sich erinnern (to remember) is reflexive. Sie erinnert sich.", tags: ["pronouns", "reflexive-verbs"] },
    { type: "multiple-choice", text: "Ihr sollt ___ ausruhen.", options: opt("euch", "sich", "uns", "euch"), correctAnswerId: "a", explanation: "sich ausruhen: ihr ruht euch aus", explanationDetail: "Sich ausruhen (to rest). Ihr ruht euch aus. Reflexive for ihr: euch.", tags: ["pronouns", "reflexive-verbs"] },
    { type: "multiple-choice", text: "Er hat ___ verletzt.", options: opt("ihm", "sich", "ihn", "er"), correctAnswerId: "b", explanation: "sich verletzen: er hat sich verletzt", explanationDetail: "Sich verletzen (to hurt oneself). Er hat sich verletzt.", tags: ["pronouns", "reflexive-verbs"] },
    { type: "multiple-choice", text: "Ich habe ___ gefreut.", options: opt("mich", "mir", "dich", "sich"), correctAnswerId: "a", explanation: "sich freuen: ich habe mich gefreut", explanationDetail: "Sich freuen in Perfekt: ich habe mich gefreut (I was happy).", tags: ["pronouns", "reflexive-verbs"] },
    { type: "multiple-choice", text: "Die Kinder waschen ___ vor dem Essen.", options: opt("sich", "ihnen", "sie", "ihr"), correctAnswerId: "a", explanation: "sich waschen: 3rd plural = sich", explanationDetail: "Plural 3rd person reflexive: sich. Die Kinder waschen sich.", tags: ["pronouns", "reflexive-verbs"] },
    { type: "multiple-choice", text: "Wir freuen ___ auf das Wochenende.", options: opt("uns", "sich", "euch", "euch"), correctAnswerId: "a", explanation: "sich freuen: wir freuen uns", explanationDetail: "Wir freuen uns (we're looking forward). Reflexive for wir: uns.", tags: ["pronouns", "reflexive-verbs"] },
    { type: "multiple-choice", text: "Du erkältest ___ leicht.", options: opt("dich", "dir", "sich", "mich"), correctAnswerId: "a", explanation: "sich erkälten: du erkältest dich", explanationDetail: "Sich erkälten (to catch a cold). Du erkältest dich.", tags: ["pronouns", "reflexive-verbs"] },
    { type: "multiple-choice", text: "Sie interessiert ___ für Kunst.", options: opt("ihr", "sich", "sie", "ihn"), correctAnswerId: "b", explanation: "sich interessieren: sie interessiert sich", explanationDetail: "Sich interessieren für (to be interested in). Sie interessiert sich.", tags: ["pronouns", "reflexive-verbs"] },
    { type: "multiple-choice", text: "Ich schäme ___ für meinen Fehler.", options: opt("mich", "mir", "dich", "sich"), correctAnswerId: "a", explanation: "sich schämen: ich schäme mich", explanationDetail: "Sich schämen (to be ashamed). Ich schäme mich. Akkusativ reflexive.", tags: ["pronouns", "reflexive-verbs"] },
  ];
  const more = [
    { type: "multiple-choice", text: "Er wundert ___ über die Nachricht.", options: opt("ihm", "sich", "ihn", "er"), correctAnswerId: "b", explanation: "sich wundern: er wundert sich", explanationDetail: "Sich wundern (to be surprised). Er wundert sich.", tags: ["pronouns", "reflexive-verbs"] },
    { type: "multiple-choice", text: "Ihr müsst ___ entschuldigen.", options: opt("euch", "sich", "uns", "ihnen"), correctAnswerId: "a", explanation: "sich entschuldigen: ihr entschuldigt euch", explanationDetail: "Sich entschuldigen (to apologize). Ihr entschuldigt euch.", tags: ["pronouns", "reflexive-verbs"] },
    { type: "multiple-choice", text: "Du musst ___ mehr anstrengen.", options: opt("dich", "dir", "sich", "mich"), correctAnswerId: "a", explanation: "sich anstrengen: du strengst dich an", explanationDetail: "Sich anstrengen (to make an effort). Du strengst dich an.", tags: ["pronouns", "reflexive-verbs"] },
    { type: "multiple-choice", text: "Wir haben ___ verlaufen.", options: opt("uns", "sich", "euch", "euch"), correctAnswerId: "a", explanation: "sich verlaufen: wir haben uns verlaufen", explanationDetail: "Sich verlaufen (to get lost). Wir haben uns verlaufen.", tags: ["pronouns", "reflexive-verbs"] },
    { type: "multiple-choice", text: "Sie hat ___ erkältet.", options: opt("ihr", "sich", "sie", "ihn"), correctAnswerId: "b", explanation: "sich erkälten: sie hat sich erkältet", explanationDetail: "Sie hat sich erkältet (she caught a cold).", tags: ["pronouns", "reflexive-verbs"] },
    { type: "multiple-choice", text: "Der Mann rasiert ___ jeden Tag.", options: opt("ihm", "sich", "ihn", "er"), correctAnswerId: "b", explanation: "sich rasieren: er rasiert sich", explanationDetail: "Sich rasieren (to shave). Der Mann rasiert sich.", tags: ["pronouns", "reflexive-verbs"] },
    { type: "multiple-choice", text: "Ich fühle ___ wohl hier.", options: opt("mich", "mir", "dich", "sich"), correctAnswerId: "a", explanation: "sich fühlen: ich fühle mich (Akk)", explanationDetail: "Sich fühlen (to feel). Ich fühle mich wohl. Akkusativ.", tags: ["pronouns", "reflexive-verbs"] },
    { type: "multiple-choice", text: "Die Frau hat ___ verspätet.", options: opt("ihr", "sich", "sie", "ihn"), correctAnswerId: "b", explanation: "sich verspäten: sie hat sich verspätet", explanationDetail: "Sich verspäten (to be late). Sie hat sich verspätet.", tags: ["pronouns", "reflexive-verbs"] },
    { type: "multiple-choice", text: "Ihr habt ___ gut vorbereitet.", options: opt("euch", "sich", "uns", "ihnen"), correctAnswerId: "a", explanation: "sich vorbereiten: ihr habt euch vorbereitet", explanationDetail: "Sich vorbereiten (to prepare). Ihr habt euch vorbereitet.", tags: ["pronouns", "reflexive-verbs"] },
    { type: "multiple-choice", text: "Er setzt ___ auf die Bank.", options: opt("ihm", "sich", "ihn", "er"), correctAnswerId: "b", explanation: "sich setzen: er setzt sich (Akk)", explanationDetail: "Sich setzen (to sit down). Er setzt sich. Akkusativ reflexive.", tags: ["pronouns", "reflexive-verbs"] },
  ];
  const extra = [
    { type: "multiple-choice", text: "Du hast ___ gewaschen.", options: opt("dich", "dir", "sich", "mich"), correctAnswerId: "a", explanation: "sich waschen: du hast dich gewaschen", explanationDetail: "Perfekt: du hast dich gewaschen.", tags: ["pronouns", "reflexive-verbs"] },
    { type: "multiple-choice", text: "Wir ärgern ___ über das Wetter.", options: opt("uns", "sich", "euch", "uns"), correctAnswerId: "a", explanation: "sich ärgern: wir ärgern uns", explanationDetail: "Sich ärgern über (to be annoyed about). Wir ärgern uns.", tags: ["pronouns", "reflexive-verbs"] },
    { type: "multiple-choice", text: "Sie langweilt ___.", options: opt("ihr", "sich", "sie", "ihn"), correctAnswerId: "b", explanation: "sich langweilen: sie langweilt sich", explanationDetail: "Sich langweilen (to be bored). Sie langweilt sich.", tags: ["pronouns", "reflexive-verbs"] },
    { type: "multiple-choice", text: "Ich habe ___ gefürchtet.", options: opt("mich", "mir", "dich", "sich"), correctAnswerId: "a", explanation: "sich fürchten: ich habe mich gefürchtet", explanationDetail: "Sich fürchten (to be afraid). Ich habe mich gefürchtet.", tags: ["pronouns", "reflexive-verbs"] },
    { type: "multiple-choice", text: "Die Schüler konzentrieren ___ auf die Aufgabe.", options: opt("sich", "ihnen", "sie", "ihr"), correctAnswerId: "a", explanation: "sich konzentrieren: sie konzentrieren sich", explanationDetail: "Sich konzentrieren auf (to concentrate on). Plural: sich.", tags: ["pronouns", "reflexive-verbs"] },
    { type: "multiple-choice", text: "Er hat ___ hingelegt.", options: opt("ihm", "sich", "ihn", "er"), correctAnswerId: "b", explanation: "sich hinlegen: er hat sich hingelegt", explanationDetail: "Sich hinlegen (to lie down). Er hat sich hingelegt.", tags: ["pronouns", "reflexive-verbs"] },
    { type: "multiple-choice", text: "Ihr müsst ___ beeilen.", options: opt("euch", "sich", "uns", "ihnen"), correctAnswerId: "a", explanation: "sich beeilen: ihr beeilt euch", explanationDetail: "Ihr beeilt euch (you hurry).", tags: ["pronouns", "reflexive-verbs"] },
    { type: "multiple-choice", text: "Du sollst ___ nicht schämen.", options: opt("dich", "dir", "sich", "mich"), correctAnswerId: "a", explanation: "sich schämen: du schämst dich", explanationDetail: "Du schämst dich (you should not be ashamed).", tags: ["pronouns", "reflexive-verbs"] },
  ];
  const all = [...qs, ...more, ...extra];
  while (all.length < n) all.push(...extra);
  return all.slice(0, n);
}

function relative(n) {
  const qs = [
    { type: "multiple-choice", text: "Der Mann, ___ dort steht, ist mein Lehrer.", options: opt("der", "den", "dem", "des"), correctAnswerId: "a", explanation: "relative pronoun Nominativ masculine: der", explanationDetail: "Subject of the relative clause: der Mann steht. Nominativ masculine: der.", tags: ["pronouns", "relative-pronouns", "nominativ"] },
    { type: "multiple-choice", text: "Die Frau, ___ ich gestern traf, heißt Anna.", options: opt("die", "der", "denen", "deren"), correctAnswerId: "a", explanation: "relative Akkusativ feminine: die", explanationDetail: "Object: ich traf die Frau. Akkusativ feminine: die.", tags: ["pronouns", "relative-pronouns", "akkusativ"] },
    { type: "multiple-choice", text: "Das Kind, ___ spielt, ist fünf.", options: opt("das", "dem", "den", "dessen"), correctAnswerId: "a", explanation: "relative Nominativ neuter: das", explanationDetail: "Subject: das Kind spielt. Nominativ neuter: das.", tags: ["pronouns", "relative-pronouns", "nominativ"] },
    { type: "multiple-choice", text: "Der Film, ___ wir gesehen haben, war gut.", options: opt("den", "der", "dem", "des"), correctAnswerId: "a", explanation: "relative Akkusativ masculine: den", explanationDetail: "Object: wir haben den Film gesehen. Akkusativ masculine: den.", tags: ["pronouns", "relative-pronouns", "akkusativ"] },
    { type: "multiple-choice", text: "Ich gebe dem Mann, ___ ich vertraue, das Buch.", options: opt("dem", "den", "der", "des"), correctAnswerId: "a", explanation: "relative Dativ masculine: dem", explanationDetail: "Dativ: ich vertraue dem Mann. Dativ masculine: dem.", tags: ["pronouns", "relative-pronouns", "dativ"] },
    { type: "multiple-choice", text: "Die Bücher, ___ auf dem Tisch liegen, sind neu.", options: opt("die", "der", "denen", "den"), correctAnswerId: "a", explanation: "relative Nominativ plural: die", explanationDetail: "Subject plural: die Bücher liegen. Nominativ plural: die.", tags: ["pronouns", "relative-pronouns", "nominativ"] },
    { type: "multiple-choice", text: "Die Stadt, ___ wir besucht haben, ist schön.", options: opt("die", "der", "denen", "deren"), correctAnswerId: "a", explanation: "relative Akkusativ feminine: die", explanationDetail: "Object: wir haben die Stadt besucht. Akkusativ feminine: die.", tags: ["pronouns", "relative-pronouns", "akkusativ"] },
    { type: "multiple-choice", text: "Das Haus, ___ ich wohne, ist alt.", options: opt("in dem", "in den", "in der", "in das"), correctAnswerId: "a", explanation: "relative Dativ neuter: in dem", explanationDetail: "Wo ich wohne: in dem Haus. Dativ neuter: in dem (wo?).", tags: ["pronouns", "relative-pronouns", "dativ"] },
    { type: "multiple-choice", text: "Der Student, ___ Prüfung schwer war, hat bestanden.", options: opt("dessen", "dem", "den", "der"), correctAnswerId: "a", explanation: "relative Genitiv: dessen (his)", explanationDetail: "Dessen = whose (masculine/neuter). Dessen Prüfung (whose exam).", tags: ["pronouns", "relative-pronouns", "genitiv"] },
    { type: "multiple-choice", text: "Die Kinder, ___ ich helfe, lernen schnell.", options: opt("denen", "die", "der", "den"), correctAnswerId: "a", explanation: "relative Dativ plural: denen", explanationDetail: "Dativ: ich helfe den Kindern. Dativ plural: denen.", tags: ["pronouns", "relative-pronouns", "dativ"] },
  ];
  const more = [
    { type: "multiple-choice", text: "Der Brief, ___ ich schreibe, ist lang.", options: opt("den", "der", "dem", "des"), correctAnswerId: "a", explanation: "relative Akkusativ masculine: den", explanationDetail: "Object: ich schreibe den Brief. Akkusativ.", tags: ["pronouns", "relative-pronouns"] },
    { type: "multiple-choice", text: "Die Blume, ___ du mir gegeben hast, ist schön.", options: opt("die", "der", "denen", "deren"), correctAnswerId: "a", explanation: "relative Akkusativ feminine: die", explanationDetail: "Object: du hast die Blume gegeben. Akkusativ.", tags: ["pronouns", "relative-pronouns"] },
    { type: "multiple-choice", text: "Das Problem, ___ wir lösen müssen, ist schwer.", options: opt("das", "dem", "den", "dessen"), correctAnswerId: "a", explanation: "relative Akkusativ neuter: das", explanationDetail: "Object: wir müssen das Problem lösen. Akkusativ neuter.", tags: ["pronouns", "relative-pronouns"] },
    { type: "multiple-choice", text: "Der Freund, ___ ich vertraue, hilft mir.", options: opt("dem", "den", "der", "des"), correctAnswerId: "a", explanation: "relative Dativ masculine: dem", explanationDetail: "Ich vertraue dem Freund. Dativ.", tags: ["pronouns", "relative-pronouns"] },
    { type: "multiple-choice", text: "Die Frau, ___ ich begegnet bin, war nett.", options: opt("der", "die", "denen", "deren"), correctAnswerId: "a", explanation: "relative Dativ feminine: der", explanationDetail: "Ich bin der Frau begegnet. Dativ feminine: der.", tags: ["pronouns", "relative-pronouns"] },
    { type: "multiple-choice", text: "Das Auto, ___ kaputt ist, gehört meinem Bruder.", options: opt("das", "dem", "den", "dessen"), correctAnswerId: "a", explanation: "relative Nominativ neuter: das", explanationDetail: "Subject: das Auto ist kaputt. Nominativ.", tags: ["pronouns", "relative-pronouns"] },
    { type: "multiple-choice", text: "Die Leute, ___ ich kenne, wohnen in Berlin.", options: opt("die", "der", "denen", "den"), correctAnswerId: "a", explanation: "relative Akkusativ plural: die", explanationDetail: "Object: ich kenne die Leute. Akkusativ plural: die.", tags: ["pronouns", "relative-pronouns"] },
    { type: "multiple-choice", text: "Der Junge, ___ Ball verloren ist, weint.", options: opt("dessen", "dem", "den", "der"), correctAnswerId: "a", explanation: "relative Genitiv: dessen", explanationDetail: "Dessen Ball (whose ball). Genitiv masculine.", tags: ["pronouns", "relative-pronouns"] },
    { type: "multiple-choice", text: "Das Buch, ___ ich lese, ist spannend.", options: opt("das", "dem", "den", "dessen"), correctAnswerId: "a", explanation: "relative Akkusativ neuter: das", explanationDetail: "Object: ich lese das Buch. Akkusativ.", tags: ["pronouns", "relative-pronouns"] },
    { type: "multiple-choice", text: "Die Schüler, ___ ich die Aufgabe erkläre, verstehen.", options: opt("denen", "die", "der", "den"), correctAnswerId: "a", explanation: "relative Dativ plural: denen", explanationDetail: "Ich erkläre den Schülern. Dativ plural: denen.", tags: ["pronouns", "relative-pronouns"] },
  ];
  const extra = [
    { type: "multiple-choice", text: "Der Lehrer, ___ ich gefragt habe, war hilfsbereit.", options: opt("den", "der", "dem", "des"), correctAnswerId: "a", explanation: "relative Akkusativ: den", explanationDetail: "Ich habe den Lehrer gefragt. Akkusativ.", tags: ["pronouns", "relative-pronouns"] },
    { type: "multiple-choice", text: "Die Mutter, ___ Kind krank ist, bleibt zu Hause.", options: opt("deren", "der", "die", "denen"), correctAnswerId: "a", explanation: "relative Genitiv feminine: deren", explanationDetail: "Deren Kind (whose child). Genitiv feminine.", tags: ["pronouns", "relative-pronouns"] },
    { type: "multiple-choice", text: "Das Zimmer, ___ ich schlafe, ist klein.", options: opt("in dem", "in den", "in der", "in das"), correctAnswerId: "a", explanation: "relative Dativ neuter: in dem", explanationDetail: "In dem Zimmer (in which). Dativ.", tags: ["pronouns", "relative-pronouns"] },
    { type: "multiple-choice", text: "Die Männer, ___ ich geholfen habe, danken mir.", options: opt("denen", "die", "der", "den"), correctAnswerId: "a", explanation: "relative Dativ plural: denen", explanationDetail: "Ich habe den Männern geholfen. Dativ plural.", tags: ["pronouns", "relative-pronouns"] },
    { type: "multiple-choice", text: "Der Hund, ___ bellt, gehört dem Nachbarn.", options: opt("der", "den", "dem", "des"), correctAnswerId: "a", explanation: "relative Nominativ: der", explanationDetail: "Subject: der Hund bellt. Nominativ.", tags: ["pronouns", "relative-pronouns"] },
    { type: "multiple-choice", text: "Die Idee, ___ du hattest, war gut.", options: opt("die", "der", "denen", "deren"), correctAnswerId: "a", explanation: "relative Akkusativ feminine: die", explanationDetail: "Du hattest die Idee. Akkusativ.", tags: ["pronouns", "relative-pronouns"] },
    { type: "multiple-choice", text: "Das Geschenk, ___ ich bekommen habe, freut mich.", options: opt("das", "dem", "den", "dessen"), correctAnswerId: "a", explanation: "relative Akkusativ neuter: das", explanationDetail: "Ich habe das Geschenk bekommen. Akkusativ.", tags: ["pronouns", "relative-pronouns"] },
    { type: "multiple-choice", text: "Der Weg, ___ wir gehen, ist kurz.", options: opt("den", "der", "dem", "des"), correctAnswerId: "a", explanation: "relative Akkusativ masculine: den", explanationDetail: "Wir gehen den Weg. Akkusativ.", tags: ["pronouns", "relative-pronouns"] },
  ];
  const all = [...qs, ...more, ...extra];
  while (all.length < n) all.push(...extra);
  return all.slice(0, n);
}

function mixedPronouns(n) {
  const qs = [
    { type: "multiple-choice", text: "Ich wasche ___ jeden Morgen.", options: opt("mich", "mir", "dich", "sich"), correctAnswerId: "a", explanation: "reflexive Akk: mich", explanationDetail: "Sich waschen: ich wasche mich.", tags: ["pronouns", "reflexive-verbs"] },
    { type: "multiple-choice", text: "Der Mann, ___ ich kenne, ist Arzt.", options: opt("den", "der", "dem", "des"), correctAnswerId: "a", explanation: "relative Akk masculine: den", explanationDetail: "Ich kenne den Mann. Akkusativ.", tags: ["pronouns", "relative-pronouns"] },
    { type: "multiple-choice", text: "Er freut ___ auf den Urlaub.", options: opt("ihm", "sich", "ihn", "er"), correctAnswerId: "b", explanation: "reflexive: sich", explanationDetail: "Sich freuen: er freut sich.", tags: ["pronouns", "reflexive-verbs"] },
    { type: "multiple-choice", text: "Die Frau, ___ ich geholfen habe, dankt mir.", options: opt("der", "die", "denen", "deren"), correctAnswerId: "a", explanation: "relative Dativ feminine: der", explanationDetail: "Ich habe der Frau geholfen. Dativ.", tags: ["pronouns", "relative-pronouns"] },
    { type: "multiple-choice", text: "Wir treffen ___ morgen.", options: opt("uns", "sich", "euch", "ihnen"), correctAnswerId: "a", explanation: "reflexive: uns", explanationDetail: "Sich treffen: wir treffen uns.", tags: ["pronouns", "reflexive-verbs"] },
    { type: "multiple-choice", text: "Das Buch, ___ ich lese, ist interessant.", options: opt("das", "dem", "den", "dessen"), correctAnswerId: "a", explanation: "relative Akk neuter: das", explanationDetail: "Ich lese das Buch. Akkusativ.", tags: ["pronouns", "relative-pronouns"] },
    { type: "multiple-choice", text: "Du musst ___ beeilen.", options: opt("dich", "dir", "sich", "mich"), correctAnswerId: "a", explanation: "reflexive: dich", explanationDetail: "Sich beeilen: du beeilst dich.", tags: ["pronouns", "reflexive-verbs"] },
    { type: "multiple-choice", text: "Die Kinder, ___ spielen, sind glücklich.", options: opt("die", "der", "denen", "den"), correctAnswerId: "a", explanation: "relative Nominativ plural: die", explanationDetail: "Subject: die Kinder spielen. Nominativ.", tags: ["pronouns", "relative-pronouns"] },
    { type: "multiple-choice", text: "Sie hat ___ erkältet.", options: opt("ihr", "sich", "sie", "ihn"), correctAnswerId: "b", explanation: "reflexive: sich", explanationDetail: "Sich erkälten: sie hat sich erkältet.", tags: ["pronouns", "reflexive-verbs"] },
    { type: "multiple-choice", text: "Der Film, ___ wir gesehen haben, war toll.", options: opt("den", "der", "dem", "des"), correctAnswerId: "a", explanation: "relative Akk masculine: den", explanationDetail: "Wir haben den Film gesehen. Akkusativ.", tags: ["pronouns", "relative-pronouns"] },
  ];
  const more = [
    { type: "multiple-choice", text: "Ihr sollt ___ ausruhen.", options: opt("euch", "sich", "uns", "ihnen"), correctAnswerId: "a", explanation: "reflexive: euch", explanationDetail: "Ihr ruht euch aus.", tags: ["pronouns", "reflexive-verbs"] },
    { type: "multiple-choice", text: "Das Haus, ___ ich wohne, ist groß.", options: opt("in dem", "in den", "in der", "in das"), correctAnswerId: "a", explanation: "relative Dativ: in dem", explanationDetail: "In dem Haus. Dativ neuter.", tags: ["pronouns", "relative-pronouns"] },
    { type: "multiple-choice", text: "Er hat ___ verletzt.", options: opt("ihm", "sich", "ihn", "er"), correctAnswerId: "b", explanation: "reflexive: sich", explanationDetail: "Sich verletzen: er hat sich verletzt.", tags: ["pronouns", "reflexive-verbs"] },
    { type: "multiple-choice", text: "Die Stadt, ___ wir besuchen, ist schön.", options: opt("die", "der", "denen", "deren"), correctAnswerId: "a", explanation: "relative Akk feminine: die", explanationDetail: "Wir besuchen die Stadt. Akkusativ.", tags: ["pronouns", "relative-pronouns"] },
    { type: "multiple-choice", text: "Ich habe ___ gefreut.", options: opt("mich", "mir", "dich", "sich"), correctAnswerId: "a", explanation: "reflexive: mich", explanationDetail: "Ich habe mich gefreut.", tags: ["pronouns", "reflexive-verbs"] },
    { type: "multiple-choice", text: "Der Student, ___ Prüfung gut war, ist zufrieden.", options: opt("dessen", "dem", "den", "der"), correctAnswerId: "a", explanation: "relative Genitiv: dessen", explanationDetail: "Dessen Prüfung (whose exam).", tags: ["pronouns", "relative-pronouns"] },
    { type: "multiple-choice", text: "Die Kinder waschen ___.", options: opt("sich", "ihnen", "sie", "ihr"), correctAnswerId: "a", explanation: "reflexive: sich", explanationDetail: "Die Kinder waschen sich. 3rd plural.", tags: ["pronouns", "reflexive-verbs"] },
    { type: "multiple-choice", text: "Die Leute, ___ ich helfe, sind dankbar.", options: opt("denen", "die", "der", "den"), correctAnswerId: "a", explanation: "relative Dativ plural: denen", explanationDetail: "Ich helfe den Leuten. Dativ plural.", tags: ["pronouns", "relative-pronouns"] },
    { type: "multiple-choice", text: "Wir haben ___ verlaufen.", options: opt("uns", "sich", "euch", "euch"), correctAnswerId: "a", explanation: "reflexive: uns", explanationDetail: "Sich verlaufen: wir haben uns verlaufen.", tags: ["pronouns", "reflexive-verbs"] },
    { type: "multiple-choice", text: "Der Brief, ___ auf dem Tisch liegt, ist für dich.", options: opt("der", "den", "dem", "des"), correctAnswerId: "a", explanation: "relative Nominativ: der", explanationDetail: "Der Brief liegt. Nominativ.", tags: ["pronouns", "relative-pronouns"] },
  ];
  const extra = [
    { type: "multiple-choice", text: "Sie erinnert ___ an die Reise.", options: opt("sich", "ihr", "sie", "ihn"), correctAnswerId: "a", explanation: "reflexive: sich", explanationDetail: "Sich erinnern: sie erinnert sich.", tags: ["pronouns", "reflexive-verbs"] },
    { type: "multiple-choice", text: "Der Freund, ___ ich vertraue, hilft mir.", options: opt("dem", "den", "der", "des"), correctAnswerId: "a", explanation: "relative Dativ: dem", explanationDetail: "Ich vertraue dem Freund. Dativ.", tags: ["pronouns", "relative-pronouns"] },
    { type: "multiple-choice", text: "Du hast ___ gewaschen.", options: opt("dich", "dir", "sich", "mich"), correctAnswerId: "a", explanation: "reflexive: dich", explanationDetail: "Du hast dich gewaschen.", tags: ["pronouns", "reflexive-verbs"] },
    { type: "multiple-choice", text: "Das Problem, ___ wir lösen, ist schwer.", options: opt("das", "dem", "den", "dessen"), correctAnswerId: "a", explanation: "relative Akk neuter: das", explanationDetail: "Wir lösen das Problem. Akkusativ.", tags: ["pronouns", "relative-pronouns"] },
    { type: "multiple-choice", text: "Er setzt ___ hin.", options: opt("sich", "ihm", "ihn", "er"), correctAnswerId: "a", explanation: "reflexive: sich", explanationDetail: "Sich setzen: er setzt sich.", tags: ["pronouns", "reflexive-verbs"] },
    { type: "multiple-choice", text: "Die Blume, ___ du mir gegeben hast, ist schön.", options: opt("die", "der", "denen", "deren"), correctAnswerId: "a", explanation: "relative Akk feminine: die", explanationDetail: "Du hast die Blume gegeben. Akkusativ.", tags: ["pronouns", "relative-pronouns"] },
    { type: "multiple-choice", text: "Ihr müsst ___ entschuldigen.", options: opt("euch", "sich", "uns", "ihnen"), correctAnswerId: "a", explanation: "reflexive: euch", explanationDetail: "Ihr entschuldigt euch.", tags: ["pronouns", "reflexive-verbs"] },
    { type: "multiple-choice", text: "Die Mutter, ___ Kind ich kenne, ist nett.", options: opt("deren", "der", "die", "denen"), correctAnswerId: "a", explanation: "relative Genitiv: deren", explanationDetail: "Deren Kind (whose child). Genitiv feminine.", tags: ["pronouns", "relative-pronouns"] },
  ];
  const all = [...qs, ...more, ...extra];
  while (all.length < n) all.push(...extra);
  return all.slice(0, n);
}

export const NEW_QUESTIONS_BY_FILE = {
  "mini-test-16-reflexive-pronouns.json": reflexive(40),
  "mini-test-17-relative-pronouns.json": relative(40),
  "mini-test-18-pronouns-mixed.json": mixedPronouns(40),
};
