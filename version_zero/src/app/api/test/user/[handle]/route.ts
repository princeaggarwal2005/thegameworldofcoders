import { getuserInfo } from "@/lib/reality/codeforces/client";
import { NextResponse } from "next/server";

export async function GET(
    _request: Request,
    {params}: {params: Promise<{handle: string}>}
){
    try {
        const {handle} = await params;
        const user = await getuserInfo(handle);
        return NextResponse.json(user);
    } catch (err) {
        const message = err instanceof Error? err.message: "UNKNOWN ERROR";
        return NextResponse.json({error: message} , {status: 400});
    }
}