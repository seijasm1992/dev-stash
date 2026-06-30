import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { collections, currentUser, itemTypes } from "@/src/lib/mock-data";

export default function DashboardPage() {
  return (
    <DashboardShell
      collections={collections}
      itemTypes={itemTypes}
      user={currentUser}
    />
  );
}
