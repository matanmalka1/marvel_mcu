"use client";

import { Star } from "lucide-react";

/** 1–5 stars as a radio group. Clicking the current rating clears it. */
export default function StarRating({
  label,
  value,
  onChange,
  size = "md",
}: {
  label: string;
  value: number | undefined;
  onChange?: (rating: number | undefined) => void;
  size?: "sm" | "md";
}) {
  const icon = size === "sm" ? "h-3.5 w-3.5" : "h-5 w-5";

  if (!onChange) {
    return (
      <span
        className="inline-flex items-center gap-0.5"
        aria-label={`${label}: ${value ?? 0} מתוך 5`}
      >
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            aria-hidden="true"
            className={`${icon} ${
              value && star <= value
                ? "fill-[var(--milestone)] text-[var(--milestone)]"
                : "text-white/15"
            }`}
          />
        ))}
      </span>
    );
  }

  return (
    <div
      role="radiogroup"
      aria-label={label}
      className="inline-flex items-center gap-0.5"
    >
      {[1, 2, 3, 4, 5].map((star) => {
        const active = !!value && star <= value;
        return (
          <button
            key={star}
            type="button"
            role="radio"
            aria-checked={value === star}
            aria-label={`${star} כוכבים`}
            onClick={() => onChange(value === star ? undefined : star)}
            className="rounded p-0.5 transition-transform hover:scale-110"
          >
            <Star
              aria-hidden="true"
              className={`${icon} transition-colors ${
                active
                  ? "fill-[var(--milestone)] text-[var(--milestone)]"
                  : "text-white/20 hover:text-[var(--milestone)]/70"
              }`}
            />
          </button>
        );
      })}
    </div>
  );
}
