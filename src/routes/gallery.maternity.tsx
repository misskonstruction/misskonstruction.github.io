import { createFileRoute } from "@tanstack/react-router";
import { GalleryPage } from "@/components/GalleryPage";
import type { GalleryItem } from "@/components/GalleryGrid";

export const Route = createFileRoute("/gallery/maternity")({
  component: MaternityGallery,
  head: () => ({
    meta: [
      { title: "Maternity — MissKonstruction Photography" },
      { name: "description", content: "Maternity photography sessions by MissKonstruction." },
    ],
  }),
});

/**
 * 16 placeholder slots. To add a new photo:
 *   1. Drop the optimized image into src/assets/maternity/
 *   2. import it at the top of this file
 *   3. Replace one of the empty `{}` slots below with `{ src: imported, title: "Caption" }`
 *
 * Empty objects render as "+ add photo" placeholder slots.
 */
const items: GalleryItem[] = [
  {}, {}, {}, {},
  {}, {}, {}, {},
  {}, {}, {}, {},
  {}, {}, {}, {},
];

function MaternityGallery() {
  return (
    <GalleryPage
      title="Maternity"
      intro="Soft, story-driven maternity sessions. New work coming soon — placeholder slots are ready for your photos."
      items={items}
    />
  );
}
