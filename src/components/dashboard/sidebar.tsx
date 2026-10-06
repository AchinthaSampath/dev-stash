"use client";

import Link from "next/link";
import { cn } from "cn";
import {
  Code2,
  Sparkles,
  Terminal,
  FileText,
  Files,
  Image as ImageIcon,
  Link2,
  Folder,
  Star,
  Settings,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { mockItemTypes, mockCollections, mockUser } from "@/lib/mock-data";

// Custom icons mapping and colors matching the screenshot
const typeIconMap: Record<string, { icon: React.ComponentType<{ className?: string }>; color: string; count: number }> = {
  type_snippet: { icon: Code2, color: "text-blue-400", count: 24 },
  type_prompt: { icon: Sparkles, color: "text-purple-400", count: 18 },
  type_command: { icon: Terminal, color: "text-orange-400", count: 15 },
  type_note: { icon: FileText, color: "text-amber-400", count: 12 },
  type_file: { icon: Files, color: "text-zinc-400", count: 5 },
  type_image: { icon: ImageIcon, color: "text-pink-400", count: 3 },
  type_link: { icon: Link2, color: "text-teal-400", count: 8 },
};

interface SidebarProps {
  isCollapsed: boolean;
  onToggle?: () => void;
  className?: string;
}

export function Sidebar({ isCollapsed, className }: SidebarProps) {
  const favoriteCollections = mockCollections.filter((c) => c.isFavorite);
  const otherCollections = mockCollections.filter((c) => !c.isFavorite);

  return (
    <aside
      className={cn(
        "h-full border-r border-border bg-sidebar transition-all duration-300 flex flex-col select-none",
        isCollapsed ? "w-16" : "w-64",
        className
      )}
    >
      <ScrollArea className="flex-1">
        <div className="p-3 space-y-6">
          {/* Types Section */}
          <div>
            {!isCollapsed ? (
              <button
                type="button"
                className="flex items-center gap-1 px-2 mb-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors w-full text-left group"
              >
                <span>Types</span>
                <ChevronDown className="h-3.5 w-3.5 text-muted-foreground transition-transform group-hover:text-foreground" />
              </button>
            ) : (
              <div className="h-4" />
            )}
            <nav className="space-y-0.5">
              {mockItemTypes.map((type) => {
                const config = typeIconMap[type.id] || {
                  icon: Code2,
                  color: "text-blue-400",
                  count: 0,
                };
                const Icon = config.icon;

                return (
                  <Link
                    key={type.id}
                    href={`/items/${type.name.toLowerCase()}`}
                    title={isCollapsed ? type.name : undefined}
                  >
                    <div
                      className={cn(
                        "flex items-center rounded-md px-2 py-1.5 text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors cursor-pointer group",
                        isCollapsed ? "justify-center px-0" : "justify-between"
                      )}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <Icon
                          className={cn("h-4 w-4 shrink-0", config.color)}
                        />
                        {!isCollapsed && (
                          <span className="truncate text-[13px]">
                            {type.name}
                          </span>
                        )}
                      </div>
                      {!isCollapsed && (
                        <span className="text-xs text-muted-foreground/80 font-normal">
                          {config.count}
                        </span>
                      )}
                    </div>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Collections Section */}
          {!isCollapsed && (
            <div className="space-y-4">
              <button
                type="button"
                className="flex items-center gap-1 px-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors w-full text-left group"
              >
                <span>Collections</span>
                <ChevronDown className="h-3.5 w-3.5 text-muted-foreground transition-transform group-hover:text-foreground" />
              </button>

              {/* Favorites */}
              <div className="space-y-1">
                <div className="px-2 text-[10px] font-semibold tracking-wider text-muted-foreground/60 uppercase">
                  Favorites
                </div>
                <nav className="space-y-0.5">
                  {favoriteCollections.map((collection) => (
                    <Link
                      key={collection.id}
                      href={`/collections/${collection.id}`}
                    >
                      <div className="flex items-center justify-between rounded-md px-2 py-1.5 text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors cursor-pointer group">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <Folder className="h-4 w-4 shrink-0 text-muted-foreground" />
                          <span className="truncate text-[13px]">
                            {collection.name}
                          </span>
                        </div>
                        <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400 shrink-0" />
                      </div>
                    </Link>
                  ))}
                </nav>
              </div>

              {/* All Collections / Other */}
              <div className="space-y-1">
                <div className="px-2 text-[10px] font-semibold tracking-wider text-muted-foreground/60 uppercase">
                  All Collections
                </div>
                <nav className="space-y-0.5">
                  {otherCollections.map((collection) => (
                    <Link
                      key={collection.id}
                      href={`/collections/${collection.id}`}
                    >
                      <div className="flex items-center justify-between rounded-md px-2 py-1.5 text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors cursor-pointer group">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <Folder className="h-4 w-4 shrink-0 text-muted-foreground" />
                          <span className="truncate text-[13px]">
                            {collection.name}
                          </span>
                        </div>
                        <span className="text-xs text-muted-foreground/80 font-normal">
                          {collection.itemCount}
                        </span>
                      </div>
                    </Link>
                  ))}
                </nav>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Storage meter and User section */}
      <div className="border-t border-border p-3 space-y-3">
        {!isCollapsed && (
          <div className="space-y-1 px-1">
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
              <div className="h-full w-[70%] rounded-full bg-muted-foreground/50" />
            </div>
          </div>
        )}

        <div
          className={cn(
            "flex items-center gap-2.5",
            isCollapsed && "justify-center"
          )}
        >
          <Avatar size="sm" className="h-8 w-8 bg-zinc-200 dark:bg-zinc-100 text-zinc-900 font-semibold text-xs flex items-center justify-center">
            <AvatarFallback className="bg-zinc-200 dark:bg-zinc-100 text-zinc-900 font-medium">
              JD
            </AvatarFallback>
          </Avatar>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-foreground truncate">
                {mockUser.name}
              </p>
              <p className="text-[11px] text-muted-foreground truncate">
                {mockUser.email}
              </p>
            </div>
          )}
          {!isCollapsed && (
            <Button
              variant="ghost"
              size="icon-xs"
              className="text-muted-foreground hover:text-foreground h-7 w-7"
            >
              <Settings className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </aside>
  );
}
