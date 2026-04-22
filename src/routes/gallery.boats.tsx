import { createFileRoute } from "@tanstack/react-router";
import { GalleryPage } from "@/components/GalleryPage";
import type { GalleryItem } from "@/components/GalleryGrid";

export const Route = createFileRoute("/gallery/boats")({
  component: BoatsGallery,
  head: () => ({
    meta: [
      { title: "Boats & Saltlife — MissKonstruction Photography" },
      { name: "description", content: "Boats, docks, and saltlife photography." },
    ],
  }),
});

// 16 placeholder slots — see /gallery/maternity route for instructions on adding photos.
const items: GalleryItem[] = Array.from({ length: 16 }, () => ({}));

function BoatsGallery() {
  return (
    <GalleryPage
      title="Boats and Saltlife"
      intro="Florida docks, working boats, and the salty in-between."
      items={items}
    />
  );
}
