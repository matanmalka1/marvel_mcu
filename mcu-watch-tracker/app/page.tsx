"use client";

import { useMemo } from "react";

import ConnectionsSection from "@/components/ConnectionsSection";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import KnowledgeSection from "@/components/KnowledgeSection";
import NextUpCard from "@/components/NextUpCard";
import ProgressOverview from "@/components/ProgressOverview";
import Timeline from "@/components/Timeline";
import { getUnlockedConnections } from "@/data/connections";
import { MOVIES_IN_TIMELINE_ORDER } from "@/data/movies";
import { useWatchProgress } from "@/hooks/useWatchProgress";

export default function HomePage() {
  const {
    hydrated,
    watchedSet,
    watchedMovies,
    nextMovie,
    totalMovies,
    watchedCount,
    remainingCount,
    percentWatched,
    endgameWatched,
    endgameTotal,
    endgamePercent,
    canUndo,
    toggleWatched,
    completeNextMovie,
    undo,
    reset,
  } = useWatchProgress();

  const connections = useMemo(
    () => getUnlockedConnections(watchedSet),
    [watchedSet],
  );

  return (
    <div
      className={`min-h-screen transition-opacity duration-200 ${
        hydrated ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
      data-hydrated={hydrated}
      aria-busy={!hydrated}
    >
      <Header
        watchedCount={watchedCount}
        totalMovies={totalMovies}
        percentWatched={percentWatched}
        canUndo={canUndo}
        onUndo={undo}
        onReset={reset}
      />

      <main>
        <Hero
          nextUp={
            <NextUpCard
              movie={nextMovie}
              totalMovies={totalMovies}
              onComplete={completeNextMovie}
            />
          }
        />

        <ProgressOverview
          watchedCount={watchedCount}
          totalMovies={totalMovies}
          remainingCount={remainingCount}
          percentWatched={percentWatched}
          endgameWatched={endgameWatched}
          endgameTotal={endgameTotal}
          endgamePercent={endgamePercent}
        />

        <KnowledgeSection watchedMovies={watchedMovies} />

        <ConnectionsSection connections={connections} />

        <Timeline
          movies={MOVIES_IN_TIMELINE_ORDER}
          watchedIds={watchedSet}
          nextMovieId={nextMovie?.id ?? null}
          onToggle={toggleWatched}
        />
      </main>

      {!hydrated ? (
        <p className="sr-only" role="status">
          טוען את התקדמות הצפייה…
        </p>
      ) : null}

      <footer className="border-t border-[var(--border)]">
        <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-2 px-4 py-8 text-xs text-[var(--muted)] sm:px-6">
          <p>ההתקדמות נשמרת במכשיר הזה בלבד.</p>
          <p className="font-slate">MCU Watch Tracker</p>
        </div>
      </footer>
    </div>
  );
}
