// The most recently uploaded gallery photo, surfaced on the homepage.
// To update: change the fields below to point at the newest photo.
// `addedAt` controls the "New!" badge (shown for 14 days).

import recentImage from "@/assets/travel/travel-06.jpg";

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
  alt: "Steinhatchee Falls in Florida — tea-colored water spilling over a wide limestone shelf beneath cabbage palms",
  galleryName: "Travel",
  galleryPath: "/gallery/travel",
  reflection:
    "Steinhatchee Falls, Florida — dark, tea-colored water tumbling over an old limestone shelf, palms leaning in to listen. A quiet little wonder tucked off the road.",
  addedAt: "2026-10-05",
};

export function isRecent(addedAt: string, days = 14): boolean {
  const added = new Date(addedAt).getTime();
  if (Number.isNaN(added)) return false;
  const ageMs = Date.now() - added;
  return ageMs >= 0 && ageMs <= days * 24 * 60 * 60 * 1000;
}
