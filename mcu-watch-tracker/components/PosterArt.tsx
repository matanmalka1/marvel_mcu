import { Clapperboard, Film, Tv } from "lucide-react";

import { phaseColor } from "@/lib/phase";
import type { MovieSummary } from "@/types/movie";

const KIND_ICONS = { movie: Film, series: Tv, special: Clapperboard } as const;

/** Stable 0–359 hue offset per title, so neighbouring posters don't look identical. */
function hueOf(id: string): number {
  let hash = 0;
  for (const char of id) hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  return hash % 360;
}

/** Drops leading articles and punctuation so the monogram reads well: "The Avengers" → "AV". */
function monogram(title: string): string {
  const words = title
    .replace(/[^A-Za-z0-9 ]/g, " ")
    .split(" ")
    .filter((word) => word && !/^(the|of|and|a|in)$/i.test(word));
  if (words.length === 0) return "?";
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}

type PosterArtProps = {
  movie: Pick<MovieSummary, "id" | "title" | "phase" | "kind" | "releaseYear" | "season">;
  size: "xs" | "sm" | "md" | "lg";
  /** Greys the art out, e.g. for unreleased titles. */
  muted?: boolean;
  className?: string;
};

const SIZE_CLASSES: Record<PosterArtProps["size"], string> = {
  xs: "w-8 rounded-md",
  sm: "w-12 rounded-lg",
  md: "w-24 rounded-xl",
  lg: "w-36 rounded-2xl sm:w-40",
};

/**
 * Generated key art in place of official posters (which would need a licensed image
 * source): phase-coloured gradient, monogram and slate details. Purely decorative.
 */
export default function PosterArt({
  movie,
  size,
  muted = false,
  className = "",
}: PosterArtProps) {
  const color = phaseColor(movie.phase);
  const hue = hueOf(movie.id);
  const Icon = KIND_ICONS[movie.kind];
  const detailed = size === "md" || size === "lg";

  return (
    <div
      aria-hidden="true"
      className={`relative aspect-[2/3] shrink-0 overflow-hidden border border-white/10 ${SIZE_CLASSES[size]} ${
        muted ? "opacity-60 grayscale-[60%]" : ""
      } ${className}`}
      style={{
        background: `radial-gradient(120% 80% at 30% 0%, ${color}cc, transparent 60%),
          radial-gradient(90% 70% at 100% 100%, hsl(${hue} 70% 35% / 0.85), transparent 65%),
          linear-gradient(160deg, #1a1a24, #07070a)`,
      }}
    >
      <div className="absolute inset-0 opacity-30 [background-image:repeating-linear-gradient(115deg,rgba(255,255,255,0.08)_0_1px,transparent_1px_9px)]" />
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/85 to-transparent" />

      <span
        className={`font-display absolute inset-x-0 text-center font-extrabold leading-none text-white/90 drop-shadow ${
          size === "xs"
            ? "top-1/2 -translate-y-1/2 text-[10px]"
            : size === "sm"
              ? "top-1/2 -translate-y-1/2 text-sm"
              : size === "md"
                ? "top-[30%] text-3xl"
                : "top-[28%] text-5xl"
        }`}
      >
        {monogram(movie.title)}
      </span>

      {detailed ? (
        <>
          <span className="absolute start-2 top-2 flex items-center gap-1 rounded bg-black/40 px-1.5 py-0.5 text-[9px] font-medium text-white/80 backdrop-blur-sm">
            <Icon className="h-2.5 w-2.5" />
            {movie.kind === "series" && movie.season ? `S${movie.season}` : "MCU"}
          </span>
          <div className="absolute inset-x-2 bottom-2">
            <p
              dir="ltr"
              className={`font-display line-clamp-2 font-bold leading-tight text-white ${
                size === "lg" ? "text-sm" : "text-[10px]"
              }`}
            >
              {movie.title}
            </p>
            <p className="font-slate mt-1 flex items-center gap-1 text-[9px] text-white/60">
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: color }}
              />
              P{movie.phase} · {movie.releaseYear}
            </p>
          </div>
        </>
      ) : null}
    </div>
  );
}
