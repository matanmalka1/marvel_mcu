"use client";

type Option<T extends string> = { value: T; label: string };

/** Pill-style single choice, exposed as a group of toggle buttons. */
export default function SegmentedControl<T extends string>({
  label,
  value,
  options,
  onChange,
  size = "md",
}: {
  label: string;
  value: T;
  options: readonly Option<T>[];
  onChange: (value: T) => void;
  size?: "sm" | "md";
}) {
  return (
    <div
      role="group"
      aria-label={label}
      className="inline-flex shrink-0 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-1"
    >
      {options.map((option) => {
        const selected = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={selected}
            onClick={() => onChange(option.value)}
            className={`whitespace-nowrap rounded-lg font-medium transition-all ${
              size === "sm" ? "px-2.5 py-1 text-[11px]" : "px-3 py-1.5 text-xs"
            } ${
              selected
                ? "bg-[var(--accent)] text-white shadow-[0_4px_16px_-6px_rgba(229,18,46,0.8)]"
                : "text-[var(--muted)] hover:bg-white/[0.04] hover:text-[var(--text)]"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
