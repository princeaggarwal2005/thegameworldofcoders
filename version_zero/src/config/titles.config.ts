export type TitleTier = {
    tier: number,
    minRating : number,
    maxRating: number,
    name: string
}
export const TITLE_TIERS: TitleTier[] = [
    { tier: 1, minRating: 0,    maxRating: 1199, name: "Commoner" },
    { tier: 2, minRating: 1200, maxRating: 1399, name: "Scout" },
    { tier: 3, minRating: 1400, maxRating: 1599, name: "Warrior" },
    { tier: 4, minRating: 1600, maxRating: 1899, name: "Knight" },
    { tier: 5, minRating: 1900, maxRating: 2099, name: "Commander" },
    { tier: 6, minRating: 2100, maxRating: 2299, name: "Royal Guard" },
    { tier: 7, minRating: 2300, maxRating: 2399, name: "Champion" },
    { tier: 8, minRating: 2400, maxRating: Infinity, name: "Monarch" },
];