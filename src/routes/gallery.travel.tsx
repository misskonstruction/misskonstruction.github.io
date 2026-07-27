import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { GalleryGrid, type GalleryItem } from "@/components/GalleryGrid";
import sphinxUnderKonstruction from "@/assets/sphinx-under-konstruction.png";
import t01 from "@/assets/travel/travel-01.jpg";
import t02 from "@/assets/travel/travel-02.jpg";
import t03 from "@/assets/travel/travel-03.jpg";
import t04 from "@/assets/travel/travel-04.jpg";
import t05 from "@/assets/travel/travel-05.jpg";

export const Route = createFileRoute("/gallery/travel")({
  component: TravelGallery,
  head: () => ({
    meta: [
      { title: "Travel — MissKonstruction Photography" },
      { name: "description", content: "Quiet frames from the road — places I've wandered with a camera in hand." },
    ],
  }),
});

const items: GalleryItem[] = [
  { src: t01, title: "Above the clouds" },
  { src: t02, title: "Red River bridge, Shreveport" },
  { src: t03, title: "Cannas over the skyline" },
  { src: t04, title: "Sam's Town, looking up" },
  { src: t05, title: "Raymond James, downtown Shreveport" },
];

function TravelGallery() {
  return (
    <SiteLayout>
      <section className="container mx-auto px-4 py-12 md:py-16">
        <header className="text-center max-w-xl mx-auto mb-12">
          <h1 className="text-4xl md:text-5xl font-bold">Travel</h1>
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
            Quiet frames from the road — places I've wandered with a camera in
            hand. Just getting started; more to come.
          </p>
        </header>
        <GalleryGrid items={items} />
      </section>
    </SiteLayout>
  );
}
