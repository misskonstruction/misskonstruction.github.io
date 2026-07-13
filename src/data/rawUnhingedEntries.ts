import winstonSketch from "@/assets/raw-unhinged/entry-winston-sketch.jpg";
import letsDoThis from "@/assets/raw-unhinged/entry-lets-do-this.jpg";
import myFaithfulBlitz from "@/assets/raw-unhinged/entry-my-faithful-blitz.jpg";
import blitzWagonDoorway from "@/assets/raw-unhinged/blitz-wagon-doorway.jpg";
import blitzWagonRoad from "@/assets/raw-unhinged/blitz-wagon-road.jpg";
import juneTenPage1 from "@/assets/raw-unhinged/entry-2026-06-10-page-1.jpg";
import juneTenPage2 from "@/assets/raw-unhinged/entry-2026-06-10-page-2.jpg";
import juneTenPage3 from "@/assets/raw-unhinged/entry-2026-06-10-page-3.jpg";
import juneTenCamiDesk from "@/assets/raw-unhinged/entry-2026-06-10-cami-desk.jpg";
import juneTenBlitz from "@/assets/raw-unhinged/entry-2026-06-10-blitz.jpg";
import juneTenKylo from "@/assets/raw-unhinged/entry-2026-06-10-kylo.jpg";
import julyThirteenPage1 from "@/assets/raw-unhinged/entry-2026-07-13-page-1.jpg";
import julyThirteenPage2 from "@/assets/raw-unhinged/entry-2026-07-13-page-2.jpg";
import julyThirteenPage3 from "@/assets/raw-unhinged/entry-2026-07-13-page-3.jpg";
import julyThirteenWinnie from "@/assets/raw-unhinged/entry-2026-07-13-winnie.jpg";
import julyThirteenNoWinnie from "@/assets/raw-unhinged/entry-2026-07-13-no-winnie.jpg";

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
 * Entries are listed oldest-first, like turning through a real journal.
 * Add new entries at the end unless the entry date says otherwise.
 */
export const rawUnhingedEntries: RawUnhingedEntry[] = [
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
    id: "six-thirty-six-at-my-desk",
    date: "2026-06-10",
    title: "6:36am at my desk",
    entryImages: [
      {
        src: juneTenPage1,
        alt: "Handwritten Raw & Unhinged journal page dated 6/10/26 — Cami writing at 6:36am about preparing to start work, poor sleep, anxiety, pain, and worrying about Blitz",
      },
      {
        src: juneTenPage2,
        alt: "Continuation page of the June 10 Raw & Unhinged journal entry — Cami writing about light, sleep, pets waking her, and counting down to 6:30",
      },
      {
        src: juneTenPage3,
        alt: "Final handwritten page of the June 10 Raw & Unhinged journal entry — Cami writing about getting up, feeding the pets, settling Blitz by her desk, a new house, road trip, and missing her dad",
      },
    ],
    finalPagePhotos: [
      {
        src: juneTenCamiDesk,
        alt: "Cami at her desk surrounded by monitors, with a butterfly image on the center screen",
      },
      {
        src: juneTenBlitz,
        alt: "Blitz, a grey-muzzled senior pitbull, looking up beside her food bowl",
      },
      {
        src: juneTenKylo,
        alt: "Kylo, a younger pitbull, peeking up from under Cami's desk near a keyboard and printer",
      },
    ],
  },
  {
    id: "every-single-bloody-morning",
    date: "2026-07-13",
    title: "Every. Single. Bloody. Morning. — losing Winston",
    entryImages: [
      {
        src: julyThirteenPage1,
        alt: "Handwritten Raw & Unhinged journal page dated 7/13/26 — Cami writing about waking up on the verge of panic in the new home, being sick during the last of the move, and losing Winston the ginger cat after bad storms",
      },
      {
        src: julyThirteenPage2,
        alt: "Continuation page of the July 13 Raw & Unhinged journal entry — Cami writing about coyotes in the neighborhood, stepping back from Facebook, over 100 likes on the new-house post, and realizing most weren't real friends",
      },
      {
        src: julyThirteenPage3,
        alt: "Final handwritten page of the July 13 Raw & Unhinged journal entry — Cami writing about YouTube and platy support in her Fish Trade Group, and how all she can think about this morning is Winston and her empty desk drawer",
      },
    ],
    finalPagePhotos: [
      {
        src: julyThirteenWinnie,
        alt: "Winston, a ginger tabby cat, curled up in the black fabric drawer under Cami's desk with a pink heart doodle in the corner",
      },
      {
        src: julyThirteenNoWinnie,
        alt: "The same fabric drawer under Cami's desk, now empty — a few strands of orange fur left behind where Winston used to nap",
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
