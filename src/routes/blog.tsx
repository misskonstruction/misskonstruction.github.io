import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import sphinx from "@/assets/sphinx-construction.png";

export const Route = createFileRoute("/blog")({
  component: Blog,
  head: () => ({
    meta: [
      { title: "Blog — Under Construction | MissKonstruction Photography" },
      { name: "description", content: "The blog is being rebuilt. Check back soon!" },
      { name: "robots", content: "noindex" },
    ],
  }),
});

function Blog() {
  return (
    <SiteLayout>
      <section className="container mx-auto px-4 py-16 text-center max-w-xl">
        <img
          src={sphinx}
          alt="Cartoon sphinx cat in a hard hat behind a construction barrier"
          width={420}
          height={420}
          loading="lazy"
          className="mx-auto h-auto w-72 md:w-80"
        />
        <h1 className="text-4xl md:text-5xl font-bold mt-6">Under Construction</h1>
        <div className="inline-flex h-px w-16 bg-primary mt-4 mb-6" />
        <p className="text-muted-foreground">
          The blog is taking a little nap while it gets a fresh coat of paint.
          Pawse here a moment — new posts are on the way.
        </p>
      </section>
    </SiteLayout>
  );
}
