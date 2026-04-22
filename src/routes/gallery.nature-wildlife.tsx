import { createFileRoute } from "@tanstack/react-router";
import { GalleryPage } from "@/components/GalleryPage";
import type { GalleryItem } from "@/components/GalleryGrid";

export const Route = createFileRoute("/gallery/nature-wildlife")({
  component: NatureGallery,
  head: () => ({
    meta: [
      { title: "Nature & Wildlife — MissKonstruction Photography" },
      { name: "description", content: "Nature and wildlife photography." },
    ],
  }),
});

// 16 placeholder slots — see /gallery/maternity route for instructions on adding photos.
const items: GalleryItem[] = Array.from({ length: 16 }, () => ({}));

function NatureGallery() {
  return (
    <GalleryPage
      title="Nature and Wildlife"
      intro="Birds, beaches, and quiet wild moments — placeholder slots ready to fill."
      items={items}
    />
  );
}
