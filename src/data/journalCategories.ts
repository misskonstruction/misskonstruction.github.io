import { Camera, UtensilsCrossed, Palette, BookOpen, Leaf, Plane, type LucideIcon } from "lucide-react";

import coastalImg from "@/assets/blog-coastal.jpg";
import kitchenImg from "@/assets/blog-kitchen.jpg";
import creativeImg from "@/assets/blog-creative.jpg";
import faithImg from "@/assets/blog-faith.jpg";
import reflectionsImg from "@/assets/blog-reflections.jpg";
import wanderImg from "@/assets/blog-wander.jpg";

export type JournalCategory = {
  slug: string;
  title: string;
  emoji: string;
  blurb: string;
  image: string;
  icon: LucideIcon;
};

export const journalCategories: JournalCategory[] = [
  {
    slug: "coastal-photography",
    title: "Coastal Photography",
    emoji: "📷",
    blurb: "Salt air, soft light, and the slow stories the shoreline keeps telling.",
    image: coastalImg,
    icon: Camera,
  },
  {
    slug: "from-the-kitchen",
    title: "From the Kitchen",
    emoji: "🍳",
    blurb: "Recipes scribbled on the backs of envelopes — comfort food, slow Sundays.",
    image: kitchenImg,
    icon: UtensilsCrossed,
  },
  {
    slug: "creative-life",
    title: "Creative Life",
    emoji: "🎨",
    blurb: "Sketchbooks, side projects, and the messy middle of making things.",
    image: creativeImg,
    icon: Palette,
  },
  {
    slug: "faith-scripture",
    title: "Faith & Scripture",
    emoji: "✝️",
    blurb: "Verses I keep returning to, and the quiet places where grace meets the ordinary.",
    image: faithImg,
    icon: BookOpen,
  },
  {
    slug: "reflections",
    title: "Reflections",
    emoji: "🌿",
    blurb: "Field notes from everyday life — gratitude, growth, and small thoughts worth slowing down for.",
    image: reflectionsImg,
    icon: Leaf,
  },
  {
    slug: "wander-roam",
    title: "Wander & Roam",
    emoji: "✈️",
    blurb: "Travel notes from the road and the in-between places — little towns, long drives, the quiet wonder of somewhere new.",
    image: wanderImg,
    icon: Plane,
  },
];

export function findJournalCategory(slug: string): JournalCategory | undefined {
  return journalCategories.find((c) => c.slug === slug);
}

/** Find a category by the WordPress display name (case-insensitive). */
export function findJournalCategoryByName(name: string): JournalCategory | undefined {
  const lc = name.toLowerCase();
  return journalCategories.find((c) => c.title.toLowerCase() === lc);
}
