import { createFileRoute } from "@tanstack/react-router";
import { GalleryPage } from "@/components/GalleryPage";
import type { GalleryItem } from "@/components/GalleryGrid";

import n01 from "@/assets/nature-wildlife/nature-01.jpg";
import n02 from "@/assets/nature-wildlife/nature-02.jpg";
import n03 from "@/assets/nature-wildlife/nature-03.jpg";
import n04 from "@/assets/nature-wildlife/nature-04.jpg";
import n05 from "@/assets/nature-wildlife/nature-05.jpg";
import n06 from "@/assets/nature-wildlife/nature-06.jpg";
import n07 from "@/assets/nature-wildlife/nature-07.jpg";
import n08 from "@/assets/nature-wildlife/nature-08.jpg";
import n09 from "@/assets/nature-wildlife/nature-09.jpg";
import n10 from "@/assets/nature-wildlife/nature-10.jpg";
import n11 from "@/assets/nature-wildlife/nature-11.jpg";
import n12 from "@/assets/nature-wildlife/nature-12.jpg";
import n13 from "@/assets/nature-wildlife/nature-13.jpg";
import n14 from "@/assets/nature-wildlife/nature-14.jpg";
import n15 from "@/assets/nature-wildlife/nature-15.jpg";
import n16 from "@/assets/nature-wildlife/nature-16.jpg";

export const Route = createFileRoute("/gallery/florida-birding")({
  component: NatureGallery,
  head: () => ({
    meta: [
      { title: "Nature & Wildlife — MissKonstruction Photography" },
      { name: "description", content: "Nature and wildlife photography — Florida birds and quiet wild moments." },
    ],
  }),
});

const items: GalleryItem[] = [
  { src: n01 }, { src: n02 }, { src: n03 }, { src: n04 },
  { src: n05 }, { src: n06 }, { src: n07 }, { src: n08 },
  { src: n09 }, { src: n10 }, { src: n11 }, { src: n12 },
  { src: n13 }, { src: n14 }, { src: n15 }, { src: n16 },
];

function NatureGallery() {
  return (
    <GalleryPage
      title="Nature and Wildlife"
      intro="Birds, beaches, and quiet wild moments captured in the Florida wild."
      items={items}
    />
  );
}
