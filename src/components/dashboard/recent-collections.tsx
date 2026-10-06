import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Folder,
  Star,
  MoreHorizontal,
  Code2,
  FileText,
  Terminal,
  Sparkles,
  Link2,
  Files,
  Image as ImageIcon,
} from "lucide-react";
import { mockCollections, mockItems, type Collection } from "@/lib/mock-data";

// Map typeId to icon and color
const typeIconMap: Record<string, { icon: React.ComponentType<{ className?: string }>; color: string }> = {
  type_snippet: { icon: Code2, color: "text-blue-400" },
  type_prompt: { icon: Sparkles, color: "text-purple-400" },
  type_command: { icon: Terminal, color: "text-orange-400" },
  type_note: { icon: FileText, color: "text-amber-400" },
  type_file: { icon: Files, color: "text-zinc-400" },
  type_image: { icon: ImageIcon, color: "text-pink-400" },
  type_link: { icon: Link2, color: "text-teal-400" },
};

// Border accent colors matching the screenshot
const borderAccentMap: Record<string, string> = {
  col_1: "hover:border-blue-500/50 border-blue-500/20",
  col_2: "hover:border-indigo-500/50 border-indigo-500/20",
  col_3: "hover:border-zinc-500/50 border-zinc-500/20",
  col_4: "hover:border-amber-500/50 border-amber-500/20",
  col_5: "hover:border-orange-500/50 border-orange-500/20",
  col_6: "hover:border-purple-500/50 border-purple-500/20",
};

export function RecentCollections() {
  const collections = mockCollections.slice(0, 6);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold tracking-tight">Collections</h2>
        <Link
          href="/collections"
          className="text-xs text-muted-foreground hover:text-foreground transition-colors font-medium"
        >
          View all
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {collections.map((collection) => (
          <CollectionCard key={collection.id} collection={collection} />
        ))}
      </div>
    </div>
  );
}

function CollectionCard({ collection }: { collection: Collection }) {
  // Find distinct item types present in this collection
  const itemsInCollection = mockItems.filter((item) => item.collectionId === collection.id);
  const typeIds = Array.from(new Set(itemsInCollection.map((i) => i.typeId)));
  const accentClass = borderAccentMap[collection.id] || "border-border/80";

  return (
    <Card
      className={`p-4 bg-card/60 backdrop-blur-xs border transition-all duration-200 hover:bg-card group relative flex flex-col justify-between ${accentClass}`}
    >
      <div>
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5 flex-wrap">
              <Link
                href={`/collections/${collection.id}`}
                className="font-semibold text-sm hover:underline truncate"
              >
                {collection.name}
              </Link>
              {collection.isFavorite && (
                <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400 shrink-0" />
              )}
            </div>
            <p className="text-[11px] text-muted-foreground mt-0.5 font-normal">
              {collection.itemCount} items
            </p>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon-xs"
                  className="h-6 w-6 text-muted-foreground hover:text-foreground opacity-60 group-hover:opacity-100 transition-opacity"
                />
              }
            >
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Collection options</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-36">
              <DropdownMenuItem>View items</DropdownMenuItem>
              <DropdownMenuItem>Edit collection</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <p className="text-xs text-muted-foreground/90 mt-2.5 line-clamp-2 leading-relaxed">
          {collection.description}
        </p>
      </div>

      {/* Type Icons at bottom */}
      <div className="flex items-center gap-2 mt-4 pt-2">
        {typeIds.length > 0 ? (
          typeIds.map((typeId) => {
            const config = typeIconMap[typeId];
            if (!config) return null;
            const Icon = config.icon;
            return (
              <div
                key={typeId}
                className="flex items-center justify-center h-5 w-5 rounded bg-muted/40 text-muted-foreground"
                title={typeId.replace("type_", "")}
              >
                <Icon className={`h-3 w-3 ${config.color}`} />
              </div>
            );
          })
        ) : (
          <div className="flex items-center gap-1.5 text-muted-foreground/60">
            <Folder className="h-3.5 w-3.5" />
          </div>
        )}
      </div>
    </Card>
  );
}
