# THEGAMEWORLD — Design Philosophy & Development Notes

> This document is not a feature list.  
> It defines how the project should evolve and the philosophy behind design decisions.  
> Whenever a new feature or UI is designed, revisit this document.

**Read with:** `PRD.md` (what to build) · `DEVELOPMENT_HISTORY.md` (what's built, what's next)

---

# Current Learning Strategy

The project should be developed in a **top-down** manner.

Instead of starting with helper functions and types, every feature should begin by answering:

1. What experience is the player supposed to have?
2. What screen are we building?
3. What data is required?
4. Which backend/API supports it?
5. What helper functions/types are required?

Implementation naturally becomes bottom-up, but planning always begins top-down.

For every implementation step:

1. Explain **what** we are building.
2. Explain **why** we need it.
3. Explain possible alternatives.
4. Explain why the chosen approach is best.
5. Then implement with clear comments.

The objective is not only to build the project, but to learn software architecture while building.

---

# Core Product Identity

THEGAMEWORLD is **not** a dashboard with gamification.

THEGAMEWORLD is **a persistent virtual world whose economy is driven entirely by real Competitive Programming progress.**

Everything inside the world should originate from actual coding activity.

The player is not "playing THEGAMEWORLD."

The player is living inside it.

---

# UI Philosophy

The backend provides information.

The frontend creates emotion.

The goal of the UI is not simply to display data.

The goal is to make Competitive Programming feel exciting.

Every interaction should answer:

> "Does this make solving one more problem feel exciting?"

If not, reconsider the design.

---

# Inspiration Sources

Do **not** invent every UI from scratch.

Study successful products and borrow design ideas.

Current inspirations:

### Clash Royale

- Arena progression
- Trophy road
- Clean game UI
- Reward feeling

### Candy Crush

- Vertical progression
- Clear "next destination"
- Satisfying movement
- Future expansion to multiple connected maps

### Shadow Fight

- World progression
- Region unlocking
- Sense of journey

### Chess.com

- Analytics
- Rating graphs
- Clean statistics
- Professional presentation

### Codolio

- Analytics layout
- Readability
- Cards

### Genshin Impact (long-term)

Not the art style. Instead:

- World feeling
- Discoverable regions
- Persistent exploration
- Connected world

---

# World Philosophy

The world should feel alive.

Even in Version 0.

The player should never feel like they opened another statistics website.

Future versions should gradually evolve from:

```
Static Map
    ↓
Interactive Map
    ↓
Persistent World
    ↓
Living Multiplayer World
```

---

# Initial World Layout

Version 0:

Single static 2D island.

Vertical fort progression.

Example (top → bottom on map, bottom = entry):

```
Monarch's Gate
    ↓
Champion's Citadel
    ↓
Royal Bastion
    ↓
Command Fortress
    ↓
Knight's Hall
    ↓
Warrior's Keep
    ↓
Training Grounds
    ↓
Base Camp
```

The player's current arena is highlighted.

Higher arenas remain visible but locked.

---

# Future Navigation

Instead of infinite vertical scrolling,

the world should eventually become explorable.

Different islands/regions represent different activities.

Example:

- Codeforces Kingdom
- LeetCode Empire
- AtCoder Islands
- CSES Mountains

Navigation should feel closer to travelling than browsing pages.

---

# UI Principles

The interface should remain clean.

- Cards over tables
- Readable typography
- Minimal colours
- Fast animations
- No visual clutter

The application should still be useful even with animations disabled.

---

# Animation Philosophy

Animations exist as feedback.

Never as decoration.

Examples:

| Moment | Feedback |
|--------|----------|
| Player enters arena | Camera smoothly centers on current fort |
| Refresh | Numbers count upward |
| Arena unlock | Small glow effect |
| Rating increase | Arena highlights briefly |
| Achievement | Simple satisfying popup |

Animations should be quick and subtle.

**V0:** No animations required — static UI is acceptable. This philosophy applies from Phase 1 onward.

---

# Colour Philosophy

Do not invent random colours.

Build a consistent palette inspired by modern games.

Use approximately 5–6 core colours.

Maintain visual consistency across the project.

---

# Future Social Systems

Potential future systems:

- Guilds
- University Guilds (DTU, MIT, etc.)
- Country Guilds
- Company Guilds
- Guild Wars
- Guild Rankings
- Guild Quests

---

# Future Living World

Players become visible.

Not as static names.

Actual player avatars appear throughout the world.

Examples:

- Standing inside arenas
- Gathering near contest portals
- Watching tournaments
- Exploring regions

The world should feel populated.

---

# Future Events

Ideas:

- Monarch Battles
- Weekly World Bosses
- Company-sponsored tournaments
- ICPC Festivals
- Seasonal Events
- Community Challenges

---

# Future Spectator System

Top players should become public figures inside the world.

Ideas:

- Watch Monarch battles live
- Spectate high-rated duels
- Live contest arenas
- Community streams
- Hall of Fame

---

# Future Educational Mode

The project should eventually become a beginner-friendly gateway to Competitive Programming.

Instead of reading tutorials,

players travel through regions that naturally introduce:

- Arrays
- Binary Search
- Graphs
- Trees
- Dynamic Programming
- Math
- Strings

Learning becomes exploration.

---

# Product Philosophy

Feature count is not success.

Execution quality is success.

One polished screen is worth more than ten unfinished pages.

Whenever uncertain,

prefer polish over additional features.

---

# Development Rule

Never optimize for writing more code.

Optimize for making the project feel more alive.

If a feature does not improve the player's journey,

it probably does not belong.

---

# Personal Development Goal

The objective is not simply to finish THEGAMEWORLD.

The objective is to become capable of designing and building software systems independently.

Every concept learned should answer:

1. What problem existed before this concept?
2. Why was this solution invented?
3. How does it solve the problem?
4. How is that idea implemented in this project?

The project itself is the classroom.

---

# Long-Term Vision

THEGAMEWORLD should eventually become the default home page for competitive programmers.

People shouldn't open Codeforces first.

They should open THEGAMEWORLD.

From there they can:

- View analytics
- Explore the world
- Meet friends
- Join guilds
- Watch Monarch battles
- Enter contests
- Learn new topics
- Track progress across every Competitive Programming platform

The dream is not to build another dashboard.

The dream is to build the world Competitive Programming deserves.
