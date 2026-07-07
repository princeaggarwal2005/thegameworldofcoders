import { ARENA_TIERS } from "@/config/arenas.config";
import type { ArenaTier } from "@/config/arenas.config";

type Props = {
  currentArena: ArenaTier;
};

export default function WorldMap({ currentArena }: Props) {
  const forts = [...ARENA_TIERS].sort((a, b) => b.mapOrder - a.mapOrder);

  return (
    <section className="rounded-4xl border border-white/10 bg-slate-900/70 p-6 shadow-2xl backdrop-blur-xl">
      <p className="text-sm font-semibold uppercase tracking-[0.35em] text-amber-300/90">
        World Map
      </p>
      <h2 className="mt-2 text-2xl font-black text-white">Fort Progression</h2>

      <ul className="mt-5 space-y-2">
        {forts.map((fort) => {
          const isCurrent = fort.tier === currentArena.tier;
          const isLocked = fort.mapOrder > currentArena.mapOrder;

          return (
            <li
              key={fort.tier}
              className={[
                "flex items-center justify-between rounded-2xl border px-4 py-3 text-sm transition-all duration-200",
                isCurrent
                  ? "border-amber-400/40 bg-amber-400/15 text-white shadow-[0_0_0_1px_rgba(255,196,92,0.12)]"
                  : isLocked
                    ? "border-white/10 bg-slate-950/40 text-slate-500"
                    : "border-white/10 bg-slate-950/50 text-slate-300",
              ].join(" ")}
            >
              <span className="font-semibold">{fort.name}</span>
              <span className="text-xs uppercase tracking-[0.25em]">
                {isCurrent ? "Here" : isLocked ? "Locked" : "Passed"}
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
