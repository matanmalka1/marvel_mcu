"use client";

import { RotateCcw, Settings2, Tv } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";

import SegmentedControl from "@/components/SegmentedControl";
import type { OrderMode, ViewPreferences } from "@/types/movie";

type SettingsMenuProps = {
  preferences: ViewPreferences;
  onOrderModeChange: (mode: OrderMode) => void;
  onIncludeSeriesChange: (include: boolean) => void;
  onReset: () => void;
};

const ORDER_OPTIONS = [
  { value: "timeline", label: "כרונולוגי" },
  { value: "release", label: "סדר יציאה" },
] as const;

export default function SettingsMenu({
  preferences,
  onOrderModeChange,
  onIncludeSeriesChange,
  onReset,
}: SettingsMenuProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();
  const switchId = useId();

  useEffect(() => {
    if (!open) return;
    const handlePointer = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const handleKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      triggerRef.current?.focus();
    };
    document.addEventListener("pointerdown", handlePointer);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("pointerdown", handlePointer);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label="הגדרות צפייה"
        className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-2 text-xs font-medium transition-colors sm:px-3 ${
          open
            ? "border-[var(--accent)]/60 bg-[var(--accent)]/10 text-[var(--text)]"
            : "border-[var(--border)] text-[var(--text)] hover:border-[var(--border-strong)] hover:bg-[var(--surface)]"
        }`}
      >
        <Settings2 className="h-4 w-4" aria-hidden="true" />
        <span className="hidden md:inline">הגדרות</span>
      </button>

      {open ? (
        <div
          id={panelId}
          role="region"
          aria-label="הגדרות צפייה"
          className="glass animate-rise-in absolute end-0 top-[calc(100%+0.5rem)] z-50 w-[min(20rem,calc(100vw-2rem))] rounded-2xl border border-[var(--border-strong)] p-4 shadow-2xl"
        >
          <p className="text-[11px] font-medium text-[var(--muted)]">סדר הצפייה</p>
          <div className="mt-2">
            <SegmentedControl
              label="סדר הצפייה"
              value={preferences.orderMode}
              options={ORDER_OPTIONS}
              onChange={onOrderModeChange}
            />
          </div>
          <p className="mt-2 text-[11px] leading-relaxed text-[var(--muted)]">
            קובע גם מה יופיע ככותר הבא לצפייה.
          </p>

          <div className="mt-4 flex items-start justify-between gap-3 border-t border-[var(--border)] pt-4">
            <label htmlFor={switchId} className="cursor-pointer">
              <span className="flex items-center gap-1.5 text-sm font-medium">
                <Tv className="h-4 w-4 text-[var(--series)]" aria-hidden="true" />
                כולל סדרות Disney+
              </span>
              <span className="mt-1 block text-[11px] leading-relaxed text-[var(--muted)]">
                סדרות וספיישלים נכנסים לציר הזמן ולחישוב ההתקדמות.
              </span>
            </label>
            <button
              id={switchId}
              type="button"
              role="switch"
              aria-checked={preferences.includeSeries}
              onClick={() => onIncludeSeriesChange(!preferences.includeSeries)}
              className={`relative mt-0.5 h-6 w-11 shrink-0 rounded-full border transition-colors ${
                preferences.includeSeries
                  ? "border-[var(--series)]/60 bg-[var(--series)]/70"
                  : "border-[var(--border-strong)] bg-white/[0.06]"
              }`}
            >
              <span
                aria-hidden="true"
                className={`absolute top-0.5 h-[18px] w-[18px] rounded-full bg-white shadow transition-[inset-inline-start] ${
                  preferences.includeSeries ? "start-[22px]" : "start-0.5"
                }`}
              />
            </button>
          </div>

          <button
            type="button"
            onClick={() => {
              onReset();
              setOpen(false);
            }}
            className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-lg border border-[var(--border)] px-3 py-2 text-xs text-[var(--muted)] transition-colors hover:border-[var(--accent)]/50 hover:text-[var(--text)]"
          >
            <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
            איפוס כל ההתקדמות
          </button>
        </div>
      ) : null}
    </div>
  );
}
