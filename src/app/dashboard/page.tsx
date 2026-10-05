import { Search, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  return (
    <div className="flex h-screen flex-col">
      {/* Top Bar */}
      <header className="border-b border-border bg-background">
        <div className="flex h-14 items-center gap-4 px-6">
          {/* Search */}
          <div className="relative flex-1 max-w-2xl">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search items..."
              className="pl-9 pr-4"
            />
            <kbd className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
              <span className="text-xs">⌘</span>K
            </kbd>
          </div>

          {/* New Item Button */}
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Item
          </Button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Placeholder */}
        <aside className="w-64 border-r border-border bg-background p-4">
          <h2 className="text-lg font-semibold">Sidebar</h2>
        </aside>

        {/* Main Area Placeholder */}
        <main className="flex-1 overflow-auto p-6">
          <h2 className="text-lg font-semibold">Main</h2>
        </main>
      </div>
    </div>
  );
}
