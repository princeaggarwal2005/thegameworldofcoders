import type { CfSubmission } from "@/types/codeforces";

export type TagStats = {
    tag: string;
    solved: number;
    total: number;
};

// attempts + solves

export function computeTagStats(submissions: CfSubmission[])
: TagStats[]{
    const stats = new Map<string ,{solved:number ; total: number}>();

    for(const sub of submissions){
        const tags = sub.problem.tags ?? [];

        for(const tag of tags){
            const current = stats.get(tag) ?? {solved:0 , total:0};

            current.total +=1;
            if(sub.verdict === "OK"){
                current.solved+=1;
            }
            stats.set(tag , current);
        }
    }
    return Array.from(stats.entries()).map(([tag , {solved , total}]) => ({
        tag , 
        solved , 
        total
    }));
}

export function getStrongestTags(tagStats: TagStats[] , n = 3): string[]{
    return tagStats
    .filter((t) => t.total >= 3)
    .sort((a , b) => b.solved / b.total - a.solved/a.total)
    .slice(0 , n)
    .map((t) => t.tag);
}   

export function getWeakestTags(tagStats: TagStats[], n = 3): string[]{
    return tagStats
    .filter((t) => t.total >= 3)
    .sort((a , b) => a.solved/a.total - b.solved/b.total)
    .slice(0 , n)
    .map((t) => t.tag);
}