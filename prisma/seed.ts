import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { hash } from "bcryptjs";
import { Pool } from "pg";
import { PrismaClient } from "../lib/generated/prisma/client";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is required to seed the database.");
}

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const systemItemTypes = [
  { name: "snippet", icon: "Code", color: "#3b82f6" },
  { name: "prompt", icon: "Sparkles", color: "#8b5cf6" },
  { name: "command", icon: "Terminal", color: "#f97316" },
  { name: "note", icon: "StickyNote", color: "#fde047" },
  { name: "file", icon: "File", color: "#6b7280" },
  { name: "image", icon: "Image", color: "#ec4899" },
  { name: "link", icon: "Link", color: "#10b981" },
] as const;

interface SeedItem {
  title: string;
  type: (typeof systemItemTypes)[number]["name"];
  contentType: "text" | "url";
  content?: string;
  url?: string;
  description?: string;
  language?: string;
  isFavorite?: boolean;
  isPinned?: boolean;
}

interface SeedCollection {
  name: string;
  description: string;
  defaultType: SeedItem["type"];
  items: SeedItem[];
}

const seedCollections: SeedCollection[] = [
  {
    name: "React Patterns",
    description: "Reusable React patterns and hooks",
    defaultType: "snippet",
    items: [
      {
        title: "useDebounce Hook",
        type: "snippet",
        contentType: "text",
        language: "typescript",
        isPinned: true,
        content: `import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => setDebouncedValue(value), delay);
    return () => window.clearTimeout(timeoutId);
  }, [value, delay]);

  return debouncedValue;
}`,
      },
      {
        title: "Compound Component Pattern",
        type: "snippet",
        contentType: "text",
        language: "typescript",
        content: `import { createContext, useContext } from "react";

const TabsContext = createContext<{ activeValue: string } | null>(null);

export function useTabsContext() {
  const context = useContext(TabsContext);
  if (!context) throw new Error("Tabs components must be used inside Tabs.");
  return context;
}`,
      },
      {
        title: "Class Name Utility",
        type: "snippet",
        contentType: "text",
        language: "typescript",
        content: `import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}`,
      },
    ],
  },
  {
    name: "AI Workflows",
    description: "AI prompts and workflow automations",
    defaultType: "prompt",
    items: [
      {
        title: "Production Code Review",
        type: "prompt",
        contentType: "text",
        isFavorite: true,
        content: "Review this code for correctness, security, maintainability, performance, accessibility, and missing tests. Prioritize concrete findings with file and line references.",
      },
      {
        title: "Documentation Generator",
        type: "prompt",
        contentType: "text",
        content: "Generate concise developer documentation for this module. Include purpose, public API, usage examples, edge cases, and setup notes.",
      },
      {
        title: "Refactoring Assistant",
        type: "prompt",
        contentType: "text",
        content: "Suggest a minimal refactor that improves readability without changing behavior. Explain tradeoffs and identify tests that should remain green.",
      },
    ],
  },
  {
    name: "DevOps",
    description: "Infrastructure and deployment resources",
    defaultType: "command",
    items: [
      {
        title: "Dockerized Next.js Build",
        type: "snippet",
        contentType: "text",
        language: "dockerfile",
        content: `FROM node:22-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM deps AS build
COPY . .
RUN npm run build`,
      },
      {
        title: "Deploy With Vercel CLI",
        type: "command",
        contentType: "text",
        content: "vercel deploy --prod",
      },
      {
        title: "Vercel Deployment Docs",
        type: "link",
        contentType: "url",
        url: "https://vercel.com/docs/deployments/overview",
        description: "Official Vercel deployment documentation.",
      },
      {
        title: "Docker Compose Docs",
        type: "link",
        contentType: "url",
        url: "https://docs.docker.com/compose/",
        description: "Official Docker Compose documentation.",
      },
    ],
  },
  {
    name: "Terminal Commands",
    description: "Useful shell commands for everyday development",
    defaultType: "command",
    items: [
      {
        title: "Compact Git History",
        type: "command",
        contentType: "text",
        content: "git log --oneline --decorate --graph --all -n 20",
      },
      {
        title: "Docker Cleanup",
        type: "command",
        contentType: "text",
        content: "docker system prune --volumes",
      },
      {
        title: "Find Process By Port",
        type: "command",
        contentType: "text",
        content: "netstat -ano | findstr :3000",
      },
      {
        title: "Check Outdated Packages",
        type: "command",
        contentType: "text",
        content: "npm outdated",
      },
    ],
  },
  {
    name: "Design Resources",
    description: "UI/UX resources and references",
    defaultType: "link",
    items: [
      {
        title: "Tailwind CSS Docs",
        type: "link",
        contentType: "url",
        url: "https://tailwindcss.com/docs",
      },
      {
        title: "shadcn/ui Components",
        type: "link",
        contentType: "url",
        url: "https://ui.shadcn.com/docs/components",
      },
      {
        title: "Atlassian Design System",
        type: "link",
        contentType: "url",
        url: "https://atlassian.design/",
      },
      {
        title: "Lucide Icons",
        type: "link",
        contentType: "url",
        url: "https://lucide.dev/icons/",
      },
    ],
  },
];

