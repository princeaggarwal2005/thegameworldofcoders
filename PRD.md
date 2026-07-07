# THEGAMEWORLD - Product Requirements Document (PRD)

> **Working Title:** THEGAMEWORLD  
> **Status:** Draft v0.3 — Ready for review  
> **Author:** Prince  
> **Purpose:** Define a common vision and roadmap so all contributors (human or AI) build towards the same product.

---

## V0 Quick Reference (review this first)

| What | V0 behavior |
|------|-------------|
| **Enter** | CF handle → Enter World → sync → one-page world |
| **Title** | From **CF rating** → Commoner … Monarch |
| **Arena** | From **XP** → Base Camp … Monarch's Gate (fort on map) |
| **XP** | `= CF rating` (0 if unrated) — V0 shortcut only |
| **V0 thresholds** | Title table == Arena table (same bands, 8 tiers) |
| **Unrated** | Commoner + Base Camp + XP 0 |
| **Population** | Global CF estimate in your arena band |
| **Rankings** | (1) World Map Rank — same arena (2) CF global ranklist |
| **Refresh** | Manual button; rating drop = title + arena + XP drop |
| **Not in V0** | Auth, quests, achievements, animations, other platforms |

---

# Vision

Create the world's most engaging home for Competitive Programming.

Instead of treating Codeforces, LeetCode, AtCoder and other competitive programming platforms as separate websites, players exist inside one persistent world where every real achievement shapes their in-game identity.

The project should make Competitive Programming feel alive, social, rewarding and accessible while remaining a genuinely useful analytics platform.

The long-term goal is to become the default home page for every competitive programmer.

---

# Product Philosophy

THEGAMEWORLD is **not** a game that teaches Competitive Programming.

THEGAMEWORLD is **not** another analytics dashboard.

Instead,

> **Real Competitive Programming drives everything inside the world.**

Players cannot progress by playing the game alone.

Every achievement inside the world must originate from real coding activity.

Examples:

- Solving problems
- Participating in contests
- Increasing ratings
- Maintaining streaks
- Completing platform-specific challenges

The game exists only as a visualization and motivation layer.

---

# Core Goals

## Primary Goal

Make people excited to come back every day and solve Competitive Programming problems.

---

## Secondary Goal

Provide better analytics than existing platforms.

---

## Tertiary Goal

Unify multiple Competitive Programming platforms into one persistent identity.

---

## Long-Term Goal

Become the "Steam" or "Discord" of Competitive Programming.

A place where programmers naturally spend time before and after coding.

---

# Design Principles

## 1. Reality Drives the World

Everything inside the world comes from real coding activity.

No fake grinding.

No artificial XP farms.

---

## 2. Game is a Presentation Layer

If all graphics disappear,

the application should still be a valuable Competitive Programming tool.

Graphics enhance the experience.

They do not replace functionality.

---

## 3. Fast Above Everything

The application should feel instant.

Goals:

- Extremely lightweight
- Smooth on low-end laptops
- Minimal GPU usage
- Fast page loads
- Responsive UI
- Mobile-friendly architecture (future)

Performance always wins over visual complexity.

---

## 4. Social by Design

Even when the application is used solo,

the world should feel alive.

Future multiplayer should feel like a natural extension rather than an additional feature.

---

## 5. Beginner Friendly

Competitive Programming feels intimidating.

THEGAMEWORLD should make it feel approachable.

Players should naturally discover concepts through exploration and progression.

---

# Target Audience

## Primary

Competitive Programmers

- Codeforces
- LeetCode
- AtCoder
- CSES
- CodeChef
- ICPC participants

---

## Secondary

College students beginning Competitive Programming.

---

## Future

School students discovering programming.

---

# Version 0 Goal

**Primary emotional goal:** After solving problems and doing contests on Codeforces, the user opens THEGAMEWORLD, hits Refresh, and thinks:

> *"Damn — I'm not alone. Thousands of people are grinding at my level too."*

**Functional goal:** Enter a Codeforces handle, land on a static 2D island world map, and see — in one screen — your **title**, your **arena (fort)**, your **XP**, how crowded your arena is globally, your analytics, and two ranking lists.

