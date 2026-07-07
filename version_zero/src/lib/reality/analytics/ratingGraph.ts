import type { CfRatingChange } from "@/types/codeforces";
import type { RatingPoint } from "@/types/player";

//convert cf rating to chart points
// x axis = date, y axis = rating
export function buildRatingGraph(history: CfRatingChange[])
: RatingPoint[]{
    return history.map((entry) => ({
        // unix sec to millisec for js
        date: new Date(entry.ratingUpdateTimeSeconds*1000)
        .toDateString()
        .slice(0 , 10),
        rating: entry.newRating,
    })).sort((a , b) => a.date.localeCompare(b.date)); //old -> new   
}