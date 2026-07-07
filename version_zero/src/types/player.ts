import type { TitleTier } from "@/config/titles.config";
import type { ArenaTier } from "@/config/arenas.config";
export type PlayerProgression = {
    rating: number,
    xp: number,
    isUnrated : boolean,
    title: TitleTier,
    arena: ArenaTier
};

export type RatingPoint = {
    date:string;
    rating:number;
};

export type HeatmapDay = {
    date: string;
    count: number;
};

export type PlayerAnalytics = {
    globalRank: string;       // from user.info rank field
    contestsPlayed: number;
    problemsSolved: number;
    ratingGraph: RatingPoint[];
    heatmap: HeatmapDay[];
    strongestTags: string[];  // top 3
    weakestTags: string[];    // top 3
  };

  // THE one object the world page will fetch
export type PlayerViewModel = {
    handle: string;
    cfRank: string;
    progression: PlayerProgression;
    analytics: PlayerAnalytics;
    syncedAt: string;         // ISO timestamp of this sync
    rankings: PlayerRankings;
};

  export type PlayerRankings = {
    arenaPopulation: number;
    worldRank: number | null;
    cfGlobalRank: number | null;
  };
  
