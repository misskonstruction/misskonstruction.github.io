import { Camera, UtensilsCrossed, Fish, BookOpen, Leaf, Plane, Feather, Heart, Activity, type LucideIcon } from "lucide-react";

import coastalImg from "@/assets/blog-coastal.jpg";
import kitchenImg from "@/assets/blog-kitchen.jpg";
import platysImg from "@/assets/blog-platys.jpg";
import faithImg from "@/assets/blog-faith.jpg";
import reflectionsImg from "@/assets/blog-reflections.jpg";
import wanderImg from "@/assets/blog-wander.jpg";
import rawUnhingedImg from "@/assets/raw-unhinged/category-card.jpg";
import blitzMemorialImg from "@/assets/blog-blitz-memorial.jpg";
import bodyBonesImg from "@/assets/blog-body-and-bones.jpg";

export type JournalCategory = {
  slug: string;
  title: string;
  emoji: string;
  blurb: string;
  image: string;
  icon: LucideIcon;
  /** Alternate WordPress category names that should resolve to this category. */
  aliases?: string[];
};

export const journalCategories: JournalCategory[] = [
  {
    slug: "coastal-photography",
    title: "Coastal Photography",
    emoji: "📷",
    blurb: "Salt air, soft light, and the slow stories the shoreline keeps telling.",
    image: coastalImg,
    icon: Camera,
    aliases: ["coastal", "photography", "coastal photo"],
  },
  {
    slug: "from-the-kitchen",
    title: "From the Kitchen",
    emoji: "🍳",
    blurb: "Recipes scribbled on the backs of envelopes — comfort food, slow Sundays.",
    image: kitchenImg,
    icon: UtensilsCrossed,
    aliases: ["kitchen", "recipes", "food"],
  },
  {
    slug: "platy-pals",
    title: "Platy Pals",
    emoji: "🐠",
    blurb: "An accidental little fish family — progress updates, fry milestones, and when sweet platys are ready to rehome.",
    image: platysImg,
    icon: Fish,
    aliases: ["platy", "platys", "platy pals", "fish"],
  },
  {
    slug: "faith-scripture",
    title: "Faith & Scripture",
    emoji: "✝️",
    blurb: "Verses I keep returning to, and the quiet places where grace meets the ordinary.",
    image: faithImg,
    icon: BookOpen,
    aliases: ["faith", "scripture", "faith and scripture"],
  },
  {
    slug: "reflections",
    title: "Reflections",
    emoji: "🌿",
    blurb: "Field notes from everyday life — gratitude, growth, and small thoughts worth slowing down for.",
    image: reflectionsImg,
    icon: Leaf,
    aliases: ["reflection"],
  },
  {
    slug: "wander-roam",
    title: "Wander & Roam",
    emoji: "✈️",
    blurb: "Travel notes from the road and the in-between places — little towns, long drives, the quiet wonder of somewhere new.",
    image: wanderImg,
    icon: Plane,
    aliases: ["wander", "roam", "wander and roam", "travel"],
  },
  {
    slug: "raw-and-unhinged",
    title: "Raw & Unhinged",
    emoji: "🕯️",
    blurb: "Unfiltered, handwritten pages from my desk — the thoughts that don't fit anywhere else. Photos of actual ink on actual paper.",
    image: rawUnhingedImg,
    icon: Feather,
    aliases: ["raw", "unhinged", "raw and unhinged", "the longhand"],
  },
  {
    slug: "in-loving-memory-of-blitz",
    title: "In Loving Memory of Blitz",
    emoji: "🕊️",
    blurb:
      "For my faithful girl — the service dog who carried me through everything. Her stories, her stubborn joy, and the space she left behind.",
    image: blitzMemorialImg,
    icon: Heart,
    aliases: [
      "blitz",
      "in loving memory",
      "in loving memory of blitz",
      "loving memory of blitz",
      "memory of blitz",
    ],
  },
];

/**
 * Per-post category overrides — used when a WordPress post is mis-categorized
 * (e.g. left in the old "Creative Life" category that was renamed to Platy Pals).
 * Maps WordPress post slug → the category slug it should actually appear under.
 */
export const postCategoryOverrides: Record<string, string> = {
  "sibling-squabbles-in-the-cypress-tops": "coastal-photography",
  "test-post": "coastal-photography", // "Stillness on the Gulf"
};

/** Resolve the journal category a post should actually appear under. */
export function effectiveJournalCategoryFor(post: {
  slug: string;
  categories: string[];
}): JournalCategory | undefined {
  const override = postCategoryOverrides[post.slug];
  if (override) return findJournalCategory(override);
  for (const name of post.categories) {
    const match = journalCategories.find((c) => journalCategoryMatches(name, c));
    if (match) return match;
  }
  return undefined;
}

function normalizeJournalCategory(value: string): string {
  return value
    .replace(/&amp;/gi, "&")
    .replace(/\band\b/gi, "&")
    .replace(/[^a-z0-9]+/gi, " ")
    .trim()
    .toLowerCase();
}

export function journalCategoryMatches(categoryName: string, category: JournalCategory): boolean {
  const normalized = normalizeJournalCategory(categoryName);
  if (normalized === normalizeJournalCategory(category.title)) return true;
  if (normalized === normalizeJournalCategory(category.slug)) return true;
  return (category.aliases ?? []).some(
    (alias) => normalized === normalizeJournalCategory(alias),
  );
}

export function findJournalCategory(slug: string): JournalCategory | undefined {
  return journalCategories.find((c) => c.slug === slug);
}

/** Find a category by the WordPress display name (case-insensitive). */
export function findJournalCategoryByName(name: string): JournalCategory | undefined {
  return journalCategories.find((c) => journalCategoryMatches(name, c));
}
