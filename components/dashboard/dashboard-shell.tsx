"use client";

import Link from "next/link";
import { type ReactNode, useState } from "react";
import {
  Code2,
  ChevronDown,
  File,
  Folder,
  FolderPlus,
  ImageIcon,
  Layers3,
  LinkIcon,
  Menu,
  PanelLeft,
  Plus,
  Search,
  Settings,
  Sparkles,
  Star,
  StickyNote,
  Terminal,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { MockCollection, MockItemType, MockUser } from "@/src/lib/mock-data";

interface DashboardShellProps {
  collections: MockCollection[];
  itemTypes: MockItemType[];
  user: MockUser;
}

const typeIconMap = {
  Code: Code2,
  File,
  Image: ImageIcon,
  Link: LinkIcon,
  Sparkles,
  StickyNote,
  Terminal,
};

const typeColorClassMap: Record<string, string> = {
  command: "text-orange-400",
  file: "text-slate-400",
  image: "text-pink-400",
  link: "text-emerald-400",
  note: "text-yellow-300",
  prompt: "text-violet-400",
  snippet: "text-blue-400",
};

function getItemsHref(itemType: MockItemType) {
  return `/items/${itemType.pluralName.toLowerCase()}`;
}

function getTypeIcon(itemType: MockItemType) {
  return typeIconMap[itemType.icon as keyof typeof typeIconMap] ?? File;
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function DashboardShell({
  collections,
  itemTypes,
  user,
}: DashboardShellProps) {
  const [isDesktopCollapsed, setIsDesktopCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const favoriteCollections = collections.filter(
    (collection) => collection.isFavorite,
  );
  const recentCollections = [...collections]
    .sort(
      (first, second) =>
        new Date(second.updatedAt).getTime() - new Date(first.updatedAt).getTime(),
    )
    .filter((collection) => !collection.isFavorite)
    .slice(0, 4);

  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <div
        className={cn(
          "grid min-h-screen transition-[grid-template-columns] duration-200",
          isDesktopCollapsed ? "lg:grid-cols-[88px_1fr]" : "lg:grid-cols-[320px_1fr]",
        )}
      >
        <aside
          className="hidden min-h-screen border-r border-border bg-sidebar text-sidebar-foreground lg:flex"
          aria-label="Dashboard sidebar"
        >
          <DashboardSidebar
            collections={recentCollections}
            favoriteCollections={favoriteCollections}
            isCollapsed={isDesktopCollapsed}
            itemTypes={itemTypes}
            user={user}
          />
        </aside>

        {isMobileOpen ? (
          <div className="fixed inset-0 z-50 bg-background/80 lg:hidden">
            <button
              aria-label="Close sidebar"
              className="absolute inset-0 cursor-default"
              type="button"
              onClick={() => setIsMobileOpen(false)}
            />
            <aside
              aria-label="Mobile dashboard sidebar"
              className="relative h-full w-[min(360px,88vw)] border-r border-border bg-sidebar text-sidebar-foreground shadow-2xl"
            >
              <DashboardSidebar
                collections={recentCollections}
                favoriteCollections={favoriteCollections}
                itemTypes={itemTypes}
                onClose={() => setIsMobileOpen(false)}
                user={user}
              />
            </aside>
          </div>
        ) : null}

        <div className="grid min-h-screen grid-rows-[72px_1fr]">
          <header className="flex items-center justify-between gap-4 border-b border-border px-4 md:px-6">
            <div className="flex min-w-0 flex-1 items-center gap-3">
              <button
                aria-label="Open sidebar"
                type="button"
                className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 lg:hidden"
                onClick={() => setIsMobileOpen(true)}
              >
                <Menu className="size-5" />
              </button>
              <button
                aria-label={
                  isDesktopCollapsed ? "Expand sidebar" : "Collapse sidebar"
                }
                type="button"
                className="hidden size-9 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 lg:inline-flex"
                onClick={() => setIsDesktopCollapsed((current) => !current)}
              >
                <PanelLeft className="size-5" />
              </button>
              <div className="relative w-full max-w-md">
                <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  aria-label="Search items"
                  className="h-10 rounded-lg bg-muted/40 pl-9 text-sm"
                  placeholder="Search items..."
                  readOnly
                />
              </div>
            </div>

            <div className="flex items-center gap-2 md:gap-3">
              <Button
                className="hidden h-10 gap-2 md:inline-flex"
                type="button"
                variant="outline"
              >
                <FolderPlus className="size-4" />
                New Collection
              </Button>
              <Button className="h-10 gap-2" type="button">
                <Plus className="size-4" />
                <span className="hidden sm:inline">New Item</span>
              </Button>
            </div>
          </header>

          <section className="p-6 md:p-8">
            <div className="space-y-2">
              <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>
              <p className="text-muted-foreground">
                Your developer knowledge hub
              </p>
            </div>

            <div className="mt-10 rounded-lg border border-dashed border-border bg-card/40 p-8">
              <h2 className="text-2xl font-semibold tracking-tight">Main</h2>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

interface DashboardSidebarProps {
  collections: MockCollection[];
  favoriteCollections: MockCollection[];
  isCollapsed?: boolean;
  itemTypes: MockItemType[];
  onClose?: () => void;
  user: MockUser;
}

function DashboardSidebar({
  collections,
  favoriteCollections,
  isCollapsed = false,
  itemTypes,
  onClose,
  user,
}: DashboardSidebarProps) {
  const [isCollectionsOpen, setIsCollectionsOpen] = useState(true);

  return (
    <div className="flex min-h-0 w-full flex-col">
      <div
        className={cn(
          "flex h-[72px] items-center border-b border-sidebar-border px-4",
          isCollapsed ? "justify-center" : "justify-between",
        )}
      >
        <Link
          className={cn(
            "flex min-w-0 items-center gap-3",
            isCollapsed && "justify-center",
          )}
          href="/dashboard"
        >
          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            <Layers3 className="size-5" />
          </div>
          <span
            className={cn(
              "truncate text-xl font-semibold tracking-tight",
              isCollapsed && "sr-only",
            )}
          >
            DevStash
          </span>
        </Link>

        {onClose ? (
          <button
            aria-label="Close sidebar"
            type="button"
            className="inline-flex size-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-sidebar-ring/50"
            onClick={onClose}
          >
            <X className="size-5" />
          </button>
        ) : null}
      </div>

      <nav className="min-h-0 flex-1 overflow-y-auto px-2 py-5">
        <SidebarSection isCollapsed={isCollapsed} title="Types">
          {itemTypes.map((itemType) => {
            const Icon = getTypeIcon(itemType);

            return (
              <Link
                className={cn(
                  "flex h-10 items-center rounded-lg px-3 text-sm text-sidebar-foreground/80 transition hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  isCollapsed ? "justify-center" : "gap-3",
                )}
                href={getItemsHref(itemType)}
                key={itemType.id}
                title={isCollapsed ? itemType.pluralName : undefined}
              >
                <Icon
                  className={cn(
                    "size-5 shrink-0",
                    typeColorClassMap[itemType.slug],
                  )}
                />
                <span className={cn("truncate", isCollapsed && "sr-only")}>
                  {itemType.pluralName}
                </span>
                <span
                  className={cn(
                    "ml-auto font-mono text-xs text-muted-foreground",
                    isCollapsed && "sr-only",
                  )}
                >
                  {itemType.count}
                </span>
              </Link>
            );
          })}
        </SidebarSection>

        <div className="mt-5 border-t border-sidebar-border pt-5">
          <section className="space-y-2">
            <button
              aria-expanded={isCollectionsOpen}
              aria-label={
                isCollectionsOpen ? "Collapse collections" : "Expand collections"
              }
              className={cn(
                "flex h-8 w-full items-center rounded-lg px-3 text-xs font-medium uppercase tracking-normal text-muted-foreground transition hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-sidebar-ring/50",
                isCollapsed && "justify-center px-0",
              )}
              title={isCollapsed ? "Collections" : undefined}
              type="button"
              onClick={() => setIsCollectionsOpen((current) => !current)}
            >
              <span className={cn(isCollapsed && "sr-only")}>Collections</span>
              <ChevronDown
                className={cn(
                  "ml-auto size-4 transition-transform",
                  !isCollectionsOpen && "-rotate-90",
                  isCollapsed && "ml-0",
                )}
              />
            </button>
            {isCollectionsOpen ? (
              <div className="space-y-1">
                <CollectionGroup
                  collections={favoriteCollections}
                  isCollapsed={isCollapsed}
                  title="Favorites"
                  withStar
                />
                <CollectionGroup
                  collections={collections}
                  isCollapsed={isCollapsed}
                  title="Recent"
                />
              </div>
            ) : null}
          </section>
        </div>
      </nav>

      <div
        className={cn(
          "flex items-center gap-3 border-t border-sidebar-border p-4",
          isCollapsed && "justify-center",
        )}
      >
        <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-foreground text-sm font-semibold text-background">
          {getInitials(user.name)}
        </div>
        <div className={cn("min-w-0 flex-1", isCollapsed && "sr-only")}>
          <p className="truncate text-sm font-medium">{user.name}</p>
          <p className="truncate text-xs text-muted-foreground">{user.email}</p>
        </div>
        <Button
          aria-label="User settings"
          className={cn(isCollapsed && "sr-only")}
          size="icon"
          type="button"
          variant="ghost"
        >
          <Settings className="size-4" />
        </Button>
      </div>
    </div>
  );
}

interface SidebarSectionProps {
  children: ReactNode;
  isCollapsed: boolean;
  title: string;
}

function SidebarSection({ children, isCollapsed, title }: SidebarSectionProps) {
  return (
    <section className="space-y-2">
      <h2
        className={cn(
          "px-3 text-xs font-medium uppercase tracking-normal text-muted-foreground",
          isCollapsed && "sr-only",
        )}
      >
        {title}
      </h2>
      <div className="space-y-1">{children}</div>
    </section>
  );
}

interface CollectionGroupProps {
  collections: MockCollection[];
  isCollapsed: boolean;
  title: string;
  withStar?: boolean;
}

function CollectionGroup({
  collections,
  isCollapsed,
  title,
  withStar = false,
}: CollectionGroupProps) {
  if (collections.length === 0) {
    return null;
  }

  return (
    <div className="space-y-1 pt-2">
      <p
        className={cn(
          "px-3 text-xs font-medium uppercase tracking-normal text-muted-foreground",
          isCollapsed && "sr-only",
        )}
      >
        {title}
      </p>
      {collections.map((collection) => (
        <Link
          className={cn(
            "flex h-10 items-center rounded-lg px-3 text-sm text-sidebar-foreground/80 transition hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
            isCollapsed ? "justify-center" : "gap-3",
          )}
          href={`/collections/${collection.id}`}
          key={collection.id}
          title={isCollapsed ? collection.name : undefined}
        >
          <Folder className="size-5 shrink-0 text-muted-foreground" />
          <span className={cn("truncate", isCollapsed && "sr-only")}>
            {collection.name}
          </span>
          {withStar ? (
            <Star
              className={cn(
                "ml-auto size-4 fill-yellow-400 text-yellow-400",
                isCollapsed && "sr-only",
              )}
            />
          ) : (
            <span
              className={cn(
                "ml-auto font-mono text-xs text-muted-foreground",
                isCollapsed && "sr-only",
              )}
            >
              {collection.itemCount}
            </span>
          )}
        </Link>
      ))}
    </div>
  );
}
