import type { CfRatingChange, CfSubmission } from "@/types/codeforces";

//count unique ac probs ( contest id and index)

export function countSolvedProblems(submission: CfSubmission[]): number {
    const solved = new Set<string>();

    for(const sub of submission){
        if(sub.verdict === "OK"){
            const key = `${sub.problem.contestId} - ${sub.problem.index}`;
            solved.add(key);
        }
    }
    return solved.size;
}

//rating changed == contest given
export function countContests(ratingHistory: CfRatingChange[]): number{
    return ratingHistory.length;
}

