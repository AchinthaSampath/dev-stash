import { Card } from "@/components/ui/card";
import { Layers, Folder, Star, Heart } from "lucide-react";
import { mockItems, mockCollections, getFavoriteItems, getFavoriteCollections } from "@/lib/mock-data";

export function StatsCards() {
  const totalItems = mockItems.length;
  const totalCollections = mockCollections.length;
  const favoriteItems = getFavoriteItems().length;
  const favoriteCollections = getFavoriteCollections().length;

  const stats = [
    {
      title: "Total Items",
      value: totalItems,
      icon: Layers,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Collections",
      value: totalCollections,
      icon: Folder,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
    {
      title: "Favorite Items",
      value: favoriteItems,
      icon: Heart,
      color: "text-pink-500",
      bgColor: "bg-pink-500/10",
    },
    {
      title: "Favorite Collections",
      value: favoriteCollections,
      icon: Star,
      color: "text-amber-500",
      bgColor: "bg-amber-500/10",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title} className="p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
              <div className={`flex items-center justify-center h-10 w-10 rounded-lg ${stat.bgColor}`}>
                <Icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold mt-0.5">{stat.value}</p>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
