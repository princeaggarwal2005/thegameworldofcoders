//all cf specific interpretation lives here, get data drom cf (client.ts) and convert into game stats

import type { CfUser , NormalizedCfUser } from "@/types/codeforces";
/**
 * CF omits rating for unrated users, or sets rank to "unrated".
 * We collapse that into one boolean the game engine understands.
 */
function checkIsUnrated(user: CfUser): boolean{
    if(user.rating === undefined || user.rating === null){
        return true;
    }
    if(user.rank === "unrated") return true;
    return false;
}
/**
 * Turn raw CF user.info into a predictable shape, get necessary data
 * Game layer should *ONLY* receive NormalizedCfUser, never CfUser.
 */
export function NormalizeUser(raw : CfUser): NormalizedCfUser{
    const isUnrated = checkIsUnrated(raw);
    
    return {
        handle : raw.handle,
        rating : isUnrated? 0 : raw.rating!, // ! to tell ts that i know this exists, so dw
        maxRating: raw.maxRating??0,
        rank : raw.rank ?? "unrated",
        isUnrated,
    };
}