V0 is a **Codeforces API wrapper with a game-styled presentation layer**. No custom XP grind yet — but **title** and **arena** are modeled as separate concepts from day one.

---

# Version 0 — User Flow

```
Landing (CF handle input)
    → Click "Enter World"
    → Sync Codeforces data (first load + manual Refresh)
    → World Page (single static screen, no page navigation required)
```

### World Page layout (one pager)

| Zone | Content |
|------|---------|
| **World Map** | Static 2D island map. Tower / vertical arena layout inspired by Sword Art Online + Clash Royale. User's current arena highlighted. Future arenas visible but locked. No swipe (future: Candy Crush / Shadow Fight style multi-map scroll). |
| **Arena Population** | **Global** estimated count of Codeforces users in the user's current arena band. e.g. *"~3,241 in Knight's Hall"* — never THEGAMEWORLD signup count. |
| **Arena Hub** | **Title**, **Arena (fort name)**, **XP** only (see Progression Model) |
| **Analytics Panel** | Game-styled but readable stats (Codolio-inspired clarity) |
| **World Map Rank** | Handles in the same arena band as the user — "who's on the map with me" |
| **Codeforces Ranklist** | Standard CF global rating ranklist, as on codeforces.com |

### Interactions (V0)

- **Enter World** — fetch/sync CF data for handle
- **Refresh** — re-sync CF data for current handle (manual)
- **Change handle** — return to landing (or inline input; implementation choice)

No animations. No transitions required. Static UI is acceptable.

---

# Version 0 Scope

## Platform Support

Only **Codeforces**.

All other platforms are intentionally excluded until Phase 2.

---

## Identity Model (V0)

- **No login, no accounts, no auth**
- User enters any public Codeforces handle
- Anyone can view any public handle (same as existing CF stat sites)
- Optional: remember last handle in `localStorage` (nice-to-have, not blocking)
- Handle ownership verification → **Phase 1**

---

## Sync Model (V0)

| Trigger | Behavior |
|---------|----------|
| **Enter World** | Full sync: CF user info, rating, submissions (for analytics), rank |
| **Refresh button** | Re-fetch from CF API, update all displayed state |
| **Rate limit** | Max 1 manual refresh per handle per 5 minutes |
| **Midnight global refresh** | Deferred — cache population stats; add scheduled job in v0.5 |

Sync is **idempotent**. Refreshing without new CF activity changes nothing except timestamps.

---

## Progression Model — LOCKED

THEGAMEWORLD always has **two independent progression axes**:

