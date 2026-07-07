# THEGAMEWORLD — Product Requirements Document (PRD)

> **Version:** 1.0 (Living Document)
>
> **Purpose**
>
> Define what THEGAMEWORLD is, what Version 0 must deliver, and the long-term direction of the project.
>
> This document answers **WHAT** to build.
>
> Companion documents:
>
> - `DESIGN_PHILOSOPHY.md` → How the product should feel
> - `DEVELOPMENT_HISTORY.md` → What's already built
> - `CURRENT_STATE.md` → Current implementation milestone

---

# 1. Vision

THEGAMEWORLD is a persistent virtual world built on top of real Competitive Programming.

Instead of visiting Codeforces, LeetCode, AtCoder and other platforms separately, players exist inside one connected world where their real programming achievements determine their in-game identity.

The objective is **not** to replace existing platforms.

The objective is to make Competitive Programming feel alive, social and rewarding.

Every title, arena and future progression system must originate from **real coding activity**, never artificial game grinding.

---

# 2. Product Philosophy

THEGAMEWORLD is:

- A Competitive Programming companion.
- A visualization layer over real programming progress.
- A social world built around coding.
- A motivation system for solving more problems.

THEGAMEWORLD is **not**:

- A coding platform.
- A game that teaches DSA.
- Another statistics dashboard with random gamification.

If all graphics disappeared, the application should still remain a genuinely useful Competitive Programming analytics tool.

---

# 3. Core Goals

### Primary Goal

Make Competitive Programming feel exciting enough that users want to return every day.

---

### Secondary Goal

Provide a better experience than opening individual Competitive Programming websites.

---

### Long-Term Goal

Become the default homepage for Competitive Programmers.

Instead of opening Codeforces first, users should naturally open THEGAMEWORLD.

---

# 4. Target Users

### Version 0

Competitive Programmers using Codeforces.

### Future

- LeetCode users
- AtCoder users
- ICPC participants
- Beginners entering Competitive Programming
- Programming communities and universities

---

# 5. Version 0 Scope

Version 0 is intentionally small.

Its purpose is to prove the core experience.

A user should be able to:

1. Enter a Codeforces handle.
2. Enter THEGAMEWORLD.
3. See their world identity.
4. View useful analytics.
5. Feel motivated to continue solving problems.

Version 0 is **not** trying to build an MMO.

It is a polished Competitive Programming companion with a game-inspired presentation layer.

---

# 6. Version 0 Features

### Included

- Codeforces integration
- Player progression
- Title system
- Arena system
- Analytics
- World page
- Arena population
- Ranking lists
- Static world map

### Excluded

- Authentication
- Quests
- Achievements
- Guilds
- Friends
- Multiplayer
- Animations
- Multiple CP platforms
- Database-backed progression
- AI mentor

These belong to future versions.

---

# 7. User Journey (V0)

```

Landing Page
↓
Enter Codeforces Handle
↓
Sync Codeforces
↓
Enter World
↓
View:

• Title
• Arena
• XP
• Analytics
• Population
• Rankings

```

Every interaction should reinforce one feeling:

> **"I'm progressing inside a real Competitive Programming world."**

# 8. Progression System (V0)

THEGAMEWORLD has two independent progression systems.

Although they use the same value in Version 0, they are intentionally modeled as separate concepts.

| System | Driven By | Represents |
|----------|-----------|------------|
| **Title** | Codeforces Rating | Player identity |
| **Arena** | XP | Player's position in the world |

Version 0 simplification:

```
XP = Current Codeforces Rating
```

This allows both systems to stay synchronized while keeping the architecture flexible for future updates.

Later versions will separate XP from rating.

---

## Title

A title represents **who the player is** inside THEGAMEWORLD.

Examples:

- Commoner
- Scout
- Warrior
- Knight
- Commander
- Royal Guard
- Champion
- Monarch

Titles are fantasy ranks.

Official Codeforces ranks (Expert, Candidate Master, etc.) are displayed only as analytics.

---

## Arena

An arena represents **where the player currently exists** inside the world.

Examples:

- Base Camp
- Training Grounds
- Warrior's Keep
- Knight's Hall
- Command Fortress
- Royal Bastion
- Champion's Citadel
- Monarch's Gate

Every arena corresponds to one XP range.

Higher arenas remain visible but locked.

---

## XP

Version 0:

```
XP = Current Codeforces Rating
```

Unrated players receive:

- XP = 0
- Title = Commoner
- Arena = Base Camp

Future versions will generate XP from:

