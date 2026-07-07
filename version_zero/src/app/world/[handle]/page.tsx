import { syncPlayer } from "@/lib/reality/sync/syncPlayer";
import ArenaHub from "@/components/world/ArenaHub";
import WorldMap from "@/components/world/WorldMap";
import AnalyticsPanel from "@/components/world/AnalyticsPanel";
import PopulationPanel from "@/components/world/PopulationPanel";

type WorldPageProps = {
  params: Promise<{ handle: string }>;
};

export default async function WorldPage({ params }: WorldPageProps) {
  const { handle } = await params;
  const decodedHandle = decodeURIComponent(handle);

  let player;
  try {
    player = await syncPlayer(decodedHandle);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Something went wrong";
    return (
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-16">
        <main className="flex max-w-md flex-col items-center gap-4 rounded-4xl border border-red-500/20 bg-slate-900/70 p-8 text-center shadow-2xl backdrop-blur-xl">
          <h1 className="text-xl font-bold text-red-400">
            Could not load player
          </h1>
          <p className="text-slate-300">{message}</p>
          <a
            href="/"
            className="text-sm text-slate-400 underline hover:text-white"
          >
            ← Back to landing
          </a>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col px-4 py-8 sm:px-6 lg:px-8">
      <main className="mx-auto flex w-full max-w-5xl flex-col gap-6">
        <section className="rounded-4xl border border-white/10 bg-slate-900/70 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-amber-300/90">
                World Entry
              </p>
              <h1 className="mt-2 text-3xl font-black tracking-tight text-white sm:text-4xl">
                Welcome back, {player.handle}
              </h1>
              <p className="mt-2 text-sm text-slate-400">
                Your path is unfolding inside the competitive world of
                Codeforces.
              </p>
            </div>

            <a
              href="/"
              className="text-sm font-medium text-slate-400 transition-colors hover:text-white"
            >
              ← Change handle
            </a>
          </div>
        </section>

        <ArenaHub
          handle={player.handle}
          cfRank={player.cfRank}
          progression={player.progression}
        />

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <WorldMap currentArena={player.progression.arena} />
          <PopulationPanel
            population={player.rankings.arenaPopulation}
            arena={player.progression.arena}
          />
        </div>

        <AnalyticsPanel
          analytics={player.analytics}
          rating={player.progression.rating}
        />

        <p className="text-center text-xs text-slate-500">
          Synced at {new Date(player.syncedAt).toLocaleString()}
        </p>
      </main>
    </div>
  );
}
