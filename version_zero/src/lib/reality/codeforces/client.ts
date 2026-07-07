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
  params: Record<string, string> = {},
  options: { cache?: RequestCache; revalidate?: number } = {},
): Promise<T> {
  const query = new URLSearchParams(params).toString();
  const url = `${CF_API_BASE}/${method}${query ? `?${query}` : ""}`;

  const fetchOptions: RequestInit =
    options.cache === "no-store"
      ? { cache: "no-store" }
      : { next: { revalidate: options.revalidate ?? 300 } };

  const res = await fetch(url, fetchOptions);

  if (!res.ok) {
    throw new Error(`CF HTTP error: ${res.status}`);
  }
  const data: CfApiResponse<T> = await res.json();
  if (data.status == "FAILED") {
    throw new Error(data.comment ?? "Codeforces Api Failed");
  }
  if (data.result == undefined) {
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
  while (true) {
    const batch = await fetchCf<CfSubmission[]>(
      "user.status",
      {
        handle: handle.trim(),
        from: String(from),
        count: String(PAGE_SIZE),
      },
      { cache: "no-store" }, // submissions can exceed 2MB for active users — Data Cache can't hold it
    );
    all.push(...batch);
    if (batch.length < PAGE_SIZE) break;
    from += PAGE_SIZE;
  }
  return all;
}

let ratedListCache: { data: CfRatedUser[]; expiresAt: number } | null = null;

export async function getRatedList(): Promise<CfRatedUser[]> {
  if (ratedListCache && ratedListCache.expiresAt > Date.now()) {
    return ratedListCache.data;
  }

  const url = `${CF_API_BASE}/user.ratedList?activeOnly=true`;
  // cache: "no-store" — bypass Next's Data Cache entirely, this payload doesn't fit it
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`CF HTTP error: ${res.status}`);
  const data = await res.json();
  if (data.status === "FAILED") {
    throw new Error(data.comment ?? "Codeforces API failed");
  }

  const minimal: CfRatedUser[] = data.result.map(
    (u: { handle: string; rating?: number }) => ({
      handle: u.handle,
      rating: u.rating ?? 0,
    }),
  );
  minimal.sort((a, b) => b.rating - a.rating);

  ratedListCache = {
    data: minimal,
    expiresAt: Date.now() + RATED_LIST_TTL * 1000,
  };
  return minimal;
}
