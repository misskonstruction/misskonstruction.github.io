/**
 * Prayer Studies registry.
 *
 * To add a new prayer study:
 *   1. Add an entry below with a unique `slug`.
 *   2. (Optional) Drop a hero image into `src/assets/prayer-{slug}.jpg`
 *      and import it. If omitted, the shared candlelight hero is used.
 *   3. Create a route file `src/routes/prayers.{slug}.tsx` that renders
 *      <PrayerPage prayer={getPrayer("{slug}")!} />.
 *
 * The Faith & Scripture category page automatically lists every prayer
 * whose `categorySlug` matches.
 */

import candlelightHero from "@/assets/prayer-candlelight-hero.jpg";

export type PrayerScripture = {
  /** e.g. "Philippians 4:6–7" */
  reference: string;
  /** The verse text. */
  text: string;
  /** Optional translation tag, e.g. "ESV", "NIV". */
  translation?: string;
};

export type Prayer = {
  /** URL slug — also the route filename. */
  slug: string;
  /** Which blog category this prayer lives under. */
  categorySlug: string;
  /** Short kicker above the title in handwriting font. */
  kicker: string;
  /** Title — `**bold**` segments render in primary italic. */
  title: string;
  /** Author of the prayer / study (e.g. "Ruth D. Calk"). */
  author: string;
  /** Optional short attribution line, e.g. "shared by my mother". */
  attribution?: string;
  /** Italic intro / dedication line under the hero. */
  intro: string;
  /** Hero image import. Defaults to the shared candlelight hero. */
  heroImage?: string;
  heroAlt?: string;
  /** Optional featured scripture shown as a callout above the prayer body. */
  scripture?: PrayerScripture;
  /**
   * The body of the prayer / study. An array of paragraphs, rendered with
   * generous spacing. Use blank strings sparingly to add visual breathing room.
   */
  body: string[];
  /** Closing reflection / meditation section. */
  reflection: {
    /** Small heading, e.g. "to sit with". */
    kicker: string;
    /** Heading, e.g. "A Reflection". */
    heading: string;
    /** One or more paragraphs of reflection. */
    paragraphs: string[];
  };
  /** SEO meta description. */
  description: string;
};

export const prayers: Prayer[] = [
  // Prayers will be added here as you share them.
  // The first entry — Ruth D. Calk's prayer study — will go here once
  // you paste the text.
];

export function getPrayer(slug: string): Prayer | undefined {
  return prayers.find((p) => p.slug === slug);
}

export function getPrayersByCategory(categorySlug: string): Prayer[] {
  return prayers.filter((p) => p.categorySlug === categorySlug);
}

/** The shared candlelight hero, available for category pages and previews. */
export const prayerSharedHero = candlelightHero;
