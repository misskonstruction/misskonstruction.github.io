// The most recently uploaded gallery photo, surfaced on the homepage.
// To update: change the fields below to point at the newest photo.
// `addedAt` controls the "New!" badge (shown for 14 days).

import recentImage from "@/assets/recent-wood-stork-family.jpg";

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
  alt: "Mama wood stork standing watch over two fluffy chicks in a stick nest tucked into bright green cypress",
  galleryName: "Birding & Wildlife",
  galleryPath: "/gallery/florida-birding",
  reflection:
    "A mama wood stork keeping a quiet eye on her two fuzzy little ones, the whole nest tucked into a wall of spring-green cypress. You could stand under that rookery for an hour and never get tired of watching her watch them.",
  addedAt: "2026-04-27",
};

export function isRecent(addedAt: string, days = 14): boolean {
  const added = new Date(addedAt).getTime();
  if (Number.isNaN(added)) return false;
  const ageMs = Date.now() - added;
  return ageMs >= 0 && ageMs <= days * 24 * 60 * 60 * 1000;
}
