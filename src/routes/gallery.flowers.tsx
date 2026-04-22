import { createFileRoute } from "@tanstack/react-router";
import { GalleryPage } from "@/components/GalleryPage";
import type { GalleryItem } from "@/components/GalleryGrid";

export const Route = createFileRoute("/gallery/flowers")({
  component: FlowersGallery,
  head: () => ({
    meta: [
      { title: "Flower Project — MissKonstruction Photography" },
      { name: "description", content: "Macro and botanical flower photography." },
    ],
  }),
});

// 16 placeholder slots — see /gallery/maternity route for instructions on adding photos.
const items: GalleryItem[] = Array.from({ length: 16 }, () => ({}));

function FlowersGallery() {
  return (
    <GalleryPage
      title="Flower Project"
      intro="An ongoing study of color, light, and petals."
      items={items}
    />
  );
}
