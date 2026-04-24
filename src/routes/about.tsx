import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import profileImage from "@/assets/profile-misskonstruction.jpg";

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
            Hi, I'm Cami LeGrand — the eyes behind the lens and owner of
            MissKonstruction Photography. I'm a Florida-based photographer with
            a love for the coast, soft moments, and the small things easy to
            miss.
          </p>
          <p>
            My work spans maternity and newborn sessions, Florida gulf coast
            birding, flowers, and the slow rhythm of saltlife. Each gallery is
            curated and refreshed as new work comes in.
          </p>
        </div>
        <div className="mt-10 flex justify-end">
          <div className="h-40 w-40 rounded-full overflow-hidden border-4 border-primary/30 bg-card">
            <img
              src={profileImage}
              alt="MissKonstruction — photographer portrait"
              width={320}
              height={320}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
