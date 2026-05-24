import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { GalleryGrid, type GalleryItem } from "@/components/GalleryGrid";
import sphinxUnderKonstruction from "@/assets/sphinx-under-konstruction.png";

export const Route = createFileRoute("/gallery/the-collective")({
  component: TheCollectiveGallery,
  head: () => ({
    meta: [
      { title: "The Collective — Coming Soon | MissKonstruction Photography" },
      { name: "description", content: "A curated mix of favorites from every MissKonstruction gallery — coming soon." },
      { name: "robots", content: "noindex" },
    ],
  }),
});

const items: GalleryItem[] = Array.from({ length: 16 }, () => ({}));

function TheCollectiveGallery() {
  return (
    <SiteLayout>
      <section className="container mx-auto px-4 py-12 md:py-16">
        <header className="text-center max-w-xl mx-auto mb-12">
          <h1 className="text-4xl md:text-5xl font-bold">The Collective — Coming Soon</h1>
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
            A curated mix of favorites pulled from across every gallery —
            maternity, birds, flowers, saltlife and beyond. Still hand-picking
            the lineup. Check back soon.
          </p>
        </header>
        <GalleryGrid items={items} />
      </section>
    </SiteLayout>
  );
}
