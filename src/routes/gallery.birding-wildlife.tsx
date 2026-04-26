import { createFileRoute } from "@tanstack/react-router";
import { GalleryPage } from "@/components/GalleryPage";
import type { GalleryItem } from "@/components/GalleryGrid";

import n01 from "@/assets/florida-birding/birding-01.jpg";
import n02 from "@/assets/florida-birding/birding-02.jpg";
import n03 from "@/assets/florida-birding/birding-03.jpg";
import n04 from "@/assets/florida-birding/birding-04.jpg";
import n05 from "@/assets/florida-birding/birding-05.jpg";
import n06 from "@/assets/florida-birding/birding-06.jpg";
import n07 from "@/assets/florida-birding/birding-07.jpg";
import n08 from "@/assets/florida-birding/birding-08.jpg";
import n09 from "@/assets/florida-birding/birding-09.jpg";
import n10 from "@/assets/florida-birding/birding-10.jpg";
import n11 from "@/assets/florida-birding/birding-11.jpg";
import n12 from "@/assets/florida-birding/birding-12.jpg";
import n13 from "@/assets/florida-birding/birding-13.jpg";
import n14 from "@/assets/florida-birding/birding-14.jpg";
import n15 from "@/assets/florida-birding/birding-15.jpg";
import n16 from "@/assets/florida-birding/birding-16.jpg";

export const Route = createFileRoute("/gallery/birding-wildlife")({
  component: BirdingWildlifeGallery,
  head: () => ({
    meta: [
      { title: "Birding & Wildlife — MissKonstruction Photography" },
      { name: "description", content: "Birding & wildlife photography — quiet wild moments captured along Florida's gulf coast." },
    ],
  }),
});

const items: GalleryItem[] = [
  { src: n01 }, { src: n02 }, { src: n03 }, { src: n04 },
  { src: n05 }, { src: n06 }, { src: n07 }, { src: n08 },
  { src: n09 }, { src: n10 }, { src: n11 }, { src: n12 },
  { src: n13 }, { src: n14 }, { src: n15 }, { src: n16 },
];

function BirdingWildlifeGallery() {
  return (
    <GalleryPage
      title="Birding & Wildlife"
      intro="Birds, beasts, and everything in between — quiet wild moments captured along Florida's gulf coast."
      items={items}
    />
  );
}
