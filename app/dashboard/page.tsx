import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { getDashboardCollectionsData } from "@/src/lib/db/collections";
import { getDashboardItemsData } from "@/src/lib/db/items";
import { connection } from "next/server";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  await connection();

  const [collectionsData, itemsData] = await Promise.all([
    getDashboardCollectionsData(),
    getDashboardItemsData(),
  ]);

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
