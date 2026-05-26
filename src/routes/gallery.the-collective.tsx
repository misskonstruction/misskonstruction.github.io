import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { GalleryGrid, type GalleryItem } from "@/components/GalleryGrid";
import sphinxUnderKonstruction from "@/assets/sphinx-under-konstruction.png";
import furyTeaser from "@/assets/loose-frames-fury.jpg";

export const Route = createFileRoute("/gallery/the-collective")({
  component: LooseFramesGallery,
  head: () => ({
    meta: [
      { title: "Loose Frames — Coming Soon | MissKonstruction Photography" },
      {
        name: "description",
        content:
          "A catch-all gallery for the one-off shots that don't fit anywhere else — coming soon.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
});

const items: GalleryItem[] = Array.from({ length: 16 }, () => ({}));

function LooseFramesGallery() {
  return (
    <SiteLayout>
      <section className="container mx-auto px-4 py-12 md:py-16">
        <header className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="text-4xl md:text-5xl font-bold">Loose Frames — Coming Soon</h1>
          <img
            src={furyTeaser}
            alt="A 1958 Plymouth Fury, red and white, idling on a rain-slick road at dusk"
            width={1280}
            height={1280}
            loading="lazy"
            className="mx-auto mt-8 w-full max-w-xl h-auto rounded-md shadow-lg"
          />
          <img
            src={sphinxUnderKonstruction}
            alt="Cartoon sphinx kitten in a yellow hard hat resting on an Under Konstruction barricade"
            width={420}
            height={420}
            loading="lazy"
            className="mx-auto h-auto w-44 md:w-52 mt-6"
          />
          <div className="inline-flex h-px w-16 bg-primary mt-4 mb-6" />
          <p className="text-muted-foreground">
            Some photographs refuse to file themselves neatly. A chrome fin glinting at
            twilight, a stranger's window, a moment of weird light on an ordinary street —
            the strays of the camera roll. This is where those loose frames will live.
            Pulling the collection together now; first drops coming soon.
          </p>
        </header>
        <GalleryGrid items={items} />
      </section>
    </SiteLayout>
  );
}
