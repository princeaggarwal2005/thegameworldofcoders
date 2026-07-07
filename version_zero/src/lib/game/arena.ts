import { ARENA_TIERS , type ArenaTier } from "@/config/arenas.config";

export function resolveArena(xp : number , isUnrated: boolean): ArenaTier {
    if(isUnrated) return ARENA_TIERS[0];

    return (
        ARENA_TIERS.find(
            (a) => xp >= a.minXp && xp <= a.maxXp
        )?? ARENA_TIERS[0]
    );
}