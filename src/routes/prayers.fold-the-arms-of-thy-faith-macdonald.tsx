import { createFileRoute } from "@tanstack/react-router";
import { PrayerPage } from "@/components/PrayerPage";
import { getPrayer, prayerSharedHero } from "@/data/prayers";

const prayer = getPrayer("fold-the-arms-of-thy-faith-macdonald")!;
const cleanTitle = prayer.title.replace(/\*\*/g, "");
const title = `${cleanTitle} — A Prayer Study`;
const image = prayer.heroImage ?? prayerSharedHero;

export const Route = createFileRoute("/prayers/fold-the-arms-of-thy-faith-macdonald")({
  component: () => <PrayerPage prayer={prayer} />,
  head: () => ({
    meta: [
      { title },
      { name: "description", content: prayer.description },
      { property: "og:title", content: title },
      { property: "og:description", content: prayer.description },
      { property: "og:type", content: "article" },
      { property: "og:image", content: image },
      { name: "twitter:image", content: image },
    ],
  }),
});
