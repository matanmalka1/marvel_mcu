# MCU Watch Tracker

אפליקציית Next.js בעברית למעקב צפייה בסרטים ובסדרות Disney+ של MCU, לפי סדר כרונולוגי או סדר יציאה. אין backend או DB; ההתקדמות נשמרת מקומית בדפדפן.

## יכולות

- סימון צפייה בלחיצה אחת עם Undo והיסטוריה של עד 25 פעולות.
- סנכרון בטוח בין טאבים ושמירה מגורסת ב־`localStorage`.
- 38 סרטים ו־18 סדרות וספיישלים של Disney+, עם מתג "כולל סדרות" בהגדרות.
- מעבר בין סדר כרונולוגי לסדר יציאה. הבחירה נשמרת וקובעת גם את הכותר הבא לצפייה.
- התקדמות לפי שלב (Phase) וסוג כותר, תור "אחר כך" וקבוצות בציר הזמן.
- חיפוש וסינון לפי Phase, Saga, סוג ומצב צפייה. הסינון נשמר ב־URL וניתן לשיתוף.
- מידע מוגן מספוילרים וחיבורים שנפתחים רק לאחר צפייה בסרטים הנדרשים.
- כרטיסי ידע מתקפלים וטעינה עצלה של תוכן הידע והביקורות.
- תמיכה ב־RTL, נגישות מקלדת, reduced motion ו־PWA manifest.

## פיתוח

נדרש Node.js 22 ומעלה.

```bash
npm ci
npm run dev
```

פקודות האימות:

```bash
npm run lint
npm run format:check
npm run typecheck
npm test
npm run build
npm run check
```

`npm run check` מריץ את כל הבדיקות ואת production build. אותו רצף רץ גם ב־GitHub Actions, יחד עם audit של תלויות production.

## מבנה מרכזי

```text
app/                         App Router, metadata וסגנון גלובלי
components/                  רכיבי הדשבורד והאינטראקציה
data/movieCatalog.ts         מטא־דאטה קל לכל 56 הכותרים ושני סדרי הצפייה
data/movieDetails.ts         ידע וביקורות לסרטים, שנטענים באופן עצל
data/seriesDetails.ts        ידע לסדרות ולספיישלים
data/movies.ts               חיבור הקטלוג והפרטים עבור סקשן הידע
data/connections.ts          חיבורים נושאיים ותנאי פתיחה
hooks/useWatchProgress.ts    מקור האמת להתקדמות, העדפות תצוגה, Undo וסנכרון טאבים
hooks/useTimelineFilters.ts  סינון ציר הזמן המשוקף ל־URL
lib/progressStats.ts         חישובי התקדמות נגזרים
lib/watchProgressStorage.ts  ולידציה ופורמט השמירה המקומית
tests/                       בדיקות מצב, אחסון ושלמות נתונים
```

## כללי נתונים וספוילרים

- ב־state נשמרים רק `watchedIds` והעדפות התצוגה (`orderMode`, `includeSeries`); כל הנתונים הנגזרים מחושבים.
- payload מגרסה 1 מומר אוטומטית: ההתקדמות נשמרת והתצוגה נשארת "סרטים בלבד".
- payload לא תקין או מגרסה לא מוכרת נדחה בבטחה.
- `KnowledgeSection` מקבל IDs של סרטים שנצפו ומרכיב רק את המידע המותר להצגה.
- חיבור מוצג רק כאשר כל הערכים ב־`requires` סומנו כנצפים.
- בדיקות שלמות מוודאות IDs ייחודיים, סדר כרונולוגי רציף, התאמה מלאה לסדר היציאה, קישורים חוקיים וטווחי ציונים.

## הוספת סרט או סדרה

1. הוסף מטא־דאטה ל־`data/movieCatalog.ts` (כולל `kind`, ולסדרות גם `season` ו־`episodes`), עדכן את `timelineOrder` של הכותרים שאחריו ואת `RELEASE_ORDER_IDS`.
2. הוסף `knowledge` (ו־`review` כשיש מקור) ב־`data/movieDetails.ts` או ב־`data/seriesDetails.ts`.
3. הוסף חיבורים רלוונטיים ב־`data/connections.ts`.
4. הרץ `npm run validate:data` ולאחר מכן `npm run check`.

ציוני ביקורות וקישורי מקור הם נתונים סטטיים; יש לבדוק ולעדכן אותם בעת עדכון הקטלוג.
