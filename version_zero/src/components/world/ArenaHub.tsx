import type { PlayerProgression } from "@/types/player";

type Props = {
  handle: string;
  cfRank: string;
  progression: PlayerProgression;
};

export default function ArenaHub({ handle, cfRank, progression }: Props) {
  const { title, arena, xp, rating, isUnrated } = progression;

  return (
    <section className="rounded-4xl border border-white/10 bg-slate-900/70 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-amber-300/90">
            Arena Hub
          </p>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-white">
            {handle}
          </h2>
          <p className="mt-2 text-sm text-slate-400">{cfRank}</p>
        </div>

        <div className="rounded-2xl border border-amber-400/20 bg-amber-400/10 px-4 py-3 text-sm text-amber-200">
          <div className="font-semibold">Current Identity</div>
          <div className="mt-1 text-xs uppercase tracking-[0.25em] text-amber-300/80">
            {title.name} • {arena.name}
          </div>
        </div>
      </div>

      <dl className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat label="Title" value={title.name} />
        <Stat label="Arena" value={arena.name} />
        <Stat label="XP" value={String(xp)} />
        <Stat label="Rating" value={isUnrated ? "Unrated" : String(rating)} />
      </dl>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-4">
      <dt className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
        {label}
      </dt>
      <dd className="mt-2 text-lg font-bold text-white">{value}</dd>
    </div>
  );
}
