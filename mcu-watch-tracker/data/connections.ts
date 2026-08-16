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
];

/** Only threads whose required movies have all been watched. */
export function getUnlockedConnections(
  watchedIds: ReadonlySet<string>,
): Connection[] {
  return CONNECTIONS.filter((connection) =>
    connection.requires.every((id) => watchedIds.has(id)),
  );
}
