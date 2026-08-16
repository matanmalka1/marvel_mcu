"use client";

import Image from "next/image";
import { RotateCcw, Undo2 } from "lucide-react";

type HeaderProps = {
  watchedCount: number;
  totalMovies: number;
  percentWatched: number;
  canUndo: boolean;
  onUndo: () => void;
  onReset: () => void;
};

export default function Header({
  watchedCount,
  totalMovies,
  percentWatched,
  canUndo,
  onUndo,
  onReset,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[#07070a]/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1240px] items-center gap-3 px-4 sm:px-6">
        <div className="flex items-center gap-2.5">
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
            <p className="font-slate mt-1.5 text-[10px] uppercase leading-none tracking-[0.2em] text-[var(--muted)]">
              Chronological order
            </p>
          </div>
        </div>

        <div className="ms-auto flex items-center gap-2">
          <p className="font-slate hidden items-center gap-2 rounded-full border border-[var(--border)] px-3 py-1.5 text-xs text-[var(--muted)] sm:flex">
            <span className="text-[var(--text)]">
              {watchedCount}/{totalMovies}
            </span>
            <span aria-hidden="true" className="text-[var(--border-strong)]">
              ·
            </span>
            <span>{percentWatched}%</span>
          </p>

          <button
            type="button"
            onClick={onUndo}
            disabled={!canUndo}
            aria-label="ביטול הפעולה האחרונה"
            className="flex items-center gap-1.5 rounded-lg border border-[var(--border)] px-2.5 py-2 text-xs font-medium text-[var(--text)] transition-colors hover:border-[var(--border-strong)] hover:bg-[var(--surface)] disabled:cursor-not-allowed disabled:border-[var(--border)] disabled:text-[var(--muted)] disabled:opacity-45 disabled:hover:bg-transparent sm:px-3"
          >
            <Undo2 className="h-4 w-4" aria-hidden="true" />
            <span className="hidden md:inline">ביטול אחרון</span>
          </button>

          <button
            type="button"
            onClick={onReset}
            aria-label="איפוס להתקדמות הידועה"
            className="flex items-center gap-1.5 rounded-lg border border-[var(--border)] px-2.5 py-2 text-xs font-medium text-[var(--text)] transition-colors hover:border-[var(--border-strong)] hover:bg-[var(--surface)] sm:px-3"
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            <span className="hidden md:inline">איפוס</span>
          </button>
        </div>
      </div>
    </header>
  );
}
