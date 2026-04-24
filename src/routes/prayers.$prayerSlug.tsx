import { createFileRoute, Link, useRouter, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { PrayerPage } from "@/components/PrayerPage";
import { getPrayer, prayerSharedHero } from "@/data/prayers";

export const Route = createFileRoute("/prayers/$prayerSlug")({
  component: PrayerRoute,
  loader: ({ params }) => {
    const prayer = getPrayer(params.prayerSlug);
    if (!prayer) throw notFound();
    return { prayer };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [] };
    const { prayer } = loaderData;
    const cleanTitle = prayer.title.replace(/\*\*/g, "");
    const title = `${cleanTitle} — A Prayer Study`;
    const image = prayer.heroImage ?? prayerSharedHero;
    return {
      meta: [
        { title },
        { name: "description", content: prayer.description },
        { property: "og:title", content: title },
        { property: "og:description", content: prayer.description },
        { property: "og:type", content: "article" },
        { property: "og:image", content: image },
        { name: "twitter:image", content: image },
      ],
    };
  },
  errorComponent: ({ error, reset }) => {
    const router = useRouter();
    return (
      <SiteLayout>
        <div className="container mx-auto px-4 py-24 text-center">
          <h1 className="text-3xl mb-4" style={{ fontFamily: "var(--font-journal)" }}>
            Something went wrong
          </h1>
          <p className="text-muted-foreground mb-6">{error.message}</p>
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="bg-primary text-primary-foreground px-5 py-2 rounded-sm"
          >
            Try again
          </button>
        </div>
      </SiteLayout>
    );
  },
  notFoundComponent: () => (
    <SiteLayout>
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-3xl mb-4" style={{ fontFamily: "var(--font-journal)" }}>
          Prayer not found
        </h1>
        <Link to="/blog/$category" params={{ category: "faith-scripture" }} className="text-primary underline">
          Back to Faith & Scripture
        </Link>
      </div>
    </SiteLayout>
  ),
});

function PrayerRoute() {
  const { prayer } = Route.useLoaderData();
  return <PrayerPage prayer={prayer} />;
}
