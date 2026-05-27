// The most recently uploaded gallery photo, surfaced on the homepage.
// To update: change the fields below to point at the newest photo.
// `addedAt` controls the "New!" badge (shown for 14 days).

import recentImage from "@/assets/florida-birding/birding-17.jpg";

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
  alt: "A Florida gopher tortoise sunbathing on sandy ground with a curious look",
  galleryName: "Birding & Wildlife",
  galleryPath: "/gallery/birding-wildlife",
  reflection:
    "Caught these two gopher tortoises in what can only be described as a very intimate moment — let's call it 'tortoise porn.' Nature's private life, now slightly less private.",
  addedAt: "2026-05-27",
};

export function isRecent(addedAt: string, days = 14): boolean {
  const added = new Date(addedAt).getTime();
  if (Number.isNaN(added)) return false;
  const ageMs = Date.now() - added;
  return ageMs >= 0 && ageMs <= days * 24 * 60 * 60 * 1000;
}
