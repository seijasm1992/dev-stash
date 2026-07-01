import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { getDashboardCollectionsData } from "@/src/lib/db/collections";
import { connection } from "next/server";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  await connection();

  const dashboardData = await getDashboardCollectionsData();

  return (
    <DashboardShell
      collections={dashboardData.collections}
      itemTypes={dashboardData.itemTypes}
      stats={dashboardData.stats}
      user={dashboardData.user}
    />
  );
}
