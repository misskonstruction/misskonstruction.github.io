import type { WordPressPost } from "@/lib/wordpress-public";

/** An edit must land at least this long after publishing to count as an update. */
export const MARGIN_NOTE_THRESHOLD_MS = 12 * 60 * 60 * 1000;

function normalize(s: string): string {
  return s
    .toLowerCase()
    .replace(/&#8217;|&rsquo;|[’']/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

/** The only post Margin Notes tracks: "Posts that don't make it to Instagram". */
export function isMarginNotePost(post: Pick<WordPressPost, "title" | "slug">): boolean {
  const key = "posts that dont make it to instagram";
  return normalize(post.title).includes(key) || normalize(post.slug ?? "").includes(key);
}

/** Tracked posts edited 12h+ after publishing, most recently updated first. */
export function marginNotePosts<T extends Pick<WordPressPost, "title" | "slug" | "date" | "modified">>(posts: T[]): T[] {
  return posts
    .filter((p) => {
      if (!p.modified || !isMarginNotePost(p)) return false;
      const published = new Date(p.date).getTime();
      const modified = new Date(p.modified).getTime();
      return Number.isFinite(published) && Number.isFinite(modified) && modified - published >= MARGIN_NOTE_THRESHOLD_MS;
    })
    .sort((a, b) => new Date(b.modified!).getTime() - new Date(a.modified!).getTime())
    .slice(0, 1);
}
