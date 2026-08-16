import { Flag } from "lucide-react";

type ProgressOverviewProps = {
  watchedCount: number;
  totalMovies: number;
  remainingCount: number;
  percentWatched: number;
  endgameWatched: number;
  endgameTotal: number;
  endgamePercent: number;
};

function Bar({
  value,
  color,
  label,
}: {
  value: number;
  color: string;
  label: string;
}) {
  return (
    <div
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label}
      className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.07]"
    >
      <div
        className="h-full rounded-full transition-[width] duration-500"
        style={{ width: `${value}%`, backgroundColor: color }}
      />
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5">
      <p className="text-xs text-[var(--muted)]">{label}</p>
      <p className="font-slate mt-2 text-3xl font-semibold leading-none">
        {value}
      </p>
    </div>
  );
}

export default function ProgressOverview({
  watchedCount,
  totalMovies,
  remainingCount,
  percentWatched,
  endgameWatched,
  endgameTotal,
  endgamePercent,
}: ProgressOverviewProps) {
  return (
    <section
      aria-labelledby="progress-heading"
      className="mx-auto max-w-[1240px] px-4 py-12 sm:px-6"
    >
      <h2 id="progress-heading" className="sr-only">
        התקדמות
      </h2>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:col-span-2">
          <div className="flex items-baseline justify-between gap-3">
            <p className="text-xs text-[var(--muted)]">התקדמות כוללת</p>
            <p className="font-slate text-xs text-[var(--muted)]">
              {percentWatched}%
            </p>
          </div>
          <p className="font-slate mt-2 text-3xl font-semibold leading-none">
            {watchedCount}
            <span className="text-[var(--muted)]"> / {totalMovies}</span>
          </p>
          <div className="mt-4">
            <Bar
              value={percentWatched}
              color="var(--accent)"
              label="התקדמות כוללת בציר הזמן"
            />
          </div>
        </div>

        <Stat label="סרטים שנצפו" value={watchedCount} />
        <Stat label="נותרו לצפייה" value={remainingCount} />

        <div className="rounded-xl border border-[var(--milestone)]/25 bg-[var(--milestone)]/[0.05] p-5 lg:col-span-4">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
            <p className="flex items-center gap-2 text-xs text-[var(--milestone)]">
              <Flag className="h-3.5 w-3.5" aria-hidden="true" />
              אבן דרך
            </p>
            <p className="font-slate text-xs text-[var(--muted)]">
              {endgamePercent}%
            </p>
          </div>

          <div className="mt-2 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <p dir="ltr" className="font-display text-xl font-bold">
              Avengers: Endgame
            </p>
            <p className="font-slate text-2xl font-semibold leading-none">
              {endgameWatched}
              <span className="text-[var(--muted)]"> / {endgameTotal}</span>
            </p>
          </div>

          <div className="mt-4">
            <Bar
              value={endgamePercent}
              color="var(--milestone)"
              label="התקדמות לקראת Avengers: Endgame"
            />
          </div>

          <p className="mt-4 max-w-2xl text-xs leading-relaxed text-[var(--muted)]">
            Endgame היא נקודת שיא מרכזית ב-MCU, אבל לא סוף המעקב — אחריה ממשיך
            ציר הזמן עם עוד {totalMovies - endgameTotal} סרטים.
          </p>
        </div>
      </div>
    </section>
  );
}
