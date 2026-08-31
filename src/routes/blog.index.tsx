import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { ArrowRight } from "lucide-react";
import heroImg from "@/assets/blog-hero.jpg";
import coastalImg from "@/assets/blog-coastal.jpg";
import {
  getPublicWordPressPosts,
  getPublicWordPressPostBySlug,
  type WordPressPost,
} from "@/lib/wordpress-public";
import { useLiveWordPressPosts } from "@/hooks/useLiveWordPressPosts";
import {
  journalCategories,
  journalCategoryMatches,
  effectiveJournalCategoryFor,
} from "@/data/journalCategories";
import { recipes } from "@/data/recipes";
import { prayers } from "@/data/prayers";
import { rawUnhingedEntries } from "@/data/rawUnhingedEntries";


export const Route = createFileRoute("/blog/")({
  component: Blog,
  loader: async () => {
    try {
      const posts = await getPublicWordPressPosts();
      // WordPress.com doesn't expose a read-time field, and the excerpt is far
      // too short to estimate from — fetch the featured post's full body and
      // compute minutes from that instead.
      const featuredReadMinutes = await readMinutesForPost(posts[0]);
      return { posts, featuredReadMinutes };
    } catch (e) {
      console.error("Failed to load WordPress posts", e);
      return { posts: [] as WordPressPost[], featuredReadMinutes: null as number | null };
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

// Category cards read from the shared journal category registry so a category
// added there shows up here, on its own page, and in the post routes at once.


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

function formatShortDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  } catch {
    return iso;
  }
}

/**
 * Game Reviews & Walk-Throughs posts edited meaningfully after publication
 * (more than 24h later), most recently updated first — capped at the single
 * latest one. Quick typo fixes right after publishing don't count.
 */
function recentlyUpdatedPosts(posts: WordPressPost[], excludeId?: number): WordPressPost[] {
  const THRESHOLD_MS = 24 * 60 * 60 * 1000;
  return posts
    .filter((p) => {
      if (!p.modified || p.id === excludeId) return false;
      if (effectiveJournalCategoryFor(p)?.slug !== "game-reviews-walk-throughs") return false;
      const published = new Date(p.date).getTime();
      const modified = new Date(p.modified).getTime();
      return Number.isFinite(published) && Number.isFinite(modified) && modified - published > THRESHOLD_MS;
    })
    .sort((a, b) => new Date(b.modified!).getTime() - new Date(a.modified!).getTime())
    .slice(0, 1);
}

/** Word count from (sanitized) post HTML. */
function wordCountFromHtml(html: string): number {
  return html.replace(/<[^>]*>/g, " ").split(/\s+/).filter(Boolean).length;
}

/**
 * Estimated read minutes for a post, computed from its full body.
 * Returns null when the full post can't be fetched (callers hide the line).
 */
async function readMinutesForPost(post: WordPressPost | undefined): Promise<number | null> {
  if (!post) return null;
  try {
    const full = await getPublicWordPressPostBySlug(post.slug);
    if (!full?.content) return null;
    return Math.max(1, Math.round(wordCountFromHtml(full.content) / 200));
  } catch {
    return null;
  }
}

/**
 * Keeps the featured post's read time accurate after the live WordPress
 * refresh swaps in a different newest post.
 */
function useFeaturedReadMinutes(
  latest: WordPressPost | undefined,
  initialMinutes: number | null,
): number | null {
  const [minutes, setMinutes] = useState<number | null>(initialMinutes);

  useEffect(() => {
    setMinutes(initialMinutes);
  }, [initialMinutes]);

  useEffect(() => {
    if (!latest) return;
    let cancelled = false;
    readMinutesForPost(latest).then((fresh) => {
      if (!cancelled && fresh !== null) setMinutes(fresh);
    });
    return () => {
      cancelled = true;
    };
  }, [latest?.slug]); // eslint-disable-line react-hooks/exhaustive-deps

  return minutes;
}

// In-house entry counts derived from the recipe registry — counted
// alongside WordPress posts so category cards reflect total entries.
const inHouseEntriesByCategorySlug: Record<string, number> = (() => {
  const acc: Record<string, number> = {};
  for (const r of recipes) {
    for (const slug of [r.categorySlug, ...(r.alsoInCategories ?? [])]) {
      acc[slug] = (acc[slug] ?? 0) + 1;
    }
  }
  for (const p of prayers) {
    for (const slug of [p.categorySlug, ...((p as { alsoInCategories?: string[] }).alsoInCategories ?? [])]) {
      acc[slug] = (acc[slug] ?? 0) + 1;
    }
  }
  acc["raw-and-unhinged"] = (acc["raw-and-unhinged"] ?? 0) + rawUnhingedEntries.length;
  return acc;
})();

function Blog() {
  const { posts: prerenderedPosts, featuredReadMinutes } = Route.useLoaderData();
  const posts = useLiveWordPressPosts(prerenderedPosts);

  // Count WordPress posts per category using the shared alias-aware matcher,
  // so WordPress name variants land on the right card.
  const categories = journalCategories.map((c) => {
    const wpCount = (posts as WordPressPost[]).filter((p) =>
      p.categories.some((name: string) => journalCategoryMatches(name, c)),
    ).length;

    return {
      ...c,
      posts: wpCount + (inHouseEntriesByCategorySlug[c.slug] ?? 0),
    };
  });

  const imageForPost = (post: WordPressPost): string => {
    if (post.featuredImage) return post.featuredImage;
    return effectiveJournalCategoryFor(post)?.image ?? coastalImg;
  };


  const latest = posts[0];
  const featuredImage = latest ? imageForPost(latest) : coastalImg;
  const latestReadMinutes = useFeaturedReadMinutes(latest, featuredReadMinutes);
  const updatedPosts = recentlyUpdatedPosts(posts as WordPressPost[], latest?.id);

  return (
    <SiteLayout>
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
                {latestReadMinutes !== null && (
                  <>
                    <span className="h-1 w-1 rounded-full bg-muted-foreground/50" />
                    <span>{latestReadMinutes} min read</span>
                  </>
                )}
              </div>
              {(() => {
                const latestCat = effectiveJournalCategoryFor(latest);
                const categorySlug = latestCat?.slug ?? "reflections";

                return (
                  <Link
                    to="/blog/$category/$postSlug"
                    params={{ category: categorySlug, postSlug: latest.slug }}
                    className="inline-flex items-center gap-2 text-primary hover:gap-3 transition-all border-b border-primary/40 pb-1"
                  >
                    <span style={{ fontFamily: "var(--font-journal)" }} className="text-lg">
                      Read the full entry
                    </span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                );
              })()}
            </div>
          </article>
        </section>
      )}

      {updatedPosts.length > 0 && (
        <section className="container mx-auto px-4 pb-16 md:pb-20">
          <p
            className="text-primary text-xl md:text-2xl mb-6 text-center"
            style={{ fontFamily: "var(--font-hand)" }}
          >
            ~ margin notes ~
          </p>
          <div className="mx-auto max-w-2xl space-y-5">
            {updatedPosts.map((post) => {
              const categorySlug = effectiveJournalCategoryFor(post)?.slug ?? "reflections";
              return (
                <Link
                  key={post.id}
                  to="/blog/$category/$postSlug"
                  params={{ category: categorySlug, postSlug: post.slug }}
                  hash="latest-update"
                  className="group flex items-center gap-4 bg-card/60 border border-border/60 rounded-sm px-4 py-3 hover:border-primary/40 hover:bg-card transition-colors"
                >
                  <img
                    src={imageForPost(post)}
                    alt=""
                    width={96}
                    height={96}
                    loading="lazy"
                    className="h-16 w-16 rounded-sm object-cover flex-shrink-0 opacity-80 group-hover:opacity-100 transition-opacity"
                  />
                  <div className="min-w-0 flex-1">
                    <p
                      className="text-foreground truncate"
                      style={{ fontFamily: "var(--font-journal)", fontWeight: 500 }}
                    >
                      Update to "{post.title}"
                    </p>
                    <p
                      className="text-sm text-muted-foreground line-clamp-2"
                      style={{ fontFamily: "var(--font-journal)", fontStyle: "italic" }}
                    >
                      {post.excerpt}
                    </p>
                  </div>
                  <span
                    className="text-primary text-lg flex-shrink-0"
                    style={{ fontFamily: "var(--font-hand)" }}
                  >
                    updated {formatShortDate(post.modified!)}
                  </span>
                </Link>
              );
            })}
          </div>
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
              <Link
                key={cat.title}
                to="/blog/$category"
                params={{ category: cat.slug }}
                className={`group bg-card border border-border ${tilt} hover:rotate-0 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1 overflow-hidden rounded-sm block`}
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
              </Link>
            );
          })}
        </div>
      </section>

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
