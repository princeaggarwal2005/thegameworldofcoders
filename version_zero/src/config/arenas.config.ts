export type ArenaTier = {
    tier: number;
    minXp: number;
    maxXp: number;
    name: string;
    mapOrder: number; // 1 = bottom of tower, 8 = top
  };
  
  export const ARENA_TIERS: ArenaTier[] = [
    { tier: 1, minXp: 0,    maxXp: 1199, name: "Base Camp",           mapOrder: 1 },
    { tier: 2, minXp: 1200, maxXp: 1399, name: "Training Grounds",    mapOrder: 2 },
    { tier: 3, minXp: 1400, maxXp: 1599, name: "Warrior's Keep",      mapOrder: 3 },
    { tier: 4, minXp: 1600, maxXp: 1899, name: "Knight's Hall",       mapOrder: 4 },
    { tier: 5, minXp: 1900, maxXp: 2099, name: "Command Fortress",    mapOrder: 5 },
    { tier: 6, minXp: 2100, maxXp: 2299, name: "Royal Bastion",       mapOrder: 6 },
    { tier: 7, minXp: 2300, maxXp: 2399, name: "Champion's Citadel",  mapOrder: 7 },
    { tier: 8, minXp: 2400, maxXp: Infinity, name: "Monarch's Gate",  mapOrder: 8 },
  ];