"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const KnowledgeSection = dynamic(() => import("@/components/KnowledgeSection"), {
  loading: () => (
    <p className="mx-auto max-w-[1240px] px-4 py-12 text-sm text-[var(--muted)] sm:px-6">
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

  useEffect(() => {
    if (watchedIds.length === 0 || shouldLoad) return;
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
  }, [shouldLoad, watchedIds.length]);

  if (watchedIds.length === 0) {
    return (
      <section
        aria-labelledby="knowledge-heading"
        className="mx-auto max-w-[1240px] px-4 py-12 sm:px-6"
      >
        <h2 id="knowledge-heading" className="font-display text-2xl font-bold sm:text-3xl">
          מה הבנת עד עכשיו
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--muted)]">
          רק מהסרטים שכבר צפית בהם. שום דבר כאן לא חושף מה קורה בהמשך.
        </p>
        <p className="mt-8 rounded-2xl border border-dashed border-[var(--border)] p-8 text-center text-sm text-[var(--muted)]">
          עדיין לא סימנת סרטים. סמן את הסרט הראשון בציר הזמן וההסבר יופיע כאן.
        </p>
      </section>
    );
  }

  return (
    <div ref={anchorRef}>
      {shouldLoad ? (
        <KnowledgeSection watchedIds={watchedIds} />
      ) : (
        <div
          className="mx-auto min-h-48 max-w-[1240px] px-4 py-12 sm:px-6"
          aria-hidden="true"
        />
      )}
    </div>
  );
}
