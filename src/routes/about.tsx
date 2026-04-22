import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";

export const Route = createFileRoute("/about")({
  component: About,
  head: () => ({
    meta: [
      { title: "About — MissKonstruction Photography" },
      { name: "description", content: "About MissKonstruction Photography — a Florida-based portrait and nature photographer." },
    ],
  }),
});

function About() {
  return (
    <SiteLayout>
      <section className="container mx-auto px-4 py-16 max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold">About</h1>
        <div className="inline-flex h-px w-16 bg-primary mt-4 mb-8" />
        <div className="prose prose-invert max-w-none text-muted-foreground space-y-4 text-base leading-relaxed">
          <p>
            MissKonstruction Photography is the personal portfolio of a Florida-based
            photographer with a love for the coast, soft moments, and the small
            things easy to miss.
          </p>
          <p>
            Work spans maternity sessions, nature and wildlife, flowers, and the
            slow rhythm of saltlife. Each gallery is curated and refreshed as
            new work comes in.
          </p>
          <p className="text-sm">
            Replace this copy with your own bio whenever you're ready.
          </p>
        </div>
      </section>
    </SiteLayout>
  );
}
