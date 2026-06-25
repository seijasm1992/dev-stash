# DevStash — Project Overview

> **One fast, searchable, AI-enhanced hub for all your dev knowledge & resources.**

---

## The Problem

Developers scatter their essentials across too many places:

| What | Where it lives |
|------|----------------|
| Code snippets | VS Code, Notion |
| AI prompts | Chat histories |
| Context files | Buried in projects |
| Useful links | Browser bookmarks |
| Docs | Random folders |
| Commands | `.txt` files, bash history |
| Project templates | GitHub Gists |

The result: constant context switching, lost knowledge, and inconsistent workflows. DevStash fixes this.

---

## Target Users

| User | Primary Need |
|------|-------------|
| **Everyday Developer** | Fast access to snippets, prompts, commands, links |
| **AI-first Developer** | Saves prompts, contexts, workflows, system messages |
| **Content Creator / Educator** | Code blocks, explanations, course notes |
| **Full-stack Builder** | Patterns, boilerplates, API examples |

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 / React 19 (SSR + dynamic components) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 + shadcn/ui |
| Database | Neon PostgreSQL |
| ORM | Prisma 7 (migrations only — never `db push`) |
| Auth | NextAuth v5 (Email/password + GitHub OAuth) |
| File Storage | Cloudflare R2 |
| Caching | Redis (TBD) |
| AI | OpenAI `gpt-4o-mini` |
| Deployment | Vercel (single repo, API routes for backend) |

> ⚠️ **DB Rule:** Never use `db push` or directly alter DB structure. Always create migration files, run in dev, then apply in prod.

---

## Features

### A. Items & Item Types

Items are the core unit of DevStash. Each item has a **type** that determines how it's stored and displayed.

**URL pattern:** `/items/:type-plural` → e.g. `/items/snippets`, `/items/prompts`

#### System Types (not editable by users)

| Type | Color | Icon | Content Kind |
|------|-------|------|-------------|
| `snippet` | `#3b82f6` 🔵 | `<Code />` | text |
| `prompt` | `#8b5cf6` 🟣 | `<Sparkles />` | text |
| `note` | `#fde047` 🟡 | `<StickyNote />` | text |
| `command` | `#f97316` 🟠 | `<Terminal />` | text |
| `link` | `#10b981` 🟢 | `<Link />` | url |
| `file` *(Pro)* | `#6b7280` ⚫ | `<File />` | file |
| `image` *(Pro)* | `#ec4899` 🩷 | `<Image />` | file |

> Users can create **custom types** in a later release.

Items are accessible and creatable via a **quick-access drawer** — no full page navigation required.

---

### B. Collections

Users organize items into named collections. An item can belong to **multiple collections**.

Examples:
- `React Patterns` → snippets, notes
- `Context Files` → files
- `Python Snippets` → snippets
- `Interview Prep` → snippets, prompts

---

### C. Search

Full-featured search across:
- **Title**
- **Content**
- **Tags**
- **Type**

---

### D. Authentication

- Email / password
- GitHub OAuth
- Powered by NextAuth v5

---

### E. Core UX Features

- ⭐ Favorite collections and items
- 📌 Pin items to top
- 🕐 Recently used
- 📥 Import code from file
- ✍️ Markdown editor for text types
- 📁 File upload for `file` / `image` types
- 📤 Export data (JSON / ZIP)
- 🌑 Dark mode (default)
- ➕ Add / remove items to/from multiple collections
- 👁️ View which collections an item belongs to

---

### F. AI Features *(Pro only)*

- 🏷️ Auto-tag suggestions
- 📝 AI Summaries
- 🔍 AI Explain This Code
- ✨ Prompt Optimizer

---

## Data Models

### Prisma Schema

