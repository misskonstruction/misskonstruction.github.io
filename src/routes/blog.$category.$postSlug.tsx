import { createFileRoute, Link, useRouter, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { JournalPostBody } from "@/components/JournalPostBody";
import { SharePostBar } from "@/components/SharePostBar";
import { getPublicWordPressPostBySlug } from "@/lib/wordpress-public";
import { findJournalCategory, findJournalCategoryByName } from "@/data/journalCategories";

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

export const Route = createFileRoute("/blog/$category/$postSlug")({
  component: PostPage,
  loader: async ({ params }) => {
    const post = await getPublicWordPressPostBySlug(params.postSlug);
    if (!post) throw notFound();
    const cat = post.categories.map(findJournalCategoryByName).find(Boolean) ?? findJournalCategory(params.category);
    return {
      post,
      category: cat
        ? { slug: cat.slug, title: cat.title, emoji: cat.emoji, image: cat.image }
        : null,
    };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [] };
    const { post } = loaderData;
    const title = `${post.title} — The Journal`;
    const description = post.excerpt || "A journal entry from Still & Salted.";
    const image = post.featuredImage ?? loaderData.category?.image;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
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
          Entry not found
        </h1>
        <Link to="/blog" className="text-primary underline">
          Back to The Journal
        </Link>
      </div>
    </SiteLayout>
  ),
});

function PostPage() {
  const { post, category } = Route.useLoaderData();

  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0">
          {post.featuredImage ? (
            <img
              src={post.featuredImage}
              alt=""
              width={1920}
              height={1080}
              className="h-full w-full object-cover opacity-40"
            />
          ) : category ? (
            <img
              src={category.image}
              alt=""
              width={1920}
              height={1080}
              className="h-full w-full object-cover opacity-25"
            />
          ) : null}
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/60 to-background" />
        </div>

        <div className="relative container mx-auto px-4 pt-20 pb-16 md:pt-28 md:pb-24 max-w-3xl text-center">
          {category ? (
            <Link
              to="/blog/$category"
              params={{ category: category.slug }}
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6"
            >
              <ArrowLeft className="h-4 w-4" />
              <span style={{ fontFamily: "var(--font-journal)" }}>{category.title}</span>
            </Link>
          ) : (
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6"
            >
              <ArrowLeft className="h-4 w-4" />
              <span style={{ fontFamily: "var(--font-journal)" }}>The Journal</span>
            </Link>
          )}

          {category && (
            <p
              className="text-primary text-2xl md:text-3xl mb-2"
              style={{ fontFamily: "var(--font-hand)" }}
            >
              {category.emoji} a journal entry
            </p>
          )}
          <h1
            className="text-4xl md:text-6xl text-foreground leading-tight"
            style={{ fontFamily: "var(--font-journal)", fontWeight: 400 }}
          >
            <em className="text-primary">{post.title}</em>
          </h1>
          <div className="mx-auto mt-6 mb-6 h-px w-20 bg-primary/60" />
          <p
            className="text-muted-foreground text-lg"
            style={{ fontFamily: "var(--font-journal)", fontStyle: "italic" }}
          >
            {formatDate(post.date)}
          </p>
        </div>
      </section>

      {/* Body */}
      <section className="container mx-auto px-4 py-16 md:py-20 max-w-3xl">
        <JournalPostBody html={post.content} />

        {(() => {
          const coastal = category?.slug === "coastal-photography";
          return (
            <SharePostBar
              title={post.title}
              url={typeof window !== "undefined" ? window.location.href : post.url}
              image={post.featuredImage ?? category?.image ?? null}
              description={post.excerpt}
              kicker={coastal ? "✦ caught the salt air?" : undefined}
              heading={
                coastal
                  ? "Send this gulf-coast moment to someone who needs the shore"
                  : undefined
              }
            />
          );
        })()}

        <div className="mt-16 text-center">
          {category && (
            <Link
              to="/blog/$category"
              params={{ category: category.slug }}
              className="inline-flex items-center gap-2 text-primary border-b border-primary/40 pb-1"
            >
              <ArrowLeft className="h-4 w-4" />
              <span style={{ fontFamily: "var(--font-journal)" }} className="text-lg">
                More from {category.title}
              </span>
            </Link>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}
