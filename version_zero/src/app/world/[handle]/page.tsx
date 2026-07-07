import { syncPlayer } from "@/lib/reality/sync/syncPlayer";
 type WorldPageProps = {
    params: Promise<{handle: string}>
 }
 export default async function WorldPage({ params }: WorldPageProps) {
    const { handle } = await params;
    const decodedHandle = decodeURIComponent(handle);
    
    let player;
    try {
        player = await syncPlayer(decodedHandle);
    } catch (error) {
        const message = error instanceof Error ? error.message : "Something went wrong";
        return (
            <div className="flex flex-1 flex-col items-center justify-center bg-zinc-50 px-6 py-16">
              <main className="flex max-w-md flex-col items-center gap-4 text-center">
                <h1 className="text-xl font-bold text-red-600">Could not load player</h1>
                <p className="text-zinc-600">{message}</p>
                <a href="/" className="text-sm text-zinc-500 underline hover:text-zinc-800">
                  ← Back to landing
                </a>
              </main>
            </div>
          );
    }
    const {progression} = player;

    return (
        <div className="flex flex-1 flex-col items-center justify-center bg-zinc-50 px-6 py-16">
          <main className="flex max-w-md flex-col items-center gap-6 text-center">
            <div>
              <p className="text-sm uppercase tracking-widest text-zinc-500">World</p>
              <h1 className="text-3xl font-bold text-zinc-900">{player.handle}</h1>
              <p className="text-zinc-500">{player.cfRank}</p>
            </div>
            {/* Arena Hub preview — ugly plain text is fine for Step 8 */}
            <div className="flex w-full flex-col gap-2 rounded-lg border border-zinc-200 bg-white p-6 text-left">
              <p>
                <span className="font-medium">Title:</span> {progression.title.name}
              </p>
              <p>
                <span className="font-medium">Arena:</span> {progression.arena.name}
              </p>
              <p>
                <span className="font-medium">XP:</span> {progression.xp}
              </p>
              <p>
                <span className="font-medium">Rating:</span> {progression.rating}
                {progression.isUnrated && " (unrated)"}
              </p>
            </div>
            <p className="text-xs text-zinc-400">
              Synced at {new Date(player.syncedAt).toLocaleString()}
            </p>
            <a href="/" className="text-sm text-zinc-500 underline hover:text-zinc-800">
              ← Change handle
            </a>
          </main>
        </div>
      );
 }