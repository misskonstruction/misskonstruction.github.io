import winstonSketch from "@/assets/raw-unhinged/entry-winston-sketch.jpg";
import letsDoThis from "@/assets/raw-unhinged/entry-lets-do-this.jpg";
import myFaithfulBlitz from "@/assets/raw-unhinged/entry-my-faithful-blitz.jpg";
import blitzWagonDoorway from "@/assets/raw-unhinged/blitz-wagon-doorway.jpg";
import blitzWagonRoad from "@/assets/raw-unhinged/blitz-wagon-road.jpg";
import entry610Page1 from "@/assets/raw-unhinged/6-10_entry_page1.jpg.asset.json";
import entry610Page2 from "@/assets/raw-unhinged/6-10_entry_page2.jpg.asset.json";
import entry610Page3 from "@/assets/raw-unhinged/6-10_entry_page3.jpg.asset.json";
import collageDog1 from "@/assets/raw-unhinged/collage-dog1.jpg.asset.json";
import collageDog2 from "@/assets/raw-unhinged/collage-dog2.jpg.asset.json";
import collageMe3 from "@/assets/raw-unhinged/collage-me3.jpg.asset.json";

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
  /**
   * Optional companion YouTube short. Rendered as a small "polaroid" tucked
   * into the right-hand scrapbook page with a hand-drawn play triangle.
   * Tapping it opens a candlelit modal with the embedded short.
   */
  videoShort?: {
    youtubeId: string;
    caption?: string;
    /** Optional poster image (defaults to YouTube's auto thumbnail). */
    poster?: string;
  };
};

/**
 * Entries are listed newest-first. Add new entries at the top of this list.
 */
export const rawUnhingedEntries: RawUnhingedEntry[] = [
  {
    id: "counting-down-at-631-am",
    date: "2026-06-10",
    title: "It’s 6:31 a.m. — exhausted and counting down",
    entryImages: [
      {
        src: entry610Page1.url,
        alt: "First handwritten journal page dated 6/10/26 — Cami writing at 6:31 a.m. before her shift about exhaustion, pain, broken sleep, and waking up to care for Blitz.",
      },
      {
        src: entry610Page2.url,
        alt: "Second handwritten journal page continuing the 6/10/26 entry — Cami writing about sleep struggles, sensory overload, waking repeatedly through the night, and feeling anxious while counting down the hours before work.",
      },
      {
        src: entry610Page3.url,
        alt: "Third handwritten journal page continuing the 6/10/26 entry — Cami writing about setting Blitz up beside her desk, worrying about family changes and losses, and finding meaning in carrying part of her dad with her.",
      },
    ],
    finalPagePhotos: [
      {
        src: collageDog2.url,
        alt: "Kylo standing under Cami’s desk beside a glowing keyboard, looking up toward her while she works.",
      },
      {
        src: collageMe3.url,
        alt: "Cami at her desk with round glasses and multiple monitors, photographed during a quiet work-at-home moment.",
      },
      {
        src: collageDog1.url,
        alt: "Blitz, grey-muzzled and gentle-eyed, lying beside a pink bowl of kibble and looking up toward the camera.",
      },
    ],
  },
  {
    id: "my-faithful-blitz",
    date: "2026-06-06",
    title: "My Faithful Blitz — celebrating the little things",
    entryImages: [
      {
        src: myFaithfulBlitz,
        alt: "Handwritten journal page dated 6/6/26 — Cami writing about waking up sick with anxiety, her elderly pitbull Blitz, and giving thanks that the gabapentin is helping Blitz regain some mobility",
      },
    ],
    rightPagePhotos: [
      {
        src: blitzWagonDoorway,
        alt: "Blitz, a grey-muzzled senior pitbull, resting in a black wagon in the front doorway, surrounded by her water bottles and gear, ready for a walk",
      },
      {
        src: blitzWagonRoad,
        alt: "Close-up of Blitz dozing in the wagon on the road, white blaze down her nose, ears soft, looking peaceful in the Florida sun",
      },
    ],
    videoShort: {
      youtubeId: "P7vX-9sTQ5k",
      caption: "a moving picture — tap to watch",
    },
  },
  {
    id: "lets-do-this",
    date: "2026-06-05",
    title: "lets do this!",
    entryImages: [
      {
        src: letsDoThis,
        alt: "Handwritten journal page dated 6/5/26 — Cami's intro to the Raw & Unhinged category, explaining the new journal and her plan to write often",
      },
    ],
  },
  {
    id: "winston",
    date: "2026-06-05",
    title: "Winston — an unfinished sketch of an old friend",
    entryImages: [
      {
        src: winstonSketch,
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
