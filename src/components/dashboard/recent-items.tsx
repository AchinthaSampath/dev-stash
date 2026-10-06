import Link from "next/link";
import { Clock } from "lucide-react";
import { mockItems } from "@/lib/mock-data";
import { ItemCard } from "./pinned-items";

export function RecentItems() {
  // Sort by updatedAt descending and take up to 10
  const recentItems = [...mockItems]
    .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
    .slice(0, 10);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <h2 className="text-base font-semibold tracking-tight">Recent Items</h2>
        </div>
        <Link
          href="/items"
          className="text-xs text-muted-foreground hover:text-foreground transition-colors font-medium"
        >
          View all
        </Link>
      </div>

      <div className="space-y-2.5">
        {recentItems.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