async function seedSystemItemTypes() {
  const itemTypeIds = new Map<SeedItem["type"], string>();

  for (const itemType of systemItemTypes) {
    const existingItemType = await prisma.itemType.findFirst({
      where: { name: itemType.name, isSystem: true, userId: null },
    });

    const savedItemType = existingItemType
      ? await prisma.itemType.update({
          where: { id: existingItemType.id },
          data: { icon: itemType.icon, color: itemType.color, isSystem: true },
        })
      : await prisma.itemType.create({
          data: { ...itemType, isSystem: true },
        });

    itemTypeIds.set(itemType.name, savedItemType.id);
  }

  return itemTypeIds;
}

async function main() {
  const itemTypeIds = await seedSystemItemTypes();
  const password = await hash("12345678", 12);

  const demoUser = await prisma.user.upsert({
    where: { email: "demo@devstash.io" },
    update: {
      name: "Demo User",
      password,
      isPro: false,
      emailVerified: new Date(),
    },
    create: {
      email: "demo@devstash.io",
      name: "Demo User",
      password,
      isPro: false,
      emailVerified: new Date(),
    },
  });

  await prisma.item.deleteMany({ where: { userId: demoUser.id } });
  await prisma.collection.deleteMany({ where: { userId: demoUser.id } });

  for (const collection of seedCollections) {
    const defaultTypeId = itemTypeIds.get(collection.defaultType);

    if (!defaultTypeId) {
      throw new Error(`Missing item type for ${collection.defaultType}.`);
    }

    const savedCollection = await prisma.collection.create({
      data: {
        name: collection.name,
        description: collection.description,
        userId: demoUser.id,
        defaultTypeId,
      },
    });

    for (const item of collection.items) {
      const itemTypeId = itemTypeIds.get(item.type);

      if (!itemTypeId) {
        throw new Error(`Missing item type for ${item.type}.`);
      }

      await prisma.item.create({
        data: {
          title: item.title,
          contentType: item.contentType,
          content: item.content,
          url: item.url,
          description: item.description,
          language: item.language,
          isFavorite: item.isFavorite ?? false,
          isPinned: item.isPinned ?? false,
          userId: demoUser.id,
          itemTypeId,
          collections: {
            create: {
              collectionId: savedCollection.id,
            },
          },
        },
      });
    }
  }

  console.log("Seed completed");
  console.log(`User: ${demoUser.email}`);
  console.log(`Collections: ${seedCollections.length}`);
  console.log(`Items: ${seedCollections.reduce((total, collection) => total + collection.items.length, 0)}`);
}

main()
  .catch((error: unknown) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
