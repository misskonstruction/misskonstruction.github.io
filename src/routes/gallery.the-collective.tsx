import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { GalleryGrid, type GalleryItem } from "@/components/GalleryGrid";
import sphinxUnderKonstruction from "@/assets/sphinx-under-konstruction.png";
import maternitySoloSunset from "@/assets/maternity/maternity-07.jpg";
import birdingFavorite from "@/assets/florida-birding/birding-05.jpg";
import flowersFavorite from "@/assets/flowers/flowers-05.jpg";
import boatsFavorite from "@/assets/boats/boats-10.jpg";

export const Route = createFileRoute("/gallery/the-collective")({
  component: TheCollectiveGallery,
  head: () => ({
    meta: [
      { title: "Strays | MissKonstruction Photography" },
      { name: "description", content: "A curated mix of favorite photographs from the current MissKonstruction galleries." },
      { name: "robots", content: "noindex" },
    ],
  }),
});

const items: GalleryItem[] = [
  { src: birdingFavorite, title: "Birding & Wildlife" },
  { src: maternitySoloSunset, title: "Maternity" },
  { src: flowersFavorite, title: "Flower Project" },
  { src: boatsFavorite, title: "Boats & Saltlife" },
  ...Array.from({ length: 12 }, () => ({})),
];

function TheCollectiveGallery() {
  return (
    <SiteLayout>
      <section className="container mx-auto px-4 py-12 md:py-16">
        <header className="text-center max-w-xl mx-auto mb-12">
          <h1 className="text-4xl md:text-5xl font-bold">Strays</h1>
          <img
            src={sphinxUnderKonstruction}
            alt="Cartoon sphinx kitten in a yellow hard hat resting on an Under Konstruction barricade"
            width={420}
            height={420}
            loading="lazy"
            className="mx-auto h-auto w-60 md:w-72 mt-6"
          />
          <div className="inline-flex h-px w-16 bg-primary mt-4 mb-6" />
          <p className="text-muted-foreground">
            A hand-picked mix of favorite images from each gallery that already has photos,
            with room to keep growing.
          </p>
        </header>
        <GalleryGrid items={items} />
      </section>
    </SiteLayout>
  );
}

