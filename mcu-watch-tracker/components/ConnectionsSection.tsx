import { ArrowLeft, Lock } from "lucide-react";

import type { Connection } from "@/types/movie";

function Chain({ items }: { items: string[] }) {
  return (
    <ol className="flex flex-wrap items-center gap-x-2 gap-y-1.5">
      {items.map((item, index) => (
        <li key={item} className="flex items-center gap-2">
          <span className="text-sm text-[var(--text)]/90">{item}</span>
          {index < items.length - 1 ? (
            <ArrowLeft className="h-3.5 w-3.5 text-[var(--accent)]" aria-hidden="true" />
          ) : null}
        </li>
      ))}
    </ol>
  );
}

export default function ConnectionsSection({
  connections,
  lockedCount,
}: {
  connections: Connection[];
  /** How many threads are still hidden. Only the count is shown — never their content. */
  lockedCount: number;
}) {
  return (
    <section
      id="connections"
      aria-labelledby="connections-heading"
      className="mx-auto max-w-[1240px] px-4 py-14 sm:px-6"
    >
      <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
        <div>
          <p className="font-slate text-[11px] uppercase tracking-[0.3em] text-[var(--accent-soft)]">
            Connections
          </p>
          <h2
            id="connections-heading"
            className="font-display mt-2 text-2xl font-bold sm:text-3xl"
          >
            החיבורים שכבר גילית
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--muted)]">
            חוטים שחוזרים בין הסרטים שראית. חיבורים חדשים נפתחים לבד ככל שתתקדם.
          </p>
        </div>
        <p className="font-slate text-xs text-[var(--muted)]">
          {connections.length} / {connections.length + lockedCount} חיבורים
        </p>
      </div>

      {connections.length === 0 ? (
        <p className="mt-8 rounded-2xl border border-dashed border-[var(--border)] p-8 text-center text-sm text-[var(--muted)]">
          חיבורים נפתחים אחרי שצופים בסרטים שמרכיבים אותם.
        </p>
      ) : (
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {connections.map((connection) => (
            <article
              key={connection.id}
              className={[
                "rounded-2xl border p-6 transition-colors",
                connection.wide
                  ? "border-[var(--accent)]/30 bg-gradient-to-bl from-[var(--accent)]/[0.1] to-transparent md:col-span-2"
                  : "border-[var(--border)] bg-[var(--surface)] hover:border-[var(--border-strong)]",
              ].join(" ")}
            >
              <h3 className="font-display text-lg font-bold">{connection.title}</h3>
              <div className="mt-3">
                <Chain items={connection.chain} />
              </div>
              <p className="mt-4 text-sm leading-relaxed text-[var(--muted)]">
                {connection.description}
              </p>
            </article>
          ))}
        </div>
      )}

      {lockedCount > 0 ? (
        <p className="mt-4 flex items-center gap-2 rounded-2xl border border-dashed border-[var(--border)] px-5 py-4 text-sm text-[var(--muted)]">
          <Lock className="h-4 w-4 shrink-0" aria-hidden="true" />
          עוד {lockedCount} חיבורים ממתינים — הם ייפתחו כשתצפה בכותרים שמרכיבים אותם.
        </p>
      ) : null}
    </section>
  );
}
