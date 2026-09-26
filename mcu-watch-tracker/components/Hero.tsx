import { EyeOff, Film, ListOrdered, Save, Tv } from "lucide-react";
import type { ComponentType, ReactNode } from "react";

import ProgressRing from "@/components/ProgressRing";
import type { ViewPreferences } from "@/types/movie";

type Tag = {
  label: string;
  icon: ComponentType<{ className?: string }>;
};

type HeroProps = {
  nextUp: ReactNode;
  preferences: ViewPreferences;
  watchedCount: number;
  totalMovies: number;
  percentWatched: number;
};

export default function Hero({
  nextUp,
  preferences,
  watchedCount,
  totalMovies,
  percentWatched,
}: HeroProps) {
  const tags: Tag[] = [
    preferences.includeSeries
      ? { label: "סרטים וסדרות", icon: Tv }
      : { label: "סרטים בלבד", icon: Film },
    {
      label: preferences.orderMode === "timeline" ? "סדר כרונולוגי" : "סדר יציאה",
      icon: ListOrdered,
    },
    { label: "ללא ספוילרים", icon: EyeOff },
    { label: "נשמר אוטומטית", icon: Save },
  ];

  return (
    <section
      id="next-up"
      aria-labelledby="hero-heading"
      className="relative overflow-hidden border-b border-[var(--border)]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_65%_at_75%_0%,rgba(229,18,46,0.18),transparent_60%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(70%_60%_at_50%_0%,black,transparent)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-[var(--accent)]/60 to-transparent"
      />

      <div className="relative mx-auto grid max-w-[1240px] gap-10 px-4 pb-14 pt-10 sm:px-6 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-14 lg:pb-20 lg:pt-16">
        <div className="animate-rise-in">
          <p className="font-slate text-[11px] uppercase tracking-[0.3em] text-[var(--accent-soft)]">
            Phase 1 → today
          </p>

          <h1
            id="hero-heading"
            className="font-display mt-4 text-4xl font-extrabold leading-[1.05] sm:text-5xl lg:text-[4rem]"
          >
            המסע שלך ב־
            <span className="bg-gradient-to-l from-[var(--accent-soft)] to-[var(--accent)] bg-clip-text text-transparent">
              MCU
            </span>
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-[var(--muted)] sm:text-lg">
            כל הסרטים והסדרות לפי ציר הזמן או סדר היציאה, מעקב התקדמות והבנת כל החיבורים —
            בלי ספוילרים קדימה.
          </p>

          <div className="mt-8 flex items-center gap-5">
            <ProgressRing
              value={percentWatched}
              size={96}
              stroke={9}
              label="התקדמות כוללת"
            >
              <span className="font-slate text-xl font-semibold">{percentWatched}%</span>
            </ProgressRing>
            <div>
              <p className="font-slate text-3xl font-semibold leading-none">
                <span dir="ltr">
                  {watchedCount}
                  <span className="text-lg text-[var(--muted)]"> / {totalMovies}</span>
                </span>
              </p>
              <p className="mt-2 text-sm text-[var(--muted)]">
                {watchedCount === 0
                  ? "הכול מתחיל בכותר הראשון."
                  : watchedCount === totalMovies
                    ? "השלמת את כל המסע."
                    : `עוד ${totalMovies - watchedCount} כותרים עד הסוף.`}
              </p>
            </div>
          </div>

          <ul className="mt-8 flex flex-wrap gap-2">
            {tags.map(({ label, icon: Icon }) => (
              <li
                key={label}
                className="flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 text-xs text-[var(--muted)]"
              >
                <Icon
                  className="h-3.5 w-3.5 text-[var(--accent-soft)]"
                  aria-hidden="true"
                />
                {label}
              </li>
            ))}
          </ul>
        </div>

        <div className="animate-rise-in [animation-delay:80ms]">{nextUp}</div>
      </div>
    </section>
  );
}
