"use client";

import { Undo2, X } from "lucide-react";
import { useEffect } from "react";

export type UndoNotice = {
  /** Changes on every notice, so the entry animation and timer restart. */
  id: number;
  message: string;
};

type UndoToastProps = {
  notice: UndoNotice | null;
  onDismiss: () => void;
  onUndo: () => void;
};

const DISMISS_AFTER_MS = 5000;

export default function UndoToast({ notice, onDismiss, onUndo }: UndoToastProps) {
  useEffect(() => {
    if (!notice) return;
    const timeout = window.setTimeout(onDismiss, DISMISS_AFTER_MS);
    return () => window.clearTimeout(timeout);
  }, [notice, onDismiss]);

  if (!notice) return null;

  return (
    <div
      key={notice.id}
      role="status"
      className="glass animate-rise-in fixed inset-x-4 bottom-4 z-50 mx-auto flex max-w-md items-center gap-3 overflow-hidden rounded-2xl border border-[var(--border-strong)] p-3 shadow-2xl"
    >
      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-[var(--accent)]"
        style={{ animation: `toast-timer ${DISMISS_AFTER_MS}ms linear forwards` }}
      />
      <p className="min-w-0 flex-1 text-sm text-[var(--text)]">{notice.message}</p>
      <button
        type="button"
        onClick={onUndo}
        className="flex shrink-0 items-center gap-1.5 rounded-lg bg-[var(--accent)] px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-[var(--accent-soft)]"
      >
        <Undo2 className="h-3.5 w-3.5" aria-hidden="true" />
        ביטול
      </button>
      <button
        type="button"
        onClick={onDismiss}
        aria-label="סגירת ההודעה"
        className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-[var(--muted)] transition-colors hover:bg-[var(--surface)] hover:text-[var(--text)]"
      >
        <X className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  );
}
