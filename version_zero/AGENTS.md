# AI onboarding — THEGAMEWORLD

Before writing code, read:

1. `../PRD.md` — product spec
2. `../DEVELOPMENT_HISTORY.md` — what's built, what's next, how we work

**App root:** `version_zero/`  
**Main API:** `GET /api/player/[handle]` → `syncPlayer()` in `src/lib/reality/sync/syncPlayer.ts`

**Build style:** Top-down from Step 7 — user moment first, no orphan `lib/` functions.

<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->
