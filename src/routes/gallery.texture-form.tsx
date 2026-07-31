import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { GalleryGrid, type GalleryItem } from "@/components/GalleryGrid";
import sphinxUnderKonstruction from "@/assets/sphinx-under-konstruction.png";
import aquariumRocks from "@/assets/texture-form/aquarium-rocks.jpg";
import golfBalls from "@/assets/texture-form/golf-balls.jpg";

export const Route = createFileRoute("/gallery/texture-form")({
  component: TextureFormGallery,
  head: () => ({
    meta: [
      { title: "Texture & Form | MissKonstruction Photography" },
      { name: "description", content: "Macro details of the everyday — textures, glass, rock formations, and quiet objects worth a second look." },
    ],
  }),
});

const items: GalleryItem[] = [
  { src: aquariumRocks, title: "Aquarium Stones — River Pebbles & Sea Glass" },
];

function TextureFormGallery() {
  return (
    <SiteLayout>
      <section className="container mx-auto px-4 py-12 md:py-16">
        <header className="text-center max-w-xl mx-auto mb-12">
          <h1 className="text-4xl md:text-5xl font-bold">Texture &amp; Form</h1>
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
            A close-up study of the everyday — weathered surfaces, sea-worn
            glass, unique objects, and the rock formations I keep stopping
            to photograph.
          </p>
        </header>
        <GalleryGrid items={items} />
      </section>
    </SiteLayout>
  );
}
