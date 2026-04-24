import { createFileRoute } from "@tanstack/react-router";
import { PrayerPage } from "@/components/PrayerPage";
import { getPrayer, prayerSharedHero } from "@/data/prayers";

const prayer = getPrayer("in-celebration-maisie-renee")!;

export const Route = createFileRoute("/prayers/in-celebration-maisie-renee")({
  component: () => <PrayerPage prayer={prayer} />,
  head: () => {
    const cleanTitle = prayer.title.replace(/\*\*/g, "");
    const title = `${cleanTitle} — A Prayer for Maisie Renee`;
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
});
