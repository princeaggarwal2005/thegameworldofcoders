# THEGAMEWORLD — Development History

> **Purpose:** Onboarding doc for Prince + future AI chats. Read this **with** `PRD.md` before coding.  
> **Last updated:** 2026-07-07  
> **App code lives in:** `version_zero/` (Next.js)

---

## For new AI chats — read this first

1. **`PRD.md`** — product vision, v0 scope, title/arena rules, what's out of scope  
2. **This file** — what's built, what's next, how we work, key decisions  
3. **`version_zero/src/`** — actual code

**Teaching style (from Step 7 onward):** **Top-down**, not bottom-up.
- Start from **user moment** → what's needed on screen → build only that → drill down if missing
- Do **not** add `lib/` functions unless a screen needs them now
- Format: discuss subgoal → options → pick + why → resources → code with comments
- Max **2 functions per step** when building backend utilities

---

## Project layout

```
THEGAMEWORLD/
  PRD.md                    # Product spec (v0.3)
  DEVELOPMENT_HISTORY.md    # This file
  version_zero/               # Next.js app — all code here
    src/
      app/                    # Pages + API routes (Presentation + HTTP)
      config/                 # Title + arena threshold tables
      lib/
        game/                 # Layer 2 — title, arena, xp, progression
        reality/              # Layer 1 — CF API, normalize, analytics, sync
      types/                  # TypeScript shapes
```

**Run dev:** `cd version_zero && npm run dev`

---

## Architecture (3 layers)

```
Layer 1 — Reality     CF API → normalize → analytics
Layer 2 — Game        rating/xp → title, arena (config lookup)
Layer 3 — Presentation  React pages + components (IN PROGRESS)

Flow:
  GET /api/player/[handle]
    → syncPlayer(handle)
    → fetch CF (user.info, user.rating, user.status)
    → normalize + analytics + resolveProgression
    → PlayerViewModel JSON
```

---

## Key product decisions (may differ from PRD v0.3 text)

| Topic | Decision |
|-------|------------|
| **V0 platforms** | Codeforces only |
| **V0 auth** | None — any public handle |
| **Title (v0)** | From CF rating via `titles.config.ts` |
| **Arena (v0)** | From XP via `arenas.config.ts` (XP = rating in v0) |
| **Future title** | **XP-based, registered users only** (not raw CF rating) |
| **Future arena** | XP-based, possibly different thresholds than title |
| **Tags** | Come from `user.status` → `problem.tags` (no `problemset.problems` needed) |
| **Population / ranklists** | Not built yet (Step 10) |
| **Caching** | `fetchCf` uses `next: { revalidate: 300 }` — CF responses cached 5 min |

---

## Completed steps

### Step 1 — Scaffold
- Next.js in `version_zero/` (folder name lowercase for npm)
- `src/config`, `src/lib/reality`, `src/lib/game`, `src/types`

### Step 2 — Config tables
- `src/config/titles.config.ts` — 8 tiers, Commoner → Monarch
- `src/config/arenas.config.ts` — 8 forts, Base Camp → Monarch's Gate

### Step 3 — Game engine
- `xp.ts`, `title.ts`, `arena.ts`, `progression.ts`
- `resolveProgression(rating, isUnrated)` → title, arena, xp

### Step 4 — CF API client
- `src/lib/reality/codeforces/client.ts` — `fetchCf`, `getuserInfo`
- `src/types/codeforces.ts`
- Test route: `/api/test/user/[handle]`
- **Bug fixed:** URL needs `?` before query string

### Step 5 — Normalize + glue
- `normalise.ts` — `NormalizeUser`, `isUnrated` rules
- `getPlayerProgression.ts` — fetch → normalize → progression (superseded by syncPlayer)

### Step 6 — Full sync pipeline
- **client.ts:** `getUserRating`, `getUserStatus` (paginated, 10k batches)
- **analytics:** `stats.ts`, `ratingGraph.ts`, `heatmap.ts`, `tags.ts`
- **syncPlayer.ts** — orchestrator, `Promise.all` for 3 CF calls
- **API:** `GET /api/player/[handle]` → full `PlayerViewModel`
- **Skipped:** `problems.ts` / `problemset.problems` — tags are in `user.status`
- **Test routes still exist:** `/api/test/user/`, `/api/test/progression/` (can delete later)

---

## API reference (v0)

| Endpoint | Status |
|----------|--------|
| `GET /api/player/[handle]` | ✅ Main endpoint — use this for UI |
| `GET /api/test/user/[handle]` | ✅ Dev only — raw CF user.info |
| `GET /api/test/progression/[handle]` | ✅ Dev only — progression only, no analytics |

**CF methods used:**
- `user.info?handles=` — profile, rating, rank
- `user.rating?handle=` — contest history → rating graph
- `user.status?handle=&from=&count=` — submissions → heatmap, solved, tags

---

## Known small fixes (non-blocking)

- `progression.ts`: `resolveArena(xp, ...)` not `resolveArena(rating, ...)`
- `stats.ts`: use `for...of` not `for...in` on submissions array
- `ratingGraph.ts`: `toISOString().slice(0,10)` preferred over `toDateString().slice(0,10)` for dates
- Remove empty `problems.ts` and old test routes when cleaning up

---

## Remaining steps (top-down from here)

| Step | User moment | Build |
|------|-------------|-------|
| **7** | Type handle, click Enter World | Landing `page.tsx` → navigate to `/world/[handle]` |
| **8** | See my title, arena, XP (ugly OK) | World page shell + fetch `/api/player/[handle]` |
| **9** | Game-styled sections | Components: WorldMap, ArenaHub, AnalyticsPanel |
| **10** | "I'm not alone" | Population estimate + World Map Rank + CF Ranklist |
| **11** | Shareable live URL | Polish, errors, deploy Vercel |

**Not in v0:** auth, quests, animations, LeetCode, Postgres (later for registered-user XP + title)

---

## File map (what each file does)

| File | Job |
|------|-----|
| `lib/reality/codeforces/client.ts` | All CF HTTP calls |
| `lib/reality/codeforces/normalise.ts` | CfUser → NormalizedCfUser |
| `lib/reality/sync/syncPlayer.ts` | Full pipeline → PlayerViewModel |
| `lib/reality/analytics/*` | heatmap, graph, tags, stats |
| `lib/game/progression.ts` | Single entry to game engine |
| `app/api/player/[handle]/route.ts` | Main API |
| `types/player.ts` | PlayerViewModel, PlayerAnalytics, etc. |

---

## Prince's stack familiarity

Knows: Node/Express/Mongo, HTML/CSS/JS  
Learning: Next.js App Router, React, TypeScript, Tailwind, `fetch`, file-based API routes

---

## Git / deploy notes

- Repo should live at `THEGAMEWORLD/` root (includes PRD + `version_zero/`)
- Do **not** commit `version_zero/node_modules`, `.next`, `.env.local`
- Deploy: Vercel, root directory set to `version_zero`

---

## Changelog

| Date | Milestone |
|------|-----------|
| 2026-07-06 | PRD v0.3 locked |
| 2026-07-06 | Steps 1–5 — scaffold, config, game engine, CF client, normalize |
| 2026-07-07 | Step 6 — analytics + syncPlayer + `/api/player/[handle]` working |
| 2026-07-07 | Switched teaching to **top-down** from Step 7 |
| 2026-07-07 | Created this development history doc |
