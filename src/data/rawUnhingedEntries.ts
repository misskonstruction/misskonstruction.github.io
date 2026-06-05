import winstonAsset from "@/assets/raw-unhinged/entry-winston-sketch.jpg.asset.json";

export type RawUnhingedEntry = {
  /** Stable id used in URLs / TOC keys. */
  id: string;
  /** ISO date — used for sorting and the date stamp on the page. */
  date: string;
  /** Short one-line description shown in the Table of Contents (acts as title). */
  title: string;
  /**
   * Photo(s) of the actual handwritten entry / sketch. One per left-hand page.
   * The first one is the "cover" image of the entry. Multiple = consecutive
   * left pages, in order.
   */
  entryImages: { src: string; alt: string }[];
  /**
   * Optional accompanying photos that sit on the right-hand page across from
   * the entry image. 1 = single mounted photo. 2+ = scrapbook collage.
   */
  rightPagePhotos?: { src: string; alt: string }[];
  /**
   * Optional photos that appear on a dedicated final spread for this entry
   * (i.e. after all entry pages). Use when the photos should land "at the end"
   * rather than alongside the entry.
   */
  finalPagePhotos?: { src: string; alt: string }[];
};

/**
 * Entries are listed newest-first. Add new entries at the top of this list.
 */
export const rawUnhingedEntries: RawUnhingedEntry[] = [
  {
    id: "winston",
    date: "2026-06-05",
    title: "Winston — an unfinished sketch of an old friend",
    entryImages: [
      {
        src: winstonAsset.url,
        alt: "Pencil sketch of Winston, a ginger tabby cat with a paw-print collar tag, in a sketchbook with the reference photo paper-clipped at the top corner",
      },
    ],
  },
];

export function formatEntryDate(iso: string): string {
  try {
    const d = new Date(iso + "T12:00:00");
    return d.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

export function formatEntryDateShort(iso: string): string {
  try {
    const d = new Date(iso + "T12:00:00");
    return d.toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}
