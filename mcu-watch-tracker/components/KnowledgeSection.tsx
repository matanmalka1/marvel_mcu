import KnowledgeCard from "@/components/KnowledgeCard";
import type { Movie } from "@/types/movie";

export default function KnowledgeSection({
  watchedMovies,
}: {
  watchedMovies: Movie[];
}) {
  return (
    <section
      aria-labelledby="knowledge-heading"
      className="mx-auto max-w-[1240px] px-4 py-12 sm:px-6"
    >
      <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
        <div>
          <h2
            id="knowledge-heading"
            className="font-display text-2xl font-bold sm:text-3xl"
          >
            מה הבנת עד עכשיו
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--muted)]">
            רק מהסרטים שכבר צפית בהם. שום דבר כאן לא חושף מה קורה בהמשך.
          </p>
        </div>
        <p className="text-xs text-[var(--muted)]">
          {watchedMovies.length} סרטים
        </p>
      </div>

      {watchedMovies.length === 0 ? (
        <p className="mt-8 rounded-2xl border border-dashed border-[var(--border)] p-8 text-center text-sm text-[var(--muted)]">
          עדיין לא סימנת סרטים. סמן את הסרט הראשון בציר הזמן וההסבר יופיע כאן.
        </p>
      ) : (
        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          {watchedMovies.map((movie) => (
            <KnowledgeCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </section>
  );
}
