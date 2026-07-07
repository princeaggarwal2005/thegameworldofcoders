import type { PlayerViewModel } from "@/types/player";
import { resolveProgression } from "@/lib/game/progression";
import { buildHeatMap } from "../analytics/heatmap";
import { buildRatingGraph } from "../analytics/ratingGraph";
import { computeTagStats, 
    getStrongestTags , 
    getWeakestTags 
} from "../analytics/tags";

import { countContests, countSolvedProblems } from "../analytics/stats";

import { getUserRating , getuserInfo , getUserStatus} from "../codeforces/client";

import { NormalizeUser } from "../codeforces/normalise";

/**
 * Full player sync — the main pipeline for v0.
 *
 * Called by GET /api/player/[handle] (Step 6f).
 * Returns ONE object the entire world page will render.
 */

export async function syncPlayer(handle: string): 
Promise<PlayerViewModel> {
    const [rawUser , ratingHistory , submissions] = await Promise.all(
        [
            getuserInfo(handle),
            getUserRating(handle),
            getUserStatus(handle),
        ]
    )
    const user = NormalizeUser(rawUser);
    const progression = resolveProgression(user.rating , user.isUnrated);
    const tagStats = computeTagStats(submissions);

    return {
        handle: user.handle,
        cfRank: user.rank,
        progression,
        analytics: {
            globalRank: user.rank,
            contestsPlayed: countContests(ratingHistory),
            problemsSolved: countSolvedProblems(submissions),
            ratingGraph: buildRatingGraph(ratingHistory),
            heatmap: buildHeatMap(submissions),
            strongestTags: getStrongestTags(tagStats),
            weakestTags: getWeakestTags(tagStats)
        },
        syncedAt: new Date().toISOString(),
    };
}