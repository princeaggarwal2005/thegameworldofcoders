import type { CfSubmission } from "@/types/codeforces";
import type { HeatmapDay } from "@/types/player";

// count = accepted per day

export function buildHeatMap(submissions: CfSubmission[]): HeatmapDay[]{
    const dayCounts = new Map<string  , number>();

    for(const sub of submissions){
        if(sub.verdict !== "OK") continue;
        const date = new Date(sub.creationTimeSeconds*1000)
        .toISOString().slice(0 , 10);
        dayCounts.set(date , (dayCounts.get(date) ?? 0) + 1);
    }
    
    return Array.from(dayCounts.entries())
    .map(([date , count]) => ({date , count}))
    .sort((a , b) => a.date.localeCompare(b.date));
}