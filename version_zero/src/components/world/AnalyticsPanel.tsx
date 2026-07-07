import type { PlayerAnalytics } from "@/types/player";

type Props = {
  analytics: PlayerAnalytics;
  rating: number;
};

export default function AnalyticsPanel({ analytics, rating }: Props) {
  const maxRating =
    analytics.ratingGraph.length > 0
      ? Math.max(...analytics.ratingGraph.map((p) => p.rating))
      : rating;

  return (
    <section className="rounded-4xl border border-white/10 bg-slate-900/70 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
      <p className="text-sm font-semibold uppercase tracking-[0.35em] text-amber-300/90">
        Analytics
      </p>
      <h2 className="mt-2 text-2xl font-black text-white">Your Progress</h2>

      <dl className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card label="Current Rating" value={String(rating)} />
        <Card label="Max Rating" value={String(maxRating)} />
        <Card label="Contests" value={String(analytics.contestsPlayed)} />
        <Card label="Solved" value={String(analytics.problemsSolved)} />
      </dl>

      <TagGroup title="Strongest" tags={analytics.strongestTags} />
      <TagGroup title="Weakest" tags={analytics.weakestTags} />
    </section>
  );
}

function Card({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-4">
      <dt className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
        {label}
      </dt>
      <dd className="mt-2 text-xl font-bold text-white">{value}</dd>
    </div>
  );
}

function TagGroup({ title, tags }: { title: string; tags: string[] }) {
  if (tags.length === 0) return null;

  return (
    <div className="mt-6">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
        {title}
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-white/10 bg-slate-950/50 px-3 py-1 text-sm text-slate-300"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
