# THEGAMEWORLD — Development History

> **Purpose:** Onboarding doc for Prince + future AI chats. Read this **with** `PRD.md` and `DESIGN_PHILOSOPHY.md` before coding.  
> **Last updated:** 2026-07-07  
> **App code lives in:** `version_zero/` (Next.js)

---

## For new AI chats — read this first

1. **`PRD.md`** — product vision, v0 scope, title/arena rules, what's out of scope  
2. **`DESIGN_PHILOSOPHY.md`** — how the world should feel, UI/animation/colour rules, inspiration sources, development philosophy  
3. **This file** — what's built, what's next, how we work, key decisions  
4. **`version_zero/src/`** — actual code

---

## How we build (top-down)

Planning always starts top-down. Implementation naturally becomes bottom-up.

**Before every feature, answer:**

1. What experience is the player supposed to have?
2. What screen are we building?
3. What data is required?
4. Which backend/API supports it?
5. What helper functions/types are required?

**For every implementation step:**

1. Explain **what** we are building  
2. Explain **why** we need it  
3. Explain possible alternatives  
4. Explain why the chosen approach is best  
5. Then implement with clear comments  

**Practical rules (from Step 7 onward):**

- Start from **user moment** → what's needed on screen → build only that → drill down if missing  
- Do **not** add `lib/` functions unless a screen needs them now  
- Max **2 functions per step** when building backend utilities  
- **Never optimize for writing more code** — optimize for making the project feel more alive  
- **One polished screen > ten unfinished pages** — prefer polish over scope when uncertain  

**Personal learning goal:** Every concept should answer — what problem existed, why this solution was invented, how it solves the problem, and how it appears in this project. The project is the classroom.

Full philosophy: `DESIGN_PHILOSOPHY.md`.

---

## Project layout

```
THEGAMEWORLD/
  PRD.md                    # Product spec (v0.3) — what to build
  DESIGN_PHILOSOPHY.md      # Design & dev philosophy — how it should feel
  DEVELOPMENT_HISTORY.md    # This file — what's built, what's next
  version_zero/             # Next.js app — all code here
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
Layer 3 — Presentation  React pages + components (Step 11 polish remaining)

Flow:
  GET /api/player/[handle]
    → syncPlayer(handle)
    → fetch CF (user.info, user.rating, user.status) + getRatedList (6h cache)
    → normalize + analytics + resolveProgression + buildRankings
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
| **Population** | `getRatedList` (6h cache) → `buildRankings` → `PopulationPanel` |
| **Ranklists UI** | Deferred — `worldRank`/`cfGlobalRank` computed in backend, leaderboard UI later |
| **Caching** | `fetchCf` = 5 min; `getRatedList` = 6h via `unstable_cache` (not `fetchCf`) |

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
- `user.ratedList?activeOnly=true` — arena population + ranks (6h cache)

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
| **7** | Type handle, click Enter World | Landing `page.tsx` → navigate to `/world/[handle]` | ✅ Done |
| **8** | See my title, arena, XP (ugly OK) | World page shell + `syncPlayer()` | ✅ Done |
| **9** | Game-styled sections | `ArenaHub`, `WorldMap`, `AnalyticsPanel` | ✅ Done |
| **10** | "I'm not alone" | `getRatedList` + `buildRankings` + `PopulationPanel` | ✅ Done |
| **11** | Shareable live URL | Polish, errors, deploy Vercel |

**UI north star (Step 11):** Backend provides data; frontend creates emotion. The player should feel they entered a world, not a stats site. See inspiration table in `DESIGN_PHILOSOPHY.md`.

**Not in v0:** auth, quests, animations, LeetCode, Postgres (later for registered-user XP + title)

---

## File map (what each file does)

| File | Job |
|------|-----|
| `lib/reality/codeforces/client.ts` | CF HTTP calls + `getRatedList` (6h cached) |
| `lib/reality/codeforces/normalise.ts` | CfUser → NormalizedCfUser |
| `lib/reality/sync/syncPlayer.ts` | Full pipeline → PlayerViewModel |
| `lib/reality/analytics/ranking.ts` | Arena population + world/CF rank from ratedList |
| `lib/reality/analytics/*` | heatmap, graph, tags, stats |
| `lib/game/progression.ts` | Single entry to game engine |
| `app/api/player/[handle]/route.ts` | Main API |
| `app/page.tsx` | Landing page |
| `components/EnterWorldForm.tsx` | Handle input → `/world/[handle]` |
| `app/world/[handle]/page.tsx` | World page — syncs player, composes UI |
| `components/world/ArenaHub.tsx` | Title, arena, XP, rating |
| `components/world/WorldMap.tsx` | Vertical fort tower, current/locked states |
| `components/world/AnalyticsPanel.tsx` | Stat cards + tag chips |
| `components/world/PopulationPanel.tsx` | Arena population count (game-styled) |
| `types/player.ts` | PlayerViewModel, PlayerRankings, etc. |

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
| 2026-07-07 | Added `DESIGN_PHILOSOPHY.md`; updated PRD + this file with UI/world/animation philosophy and top-down build process |
| 2026-07-07 | Step 7 — landing page + `EnterWorldForm` + `/world/[handle]` stub route |
| 2026-07-07 | Step 8 — world page shell, `syncPlayer()`, plain progression display |
| 2026-07-07 | Step 9 — `ArenaHub`, `WorldMap`, `AnalyticsPanel` on world page |
| 2026-07-07 | Step 10 — `getRatedList` (6h cache), `buildRankings`, `PopulationPanel`; ranklist UI deferred |
