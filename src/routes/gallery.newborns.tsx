import { createFileRoute } from "@tanstack/react-router";
import { GalleryPage } from "@/components/GalleryPage";
import type { GalleryItem } from "@/components/GalleryGrid";

export const Route = createFileRoute("/gallery/newborns")({
  component: NewbornsGallery,
  head: () => ({
    meta: [
      { title: "Newborns — MissKonstruction Photography" },
      { name: "description", content: "Newborn photography sessions by MissKonstruction." },
    ],
  }),
});

// 16 placeholder slots — drop image imports into the items array to fill them.
const items: GalleryItem[] = Array.from({ length: 16 }, () => ({}));

function NewbornsGallery() {
  return (
    <GalleryPage
      title="Newborns"
      intro="Tiny hands, first days — newborn sessions captured with quiet care."
      items={items}
    />
  );
}
