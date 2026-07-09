import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { GalleryGrid, type GalleryItem } from "@/components/GalleryGrid";
import sphinxKitten from "@/assets/sphinx-newborn.png";

import n01 from "@/assets/newborns/newborns-01.jpg";
import n02 from "@/assets/newborns/newborns-02.jpg";
import n03 from "@/assets/newborns/newborns-03.jpg";
import n04 from "@/assets/newborns/newborns-04.jpg";
import n05 from "@/assets/newborns/newborns-05.jpg";
import n06 from "@/assets/newborns/newborns-06.jpg";
import n07 from "@/assets/newborns/newborns-07.jpg";
import n08 from "@/assets/newborns/newborns-08.jpg";
import n09 from "@/assets/newborns/newborns-09.jpg";

export const Route = createFileRoute("/gallery/newborns")({
  component: NewbornsGallery,
  head: () => ({
    meta: [
      { title: "Newborns — MissKonstruction Photography" },
      { name: "description", content: "Newborn photography by MissKonstruction — a growing collection captured across different stages." },
    ],
  }),
});

const items: GalleryItem[] = [
  { src: n01 }, { src: n02 }, { src: n03 },
  { src: n04 }, { src: n05 }, { src: n06 },
  { src: n07 }, { src: n08 }, { src: n09 },
];

function NewbornsGallery() {
  return (
    <SiteLayout>
      <section className="container mx-auto px-4 py-12 md:py-16">
        <header className="text-center max-w-xl mx-auto mb-12">
          <img
            src={sphinxKitten}
            alt="Cartoon sphinx kitten in a knit baby cap behind a construction barrier"
            width={420}
            height={420}
            loading="lazy"
            className="mx-auto h-auto w-60 md:w-72"
          />
          <h1 className="text-4xl md:text-5xl font-bold mt-6">Newborns</h1>
          <div className="inline-flex h-px w-16 bg-primary mt-4 mb-6" />
          <p className="text-muted-foreground">
            A growing collection — more images will be added at different stages as
            little ones grow. Check back for new faces and milestones.
          </p>
        </header>
        <GalleryGrid items={items} protect />
      </section>
    </SiteLayout>
  );
}
