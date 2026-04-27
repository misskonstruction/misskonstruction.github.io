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
  alt: "Tangerine sunset over a Florida bay with silhouetted families lingering at the water's edge",
  galleryName: "Boats and Saltlife",
  galleryPath: "/gallery/boats",
  reflection:
    "The sky went full tangerine and nobody wanted to leave. Strangers stood in the shallows like quiet little silhouettes — proof that the best Florida sunsets aren't just watched, they're shared.",
  addedAt: "2026-04-27",
};

export function isRecent(addedAt: string, days = 14): boolean {
  const added = new Date(addedAt).getTime();
  if (Number.isNaN(added)) return false;
  const ageMs = Date.now() - added;
  return ageMs >= 0 && ageMs <= days * 24 * 60 * 60 * 1000;
}
