import { Clapperboard, Clock, Film, Flag, Tv } from "lucide-react";
import type { ComponentType } from "react";

import ProgressRing from "@/components/ProgressRing";
import {
  formatDuration,
  percentOf,
  type ProgressStats,
  type Tally,
} from "@/lib/progressStats";
import { phaseColor } from "@/lib/phase";

type ProgressOverviewProps = {
  stats: ProgressStats;
  includeSeries: boolean;
};

function Bar({ value, color, label }: { value: number; color: string; label: string }) {
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
        className="relative h-full overflow-hidden rounded-full transition-[width] duration-700 ease-out"
        style={{ width: `${value}%`, backgroundColor: color }}
      >
        {value > 0 && value < 100 ? (
          <span aria-hidden="true" className="bar-shimmer absolute inset-0" />
        ) : null}
      </div>
    </div>
  );
}

function KindStat({
  label,
  tally,
  icon: Icon,
  color,
}: {
  label: string;
  tally: Tally;
  icon: ComponentType<{ className?: string; style?: React.CSSProperties }>;
  color: string;
}) {
  const percent = percentOf(tally);
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
      <p className="flex items-center gap-1.5 text-xs text-[var(--muted)]">
        <Icon className="h-3.5 w-3.5" style={{ color }} aria-hidden="true" />
        {label}
      </p>
      <p className="font-slate mt-3 text-2xl font-semibold leading-none">
        <span dir="ltr">
          {tally.watched}
          <span className="text-base text-[var(--muted)]"> / {tally.total}</span>
        </span>
      </p>
      <div className="mt-4">
        <Bar value={percent} color={color} label={`${label}: ${percent}%`} />
      </div>
    </div>
  );
}

