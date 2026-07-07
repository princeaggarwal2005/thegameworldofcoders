export function computeXp(rating: number , isUnrated: boolean): number {
    if(isUnrated) return 0;
    return rating;
}
