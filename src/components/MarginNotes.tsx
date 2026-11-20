import { Link } from "@tanstack/react-router";
import type { WordPressPost } from "@/lib/wordpress-public";
import { postInJournalCategory } from "@/data/journalCategories";
import { marginNotePosts } from "@/lib/marginNotes";

const CATEGORY = "the-lovely-gladys";

function formatShortDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric" });
  } catch {
    return iso;
  }
}

export function MarginNotes({
  posts,
  imageForPost,
  className = "container mx-auto px-4 pb-16 md:pb-20",
}: {
  posts: WordPressPost[];
  imageForPost: (post: WordPressPost) => string;
  className?: string;
}) {
  const notes = marginNotePosts(posts.filter((p) => postInJournalCategory(p, CATEGORY)));
  if (notes.length === 0) return null;

  return (
    <section className={className}>
      <p className="text-primary text-xl md:text-2xl mb-6 text-center" style={{ fontFamily: "var(--font-hand)" }}>
        ~ margin notes ~
      </p>
      <div className="mx-auto max-w-2xl space-y-5">
        {notes.map(({ post, kind, when }) => (
          <Link
            key={post.id}
            to="/blog/$category/$postSlug"
            params={{ category: CATEGORY, postSlug: post.slug }}
            hash={kind === "update" ? "latest-update" : undefined}
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
              <p className="text-foreground truncate" style={{ fontFamily: "var(--font-journal)", fontWeight: 500 }}>
                {kind === "update" ? "Update to" : "New:"} "{post.title}"
              </p>
              <p className="text-sm text-muted-foreground line-clamp-2" style={{ fontFamily: "var(--font-journal)", fontStyle: "italic" }}>
                {post.excerpt}
              </p>
            </div>
            <span className="text-primary text-lg flex-shrink-0" style={{ fontFamily: "var(--font-hand)" }}>
              {kind === "update" ? "updated" : "posted"} {formatShortDate(when)}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
