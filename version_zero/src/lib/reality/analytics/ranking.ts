import type { ArenaTier } from "@/config/arenas.config";
import type { CfRatedUser } from "@/types/codeforces";

export type RankingResult = {
  arenaPopulation: number;
  worldRank: number | null;
  cfGlobalRank: number | null;
};

/**
 * Goal: pure array math on the pre-sorted cached ratedList.
 * No CF calls. O(n) filter + O(n) findIndex — fine on cached data.
 */
export function buildRankings(
  sortedRatedList: CfRatedUser[],
  arena: ArenaTier,
  handle: string,
  isUnrated: boolean
): RankingResult {
  if (isUnrated) {
    // Unrated players aren't in ratedList
    const inArena = sortedRatedList.filter(
      (u) => u.rating >= arena.minXp && u.rating <= arena.maxXp
    );
    return { arenaPopulation: inArena.length, worldRank: null, cfGlobalRank: null };
  }

  const handleLower = handle.toLowerCase();

  // CF global rank — list already sorted desc, so index = rank
  const cfGlobalRank =
    sortedRatedList.findIndex((u) => u.handle.toLowerCase() === handleLower) + 1;

  // Arena population — filter by XP band (v0: XP = rating)
  const inArena = sortedRatedList.filter(
    (u) => u.rating >= arena.minXp && u.rating <= arena.maxXp
  );

  // World rank — position within arena subset
  const worldRank =
    inArena.findIndex((u) => u.handle.toLowerCase() === handleLower) + 1;

  return {
    arenaPopulation: inArena.length,
    worldRank: worldRank > 0 ? worldRank : null,
    cfGlobalRank: cfGlobalRank > 0 ? cfGlobalRank : null,
  };
}