export default function ProgressOverview({
  stats,
  includeSeries,
}: ProgressOverviewProps) {
  const endgamePercent = percentOf(stats.endgame);
  const afterEndgame = stats.total - stats.endgame.total;

  return (
    <section
      id="progress"
      aria-labelledby="progress-heading"
      className="mx-auto max-w-[1240px] px-4 py-14 sm:px-6"
    >
      <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
        <div>
          <p className="font-slate text-[11px] uppercase tracking-[0.3em] text-[var(--accent-soft)]">
            Progress
          </p>
          <h2
            id="progress-heading"
            className="font-display mt-2 text-2xl font-bold sm:text-3xl"
          >
            איפה אתה במסע
          </h2>
        </div>
        <p className="text-xs text-[var(--muted)]">
          {stats.remaining === 0 ? "הכול נצפה" : `נותרו ${stats.remaining} כותרים`}
        </p>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-[1.1fr_1.9fr]">
        <div className="flex flex-col items-center justify-center gap-5 rounded-3xl border border-[var(--border)] bg-gradient-to-b from-[var(--surface-strong)] to-transparent p-6 sm:flex-row lg:flex-col">
          <ProgressRing
            value={stats.percent}
            size={168}
            stroke={14}
            label="התקדמות כוללת"
          >
            <div className="text-center">
              <p className="font-slate text-4xl font-semibold leading-none">
                {stats.percent}%
              </p>
              <p className="mt-1.5 text-[11px] text-[var(--muted)]">
                {stats.watched} מתוך {stats.total}
              </p>
            </div>
          </ProgressRing>
          <p className="max-w-[16rem] text-center text-sm leading-relaxed text-[var(--muted)] sm:text-start lg:text-center">
            {includeSeries
              ? "כולל סדרות וספיישלים של Disney+. אפשר להחריג אותם מההגדרות."
              : "סרטים בלבד. אפשר להוסיף את סדרות Disney+ מההגדרות."}
          </p>

          <div className="w-full max-w-sm rounded-2xl border border-[var(--border)] bg-black/20 p-4">
            <p className="flex items-center gap-1.5 text-[11px] text-[var(--muted)]">
              <Clock className="h-3.5 w-3.5" aria-hidden="true" />
              זמן צפייה
            </p>
            <div className="mt-2 flex items-end justify-between gap-3">
              <div>
                <p className="font-slate text-xl font-semibold leading-none">
                  כ־{formatDuration(stats.watchedMinutes)}
                </p>
                <p className="mt-1 text-[11px] text-[var(--muted)]">צפית</p>
              </div>
              <div className="text-end">
                <p className="font-slate text-xl font-semibold leading-none text-[var(--accent-soft)]">
                  כ־{formatDuration(stats.remainingMinutes)}
                </p>
                <p className="mt-1 text-[11px] text-[var(--muted)]">נשארו</p>
              </div>
            </div>
            <div className="mt-3">
              <Bar
                value={percentOf({
                  watched: stats.watchedMinutes,
                  total: stats.watchedMinutes + stats.remainingMinutes,
                })}
                color="var(--accent)"
                label="זמן צפייה שהושלם"
              />
            </div>
            {stats.unknownRuntime > 0 ? (
              <p className="mt-2 text-[10px] text-[var(--muted)]">
                לא כולל {stats.unknownRuntime} כותרים שאורכם עוד לא ידוע. אורך סדרות הוא
                הערכה.
              </p>
            ) : (
              <p className="mt-2 text-[10px] text-[var(--muted)]">
                אורך סדרות הוא הערכה.
              </p>
            )}
          </div>
        </div>

        <div className="grid content-start gap-4">
          <div className={`grid gap-4 ${includeSeries ? "sm:grid-cols-3" : ""}`}>
            <KindStat
              label="סרטים"
              tally={stats.byKind.movie}
              icon={Film}
              color="var(--accent)"
            />
            {includeSeries ? (
              <>
                <KindStat
                  label="סדרות"
                  tally={stats.byKind.series}
                  icon={Tv}
                  color="var(--series)"
                />
                <KindStat
                  label="ספיישלים"
                  tally={stats.byKind.special}
                  icon={Clapperboard}
                  color="var(--milestone)"
                />
              </>
            ) : null}
          </div>

          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
            <p className="text-xs text-[var(--muted)]">לפי שלב</p>
            <ul className="mt-4 grid grid-cols-2 gap-x-5 gap-y-4 sm:grid-cols-3">
              {stats.byPhase.map((phase) => {
                const percent = percentOf(phase);
                const color = phaseColor(phase.phase);
                return (
                  <li key={phase.phase}>
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="flex items-center gap-1.5 text-sm font-medium">
                        <span
                          aria-hidden="true"
                          className="h-2 w-2 rounded-full"
                          style={{
                            backgroundColor: color,
                            boxShadow: `0 0 8px ${color}`,
                          }}
                        />
                        Phase {phase.phase}
                      </span>
                      <span className="font-slate text-[11px] text-[var(--muted)]">
                        {phase.watched}/{phase.total}
                      </span>
                    </div>
                    <div className="mt-2">
                      <Bar
                        value={percent}
                        color={color}
                        label={`Phase ${phase.phase}: ${percent}%`}
                      />
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {stats.endgame.total > 0 ? (
          <div className="rounded-2xl border border-[var(--milestone)]/25 bg-gradient-to-l from-[var(--milestone)]/[0.09] to-transparent p-5 lg:col-span-2">
            <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
              <div>
                <p className="flex items-center gap-2 text-xs text-[var(--milestone)]">
                  <Flag className="h-3.5 w-3.5" aria-hidden="true" />
                  אבן דרך
                </p>
                <p dir="ltr" className="font-display mt-1.5 text-xl font-bold">
                  Avengers: Endgame
                </p>
              </div>
              <p className="font-slate text-2xl font-semibold leading-none">
                <span dir="ltr">
                  {stats.endgame.watched}
                  <span className="text-[var(--muted)]"> / {stats.endgame.total}</span>
                </span>
                <span className="ms-3 text-xs text-[var(--muted)]">
                  {endgamePercent}%
                </span>
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
              Endgame היא נקודת שיא מרכזית ב-MCU, אבל לא סוף המעקב — אחריה ממשיכים עוד{" "}
              {afterEndgame} כותרים.
            </p>
          </div>
        ) : null}
      </div>
    </section>
  );
}
