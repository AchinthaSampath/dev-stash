import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Pin,
  Star,
  Code2,
  Sparkles,
  Terminal,
  FileText,
  Files,
  Image as ImageIcon,
  Link2,
} from "lucide-react";
import { mockItems, mockTags, type Item } from "@/lib/mock-data";

const typeIconMap: Record<
  string,
  {
    icon: React.ComponentType<{ className?: string }>;
    color: string;
    bgColor: string;
  }
> = {
  type_snippet: {
    icon: Code2,
    color: "text-blue-400",
    bgColor: "bg-blue-950/40 border-blue-800/30",
  },
  type_prompt: {
    icon: Sparkles,
    color: "text-purple-400",
    bgColor: "bg-purple-950/40 border-purple-800/30",
  },
  type_command: {
    icon: Terminal,
    color: "text-orange-400",
    bgColor: "bg-orange-950/40 border-orange-800/30",
  },
  type_note: {
    icon: FileText,
    color: "text-amber-400",
    bgColor: "bg-amber-950/40 border-amber-800/30",
  },
  type_file: {
    icon: Files,
    color: "text-zinc-400",
    bgColor: "bg-zinc-900 border-zinc-800",
  },
  type_image: {
    icon: ImageIcon,
    color: "text-pink-400",
    bgColor: "bg-pink-950/40 border-pink-800/30",
  },
  type_link: {
    icon: Link2,
    color: "text-teal-400",
    bgColor: "bg-teal-950/40 border-teal-800/30",
  },
};

export function PinnedItems() {
  const pinnedItems = mockItems.filter((item) => item.isPinned);

  if (pinnedItems.length === 0) return null;

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Pin className="h-4 w-4 text-muted-foreground rotate-45" />
        <h2 className="text-base font-semibold tracking-tight">Pinned</h2>
      </div>

      <div className="space-y-2.5">
        {pinnedItems.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

export function ItemCard({ item }: { item: Item }) {
  const typeConfig = typeIconMap[item.typeId] || {
    icon: Code2,
    color: "text-blue-400",
    bgColor: "bg-muted border-border",
  };
  const Icon = typeConfig.icon;

  // Resolve tags
  const itemTags = item.tags
    .map((tagId) => mockTags.find((t) => t.id === tagId))
    .filter(Boolean);

  const formattedDate = item.createdAt.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  return (
    <Card className="p-4 bg-card/60 backdrop-blur-xs border border-border/80 hover:border-border hover:bg-card transition-all duration-200">
      <div className="flex items-start gap-3.5">
        {/* Type Icon */}
        <div
          className={`flex items-center justify-center h-9 w-9 rounded-lg border shrink-0 ${typeConfig.bgColor}`}
        >
          <Icon className={`h-4 w-4 ${typeConfig.color}`} />
        </div>

        {/* Item Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2 flex-wrap">
              <Link
                href={`/items/${item.id}`}
                className="font-semibold text-sm hover:underline"
              >
                {item.title}
              </Link>
              {item.isPinned && (
                <Pin className="h-3 w-3 text-muted-foreground rotate-45 shrink-0" />
              )}
              {item.isFavorite && (
                <Star className="h-3 w-3 fill-amber-400 text-amber-400 shrink-0" />
              )}
            </div>
            <span className="text-xs text-muted-foreground shrink-0 font-normal">
              {formattedDate}
            </span>
          </div>

          {item.description && (
            <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
              {item.description}
            </p>
          )}

          {/* Tags */}
          {itemTags.length > 0 && (
            <div className="flex items-center gap-1.5 mt-3 flex-wrap">
              {itemTags.map((tag) => (
                <Badge
                  key={tag?.id}
                  variant="secondary"
                  className="text-[11px] font-normal px-2 py-0.5 rounded bg-muted/60 text-muted-foreground hover:text-foreground"
                >
                  {tag?.name}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
