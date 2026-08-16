import type { Movie, TimelineFlag } from "@/types/movie";

/**
 * SPOILER RULE
 * ────────────
 * `knowledge` and `review` are pre-written here for every movie in the array — that is no
 * longer what keeps spoilers out of the UI. The guarantee is enforced entirely by
 * watched-state filtering in the app: `app/page.tsx` only ever passes `watchedMovies`
 * (movies present in the user's local watched-state) into `KnowledgeSection`, and
 * `Timeline`/other components gate the same way. Nothing from this file renders until a
 * movie is marked watched, regardless of what data sits here.
 *
 * Each movie's `connections` array still links back to earlier movies only (by
 * `timelineOrder`), never forward — that convention is kept for narrative coherence even
 * though the UI no longer depends on it for spoiler safety.
 *
 * Adding a movie later:
 *  1. append the entry with `knowledge`/`review` filled in
 *  2. add any newly unlocked threads to `data/connections.ts`
 * Nothing else needs to change.
 */

/** Chronological viewing order. Movies only — series/specials are intentionally out of scope. */
export const MOVIES: Movie[] = [
  {
    id: "captain-america-the-first-avenger",
    title: "Captain America: The First Avenger",
    timelineOrder: 1,
    phase: 1,
    saga: "infinity",
    releaseYear: 2011,
    timelineLabel: "1943–1945",
    knowledge: {
      summary:
        "מלחמת העולם השנייה. Steve Rogers, מתגייס שנדחה שוב ושוב, נבחר לניסוי סופר-סולג'ר אמריקאי ויוצא למלחמה מול HYDRA — זרוע מדעית שפרשה מהנאצים ומחזיקה במקור אנרגיה עתיק שאינו מהעולם הזה.",
      concepts: [
        "ניסוי הסופר-סולג'ר הצליח פעם אחת בלבד ולא ניתן לשחזור",
        "HYDRA צומחת מתוך מנגנון צבאי קיים ולא מבחוץ",
        "קיימים בעולם מקורות אנרגיה שאינם אנושיים",
        "טכנולוגיה צבאית מתקדמת קשורה למשפחת Stark כבר בשנות ה-40",
        "Steve נעלם בקרח בסוף המלחמה ומתעורר עשרות שנים אחר כך בעידן המודרני",
      ],
      characters: [
        "Steve Rogers / Captain America",
        "Peggy Carter",
        "Bucky Barnes",
        "Howard Stark",
        "Red Skull",
        "Dr. Abraham Erskine",
      ],
      organizations: ["HYDRA", "SSR", "צבא ארצות הברית"],
      objects: ["Tesseract", "סרום הסופר-סולג'ר", "מגן הוויברניום"],
      connections: [],
    },
    review: {
      rottenTomatoesScore: 80,
      metacriticScore: 66,
      consensus:
        "הרפתקה מיושנת ברוחה עם אפקטים דיגיטליים מודרניים — אחד הפרקים הבטוחים והאמינים ביותר ביקום הקולנועי של מארוול.",
      source: "Rotten Tomatoes",
      sourceUrl: "https://www.rottentomatoes.com/m/captain_america_the_first_avenger",
    },
  },
  {
    id: "captain-marvel",
    title: "Captain Marvel",
    timelineOrder: 2,
    phase: 3,
    saga: "infinity",
    releaseYear: 2019,
    timelineLabel: "1995",
    knowledge: {
      summary:
        "1995. לוחמת בשם Vers מגלה שהזיכרונות שלה הושתלו ושהמלחמה שבה נלחמה אינה מה שסיפרו לה. במקביל, סוכן צעיר ב-S.H.I.E.L.D בשם Nick Fury נתקל לראשונה בחיים מחוץ לכדור הארץ.",
      concepts: [
        "ה-MCU רחב בהרבה מכדור הארץ",
        "קיימים גזעים חייזריים — Kree ו-Skrulls — עם סכסוך ארוך ביניהם",
        "Carol Danvers מקבלת את כוחה מאנרגיה שמקורה ב-Tesseract",
        "Fury מבין שהאנושות אינה לבד ושהיא אינה ערוכה לכך",
        "מכאן נולד הרעיון של Avengers Initiative",
      ],
      characters: [
        "Carol Danvers / Captain Marvel",
        "Nick Fury",
        "Phil Coulson",
        "Maria Rambeau",
        "Talos",
        "Yon-Rogg",
      ],
      organizations: ["S.H.I.E.L.D", "Kree Starforce", "Skrulls"],
      objects: ["Tesseract", "מכשיר קשר לחירום שנשאר בידי Fury"],
      connections: [
        "ה-Tesseract שראית במלחמת העולם השנייה חוזר — הפעם רחוק מכדור הארץ",
        "S.H.I.E.L.D הוא ההמשך המוסדי של גופי הביטחון והמחקר שפעלו כבר בשנות ה-40",
      ],
    },
    review: {
      rottenTomatoesScore: 79,
      metacriticScore: 64,
      consensus:
        "עמוס באקשן, הומור ורגעים ויזואליים — Captain Marvel מציג את הגיבורה החדשה של ה-MCU עם סיפור מקור שמנצל היטב את הנוסחה המוכרת של הפרנצ'ייז.",
      source: "Rotten Tomatoes",
      sourceUrl: "https://www.rottentomatoes.com/m/captain_marvel",
    },
  },
  {
    id: "iron-man",
    title: "Iron Man",
    timelineOrder: 3,
    phase: 1,
    saga: "infinity",
    releaseYear: 2008,
    timelineLabel: "2010",
    knowledge: {
      summary:
        "Tony Stark, יורש תעשיית נשק ומהנדס יוצא דופן, נחטף ובונה בשבי כור אנרגיה זעיר וחליפת שריון כדי לברוח. בחזרתו הוא עוצר את ייצור הנשק ומגלה שהאיום האמיתי יושב בתוך החברה שלו.",
      concepts: [
        "Arc Reactor הוא מקור אנרגיה נייד ורב-עוצמה",
        "חליפת Iron Man היא הנדסה אנושית, לא כוח על",
        "Tony חושף בפומבי שהוא Iron Man ומוותר על זהות כפולה",
        "S.H.I.E.L.D מתחיל להתעניין באנשים יוצאי דופן ולא רק באיומים",
      ],
      characters: [
        "Tony Stark / Iron Man",
        "Pepper Potts",
        "James Rhodes",
        "Obadiah Stane",
        "Ho Yinsen",
        "Nick Fury",
      ],
      organizations: ["Stark Industries", "S.H.I.E.L.D", "Ten Rings"],
      objects: ["Arc Reactor", "שריון Mark I", "שריון Mark III"],
      connections: [
        "Nick Fury, שאותו פגשת ב-1995, פונה עכשיו ל-Tony ומזכיר את Avengers Initiative",
        "Howard Stark מ-The First Avenger הוא האב שהשאיר ל-Tony את החברה ואת הטכנולוגיה",
      ],
    },
    review: {
      rottenTomatoesScore: 94,
      metacriticScore: 79,
      consensus:
        "מונע על ידי הקסם התוסס של Robert Downey Jr., Iron Man מזריק טורבו לז'אנר גיבורי-העל עם חוכמה עדינה ותחושת כיף מדבקת.",
      source: "Rotten Tomatoes",
      sourceUrl: "https://www.rottentomatoes.com/m/iron_man",
    },
  },
  {
    id: "iron-man-2",
    title: "Iron Man 2",
    timelineOrder: 4,
    phase: 1,
    saga: "infinity",
    releaseYear: 2010,
    timelineLabel: "2011",
    knowledge: {
      summary:
        "הפלדיום שמניע את הכור בחזה של Tony מרעיל אותו לאט, בזמן שהממשל דורש שיעביר את הטכנולוגיה לידיים אחרות. במקביל מגיע Ivan Vanko, בנו של שותף ותיק של Howard Stark, לגבות חוב מהדור הקודם.",
      concepts: [
        "הדבר שמחזיק את Tony בחיים הוא גם הדבר שהורג אותו",
        "סכסוך מהדור של Howard ממשיך לדור של Tony",
        "Justin Hammer מייצג את התחרות המסחרית-צבאית מול Stark",
        "Natasha Romanoff מתגלה כסוכנת S.H.I.E.L.D שהושתלה בחברה",
        "S.H.I.E.L.D לא רק מתבונן — הוא מעריך את Tony ומחליט מה לעשות איתו",
      ],
      characters: [
        "Tony Stark",
        "Ivan Vanko / Whiplash",
        "Justin Hammer",
        "Natasha Romanoff / Black Widow",
        "James Rhodes / War Machine",
        "Nick Fury",
        "Pepper Potts",
      ],
      organizations: ["S.H.I.E.L.D", "Stark Industries", "Hammer Industries"],
      objects: [
        "יסוד חדש שנגזר ממחקר ישן של Howard Stark",
        "שריון War Machine",
        "Arc Reactor",
      ],
      connections: [
        "המחקר של Howard Stark הוא זה שמציל בסוף את חייו של Tony",
        "S.H.I.E.L.D, שהיה ברקע ב-Iron Man, הופך לגורם פעיל שמנטר ומעריך",
        "העימות מול Vanko הוא המשך ישיר של שותפות שנכשלה בדור של Howard",
      ],
    },
    review: {
      rottenTomatoesScore: 72,
      metacriticScore: 57,
      consensus:
        "לא בדיוק אותה נשימת אוויר צח כמו Iron Man הראשון, אבל ההמשך מתקרב אליה עם ביצועים טובים ועלילה עמוסת אקשן.",
      source: "Rotten Tomatoes",
      sourceUrl: "https://www.rottentomatoes.com/m/iron_man_2",
    },
  },

  {
    id: "the-incredible-hulk",
    title: "The Incredible Hulk",
    timelineOrder: 5,
    phase: 1,
    saga: "infinity",
    releaseYear: 2008,
    timelineLabel: "2011",
    knowledge: {
      summary:
        "מדען בשם Bruce Banner, שניסוי בקרינת גאמא הפך אותו למפלצת ירוקה בכל פרץ זעם, מנסה למצוא תרופה תוך בריחה מהצבא האמריקאי. כשקצין בריטי חסר סבלנות עובר טיפול דומה ומשתגע לגמרי, רק ה-Hulk יכול לעצור אותו.",
      concepts: [
        "קרינת גאמא היא מקור כוחו של Hulk — לא תאונה מבודדת, אלא ניסוי מכוון שהשתבש",
        "Bruce Banner נמצא במנוסה מתמדת מהצבא האמריקאי, בראשות הגנרל Ross",
        "ניסיון לשחזר את הכוח על אדם אחר יוצר יצור הרסני עוד יותר — Abomination",
        "Tony Stark מופיע בסצנת סיום ומזכיר \"יוזמה\" — רמז ראשון למשהו גדול יותר",
      ],
      characters: [
        "Bruce Banner / Hulk",
        "Betty Ross",
        "Emil Blonsky / Abomination",
        "General Thaddeus Ross",
        "Samuel Sterns",
        "Tony Stark (הופעת אורח)",
      ],
      organizations: ["צבא ארצות הברית", "Culver University"],
      objects: ["ניסוי קרינת הגאמא", "סרום הסופר-סולג'ר המקורי", "דגימות הדם של Banner"],
      connections: [
        "הרמז של Tony Stark על \"יוזמה\" מחבר ישירות ל-Nick Fury שפגשת ב-Iron Man ומצביע על מיזם גדול יותר",
        "הניסיון לשחזר את סרום הסופר-סולג'ר קושר ישירות לניסוי המקורי מ-Captain America: The First Avenger",
      ],
    },
    review: {
      rottenTomatoesScore: 68,
      metacriticScore: 61,
      consensus:
        "הסרט לא מגיע לגמרי להצלחה המרשימה שמעריצי הענק הירוק קיוו לה, אך מציע מספיק אקשן ירוק כדי לפצות על עלילה לעיתים דלה.",
      source: "Rotten Tomatoes",
      sourceUrl: "https://www.rottentomatoes.com/m/the_incredible_hulk",
    },
  },
  {
    id: "thor",
    title: "Thor",
    timelineOrder: 6,
    phase: 1,
    saga: "infinity",
    releaseYear: 2011,
    timelineLabel: "2011",
    knowledge: {
      summary:
        "Thor, יורש אסגרד היהיר, מגורש לכדור הארץ ומאבד את כוחו לאחר שכמעט הצית מלחמה עם ענקי הקרח. רק כשהוא לומד ענווה ואהבה הוא מוכיח שהוא ראוי להרים שוב את הפטיש שלו, Mjolnir.",
      concepts: [
        "אסגרד וה-Nine Realms הם עולם קדום של ישויות רבות-עוצמה שכדור הארץ בקושי מודע להן",
        "Mjolnir מוקסם כך שרק מי ש\"ראוי\" יכול להרימו",
        "Loki, אחיו המאומץ של Thor, מתגלה כענק קרח מלידה ומתחיל לרקום מזימות",
        "S.H.I.E.L.D עוקב אחרי נפילת הפטיש לכדור הארץ ומתעניין בטכנולוגיה חוצת-עולמות",
      ],
      characters: [
        "Thor",
        "Jane Foster",
        "Loki",
        "Odin",
        "Erik Selvig",
        "Heimdall",
        "Sif",
        "Darcy Lewis",
      ],
      organizations: ["המשפחה המלכותית של אסגרד", "ענקי הקרח מ-Jotunheim", "S.H.I.E.L.D"],
      objects: ["Mjolnir", "Casket of Ancient Winters", "גשר ה-Bifrost", "Destroyer"],
      connections: [
        "S.H.I.E.L.D, שכבר פעל ברקע ב-Iron Man ו-Iron Man 2, מגיע ראשון לזירה כשמשהו נופל מהשמיים",
      ],
    },
    review: {
      rottenTomatoesScore: 77,
      metacriticScore: 57,
      consensus:
        "בלוקבאסטר מסנוור שממתן את היקפו הרחב בהומור, שנינות ודרמה אנושית — Thor הוא בידור מארוול אדיר.",
      source: "Rotten Tomatoes",
      sourceUrl: "https://www.rottentomatoes.com/m/thor",
    },
  },
  {
    id: "the-avengers",
    title: "The Avengers",
    timelineOrder: 7,
    phase: 1,
    saga: "infinity",
    releaseYear: 2012,
    timelineLabel: "2012",
    knowledge: {
      summary:
        "Loki גונב את ה-Tesseract ומתכנן לפתוח שער לפלישה חייזרית על כדור הארץ. Nick Fury מפעיל את Avengers Initiative ומאחד קבוצת גיבורים בלתי-צפויה כדי לעצור אותו לפני שניו יורק תיפול.",
      concepts: [
        "Avengers Initiative, שנרמז עליו כבר ב-Iron Man, יוצא סוף-סוף לפועל",
        "Loki פועל בשירות ישות חייזרית עוצמתית מאחורי הקלעים, שמייצגת איום גדול בהרבה ממנו",
        "ה-Tesseract הוא מקור אנרגיה קוסמי רב-עוצמה שכבר הופיע במלחמת העולם השנייה ואצל Fury",
        "שיתוף פעולה בין גיבורים שונים בתכלית דורש התמודדות עם אגו וחוסר אמון לפני שהם הופכים לצוות",
        "ניו יורק הופכת לזירת הקרב הראשונה של ה-Avengers כקבוצה",
      ],
      characters: [
        "Tony Stark / Iron Man",
        "Steve Rogers / Captain America",
        "Bruce Banner / Hulk",
        "Thor",
        "Natasha Romanoff / Black Widow",
        "Clint Barton / Hawkeye",
        "Loki",
        "Nick Fury",
      ],
      organizations: ["S.H.I.E.L.D / Avengers Initiative", "ה-Chitauri"],
      objects: ["ה-Tesseract", "השרביט של Loki", "מכשיר ה-Iridium"],
      connections: [
        "ה-Tesseract חוזר לזירה — מהמלחמה, דרך Captain Marvel, ועד S.H.I.E.L.D בהווה",
        "Bruce Banner מ-The Incredible Hulk מגויס סוף-סוף לצוות שממנו ברח",
        "Loki, שהכרת מ-Thor, חוזר כאיום מרכזי",
        "Nick Fury מגשים את מה שהתחיל לרמוז עליו כבר ב-Iron Man ו-Captain Marvel",
      ],
    },
    review: {
      rottenTomatoesScore: 91,
      metacriticScore: 69,
      consensus:
        "הודות לתסריט שמדגיש את האנושיות של הגיבורים ושפע רגעי אקשן-על, The Avengers עומד בציפיות הגבוהות ומרים את הרף למארוול הקולנועית.",
      source: "Rotten Tomatoes",
      sourceUrl: "https://www.rottentomatoes.com/m/marvels_the_avengers",
    },
  },
  {
    id: "thor-the-dark-world",
    title: "Thor: The Dark World",
    timelineOrder: 8,
    phase: 2,
    saga: "infinity",
    releaseYear: 2013,
    timelineLabel: "2013",
    knowledge: {
      summary:
        "כוח קדום בשם Aether, שפעם כמעט החזיר את היקום לחשכה, מתעורר מחדש ומאיים על Jane Foster. Thor נאלץ להסתמך על אחיו הכלוא, Loki, כדי להצילה ולעצור את ענקי האופל.",
      concepts: [
        "ה-Convergence הוא תופעה קוסמית נדירה שמיישרת בין תשעת העולמות",
        "ה-Aether מתגלה כאבן אינסוף נוספת שהוסתרה מאז מלחמה עתיקה",
        "Frigga, אמו של Thor, נהרגת תוך הגנה על Jane",
        "Loki ו-Thor נאלצים לשתף פעולה זמנית חרף הבגידה מ-The Avengers",
      ],
      characters: [
        "Thor",
        "Jane Foster",
        "Loki",
        "Odin",
        "Frigga",
        "Erik Selvig",
        "Heimdall",
        "Malekith",
      ],
      organizations: ["אסגרד", "ה-Dark Elves מ-Svartalfheim"],
      objects: ["ה-Aether", "Mjolnir", "גשר ה-Bifrost", "מכונת הפורטלים של Selvig"],
      connections: [
        "Loki, שנלכד בסוף The Avengers, מופיע כעת כאסיר באסגרד",
        "Erik Selvig עדיין סובל מהשפעות שליטת המוח של Loki מ-The Avengers",
      ],
    },
    review: {
      rottenTomatoesScore: 67,
      metacriticScore: 54,
      consensus:
        "לא בהכרח הסרט הטוב ביותר שיצא מיקום מארוול, אך Thor: The Dark World עדיין מציע הומור והימורים גבוהים כפי שהמעריצים ציפו.",
      source: "Rotten Tomatoes",
      sourceUrl: "https://www.rottentomatoes.com/m/thor_the_dark_world",
    },
  },
  {
    id: "iron-man-3",
    title: "Iron Man 3",
    timelineOrder: 9,
    phase: 2,
    saga: "infinity",
    releaseYear: 2013,
    timelineLabel: "2012–2013",
    knowledge: {
      summary:
        "טרור בדמות \"Mandarin\" תוקף את ארה\"ב בזמן ש-Tony Stark מתמודד עם התקפי חרדה בעקבות האירועים בניו יורק. מאחורי הקלעים מסתתרת מזימה של מדען זנוח שפיתח טיפול ביולוגי הרסני בשם Extremis.",
      concepts: [
        "Tony סובל מטראומה בעקבות הפלישה החייזרית ב-The Avengers — הצלחה לא באה בלי מחיר",
        "ה\"Mandarin\" הציבורי מתגלה כשחקן שכור, בעוד האיום האמיתי הוא Aldrich Killian ו-Extremis",
        "Extremis הוא טיפול שמשפר גוף אנושי אך הופך אותו לבלתי-יציב ולעיתים נפיץ",
        "Tony נאלץ לאלתר בלי חליפה מלאה, ומוכיח שהגאונות שלו — לא רק השריון — היא הכוח האמיתי",
      ],
      characters: [
        "Tony Stark / Iron Man",
        "Pepper Potts",
        "James Rhodes / War Machine-Iron Patriot",
        "Aldrich Killian",
        "Maya Hansen",
        "Trevor Slattery",
        "Happy Hogan",
        "Harley Keener",
      ],
      organizations: ["Advanced Idea Mechanics (AIM)", "Stark Industries"],
      objects: ["Extremis", "חליפות ה-Iron Legion", "כור ה-Arc"],
      connections: [
        "ההתקפה על ניו יורק ב-The Avengers היא הטריגר הישיר לחרדה של Tony בסרט הזה",
        "James Rhodes, שהכרת כ-War Machine מ-Iron Man 2, חוזר בזהות חדשה — Iron Patriot",
      ],
    },
    review: {
      rottenTomatoesScore: 79,
      metacriticScore: 62,
      consensus:
        "בעזרת כוכב ראשי כריזמטי, סצנות אקשן מרשימות וכמה הפתעות, Iron Man 3 הוא הרפתקה שנונה ומהנה ותוספת חזקה לקאנון של מארוול.",
      source: "Rotten Tomatoes",
      sourceUrl: "https://www.rottentomatoes.com/m/iron_man_3",
    },
  },
  {
    id: "captain-america-the-winter-soldier",
    title: "Captain America: The Winter Soldier",
    timelineOrder: 10,
    phase: 2,
    saga: "infinity",
    releaseYear: 2014,
    timelineLabel: "2014",
  },
  {
    id: "guardians-of-the-galaxy",
    title: "Guardians of the Galaxy",
    timelineOrder: 11,
    phase: 2,
    saga: "infinity",
    releaseYear: 2014,
    timelineLabel: "2014",
  },
  {
    id: "guardians-of-the-galaxy-vol-2",
    title: "Guardians of the Galaxy Vol. 2",
    timelineOrder: 12,
    phase: 3,
    saga: "infinity",
    releaseYear: 2017,
    timelineLabel: "2014",
  },
  {
    id: "avengers-age-of-ultron",
    title: "Avengers: Age of Ultron",
    timelineOrder: 13,
    phase: 2,
    saga: "infinity",
    releaseYear: 2015,
    timelineLabel: "2015",
  },
  {
    id: "ant-man",
    title: "Ant-Man",
    timelineOrder: 14,
    phase: 2,
    saga: "infinity",
    releaseYear: 2015,
    timelineLabel: "2015",
  },
  {
    id: "captain-america-civil-war",
    title: "Captain America: Civil War",
    timelineOrder: 15,
    phase: 3,
    saga: "infinity",
    releaseYear: 2016,
    timelineLabel: "2016",
  },
  {
    id: "black-widow",
    title: "Black Widow",
    timelineOrder: 16,
    phase: 4,
    saga: "multiverse",
    releaseYear: 2021,
    timelineLabel: "2016",
  },
  {
    id: "black-panther",
    title: "Black Panther",
    timelineOrder: 17,
    phase: 3,
    saga: "infinity",
    releaseYear: 2018,
    timelineLabel: "2016",
  },
  {
    id: "spider-man-homecoming",
    title: "Spider-Man: Homecoming",
    timelineOrder: 18,
    phase: 3,
    saga: "infinity",
    releaseYear: 2017,
    timelineLabel: "2016",
  },
  {
    id: "doctor-strange",
    title: "Doctor Strange",
    timelineOrder: 19,
    phase: 3,
    saga: "infinity",
    releaseYear: 2016,
    timelineLabel: "2016–2017",
  },
  {
    id: "thor-ragnarok",
    title: "Thor: Ragnarok",
    timelineOrder: 20,
    phase: 3,
    saga: "infinity",
    releaseYear: 2017,
    timelineLabel: "2017",
  },
  {
    id: "ant-man-and-the-wasp",
    title: "Ant-Man and the Wasp",
    timelineOrder: 21,
    phase: 3,
    saga: "infinity",
    releaseYear: 2018,
    timelineLabel: "2018",
  },
  {
    id: "avengers-infinity-war",
    title: "Avengers: Infinity War",
    timelineOrder: 22,
    phase: 3,
    saga: "infinity",
    releaseYear: 2018,
    timelineLabel: "2018",
  },
  {
    id: "avengers-endgame",
    title: "Avengers: Endgame",
    timelineOrder: 23,
    phase: 3,
    saga: "infinity",
    releaseYear: 2019,
    timelineLabel: "2018 · 2023",
    milestone: true,
  },
  {
    id: "shang-chi-and-the-legend-of-the-ten-rings",
    title: "Shang-Chi and the Legend of the Ten Rings",
    timelineOrder: 24,
    phase: 4,
    saga: "multiverse",
    releaseYear: 2021,
    timelineLabel: "אחרי Endgame",
    timelineFlags: ["post-endgame"],
  },
  {
    id: "spider-man-far-from-home",
    title: "Spider-Man: Far From Home",
    timelineOrder: 25,
    phase: 3,
    saga: "infinity",
    releaseYear: 2019,
    timelineLabel: "אחרי Endgame",
    timelineFlags: ["post-endgame"],
  },
  {
    id: "eternals",
    title: "Eternals",
    timelineOrder: 26,
    phase: 4,
    saga: "multiverse",
    releaseYear: 2021,
    timelineLabel: "אחרי Endgame · רקע עתיק",
    timelineFlags: ["post-endgame"],
  },
  {
    id: "spider-man-no-way-home",
    title: "Spider-Man: No Way Home",
    timelineOrder: 27,
    phase: 4,
    saga: "multiverse",
    releaseYear: 2021,
    timelineLabel: "אחרי Endgame",
    timelineFlags: ["post-endgame", "multiverse"],
  },
  {
    id: "doctor-strange-in-the-multiverse-of-madness",
    title: "Doctor Strange in the Multiverse of Madness",
    timelineOrder: 28,
    phase: 4,
    saga: "multiverse",
    releaseYear: 2022,
    timelineLabel: "אחרי Endgame",
    timelineFlags: ["post-endgame", "multiverse"],
  },
  {
    id: "black-panther-wakanda-forever",
    title: "Black Panther: Wakanda Forever",
    timelineOrder: 29,
    phase: 4,
    saga: "multiverse",
    releaseYear: 2022,
    timelineLabel: "אחרי Endgame",
    timelineFlags: ["post-endgame"],
  },
  {
    id: "thor-love-and-thunder",
    title: "Thor: Love and Thunder",
    timelineOrder: 30,
    phase: 4,
    saga: "multiverse",
    releaseYear: 2022,
    timelineLabel: "אחרי Endgame",
    timelineFlags: ["post-endgame"],
  },
  {
    id: "ant-man-and-the-wasp-quantumania",
    title: "Ant-Man and the Wasp: Quantumania",
    timelineOrder: 31,
    phase: 5,
    saga: "multiverse",
    releaseYear: 2023,
    timelineLabel: "אחרי Endgame",
    timelineFlags: ["post-endgame", "multiverse"],
  },
  {
    id: "guardians-of-the-galaxy-vol-3",
    title: "Guardians of the Galaxy Vol. 3",
    timelineOrder: 32,
    phase: 5,
    saga: "multiverse",
    releaseYear: 2023,
    timelineLabel: "אחרי Endgame",
    timelineFlags: ["post-endgame"],
  },
  {
    id: "the-marvels",
    title: "The Marvels",
    timelineOrder: 33,
    phase: 5,
    saga: "multiverse",
    releaseYear: 2023,
    timelineLabel: "אחרי Endgame",
    timelineFlags: ["post-endgame"],
  },
  {
    id: "deadpool-and-wolverine",
    title: "Deadpool & Wolverine",
    timelineOrder: 34,
    phase: 5,
    saga: "multiverse",
    releaseYear: 2024,
    timelineLabel: "לא לינארי",
    timelineFlags: ["post-endgame", "tva", "multiverse"],
  },
  {
    id: "captain-america-brave-new-world",
    title: "Captain America: Brave New World",
    timelineOrder: 35,
    phase: 5,
    saga: "multiverse",
    releaseYear: 2025,
    timelineLabel: "אחרי Endgame",
    timelineFlags: ["post-endgame"],
  },
  {
    id: "thunderbolts",
    title: "Thunderbolts*",
    timelineOrder: 36,
    phase: 5,
    saga: "multiverse",
    releaseYear: 2025,
    timelineLabel: "אחרי Endgame",
    timelineFlags: ["post-endgame"],
  },
  {
    id: "the-fantastic-four-first-steps",
    title: "The Fantastic Four: First Steps",
    timelineOrder: 37,
    phase: 6,
    saga: "multiverse",
    releaseYear: 2025,
    timelineLabel: "יקום חלופי",
    timelineFlags: ["alternate-universe"],
  },
  {
    id: "spider-man-brand-new-day",
    title: "Spider-Man: Brand New Day",
    timelineOrder: 38,
    phase: 6,
    saga: "multiverse",
    releaseYear: 2026,
    timelineLabel: "אחרי Endgame",
    timelineFlags: ["post-endgame"],
  },
];

/** Sorted once, at module level, so views never re-sort. */
export const MOVIES_IN_TIMELINE_ORDER: readonly Movie[] = [...MOVIES].sort(
  (a, b) => a.timelineOrder - b.timelineOrder,
);

export const MOVIE_IDS: ReadonlySet<string> = new Set(MOVIES.map((m) => m.id));

/** The real, known progress. Reset returns here — never to zero. */
export const DEFAULT_WATCHED_IDS: readonly string[] = [
  "captain-america-the-first-avenger",
  "captain-marvel",
  "iron-man",
  "iron-man-2",
];

export const ENDGAME_ID = "avengers-endgame";

export const TIMELINE_FLAG_LABELS: Record<TimelineFlag, string> = {
  "post-endgame": "אחרי Endgame",
  multiverse: "מולטיוורס",
  tva: "TVA",
  "alternate-universe": "יקום חלופי",
};

export function getMovieById(id: string): Movie | undefined {
  return MOVIES.find((movie) => movie.id === id);
}