| Axis | Driven by | What it represents | V0 source |
|------|-----------|-------------------|-----------|
| **Title** | **Rating** | Identity / rank — who you are (Commoner, Knight, Monarch) | Current CF rating |
| **Arena** | **XP** | Place on the map — which fort you stand in (Base Camp, Knight's Hall, …) | Current CF rating (= XP in V0) |

Think of it as: **Title = Monarch** (your rank). **Arena = Monarch's Gate** (your fort on the map).

```
Rating  ──→  Title   (identity)
XP      ──→  Arena   (map position)
```

### V0 simplification (intentional)

In V0, `XP = current CF rating`. Because both axes read the same number, **title thresholds and arena thresholds are identical** — same min/max bands, same tier count. You will always land in the matching fort for your title.

This is a **shipping shortcut**, not the final design. Config keeps **two separate tables** (`titles.config.ts`, `arenas.config.ts`) so they can diverge in Phase 1.5 without refactoring.

| Concept | V0 rule |
|---------|---------|
| **XP** | `XP = current CF rating` (integer). Displayed in Arena Hub. Drives arena lookup. |
| **Title** | Lookup from **Title Threshold Table** (Appendix A). Driven by **rating**. |
| **Arena** | Lookup from **Arena Threshold Table** (Appendix B). Driven by **XP**. Map zone / fort name. |
| **Level** | **Not a separate field.** Title *is* your level identity. No third number in Arena Hub. |

### Unrated users

No contest history on Codeforces:

| Field | Value |
|-------|-------|
| Title | Commoner |
| Arena | Base Camp |
| XP | `0` |

### Rating drops

If CF rating drops after a bad contest, **title, arena, and XP all move down**. V0 mirrors current rating honestly — no peak-rating freeze.

`maxRating` is shown in **analytics only**, not used for title or arena in V0.

### Future (post-V0) — dual-track fully active

| Axis | Source | Example |
|------|--------|---------|
| **Title** | Platform rating(s) across countries | 1800 CF + Expert LC → **Knight** |
| **Arena / XP** | Custom XP from solves, contests, streaks, cross-platform activity | High activity, moderate rating → **Frontier Outpost** while title stays **Warrior** |

Title and arena **will decouple**. Separate thresholds. That's why two config files exist from V0.

---

## Arena Population (V0)

**Critical:** Population counts must reflect the **global Codeforces community**, not just THEGAMEWORLD users.

Implementation:

1. Cache a **rating distribution histogram** (bucketed by arena bands) from CF public data
2. On render, show estimated count for user's arena band
3. Label clearly: *"~3,241 estimated from Codeforces community"*

Without global estimates, a new app shows "0 users" and kills the core emotional goal.

Refresh population cache: manual admin refresh in V0; scheduled midnight job in v0.5.

---

## Analytics (V0)

Game-styled presentation. Codolio-inspired readability — scannable cards, clear labels, no clutter.

### P0 — must ship

- Current rating + max rating
- Global CF rank
- Contests participated
- Problems solved (total)
- Rating graph (history)
- Activity heatmap
- Strongest tags (top 3)
- Weakest tags (top 3)

### P1 — ship if time allows

- Problems by rating (distribution)
- Problems by tag (full breakdown)
- Submission activity timeline
- Streak

---

## Ranking Lists (V0)

Two separate lists on the world page:

### 1. World Map Rank — "Users on the map"

Players in the **same arena band** as the current user.

| Property | Detail |
|----------|--------|
| Purpose | Reinforce *"I'm not alone — these people are in my fort"* |
| Source | CF ranklist API, filtered to handles whose rating/XP falls in user's arena band |
| Display | Paginated or top N (e.g. 20) + user's position within arena band if computable |
| Scope | Same arena only — not global |

### 2. Codeforces Ranklist — "As on CF"

Standard **global Codeforces rating ranklist**, matching what users see on codeforces.com.

| Property | Detail |
|----------|--------|
| Purpose | Familiar reference rank — no reinventing the leaderboard |
| Source | CF ranklist API (global, by rating) |
| Display | Top N globally + highlight current user's global rank row |
| Scope | All rated CF users |

No friends system. Viewing another player = enter their handle on landing (future: quick compare input).

---

## World Map (V0)

- **Format:** Static 2D island, single page, no swipe
- **Layout:** Vertical tower / stacked arenas (SAO floor + Clash Royale arena inspiration)
- **States per arena node:** `locked` | `current` | `cleared` (cleared = user rating ever reached this band in current season — optional; default: `current` + all lower = accessible, higher = locked)
- **Art:** Simple game-style SVG/CSS illustration acceptable. No 3D. No animation.

Future: swipable multi-map worlds unlocked as user progresses (Candy Crush / Shadow Fight pattern).

---

## Game Layer (V0)

V0 game layer is **lookup tables + CF rating**, not a custom XP engine.

Implement:

- Title resolution (`rating` → title)
- XP value (`rating` → integer, V0 only)
- Arena resolution (`xp` → arena / fort name)
- Arena population lookup (cached global histogram)
- World Map Rank fetch (handles in same arena band)
- Codeforces Ranklist fetch (global CF ranklist)

Do **not** implement in V0:

- Custom XP formula
- Daily quests
- Achievements
- Quest rewards
- Separate leveling curve

---

# Explicitly Out of Scope (Version 0)

- User accounts / authentication / handle verification
- Custom XP engine (separate from CF rating)
- Daily quests
- Achievements
- Animations / motion effects (Framer Motion deferred)
- Multiplayer / live players
- Friends / guilds / chat
- PvP
- Marketplace
- AI coach
- Seasonal events
- Swipable / multi-page maps
- Multiple platforms (LeetCode, AtCoder, etc.)
- Mobile app
- Midnight scheduled cron (deferred to v0.5)

---

# Technical Architecture

The application is divided into three independent layers.

---

## Layer 1 — Reality Layer

Responsible for:

- Fetching external APIs
- Syncing data
- Database storage

Contains **zero game logic**.

---

## Layer 2 — Game Engine

Responsible for:

- Rating → Title resolution (V0: static lookup table)
- XP → Arena resolution (V0: static lookup table; XP = rating)
- Arena population bucket lookup
- Future: custom XP, quests, achievements, multi-platform aggregation

Contains **zero UI logic**.

V0 note: Layer 2 is thin — config tables + pure functions. No XP accumulation logic.

---

## Layer 3 — Presentation Layer

Responsible for:

- UI
- World Map (static 2D)
- Arena Hub (Title, Arena, XP)
- Analytics Panel
- World Map Rank + Codeforces Ranklist

V0: **no animations, no effects.** Motion libraries deferred.

---

# Tech Stack

## Frontend

- Next.js
- React
- TypeScript
- TailwindCSS

Deferred (post-V0): Framer Motion

---

## Backend

- Node.js
- Next.js API Routes

---

## Database

- PostgreSQL
- Prisma ORM

---

## Hosting

- Vercel
- Neon PostgreSQL

---

## APIs

Version 0:

- Codeforces API

Future:

- LeetCode
- AtCoder
- CodeChef
- CSES

---

# Success Criteria (Version 0)

A user should be able to:

1. Enter a Codeforces handle and click **Enter World**
2. See a static 2D island map with their current arena highlighted
3. See **estimated population** in their arena band
4. See **Arena Hub**: Title (from rating), Arena fort name (from XP), XP (= CF rating in V0)
5. See **analytics** (P0 list) in readable game-styled layout
6. See **World Map Rank** (users in same arena band) and **Codeforces Ranklist** (global CF ranklist)
7. Click **Refresh** after solving problems / contests and see updated title, arena, XP, analytics, ranks

All without reading documentation.

---

# Appendix A — Title Threshold Table (V0)

Maps **current CF rating** → **Title** (identity).

| Tier | Min Rating | Max Rating | Title |
|------|------------|------------|-------|
| 1 | 0 | 1199 | Commoner |
| 2 | 1200 | 1399 | Scout |
| 3 | 1400 | 1599 | Warrior |
| 4 | 1600 | 1899 | Knight |
| 5 | 1900 | 2099 | Commander |
| 6 | 2100 | 2299 | Royal Guard |
| 7 | 2300 | 2399 | Champion |
| 8 | 2400 | ∞ | Monarch |

**Unrated:** Title = `Commoner`.

Titles are fantasy identity labels. CF official ranks (Newbie, Specialist, Expert, …) appear in **analytics only**.

---

# Appendix B — Arena Threshold Table (V0)

Maps **XP** → **Arena** (fort / map zone).

V0: XP equals CF rating, so bands match Appendix A exactly. Tables stay separate for future divergence.

| Tier | Min XP | Max XP | Arena (Fort) | Map order (bottom → top) |
|------|--------|--------|--------------|--------------------------|
| 1 | 0 | 1199 | Base Camp | 1 (bottom) |
| 2 | 1200 | 1399 | Training Grounds | 2 |
| 3 | 1400 | 1599 | Warrior's Keep | 3 |
| 4 | 1600 | 1899 | Knight's Hall | 4 |
| 5 | 1900 | 2099 | Command Fortress | 5 |
| 6 | 2100 | 2299 | Royal Bastion | 6 |
| 7 | 2300 | 2399 | Champion's Citadel | 7 |
| 8 | 2400 | ∞ | Monarch's Gate | 8 (top) |

**Unrated:** Arena = `Base Camp`, XP = `0`.

Arenas above user's current band: visible on map, **locked** (grayed). Arenas below: **cleared** (accessible visually).

---

# Appendix C — XP (V0)

```
XP = currentCodeforcesRating   // integer; 0 if unrated
```

| V0 | Future |
|----|--------|
| XP source = CF rating only | XP from solves, contests, streaks, multi-platform activity |
| XP drives arena lookup | XP still drives arena lookup |
| Rating drives title lookup | Rating (per country) still drives title lookup |

No custom XP formula in V0.

---

# Appendix D — Config Files (Implementation)

All thresholds live in version-controlled config, not hardcoded in UI:

```
src/config/titles.config.ts
src/config/arenas.config.ts
src/config/analytics.config.ts   // P0 vs P1 feature flags
```

Game engine reads configs only. Changing a threshold never requires UI changes.

---

# Appendix E — V0 Decision Log

All product decisions locked for Version 0. Change only via explicit PRD revision.

| # | Decision | Status |
|---|----------|--------|
| 1 | Arena population = **global CF estimate**, not app user count | Locked |
| 2 | **Title** from rating; **Arena** from XP; separate concepts, identical thresholds in V0 | Locked |
| 3 | No separate **Level** field — title is the identity tier | Locked |
| 4 | Rating drops → title, arena, XP all drop with current CF rating | Locked |
| 5 | **Two ranking lists:** World Map Rank (same arena) + Codeforces Ranklist (global) | Locked |
| 6 | Unrated → **Commoner** + **Base Camp** + XP `0` | Locked |
| 7 | No auth, no quests, no achievements, no animations | Locked |
| 8 | Manual Refresh; midnight cron deferred to v0.5 | Locked |
| 9 | Static 2D island map, single page, SAO / Clash Royale tower layout | Locked |
| 10 | Codeforces only | Locked |

---

# Future Roadmap

## Phase 1 — Accounts + Progression Engine

- Google Login / handle claiming
- Persistent profiles
- Custom XP formula (multi-source)
- Daily quests
- Achievements
- Midnight scheduled sync
- Animations (optional polish)

---

## Phase 1.5 — Dual-Track Progression (thresholds diverge)

- **Title** continues from platform rating(s) — identity unchanged
- **Arena** moves to custom XP formula — map position decouples from title
- `titles.config.ts` and `arenas.config.ts` thresholds diverge for the first time
- Example: **Knight** title + **Training Grounds** arena if XP lagging

---

## Phase 2 — Multiple Platforms

Support:

- LeetCode
- AtCoder
- CodeChef
- CSES

Create one unified player profile.

---

## Phase 3 — Living World

Replace dashboard navigation with world exploration.

Players move through a persistent world.

Different regions represent:

- Platforms
- Communities
- Events
- Challenges

---

## Phase 4 — Guilds

Guild Examples:

- Universities
- Companies
- Countries
- Private Communities

Examples:

- DTU
- MIT
- Google
- India
- Japan

Guild Features:

- Rankings
- Quests
- Guild Wars
- Shared Progress

---

## Phase 5 — Live Multiplayer

Introduce:

- Live Players
- Movement Synchronization
- Public Spaces
- Player Interaction
- Spectating

The world should feel populated.

---

## Phase 6 — Events

Examples:

- Weekly Bosses
- Seasonal Events
- ICPC Festivals
- Company Sponsored Competitions
- Community Challenges

---

## Phase 7 — AI Mentor

Personalized coaching.

Features:

- Weakness Detection
- Personalized Quests
- Problem Recommendations
- Contest Reviews
- Learning Roadmaps

---

## Phase 8 — Educational Mode

Teach Competitive Programming through exploration.

Interactive regions for:

- Arrays
- Binary Search
- Graphs
- Trees
- Dynamic Programming
- Math
- Strings

Players learn by progressing through the world.

---

## Phase 9 — THEGAMEWORLD

A persistent online universe for programmers.

Every solved problem, contest and achievement leaves a visible mark on the player's journey.

Instead of existing as separate websites,

Competitive Programming becomes one connected world.

---

# Guiding Principle

Whenever a new feature is proposed, ask:

> **Does this make solving one more problem feel more exciting?**

If the answer is **no**, reconsider the feature.

Every design decision should increase motivation, curiosity and long-term engagement while remaining useful as a Competitive Programming platform.
