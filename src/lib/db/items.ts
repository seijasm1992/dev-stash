import { prisma } from "@/lib/prisma";
import type { DashboardItemType } from "@/src/lib/db/collections";

type ContentKind = "text" | "url" | "file";

export interface DashboardItem {
  id: string;
  title: string;
  description: string;
  contentType: ContentKind;
  content: string | null;
  url: string | null;
  fileName: string | null;
  fileUrl: string | null;
  language: string | null;
  itemType: DashboardItemType;
  tags: string[];
  isFavorite: boolean;
  isPinned: boolean;
  lastUsedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface DashboardItemsData {
  pinnedItems: DashboardItem[];
  recentItems: DashboardItem[];
}

const DEMO_USER_EMAIL = "demo@devstash.io";

function toSlug(name: string) {
  return name.toLowerCase();
}

function toPluralName(name: string) {
  if (name === "image") {
    return "Images";
  }

  return `${name.charAt(0).toUpperCase()}${name.slice(1)}s`;
}

function getContentKind(name: string): ContentKind {
  if (name === "link") {
    return "url";
  }

  if (name === "file" || name === "image") {
    return "file";
  }

  return "text";
}

function isProType(name: string) {
  return name === "file" || name === "image";
}

function formatDate(date: Date) {
  return date.toISOString().slice(0, 10);
}

type ItemRecord = Awaited<ReturnType<typeof getDashboardItems>>[number];

function toDashboardItem(item: ItemRecord): DashboardItem {
  const itemTypeSlug = toSlug(item.itemType.name);

  return {
    content: item.content,
    contentType: item.contentType as ContentKind,
    createdAt: formatDate(item.createdAt),
    description: item.description ?? "",
    fileName: item.fileName,
    fileUrl: item.fileUrl,
    id: item.id,
    isFavorite: item.isFavorite,
    isPinned: item.isPinned,
    itemType: {
      color: item.itemType.color,
      contentKind: getContentKind(itemTypeSlug),
      count: 0,
      icon: item.itemType.icon,
      id: item.itemType.id,
      isPro: isProType(itemTypeSlug),
      isSystem: item.itemType.isSystem,
      name: item.itemType.name,
      pluralName: toPluralName(itemTypeSlug),
      slug: itemTypeSlug,
    },
    language: item.language,
    lastUsedAt: item.lastUsedAt ? formatDate(item.lastUsedAt) : null,
    tags: item.tags.map(({ tag }) => tag.name),
    title: item.title,
    updatedAt: formatDate(item.updatedAt),
    url: item.url,
  };
}

const dashboardItemSelect = {
  content: true,
  contentType: true,
  createdAt: true,
  description: true,
  fileName: true,
  fileUrl: true,
  id: true,
  isFavorite: true,
  isPinned: true,
  itemType: {
    select: {
      color: true,
      icon: true,
      id: true,
      isSystem: true,
      name: true,
    },
  },
  language: true,
  lastUsedAt: true,
  tags: {
    select: {
      tag: {
        select: {
          name: true,
        },
      },
    },
  },
  title: true,
  updatedAt: true,
  url: true,
} as const;

async function getDashboardItems(userId: string) {
  return prisma.item.findMany({
    orderBy: [{ lastUsedAt: "desc" }, { updatedAt: "desc" }],
    take: 10,
    where: { userId },
    select: dashboardItemSelect,
  });
}

async function getDashboardPinnedItems(userId: string) {
  return prisma.item.findMany({
    orderBy: [{ lastUsedAt: "desc" }, { updatedAt: "desc" }],
    where: {
      isPinned: true,
      userId,
    },
    select: dashboardItemSelect,
  });
}

export async function getDashboardItemsData(
  userEmail = DEMO_USER_EMAIL,
): Promise<DashboardItemsData> {
  const user = await prisma.user.findUnique({
    where: { email: userEmail },
    select: { id: true },
  });

  if (!user) {
    throw new Error(`Dashboard user ${userEmail} was not found.`);
  }

  const [items, pinnedItems] = await Promise.all([
    getDashboardItems(user.id),
    getDashboardPinnedItems(user.id),
  ]);
  const dashboardItems = items.map(toDashboardItem);

  return {
    pinnedItems: pinnedItems.map(toDashboardItem),
    recentItems: dashboardItems,
  };
}
