## Current feature

Dashboard collections from database.

Replace the dummy recent collection cards in the dashboard main area with real collection data from Neon using Prisma. This feature must follow `context/dashboard-collections-spec.md` and preserve the current dashboard card design.

<!--Feature Name and short description-->

## Status

Completed

<!--Not Started  | In Progress | Completed-->


## Goals

- Create `src/lib/db/collections.ts` with Prisma data fetching functions for dashboard collections.
- Fetch collections directly in a server component instead of reading from `src/lib/mock-data.ts`.
- Keep the current recent collections card layout and visual design.
- Show the same recent collections area using real database collections.
- Derive each collection card border color from the most-used content type in that collection.
- Show small icons for all item types present in each collection.
- Update collection stats display using database data.
- Do not add the items-under-collection UI yet; that will be handled later.
- Verify the dashboard still builds and renders correctly after the data source change.

<!--Goals and requeriments-->


## Notes

- Referenced spec: `context/dashboard-collections-spec.md`.
- Reference screenshot if needed: `context/screenshots/dashboard-ui-main.png`.
- Keep this feature scoped to dashboard collection cards only.
- Use the existing Prisma 7 setup and seeded Neon development data.
- Preserve current dashboard styling; the main change is replacing mock data with database data.
- Implementation is complete in `src/lib/db/collections.ts`, `app/dashboard/page.tsx`, and `components/dashboard/dashboard-shell.tsx`. The dashboard route is dynamic so it reads Neon at request time.

<!--Extra notes-->


## History

<!--Keep updating, Ealiest  to latest-->

- 2026-06-25: Added the initial Next.js and Tailwind CSS setup. Cleaned the starter page, kept Tailwind as the only global CSS import, removed default scaffold SVG assets, and committed the baseline as `chore initial next js y tailwind setup`.
- 2026-06-27: Set the current feature to Dashboard UI Phase 1 and marked it as in progress based on `context/features/dashboard-phase-1-spec.md`.
- 2026-06-27: Completed Dashboard UI Phase 1 with the `/dashboard` route, shadcn/ui setup, default dark mode, top bar actions, brand placeholder, and sidebar/main placeholders.
- 2026-06-30: Set the current feature to Dashboard UI Phase 2 and marked it as in progress based on `context/features/dashboard-phase-2-spec.md`.
- 2026-06-30: Completed Dashboard UI Phase 2 with a data-driven collapsible desktop sidebar, mobile drawer sidebar, item type links, favorite and recent collection sections, and user avatar footer.
- 2026-06-30: Updated the sidebar so the `Collections` section itself is collapsible, with an accessible expand/collapse control.
- 2026-06-30: Cleared the active feature details after completing Dashboard UI Phase 2. References: `context/features/dashboard-phase-2-spec.md`, `context/screenshots/dashboard-ui-main.png`, and `src/lib/mock-data.ts`.
- 2026-06-30: Set the current feature to Dashboard UI Phase 3 and marked it as in progress based on `context/features/dashboard-phase-3-spec.md`.
- 2026-06-30: Completed Dashboard UI Phase 3 with summary stat cards, recent collections, pinned items, and recent items in the main dashboard area. References: `context/features/dashboard-phase-3-spec.md` and `src/lib/mock-data.ts`.
- 2026-06-30: Set the current feature to Prisma + Neon PostgreSQL setup and marked it as in progress based on `context/database-spec.md`.
- 2026-06-30: Implemented the Prisma 7 + Neon database foundation with `prisma.config.ts`, initial schema, generated migration SQL, lazy Prisma client helper, and database npm scripts. Validation, client generation, lint, and build passed; migration apply/status were pending a configured Neon `DATABASE_URL`.
- 2026-06-30: Applied the initial Prisma migration to the Neon development database with `prisma migrate dev --name init_devstash`, verified `prisma migrate status` reports the database schema is up to date, and marked the feature as completed.
- 2026-06-30: Set the current feature to Seed development data and marked it as in progress based on `context/seed-spec.md`.
- 2026-06-30: Implemented `prisma/seed.ts`, configured Prisma 7 seeding with `tsx prisma/seed.ts`, added `npm run db:seed`, seeded the Neon development database, and verified 7 system item types, 1 demo user, 5 collections, and 18 items.
- 2026-06-30: Set the current feature to Dashboard collections from database and marked it as in progress based on `context/dashboard-collections-spec.md`.
- 2026-06-30: Implemented dashboard collections from Neon with Prisma data fetching, dynamic server rendering for `/dashboard`, real collection stats, dominant type card borders, and collection type icons. Verified lint, build, and browser rendering.
