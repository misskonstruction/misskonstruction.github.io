import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { ArrowLeft, ArrowRight, Camera, UtensilsCrossed, Palette, BookOpen, Leaf, Plane } from "lucide-react";
import { getWordPressPosts, type WPPost } from "@/server/wordpress";

import coastalImg from "@/assets/blog-coastal.jpg";
import kitchenImg from "@/assets/blog-kitchen.jpg";
import creativeImg from "@/assets/blog-creative.jpg";
import faithImg from "@/assets/blog-faith.jpg";
import reflectionsImg from "@/assets/blog-reflections.jpg";
import wanderImg from "@/assets/blog-wander.jpg";
import { getRecipesByCategory } from "@/data/recipes";

type CategoryDef = {
  slug: string;
  title: string;
  emoji: string;
  blurb: string;
  image: string;
  icon: typeof Camera;
};

type SerializableCategory = Omit<CategoryDef, "icon">;

const categories: CategoryDef[] = [
  {
    slug: "coastal-photography",
    title: "Coastal Photography",
    emoji: "📷",
    blurb: "Salt air, soft light, and the slow stories the shoreline keeps telling.",
    image: coastalImg,
    icon: Camera,
  },
  {
    slug: "from-the-kitchen",
    title: "From the Kitchen",
    emoji: "🍳",
    blurb: "Recipes scribbled on the backs of envelopes — comfort food, slow Sundays.",
    image: kitchenImg,
    icon: UtensilsCrossed,
  },
  {
    slug: "creative-life",
    title: "Creative Life",
    emoji: "🎨",
    blurb: "Sketchbooks, side projects, and the messy middle of making things.",
    image: creativeImg,
    icon: Palette,
  },
  {
    slug: "faith-scripture",
    title: "Faith & Scripture",
    emoji: "✝️",
    blurb: "Verses I keep returning to, and the quiet places where grace meets the ordinary.",
    image: faithImg,
    icon: BookOpen,
  },
  {
    slug: "reflections",
    title: "Reflections",
    emoji: "🌿",
    blurb: "Field notes from everyday life — gratitude, growth, and small thoughts worth slowing down for.",
    image: reflectionsImg,
    icon: Leaf,
  },
  {
    slug: "wander-roam",
    title: "Wander & Roam",
    emoji: "✈️",
    blurb: "Travel notes from the road and the in-between places — little towns, long drives, the quiet wonder of somewhere new.",
    image: wanderImg,
    icon: Plane,
  },
];

function findCategory(slug: string): CategoryDef | undefined {
  return categories.find((c) => c.slug === slug);
}

function serializeCategory(category: CategoryDef | undefined): SerializableCategory | null {
  if (!category) return null;
  return {
    slug: category.slug,
    title: category.title,
    emoji: category.emoji,
    blurb: category.blurb,
    image: category.image,
  };
}

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

function imageForPost(post: WPPost, fallback: string): string {
  if (post.featuredImage) return post.featuredImage;
  return fallback;
}

export const Route = createFileRoute("/blog/$category")({
  component: CategoryPage,
  loader: async ({ params }) => {
    const cat = findCategory(params.category);
    const serializableCategory = serializeCategory(cat);
    try {
      const all = await getWordPressPosts();
      const posts = cat
        ? all.filter((p) =>
            p.categories.some((c) => c.toLowerCase() === cat.title.toLowerCase()),
          )
        : [];
      return { posts, category: serializableCategory };
    } catch (e) {
      console.error("Failed to load WordPress posts", e);
      return { posts: [] as WPPost[], category: serializableCategory };
    }
  },
  head: ({ params }) => {
    const cat = findCategory(params.category);
    const title = cat ? `${cat.title} — The Journal` : "Category — The Journal";
    const description = cat?.blurb ?? "Browse posts from the journal.";
    const image = cat?.image;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        ...(image ? [{ property: "og:image", content: image }, { name: "twitter:image", content: image }] : []),
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
          Category not found
        </h1>
        <Link to="/blog" className="text-primary underline">
          Back to The Journal
        </Link>
      </div>
    </SiteLayout>
  ),
});

