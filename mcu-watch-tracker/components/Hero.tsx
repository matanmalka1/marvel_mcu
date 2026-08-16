import { EyeOff, Film, ListOrdered, Save } from "lucide-react";
import type { ComponentType, ReactNode } from "react";

type Tag = {
  label: string;
  icon: ComponentType<{ className?: string }>;
};

const TAGS: Tag[] = [
  { label: "סרטים בלבד", icon: Film },
  { label: "סדר כרונולוגי", icon: ListOrdered },
  { label: "ללא ספוילרים", icon: EyeOff },
  { label: "נשמר אוטומטית", icon: Save },
];

export default function Hero({ nextUp }: { nextUp: ReactNode }) {
  return (
    <section className="relative overflow-hidden border-b border-[var(--border)]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_65%_at_75%_0%,rgba(229,18,46,0.16),transparent_60%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-[var(--accent)]/50 to-transparent"
      />

      <div className="relative mx-auto grid max-w-[1240px] gap-10 px-4 pb-14 pt-12 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-12 lg:pb-20 lg:pt-16">
        <div>
          <p className="font-slate text-[11px] uppercase tracking-[0.3em] text-[var(--accent-soft)]">
            Phase 1 → today
          </p>

          <h1 className="font-display mt-4 text-4xl font-extrabold leading-[1.08] sm:text-5xl lg:text-6xl">
            המסע שלך ב־
            <span className="text-[var(--accent)]">MCU</span>
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-[var(--muted)] sm:text-lg">
            צפייה לפי ציר הזמן הכרונולוגי, מעקב התקדמות והבנת כל החיבורים — בלי
            ספוילרים קדימה.
          </p>

          <ul className="mt-7 flex flex-wrap gap-2">
            {TAGS.map(({ label, icon: Icon }) => (
              <li
                key={label}
                className="flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 text-xs text-[var(--muted)]"
              >
                <Icon className="h-3.5 w-3.5 text-[var(--accent-soft)]" aria-hidden="true" />
                {label}
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:ps-4">{nextUp}</div>
      </div>
    </section>
  );
}
