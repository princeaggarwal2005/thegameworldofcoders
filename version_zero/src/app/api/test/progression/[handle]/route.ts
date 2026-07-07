import { getPlayerProgression } from "@/lib/reality/getPlayerProgression";
import { NextResponse } from "next/server";

export async function GET(
    _request: Request,
    {params}: {params: Promise<{handle:string}>}
) {
    try {
        const {handle} = await params;
        const result = await getPlayerProgression(handle);
        return NextResponse.json(result);
    } catch (err) {
        const msg = err instanceof Error ? err.message: "Unknown error";
        return NextResponse.json({error: msg}, { status: 400});
    }
    
}