import { prisma } from "@/lib/prisma";

type ContentKind = "text" | "url" | "file";

export interface DashboardUser {
  id: string;
  name: string;
  email: string;
  image: string | null;
  isPro: boolean;
}

export interface DashboardItemType {
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

export interface DashboardCollection {
  id: string;
  name: string;
  description: string;
  itemCount: number;
  itemTypeIds: string[];
  defaultTypeId: string | null;
  dominantTypeId: string | null;
  isFavorite: boolean;
  updatedAt: string;
}

export interface DashboardCollectionStats {
  favoriteCollections: number;
  favoriteItems: number;
  totalCollections: number;
  totalItems: number;
}

export interface DashboardCollectionsData {
  collections: DashboardCollection[];
  itemTypes: DashboardItemType[];
  stats: DashboardCollectionStats;
  user: DashboardUser;
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

function getDominantTypeId(
  itemTypeIds: string[],
  defaultTypeId: string | null,
) {
  if (itemTypeIds.length === 0) {
    return defaultTypeId;
  }

  const counts = new Map<string, number>();

  for (const itemTypeId of itemTypeIds) {
    counts.set(itemTypeId, (counts.get(itemTypeId) ?? 0) + 1);
  }

  return [...counts.entries()].sort((first, second) => {
    const countDifference = second[1] - first[1];

    if (countDifference !== 0) {
      return countDifference;
    }

    if (first[0] === defaultTypeId) {
      return -1;
    }

    if (second[0] === defaultTypeId) {
      return 1;
    }

    return first[0].localeCompare(second[0]);
  })[0]?.[0] ?? defaultTypeId;
}

export async function getDashboardCollectionsData(
  userEmail = DEMO_USER_EMAIL,
): Promise<DashboardCollectionsData> {
  const user = await prisma.user.findUnique({
    where: { email: userEmail },
    select: {
      email: true,
      id: true,
      image: true,
      isPro: true,
      name: true,
    },
  });

  if (!user) {
    throw new Error(`Dashboard user ${userEmail} was not found.`);
  }

  const [itemTypes, itemTypeCounts, collections, favoriteItems] =
    await Promise.all([
      prisma.itemType.findMany({
        orderBy: { name: "asc" },
        select: {
          color: true,
          icon: true,
          id: true,
          isSystem: true,
          name: true,
        },
      }),
      prisma.item.groupBy({
        by: ["itemTypeId"],
        where: { userId: user.id },
        _count: { _all: true },
      }),
      prisma.collection.findMany({
        orderBy: { updatedAt: "desc" },
        where: { userId: user.id },
        select: {
          defaultTypeId: true,
          description: true,
          id: true,
          isFavorite: true,
          name: true,
          updatedAt: true,
          items: {
            select: {
              item: {
                select: {
                  itemTypeId: true,
                },
              },
            },
          },
        },
      }),
      prisma.item.count({
        where: {
          isFavorite: true,
          userId: user.id,
        },
      }),
    ]);

  const itemCountsByTypeId = new Map(
    itemTypeCounts.map((itemTypeCount) => [
      itemTypeCount.itemTypeId,
      itemTypeCount._count._all,
    ]),
  );

  const dashboardItemTypes = itemTypes.map((itemType) => {
    const slug = toSlug(itemType.name);

    return {
      color: itemType.color,
      contentKind: getContentKind(slug),
      count: itemCountsByTypeId.get(itemType.id) ?? 0,
      icon: itemType.icon,
      id: itemType.id,
      isPro: isProType(slug),
      isSystem: itemType.isSystem,
      name: itemType.name,
      pluralName: toPluralName(slug),
      slug,
    };
  });

  const dashboardCollections = collections.map((collection) => {
    const itemTypeIds = collection.items.map(({ item }) => item.itemTypeId);
    const uniqueItemTypeIds = [...new Set(itemTypeIds)];

    return {
      defaultTypeId: collection.defaultTypeId,
      description: collection.description ?? "",
      dominantTypeId: getDominantTypeId(itemTypeIds, collection.defaultTypeId),
      id: collection.id,
      isFavorite: collection.isFavorite,
      itemCount: itemTypeIds.length,
      itemTypeIds: uniqueItemTypeIds,
      name: collection.name,
      updatedAt: formatDate(collection.updatedAt),
    };
  });

  return {
    collections: dashboardCollections,
    itemTypes: dashboardItemTypes,
    stats: {
      favoriteCollections: dashboardCollections.filter(
        (collection) => collection.isFavorite,
      ).length,
      favoriteItems,
      totalCollections: dashboardCollections.length,
      totalItems: dashboardCollections.reduce(
        (total, collection) => total + collection.itemCount,
        0,
      ),
    },
    user: {
      email: user.email,
      id: user.id,
      image: user.image,
      isPro: user.isPro,
      name: user.name ?? "Demo User",
    },
  };
}
