import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { GalleryGrid, type GalleryItem } from "@/components/GalleryGrid";
import sphinxKitten from "@/assets/sphinx-newborn.png";

export const Route = createFileRoute("/gallery/newborns")({
  component: NewbornsGallery,
  head: () => ({
    meta: [
      { title: "Newborns — Coming Soon | MissKonstruction Photography" },
      { name: "description", content: "Newborn photography sessions by MissKonstruction — coming soon." },
      { name: "robots", content: "noindex" },
    ],
  }),
});

// 16 placeholder slots — drop image imports into the items array to fill them.
const items: GalleryItem[] = Array.from({ length: 16 }, () => ({}));

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
          <h1 className="text-4xl md:text-5xl font-bold mt-6">Newborns — Coming Soon</h1>
          <div className="inline-flex h-px w-16 bg-primary mt-4 mb-6" />
          <p className="text-muted-foreground">
            The newborn gallery is still being swaddled together. Tiny faces and first
            yawns are on the way — check back soon for the full collection.
          </p>
        </header>
        <GalleryGrid items={items} />
      </section>
    </SiteLayout>
  );
}
