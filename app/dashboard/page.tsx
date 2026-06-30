import { FolderPlus, Layers3, Plus, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="grid min-h-screen grid-cols-[280px_1fr]">
        <aside className="flex min-h-screen flex-col border-r border-border bg-sidebar text-sidebar-foreground">
          <div className="flex h-[72px] items-center gap-3 border-b border-sidebar-border px-5">
            <div className="flex size-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Layers3 className="size-5" />
            </div>
            <span className="text-xl font-semibold tracking-tight">
              DevStash
            </span>
          </div>

          <div className="flex flex-1 items-start p-6">
            <h2 className="text-lg font-semibold tracking-tight">Sidebar</h2>
          </div>
        </aside>

        <div className="grid min-h-screen grid-rows-[72px_1fr]">
          <header className="flex items-center justify-between border-b border-border px-6">
            <div className="relative w-full max-w-md">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                aria-label="Search items"
                className="h-10 rounded-lg bg-muted/40 pl-9 text-sm"
                placeholder="Search items..."
                readOnly
              />
            </div>

            <div className="flex items-center gap-3">
              <Button className="h-10 gap-2" type="button" variant="outline">
                <FolderPlus className="size-4" />
                New Collection
              </Button>
              <Button className="h-10 gap-2" type="button">
                <Plus className="size-4" />
                New Item
              </Button>
            </div>
          </header>

          <section className="p-8">
            <h2 className="text-2xl font-semibold tracking-tight">Main</h2>
          </section>
        </div>
      </div>
    </main>
  );
}
