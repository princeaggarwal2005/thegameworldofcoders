// Shape of every Codeforces API response wrapper
export type CfApiResponse<T> = {
    status: "OK" | "FAILED";
    result?: T;
    comment?: string;
};
  
// Raw user object from CF user.info — fields may be missing
export type CfUser = {
handle: string;
rating?: number;
maxRating?: number;
rank?: string;
contribution?: number;
friendOfCount?: number;
};

// Clean user object our app uses — always has rating + isUnrated
export type NormalizedCfUser = {
handle: string;
rating: number;       // 0 if unrated
maxRating: number;    // 0 if never rated
rank: string;         // CF official rank label, e.g. "newbie", "unrated"
isUnrated: boolean;
};

// One rating change after a contest
export type CfRatingChange = {
    contestId: number;
    contestName: string;
    handle: string;
    rank: string;
    ratingUpdateTimeSeconds: number;
    oldRating: number;
    newRating: number;
  };
  
  // One submission attempt
  export type CfSubmission = {
    id: number;
    contestId: number;
    creationTimeSeconds: number;
    verdict?: string; // "OK" = accepted
    problem: {
      contestId: number;
      index: string;
      name: string;
      rating?: number;
      tags?: string[];
    };
  };