# MCU Watch Tracker

אפליקציית Next.js בעברית למעקב צפייה בסרטי MCU, לפי סדר כרונולוגי או סדר יציאה. אין backend או DB; ההתקדמות נשמרת מקומית בדפדפן.

## יכולות

- סימון צפייה בלחיצה אחת עם Undo והיסטוריה של עד 25 פעולות.
- סנכרון בטוח בין טאבים ושמירה מגורסת ב־`localStorage`.
- מעבר בין סדר כרונולוגי לסדר יציאה.
- חיפוש וסינון לפי Phase, Saga ומצב צפייה.
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
data/movieCatalog.ts         מטא־דאטה קל ל־38 הסרטים ושני סדרי הצפייה
data/movieDetails.ts         ידע וביקורות שנטענים באופן עצל
data/movies.ts               חיבור הקטלוג והפרטים עבור סקשן הידע
data/connections.ts          חיבורים נושאיים ותנאי פתיחה
hooks/useWatchProgress.ts    מקור האמת להתקדמות, Undo וסנכרון טאבים
lib/watchProgressStorage.ts  ולידציה ופורמט השמירה המקומית
tests/                       בדיקות מצב, אחסון ושלמות נתונים
```

## כללי נתונים וספוילרים

- ב־state נשמרים רק `watchedIds`; כל הנתונים הנגזרים מחושבים.
- payload לא תקין או מגרסה אחרת נדחה בבטחה.
- `KnowledgeSection` מקבל IDs של סרטים שנצפו ומרכיב רק את המידע המותר להצגה.
- חיבור מוצג רק כאשר כל הערכים ב־`requires` סומנו כנצפים.
- בדיקות שלמות מוודאות IDs ייחודיים, סדר כרונולוגי רציף, התאמה מלאה לסדר היציאה, קישורים חוקיים וטווחי ציונים.

## הוספת סרט

1. הוסף מטא־דאטה ל־`data/movieCatalog.ts` ועדכן את `RELEASE_ORDER_IDS`.
2. הוסף `knowledge` ו־`review` תואמים ב־`data/movieDetails.ts`.
3. הוסף חיבורים רלוונטיים ב־`data/connections.ts`.
4. הרץ `npm run validate:data` ולאחר מכן `npm run check`.

ציוני ביקורות וקישורי מקור הם נתונים סטטיים; יש לבדוק ולעדכן אותם בעת עדכון הקטלוג.