function CategoryPage() {
  const { posts, category } = Route.useLoaderData();
  const fullCategory = category ? findCategory(category.slug) : undefined;

  if (!category || !fullCategory) {
    return (
      <SiteLayout>
        <div className="container mx-auto px-4 py-24 text-center">
          <h1
            className="text-3xl mb-4"
            style={{ fontFamily: "var(--font-journal)" }}
          >
            That page doesn't exist
          </h1>
          <Link to="/blog" className="text-primary inline-flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to The Journal
          </Link>
        </div>
      </SiteLayout>
    );
  }

  const Icon = fullCategory.icon;
  const featuredRecipes = getRecipesByCategory(category.slug);

  return (
    <SiteLayout>
      {/* Header */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0">
          <img
            src={category.image}
            alt=""
            width={1600}
            height={900}
            className="h-full w-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
        </div>

        <div className="relative container mx-auto px-4 pt-20 pb-16 md:pt-28 md:pb-20 text-center">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            <span style={{ fontFamily: "var(--font-journal)" }}>The Journal</span>
          </Link>

          <p
            className="text-primary text-2xl md:text-3xl mb-2"
            style={{ fontFamily: "var(--font-hand)" }}
          >
            {category.emoji} the page on
          </p>
          <h1
            className="text-5xl md:text-6xl text-foreground"
            style={{ fontFamily: "var(--font-journal)", fontWeight: 400 }}
          >
            <em className="text-primary">{category.title}</em>
          </h1>
          <div className="mx-auto mt-6 mb-6 h-px w-20 bg-primary/60" />
          <p
            className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed"
            style={{ fontFamily: "var(--font-journal)", fontStyle: "italic" }}
          >
            {category.blurb}
          </p>
          {(() => {
            const totalEntries = posts.length + featuredRecipes.length;
            return (
              <div className="mt-6 inline-flex items-center gap-2 text-primary text-xl" style={{ fontFamily: "var(--font-hand)" }}>
                <Icon className="h-4 w-4" />
                {totalEntries} {totalEntries === 1 ? "entry" : "entries"}
              </div>
            );
          })()}
        </div>
      </section>

      {/* Featured in-house recipes */}
      {featuredRecipes.length > 0 && (
        <section className="container mx-auto px-4 pt-16 md:pt-20">
          <div className="max-w-5xl mx-auto mb-8">
            <p
              className="text-primary text-2xl mb-1"
              style={{ fontFamily: "var(--font-hand)" }}
            >
              from the recipe box
            </p>
            <h2
              className="text-3xl md:text-4xl text-foreground"
              style={{ fontFamily: "var(--font-journal)" }}
            >
              Featured <em className="text-primary">recipes</em>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {featuredRecipes.map((r, i) => {
              const tilt = i % 2 === 0 ? "rotate-[-0.6deg]" : "rotate-[0.6deg]";
              const cardTitle = r.title.replace(/\*\*/g, "");
              return (
                <Link
                  key={r.slug}
                  to="/recipes/$recipeSlug"
                  params={{ recipeSlug: r.slug }}
                  className={`group bg-card border border-primary/30 ${tilt} hover:rotate-0 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1 overflow-hidden rounded-sm block`}
                >
                  <div className="relative overflow-hidden aspect-[4/3]">
                    <img
                      src={r.heroImage}
                      alt={cardTitle}
                      width={1024}
                      height={768}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
                    <span
                      className="absolute top-3 left-3 bg-background/90 backdrop-blur px-3 py-1 rounded-sm text-xs uppercase tracking-wider text-primary border border-primary/30"
                      style={{ fontFamily: "var(--font-journal)" }}
                    >
                      Recipe
                    </span>
                  </div>
                  <div className="p-6">
                    <h3
                      className="text-2xl mb-3 text-foreground leading-tight"
                      style={{ fontFamily: "var(--font-journal)", fontWeight: 500 }}
                    >
                      {cardTitle}
                    </h3>
                    <p
                      className="text-muted-foreground leading-relaxed mb-4 line-clamp-3"
                      style={{ fontFamily: "var(--font-journal)" }}
                    >
                      {r.intro}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-sm text-primary group-hover:gap-3 transition-all">
                      View the recipe <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
          <div className="mx-auto mt-16 h-px w-20 bg-primary/30" />
        </section>
      )}

      {/* Posts */}
      <section className="container mx-auto px-4 py-16 md:py-20">
        {posts.length === 0 ? (
          featuredRecipes.length === 0 ? (
            <div className="text-center py-16">
              <p
                className="text-muted-foreground text-lg mb-2"
                style={{ fontFamily: "var(--font-journal)", fontStyle: "italic" }}
              >
                No entries here yet — check back soon.
              </p>
              <p className="text-sm text-muted-foreground">
                Posts on WordPress filed under "{category.title}" will appear here.
              </p>
            </div>
          ) : null
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, i) => {
              const tilt = i % 2 === 0 ? "rotate-[-0.6deg]" : "rotate-[0.6deg]";
              return (
                <Link
                  key={post.id}
                  to="/blog/$category/$postSlug"
                  params={{ category: category.slug, postSlug: post.slug }}
                  className={`group bg-card border border-border ${tilt} hover:rotate-0 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1 overflow-hidden rounded-sm block`}
                >
                  <div className="relative overflow-hidden aspect-[4/3]">
                    <img
                      src={imageForPost(post, category.image)}
                      alt={post.title}
                      width={1024}
                      height={768}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
                  </div>
                  <div className="p-6">
                    <p className="text-sm text-muted-foreground mb-2">
                      {formatDate(post.date)}
                    </p>
                    <h3
                      className="text-2xl mb-3 text-foreground leading-tight"
                      style={{ fontFamily: "var(--font-journal)", fontWeight: 500 }}
                    >
                      {post.title}
                    </h3>
                    <p
                      className="text-muted-foreground leading-relaxed mb-4 line-clamp-3"
                      style={{ fontFamily: "var(--font-journal)" }}
                    >
                      {post.excerpt}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-sm text-primary group-hover:gap-3 transition-all">
                      Read the full entry <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </SiteLayout>
  );
}
