import { createFileRoute } from "@tanstack/react-router";
import { GalleryPage } from "@/components/GalleryPage";
import type { GalleryItem } from "@/components/GalleryGrid";

import b01 from "@/assets/boats/boats-01.jpg";
import b02 from "@/assets/boats/boats-02.jpg";
import b03 from "@/assets/boats/boats-03.jpg";
import b04 from "@/assets/boats/boats-04.jpg";
import b05 from "@/assets/boats/boats-05.jpg";
import b06 from "@/assets/boats/boats-06.jpg";
import b07 from "@/assets/boats/boats-07.jpg";
import b08 from "@/assets/boats/boats-08.jpg";
import b09 from "@/assets/boats/boats-09.jpg";
import b10 from "@/assets/boats/boats-10.jpg";
import b11 from "@/assets/boats/boats-11.jpg";
import b12 from "@/assets/boats/boats-12.jpg";
import b13 from "@/assets/boats/boats-13.jpg";
import b14 from "@/assets/boats/boats-14.jpg";
import b15 from "@/assets/boats/boats-15.jpg";
import b16 from "@/assets/boats/boats-16.jpg";

export const Route = createFileRoute("/gallery/boats")({
  component: BoatsGallery,
  head: () => ({
    meta: [
      { title: "Boats & Saltlife — MissKonstruction Photography" },
      { name: "description", content: "Boats, docks, and saltlife photography." },
    ],
  }),
});

const items: GalleryItem[] = [
  { src: b01 }, { src: b02 }, { src: b03 }, { src: b04 },
  { src: b05 }, { src: b06 }, { src: b07 }, { src: b08 },
  { src: b09 }, { src: b10 }, { src: b11 }, { src: b12 },
  { src: b13 }, { src: b14 }, { src: b15 }, { src: b16 },
];

function BoatsGallery() {
  return (
    <GalleryPage
      title="Boats and Saltlife"
      intro="Florida docks, working boats, and the salty in-between."
      items={items}
    />
  );
}