```prisma
model User {
  id                     String       @id @default(cuid())
  name                   String?
  email                  String       @unique
  emailVerified          DateTime?
  image                  String?
  password               String?
  isPro                  Boolean      @default(false)
  stripeCustomerId       String?      @unique
  stripeSubscriptionId   String?      @unique
  createdAt              DateTime     @default(now())
  updatedAt              DateTime     @updatedAt

  items       Item[]
  collections Collection[]
  itemTypes   ItemType[]
  accounts    Account[]
  sessions    Session[]
}

model Item {
  id          String   @id @default(cuid())
  title       String
  contentType String   // "text" | "file" | "url"
  content     String?  // text content (null if file)
  fileUrl     String?  // Cloudflare R2 URL (null if text)
  fileName    String?  // original filename
  fileSize    Int?     // bytes
  url         String?  // for link types
  description String?
  language    String?  // optional, for code snippets
  isFavorite  Boolean  @default(false)
  isPinned    Boolean  @default(false)
  lastUsedAt  DateTime?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  userId     String
  user       User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  itemTypeId String
  itemType   ItemType @relation(fields: [itemTypeId], references: [id])

  tags        TagsOnItems[]
  collections ItemCollection[]
}

model ItemType {
  id       String  @id @default(cuid())
  name     String
  icon     String
  color    String
  isSystem Boolean @default(false)

  userId String?
  user   User?   @relation(fields: [userId], references: [id], onDelete: Cascade)
  // userId is null for system types

  items       Item[]
  collections Collection[] @relation("DefaultType")
}

model Collection {
  id          String   @id @default(cuid())
  name        String
  description String?
  isFavorite  Boolean  @default(false)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  userId        String
  user          User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  defaultTypeId String?
  defaultType   ItemType? @relation("DefaultType", fields: [defaultTypeId], references: [id])

  items ItemCollection[]
}

// Join table: many-to-many between Item and Collection
model ItemCollection {
  itemId       String
  collectionId String
  addedAt      DateTime @default(now())

  item       Item       @relation(fields: [itemId], references: [id], onDelete: Cascade)
  collection Collection @relation(fields: [collectionId], references: [id], onDelete: Cascade)

  @@id([itemId, collectionId])
}

model Tag {
  id    String        @id @default(cuid())
  name  String        @unique
  items TagsOnItems[]
}

// Join table: many-to-many between Item and Tag
model TagsOnItems {
  itemId String
  tagId  String

  item Item @relation(fields: [itemId], references: [id], onDelete: Cascade)
  tag  Tag  @relation(fields: [tagId], references: [id], onDelete: Cascade)

  @@id([itemId, tagId])
}
```

---

## Monetization

### Free Tier

- 50 items total
- 3 collections
- All system types **except** `file` and `image`
- Basic search
- No file uploads
- No AI features

### Pro — $8/month or $72/year

- Unlimited items & collections
- `file` and `image` types
- Custom item types *(later release)*
- AI auto-tagging, summaries, code explanation, prompt optimizer
- Export (JSON / ZIP)
- Priority support

> 🛠️ **Dev note:** During development, all users have full access regardless of plan. Freemium gates are set up in the data model but not enforced until launch.

---

## UI / UX

### Design Principles

- Modern, minimal, developer-focused
- **Dark mode by default**, light mode optional
- Clean typography, generous whitespace
- Subtle borders and shadows
- References: Notion, Linear, Raycast
- Syntax highlighting on all code blocks

### Layout

```
┌────────────────────────────────────────────────────┐
│  Sidebar (collapsible)   │  Main Content           │
│                          │                         │
│  Item Types              │  Collections grid       │
│  ├─ Snippets             │  (color-coded cards)    │
│  ├─ Prompts              │                         │
│  ├─ Commands             │  Items under collection │
│  ├─ Notes                │  (color-coded cards)    │
│  ├─ Links                │                         │
│  └─ Files (pro)          │  [Item opens in drawer] │
│                          │                         │
│  Collections (latest)    │                         │
└────────────────────────────────────────────────────┘
```

- **Sidebar:** Item type links + latest collections
- **Main:** Grid of color-coded collection cards (background color = dominant item type). Items display in color-coded cards (border color = item type)
- **Mobile:** Sidebar becomes a drawer; desktop-first layout

### Micro-interactions

- Smooth transitions on all state changes
- Hover states on cards
- Toast notifications for CRUD actions
- Loading skeleton screens

---

## Project Structure (Recommended)

```
devstash/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   └── register/
│   ├── (dashboard)/
│   │   ├── items/
│   │   │   └── [type]/       # /items/snippets, /items/prompts, etc.
│   │   ├── collections/
│   │   │   └── [id]/
│   │   └── layout.tsx        # sidebar layout
│   └── api/
│       ├── items/
│       ├── collections/
│       ├── upload/
│       └── ai/
├── components/
│   ├── ui/                   # shadcn components
│   ├── items/
│   ├── collections/
│   └── drawers/
├── lib/
│   ├── prisma.ts
│   ├── auth.ts
│   ├── r2.ts
│   └── openai.ts
├── prisma/
│   ├── schema.prisma
│   └── migrations/
└── types/
```

---

## Key Relationships Diagram

```
User
 ├── Items (1:many)
 │    ├── ItemType (many:1)
 │    ├── Tags (many:many via TagsOnItems)
 │    └── Collections (many:many via ItemCollection)
 ├── Collections (1:many)
 │    └── DefaultItemType (many:1, optional)
 └── ItemTypes (1:many) ← only for custom types; system types have userId = null
```

---

## Useful Links

- [Next.js 15 Docs](https://nextjs.org/docs)
- [Prisma 7 Docs](https://www.prisma.io/docs)
- [NextAuth v5 Docs](https://authjs.dev)
- [Neon PostgreSQL](https://neon.tech/docs)
- [Cloudflare R2 Docs](https://developers.cloudflare.com/r2/)
- [shadcn/ui](https://ui.shadcn.com)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [OpenAI API](https://platform.openai.com/docs)
- [Stripe Docs](https://stripe.com/docs)

---

*Last updated: June 2026*
