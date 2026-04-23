import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { Camera, UtensilsCrossed, Palette, BookOpen, Leaf, Plane, ArrowRight } from "lucide-react";
import heroImg from "@/assets/blog-hero.jpg";
import coastalImg from "@/assets/blog-coastal.jpg";
import kitchenImg from "@/assets/blog-kitchen.jpg";
import creativeImg from "@/assets/blog-creative.jpg";
import faithImg from "@/assets/blog-faith.jpg";
import reflectionsImg from "@/assets/blog-reflections.jpg";
import wanderImg from "@/assets/blog-wander.jpg";
import { getWordPressPosts, type WPPost } from "@/server/wordpress";

export const Route = createFileRoute("/blog")({
  component: Blog,
  loader: async () => {
    try {
      const posts = await getWordPressPosts();
      return { posts };
    } catch (e) {
      console.error("Failed to load WordPress posts", e);
      return { posts: [] as WPPost[] };
    }
  },
  head: () => ({
    meta: [
      { title: "The Journal — MissKonstruction" },
      {
        name: "description",
        content:
          "A warm, personal journal of coastal photography, kitchen stories, creative life, faith, and quiet reflections.",
      },
      { property: "og:title", content: "The Journal — MissKonstruction" },
      {
        property: "og:description",
        content:
          "A warm, personal journal of coastal photography, kitchen stories, creative life, faith, and quiet reflections.",
      },
      { property: "og:image", content: heroImg },
      { name: "twitter:image", content: heroImg },
    ],
  }),
});

const categoryDefs = [
  {
    icon: Camera,
    emoji: "📷",
    title: "Coastal Photography",
    slug: "coastal-photography",
    blurb:
      "Salt air, soft light, and the slow stories the shoreline keeps telling if you're patient enough to listen.",
    image: coastalImg,
  },
  {
    icon: UtensilsCrossed,
    emoji: "🍳",
    title: "From the Kitchen",
    slug: "from-the-kitchen",
    blurb:
      "Recipes scribbled on the backs of envelopes — comfort food, slow Sundays, and the smell of rosemary on warm bread.",
    image: kitchenImg,
  },
  {
    icon: Palette,
    emoji: "🎨",
    title: "Creative Life",
    slug: "creative-life",
    blurb:
      "Sketchbooks, side projects, and the messy middle of making things — a love letter to staying curious.",
    image: creativeImg,
  },
  {
    icon: BookOpen,
    emoji: "✝️",
    title: "Faith & Scripture",
    slug: "faith-scripture",
    blurb:
      "Verses I keep returning to, prayers half-whispered, and the quiet places where grace meets the ordinary.",
    image: faithImg,
  },
  {
    icon: Leaf,
    emoji: "🌿",
    title: "Reflections",
    slug: "reflections",
    blurb:
      "Field notes from everyday life — gratitude, growth, and the small thoughts worth slowing down for.",
    image: reflectionsImg,
  },
  {
    icon: Plane,
    emoji: "✈️",
    title: "Wander & Roam",
    slug: "wander-roam",
    blurb:
      "Travel notes from the road and the in-between places — little towns, long drives, and the quiet wonder of somewhere new.",
    image: wanderImg,
  },
];

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return iso;
  }
}

function readTime(text: string): string {
  const words = text.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}


