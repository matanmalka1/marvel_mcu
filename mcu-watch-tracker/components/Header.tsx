"use client";

import Image from "next/image";
import { Download, Undo2, WifiOff } from "lucide-react";

import ProgressRing from "@/components/ProgressRing";
import SettingsMenu from "@/components/SettingsMenu";
import { usePwa } from "@/hooks/usePwa";
import type { OrderMode, ViewPreferences } from "@/types/movie";

type HeaderProps = {
  watchedCount: number;
  totalMovies: number;
  percentWatched: number;
  canUndo: boolean;
  preferences: ViewPreferences;
  onUndo: () => void;
  onReset: () => void;
  onOrderModeChange: (mode: OrderMode) => void;
  onIncludeSeriesChange: (include: boolean) => void;
};

const SECTION_LINKS = [
  { href: "#next-up", label: "הבא בתור" },
  { href: "#progress", label: "התקדמות" },
  { href: "#history", label: "היסטוריה" },
  { href: "#knowledge", label: "מה הבנת" },
  { href: "#connections", label: "חיבורים" },
  { href: "#timeline", label: "ציר הזמן" },
] as const;

export default function Header({
  watchedCount,
  totalMovies,
  percentWatched,
  canUndo,
  preferences,
  onUndo,
  onReset,
  onOrderModeChange,
  onIncludeSeriesChange,
}: HeaderProps) {
  const { online, canInstall, install } = usePwa();

  return (
    <header className="glass sticky top-0 z-40 border-b border-[var(--border)]">
      <div className="mx-auto flex h-16 max-w-[1240px] items-center gap-3 px-4 sm:px-6">
        <a href="#top" className="flex items-center gap-2.5 rounded-lg">
          <Image
            src="/icons/brand-mark.png"
            alt=""
            width={32}
            height={32}
            priority
            className="h-8 w-8 shrink-0 rounded-lg ring-1 ring-inset ring-white/10"
          />
          <div>
            <p dir="ltr" className="font-display text-[15px] font-bold leading-none">
              MCU Watch Tracker
            </p>
            <p
              dir="ltr"
              className="font-slate mt-1.5 text-[10px] uppercase leading-none tracking-[0.2em] text-[var(--muted)]"
            >
              {preferences.orderMode === "timeline" ? "Chronological" : "Release order"}
              {preferences.includeSeries ? " · +Disney+" : ""}
            </p>
          </div>
        </a>

        <nav aria-label="ניווט בעמוד" className="ms-6 hidden lg:block">
          <ul className="flex items-center gap-1">
            {SECTION_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="rounded-lg px-3 py-2 text-xs text-[var(--muted)] transition-colors hover:bg-white/[0.04] hover:text-[var(--text)]"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ms-auto flex items-center gap-2">
          {!online ? (
            <span
              role="status"
              className="flex items-center gap-1.5 rounded-full border border-[var(--milestone)]/40 bg-[var(--milestone)]/10 px-2.5 py-1.5 text-[11px] text-[var(--milestone)]"
            >
              <WifiOff className="h-3.5 w-3.5" aria-hidden="true" />
              <span className="hidden sm:inline">אופליין · הכול נשמר</span>
            </span>
          ) : null}

          {canInstall ? (
            <button
              type="button"
              onClick={install}
              className="flex items-center gap-1.5 rounded-lg bg-[var(--accent)] px-2.5 py-2 text-xs font-semibold text-white transition-colors hover:bg-[var(--accent-soft)] sm:px-3"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              <span className="hidden md:inline">התקנה</span>
            </button>
          ) : null}

          <div className="hidden items-center gap-2 rounded-full border border-[var(--border)] py-1 pe-3 ps-1 sm:flex">
            <ProgressRing
              value={percentWatched}
              size={28}
              stroke={4}
              label="התקדמות כוללת"
            />
            <p className="font-slate text-xs text-[var(--muted)]">
              <span className="text-[var(--text)]">
                {watchedCount}/{totalMovies}
              </span>{" "}
              · {percentWatched}%
            </p>
          </div>

          <button
            type="button"
            onClick={onUndo}
            disabled={!canUndo}
            aria-label="ביטול הפעולה האחרונה"
            className="flex items-center gap-1.5 rounded-lg border border-[var(--border)] px-2.5 py-2 text-xs font-medium text-[var(--text)] transition-colors hover:border-[var(--border-strong)] hover:bg-[var(--surface)] disabled:cursor-not-allowed disabled:text-[var(--muted)] disabled:opacity-45 disabled:hover:bg-transparent sm:px-3"
          >
            <Undo2 className="h-4 w-4" aria-hidden="true" />
            <span className="hidden md:inline">ביטול אחרון</span>
          </button>

          <SettingsMenu
            preferences={preferences}
            onOrderModeChange={onOrderModeChange}
            onIncludeSeriesChange={onIncludeSeriesChange}
            onReset={onReset}
          />
        </div>
      </div>

      <nav aria-label="ניווט בעמוד" className="border-t border-[var(--border)] lg:hidden">
        <ul className="no-scrollbar mx-auto flex max-w-[1240px] gap-1 overflow-x-auto px-3 py-1.5">
          {SECTION_LINKS.map((link) => (
            <li key={link.href} className="shrink-0">
              <a
                href={link.href}
                className="block rounded-md px-2.5 py-1.5 text-[11px] text-[var(--muted)] transition-colors hover:bg-white/[0.04] hover:text-[var(--text)]"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
