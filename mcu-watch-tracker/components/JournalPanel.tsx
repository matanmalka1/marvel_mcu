"use client";

import { CalendarCheck, NotebookPen } from "lucide-react";
import { useId } from "react";

import StarRating from "@/components/StarRating";
import { formatWatchedAt } from "@/lib/dates";
import { MAX_NOTE_LENGTH } from "@/lib/watchProgressStorage";
import type { JournalEntry } from "@/types/movie";

type JournalPanelProps = {
  title: string;
  entry: JournalEntry | undefined;
  watchedAt: string | undefined;
  onChange: (patch: JournalEntry) => void;
};

/** The viewer's own rating, note and watch date for one title. */
export default function JournalPanel({
  title,
  entry,
  watchedAt,
  onChange,
}: JournalPanelProps) {
  const noteId = useId();

  return (
    <div className="rounded-xl border border-[var(--milestone)]/25 bg-[var(--milestone)]/[0.04] p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.16em] text-[var(--milestone)]">
          <NotebookPen className="h-3 w-3" aria-hidden="true" />
          היומן שלי
        </p>
        <p className="flex items-center gap-1.5 text-[11px] text-[var(--muted)]">
          <CalendarCheck className="h-3.5 w-3.5" aria-hidden="true" />
          {watchedAt ? `נצפה ב-${formatWatchedAt(watchedAt)}` : "תאריך צפייה לא נשמר"}
        </p>
      </div>

      <div className="mt-3 flex items-center gap-3">
        <span className="text-xs text-[var(--muted)]">הדירוג שלך</span>
        <StarRating
          label={`הדירוג שלך ל-${title}`}
          value={entry?.rating}
          onChange={(rating) => onChange({ rating })}
        />
      </div>

      <label htmlFor={noteId} className="sr-only">
        הערה אישית על {title}
      </label>
      <textarea
        id={noteId}
        value={entry?.note ?? ""}
        onChange={(event) => onChange({ note: event.target.value })}
        maxLength={MAX_NOTE_LENGTH}
        rows={2}
        placeholder="מה חשבת? רגע אהוב, ציטוט, עם מי צפית…"
        className="mt-3 w-full resize-y rounded-lg border border-[var(--border)] bg-black/25 px-3 py-2 text-sm text-[var(--text)] placeholder:text-[var(--muted)]/70 focus:border-[var(--milestone)]/60 focus:outline-none"
      />
    </div>
  );
}
