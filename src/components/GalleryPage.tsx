import { SiteLayout } from "./SiteLayout";
import { GalleryGrid, type GalleryItem } from "./GalleryGrid";

export function GalleryPage({
  title,
  intro,
  items,
}: {
  title: string;
  intro?: string;
  items: GalleryItem[];
}) {
  return (
    <SiteLayout>
      <section className="container mx-auto px-4 py-12 md:py-16">
        <header className="mb-10 text-center max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">{title}</h1>
          {intro && <p className="mt-4 text-muted-foreground">{intro}</p>}
          <div className="mt-5 inline-flex h-px w-16 bg-primary" />
        </header>
        <GalleryGrid items={items} />
      </section>
    </SiteLayout>
  );
}
