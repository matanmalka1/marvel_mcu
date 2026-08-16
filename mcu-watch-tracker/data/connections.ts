import type { Connection } from "@/types/movie";

/**
 * SPOILER RULE
 * ────────────
 * A connection is rendered only when every movie in `requires` has been watched.
 * A thread must never describe, hint at, or set up anything from a movie outside `requires`.
 */
export const CONNECTIONS: Connection[] = [
  {
    id: "tesseract",
    title: "Tesseract",
    chain: ["Captain America: The First Avenger", "Captain Marvel"],
    description:
      "אותו מקור אנרגיה מסתורי מופיע בשתי תקופות שונות לגמרי, ומחבר בין אירועים על פני כדור הארץ לבין מה שקורה הרחק ממנו.",
    requires: ["captain-america-the-first-avenger", "captain-marvel"],
  },
  {
    id: "stark-family",
    title: "משפחת Stark",
    chain: ["Howard Stark", "Tony Stark"],
    description:
      "הטכנולוגיה, המחקר וההחלטות של Howard ממשיכים להשפיע על Tony הרבה אחרי שהוא כבר לא בתמונה.",
    requires: ["captain-america-the-first-avenger", "iron-man"],
  },
  {
    id: "nick-fury",
    title: "Nick Fury",
    chain: ["Captain Marvel", "Iron Man", "Avengers Initiative"],
    description:
      "Fury הופך בהדרגה לאחד המחברים המרכזיים בין אנשים יוצאי דופן — הוא מגיע לכל אחד מהם בנפרד.",
    requires: ["captain-marvel", "iron-man"],
  },
  {
    id: "shield",
    title: "S.H.I.E.L.D",
    chain: ["Nick Fury", "Natasha Romanoff", "Tony Stark"],
    description:
      "הארגון מנטר ומעריך אנשים בעלי יכולות חריגות או טכנולוגיה יוצאת דופן, לפעמים מקרוב מאוד.",
    requires: ["captain-marvel", "iron-man-2"],
  },
  {
    id: "stark-vanko",
    title: "ההיסטוריה של Stark ו-Vanko",
    chain: ["Howard Stark + Anton Vanko", "Tony Stark + Ivan Vanko"],
    description: "סכסוך מהדור הקודם צף מחדש בדור הבא, עם אותם צדדים ובאותה עוצמה.",
    requires: ["iron-man-2"],
  },
  {
    id: "big-picture",
    title: "התמונה הגדולה",
    chain: [
      "סופר-סולג'ר",
      "איומים מחוץ לכדור הארץ",
      "טכנולוגיה מתקדמת",
      "S.H.I.E.L.D",
      "Avengers Initiative",
    ],
    description:
      "ארבעה סרטים, ארבע נקודות פתיחה שונות — וכולן מתכנסות לאותה מסקנה: מישהו צריך לרכז את כל אלה יחד.",
    requires: [
      "captain-america-the-first-avenger",
      "captain-marvel",
      "iron-man",
      "iron-man-2",
    ],
    wide: true,
  },
  {
    id: "hydra",
    title: "HYDRA",
    chain: ["HYDRA (1945)", "S.H.I.E.L.D מבפנים", "Age of Ultron", "Civil War"],
    description:
      "הארגון שהובס כביכול במלחמת העולם השנייה מתגלה כשורד בסתר בתוך S.H.I.E.L.D במשך עשורים, וממשיך להשפיע גם אחרי שהתפרק.",
    requires: [
      "captain-america-the-first-avenger",
      "captain-america-the-winter-soldier",
      "avengers-age-of-ultron",
      "captain-america-civil-war",
    ],
  },
  {
    id: "bucky-barnes",
    title: "Bucky Barnes",
    chain: ["The First Avenger", "The Winter Soldier", "Civil War", "Endgame"],
    description:
      "מחייל שנחשב מת, דרך מתנקש בשליטת מוח ועד ידיד קרוב שמסייע ל-Sam — המסע של Bucky חוצה כמעט את כל הסאגה.",
    requires: [
      "captain-america-the-first-avenger",
      "captain-america-the-winter-soldier",
      "captain-america-civil-war",
      "avengers-endgame",
    ],
  },
  {
    id: "infinity-stones",
    title: "אבני האינסוף",
    chain: ["Tesseract", "Orb", "Aether", "Eye of Agamotto", "שרביט Loki", "Vormir"],
    description:
      "שישה חפצים שנראו כנפרדים לגמרי מתאחדים בסופו של דבר בכפפה אחת — אבני האינסוף.",
    requires: [
      "captain-america-the-first-avenger",
      "guardians-of-the-galaxy",
      "thor-the-dark-world",
      "doctor-strange",
      "avengers-age-of-ultron",
      "avengers-infinity-war",
    ],
    wide: true,
  },
  {
    id: "thanos-threat",
    title: "האיום של Thanos",
    chain: ["רמז ב-Guardians of the Galaxy", "רמז ב-Age of Ultron", "Infinity War", "Endgame"],
    description:
      "צלו של Thanos מרחף ברקע שנים לפני שהוא בכלל מופיע על המסך.",
    requires: [
      "guardians-of-the-galaxy",
      "avengers-age-of-ultron",
      "avengers-infinity-war",
      "avengers-endgame",
    ],
  },
  {
    id: "loki",
    title: "Loki",
    chain: ["Thor", "The Avengers", "Thor: The Dark World", "Thor: Ragnarok", "Infinity War"],
    description:
      "מהנבל הראשון של ה-MCU ועד קורבן בפתיחת Infinity War — המסע המפותל של Loki.",
    requires: [
      "thor",
      "the-avengers",
      "thor-the-dark-world",
      "thor-ragnarok",
      "avengers-infinity-war",
    ],
  },
  {
    id: "wakanda-vibranium",
    title: "וואקנדה וויבראניום",
    chain: ["Civil War", "Black Panther", "Infinity War", "Wakanda Forever", "Brave New World"],
    description:
      "מממלכה נסתרת ועד משאב מבוקש בעולם כולו — וואקנדה והוויבראניום שלה נמצאים במרכז מתיחות בין-לאומית לאורך שנים.",
    requires: [
      "captain-america-civil-war",
      "black-panther",
      "avengers-infinity-war",
      "black-panther-wakanda-forever",
      "captain-america-brave-new-world",
    ],
  },
  {
    id: "spider-identity",
    title: "הזהות של Spider-Man",
    chain: ["Civil War", "Homecoming", "Far From Home", "No Way Home", "Brand New Day"],
    description:
      "מנער שכונתי שגויס על ידי Tony Stark ועד גיבור אלמוני שנמחק מזיכרון כולם — זהותו של Peter Parker היא הימור מתמשך.",
    requires: [
      "captain-america-civil-war",
      "spider-man-homecoming",
      "spider-man-far-from-home",
      "spider-man-no-way-home",
      "spider-man-brand-new-day",
    ],
  },
  {
    id: "multiverse",
    title: "המולטיוורס",
    chain: ["No Way Home", "Multiverse of Madness", "Quantumania", "Deadpool & Wolverine"],
    description:
      "מכישוף שהשתבש ועד רודן מולטיברסלי ועד ה-TVA עצמה — המולטיוורס הופך לאיום מרכזי בפאזה הזו.",
    requires: [
      "spider-man-no-way-home",
      "doctor-strange-in-the-multiverse-of-madness",
      "ant-man-and-the-wasp-quantumania",
      "deadpool-and-wolverine",
    ],
  },
  {
    id: "caps-shield",
    title: "המגן של Captain America",
    chain: ["The First Avenger", "The Winter Soldier", "Civil War", "Endgame", "Brave New World"],
    description:
      "מגן שעבר מ-Steve Rogers ל-Sam Wilson — סמל שממשיך לשאת משמעות גם כשמחליפים ידיים.",
    requires: [
      "captain-america-the-first-avenger",
      "captain-america-the-winter-soldier",
      "captain-america-civil-war",
      "avengers-endgame",
      "captain-america-brave-new-world",
    ],
  },
  {
    id: "black-widow-arc",
    title: "Natasha Romanoff / Black Widow",
    chain: ["Iron Man 2", "Age of Ultron", "Civil War", "Black Widow", "Endgame"],
    description:
      "מסוכנת מושתלת ועד קורבן שמאפשר לצוות להשלים את המשימה — המסע של Natasha מגיע לסיום מרגש.",
    requires: [
      "iron-man-2",
      "avengers-age-of-ultron",
      "captain-america-civil-war",
      "black-widow",
      "avengers-endgame",
    ],
  },
  {
    id: "quantum-realm",
    title: "Quantum Realm",
    chain: ["Ant-Man", "Ant-Man and the Wasp", "Endgame", "Quantumania"],
    description:
      "ממד תת-אטומי שמתחיל כתעלומה מדעית והופך לכלי שמציל את היקום — ואז לזירת קרב בפני עצמה.",
    requires: [
      "ant-man",
      "ant-man-and-the-wasp",
      "avengers-endgame",
      "ant-man-and-the-wasp-quantumania",
    ],
  },
  {
    id: "gamora-thanos",
    title: "Gamora ומשפחת Thanos",
    chain: ["Guardians of the Galaxy", "Guardians Vol. 2", "Infinity War", "Endgame", "Guardians Vol. 3"],
    description:
      "בת מאומצת שהפכה לכלי נשק, ואז לקורבן, ואז לגרסה אחרת לגמרי של עצמה — הקשר בין Gamora ל-Thanos רודף את שני הצדדים.",
    requires: [
      "guardians-of-the-galaxy",
      "guardians-of-the-galaxy-vol-2",
      "avengers-infinity-war",
      "avengers-endgame",
      "guardians-of-the-galaxy-vol-3",
    ],
  },
  {
    id: "vision-mind-stone",
    title: "Vision ואבן התודעה",
    chain: ["The Avengers", "Age of Ultron", "Civil War", "Infinity War"],
    description:
      "משרביט חייזרי מסוכן ועד ישות חדשה לגמרי — ועד המחיר שהיא משלמת כדי להגן על מה שבתוכה.",
    requires: [
      "the-avengers",
      "avengers-age-of-ultron",
      "captain-america-civil-war",
      "avengers-infinity-war",
    ],
  },
  {
    id: "wong-sorcerers",
    title: "Wong ומגני הסתר",
    chain: ["Doctor Strange", "Shang-Chi", "No Way Home", "Multiverse of Madness"],
    description:
      "Wong עובר מספרן שקט ועד Sorcerer Supreme שמגן על המציאות עצמה מפני איומים חוצי-ממד.",
    requires: [
      "doctor-strange",
      "shang-chi-and-the-legend-of-the-ten-rings",
      "spider-man-no-way-home",
      "doctor-strange-in-the-multiverse-of-madness",
    ],
  },
  {
    id: "carol-danvers",
    title: "Carol Danvers ו-Kree/Skrull",
    chain: ["Captain Marvel", "Endgame", "The Marvels"],
    description:
      "ממלחמה קריאנית-אימפריאלית ועד סכסוך שהיא עצמה יצרה — הבחירות של Carol ממשיכות לרדוף אותה.",
    requires: ["captain-marvel", "avengers-endgame", "the-marvels"],
  },
  {
    id: "new-team",
    title: "הצוות החדש",
    chain: ["Black Widow", "Ant-Man and the Wasp", "Thunderbolts", "Brand New Day"],
    description:
      "דמויות משנה שנראו בעבר כנספח לעלילות אחרות מתכנסות בהדרגה לגרעין של הדור הבא של גיבורים.",
    requires: [
      "black-widow",
      "ant-man-and-the-wasp",
      "thunderbolts",
      "spider-man-brand-new-day",
    ],
  },
  {
    id: "bruce-banner",
    title: "Bruce Banner / Hulk",
    chain: ["The Incredible Hulk", "The Avengers", "Age of Ultron", "Ragnarok", "Endgame"],
    description:
      "ממדען בורח שמנסה למצוא תרופה ועד גיבור שמשלב סוף-סוף את שני הצדדים שלו לאחד — המסע השלם של Bruce Banner.",
    requires: [
      "the-incredible-hulk",
      "the-avengers",
      "avengers-age-of-ultron",
      "thor-ragnarok",
      "avengers-endgame",
    ],
  },
  {
    id: "thor-asgard",
    title: "Thor ואסגרד",
    chain: ["Thor", "The Dark World", "Ragnarok", "Love and Thunder"],
    description:
      "מיורש יהיר ועד מלך אבל שמאבד כמעט הכל — המסע הרגשי של Thor דרך אובדן חוזר ונשנה.",
    requires: [
      "thor",
      "thor-the-dark-world",
      "thor-ragnarok",
      "thor-love-and-thunder",
    ],
  },
  {
    id: "tony-trauma",
    title: "הטראומה של Tony Stark",
    chain: ["The Avengers", "Iron Man 3", "Civil War", "Endgame"],
    description:
      "מהתקפי חרדה בעקבות ניו יורק ועד ההחלטה הסופית שמגדירה אותו כגיבור — Tony נושא את מלחמת ניו יורק איתו לאורך כל הסאגה.",
    requires: [
      "the-avengers",
      "iron-man-3",
      "captain-america-civil-war",
      "avengers-endgame",
    ],
  },
  {
    id: "loki-first-clash",
    title: "Loki, האויב הראשון",
    chain: ["Thor", "The Avengers"],
    description:
      "Loki עובר מנסיך מודח לאויב שמאחד סופית את ה-Avengers כצוות.",
    requires: ["thor", "the-avengers"],
  },
  {
    id: "banner-joins",
    title: "Bruce Banner מצטרף לצוות",
    chain: ["The Incredible Hulk", "The Avengers"],
    description:
      "המדען שברח מהצבא לאורך סרט שלם מגויס בסופו של דבר בדיוק לצוות שממנו ניסה להימלט.",
    requires: ["the-incredible-hulk", "the-avengers"],
  },
  {
    id: "hydra-roots",
    title: "HYDRA, השורשים הישנים",
    chain: ["HYDRA (1945)", "S.H.I.E.L.D מבפנים"],
    description:
      "ארגון שהוכרז כמובס חוזר לפתע ומתגלה כמעולם לא נעלם.",
    requires: ["captain-america-the-first-avenger", "captain-america-the-winter-soldier"],
  },
  {
    id: "tony-trauma-begins",
    title: "הטראומה של Tony מתחילה",
    chain: ["The Avengers", "Iron Man 3"],
    description:
      "הפלישה החייזרית לניו יורק משאירה על Tony צלקת שלא נראית על השריון.",
    requires: ["the-avengers", "iron-man-3"],
  },
  {
    id: "quill-family",
    title: "Peter Quill והגארדיאנים",
    chain: ["Guardians of the Galaxy", "Guardians Vol. 2"],
    description:
      "חבורת פושעי חלל מקרית הופכת בהדרגה למשפחה אמיתית — ומגלה עוד ועוד על העבר של חבריה.",
    requires: ["guardians-of-the-galaxy", "guardians-of-the-galaxy-vol-2"],
  },
  {
    id: "vision-birth",
    title: "הולדת Vision",
    chain: ["The Avengers", "Age of Ultron"],
    description:
      "שרביט חייזרי מסוכן שנלקח בסוף קרב אחד הופך למקור לישות חדשה לגמרי בהתחלה של הבא.",
    requires: ["the-avengers", "avengers-age-of-ultron"],
  },
  {
    id: "ant-man-heist",
    title: "Scott Lang מגויס",
    chain: ["Ant-Man", "Civil War"],
    description:
      "גנב-דירות לשעבר שלמד להתכווץ מוצא את עצמו פתאום נלחם לצידם של האווינג'רס בברלין.",
    requires: ["ant-man", "captain-america-civil-war"],
  },
  {
    id: "wakanda-intro",
    title: "וואקנדה נחשפת",
    chain: ["Civil War", "Black Panther"],
    description:
      "ממלכה שהעולם חשב שהיא ענייה ומבודדת מתגלה כמדינה המתקדמת ביותר על הפלנטה.",
    requires: ["captain-america-civil-war", "black-panther"],
  },
  {
    id: "spiderman-recruit",
    title: "Peter Parker מגויס",
    chain: ["Civil War", "Homecoming"],
    description:
      "נער תיכון מקווינס נלחם לצד ה-Avengers בברלין, ואז חוזר לחיי היומיום שלו כאילו כלום לא קרה.",
    requires: ["captain-america-civil-war", "spider-man-homecoming"],
  },
];

/** Only threads whose required movies have all been watched. */
export function getUnlockedConnections(
  watchedIds: ReadonlySet<string>,
): Connection[] {
  return CONNECTIONS.filter((connection) =>
    connection.requires.every((id) => watchedIds.has(id)),
  );
}
