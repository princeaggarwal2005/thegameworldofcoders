// this file talks to codeforces and get data from there 
import type { CfApiResponse , CfUser } from "@/types/codeforces";
import type { CfRatingChange, CfSubmission } from "@/types/codeforces";
const CF_API_BASE = "https://codeforces.com/api";
//fetchCF generates and fetch any request u want - inputs: method ( get, post... , params)
import { unstable_cache } from "next/cache";
import type { CfRatedUser } from "@/types/codeforces";
const RATED_LIST_TTL = 21600;

export async function fetchCf<T>(
    method: string,
    params: Record<string , string> = {}
): Promise<T> {
    const query = new URLSearchParams(params).toString();
    const url = `${CF_API_BASE}/${method}${query?`?${query}`:""}`;

    const res = await fetch(url , {
        next: { revalidate: 300},   //next js catches for 5 min
    });

    if(!res.ok){
        throw new Error(`CF HTTP error: ${res.status}`);
    }
    const data: CfApiResponse<T> = await res.json();
    if(data.status == "FAILED"){
        throw new Error(data.comment ?? "Codeforces Api Failed");
    }
    if(data.result == undefined){
        throw new Error("Codeforces Api returned no result");
    }
    return data.result;
}

export async function getuserInfo(handle: string): Promise<CfUser> {
    const users = await fetchCf<CfUser[]> ("user.info" , {
        handles: handle.trim()
    });
    const user = users[0];
    if(!user){
        throw new Error(`Handle not found: ${handle}`);
    } 
    return user;
}

/** Rating history — one entry per contest → powers the rating graph */

export async function getUserRating(handle: string): Promise<CfRatingChange[]>{
    return fetchCf<CfRatingChange[]>("user.rating", {
        handle: handle.trim()
    });
}

/**
 * All submissions — can be 10k+ for active users.
 * CF paginates with from (1-based) and count (max 10000).
 */
export async function getUserStatus(handle: string): Promise<CfSubmission[]> {
    const all: CfSubmission[] = [];
    let from = 1;
    const PAGE_SIZE = 10000;
    while(true){
        const batch = await fetchCf<CfSubmission[]>("user.status", {
            handle: handle.trim(),
            from: String(from),
            count: String(PAGE_SIZE)
        })
        all.push(...batch);
        if(batch.length < PAGE_SIZE ) break;
        from += PAGE_SIZE;
    };
    return all;
}
export const getRatedList = unstable_cache(
    async (): Promise<CfRatedUser[]> => {
      const url = `${CF_API_BASE}/user.ratedList?activeOnly=true`;
      const res = await fetch(url, { next: { revalidate: RATED_LIST_TTL } });
      if (!res.ok) throw new Error(`CF HTTP error: ${res.status}`);
      const data = await res.json();
      if (data.status === "FAILED") {
        throw new Error(data.comment ?? "Codeforces API failed");
      }
      // Strip 600k full user objects → only what ranking math needs
      const minimal: CfRatedUser[] = data.result.map(
        (u: { handle: string; rating?: number }) => ({
          handle: u.handle,
          rating: u.rating ?? 0,
        })
      );
      // Sort once here — every player request reuses this sorted array
      return minimal.sort((a, b) => b.rating - a.rating);
    },
    ["cf-rated-list-active"], // cache key — bump string if logic changes
    { revalidate: RATED_LIST_TTL }
  );
