"use client";

import { useCallback, useMemo, useRef, useState } from "react";

import ComingSoon from "@/components/ComingSoon";
import ConnectionsSection from "@/components/ConnectionsSection";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import LazyKnowledgeSection from "@/components/LazyKnowledgeSection";
import NextUpCard from "@/components/NextUpCard";
import ProgressOverview from "@/components/ProgressOverview";
import Timeline from "@/components/Timeline";
import UndoToast, { type UndoNotice } from "@/components/UndoToast";
import WatchHistory from "@/components/WatchHistory";
import { CONNECTIONS, getUnlockedConnections } from "@/data/connections";
import { getMovieSummaryById, isTitleIncluded } from "@/data/movieCatalog";
import { useWatchProgress } from "@/hooks/useWatchProgress";

export default function HomePage() {
  const [undoNotice, setUndoNotice] = useState<UndoNotice | null>(null);
  const noticeIdRef = useRef(0);
  const {
    hydrated,
    today,
    progress,
    watchedSet,
    watchedIds,
    journal,
    preferences,
    titles,
    stats,
    canUndo,
    toggleWatched,
    toggleEpisode,
    completeNextMovie,
    updateJournal,
    undo,
    reset,
    setOrderMode,
    setIncludeSeries,
  } = useWatchProgress();

  const connections = useMemo(() => getUnlockedConnections(watchedSet), [watchedSet]);

  // Watched series stay stored while excluded, but their knowledge is hidden with them.
  const visibleWatchedIds = useMemo(
    () =>
      watchedIds.filter((id) => {
        const movie = getMovieSummaryById(id);
        return movie ? isTitleIncluded(movie, preferences.includeSeries) : false;
      }),
    [watchedIds, preferences.includeSeries],
  );

  const visibleIds = useMemo(() => new Set(titles.map((title) => title.id)), [titles]);

  const nextPosition = stats.nextTitle
    ? titles.findIndex((title) => title.id === stats.nextTitle?.id) + 1
    : 0;

  const notify = useCallback((message: string) => {
    noticeIdRef.current += 1;
    setUndoNotice({ id: noticeIdRef.current, message });
  }, []);

  const handleToggle = useCallback(
    (id: string) => {
      const movie = getMovieSummaryById(id);
      const wasWatched = watchedSet.has(id);
      toggleWatched(id);
      notify(
        movie
          ? wasWatched
            ? `${movie.title} הוסר מהרשימה שנצפתה`
            : `${movie.title} סומן כנצפה`
          : "ההתקדמות עודכנה",
      );
    },
    [notify, toggleWatched, watchedSet],
  );

  const handleToggleEpisode = useCallback(
    (id: string, episode: number) => {
      const movie = getMovieSummaryById(id);
      const wasWatched =
        watchedSet.has(id) || (progress.episodes[id]?.includes(episode) ?? false);
      toggleEpisode(id, episode);
      notify(
        `${movie?.title ?? "הסדרה"} · פרק ${episode} ${wasWatched ? "סומן כלא נצפה" : "סומן כנצפה"}`,
      );
    },
    [notify, progress.episodes, toggleEpisode, watchedSet],
  );

  const handleCompleteNext = useCallback(() => {
    if (!stats.nextTitle) return;
    completeNextMovie();
    notify(
      stats.nextEpisode
        ? `${stats.nextTitle.title} · פרק ${stats.nextEpisode} סומן כנצפה`
        : `${stats.nextTitle.title} סומן כנצפה`,
    );
  }, [completeNextMovie, stats.nextTitle, stats.nextEpisode, notify]);

  const handleReset = useCallback(() => {
    reset();
    notify("ההתקדמות אופסה");
  }, [notify, reset]);

  const handleUndo = useCallback(() => {
    undo();
    setUndoNotice(null);
  }, [undo]);

  const dismissUndoNotice = useCallback(() => setUndoNotice(null), []);

  return (
    <div
      id="top"
      className={`min-h-screen transition-opacity duration-200 ${
        hydrated ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
      data-hydrated={hydrated}
      aria-busy={!hydrated}
    >
      <Header
        watchedCount={stats.watched}
        totalMovies={stats.total}
        percentWatched={stats.percent}
        canUndo={canUndo}
        preferences={preferences}
        onUndo={handleUndo}
        onReset={handleReset}
        onOrderModeChange={setOrderMode}
        onIncludeSeriesChange={setIncludeSeries}
      />

      <main>
        <Hero
          preferences={preferences}
          watchedCount={stats.watched}
          totalMovies={stats.total}
          percentWatched={stats.percent}
          nextUp={
            <NextUpCard
              movie={stats.nextTitle}
              nextEpisode={stats.nextEpisode}
              watchedEpisodes={
                stats.nextTitle ? (progress.episodes[stats.nextTitle.id] ?? []) : []
              }
              queue={stats.queue}
              position={nextPosition}
              totalMovies={stats.total}
              orderMode={preferences.orderMode}
              onComplete={handleCompleteNext}
              onCompleteTitle={handleToggle}
              onToggleEpisode={handleToggleEpisode}
            />
          }
        />

        <ProgressOverview stats={stats} includeSeries={preferences.includeSeries} />

        <ComingSoon titles={stats.unreleased} today={today} />

        <WatchHistory
          progress={progress}
          journal={journal}
          visibleIds={visibleIds}
          watchedMinutes={stats.watchedMinutes}
          today={today}
        />

        <LazyKnowledgeSection
          watchedIds={visibleWatchedIds}
          watchedAt={progress.watchedAt}
          journal={journal}
          onJournalChange={updateJournal}
        />

        <ConnectionsSection
          connections={connections}
          lockedCount={CONNECTIONS.length - connections.length}
        />

        <Timeline
          movies={titles}
          watchedIds={watchedSet}
          episodes={progress.episodes}
          today={today}
          nextMovieId={stats.nextTitle?.id}
          orderMode={preferences.orderMode}
          includeSeries={preferences.includeSeries}
          onOrderModeChange={setOrderMode}
          onToggle={handleToggle}
          onToggleEpisode={handleToggleEpisode}
        />
      </main>

      {!hydrated ? (
        <p className="sr-only" role="status">
          טוען את התקדמות הצפייה…
        </p>
      ) : null}

      <footer className="border-t border-[var(--border)]">
        <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-2 px-4 py-8 text-xs text-[var(--muted)] sm:px-6">
          <p>ההתקדמות וההגדרות נשמרות במכשיר הזה בלבד.</p>
          <p className="font-slate">MCU Watch Tracker</p>
        </div>
      </footer>

      <UndoToast notice={undoNotice} onDismiss={dismissUndoNotice} onUndo={handleUndo} />
    </div>
  );
}
