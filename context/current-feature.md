## Current feature

Prisma + Neon PostgreSQL setup.

Implement the initial database foundation for DevStash using Prisma 7 and Neon PostgreSQL. This feature must follow `context/database-spec.md`, the data models in `context/project-overview.md`, and the database rules in `context/coding-standards.md`.

<!--Feature Name and short description-->

## Status

Completed

<!--Not Started  | In Progress | Completed-->


## Goals

- Install and configure Prisma 7 for the Next.js app.
- Configure Neon PostgreSQL through `DATABASE_URL`.
- Create the initial Prisma schema from the DevStash data models in `context/project-overview.md`.
- Include NextAuth v5-compatible database models: `Account`, `Session`, and `VerificationToken`.
- Add appropriate relational indexes, uniqueness constraints, and cascade deletes.
- Create migrations with `prisma migrate dev`; never use `prisma db push` or direct schema changes.
- Verify migration state with `prisma migrate status`.
- Keep production-ready behavior in mind: production must use `prisma migrate deploy`.

<!--Goals and requeriments-->


## Notes

- Prisma 7 includes breaking changes. Read the relevant local Next.js guide in `node_modules/next/dist/docs/` before code changes, and check the Prisma 7 upgrade/setup guidance before implementing.
- Development and production Neon branches are separate. Work against the development branch configured in `DATABASE_URL`.
- This feature is database setup only; do not add unrelated UI or app behavior.
- Referenced spec: `context/database-spec.md`.
- Prisma 7 setup, schema, initial migration, and lazy client helper are implemented. The initial migration was applied to the Neon development database and `prisma migrate status` reports the schema is up to date.

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