function Blog() {
  const { posts } = Route.useLoaderData();

  // Build category counts from real posts
  const counts = new Map<string, number>();
  for (const p of posts) {
    for (const c of p.categories) {
      const key = c.toLowerCase();
      counts.set(key, (counts.get(key) ?? 0) + 1);
    }
  }
  const categories = categoryDefs.map((c) => ({
    ...c,
    posts: counts.get(c.title.toLowerCase()) ?? 0,
  }));

  // Resolve a tasteful image for ANY post — uses the post's own featured image
  // when available, otherwise falls back to a category-matched journal image,
  // and finally to the coastal hero so nothing is ever blank.
  const imageForPost = (post: WPPost): string => {
    if (post.featuredImage) return post.featuredImage;
    const match = categoryDefs.find((c) =>
      post.categories.some((cat) => cat.toLowerCase() === c.title.toLowerCase()),
    );
    return match?.image ?? coastalImg;
  };

  // Pick the latest post as featured
  const latest = posts[0];
  const featuredImage = latest ? imageForPost(latest) : coastalImg;

  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0">
          <img
            src={heroImg}
            alt="Open journal, vintage camera, dried flowers and seashells in warm window light"
            width={1600}
            height={900}
            className="h-full w-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />
        </div>

        <div className="relative container mx-auto px-4 pt-24 pb-20 md:pt-32 md:pb-28 text-center">
          <p
            className="text-primary text-2xl md:text-3xl mb-2"
            style={{ fontFamily: "var(--font-hand)" }}
          >
            welcome to my little corner
          </p>
          <h1
            className="text-5xl md:text-7xl text-foreground"
            style={{ fontFamily: "var(--font-journal)", fontWeight: 400 }}
          >
            The <em className="text-primary">Journal</em>
          </h1>
          <div className="mx-auto mt-6 mb-6 h-px w-20 bg-primary/60" />
          <p
            className="mx-auto max-w-2xl text-lg md:text-xl text-muted-foreground leading-relaxed"
            style={{ fontFamily: "var(--font-journal)", fontStyle: "italic" }}
          >
            A slow, honest place for stories about light through the kitchen window,
            saltwater on the lens, scripture in the margins, and the quiet shape of a creative life.
          </p>
        </div>
      </section>

      {/* Featured */}
      {latest && (
        <section className="container mx-auto px-4 py-16 md:py-24">
          <div className="flex items-baseline justify-between mb-8">
            <h2
              className="text-3xl md:text-4xl"
              style={{ fontFamily: "var(--font-journal)" }}
            >
              From the latest page
            </h2>
            <span
              className="text-primary text-xl hidden md:inline"
              style={{ fontFamily: "var(--font-hand)" }}
            >
              ~ fresh ink ~
            </span>
          </div>

          <article className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="relative">
              <div className="absolute -inset-3 bg-primary/10 rotate-[-1.5deg] rounded-sm" />
              <img
                src={featuredImage}
                alt={latest.title}
                width={1024}
                height={768}
                loading="lazy"
                className="relative w-full h-auto rounded-sm shadow-2xl object-cover aspect-[4/3]"
              />
              <span
                className="absolute -top-4 -right-4 bg-primary text-primary-foreground px-4 py-2 text-lg shadow-lg rotate-3"
                style={{ fontFamily: "var(--font-hand)" }}
              >
                new!
              </span>
            </div>

            <div>
              {latest.categories[0] && (
                <p
                  className="text-primary text-xl mb-3"
                  style={{ fontFamily: "var(--font-hand)" }}
                >
                  {latest.categories[0]}
                </p>
              )}
              <h3
                className="text-3xl md:text-4xl leading-tight mb-5"
                style={{ fontFamily: "var(--font-journal)" }}
              >
                {latest.title}
              </h3>
              <p
                className="text-lg text-muted-foreground leading-relaxed mb-6"
                style={{ fontFamily: "var(--font-journal)", fontStyle: "italic" }}
              >
                "{latest.excerpt}"
              </p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                <span>{formatDate(latest.date)}</span>
                <span className="h-1 w-1 rounded-full bg-muted-foreground/50" />
                <span>{readTime(latest.excerpt)}</span>
              </div>
              <a
                href={latest.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary hover:gap-3 transition-all border-b border-primary/40 pb-1"
              >
                <span style={{ fontFamily: "var(--font-journal)" }} className="text-lg">
                  Read the full entry
                </span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </article>
        </section>
      )}

      {posts.length === 0 && (
        <section className="container mx-auto px-4 py-16 text-center">
          <p
            className="text-muted-foreground text-lg"
            style={{ fontFamily: "var(--font-journal)", fontStyle: "italic" }}
          >
            New entries are on the way — check back soon.
          </p>
        </section>
      )}

      {/* Categories */}
      <section className="container mx-auto px-4 pb-20">
        <div className="text-center mb-14">
          <p
            className="text-primary text-2xl mb-2"
            style={{ fontFamily: "var(--font-hand)" }}
          >
            wander through
          </p>
          <h2
            className="text-4xl md:text-5xl"
            style={{ fontFamily: "var(--font-journal)" }}
          >
            The Categories
          </h2>
          <div className="mx-auto mt-5 h-px w-16 bg-primary/60" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat, i) => {
            const Icon = cat.icon;
            const tilt = i % 2 === 0 ? "rotate-[-0.6deg]" : "rotate-[0.6deg]";
            return (
              <article
                key={cat.title}
                className={`group bg-card border border-border ${tilt} hover:rotate-0 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1 overflow-hidden rounded-sm`}
              >
                <div className="relative overflow-hidden aspect-[4/3]">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    width={1024}
                    height={768}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
                  <div className="absolute top-3 left-3 bg-background/80 backdrop-blur-sm rounded-full h-10 w-10 flex items-center justify-center text-lg">
                    {cat.emoji}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 text-primary mb-2">
                    <Icon className="h-4 w-4" />
                    <span
                      className="text-xl"
                      style={{ fontFamily: "var(--font-hand)" }}
                    >
                      {cat.posts} {cat.posts === 1 ? "entry" : "entries"}
                    </span>
                  </div>
                  <h3
                    className="text-2xl mb-3 text-foreground"
                    style={{ fontFamily: "var(--font-journal)", fontWeight: 500 }}
                  >
                    {cat.title}
                  </h3>
                  <p
                    className="text-muted-foreground leading-relaxed mb-5"
                    style={{ fontFamily: "var(--font-journal)" }}
                  >
                    {cat.blurb}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-sm text-primary group-hover:gap-3 transition-all">
                    Browse the page <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Newsletter / sign-off */}
      <section className="border-t border-border bg-card/30">
        <div className="container mx-auto px-4 py-20 text-center max-w-2xl">
          <p
            className="text-primary text-3xl mb-3"
            style={{ fontFamily: "var(--font-hand)" }}
          >
            p.s.
          </p>
          <h2
            className="text-3xl md:text-4xl mb-4"
            style={{ fontFamily: "var(--font-journal)" }}
          >
            Letters from the journal, every other Sunday.
          </h2>
          <p
            className="text-muted-foreground text-lg mb-8 leading-relaxed"
            style={{ fontFamily: "var(--font-journal)", fontStyle: "italic" }}
          >
            A short, slow note in your inbox — a photo, a recipe, a verse, a thought worth keeping.
            No noise. Just the good kind of quiet.
          </p>
          <form
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              required
              placeholder="your@email.com"
              className="flex-1 bg-background border border-border rounded-sm px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
              style={{ fontFamily: "var(--font-journal)" }}
            />
            <button
              type="submit"
              className="bg-primary text-primary-foreground px-6 py-3 rounded-sm hover:bg-primary/90 transition-colors"
              style={{ fontFamily: "var(--font-journal)", fontWeight: 500 }}
            >
              Subscribe
            </button>
          </form>
          <p
            className="text-primary text-2xl mt-10"
            style={{ fontFamily: "var(--font-hand)" }}
          >
            with love, <br />
            <span className="text-3xl">MissKonstruction</span>
          </p>
        </div>
      </section>
    </SiteLayout>
  );
}
