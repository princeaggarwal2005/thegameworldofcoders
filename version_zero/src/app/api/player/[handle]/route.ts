import { syncPlayer } from "@/lib/reality/sync/syncPlayer";
import { NextResponse } from "next/server";

/**
 * Main v0 API endpoint.
 *
 * GET /api/player/tourist
 *   → fetches CF data, runs analytics + game engine
 *   → returns PlayerViewModel JSON
 *
 * The world page will fetch this URL once and render everything.
 */

export async function GET(
    _request: Request,
    context: {params: Promise<{handle: string}>}
) {
    try {
        // Next.js 15+: params is a Promise — must await it
        const {handle} = await context.params;
        // all heavy player syncplayer
        const player = await syncPlayer(handle);

        return NextResponse.json(player);
    } catch (err) {
        const message = err instanceof Error? err.message: "Unknown Error";
        return NextResponse.json({error:message} , {status: 400});
    }
}