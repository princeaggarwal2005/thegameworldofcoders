import { resolveProgression } from "../game/progression";
import type { PlayerProgression } from "@/types/player";
import { getuserInfo } from "./codeforces/client";
import { NormalizeUser } from "./codeforces/normalise";

// for v0:  CF handle → fetch → normalize → game engine

export async function getPlayerProgression(
    handle: string
): Promise<PlayerProgression & { handle:string; cfrank: string}> {
    // fetch data info
    const rawUser = await getuserInfo(handle);
    //normalize/clean it
    const user = NormalizeUser(rawUser);
    //resolve and find xp, arena etc.
    const progression = resolveProgression(user.rating , user.isUnrated);

    return {
        handle: user.handle,
        cfrank: user.rank,
        ...progression,
    };
}