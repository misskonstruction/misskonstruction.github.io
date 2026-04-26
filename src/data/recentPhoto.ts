// The most recently uploaded gallery photo, surfaced on the homepage.
// To update: change the fields below to point at the newest photo.
// `addedAt` controls the "New!" badge (shown for 14 days).

import recentImage from "@/assets/recent-egret-siblings.jpg";

export type RecentPhoto = {
  image: string;
  alt: string;
  galleryName: string;
  galleryPath: string;
  reflection: string;
  addedAt: string; // ISO date, e.g. "2026-04-26"
};

export const recentPhoto: RecentPhoto = {
  image: recentImage,
  alt: "Two young great egret siblings nestled together in a cypress tree",
  galleryName: "Birding & Wildlife",
  galleryPath: "/gallery/birding-wildlife",
  reflection:
    "Sibling rivalry, egret edition — somebody's clearly hogging the good twig. The look on the left says it all.",
  addedAt: "2026-04-26",
};

export function isRecent(addedAt: string, days = 14): boolean {
  const added = new Date(addedAt).getTime();
  if (Number.isNaN(added)) return false;
  const ageMs = Date.now() - added;
  return ageMs >= 0 && ageMs <= days * 24 * 60 * 60 * 1000;
}
