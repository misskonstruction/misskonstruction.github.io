import { createFileRoute } from "@tanstack/react-router";
import { GalleryPage } from "@/components/GalleryPage";
import type { GalleryItem } from "@/components/GalleryGrid";

import f01 from "@/assets/flowers/flowers-01.jpg";
import f02 from "@/assets/flowers/flowers-02.jpg";
import f03 from "@/assets/flowers/flowers-03.jpg";
import f04 from "@/assets/flowers/flowers-04.jpg";
import f05 from "@/assets/flowers/flowers-05.jpg";
import f06 from "@/assets/flowers/flowers-06.jpg";
import f07 from "@/assets/flowers/flowers-07.jpg";
import f08 from "@/assets/flowers/flowers-08.jpg";
import f09 from "@/assets/flowers/flowers-09.jpg";
import f10 from "@/assets/flowers/flowers-10.jpg";
import f11 from "@/assets/flowers/flowers-11.jpg";
import f12 from "@/assets/flowers/flowers-12.jpg";
import f13 from "@/assets/flowers/flowers-13.jpg";
import f14 from "@/assets/flowers/flowers-14.jpg";
import f15 from "@/assets/flowers/flowers-15.jpg";
import f16 from "@/assets/flowers/flowers-16.jpg";

export const Route = createFileRoute("/gallery/flowers")({
  component: FlowersGallery,
  head: () => ({
    meta: [
      { title: "Flower Project — MissKonstruction Photography" },
      { name: "description", content: "Macro and botanical flower photography." },
    ],
  }),
});

const items: GalleryItem[] = [
  { src: f01 }, { src: f02 }, { src: f03 }, { src: f04 },
  { src: f05 }, { src: f06 }, { src: f07 }, { src: f08 },
  { src: f09 }, { src: f10 }, { src: f11 }, { src: f12 },
  { src: f13 }, { src: f14 }, { src: f15 }, { src: f16 },
];

function FlowersGallery() {
  return (
    <GalleryPage
      title="Flower Project"
      intro="An ongoing study of color, light, and petals."
      items={items}
    />
  );
}
