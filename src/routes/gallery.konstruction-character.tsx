import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { GalleryGrid, type GalleryItem } from "@/components/GalleryGrid";
import sphinxUnderKonstruction from "@/assets/sphinx-under-konstruction.png";

export const Route = createFileRoute("/gallery/konstruction-character")({
  component: KonstructionCharacterGallery,
  head: () => ({
    meta: [
      { title: "Konstruction & Character — Coming Soon | MissKonstruction Photography" },
      { name: "description", content: "Unique buildings, architecture, and characterful corners around town — coming soon." },
      { name: "robots", content: "noindex" },
    ],
  }),
});

const items: GalleryItem[] = Array.from({ length: 16 }, () => ({}));

function KonstructionCharacterGallery() {
  return (
    <SiteLayout>
      <section className="container mx-auto px-4 py-12 md:py-16">
        <header className="text-center max-w-xl mx-auto mb-12">
          <h1 className="text-4xl md:text-5xl font-bold">Konstruction &amp; Character — Coming Soon</h1>
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
            A love letter to the unique buildings and architectural quirks
            around town — weathered facades, hand-painted signs, and the
            small details most people walk past. Coming soon.
          </p>
        </header>
        <GalleryGrid items={items} />
      </section>
    </SiteLayout>
  );
}
