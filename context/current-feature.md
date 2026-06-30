## Current feature

Seed development data.

Create a Prisma seed script for development and demo data. This feature must follow `context/seed-spec.md`, the existing Prisma 7 setup, and the data models in `prisma/schema.prisma`.

<!--Feature Name and short description-->

## Status

Completed

<!--Not Started  | In Progress | Completed-->


## Goals

- Create or overwrite the current seed file as `prisma/seed.ts`.
- Load environment variables with `dotenv` before connecting to the database.
- Seed demo user `demo@devstash.io` with name `Demo User`, password `12345678` hashed with `bcryptjs` using 12 rounds, `isPro: false`, and `emailVerified` set to the current date.
- Seed all system item types from `context/seed-spec.md` with Lucide icon names, colors, and `isSystem: true`.
- Seed the required collections: React Patterns, AI Workflows, DevOps, Terminal Commands, and Design Resources.
- Seed the required snippets, prompts, commands, and real documentation/resource links for each collection.
- Make the seed script safe to rerun by using deterministic lookups/upserts where practical.
- Add an npm script for running the seed if one does not already exist.
- Verify the seed against the Neon development database after implementation.

<!--Goals and requeriments-->


## Notes

- Referenced spec: `context/seed-spec.md`.
- The seed can overwrite any existing seed file content.
- Keep this feature scoped to seed data and seed execution only; do not add unrelated app UI.
- Prisma 7 is already configured. Use the generated client/adapter pattern already present in the project.
- The seed should target development/demo data only.
- Seed implementation is complete in `prisma/seed.ts`. It runs with `npm run db:seed` and was verified against the Neon development database.

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
