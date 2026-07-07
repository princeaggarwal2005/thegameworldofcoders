import { TITLE_TIERS , type TitleTier } from "@/config/titles.config";
export function resolveTitle(rating: number , isUnrated: boolean): TitleTier{
    if(isUnrated) return TITLE_TIERS[0];
    return (
        TITLE_TIERS.find(
            (t) => rating >= t.minRating && rating <= t.maxRating
        ) ?? TITLE_TIERS[0]
    );
}