- Problems solved
- Contests
- Streaks
- Multiple CP platforms
- Quests

---

# 9. World Page

After entering a Codeforces handle, the player enters a single world page.

The page contains:

### Arena Hub

Displays:

- Title
- Arena
- XP
- Rating

---

### Analytics

Core statistics:

- Current Rating
- Maximum Rating
- Contests Played
- Problems Solved
- Rating Graph
- Activity Heatmap
- Strongest Tags
- Weakest Tags

---

### Population

Displays the estimated number of Codeforces users currently inside the player's arena.

This is based on global Codeforces data, **not** THEGAMEWORLD users.

Example:

> Approximately 3,200 players are currently in Knight's Hall.

---

### Rankings

Two ranking systems exist.

#### World Rank

Players inside the same arena.

Purpose:

Creates the feeling that the player exists alongside others in the world.

---

#### Codeforces Rank

Standard global Codeforces ranking.

This remains unchanged from the official platform.

---

### Refresh

The player may manually refresh.

Refreshing:

- Fetches latest Codeforces data.
- Updates progression.
- Updates analytics.
- Updates rankings.

No custom data is modified.

---

# 10. World Layout (V0)

Version 0 uses a single static island.

Progression moves vertically through forts.

Example:

```
Monarch's Gate

Champion's Citadel

Royal Bastion

Command Fortress

Knight's Hall

Warrior's Keep

Training Grounds

Base Camp
```

Only the player's current arena is highlighted.

Future arenas remain visible but inaccessible.

The map is intentionally simple.

The purpose is to establish the feeling of existing inside a world rather than another dashboard.
# 11. Technical Architecture

THEGAMEWORLD follows a simple three-layer architecture.

```
Reality Layer
    ↓
Game Layer
    ↓
Presentation Layer
```

### Reality Layer

Responsible for:

- External APIs
- Data synchronization
- Analytics generation

Contains no game logic.

---

### Game Layer

Responsible for:

- Progression
- Titles
- Arenas
- XP
- Future quests and achievements

Contains no UI logic.

---

### Presentation Layer

Responsible for:

- World Map
- Arena Hub
- Analytics
- Rankings
- Overall user experience

The frontend visualizes the data produced by the lower layers.

---

# 12. Technology Stack

## Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS

## Backend

- Next.js API Routes

## Database (Future)

- PostgreSQL
- Prisma

## Hosting

- Vercel

---

# 13. Success Criteria (V0)

Version 0 is successful if a user can:

- Enter a Codeforces handle.
- Enter THEGAMEWORLD.
- See their title, arena and XP.
- View meaningful analytics.
- View arena population.
- View rankings.
- Refresh their data.

The application should feel fast, simple and polished.

---

# 14. Out of Scope

The following are intentionally excluded from Version 0:

- Authentication
- Multiple platforms
- Guilds
- Friends
- Chat
- Quests
- Achievements
- Animations
- Multiplayer
- AI Mentor

These belong to future releases.

# 15. Roadmap

Development will happen in phases.

## Version 0

Build a polished Codeforces companion.

- Codeforces integration
- Progression system
- Static world map
- Analytics
- Rankings
- Fast, clean UI

---

## Phase 1

Player Accounts

- Authentication
- Handle ownership
- Persistent profiles
- Saved progression

---

## Phase 2

Custom Progression

- XP no longer equals CF rating
- Separate Title and Arena progression
- Daily quests
- Achievements
- Progress history

---

## Phase 3

Multi-Platform Support

Integrate:

- LeetCode
- AtCoder
- CodeChef
- CSES

Create one unified player identity across Competitive Programming.

---

## Phase 4

Living World

Transform the static map into an interactive world.

Possible additions:

- Multiple islands
- Region exploration
- Interactive buildings
- Discoverable locations

---

## Phase 5

Social Features

- Guilds
- University communities
- Company communities
- Friends
- Leaderboards
- Guild rankings

---

## Phase 6

Live Multiplayer

Bring the world to life.

Ideas include:

- Live player presence
- Spectator mode
- Contest hubs
- Monarch battles
- Community events

---

## Phase 7

Learning Mode

Help beginners enter Competitive Programming through exploration.

Possible features:

- Guided learning paths
- Topic-based regions
- AI mentor
- Personalized recommendations

---

# Guiding Principle

Every new feature should answer one question:

> **Does this make solving one more Competitive Programming problem more enjoyable?**

If the answer is **no**, the feature should be reconsidered.

THEGAMEWORLD is not trying to become another game.

It is trying to become the world's most engaging companion for Competitive Programming.