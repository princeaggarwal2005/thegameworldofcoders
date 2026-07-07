import type { ArenaTier } from "@/config/arenas.config";

type Props = {
  population: number;
  arena: ArenaTier;
};

export default function PopulationPanel({ population, arena }: Props) {
  const formatted = population.toLocaleString();

  return (
    <section className="relative overflow-hidden rounded-4xl border border-white/10 bg-slate-900 p-6 shadow-2xl backdrop-blur-xl">
      <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-amber-400/20 blur-3xl" />

      <p className="text-sm font-semibold uppercase tracking-[0.35em] text-amber-300/90">
        World Pulse
      </p>
      <h2 className="mt-2 text-2xl font-black text-white">{arena.name}</h2>

      <div className="mt-5 flex items-center gap-2" aria-hidden="true">
        {Array.from({ length: 7 }).map((_, i) => (
          <span
            key={i}
            className="h-2.5 w-2.5 rounded-full bg-amber-300/70"
            style={{ opacity: 0.35 + i * 0.09 }}
          />
        ))}
        <span className="ml-1 text-sm text-slate-500">+ many more</span>
      </div>

      <p className="mt-6 text-5xl font-black tracking-tight text-white tabular-nums">
        {formatted}
      </p>
      <p className="mt-2 text-sm text-slate-400">
        warriors currently stand within this fort
      </p>

      <p className="mt-6 border-t border-white/10 pt-4 text-sm leading-7 text-slate-400">
        You are not climbing alone. Every solve pushes you forward alongside
        {formatted} rated Codeforces players in {arena.name}.
      </p>
    </section>
  );
}
