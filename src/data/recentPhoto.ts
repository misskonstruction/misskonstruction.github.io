// The most recently uploaded gallery photo, surfaced on the homepage.
// To update: change the fields below to point at the newest photo.
// `addedAt` controls the "New!" badge (shown for 14 days).

import recentImage from "@/assets/recent-sunset-bay.jpg";

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
  alt: "Fiery Florida sunset over the Gulf with silhouettes of friends wading at the shoreline",
  galleryName: "Boats and Saltlife",
  galleryPath: "/gallery/boats",
  reflection:
    "A pillar of gold poured straight from the sun to the shore — the kind of sky that makes everyone stop talking and just stand in the water for a minute. Pure Gulf coast magic.",
  addedAt: "2026-04-27",
};

export function isRecent(addedAt: string, days = 14): boolean {
  const added = new Date(addedAt).getTime();
  if (Number.isNaN(added)) return false;
  const ageMs = Date.now() - added;
  return ageMs >= 0 && ageMs <= days * 24 * 60 * 60 * 1000;
}
