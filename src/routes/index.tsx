import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { ArrowRight } from "lucide-react";
import hero from "@/assets/hero-photography.jpg";
import teaserMaternity from "@/assets/teaser-maternity.jpg";
import teaserNewborns from "@/assets/teaser-newborns.jpg";
import teaserNature from "@/assets/teaser-nature.jpg";
import teaserFlowers from "@/assets/teaser-flowers.jpg";
import teaserBoats from "@/assets/teaser-boats.jpg";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "MissKonstruction Photography — Portfolio" },
      { name: "description", content: "Maternity, nature, flowers, and saltlife photography by MissKonstruction. Browse the galleries." },
      { property: "og:title", content: "MissKonstruction Photography" },
      { property: "og:description", content: "A clean portfolio of maternity, nature, flower, and saltlife photography." },
      { property: "og:image", content: "/hero-photography.jpg" },
    ],
  }),
});

const featured = [
  { to: "/gallery/maternity", label: "Maternity", image: teaserMaternity },
  { to: "/gallery/newborns", label: "Newborns", image: teaserNewborns },
  { to: "/gallery/florida-birding", label: "Florida Birding", image: teaserNature },
  { to: "/gallery/flowers", label: "Flower Project", image: teaserFlowers },
  { to: "/gallery/boats", label: "Boats & Saltlife", image: teaserBoats },
] as const;

function Home() {
  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden">
        <img
          src={hero}
          alt=""
          width={1920}
          height={1080}
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/60 to-background" />

        <div className="relative z-10 max-w-3xl text-center px-4">
          <p className="text-sm uppercase tracking-[0.3em] text-primary mb-4">Welcome to</p>
          <h1 className="text-5xl md:text-7xl font-light text-foreground leading-tight tracking-tight">
            MissKonstruction
            <span className="block text-primary mt-2 font-extralight">Photography</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto">
            A quiet portfolio of maternity, newborns, nature, flowers, and saltlife —
            captured with care along the Florida coast.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/gallery/maternity"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-md font-medium hover:bg-primary/90 transition-colors"
            >
              View galleries <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 border border-border px-6 py-3 rounded-md font-medium hover:border-primary hover:text-primary transition-colors"
            >
              Get in touch
            </Link>
          </div>
        </div>
      </section>

      {/* Gallery teasers */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Explore the galleries</h2>
          <div className="inline-flex h-px w-16 bg-primary mt-4" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-4">
          {featured.map((f) => (
            <Link
              key={f.to}
              to={f.to}
              className="group relative aspect-[3/4] overflow-hidden rounded-md border border-border bg-card hover:border-primary transition-colors"
            >
              <img
                src={f.image}
                alt={f.label}
                width={768}
                height={1024}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4 flex items-end min-h-[3.5rem]">
                <span className="font-display text-base md:text-lg font-semibold leading-tight text-foreground group-hover:text-primary transition-colors">
                  {f.label}
                  <ArrowRight className="inline-block h-3.5 w-3.5 ml-1 -translate-y-0.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
