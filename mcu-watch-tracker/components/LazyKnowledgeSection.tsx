"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const KnowledgeSection = dynamic(() => import("@/components/KnowledgeSection"), {
  loading: () => (
    <p className="mx-auto max-w-[1240px] px-4 py-14 text-sm text-[var(--muted)] sm:px-6">
      טוען את הידע שצברת…
    </p>
  ),
});

export default function LazyKnowledgeSection({
  watchedIds,
}: {
  watchedIds: readonly string[];
}) {
  const anchorRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const hasWatched = watchedIds.length > 0;

  useEffect(() => {
    if (!hasWatched || shouldLoad) return;
    const anchor = anchorRef.current;
    if (!anchor) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShouldLoad(true);
        observer.disconnect();
      },
      { rootMargin: "300px" },
    );
    observer.observe(anchor);
    return () => observer.disconnect();
  }, [shouldLoad, hasWatched]);

  if (watchedIds.length === 0) {
    return (
      <section
        id="knowledge"
        aria-labelledby="knowledge-heading"
        className="mx-auto max-w-[1240px] px-4 py-14 sm:px-6"
      >
        <p className="font-slate text-[11px] uppercase tracking-[0.3em] text-[var(--accent-soft)]">
          Knowledge
        </p>
        <h2
          id="knowledge-heading"
          className="font-display mt-2 text-2xl font-bold sm:text-3xl"
        >
          מה הבנת עד עכשיו
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--muted)]">
          רק ממה שכבר צפית בו. שום דבר כאן לא חושף מה קורה בהמשך.
        </p>
        <p className="mt-8 rounded-2xl border border-dashed border-[var(--border)] p-8 text-center text-sm text-[var(--muted)]">
          עדיין לא סימנת צפייה. סמן את הכותר הראשון בציר הזמן וההסבר יופיע כאן.
        </p>
      </section>
    );
  }

  return (
    <div ref={anchorRef} id="knowledge">
      {shouldLoad ? (
        <KnowledgeSection watchedIds={watchedIds} />
      ) : (
        <div
          className="mx-auto min-h-48 max-w-[1240px] px-4 py-14 sm:px-6"
          aria-hidden="true"
        />
      )}
    </div>
  );
}
