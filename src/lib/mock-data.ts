export type ContentKind = "text" | "url" | "file";

export interface MockUser {
  id: string;
  name: string;
  email: string;
  image: string | null;
  isPro: boolean;
}

export interface MockItemType {
  id: string;
  name: string;
  slug: string;
  pluralName: string;
  icon: string;
  color: string;
  contentKind: ContentKind;
  isSystem: boolean;
  isPro: boolean;
  count: number;
}

export interface MockCollection {
  id: string;
  name: string;
  description: string;
  itemCount: number;
  itemTypeIds: string[];
  defaultTypeId: string | null;
  isFavorite: boolean;
  updatedAt: string;
}

export interface MockItem {
  id: string;
  title: string;
  description: string;
  contentType: ContentKind;
  content: string | null;
  url: string | null;
  fileName: string | null;
  fileUrl: string | null;
  language: string | null;
  itemTypeId: string;
  collectionIds: string[];
  tags: string[];
  isFavorite: boolean;
  isPinned: boolean;
  lastUsedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export const currentUser: MockUser = {
  id: "user-1",
  name: "John Doe",
  email: "john@example.com",
  image: null,
  isPro: true,
};

export const itemTypes: MockItemType[] = [
  {
    id: "type-snippet",
    name: "Snippet",
    slug: "snippet",
    pluralName: "Snippets",
    icon: "Code",
    color: "#3b82f6",
    contentKind: "text",
    isSystem: true,
    isPro: false,
    count: 24,
  },
  {
    id: "type-prompt",
    name: "Prompt",
    slug: "prompt",
    pluralName: "Prompts",
    icon: "Sparkles",
    color: "#8b5cf6",
    contentKind: "text",
    isSystem: true,
    isPro: false,
    count: 18,
  },
  {
    id: "type-command",
    name: "Command",
    slug: "command",
    pluralName: "Commands",
    icon: "Terminal",
    color: "#f97316",
    contentKind: "text",
    isSystem: true,
    isPro: false,
    count: 15,
  },
  {
    id: "type-note",
    name: "Note",
    slug: "note",
    pluralName: "Notes",
    icon: "StickyNote",
    color: "#fde047",
    contentKind: "text",
    isSystem: true,
    isPro: false,
    count: 12,
  },
  {
    id: "type-file",
    name: "File",
    slug: "file",
    pluralName: "Files",
    icon: "File",
    color: "#6b7280",
    contentKind: "file",
    isSystem: true,
    isPro: true,
    count: 5,
  },
  {
    id: "type-image",
    name: "Image",
    slug: "image",
    pluralName: "Images",
    icon: "Image",
    color: "#ec4899",
    contentKind: "file",
    isSystem: true,
    isPro: true,
    count: 3,
  },
  {
    id: "type-link",
    name: "Link",
    slug: "link",
    pluralName: "Links",
    icon: "Link",
    color: "#10b981",
    contentKind: "url",
    isSystem: true,
    isPro: false,
    count: 8,
  },
];

export const collections: MockCollection[] = [
  {
    id: "collection-react-patterns",
    name: "React Patterns",
    description: "Common React patterns and hooks",
    itemCount: 12,
    itemTypeIds: ["type-snippet", "type-note", "type-link"],
    defaultTypeId: "type-snippet",
    isFavorite: true,
    updatedAt: "2026-01-15",
  },
  {
    id: "collection-python-snippets",
    name: "Python Snippets",
    description: "Useful Python code snippets",
    itemCount: 8,
    itemTypeIds: ["type-snippet", "type-note"],
    defaultTypeId: "type-snippet",
    isFavorite: false,
    updatedAt: "2026-01-14",
  },
  {
    id: "collection-context-files",
    name: "Context Files",
    description: "AI context files for projects",
    itemCount: 5,
    itemTypeIds: ["type-file", "type-note"],
    defaultTypeId: "type-file",
    isFavorite: true,
    updatedAt: "2026-01-13",
  },
  {
    id: "collection-interview-prep",
    name: "Interview Prep",
    description: "Technical interview preparation",
    itemCount: 24,
    itemTypeIds: ["type-note", "type-snippet", "type-link", "type-prompt"],
    defaultTypeId: "type-note",
    isFavorite: false,
    updatedAt: "2026-01-12",
  },
  {
    id: "collection-git-commands",
    name: "Git Commands",
    description: "Frequently used git commands",
    itemCount: 15,
    itemTypeIds: ["type-command", "type-note"],
    defaultTypeId: "type-command",
    isFavorite: true,
    updatedAt: "2026-01-11",
  },
  {
    id: "collection-ai-prompts",
    name: "AI Prompts",
    description: "Curated AI prompts for coding",
    itemCount: 18,
    itemTypeIds: ["type-prompt", "type-snippet", "type-note"],
    defaultTypeId: "type-prompt",
    isFavorite: false,
    updatedAt: "2026-01-10",
  },
];

export const items: MockItem[] = [
  {
    id: "item-useauth-hook",
    title: "useAuth Hook",
    description: "Custom authentication hook for React applications",
    contentType: "text",
    content: "export function useAuth() {\n  // Auth state and helpers\n}",
    url: null,
    fileName: null,
    fileUrl: null,
    language: "tsx",
    itemTypeId: "type-snippet",
    collectionIds: ["collection-react-patterns", "collection-interview-prep"],
    tags: ["react", "auth", "hooks"],
    isFavorite: true,
    isPinned: true,
    lastUsedAt: "2026-01-15",
    createdAt: "2026-01-04",
    updatedAt: "2026-01-15",
  },
  {
    id: "item-api-error-handling",
    title: "API Error Handling Pattern",
    description: "Fetch wrapper with exponential backoff retry logic",
    contentType: "text",
    content: "async function fetchWithRetry(url: string) {\n  // Retry failed requests\n}",
    url: null,
    fileName: null,
    fileUrl: null,
    language: "ts",
    itemTypeId: "type-snippet",
    collectionIds: ["collection-react-patterns"],
    tags: ["api", "errors", "retry"],
    isFavorite: false,
    isPinned: true,
    lastUsedAt: "2026-01-12",
    createdAt: "2026-01-03",
    updatedAt: "2026-01-12",
  },
  {
    id: "item-pr-review-prompt",
    title: "Senior PR Review Prompt",
    description: "Prompt for reviewing correctness, architecture, and risk",
    contentType: "text",
    content: "Review this pull request as a senior engineer. Prioritize bugs, regressions, and missing tests.",
    url: null,
    fileName: null,
    fileUrl: null,
    language: null,
    itemTypeId: "type-prompt",
    collectionIds: ["collection-ai-prompts", "collection-interview-prep"],
    tags: ["ai", "review", "quality"],
    isFavorite: true,
    isPinned: false,
    lastUsedAt: "2026-01-10",
    createdAt: "2026-01-02",
    updatedAt: "2026-01-10",
  },
  {
    id: "item-git-undo-last-commit",
    title: "Undo Last Commit",
    description: "Keep changes staged while removing the last commit",
    contentType: "text",
    content: "git reset --soft HEAD~1",
    url: null,
    fileName: null,
    fileUrl: null,
    language: "bash",
    itemTypeId: "type-command",
    collectionIds: ["collection-git-commands"],
    tags: ["git", "commit", "undo"],
    isFavorite: true,
    isPinned: false,
    lastUsedAt: "2026-01-09",
    createdAt: "2026-01-01",
    updatedAt: "2026-01-09",
  },
  {
    id: "item-next-app-router-notes",
    title: "Next App Router Notes",
    description: "Routing conventions, layouts, and page file reminders",
    contentType: "text",
    content: "Pages live in page.tsx files. Layouts wrap child routes and preserve state.",
    url: null,
    fileName: null,
    fileUrl: null,
    language: "md",
    itemTypeId: "type-note",
    collectionIds: ["collection-react-patterns", "collection-interview-prep"],
    tags: ["nextjs", "routing", "app-router"],
    isFavorite: false,
    isPinned: false,
    lastUsedAt: "2026-01-08",
    createdAt: "2025-12-28",
    updatedAt: "2026-01-08",
  },
  {
    id: "item-project-context",
    title: "DevStash Project Context",
    description: "Main product overview and implementation notes",
    contentType: "file",
    content: null,
    url: null,
    fileName: "project-overview.md",
    fileUrl: "/mock-files/project-overview.md",
    language: "md",
    itemTypeId: "type-file",
    collectionIds: ["collection-context-files"],
    tags: ["context", "product", "planning"],
    isFavorite: true,
    isPinned: false,
    lastUsedAt: "2026-01-07",
    createdAt: "2025-12-26",
    updatedAt: "2026-01-07",
  },
  {
    id: "item-tailwind-docs",
    title: "Tailwind CSS v4 Docs",
    description: "Reference for CSS-first theme configuration",
    contentType: "url",
    content: null,
    url: "https://tailwindcss.com/docs",
    fileName: null,
    fileUrl: null,
    language: null,
    itemTypeId: "type-link",
    collectionIds: ["collection-react-patterns", "collection-interview-prep"],
    tags: ["tailwind", "css", "docs"],
    isFavorite: false,
    isPinned: false,
    lastUsedAt: "2026-01-06",
    createdAt: "2025-12-20",
    updatedAt: "2026-01-06",
  },
];
