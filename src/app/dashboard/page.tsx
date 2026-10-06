"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  Plus,
  PanelLeft,
  FolderPlus,
  Layers,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sidebar } from "@/components/dashboard/sidebar";
import { MobileSidebar } from "@/components/dashboard/mobile-sidebar";

export default function DashboardPage() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen flex-col bg-background text-foreground overflow-hidden">
      {/* Top Navigation Bar */}
      <header className="h-14 border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 flex items-center justify-between px-4 z-20 shrink-0">
        <div className="flex items-center gap-3">
          {/* Logo & Brand */}
          <Link href="/dashboard" className="flex items-center gap-2.5 mr-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-purple-600 via-indigo-600 to-blue-500 shadow-sm">
              <Layers className="h-4 w-4 text-white" />
            </div>
            <span className="font-bold text-base tracking-tight hidden sm:inline-block">
              DevStash
            </span>
          </Link>

          {/* Sidebar Drawer Toggle Button (Desktop & Mobile) */}
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => {
              // On mobile, toggle mobile drawer sheet
              if (window.innerWidth < 768) {
                setIsMobileSidebarOpen(true);
              } else {
                // On desktop, collapse/expand sidebar
                setIsSidebarCollapsed(!isSidebarCollapsed);
              }
            }}
            className="text-muted-foreground hover:text-foreground"
            title="Toggle Sidebar"
          >
            <PanelLeft className="h-4 w-4" />
            <span className="sr-only">Toggle Sidebar</span>
          </Button>

          {/* Search Bar */}
          <div className="relative w-64 md:w-96">
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search items..."
              className="pl-8 pr-12 h-8 text-xs bg-muted/40 border-border/80 focus:bg-background"
            />
            <kbd className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 hidden h-4 select-none items-center gap-0.5 rounded border border-border bg-muted/60 px-1 font-mono text-[9px] font-medium text-muted-foreground sm:flex">
              <span className="text-[10px]">⌘</span>K
            </kbd>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="h-8 gap-1.5 text-xs font-medium border-border/80 hover:bg-accent"
          >
            <FolderPlus className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">New Collection</span>
          </Button>
          <Button
            size="sm"
            className="h-8 gap-1.5 text-xs font-medium bg-foreground text-background hover:bg-foreground/90"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>New Item</span>
          </Button>
        </div>
      </header>

      {/* Main Workspace Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Desktop Collapsible Sidebar */}
        <div className="hidden md:block h-full shrink-0">
          <Sidebar
            isCollapsed={isSidebarCollapsed}
            onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          />
        </div>

        {/* Mobile Drawer Sidebar */}
        <MobileSidebar
          open={isMobileSidebarOpen}
          onOpenChange={setIsMobileSidebarOpen}
        />

        {/* Main Content Area Placeholder (Phase 3) */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-background">
          <div className="max-w-7xl mx-auto space-y-8">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
              <p className="text-sm text-muted-foreground mt-0.5">
                Your developer knowledge hub
              </p>
            </div>

            {/* Placeholder notification for Phase 3 */}
            <div className="rounded-lg border border-dashed border-border/70 p-8 text-center text-muted-foreground">
              <p className="text-sm font-medium">
                Collections grid and Pinned items will be implemented in Phase 3.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
