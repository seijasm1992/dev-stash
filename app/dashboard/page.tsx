import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import type { DashboardCollectionsData } from "@/src/lib/db/collections";
import { getDashboardCollectionsData } from "@/src/lib/db/collections";
import type { DashboardItemsData } from "@/src/lib/db/items";
import { getDashboardItemsData } from "@/src/lib/db/items";
import { connection } from "next/server";

export const dynamic = "force-dynamic";

const emptyCollectionsData: DashboardCollectionsData = {
  collections: [],
  itemTypes: [],
  stats: {
    favoriteCollections: 0,
    favoriteItems: 0,
    totalCollections: 0,
    totalItems: 0,
  },
  user: {
    email: "demo@devstash.io",
    id: "demo",
    image: null,
    isPro: false,
    name: "Demo User",
  },
};

const emptyItemsData: DashboardItemsData = {
  pinnedItems: [],
  recentItems: [],
};

export default async function DashboardPage() {
  await connection();

  let collectionsData = emptyCollectionsData;
  let itemsData = emptyItemsData;

  try {
    [collectionsData, itemsData] = await Promise.all([
      getDashboardCollectionsData(),
      getDashboardItemsData(),
    ]);
  } catch (error) {
    console.error("[dashboard] Failed to load dashboard data", error);
  }

  return (
    <DashboardShell
      collections={collectionsData.collections}
      itemTypes={collectionsData.itemTypes}
      pinnedItems={itemsData.pinnedItems}
      recentItems={itemsData.recentItems}
      stats={collectionsData.stats}
      user={collectionsData.user}
    />
  );
}
