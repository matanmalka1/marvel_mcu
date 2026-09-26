import type { MovieDetails } from "@/data/movieDetails";

/**
 * Knowledge for Disney+ series seasons and specials.
 *
 * Same SPOILER RULE as the films: everything here is shown only after the title is
 * marked as watched, and `connections` point back only to titles that come earlier
 * in the chronological order. No review scores are listed for series — they are
 * left undefined rather than guessed.
 */
export const SERIES_DETAILS: Record<string, MovieDetails> = {
  "loki-season-1": {
    knowledge: {
      summary:
        "הגרסה של Loki שברחה עם ה-Tesseract ב-2012 נעצרת מיד על ידי ה-TVA — ארגון בירוקרטי שמחוץ לזמן ששומר על 'ציר הזמן הקדוש'. כדי לשרוד הוא מסכים לעזור לסוכן Mobius לצוד גרסה אחרת ומסוכנת של עצמו.",
      concepts: [
        "ה-TVA מוחקת 'וריאנטים' — מי שחורג מהמסלול שנקבע לציר הזמן",
        "ה-Infinity Stones חסרי ערך מחוץ לזמן, וב-TVA משתמשים בהם כמשקולות נייר",
        "Sylvie היא וריאנט של Loki, ושניהם מגלים שה-Time-Keepers אינם אמיתיים",
        "בסוף הזמן יושב He Who Remains — האיש שבנה את ה-TVA כדי למנוע מלחמה בין גרסאות של עצמו",
        "כשהוא נהרג, ציר הזמן היחיד מתחיל להסתעף — והמולטיוורס נפתח",
      ],
      characters: [
        "Loki",
        "Sylvie",
        "Mobius M. Mobius",
        "Ravonna Renslayer",
        "Hunter B-15",
        "Miss Minutes",
        "He Who Remains",
      ],
      organizations: ["TVA — Time Variance Authority", "Minutemen"],
      objects: ["TemPad", "Reset Charge", "ה-Citadel בסוף הזמן", "הריק (The Void)"],
      connections: [
        "Loki הזה הוא הגרסה שנעלמה עם ה-Tesseract בקרב ניו יורק של 2012, כשה-Avengers חזרו בזמן ב-Endgame",
        "הוא לא עבר את מה שעבר Loki של Thor: Ragnarok, ולכן הוא עדיין הנבל הגאוותני מ-The Avengers",
      ],
    },
  },
  "what-if-season-1": {
    knowledge: {
      summary:
        "סדרת אנימציה שבה ה-Watcher, ישות קוסמית שצופה במולטיוורס, מציג יקומים שבהם רגע אחד השתנה — ומשם הכול מתגלגל אחרת. לקראת סוף העונה הסיפורים הנפרדים מתחברים לאיום אחד על כל היקומים.",
      concepts: [
        "כל פרק מתרחש ביקום אחר, שבו החלטה אחת בעבר הובילה להיסטוריה שונה",
        "ה-Watcher נשבע רק לצפות ולעולם לא להתערב",
        "Peggy Carter מקבלת את סרום הסופר-סולג'ר והופכת ל-Captain Carter",
        "גרסה של Ultron שהשיגה את כל אבני האינסוף מאיימת על המולטיוורס כולו",
        "ה-Watcher מפר את השבועה ומרכיב צוות גיבורים מיקומים שונים — Guardians of the Multiverse",
      ],
      characters: [
        "The Watcher (Uatu)",
        "Captain Carter",
        "T'Challa / Star-Lord",
        "Doctor Strange Supreme",
        "Killmonger",
        "Gamora",
        "Infinity Ultron",
      ],
      organizations: ["Guardians of the Multiverse"],
      objects: ["אבני האינסוף", "חליפת Hydra Stomper"],
      connections: [
        "הפרק הראשון חוזר לרגע מ-Captain America: The First Avenger — אבל הפעם Peggy היא שנכנסת למכונה",
        "ריבוי היקומים שנפתח בסוף Loki מקבל כאן פנים: גרסאות מוכרות של גיבורים, בעולמות שהשתבשו",
      ],
    },
  },
  wandavision: {
    knowledge: {
      summary:
        "Wanda ו-Vision חיים בפרוור מושלם בסגנון סיטקום שמשתנה מעשור לעשור. מהר מאוד מתברר ש-Vision אמור להיות מת, ושהעיירה Westview כלואה במציאות ש-Wanda יצרה מתוך אבל.",
      concepts: [
        "Wanda יצרה את 'ההקס' — מציאות מעוותת שכולאת עיירה שלמה ותושביה",
        "Wanda יצרה גם משפחה: Vision משוחזר ושני תאומים, Billy ו-Tommy",
        "Monica Rambeau חוצה את גבול ההקס ומקבלת בעקבותיו כוחות",
        "Agatha Harkness, מכשפה עתיקה, חושפת ש-Wanda היא ה-Scarlet Witch ושהקסם שלה הוא Chaos Magic",
        "S.W.O.R.D. בונה Vision לבן מהשרידים של Vision המקורי",
        "Wanda משחררת את Westview ומשאירה מאחור את המשפחה שיצרה — ומתחילה לחקור את ה-Darkhold",
      ],
      characters: [
        "Wanda Maximoff / Scarlet Witch",
        "Vision",
        "Monica Rambeau",
        "Agatha Harkness",
        "Jimmy Woo",
        "Darcy Lewis",
        "Tyler Hayward",
      ],
      organizations: ["S.W.O.R.D.", "FBI"],
      objects: ["ההקס (The Hex)", "ה-Darkhold", "White Vision"],
      connections: [
        "Vision מת ב-Infinity War כשאבן הנפש נתלשה ממנו — ו-Wanda מעולם לא התאבלה עליו באמת",
        "Monica היא הבת של Maria Rambeau מ-Captain Marvel, והילדה שהכירה את Carol ב-1995",
        "Jimmy Woo מוכר מ-Ant-Man and the Wasp ו-Darcy Lewis מסרטי Thor",
      ],
    },
  },
  "the-falcon-and-the-winter-soldier": {
    knowledge: {
      summary:
        "Sam Wilson מחליט לוותר על המגן ש-Steve העביר לו, והממשלה מעניקה אותו ל-John Walker. במקביל Sam ו-Bucky נאלצים לעבוד יחד מול ה-Flag Smashers — קבוצה שנלחמת בסדר העולמי החדש שאחרי ה-Blip.",
      concepts: [
        "חזרת חצי מהאוכלוסייה אחרי ה-Blip יצרה משבר פליטים ודיור עולמי",
        "סרום הסופר-סולג'ר שוחזר, וה-Flag Smashers משתמשים בו",
        "Isaiah Bradley היה סופר-סולג'ר שחור שהממשלה הסתירה ועינתה במשך עשרות שנים",
        "John Walker נשבר תחת הלחץ, מאבד את התואר ומגויס על ידי Valentina כ-U.S. Agent",
        "Sharon Carter היא בסתר ה-Power Broker",
        "Sam מקבל לבסוף את המגן והופך ל-Captain America",
      ],
      characters: [
        "Sam Wilson / Captain America",
        "Bucky Barnes",
        "John Walker / U.S. Agent",
        "Karli Morgenthau",
        "Helmut Zemo",
        "Sharon Carter",
        "Isaiah Bradley",
        "Valentina Allegra de Fontaine",
      ],
      organizations: ["Flag Smashers", "GRC", "Dora Milaje"],
      objects: [
        "המגן של Captain America",
        "סרום הסופר-סולג'ר",
        "חליפת הכנפיים הוואקנדית",
      ],
      connections: [
        "Steve מסר ל-Sam את המגן בסוף Endgame — וכאן Sam מחליט מה לעשות איתו",
        "Zemo, שפירק את ה-Avengers ב-Civil War, יוצא מהכלא כדי לעזור להם",
        "Bucky עובר תהליך תיקון אחרי שנות שטיפת המוח מ-The Winter Soldier",
      ],
    },
  },
  hawkeye: {
    knowledge: {
      summary:
        "Clint Barton רק רוצה להגיע הביתה לחג המולד, עד ש-Kate Bishop, קשתית צעירה ומעריצה שלו, נתפסת לבושה בחליפת ה-Ronin — והעבר האלים שלו רודף את שניהם ברחובות ניו יורק.",
      concepts: [
        "בתקופת ה-Blip Clint פעל כ-Ronin וחיסל פושעים — ורבים עדיין מחפשים נקמה",
        "Kate Bishop הופכת לשותפה ולממשיכה של Clint",
        "Maya Lopez, מנהיגת כנופיה חירשת, מחפשת את מי שהרג את אביה",
        "מאחורי הכנופיות עומד Wilson Fisk — ה-Kingpin",
        "Yelena Belova מגיעה להרוג את Clint כי נאמר לה שהוא אחראי למות Natasha",
      ],
      characters: [
        "Clint Barton / Hawkeye",
        "Kate Bishop",
        "Yelena Belova",
        "Maya Lopez / Echo",
        "Wilson Fisk / Kingpin",
        "Eleanor Bishop",
      ],
      organizations: ["Tracksuit Mafia"],
      objects: ["חליפת ה-Ronin", "השעון של Natasha"],
      connections: [
        "Ronin הוא הזהות ש-Clint אימץ בפתיחת Endgame אחרי שמשפחתו נעלמה",
        "Yelena היא האחות של Natasha מ-Black Widow, והיא מאבלת על ההקרבה ב-Vormir",
      ],
    },
  },
  "moon-knight": {
    knowledge: {
      summary:
        "Steven Grant, עובד חנות מזכרות במוזיאון בלונדון, מתעורר במקומות זרים ולא זוכר איך הגיע אליהם. הוא מגלה שהוא חולק גוף עם Marc Spector, שכיר חרב שמשמש כלוחם של אל הירח המצרי Khonshu.",
      concepts: [
        "לאלים המצריים יש כוח ונוכחות ממשית בעולם, והם פועלים דרך אווטארים",
        "Marc ו-Steven הן זהויות נפרדות שחולקות גוף אחד",
        "Arthur Harrow מנסה לשחרר את האלה Ammit, ששופטת אנשים על פשעים שעוד לא ביצעו",
        "Layla El-Faouly, אשתו של Marc, הופכת בעצמה לאווטאר",
        "קיימת זהות שלישית בגוף — Jake Lockley",
      ],
      characters: [
        "Marc Spector / Moon Knight",
        "Steven Grant / Mr. Knight",
        "Layla El-Faouly",
        "Arthur Harrow",
        "Khonshu",
        "Taweret",
      ],
      organizations: ["האנאד — מועצת האלים המצריים"],
      objects: ["חיפושית זהב (Scarab)", "פסל Ammit"],
      connections: [
        "כמו האסגרדים מ-Thor, גם כאן מתברר שישויות מהמיתולוגיה קיימות באמת — הפעם מהפנתיאון המצרי",
      ],
    },
  },
  echo: {
    knowledge: {
      summary:
        "Maya Lopez, אחרי שירתה ב-Kingpin, חוזרת לעיירת הולדתה באוקלהומה. שם, מול המשפחה שנטשה והאיש שגידל אותה כמו בת, היא מתחילה להתחבר לשורשים של בני ה-Choctaw ולכוח שעובר בשושלת שלה.",
      concepts: [
        "Maya היא לוחמת חירשת שקוראת תנועה והבעות בדיוק רב",
        "הנשים בשושלת שלה נושאות כוח אבות עתיק",
        "Wilson Fisk שרד והוא מנסה להחזיר את Maya לצידו",
        "Maya מצליחה לגעת בזיכרונות של Fisk ולהשפיע עליו",
      ],
      characters: [
        "Maya Lopez / Echo",
        "Wilson Fisk / Kingpin",
        "Chula",
        "Henry 'Black Crow' Lopez",
        "Matt Murdock / Daredevil",
      ],
      organizations: ["אומת ה-Choctaw", "האימפריה של Kingpin"],
      connections: [
        "בסוף Hawkeye Maya ירתה ב-Fisk אחרי שגילתה שהוא אחראי למות אביה — כאן מתגלות ההשלכות",
      ],
    },
  },
  "she-hulk-attorney-at-law": {
    knowledge: {
      summary:
        "עורכת הדין Jennifer Walters נדבקת בדם של בן דודה Bruce Banner והופכת ל-She-Hulk. היא מעדיפה להמשיך בקריירה, ומצטרפת למחלקה משפטית שמייצגת אנשים בעלי כוחות — תוך כדי שהיא מדברת ישירות אל הצופים.",
      concepts: [
        "Jen שולטת בטרנספורמציה שלה כמעט מהרגע הראשון, בניגוד ל-Bruce",
        "העולם המשפטי מתחיל להתמודד עם תביעות וחוזים של אנשים בעלי כוחות",
        "Emil Blonsky מבקש שחרור מוקדם מהכלא — ו-Jen מייצגת אותו",
        "Matt Murdock, עורך דין עיוור, הוא גם Daredevil",
        "הסדרה שוברת את הקיר הרביעי — Jen יודעת שהיא בסדרה",
      ],
      characters: [
        "Jennifer Walters / She-Hulk",
        "Bruce Banner / Smart Hulk",
        "Emil Blonsky / Abomination",
        "Wong",
        "Matt Murdock / Daredevil",
        "Titania",
        "Skaar",
      ],
      organizations: ["GLK&H", "Intelligencia"],
      objects: ["K.E.V.I.N."],
      connections: [
        "Blonsky הוא ה-Abomination שנלחם ב-Hulk ב-The Incredible Hulk, ו-Wong נראה לצידו ב-Shang-Chi",
        "Bruce נמצא כאן בגרסת ה-Smart Hulk ש-Endgame הציג, ונפצע בזרועו מהכפפה",
      ],
    },
  },
  "ms-marvel": {
    knowledge: {
      summary:
        "Kamala Khan, נערה פקיסטנית-אמריקאית מג'רזי סיטי ומעריצה שרופה של Captain Marvel, עונדת צמיד שעבר במשפחה — ומגלה כוחות שקשורים לממד אחר ולהיסטוריה של המשפחה שלה.",
      concepts: [
        "הצמיד מעורר ב-Kamala יכולת ליצור מבנים מאור מוצק",
        "קבוצה בשם ClanDestine טוענת שהיא מממד אחר ורוצה לחזור הביתה",
        "ההיסטוריה של משפחתה קשורה לחלוקת הודו ב-1947",
        "Department of Damage Control רודפת אחרי אנשים בעלי כוחות גם כשהם צעירים",
        "נרמז שב-DNA של Kamala יש מוטציה",
        "בסוף העונה הצמיד גורם ל-Kamala להחליף מקום עם Carol Danvers",
      ],
      characters: [
        "Kamala Khan / Ms. Marvel",
        "Bruno Carrelli",
        "Nakia Bahadir",
        "Kamran",
        "Najma",
        "Carol Danvers (בסוף)",
      ],
      organizations: ["ClanDestine", "Department of Damage Control (DODC)", "Red Dagger"],
      objects: ["הצמיד של Kamala", "Noor Dimension"],
      connections: [
        "Kamala גדלה על הסיפורים של Captain Marvel וקרב Endgame — היא מעריצה של הגיבורים שראית",
        "Damage Control מוכרת מ-Spider-Man: Homecoming ו-No Way Home",
      ],
    },
  },
  "werewolf-by-night": {
    knowledge: {
      summary:
        "ספיישל אימה בשחור-לבן. אחרי מות צייד המפלצות המפורסם Ulysses Bloodstone, קבוצת ציידים מתכנסת באחוזה שלו לתחרות על שריד בעל כוח. אחד מהם, Jack Russell, מסתיר סוד.",
      concepts: [
        "מתחת לעולם הגיבורים קיים עולם סודי של מפלצות וציידי מפלצות",
        "Jack Russell הוא איש זאב",
        "Elsa Bloodstone, הבת המנוכרת, יורשת את השריד ואת מורשת המשפחה",
        "Man-Thing, יצור ביצה, הוא חבר של Jack",
      ],
      characters: [
        "Jack Russell / Werewolf by Night",
        "Elsa Bloodstone",
        "Ted / Man-Thing",
        "Verussa Bloodstone",
      ],
      objects: ["ה-Bloodstone"],
      connections: [
        "סיפור שעומד בפני עצמו: עולם המפלצות שנחשף כאן לא נגע עד עכשיו בגיבורים שהכרת",
      ],
    },
  },
  "the-guardians-of-the-galaxy-holiday-special": {
    knowledge: {
      summary:
        "Mantis ו-Drax רוצים לשמח את Peter Quill בחג המולד הראשון שלו מאז שאיבד את Gamora, ויוצאים לכדור הארץ כדי להביא לו את המתנה המושלמת: השחקן Kevin Bacon.",
      concepts: [
        "ה-Guardians קנו את Knowhere והפכו אותו לבסיס שלהם",
        "Mantis היא אחותו למחצה של Peter — שניהם ילדיו של Ego",
        "Cosmo, כלב החלל הרוסי, מצטרף לצוות",
      ],
      characters: [
        "Peter Quill / Star-Lord",
        "Mantis",
        "Drax",
        "Rocket",
        "Groot",
        "Nebula",
        "Kraglin",
        "Cosmo",
      ],
      objects: ["Knowhere"],
      connections: [
        "Ego, אביו של Peter מ-Guardians of the Galaxy Vol. 2, הוא גם אביה של Mantis",
        "Knowhere, שבו ה-Collector החזיק את אבן המציאות, הוא עכשיו הבית של הצוות",
      ],
    },
  },
  "secret-invasion": {
    knowledge: {
      summary:
        "Nick Fury חוזר לכדור הארץ אחרי שנים בחלל ומגלה שקבוצה רדיקלית של Skrulls, בהנהגת Gravik, השתלטה בסתר על עמדות מפתח ורוצה להפוך את כדור הארץ לבית שלהם — גם במחיר מלחמה עולמית.",
      concepts: [
        "אלפי Skrulls חיים על כדור הארץ בזהויות מושאלות, חלקם בתפקידים בכירים",
        "Fury לא עמד בהבטחה למצוא ל-Skrulls בית, והמרירות הזאת הולידה את המרד",
        "'ה-Harvest' — DNA של גיבורים שנאסף מקרב Endgame — מעניק למי שמשתמש בו כוחות משולבים",
        "Rhodey היה Skrull שהתחזה לו",
        "Talos ו-Maria Hill נהרגים",
        "Fury עוזב שוב לחלל כדי לעבוד על פתרון עם ה-Kree וה-Skrulls",
      ],
      characters: [
        "Nick Fury",
        "Talos",
        "G'iah",
        "Gravik",
        "Maria Hill",
        "Priscilla",
        "Everett Ross",
        "James Rhodes",
      ],
      organizations: ["Skrulls", "MI6", "S.A.B.E.R."],
      objects: ["ה-Harvest"],
      connections: [
        "Fury הבטיח ל-Talos ולפליטי ה-Skrulls בית כבר ב-1995, ב-Captain Marvel",
        "ה-Harvest נאסף משדה הקרב של Endgame",
      ],
    },
  },
  "loki-season-2": {
    knowledge: {
      summary:
        "אחרי מות He Who Remains, Loki מתחיל 'לדלג' בזמן בלי שליטה, וה-TVA נקלעת לכאוס. ה-Temporal Loom, המכונה שמנהלת את ציר הזמן, קורסת מול ההסתעפויות החדשות, ו-Loki נאבק להציל את החברים שלו ואת כל הזמנים.",
      concepts: [
        "ה-Temporal Loom לא יכול להכיל את ההסתעפויות, ועלול להשמיד את כולן",
        "Victor Timely הוא וריאנט נוסף של He Who Remains",
        "Loki לומד לשלוט בדילוג בזמן ולחזור לרגעים שוב ושוב",
        "Loki לוקח על עצמו את המקום בסוף הזמן ומחזיק בעצמו את ענפי המולטיוורס",
        "ה-TVA מתחילה לפקח על וריאנטים של He Who Remains ביקומים השונים",
      ],
      characters: [
        "Loki",
        "Mobius",
        "Sylvie",
        "Ouroboros (O.B.)",
        "Victor Timely",
        "Hunter B-15",
        "Ravonna Renslayer",
      ],
      organizations: ["TVA — Time Variance Authority"],
      objects: ["ה-Temporal Loom", "Time Slipping"],
      connections: [
        "ממשיכה ישירות מסוף העונה הראשונה, רגע אחרי ש-Sylvie הרגה את He Who Remains",
        "He Who Remains אמר שיש גרסאות נוספות שלו — Victor Timely הוא אחת מהן",
      ],
    },
  },
  "what-if-season-2": {
    knowledge: {
      summary:
        "ה-Watcher חוזר עם יקומים חדשים, והפעם הוא כבר לא מסתפק רק בצפייה. הוא מגייס גיבורים מיקומים שונים למשימות שמחייבות אותו להתערב.",
      concepts: [
        "ה-Watcher ממשיך להתרחק מהשבועה שלו ומתערב באופן פעיל",
        "Kahhori, צעירה ממוהוק, מקבלת כוחות מה-Tesseract ביקום שבו הוא נחת באמריקה שלפני הקולוניזציה",
        "Captain Carter ממשיכה להרפתקאות חדשות",
        "Strange Supreme מהעונה הקודמת חוזר ומנסה לתקן את היקום שהרס",
      ],
      characters: [
        "The Watcher (Uatu)",
        "Kahhori",
        "Captain Carter",
        "Strange Supreme",
        "Nebula",
      ],
      objects: ["ה-Tesseract"],
      connections: [
        "Captain Carter ו-Strange Supreme ממשיכים מהעונה הראשונה של What If...?",
      ],
    },
  },
  "what-if-season-3": {
    knowledge: {
      summary:
        "העונה האחרונה של What If...? סוגרת את המסע של ה-Watcher — ומראה מה קורה כשה-Watchers האחרים מגלים כמה התערב.",
      concepts: [
        "ה-Watcher הוא אחד מגזע שלם של Watchers, שלא סלחו לו על ההתערבות",
        "גיבורים מיקומים שונים מתאחדים שוב סביב Captain Carter",
        "הסיפור של ה-Watcher והמולטיוורס שהוא צופה בו מגיע לסיום",
      ],
      characters: ["The Watcher (Uatu)", "Captain Carter", "Kahhori", "The Eminence"],
      organizations: ["ה-Watchers"],
      connections: ["ממשיכה ישירות מהעונות הקודמות, כולל Captain Carter ו-Kahhori"],
    },
  },
  "agatha-all-along": {
    knowledge: {
      summary:
        "זמן מה אחרי ש-Wanda כלאה אותה בזהות בדויה ב-Westview, Agatha Harkness מתעוררת בלי כוחות. נער מסתורי משכנע אותה לצאת עם קבוצת מכשפות אל 'דרך המכשפות' — מסע אגדי שבסופו מחכה מה שכל אחד מהם הכי רוצה.",
      concepts: [
        "דרך המכשפות אמיתית, וכל שלב בה הוא ניסיון של מכשפה אחרת",
        "הנער הוא Billy Maximoff — אחד התאומים של Wanda — שנשמתו עברה לגוף של נער אחר",
        "Rio Vidal היא Death, המוות עצמו, ובעבר היה לה קשר אישי עם Agatha",
        "Agatha מתה בסוף, וחוזרת כרוח לצידו של Billy",
        "Billy יוצא לחפש את אחיו Tommy",
      ],
      characters: [
        "Agatha Harkness",
        "Billy Maximoff / Teen",
        "Rio Vidal / Death",
        "Lilia Calderu",
        "Jennifer Kale",
        "Alice Wu-Gulliver",
      ],
      objects: ["דרך המכשפות (The Witches' Road)", "ה-Darkhold"],
      connections: [
        "Agatha נכלאה בזהות 'Agnes' בסוף WandaVision",
        "Billy ו-Tommy הם התאומים ש-Wanda יצרה בתוך ההקס ב-WandaVision",
      ],
    },
  },
  "daredevil-born-again-season-1": {
    knowledge: {
      summary:
        "אחרי שחברו הטוב Foggy Nelson נרצח, Matt Murdock תולה את חליפת Daredevil ומתמקד בעבודת עורך דין. במקביל, Wilson Fisk נבחר לראשות העיר ניו יורק ומבטיח לנקות אותה — בדרכים משלו.",
      concepts: [
        "Bullseye הרג את Foggy, ו-Matt מנסה לפעול בתוך החוק",
        "Fisk הופך לראש העיר ומקים כוח משימה נגד 'ויג'ילנטים'",
        "Frank Castle, ה-Punisher, מייצג את מה ש-Matt לא רוצה להפוך אליו",
        "Matt חוזר לחליפה ומתחיל לגייס בעלי ברית נגד Fisk",
      ],
      characters: [
        "Matt Murdock / Daredevil",
        "Wilson Fisk / Kingpin",
        "Vanessa Fisk",
        "Karen Page",
        "Frank Castle / Punisher",
        "Bullseye",
        "Hector Ayala / White Tiger",
      ],
      organizations: ["כוח המשימה נגד ויג'ילנטים"],
      connections: [
        "Fisk מוכר מ-Hawkeye ומ-Echo, שם שרד את הירי של Maya",
        "Matt הופיע לפני כן כעורך דין ב-No Way Home וב-She-Hulk",
      ],
    },
  },
  ironheart: {
    knowledge: {
      summary:
        "Riri Williams, גאונה צעירה שנזרקה מ-MIT, חוזרת לשיקגו עם חליפת שריון שבנתה בעצמה. כדי לממן את הפרויקט היא מצטרפת לכנופיה של Parker Robbins — ה-Hood — שמשתמש בכוח שאינו טכנולוגי בכלל.",
      concepts: [
        "Riri בונה חליפות ברמה של Tony Stark מאפס",
        "ל-Parker Robbins יש גלימה שמעניקה לו כוחות קסם",
        "המאבק בין מדע לקסם הוא הלב של הסדרה",
        "Riri יוצרת עוזר בינה מלאכותית שמבוסס על חבר שאיבדה",
        "בסוף, ישות שטנית בשם Mephisto מציעה לה עסקה",
      ],
      characters: [
        "Riri Williams / Ironheart",
        "Parker Robbins / The Hood",
        "N.A.T.A.L.I.E.",
        "Joe McGillicuddy",
        "Mephisto",
      ],
      organizations: ["הכנופיה של The Hood"],
      objects: ["חליפת Ironheart", "הגלימה של The Hood"],
      connections: [
        "Riri הופיעה לראשונה ב-Black Panther: Wakanda Forever, שם בנתה את גלאי הוויברניום",
        "העבודה שלה ממשיכה את מורשת החליפות של Tony Stark",
      ],
    },
  },
};
