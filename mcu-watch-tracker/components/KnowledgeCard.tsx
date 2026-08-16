import { Check, Link2, Star } from "lucide-react";

import type { Movie } from "@/types/movie";

function ChipList({ label, items }: { label: string; items: string[] }) {
  if (items.length === 0) return null;

  return (
    <div>
      <p className=" text-[10px] uppercase tracking-[0.16em] text-[var(--muted)]">
        {label}
      </p>
      <ul className="mt-2 flex flex-wrap gap-1.5">
        {items.map((item) => (
          <li
            key={item}
            className="rounded-md border border-[var(--border)] bg-[var(--surface)] px-2 py-1 text-xs text-[var(--text)]"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function KnowledgeCard({ movie }: { movie: Movie }) {
  const slateNumber = String(movie.timelineOrder).padStart(2, "0");
  const knowledge = movie.knowledge;
  const review = movie.review;

  return (
    <article className="flex flex-col rounded-2xl border border-[var(--border)] bg-[var(--bg-raised)] p-6">
      <header className="flex items-start gap-3">
        <span className="font-slate mt-0.5 shrink-0 rounded-md border border-[var(--border)] px-2 py-1 text-xs text-[var(--muted)]">
          {slateNumber}
        </span>
        <div className="min-w-0 flex-1">
          <h3
            dir="ltr"
            className="font-display text-lg font-bold leading-snug"
          >
            {movie.title}
          </h3>
          <p className="font-slate mt-1 text-[11px] text-[var(--muted)]">
            Phase {movie.phase} · {movie.timelineLabel ?? "—"}
          </p>
        </div>
        <span className="flex shrink-0 items-center gap-1 rounded-full border border-[var(--accent)]/35 bg-[var(--accent)]/10 px-2.5 py-1 text-[11px] text-[var(--accent-soft)]">
          <Check className="h-3 w-3" aria-hidden="true" />
          נצפה
        </span>
      </header>

      {knowledge ? (
        <div className="mt-5 space-y-5">
          <p className="text-sm leading-relaxed text-[var(--text)]/90">
            {knowledge.summary}
          </p>

          <div>
            <p className="font-slate text-[10px] uppercase tracking-[0.16em] text-[var(--muted)]">
              מה למדת
            </p>
            <ul className="mt-2 space-y-2">
              {knowledge.concepts.map((concept) => (
                <li
                  key={concept}
                  className="flex gap-2.5 text-sm leading-relaxed text-[var(--text)]/85"
                >
                  <span
                    aria-hidden="true"
                    className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--accent)]"
                  />
                  {concept}
                </li>
              ))}
            </ul>
          </div>

          <ChipList label="דמויות" items={knowledge.characters} />
          <ChipList label="ארגונים" items={knowledge.organizations ?? []} />
          <ChipList label="אובייקטים ואירועים" items={knowledge.objects ?? []} />

          {knowledge.connections && knowledge.connections.length > 0 ? (
            <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
              <p className="font-slate flex items-center gap-1.5 text-[10px] uppercase tracking-[0.16em] text-[var(--muted)]">
                <Link2 className="h-3 w-3" aria-hidden="true" />
                חיבורים למה שכבר ראית
              </p>
              <ul className="mt-2.5 space-y-2">
                {knowledge.connections.map((connection) => (
                  <li
                    key={connection}
                    className="text-sm leading-relaxed text-[var(--text)]/85"
                  >
                    {connection}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {review ? (
            <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
              <p className="font-slate flex items-center gap-1.5 text-[10px] uppercase tracking-[0.16em] text-[var(--muted)]">
                <Star className="h-3 w-3" aria-hidden="true" />
                סקירה ביקורתית
              </p>
              <div className="mt-2.5 flex flex-wrap gap-2">
                {review.rottenTomatoesScore !== undefined ? (
                  <span className="font-slate rounded-md border border-[var(--border)] bg-[var(--bg-raised)] px-2 py-1 text-xs text-[var(--text)]">
                    Rotten Tomatoes {review.rottenTomatoesScore}%
                  </span>
                ) : null}
                {review.metacriticScore !== undefined ? (
                  <span className="font-slate rounded-md border border-[var(--border)] bg-[var(--bg-raised)] px-2 py-1 text-xs text-[var(--text)]">
                    Metacritic {review.metacriticScore}
                  </span>
                ) : null}
              </div>
              <p className="mt-2.5 text-sm leading-relaxed text-[var(--text)]/85">
                {review.consensus}
              </p>
              <a
                href={review.sourceUrl}
                target="_blank"
                rel="noreferrer"
                dir="ltr"
                className="mt-2 inline-block text-xs text-[var(--accent-soft)] underline"
              >
                {review.source}
              </a>
            </div>
          ) : null}
        </div>
      ) : (
        <p className="mt-5 text-sm leading-relaxed text-[var(--muted)]">
          עוד לא נכתבה סקירה לסרט הזה. אפשר להוסיף אותה בקובץ{" "}
          <code dir="ltr" className="font-slate text-[var(--text)]">
            data/movies.ts
          </code>{" "}
          תחת המפתח <code dir="ltr" className="font-slate text-[var(--text)]">knowledge</code>.
        </p>
      )}
    </article>
  );
}
