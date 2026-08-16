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
    knowledge: {
      summary:
        "Steve Rogers מגלה ש-S.H.I.E.L.D, הארגון שהוא משרת, חדור מבפנים על ידי HYDRA — אויב שחשב שהובס עוד במלחמת העולם השנייה. בדרך הוא נתקל במתנקש מסתורי שמתברר כחברו הטוב ביותר, שנחשב מת.",
      concepts: [
        "HYDRA לא הובסה ב-1945 — היא שרדה והסתננה ל-S.H.I.E.L.D בסתר במשך עשורים",
        "Project Insight מתוכנן לחסל איומים עתידיים מראש, לפני שהם מתרחשים",
        "The Winter Soldier מתגלה כ-Bucky Barnes, ידידו הקרוב מהמלחמה, שנשבה ועבר שטיפת מוח",
        "S.H.I.E.L.D מתפרק פומבית בעקבות החשיפה",
      ],
      characters: [
        "Steve Rogers / Captain America",
        "Natasha Romanoff / Black Widow",
        "Sam Wilson / Falcon",
        "Bucky Barnes / Winter Soldier",
        "Alexander Pierce",
        "Nick Fury",
        "Maria Hill",
        "Arnim Zola",
      ],
      organizations: ["S.H.I.E.L.D", "HYDRA"],
      objects: ["הליקופטרי ה-Insight", "שבבי הבקרה של HYDRA", "הזרוע הביונית של Bucky"],
      connections: [
        "Bucky Barnes, שנעלם ונחשב מת עוד ב-The First Avenger, מתגלה כ-Winter Soldier",
        "Nick Fury ו-Maria Hill, שהכרת כבר מ-Iron Man 2 ו-The Avengers, נמצאים במרכז קריסת S.H.I.E.L.D",
        "HYDRA, שהובסה כביכול ב-The First Avenger, מתגלה כאיום שמעולם לא נעלם",
      ],
    },
    review: {
      rottenTomatoesScore: 90,
      metacriticScore: 70,
      consensus:
        "מותח ומחוכם מבחינה פוליטית, Captain America: The Winter Soldier הוא פרק מעולה בקאנון האווינג'רס שבטוח יהנה את מעריצי מארוול.",
      source: "Rotten Tomatoes",
      sourceUrl: "https://www.rottentomatoes.com/m/captain_america_the_winter_soldier",
    },
  },
  {
    id: "guardians-of-the-galaxy",
    title: "Guardians of the Galaxy",
    timelineOrder: 11,
    phase: 2,
    saga: "infinity",
    releaseYear: 2014,
    timelineLabel: "2014",
    knowledge: {
      summary:
        "Peter Quill, שנחטף מכדור הארץ כילד, גונב חפץ מסתורי שמושך אליו רודף חסר רחמים בשם Ronan. כדי לעצור אותו, הוא נאלץ להתחבר עם קבוצת פושעי חלל בלתי צפויה שהופכת למשפחה.",
      concepts: [
        "היקום של מארוול חורג הרחק מעבר לכדור הארץ ולאסגרד — יש אימפריות שלמות, כלא בין-כוכבי וסוחרי חלל",
        "ה-Orb מתגלה כמכיל אבן אינסוף נוספת",
        "Nova Corps הם משטרת חלל שמנהלת סדר בגלקסיה",
        "קבוצת זרים לגמרי הופכת ל\"משפחה\" דרך אובדן משותף ואמון שנבנה בהדרגה",
      ],
      characters: [
        "Peter Quill / Star-Lord",
        "Gamora",
        "Drax the Destroyer",
        "Groot",
        "Rocket",
        "Ronan the Accuser",
        "Yondu Udonta",
        "Nebula",
      ],
      organizations: ["Ravagers", "כוחות Ronan", "Nova Corps / Nova Empire"],
      objects: ["ה-Orb", "המוט הקוסמי של Ronan", "הספינה Milano"],
      connections: [
        "אבן האינסוף השנייה שנתקלת בה (אחרי ה-Tesseract) מרמזת שיש עוד אבנים כאלה מפוזרות ביקום",
      ],
    },
    review: {
      rottenTomatoesScore: 91,
      metacriticScore: 76,
      consensus:
        "Guardians of the Galaxy חצוף בדיוק במידה שמעריצי הקומיקס ציפו לו — כמו גם מצחיק, מותח, מלא לב ועמוס פאר ויזואלי.",
      source: "Rotten Tomatoes",
      sourceUrl: "https://www.rottentomatoes.com/m/guardians_of_the_galaxy",
    },
  },
  {
    id: "guardians-of-the-galaxy-vol-2",
    title: "Guardians of the Galaxy Vol. 2",
    timelineOrder: 12,
    phase: 3,
    saga: "infinity",
    releaseYear: 2017,
    timelineLabel: "2014",
    knowledge: {
      summary:
        "הגארדיאנים מתמודדים עם גזע חייזרי מתנשא, ואז עם דמות אלוהית שמתגלה כאביו הביולוגי הנעלם של Quill. מאחורי החיוך המקסים שלו מסתתרת תוכנית איומה להשתלט על היקום.",
      concepts: [
        "Ego, אביו הביולוגי של Quill, הוא ישות ברמת אל (Celestial)",
        "Ego שתל \"זרעים\" טרה-פורמינג על אלפי כוכבי לכת כדי להפוך אותם לצלמו",
        "Yondu מקריב את עצמו כדי להציל את Quill, וחושף שנהג בו כמו אב אמיתי",
        "Nebula עוזבת בסוף כדי לצוד את Thanos",
      ],
      characters: [
        "Peter Quill / Star-Lord",
        "Gamora",
        "Drax",
        "Baby Groot",
        "Rocket",
        "Yondu Udonta",
        "Nebula",
        "Mantis",
        "Ego",
      ],
      organizations: ["The Sovereign", "Ravagers", "Celestials"],
      objects: ["סוללות Anulax", "זרעי הטרה-פורמינג של Ego", "חץ ה-Yaka של Yondu"],
      connections: [
        "Yondu וה-Ravagers, שהכרת ב-Guardians of the Galaxy, מקבלים כאן רקע עמוק יותר",
        "Nebula, שנלחמה נגד הגארדיאנים בסרט הקודם, מצטרפת אליהם בהדרגה",
      ],
    },
    review: {
      rottenTomatoesScore: 85,
      metacriticScore: 67,
      consensus:
        "העלילה עמוסת האקשן, החזותיים המסנוורים וההומור החצוף של Guardians of the Galaxy Vol. 2 מצטרפים לסרט המשך כיפי כמעט כמו קודמו — גם אם לא רענן באותה מידה.",
      source: "Rotten Tomatoes",
      sourceUrl: "https://www.rottentomatoes.com/m/guardians_of_the_galaxy_vol_2",
    },
  },
  {
    id: "avengers-age-of-ultron",
    title: "Avengers: Age of Ultron",
    timelineOrder: 13,
    phase: 2,
    saga: "infinity",
    releaseYear: 2015,
    timelineLabel: "2015",
    knowledge: {
      summary:
        "בניסיון להגן על העולם, Tony Stark ו-Bruce Banner יוצרים בינה מלאכותית בשם Ultron — אך זו מגיעה למסקנה שהדרך היחידה להציל את האנושות היא להשמיד אותה. ה-Avengers נלחמים על עתיד סוקוביה ועל עתיד עצמם כצוות.",
      concepts: [
        "Ultron נוצר מתוך שרביט Loki, שמכיל אבן אינסוף נוספת",
        "Wanda ו-Pietro Maximoff, תאומים משופרים, מתחילים כאויבי ה-Avengers ואז עוברים לצידם",
        "Vision נוצר מגוף סינתטי ותודעת J.A.R.V.I.S — ישות חדשה, לא Ultron ולא בן אדם",
        "הצוות מתרחב ומתפרק בו-זמנית — הרכב חדש נבנה עד סוף הסרט",
      ],
      characters: [
        "Tony Stark / Iron Man",
        "Thor",
        "Bruce Banner / Hulk",
        "Steve Rogers / Captain America",
        "Natasha Romanoff / Black Widow",
        "Clint Barton / Hawkeye",
        "Pietro Maximoff",
        "Wanda Maximoff",
        "Vision",
        "Ultron",
      ],
      organizations: ["HYDRA", "S.H.I.E.L.D", "The Avengers"],
      objects: ["השרביט של Loki", "ויבראניום", "הגוף הסינתטי של Vision"],
      connections: [
        "השרביט של Loki, שנלקח בסוף The Avengers, הוא המקור ל-Ultron",
        "HYDRA, שנחשפה ב-The Winter Soldier, עדיין מחזיקה בטכנולוגיה מסוכנת מהעבר",
      ],
    },
    review: {
      rottenTomatoesScore: 75,
      metacriticScore: 66,
      consensus:
        "תוסס ומסנוור, Avengers: Age of Ultron הוא סרט המשך עמוס מדי אך ברובו מספק, שמאחד מחדש את הרכב הענק של קודמו עם כמה תוספות חדשות ואויב ראוי.",
      source: "Rotten Tomatoes",
      sourceUrl: "https://www.rottentomatoes.com/m/avengers_age_of_ultron",
    },
  },
  {
    id: "ant-man",
    title: "Ant-Man",
    timelineOrder: 14,
    phase: 2,
    saga: "infinity",
    releaseYear: 2015,
    timelineLabel: "2015",
    knowledge: {
      summary:
        "פורץ לשעבר, Scott Lang, מגויס על ידי מדען ותיק כדי לגנוב טכנולוגיית כיווץ מסוכנת לפני שהיא נמכרת לגורמים עוינים. בדרך הוא הופך לגיבור-על זעיר בשם Ant-Man.",
      concepts: [
        "Hank Pym הסתיר טכנולוגיית כיווץ (Pym Particles) במשך שנים מחשש לשימוש לרעה",
        "ה-Quantum Realm הוא מציאות תת-אטומית שאמה של Hope, Janet, נעלמה לתוכה",
        "Yellowjacket, גרסה עוינת של החליפה, כמעט נמכרת ל-HYDRA",
        "בסוף הסרט Hank חושף אב-טיפוס לחליפת Wasp עבור בתו",
      ],
      characters: [
        "Scott Lang / Ant-Man",
        "Hope van Dyne",
        "Hank Pym",
        "Darren Cross / Yellowjacket",
        "Cassie Lang",
      ],
      organizations: ["S.H.I.E.L.D", "HYDRA", "Pym Technologies"],
      objects: ["חליפת Ant-Man / Pym Particles", "חליפת Yellowjacket", "ה-Quantum Realm"],
      connections: [
        "HYDRA, שראית קורסת ב-The Winter Soldier, עדיין מנסה לרכוש טכנולוגיה מסוכנת",
        "Sam Wilson / Falcon, שהכרת מ-The Winter Soldier, מופיע כאן בקצרה",
      ],
    },
    review: {
      rottenTomatoesScore: 83,
      metacriticScore: 64,
      consensus:
        "בהובלת ביצוע מקסים של Paul Rudd, Ant-Man מציע ריגושי מארוול בקנה מידה מתאים — גם אם לא בצורה חלקה כמו קודמיו המצליחים ביותר.",
      source: "Rotten Tomatoes",
      sourceUrl: "https://www.rottentomatoes.com/m/antman",
    },
  },
  {
    id: "captain-america-civil-war",
    title: "Captain America: Civil War",
    timelineOrder: 15,
    phase: 3,
    saga: "infinity",
    releaseYear: 2016,
    timelineLabel: "2016",
    knowledge: {
      summary:
        "אירוע קטלני שגורם ה-Avengers מוביל לחקיקה בין-לאומית שמפצלת את הצוות לשניים — Tony Stark שתומך בפיקוח, ו-Steve Rogers שמסרב לוותר על עצמאות. כשחברו הטוב ביותר של Steve מואשם בפיגוע, המלחמה הופכת אישית.",
      concepts: [
        "הסכם סוקוביה (Sokovia Accords) דורש פיקוח ממשלתי על גיבורי-על",
        "Bucky Barnes מואשם בפיגוע בעקבות מניפולציה של Zemo, שמפעיל את מילות הקוד הישנות שלו",
        "Tony מגלה ש-Bucky, בשליטת שטיפת מוח, רצח את הוריו — הקרב הופך אישי לגמרי",
        "Peter Parker / Spider-Man ו-T'Challa / Black Panther מצטרפים לראשונה",
      ],
      characters: [
        "Steve Rogers / Captain America",
        "Tony Stark / Iron Man",
        "Natasha Romanoff / Black Widow",
        "Bucky Barnes / Winter Soldier",
        "Sam Wilson / Falcon",
        "James Rhodes / War Machine",
        "Clint Barton / Hawkeye",
        "T'Challa / Black Panther",
        "Vision",
        "Wanda Maximoff",
        "Scott Lang / Ant-Man",
        "Peter Parker / Spider-Man",
        "Helmut Zemo",
      ],
      organizations: ["האו״ם / הסכם סוקוביה", "וואקנדה", "HYDRA (רקע)"],
      objects: ["מילות הקוד לשליטה ב-Bucky", "המתקן הסובייטי בסיביר", "מגן ה-Captain America"],
      connections: [
        "Bucky Barnes, שהוצג כ-Winter Soldier, שב למרכז העלילה כשעברו קם לרדוף אותו",
        "Wanda ו-Vision, שהצטרפו בסוף Age of Ultron, נמצאים כעת משני צידי הפילוג",
        "Scott Lang / Ant-Man מגויס לצוותו של Steve",
      ],
    },
    review: {
      rottenTomatoesScore: 90,
      metacriticScore: 75,
      consensus:
        "Captain America: Civil War פותח את הגל הבא של סרטי מארוול עם בלוקבאסטר-על עמוס אקשן, עלילה לא-מצוירת בעליל, והאומץ לחקור נושאים מעוררי מחשבה.",
      source: "Rotten Tomatoes",
      sourceUrl: "https://www.rottentomatoes.com/m/captain_america_civil_war",
    },
  },
  {
    id: "black-widow",
    title: "Black Widow",
    timelineOrder: 16,
    phase: 4,
    saga: "multiverse",
    releaseYear: 2021,
    timelineLabel: "2016",
    knowledge: {
      summary:
        "בורחת מהחוק אחרי אירועי Civil War, Natasha Romanoff נאלצת להתמודד עם עברה כשהיא מתאחדת עם \"אחותה\" המדומה, Yelena, כדי להפיל את מי שיצר אותן — מפעל שלם של מתנקשות בשליטת מוח.",
      concepts: [
        "Red Room הוא מתקן רוסי סודי שמאמן ילדות יתומות למתנקשות עילית בשליטת מוח",
        "המשפחה של Natasha מ-1995 הייתה כיסוי — כל בני המשפחה היו סוכנים",
        "Dreykov, שנחשב מת, שרד וממשיך להפעיל את הרשת",
        "Taskmaster, איום ממוסך, מתגלה כבתו הפצועה של Dreykov",
      ],
      characters: [
        "Natasha Romanoff / Black Widow",
        "Yelena Belova",
        "Alexei Shostakov / Red Guardian",
        "Melina Vostokoff",
        "Dreykov",
        "Antonia Dreykov / Taskmaster",
      ],
      organizations: ["Red Room", "ה-Black Widows"],
      objects: ["נסיוב הנוגדן המשחרר משליטת מוח", "שבב הבקרה הפרומוני"],
      connections: [
        "הסרט מתרחש מיד אחרי Civil War, כש-Natasha כבר נמלטת מהחוק בעקבות הסכם סוקוביה",
      ],
    },
    review: {
      rottenTomatoesScore: 79,
      metacriticScore: 68,
      consensus:
        "הנושאים העמוקים של Black Widow קצת טובעים תחת ריבוי האקשן, אך זו עדיין הרפתקה עצמאית מהנה עם צוות משנה מצוין.",
      source: "Rotten Tomatoes",
      sourceUrl: "https://www.rottentomatoes.com/m/black_widow_2021",
    },
  },
  {
    id: "black-panther",
    title: "Black Panther",
    timelineOrder: 17,
    phase: 3,
    saga: "infinity",
    releaseYear: 2018,
    timelineLabel: "2016",
    knowledge: {
      summary:
        "אחרי מות אביו, T'Challa הופך למלך וואקנדה — מדינה שמסתירה מהעולם עושר טכנולוגי עצום המבוסס על ויבראניום. כשקרוב משפחה נטוש חוזר לתבוע את הכתר, T'Challa נאלץ להתמודד עם מורשת שגיאות שהוריש לו אביו.",
      concepts: [
        "וואקנדה מסתירה מהעולם את הטכנולוגיה המתקדמת ביותר בכדור הארץ מאחורי חזית של מדינת עולם-שלישי",
        "Erik Killmonger מתגלה כבן דודו הנטוש של T'Challa — תוצאה ישירה של החלטה שאביו T'Chaka קיבל",
        "הצמח בעל צורת הלב הוא מקור כוחו של ה-Black Panther",
        "T'Challa בוחר בסוף לפתוח את וואקנדה לעולם ולחלוק את הידע שלה",
      ],
      characters: [
        "T'Challa / Black Panther",
        "Erik Killmonger",
        "Nakia",
        "Okoye",
        "Everett Ross",
        "Shuri",
        "W'Kabi",
        "M'Baku",
      ],
      organizations: ["וואקנדה", "Dora Milaje", "שבט Jabari"],
      objects: ["ויבראניום", "הצמח בעל צורת הלב", "חליפת Black Panther"],
      connections: [
        "Everett Ross, שהכרת כסוכן CIA ב-Civil War, מסייע ל-T'Challa כאן",
        "Bucky Barnes, שנמלט לוואקנדה בסוף Civil War, מוזכר בסצנת סיום",
      ],
    },
    review: {
      rottenTomatoesScore: 96,
      metacriticScore: 88,
      consensus:
        "Black Panther מרים את קולנוע גיבורי-העל לגבהים מרתקים חדשים, ומספר אחד הסיפורים הסוחפים ביותר ב-MCU — תוך הצגת כמה מהדמויות המפותחות ביותר שלו.",
      source: "Rotten Tomatoes",
      sourceUrl: "https://www.rottentomatoes.com/m/black_panther_2018",
    },
  },
  {
    id: "spider-man-homecoming",
    title: "Spider-Man: Homecoming",
    timelineOrder: 18,
    phase: 3,
    saga: "infinity",
    releaseYear: 2017,
    timelineLabel: "2016",
    knowledge: {
      summary:
        "אחרי שהשתתף בקרב ברלין, Peter Parker חוזר לתיכון אך ממשיך לפעול כ-Spider-Man בשכונה. כשהוא מגלה סוחר נשק שמוכר טכנולוגיית חייזרים גנובה, הוא נגרר לעימות גדול ממנו הרבה.",
      concepts: [
        "שאריות הטכנולוגיה החייזרית מהקרב בניו יורק עדיין מסתובבות בשוק השחור",
        "Tony Stark משמש לפיטר כמנטור, אך גם מגביל אותו",
        "Peter דוחה הצעה להצטרף רשמית ל-Avengers ובוחר להישאר גיבור שכונתי",
        "Adrian Toomes / Vulture הוא נבל שנוצר ישירות מהתוצאות הכלכליות של פלישת החייזרים",
      ],
      characters: [
        "Peter Parker / Spider-Man",
        "Adrian Toomes / Vulture",
        "Tony Stark",
        "Happy Hogan",
        "Ned Leeds",
        "MJ",
        "Liz Allan",
        "May Parker",
      ],
      organizations: ["Department of Damage Control", "Avengers", "Stark Industries"],
      objects: ["חליפת Spider-Man עם בינה מלאכותית (Karen)", "נשק Chitauri ממוחזר"],
      connections: [
        "ה-Chitauri וטכנולוגיית החייזרים מ-The Avengers הם מקור נשקו של Toomes",
        "Tony Stark, שהכרת מ-Civil War, ממשיך לשמש כדמות אב עבור Peter",
      ],
    },
    review: {
      rottenTomatoesScore: 92,
      metacriticScore: 73,
      consensus:
        "Spider-Man: Homecoming עושה כל שריבוט שני יכול לעשות, ומספק הרפתקה צבעונית ומהנה שמשתלבת בטבעיות ב-MCU הענק בלי להיסחף מדי לבניית פרנצ'ייז.",
      source: "Rotten Tomatoes",
      sourceUrl: "https://www.rottentomatoes.com/m/spider_man_homecoming",
    },
  },
  {
    id: "doctor-strange",
    title: "Doctor Strange",
    timelineOrder: 19,
    phase: 3,
    saga: "infinity",
    releaseYear: 2016,
    timelineLabel: "2016–2017",
    knowledge: {
      summary:
        "מנתח מוח מבריק אך יהיר, Stephen Strange, מאבד את השימוש בידיו בתאונת דרכים. בחיפוש נואש אחר מרפא הוא מגיע ל-Kamar-Taj ומגלה עולם שלם של קסם ומימדים חוצי-מציאות.",
      concepts: [
        "כדור הארץ מוגן על ידי שלושה \"Sanctums\" שמגנים עליו ממימדים אחרים",
        "ה-Eye of Agamotto הוא רלייקט שמאפשר שליטה בזמן",
        "Kaecilius, תלמיד לשעבר, מנסה להביא ישות בולעת-מימדים בשם Dormammu",
        "Strange הופך למגן החדש של ה-Sanctum בניו יורק",
      ],
      characters: [
        "Stephen Strange",
        "Karl Mordo",
        "Christine Palmer",
        "Wong",
        "Kaecilius",
        "The Ancient One",
      ],
      organizations: ["Kamar-Taj / Masters of the Mystic Arts", "הקנאים של Kaecilius"],
      objects: ["ה-Eye of Agamotto", "גלימת הריחוף", "שלושת ה-Sanctums"],
      connections: [],
    },
    review: {
      rottenTomatoesScore: 89,
      metacriticScore: 72,
      consensus:
        "Doctor Strange מאזן בכישרון בין חומר המקור החריג שלו לבין המגבלות של בלוקבאסטר ה-MCU, ומספק סיפור מקור מהנה מאוד לגיבור-על.",
      source: "Rotten Tomatoes",
      sourceUrl: "https://www.rottentomatoes.com/m/doctor_strange_2016",
    },
  },
  {
    id: "thor-ragnarok",
    title: "Thor: Ragnarok",
    timelineOrder: 20,
    phase: 3,
    saga: "infinity",
    releaseYear: 2017,
    timelineLabel: "2017",
    knowledge: {
      summary:
        "Thor מגלה שיש לו אחות בכורה נשכחת, Hela, שמשתלטת על אסגרד ומפילה אותו לכוכב זבל מרוחק. כדי להציל את עמו הוא נאלץ להתאחד עם Loki, Hulk וחיילת אסגרדית אבודה.",
      concepts: [
        "Hela, אחותו הבכורה של Thor, הייתה כובשת אכזרית שהוסתרה מההיסטוריה הרשמית של אסגרד",
        "רק ה-Ragnarok עצמו (חורבן אסגרד) יכול לעצור את Hela",
        "Thor מאבד את Mjolnir ולומד שכוחו לא תלוי בפטיש",
        "Bruce Banner / Hulk נמצא בגלות מרצון על Sakaar מאז אירועי Age of Ultron",
      ],
      characters: [
        "Thor",
        "Loki",
        "Hela",
        "Valkyrie",
        "Bruce Banner / Hulk",
        "Heimdall",
        "Grandmaster",
        "Korg",
      ],
      organizations: ["אסגרד", "Sakaar / משחקי הגלדיאטורים של ה-Grandmaster", "ה-Valkyries לשעבר"],
      objects: ["Mjolnir (נהרס)", "כתר Surtur", "גשר ה-Bifrost"],
      connections: [
        "Loki, שאתה מכיר כבר משלושה סרטים, ממשיך לנוע בין בגידה לשיתוף פעולה",
        "Bruce Banner / Hulk, שנעלם בסוף Age of Ultron, מתגלה כלכוד ב-Sakaar",
      ],
    },
    review: {
      rottenTomatoesScore: 93,
      metacriticScore: 74,
      consensus:
        "מרגש, מצחיק, ומעל הכל כיפי — Thor: Ragnarok הוא הרפתקה קוסמית צבעונית שמציבה רף חדש לפרנצ'ייז שלו.",
      source: "Rotten Tomatoes",
      sourceUrl: "https://www.rottentomatoes.com/m/thor_ragnarok",
    },
  },
  {
    id: "ant-man-and-the-wasp",
    title: "Ant-Man and the Wasp",
    timelineOrder: 21,
    phase: 3,
    saga: "infinity",
    releaseYear: 2018,
    timelineLabel: "2018",
    knowledge: {
      summary:
        "שנתיים אחרי Civil War, Scott Lang נמצא במעצר בית. Hank Pym ובתו Hope פונים אליו שוב כשהם מזהים אות אפשרי מ-Janet van Dyne, שנעלמה ל-Quantum Realm לפני שלושה עשורים.",
      concepts: [
        "ה-Quantum Realm הוא מציאות תת-אטומית שיכולה לחבר בין אנשים דרך \"שזירה קוונטית\"",
        "Ghost, יצור בלתי-יציב מולקולרית, זקוקה לאנרגיה של Janet כדי להתייצב",
        "Hope הופכת ל-Wasp הרשמית לראשונה על המסך",
        "בסצנת אמצע-הקרדיטים, כל המשפחה נעלמת — רמז ישיר לאירוע גדול הרבה יותר",
      ],
      characters: [
        "Scott Lang / Ant-Man",
        "Hope van Dyne / Wasp",
        "Hank Pym",
        "Janet van Dyne",
        "Ava Starr / Ghost",
        "Bill Foster",
      ],
      organizations: ["FBI", "רשת השוק השחור של Sonny Burch"],
      objects: ["מנהרת הקוונטים", "המעבדה המתכווצת של Pym", "ה-Quantum Realm"],
      connections: [
        "Scott Lang עדיין נמצא במעצר בית בעקבות אירועי Civil War",
        "Sam Wilson / Falcon מוזכר כמי שעדיין מחפש את Scott בעקבות אותם אירועים",
      ],
    },
    review: {
      rottenTomatoesScore: 87,
      metacriticScore: 70,
      consensus:
        "סרט גיבורי-על קליל ובהיר יותר, מונע על ידי הכריזמה חסרת המאמץ של Paul Rudd ו-Evangeline Lilly — Ant-Man and the Wasp מציע הפוגה רעננה שה-MCU היה זקוק לה.",
      source: "Rotten Tomatoes",
      sourceUrl: "https://www.rottentomatoes.com/m/ant_man_and_the_wasp",
    },
  },
  {
    id: "avengers-infinity-war",
    title: "Avengers: Infinity War",
    timelineOrder: 22,
    phase: 3,
    saga: "infinity",
    releaseYear: 2018,
    timelineLabel: "2018",
    knowledge: {
      summary:
        "Thanos יוצא למסע להשיג את כל שש אבני האינסוף ולמחוק מחצית מהיקום. ה-Avengers וה-Guardians of the Galaxy מתפזרים בין כמה חזיתות במאבק ייאוש לעצור אותו — וכושלים.",
      concepts: [
        "Thanos אוסף את אבני האינסוף אחת אחת: הכוח, החלל, המציאות, הנשמה, הזמן והתודעה",
        "כדי לקבל את אבן הנשמה יש להקריב מישהו שאוהבים — Thanos מקריב את Gamora",
        "Vision, שנוצר מהשרביט של Loki, נושא את אבן התודעה בתוך גופו",
        "בסוף הסרט Thanos מבצע \"snap\" שמוחק מחצית מכל החיים ביקום, כולל כמה מהגיבורים",
      ],
      characters: [
        "Tony Stark / Iron Man",
        "Thor",
        "Steve Rogers / Captain America",
        "Doctor Strange",
        "Peter Parker / Spider-Man",
        "T'Challa / Black Panther",
        "Peter Quill / Star-Lord",
        "Gamora",
        "Thanos",
        "Wanda Maximoff",
        "Vision",
      ],
      organizations: ["The Avengers", "Guardians of the Galaxy", "The Black Order", "וואקנדה"],
      objects: ["שש אבני האינסוף", "כפפת האינסוף", "Stormbreaker"],
      connections: [
        "כל שש אבני האינסוף שראית בסרטים קודמים (Tesseract, Orb, Aether, Eye of Agamotto, שרביט Loki) מתאחדות תחת Thanos כאן",
        "Gamora, שהכרת מ-Guardians of the Galaxy, מוקרבת לטובת אבן הנשמה",
        "Vision ו-Wanda, שהתפתחו מ-Age of Ultron ומ-Civil War, נמצאים במרכז הקרב האחרון",
      ],
    },
    review: {
      rottenTomatoesScore: 85,
      metacriticScore: 68,
      consensus:
        "Avengers: Infinity War מצליח לאזן מערך מסחרר של גיבורי MCU במאבק מול האיום הגדול ביותר שלהם, והתוצאה היא בלוקבאסטר מרגש ומותח שמגשים ברובו את השאיפות הענקיות שלו.",
      source: "Rotten Tomatoes",
      sourceUrl: "https://www.rottentomatoes.com/m/avengers_infinity_war",
    },
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
    knowledge: {
      summary:
        "חמש שנים אחרי ה-snap ההרסני של Thanos, שרידי ה-Avengers מוצאים דרך להשתמש בנסיעה בזמן כדי לאסוף את אבני האינסוף מהעבר ולהחזיר את מי שנעלם — אך הניצחון גובה מחיר איום.",
      concepts: [
        "נסיעה בזמן ב-MCU לא משנה את העבר — היא יוצרת מציאויות מקבילות",
        "הצוות חוזר לרגעים מרכזיים מסרטים קודמים כדי לאסוף גרסאות עבר של אבני האינסוף",
        "הקרבה אישית עמוקה נדרשת כדי להשלים את המשימה",
        "\"snap\" נגדי מחזיר את מי שנעלם, ומוביל לקרב האחרון נגד Thanos מהעבר",
        "הסרט מסמן סיום של קשת עלילתית ארוכה שהחלה ב-Iron Man",
      ],
      characters: [
        "Tony Stark / Iron Man",
        "Steve Rogers / Captain America",
        "Natasha Romanoff / Black Widow",
        "Thor",
        "Bruce Banner / Hulk",
        "Clint Barton / Hawkeye",
        "Scott Lang / Ant-Man",
        "Thanos",
      ],
      organizations: ["שרידי ה-Avengers", "New Avengers Facility"],
      objects: ["חליפות ה-Quantum Realm", "כפפת האינסוף (גרסה חדשה)", "מכונת הנסיעה בזמן"],
      connections: [
        "הצוות חוזר פיזית לרגעים מ-The Avengers, מ-Guardians of the Galaxy, מ-Thor: The Dark World ומ-Captain America: The Winter Soldier כדי לאסוף את אבני האינסוף",
        "Scott Lang, שנעלם בסוף Ant-Man and the Wasp, חוזר מה-Quantum Realm ומניע את התוכנית כולה",
        "האירועים ממשיכים ישירות מה\"snap\" של Thanos בסוף Avengers: Infinity War",
      ],
    },
    review: {
      rottenTomatoesScore: 97,
      metacriticScore: 78,
      consensus:
        "מסקנה משביעת רצון ומרגשת רגשית לשנים-עשר שנות הקמת יקום מארוול הקולנועי, ש(ברובה) מצדיקה את האורך העצום שלה.",
      source: "Rotten Tomatoes",
      sourceUrl: "https://www.rottentomatoes.com/m/avengers_endgame",
    },
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
    knowledge: {
      summary:
        "Shaun, מלצר חניה בסן פרנסיסקו, מתגלה כ-Shang-Chi — בנו של Xu Wenwu, מנהיג ארגון פשע עתיק ובעל עשר טבעות רבות-עוצמה. הוא נגרר בחזרה למשפחתו ולסוד שאביו מסתיר על אמו שנעלמה.",
      concepts: [
        "עשר הטבעות מעניקות כוח וחיי-נצח כמעט לבעליהן, ו-Xu Wenwu שולט בהן מזה אלף שנה",
        "Xu Wenwu משוכנע ששומע את קול אשתו המתה קורא לו מכפר קסום, Ta Lo",
        "Ta Lo הוא ממלכה נסתרת השומרת על שער שכולא ישויות דמוניות",
        "Shang-Chi נאלץ לבחור בין נאמנות למשפחתו לבין עצירת אביו",
      ],
      characters: [
        "Shang-Chi / Shaun",
        "Katy",
        "Xu Wenwu",
        "Xialing",
        "Ying Li",
        "Wong",
        "Trevor Slattery",
      ],
      organizations: ["The Ten Rings (ארגון)", "Ta Lo"],
      objects: ["עשר הטבעות", "הקשת של Ta Lo"],
      connections: [
        "Wong, שהכרת מ-Doctor Strange, וגם Trevor Slattery, ה\"Mandarin\" המזויף מ-Iron Man 3, מופיעים כאן",
      ],
    },
    review: {
      rottenTomatoesScore: 92,
      metacriticScore: 71,
      consensus:
        "Shang-Chi and the Legend of the Ten Rings לא לגמרי חף מהנוסחה המוכרת של מארוול, אך סיפור המקור המרגש הזה מרחיב את ה-MCU בכמה כיוונים בבת אחת.",
      source: "Rotten Tomatoes",
      sourceUrl: "https://www.rottentomatoes.com/m/shang_chi_and_the_legend_of_the_ten_rings",
    },
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
    knowledge: {
      summary:
        "אחרי היעלמות והחזרה (\"Blip\"), Peter Parker יוצא לטיול לימודים באירופה ומקווה להתרחק מאחריות הגיבור-על. אבל Nick Fury לא מתכוון לתת לו חופשה — במיוחד לא כשישויות איתני-טבע ענקיות מתחילות לתקוף ערים אירופיות.",
      concepts: [
        "Mysterio מציג את עצמו כגיבור ממימד מקביל שנהרס — אך זו זהות בדויה",
        "Peter מקבל מ-Tony Stark משקפי E.D.I.T.H, כלי עם גישה לכל טכנולוגיית Stark",
        "Mysterio הוא למעשה עובד Stark לשעבר שמנצל אפקטים הולוגרפיים כדי לזייף איומים",
        "בסוף הסרט Mysterio חושף לעולם ש-Peter הוא Spider-Man",
      ],
      characters: [
        "Peter Parker / Spider-Man",
        "MJ",
        "Nick Fury",
        "Quentin Beck / Mysterio",
        "Happy Hogan",
        "Ned Leeds",
        "Maria Hill",
        "J. Jonah Jameson",
      ],
      organizations: ["S.H.I.E.L.D", "Stark Industries"],
      objects: ["משקפי E.D.I.T.H", "הדרונים ההולוגרפיים של Mysterio"],
      connections: [
        "הסרט מתרחש בעקבות ה\"Blip\" וה-Endgame — Peter חוזר לחיים אחרי חמש שנות היעדרות",
        "Nick Fury, שהכרת מסרטים רבים קודמים, מגייס את Peter שוב, ממש כפי שגייס גיבורים אחרים לאורך השנים",
      ],
    },
    review: {
      rottenTomatoesScore: 91,
      metacriticScore: 69,
      consensus:
        "תערובת קלילה ובלתי צפויה של רומנטיקת נעורים ופעולת גיבורי-על, Spider-Man: Far From Home מציבה בסגנון את הבמה לעידן הבא של ה-MCU.",
      source: "Rotten Tomatoes",
      sourceUrl: "https://www.rottentomatoes.com/m/spider_man_far_from_home",
    },
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
    knowledge: {
      summary:
        "קבוצת ישויות בנות-אלמוות בשם Eternals, ששלחו לכדור הארץ לפני אלפי שנים כדי להגן על בני האדם מפני מפלצות בשם Deviants, מתאחדת מחדש כשמתברר שהמשימה האמיתית שלהן הייתה שונה — ומסוכנת בהרבה — ממה שחשבו.",
      concepts: [
        "ה-Eternals נשלחו על ידי ישות קוסמית בשם Arishem ולא היו אמורים להתערב בסכסוכים אנושיים",
        "המטרה האמיתית של שהותם בכדור הארץ קשורה ללידתו של Celestial חדש",
        "הקבוצה מתפצלת בעקבות המחלוקת המוסרית סביב הגילוי הזה",
        "Ikaris, אחת הדמויות המרכזיות, מגלה נאמנות סותרת בין אהבתו לבין תפקידו",
      ],
      characters: [
        "Sersi",
        "Ikaris",
        "Thena",
        "Kingo",
        "Sprite",
        "Phastos",
        "Makkari",
        "Druig",
        "Gilgamesh",
        "Ajak",
      ],
      organizations: ["ה-Eternals", "ה-Deviants", "Arishem וה-Celestials"],
      objects: ["הכלים הקוסמיים של ה-Eternals", "ה-Uni-Mind"],
      connections: [],
    },
    review: {
      rottenTomatoesScore: 48,
      metacriticScore: 52,
      consensus:
        "אפוס גיבורי-על שאפתני שמצליח לפעמים באותה מידה שהוא נכשל — Eternals לוקח את ה-MCU לכיוונים מסקרנים, ולעיתים גם מבלבלים.",
      source: "Rotten Tomatoes",
      sourceUrl: "https://www.rottentomatoes.com/m/eternals",
    },
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
    knowledge: {
      summary:
        "אחרי ש-Mysterio חושף בפומבי ש-Peter הוא Spider-Man, הוא מבקש מ-Doctor Strange לגרום לעולם לשכוח את זהותו. הכישוף משתבש ופותח את המולטיוורס, ומביא נבלים וגיבורי Spider-Man ממציאויות אחרות.",
      concepts: [
        "המולטיוורס נפרץ לראשונה בצורה מרכזית דרך כישוף פגום",
        "נבלים ממציאויות אחרות (Doc Ock, Green Goblin, Electro, Sandman, Lizard) שנועדו למות במקור נגררים למציאות הזו",
        "Peter בוחר לנסות לרפא את הנבלים במקום לשלוח אותם למותם",
        "May Parker נהרגת, ומטביעה בו את המשפט \"עם כוח גדול מגיעה אחריות גדולה\"",
        "בסוף הסרט Peter מוחק את עצמו מזיכרון כולם כדי להגן על מי שהוא אוהב",
      ],
      characters: [
        "Peter Parker / Spider-Man",
        "MJ",
        "Doctor Strange",
        "Ned Leeds",
        "Happy Hogan",
        "Norman Osborn / Green Goblin",
        "Otto Octavius / Doctor Octopus",
        "May Parker",
        "Wong",
      ],
      organizations: ["Sorcerers of Kamar-Taj", "Daily Bugle"],
      objects: ["כישוף מחיקת הזהות/הזיכרון", "Mirror Dimension", "מכשירי ה\"ריפוי\" לכל נבל"],
      connections: [
        "Mysterio ו-J. Jonah Jameson, שהכרת מ-Far From Home, ממשיכים לרדוף את Peter כאן",
        "Doctor Strange, שהכרת מ-Doctor Strange, מככב כבעל ברית מרכזי",
      ],
    },
    review: {
      rottenTomatoesScore: 93,
      metacriticScore: 71,
      consensus:
        "ספיידרמן גדול ונועז יותר, No Way Home מרחיב את היקף הפרנצ'ייז וההימורים שלו מבלי לאבד את ההומור והלב.",
      source: "Rotten Tomatoes",
      sourceUrl: "https://www.rottentomatoes.com/m/spider_man_no_way_home",
    },
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
    knowledge: {
      summary:
        "America Chavez, נערה עם יכולת לקפוץ בין יקומים מקבילים, נרדפת על ידי ישות אפלה. Doctor Strange מגלה של-Wanda Maximoff יש תוכניות משלה למולטיוורס — ומוכנה להרוס הכל כדי לממש אותן.",
      concepts: [
        "המולטיוורס מכיל אינספור גרסאות של אותם אנשים ואירועים",
        "Wanda, בשליטת ספר קסמים אפל בשם Darkhold, מחפשת גרסה של עצמה עם ילדים אמיתיים",
        "America Chavez יכולה לקרוע חורים בין יקומים בעל כורחה",
        "Strange נאלץ להתמודד עם גרסאות אפלות של עצמו וממחיריו",
      ],
      characters: [
        "Stephen Strange",
        "America Chavez",
        "Wanda Maximoff / Scarlet Witch",
        "Wong",
        "Christine Palmer",
      ],
      organizations: ["Kamar-Taj", "Illuminati (יקום חלופי)"],
      objects: ["ה-Darkhold", "ספר Vishanti", "יכולת הקפיצה בין יקומים של America"],
      connections: [
        "Wanda, שהכרת כ-Scarlet Witch מ-Age of Ultron ומ-Infinity War/Endgame, ממשיכה ישירות מהאירועים שעברה",
        "Wong, שהכרת מ-Doctor Strange ומ-No Way Home, ממלא כאן תפקיד מרכזי כ-Sorcerer Supreme",
      ],
    },
    review: {
      rottenTomatoesScore: 73,
      metacriticScore: 60,
      consensus:
        "Doctor Strange in the Multiverse of Madness עמל תחת משקל ה-MCU המתפרש, אך הבימוי הייחודי של Sam Raimi יוצר כישוף מהנה.",
      source: "Rotten Tomatoes",
      sourceUrl: "https://www.rottentomatoes.com/m/doctor_strange_in_the_multiverse_of_madness",
    },
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
    knowledge: {
      summary:
        "אחרי מותו של המלך T'Challa, וואקנדה מתאבלת בזמן שהיא מתמודדת עם לחץ עולמי גובר להשיג ויבראניום. חיפוש אחר משאבים נוספים חושף ממלכה תת-ימית נסתרת שמאיימת להכריז מלחמה.",
      concepts: [
        "וואקנדה נאלצת להתמודד עם אובדן המלך שלה ועם איום חיצוני בו-זמנית",
        "Talokan, ממלכה תת-ימית עתיקה בהנהגת Namor, מתגלה לראשונה",
        "Namor דורש שוואקנדה תצטרף אליו נגד פני השטח, ובסירובה מכריז מלחמה",
        "Shuri עוברת את טקס הצמח בעל צורת הלב והופכת ל-Black Panther החדשה",
      ],
      characters: ["Shuri", "Nakia", "Okoye", "M'Baku", "Namor", "Ramonda", "Riri Williams"],
      organizations: ["וואקנדה", "Talokan", "האו״ם / ה-CIA"],
      objects: ["הצמח בעל צורת הלב", "חליפת ה-Black Panther החדשה", "גלאי הויבראניום של Riri"],
      connections: [
        "מות T'Challa, שהכרת כ-Black Panther מסרטים קודמים, הוא נקודת המוצא הרגשית של הסרט הזה",
        "וואקנדה, שנפתחה לעולם בסוף Black Panther, משלמת כעת את המחיר על החשיפה",
      ],
    },
    review: {
      rottenTomatoesScore: 84,
      metacriticScore: 67,
      consensus:
        "מחווה נוגעת ללב שמניעה את הפרנצ'ייז קדימה בצורה משביעת רצון, Black Panther: Wakanda Forever הוא ניצחון שאפתני ומרגש רגשית עבור ה-MCU.",
      source: "Rotten Tomatoes",
      sourceUrl: "https://www.rottentomatoes.com/m/black_panther_wakanda_forever",
    },
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
    knowledge: {
      summary:
        "Thor, אבוד לאחר איבוד כמעט כל מה שאהב, מתמודד עם Gorr the God Butcher — לוחם שאיבד את אמונתו ונשבע להשמיד את כל האלים. הוא מתאחד עם Valkyrie ועם אהובתו לשעבר Jane Foster, שהפכה בעצמה ל-Mighty Thor.",
      concepts: [
        "Gorr מאבד את אמונתו ומשפחתו, ונשבע נקמה נגד כל האלים ביקום בעזרת חרב קללה",
        "Jane Foster, חולה בסרטן, משתמשת ב-Mjolnir המשוחזר והופכת ל-Mighty Thor במחיר בריאותה",
        "Zeus ופנתיאון היוונים מתגלים כחלק מה-MCU",
        "Gorr נאלץ לבחור בין נקמה לבין החזרת בתו לחיים",
      ],
      characters: ["Thor", "Jane Foster / Mighty Thor", "Gorr the God Butcher", "Valkyrie", "Korg", "Zeus"],
      organizations: ["New Asgard", "Omnipotence City / פנתיאון האלים"],
      objects: ["Mjolnir המשוחזר", "Stormbreaker", "חרב ה-Necrosword"],
      connections: [
        "Jane Foster, שהכרת מ-Thor ומ-Thor: The Dark World, חוזרת בתפקיד חדש לגמרי",
        "Valkyrie, שהצטרפה בסוף Thor: Ragnarok, משמשת כעת מלכת New Asgard",
      ],
    },
    review: {
      rottenTomatoesScore: 64,
      metacriticScore: 57,
      consensus:
        "בבחינות מסוימות Thor: Love and Thunder מרגיש כמו Ragnarok מחדש — אך בסך הכל, הוא מציע מספיק כיף מהיר-קצב כדי להיות תוספת ראויה ל-MCU.",
      source: "Rotten Tomatoes",
      sourceUrl: "https://www.rottentomatoes.com/m/thor_love_and_thunder",
    },
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
    knowledge: {
      summary:
        "Scott Lang נהנה מתהילתו כאווינג'ר, עד שמכשיר שבתו Cassie בנתה בטעות שולח את כל המשפחה ל-Quantum Realm — שם שולט רודן מולטיברסלי גולה בשם Kang the Conqueror.",
      concepts: [
        "ה-Quantum Realm מתגלה כעולם שלם עם ציוויליזציה, לא רק חלל ריק",
        "Kang the Conqueror הוא רודן מולטיברסלי שגורש לממד הזה",
        "ל-Janet יש עבר נסתר עם Kang מתקופת היותה לכודה שם",
        "בסצנת קרדיטים נחשפת \"מועצת ה-Kangs\" ממדים שונים — איום גדול הרבה יותר",
      ],
      characters: [
        "Scott Lang / Ant-Man",
        "Hope van Dyne / Wasp",
        "Cassie Lang",
        "Hank Pym",
        "Janet van Dyne",
        "Kang the Conqueror",
      ],
      organizations: ["מחתרת החופש ב-Quantum Realm", "משטרו של Kang"],
      objects: ["מכשיר מיפוי ה-Quantum Realm", "ספינת/מצודת Kang"],
      connections: [
        "המשפחה, שנעלמה בסצנת אמצע-קרדיטים של Ant-Man and the Wasp, חוזרת כעת ליוזמה החדשה הזו",
        "Janet van Dyne, שהכרת מ-Ant-Man and the Wasp, מגלה כאן עבר שהסתירה",
      ],
    },
    review: {
      rottenTomatoesScore: 46,
      metacriticScore: 48,
      consensus:
        "ל-Ant-Man and the Wasp: Quantumania חסר ברובו הניצוץ הכיפי שהרים הרפתקאות קודמות, אך ה-Kang של Jonathan Majors הוא נבל מרתק שעתיד לשנות את מהלך ה-MCU.",
      source: "Rotten Tomatoes",
      sourceUrl: "https://www.rottentomatoes.com/m/ant_man_and_the_wasp_quantumania",
    },
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
    knowledge: {
      summary:
        "עדיין מתאבלים על גרסה קודמת של Gamora, הגארדיאנים מותקפים על ידי ישות מלאכותית בשם Adam Warlock. כש-Rocket נפצע אנושות, הצוות חוזר אל עברו האפל ביותר כדי להציל אותו.",
      concepts: [
        "Rocket מתגלה כאחד מניסויי ההנדסה הגנטית של ה-High Evolutionary על כוכב מלאכותי בשם Counter-Earth",
        "שתל כישלון בגוף Rocket מונע מרופאים לרפא אותו — הצוות חייב למצוא פתרון אחר",
        "ה-High Evolutionary מנסה ליצור \"חברה מושלמת\" באמצעות ניסויים על בעלי חיים",
        "הסרט מסמן את סוף הפרק הזה של הגארדיאנים כפי שהכרנו אותם",
      ],
      characters: [
        "Peter Quill / Star-Lord",
        "Gamora (גרסה מ-2014)",
        "Drax",
        "Nebula",
        "Mantis",
        "Groot",
        "Rocket",
        "Adam Warlock",
        "The High Evolutionary",
      ],
      organizations: ["Orgocorp / ה-High Evolutionary", "Ravagers"],
      objects: ["שתל הכשל בגוף Rocket", "Counter-Earth", "ספינת ה-High Evolutionary"],
      connections: [
        "Gamora, שמתה ב-Infinity War, חוזרת כגרסה שונה מ-2014 שהצטרפה בעקבות אירועי Endgame",
        "Nebula, שהכרת מ-Guardians of the Galaxy הראשון ואילך, ממשיכה כחברה קבועה בצוות",
      ],
    },
    review: {
      rottenTomatoesScore: 82,
      metacriticScore: 64,
      consensus:
        "חיבוק גלקטי שאולי לוחץ קצת חזק מדי על מיתרי הלב, ה-Guardians of the Galaxy האחרון הוא פרידה אוהבת מהמשפחה הכי מגובשת ב-MCU.",
      source: "Rotten Tomatoes",
      sourceUrl: "https://www.rottentomatoes.com/m/guardians_of_the_galaxy_vol_3",
    },
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
    knowledge: {
      summary:
        "Carol Danvers מתמודדת עם השלכות מהפכה שהובילה נגד ה-Kree. כשלוחמת קריאנית משתמשת בחפץ עתיק שגורם לכוחותיה של Carol להתערבב עם כוחותיהן של שתי גיבורות נוספות, השלוש נאלצות ללמוד לשתף פעולה — פשוטו כמשמעו.",
      concepts: [
        "כוחותיהן של Carol, Kamala Khan ו-Monica Rambeau מתערבבים ומחליפים ביניהן מקום בכל שימוש בו-זמני",
        "Dar-Benn, קריאנית נקמנית, גוזלת משאבים מעולמות אחרים כדי להציל את Hala הגוססת",
        "Monica Rambeau, שהכירה את Carol כילדה, פיתחה כוחות אור משלה",
        "Kamala Khan, מעריצה גדולה של Carol, מגלה שהצמיד שלה קשור ישירות למזימת Dar-Benn",
      ],
      characters: ["Carol Danvers / Captain Marvel", "Monica Rambeau", "Kamala Khan / Ms. Marvel", "Dar-Benn", "Nick Fury"],
      organizations: ["האימפריה הקריאנית", "S.A.B.E.R.", "משפחת Khan"],
      objects: ["זוג ה-Quantum Bands", "טכנולוגיית קיפול-האור"],
      connections: [
        "Carol Danvers, שהכרת מ-Captain Marvel, מתמודדת כעת עם השלכות המהפכה שהובילה נגד ה-Kree",
        "Monica Rambeau ו-Nick Fury, שהכרת מסרטים קודמים, חוזרים כאן בתפקידים מורחבים",
      ],
    },
    review: {
      rottenTomatoesScore: 63,
      metacriticScore: 50,
      consensus:
        "מצחיק, קצר באופן מרענן, ומורם על ידי הכימיה של שלוש הכוכבות המובילות — The Marvels קל ליהנות ממנו ברגע למרות עלילה עמוסה ומעברי טון מבולבלים.",
      source: "Rotten Tomatoes",
      sourceUrl: "https://www.rottentomatoes.com/m/the_marvels",
    },
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
    knowledge: {
      summary:
        "Wade Wilson פרש מלהיות Deadpool, אך כשמתברר שהיקום שלו עומד לגווע, ה-TVA מגייסת אותו למצוא גרסת Wolverine שתחליף את זו שמתה ביקומו. השניים נגררים לממד גרוטאות בקצה הזמן שנשלט בידי נבלה טלפתית.",
      concepts: [
        "ה-TVA (Time Variance Authority) מפקחת על ריבוי היקומים ומגנה עליהם מהתמוטטות",
        "היקום של Wade גוסס כי \"היצור העוגן\" שלו מת — Wolverine",
        "The Void, ממד גרוטאות בקצה הזמן, מכיל גרסאות גולות מכל רחבי המולטיוורס",
        "הסרט מציג לראשונה ב-MCU דמויות מיקום ה-X-Men של פוקס",
      ],
      characters: ["Wade Wilson / Deadpool", "Logan / Wolverine", "Cassandra Nova", "Mr. Paradox", "Vanessa", "Laura / X-23"],
      organizations: ["Time Variance Authority (TVA)", "גולי ה-Void"],
      objects: ["טכנולוגיית הזמן של ה-TVA", "טפרי ה-Adamantium של Wolverine"],
      connections: [
        "ה-TVA, שהכרת מהמולטיוורס שנפרץ ב-No Way Home ו-ב-Doctor Strange in the Multiverse of Madness, מפקחת כאן על גורל יקום שלם",
      ],
    },
    review: {
      rottenTomatoesScore: 77,
      metacriticScore: 56,
      consensus:
        "Ryan Reynolds מרגיש כמו בבית ב-MCU עם שנינות חדה, בעוד Hugh Jackman מספק גב אדמנטיום לעלילה — Deadpool & Wolverine היא הרפתקה חצופה עם חיבה מפתיעה לעידן עבר של סרטי גיבורי-על.",
      source: "Rotten Tomatoes",
      sourceUrl: "https://www.rottentomatoes.com/m/deadpool_and_wolverine",
    },
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
    knowledge: {
      summary:
        "חמישה חודשים אחרי ש-Thaddeus Ross הופך לנשיא ארה״ב, Sam Wilson — ה-Captain America החדש — נשלח לחקור גניבת פריטים מסווגים. החקירה חושפת קשר בין הנשיא החדש למזימת נקמה ישנה.",
      concepts: [
        "Sam Wilson משמש כעת רשמית כ-Captain America החדש",
        "אדמנטיום, מתכת חדשה שהתגלתה על \"אי צלסטיאלי\", הופכת למוקד מתיחות בין-לאומית",
        "Samuel Sterns, שנכלא על ידי Ross, מפעיל מזימת נקמה שמובילה להתקפות בשליטת מוח",
        "Ross הופך ל-Red Hulk כשהקנוניה נגדו נחשפת",
      ],
      characters: ["Sam Wilson / Captain America", "Joaquin Torres / Falcon", "Isaiah Bradley", "Samuel Sterns", "Thaddeus Ross / Red Hulk", "Ruth Bat-Seraph"],
      organizations: ["ממשל ארצות הברית", "Camp Echo One", "Serpent Society"],
      objects: ["אדמנטיום", "האי הצלסטיאלי", "שיר השליטה במוח"],
      connections: [
        "Sam Wilson, שקיבל את המגן בסוף Avengers: Endgame, נושא אותו כעת רשמית כ-Captain America",
        "Thaddeus Ross, שהכרת כבר מ-The Incredible Hulk ומ-Civil War, משמש כעת כנשיא ארצות הברית",
      ],
    },
    review: {
      rottenTomatoesScore: 46,
      metacriticScore: 44,
      consensus:
        "Anthony Mackie לוקח בהצלחה את מעטפת ה-Cap והמגן, אך Brave New World שגרתי ועמוס מדי בקריצות משעממות כדי להרגיש כהרפתקה עצמאית ראויה למנהיג האווינג'רס החדש.",
      source: "Rotten Tomatoes",
      sourceUrl: "https://www.rottentomatoes.com/m/captain_america_brave_new_world",
    },
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
    knowledge: {
      summary:
        "קבוצת פעילים סודיים בעייתיים — Yelena Belova, John Walker, Ghost ואחרים — נשלחים על ידי מנהלת ה-CIA למשימה חשאית, ומגלים שהם נועדו לחסל זה את זה. במקום זה הם מתאחדים כדי לחשוף מזימה גדולה בהרבה.",
      concepts: [
        "Valentina Allegra de Fontaine מרכיבה צוות של \"נכסים מתכלים\" בלי ידיעתם",
        "Bob, גבר עם אמנזיה, מתגלה כנשא כוח בלתי-יציב שנוצר מניסוי חשאי",
        "טראומה אישית של Bob יוצרת ישות הרסנית בשם ה-Void שבולעת את ניו יורק",
        "הקבוצה מאמצת את השם \"Thunderbolts\" ולבסוף מוצגת בפומבי כ-\"New Avengers\"",
      ],
      characters: ["Yelena Belova", "Bucky Barnes", "John Walker / U.S. Agent", "Ava Starr / Ghost", "Alexei Shostakov / Red Guardian", "Valentina Allegra de Fontaine", "Bob / Sentry"],
      organizations: ["CIA", "The Thunderbolts / New Avengers"],
      objects: ["ה-Sentry Procedure", "ה-Void", "מגדל ה-Watchtower"],
      connections: [
        "Yelena Belova, שהכרת מ-Black Widow, ו-Bucky Barnes, שהכרת ממספר סרטים, מתאחדים כאן לצוות חדש",
        "Valentina, שהופיעה בקצרה ב-Black Widow, מתגלה כמנהלת מרכזית מאחורי הקלעים",
      ],
    },
    review: {
      rottenTomatoesScore: 88,
      metacriticScore: 68,
      consensus:
        "בהובלת חבורת מוצא-לב חסרי מזל עם Florence Pugh כמצטיינת מגנטית, Thunderbolts* חוזר בצורה מרעננת לנוסחה המנוסה של הרפתקאות ה-MCU הטובות ביותר.",
      source: "Rotten Tomatoes",
      sourceUrl: "https://www.rottentomatoes.com/m/thunderbolts",
    },
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
    knowledge: {
      summary:
        "ביקום חלופי משנות ה-60, ארבעה גיבורים שקיבלו כוחות מקרינה קוסמית מתמודדים עם Galactus, ישות שמאיימת לבלוע את כדור הארץ שלהם — ועם שליחה שלו שמגלה שלב שלה.",
      concepts: [
        "הסרט מתרחש ביקום חלופי (Earth-828), נפרד מציר הזמן העיקרי של ה-MCU",
        "Galactus מציע לחוס על כדור הארץ בתמורה לילדם הטרם-נולד של Reed ו-Sue",
        "ה-Silver Surfer מתגלה כאישה בשם Shalla-Bal שהייתה מוכנה להקריב עולמות כדי להציל את עולמה שלה",
        "בסצנת קרדיטים, Doctor Doom צופה בתינוק שנולד — Franklin",
      ],
      characters: ["Reed Richards / Mister Fantastic", "Sue Storm / Invisible Woman", "Ben Grimm / The Thing", "Johnny Storm / Human Torch", "Shalla-Bal / Silver Surfer", "Galactus"],
      organizations: ["The Fantastic Four", "The Future Foundation"],
      objects: ["קרני הקוסמוס שהעניקו את הכוחות", "מערכת הטלפורטציה הפלנטרית", "לוח הגלישה של ה-Silver Surfer"],
      connections: [],
    },
    review: {
      rottenTomatoesScore: 86,
      metacriticScore: 64,
      consensus:
        "נהנה מכימיה יציבה בין השחקנים ומעוצב בסגנון רטרו מקסים של שנות ה-60, הניסיון הזה ל-Fantastic Four עושה צדק עם המשפחה הראשונה של מארוול.",
      source: "Rotten Tomatoes",
      sourceUrl: "https://www.rottentomatoes.com/m/the_fantastic_four_first_steps",
    },
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
    knowledge: {
      summary:
        "ארבע שנים אחרי שכולם שכחו את זהותו, Peter Parker פועל לבדו כ-Spider-Man אלמוני. דמות טלפתית מסתורית מתחילה לתקוף מתקני ממשל, וגוררת את Peter למזימה גדולה בהרבה משחשב.",
      concepts: [
        "הכישוף מ-No Way Home עדיין בתוקף — אף אחד לא זוכר ש-Peter הוא Spider-Man",
        "כוחותיו של Peter ממשיכים להתפתח, כולל יצירת קור עצמאית",
        "הדמות הטלפתית מתגלה במהלך הסרט כמוטנטית צעירה בשם Jean Grey",
        "מנהל ה-Department of Damage Control מתגלה כאחראי בפועל לניסויים בלתי-חוקיים על אנשים בעלי כוחות",
      ],
      characters: ["Peter Parker / Spider-Man", "MJ", "Ned Leeds", "Jean Grey", "Frank Castle / Punisher", "Yelena Belova", "Bruce Banner"],
      organizations: ["Department of Damage Control (DODC)"],
      objects: ["מערכת ה-E.V (עוזר בינה מלאכותית)", "מכשיר בניית החליפה הביתי"],
      connections: [
        "הכישוף שמחק את זהות Peter מזיכרון כולם, שראית ב-No Way Home, עדיין בתוקף בסרט הזה",
        "Yelena Belova ו-Bruce Banner, שהכרת מסרטים קודמים, מופיעים כחברי New Avengers",
      ],
    },
    review: {
      rottenTomatoesScore: 89,
      metacriticScore: 66,
      consensus:
        "טווה יחד רצף פעולה מרהיב עם עומק רגשי בוגר וביצוע נפשי של Tom Holland — Brand New Day הוא איתחול מבטיח שמנבא שספיידי יישאר דביק על המסך הגדול לשנים רבות.",
      source: "Rotten Tomatoes",
      sourceUrl: "https://www.rottentomatoes.com/m/spider_man_brand_new_day",
    },
  },
];

/** Sorted once, at module level, so views never re-sort. */
export const MOVIES_IN_TIMELINE_ORDER: readonly Movie[] = [...MOVIES].sort(
  (a, b) => a.timelineOrder - b.timelineOrder,
);

export const MOVIE_IDS: ReadonlySet<string> = new Set(MOVIES.map((m) => m.id));

/** Starting progress: nothing watched yet. Reset returns here. */
export const DEFAULT_WATCHED_IDS: readonly string[] = [];

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
