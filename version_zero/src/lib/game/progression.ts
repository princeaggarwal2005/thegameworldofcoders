import type { PlayerProgression } from "@/types/player";
import { computeXp } from "./xp";
import { resolveArena } from "./arena";
import { resolveTitle } from "./title";

// this function gets rating and gives out and gives
// game progression - arena,title, xp , rating
export function resolveProgression(
    rating: number,
    isUnrated: boolean
): PlayerProgression{
    const xp = computeXp(rating , isUnrated);
    const title = resolveTitle(rating , isUnrated);
    const arena = resolveArena(xp , isUnrated);
    return {rating , xp , isUnrated , title , arena};
}