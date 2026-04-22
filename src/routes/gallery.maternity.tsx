import { createFileRoute } from "@tanstack/react-router";
import { GalleryPage } from "@/components/GalleryPage";
import type { GalleryItem } from "@/components/GalleryGrid";

import m01 from "@/assets/maternity/maternity-01.jpg";
import m02 from "@/assets/maternity/maternity-02.jpg";
import m03 from "@/assets/maternity/maternity-03.jpg";
import m04 from "@/assets/maternity/maternity-04.jpg";
import m05 from "@/assets/maternity/maternity-05.jpg";
import m06 from "@/assets/maternity/maternity-06.jpg";
import m07 from "@/assets/maternity/maternity-07.jpg";
import m08 from "@/assets/maternity/maternity-08.jpg";
import m09 from "@/assets/maternity/maternity-09.jpg";
import m10 from "@/assets/maternity/maternity-10.jpg";
import m11 from "@/assets/maternity/maternity-11.jpg";
import m12 from "@/assets/maternity/maternity-12.jpg";
import m13 from "@/assets/maternity/maternity-13.jpg";
import m14 from "@/assets/maternity/maternity-14.jpg";
import m15 from "@/assets/maternity/maternity-15.jpg";
import m16 from "@/assets/maternity/maternity-16.jpg";

export const Route = createFileRoute("/gallery/maternity")({
  component: MaternityGallery,
  head: () => ({
    meta: [
      { title: "Maternity — MissKonstruction Photography" },
      { name: "description", content: "Soft, story-driven maternity sessions captured in golden gulf coast light." },
    ],
  }),
});

const items: GalleryItem[] = [
  { src: m01 }, { src: m02 }, { src: m03 }, { src: m04 },
  { src: m05 }, { src: m06 }, { src: m07 }, { src: m08 },
  { src: m09 }, { src: m10 }, { src: m11 }, { src: m12 },
  { src: m13 }, { src: m14 }, { src: m15 }, { src: m16 },
];

function MaternityGallery() {
  return (
    <GalleryPage
      title="Maternity"
      intro="Soft, story-driven maternity sessions captured in golden gulf coast light."
      items={items}
    />
  );
}
