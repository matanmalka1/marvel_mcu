# MCU Watch Tracker

קבצי מקור להטמעה בריפו Next.js קיים (App Router). אין backend, אין DB, אין ספריית state.

## מבנה

```
app/
  layout.tsx          html lang="he" dir="rtl" + מטא-דאטה
  page.tsx            הדשבורד — מרכיב את כל הסקשנים
  globals.css         טוקנים, פוקוס, reduced-motion
components/
  Header.tsx          מותג, התקדמות, ביטול, איפוס
  Hero.tsx            כותרת, תגיות, סלוט ל-Next Up
  NextUpCard.tsx      הסרט הבא + CTA
  ProgressOverview.tsx התקדמות כוללת + אבן דרך Endgame
  KnowledgeSection.tsx / KnowledgeCard.tsx
  ConnectionsSection.tsx
  Timeline.tsx / TimelineRow.tsx / SearchInput.tsx
data/
  movies.ts           38 סרטים, כרונולוגי
  connections.ts      חוטים נושאיים + פילטר לפי נצפים
hooks/
  useWatchProgress.ts מקור אמת יחיד: watchedIds, נגזרות, localStorage, undo, reset
types/
  movie.ts
```

## לפני הרצה

1. **Alias** — הקוד מייבא `@/...`. אם ה-tsconfig לא מכיל את זה, הוסף:
   ```json
   "paths": { "@/*": ["./*"] }
   ```
   (אם הריפו משתמש ב-`src/`, העבר את התיקיות לשם והתאם ל-`["./src/*"]`.)

2. **Tailwind** — `globals.css` נכתב ל-Tailwind v4 (`@import "tailwindcss";`).
   ב-v3 החלף את השורה הראשונה ב-`@tailwind base; @tailwind components; @tailwind utilities;`.
   כל שאר הסגנון משתמש ב-utilities סטנדרטיים + CSS variables, כך שאין תלות ב-`tailwind.config`.

3. **פונטים** — יש stack מערכתי ב-`globals.css`. אם תרצה Rubik/Assistant אמיתיים:
   ```ts
   import { Rubik, Assistant } from "next/font/google";
   ```
   וקשור את המשתנים `--font-display` / `--font-body`.

4. `npm install lucide-react` אם עוד לא מותקן.

5. `npm run build` + `npm run typecheck` (אצלי בסביבה אין רשת, אז ה-build עצמו לא רץ כאן —
   הקוד עבר typecheck מול טיפוסים מדומים, בלי שגיאות).

## כללי מוצר שנאכפים בקוד

- **ספוילרים**: `knowledge` ו-`review` כתובים מראש עבור כל הסרטים ב-`movies.ts`, לא רק לנצפים.
  ההגנה מפני ספוילרים נאכפת במלואה על ידי סינון לפי מצב-נצפה ב-UI: הקומפוננטה מקבלת ומציגה
  רק סרטים שסומנו כנצפים, ולא מסתמכת על נוכחות/היעדר הנתונים בקובץ. חיבור ב-`connections.ts`
  מוצג רק אם **כל** ה-`requires` שלו נצפו.
- **אין נגזרות ב-state**: נשמר רק `watchedIds`. אחוזים, נותרו, הסרט הבא ואבן הדרך מחושבים.
- **אחסון מגורסה**: `mcu-watch-progress-v1`, ולידציה על כל id, נפילה חיננית ל-4 הסרטים הידועים
  אם ה-payload פגום או מגרסה אחרת.
- **Reset** מחזיר ל-4 הסרטים, לא לאפס.
- **Undo** בזיכרון בלבד (עד 25 פעולות), לא נשמר בין רענונים.

## להוספת סרט/סדרה בהמשך

הוסף רשומה ל-`MOVIES` (או מלא `knowledge` בקיימת) והוסף חוטים ל-`CONNECTIONS`.
המודל כבר מפריד `phase` / `timelineOrder` / `timelineLabel`, ולכן הוספת poster, rating,
notes, watchDate או מצב release-order היא הוספת שדות אופציונליים בלבד.
