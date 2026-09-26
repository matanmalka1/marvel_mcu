"use client";

import { useMemo, useState } from "react";

import KnowledgeCard from "@/components/KnowledgeCard";
import { MOVIES_IN_TIMELINE_ORDER } from "@/data/movies";
import type { Journal } from "@/lib/watchProgressStorage";
import type { JournalEntry } from "@/types/movie";

export type KnowledgeSectionProps = {
  watchedIds: readonly string[];
  watchedAt: Readonly<Record<string, string>>;
  journal: Journal;
  onJournalChange: (id: string, patch: JournalEntry) => void;
};

export default function KnowledgeSection({
  watchedIds,
  watchedAt,
  journal,
  onJournalChange,
}: KnowledgeSectionProps) {
  const watchedMovies = useMemo(() => {
    const watchedSet = new Set(watchedIds);
    return MOVIES_IN_TIMELINE_ORDER.filter((movie) => watchedSet.has(movie.id));
  }, [watchedIds]);
  const [expandedIds, setExpandedIds] = useState<ReadonlySet<string>>(() => new Set());

  const toggleExpanded = (id: string) => {
    setExpandedIds((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const allExpanded =
    watchedMovies.length > 0 && watchedMovies.every((movie) => expandedIds.has(movie.id));

  return (
    <section
      aria-labelledby="knowledge-heading"
      className="mx-auto max-w-[1240px] px-4 py-14 sm:px-6"
    >
      <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
        <div>
          <p className="font-slate text-[11px] uppercase tracking-[0.3em] text-[var(--accent-soft)]">
            Knowledge
          </p>
          <h2
            id="knowledge-heading"
            className="font-display mt-2 text-2xl font-bold sm:text-3xl"
          >
            מה הבנת עד עכשיו
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--muted)]">
            רק ממה שכבר צפית בו. שום דבר כאן לא חושף מה קורה בהמשך.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <p className="text-xs text-[var(--muted)]">{watchedMovies.length} כותרים</p>
          {watchedMovies.length > 1 ? (
            <button
              type="button"
              onClick={() =>
                setExpandedIds(
                  allExpanded
                    ? new Set()
                    : new Set(watchedMovies.map((movie) => movie.id)),
                )
              }
              className="rounded-lg border border-[var(--border)] px-3 py-1.5 text-xs text-[var(--text)] transition-colors hover:border-[var(--border-strong)] hover:bg-[var(--surface)]"
            >
              {allExpanded ? "סגור הכול" : "פתח הכול"}
            </button>
          ) : null}
        </div>
      </div>

      {watchedMovies.length === 0 ? (
        <p className="mt-8 rounded-2xl border border-dashed border-[var(--border)] p-8 text-center text-sm text-[var(--muted)]">
          עדיין לא סימנת צפייה. סמן את הכותר הראשון בציר הזמן וההסבר יופיע כאן.
        </p>
      ) : (
        <div className="mt-8 grid items-start gap-4 lg:grid-cols-2">
          {watchedMovies.map((movie) => (
            <KnowledgeCard
              key={movie.id}
              movie={movie}
              expanded={expandedIds.has(movie.id)}
              onToggle={() => toggleExpanded(movie.id)}
              journalEntry={journal[movie.id]}
              watchedAt={watchedAt[movie.id]}
              onJournalChange={(patch) => onJournalChange(movie.id, patch)}
            />
          ))}
        </div>
      )}
    </section>
  );
}
