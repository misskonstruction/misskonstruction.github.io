import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { GalleryGrid, type GalleryItem } from "@/components/GalleryGrid";
import kc01 from "@/assets/konstruction-character/kc-01.jpg";
import kc02 from "@/assets/konstruction-character/kc-02.jpg";
import kc03 from "@/assets/konstruction-character/kc-03.jpg";
import kc04 from "@/assets/konstruction-character/kc-04.jpg";
import kc05 from "@/assets/konstruction-character/kc-05.jpg";
import kc06 from "@/assets/konstruction-character/kc-06.jpg";
import kc07 from "@/assets/konstruction-character/kc-07.jpg";
import kc08 from "@/assets/konstruction-character/kc-08.jpg";
import kc09 from "@/assets/konstruction-character/kc-09.jpg";
import kc10 from "@/assets/konstruction-character/kc-10.jpg";
import kc11 from "@/assets/konstruction-character/kc-11.jpg";
import kc12 from "@/assets/konstruction-character/kc-12.jpg";
import kc13 from "@/assets/konstruction-character/kc-13.jpg";
import kc14 from "@/assets/konstruction-character/kc-14.jpg";
import kc15 from "@/assets/konstruction-character/kc-15.jpg";
import kc16 from "@/assets/konstruction-character/kc-16.jpg";

export const Route = createFileRoute("/gallery/konstruction-character")({
  component: KonstructionCharacterGallery,
  head: () => ({
    meta: [
      { title: "Konstruction & Character | MissKonstruction Photography" },
      { name: "description", content: "Unique buildings, murals, hand-painted signs, and characterful corners around town." },
    ],
  }),
});

const items: GalleryItem[] = [
  { src: kc01, title: "Historic mural — boats on the river" },
  { src: kc02, title: "Historic mural — Port Richey storefronts" },
  { src: kc03, title: "Construction frame against summer sky" },
  { src: kc04, title: "It's a Sunny Day mural" },
  { src: kc05, title: "Film reel mural & Main Street Salon" },
  { src: kc06, title: "Cotee River Brewing Company" },
  { src: kc07, title: "Beauty Lab storefront" },
  { src: kc08, title: "Historic mural — figures and cypress" },
  { src: kc09, title: "Historic mural — boats and portraits" },
  { src: kc10, title: "Ottaway's Ice Cream Parlor" },
  { src: kc11, title: "Brick arcade in afternoon light" },
  { src: kc12, title: "Charlie's Chocolate Factory book bench" },
  { src: kc13, title: "Downtown corner — Greek Restaurant" },
  { src: kc14, title: "Historic Theatre on Grand Boulevard" },
  { src: kc15, title: "Bougainvillea mural & courtyard" },
  { src: kc16, title: "Shade sails over the promenade" },
];

function KonstructionCharacterGallery() {
  return (
    <SiteLayout>
      <section className="container mx-auto px-4 py-12 md:py-16">
        <header className="text-center max-w-xl mx-auto mb-12">
          <h1 className="text-4xl md:text-5xl font-bold">Konstruction &amp; Character</h1>
          <div className="inline-flex h-px w-16 bg-primary mt-4 mb-6" />
          <p className="text-muted-foreground">
            A love letter to the unique buildings and architectural quirks
            around town — weathered facades, hand-painted signs, murals,
            and the small details most people walk past.
          </p>
        </header>
        <GalleryGrid items={items} />
      </section>
    </SiteLayout>
  );
}
