import { Clapperboard, Film, Tv } from "lucide-react";

import { TITLE_KIND_LABELS } from "@/data/movieCatalog";
import type { MovieSummary } from "@/types/movie";

const KIND_ICONS = { movie: Film, series: Tv, special: Clapperboard } as const;

/** Film / series / special marker. Series also show their season. */
export default function KindBadge({
  movie,
  compact = false,
}: {
  movie: Pick<MovieSummary, "kind" | "season" | "animated">;
  compact?: boolean;
}) {
  const Icon = KIND_ICONS[movie.kind];
  const isMovie = movie.kind === "movie";
  const label =
    movie.kind === "series" && movie.season
      ? `${TITLE_KIND_LABELS.series} · עונה ${movie.season}`
      : TITLE_KIND_LABELS[movie.kind];

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-md border px-1.5 py-0.5 text-[10px] font-medium ${
        isMovie
          ? "border-[var(--border)] text-[var(--muted)]"
          : "border-[var(--series)]/35 bg-[var(--series)]/[0.08] text-[var(--series)]"
      }`}
    >
      <Icon className="h-3 w-3" aria-hidden="true" />
      {compact ? <span className="sr-only">{label}</span> : label}
      {movie.animated && !compact ? <span className="opacity-75">· אנימציה</span> : null}
    </span>
  );
}
