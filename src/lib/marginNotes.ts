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

/** Posts Margin Notes tracks. alwaysShow posts appear as "New" before their first update. */
const TRACKED = [
  { key: "posts that dont make it to instagram", alwaysShow: false },
  { key: "my service dog training chronicles", alwaysShow: true },
];

function trackedEntry(post: Pick<WordPressPost, "title" | "slug">) {
  const t = normalize(post.title);
  const s = normalize(post.slug ?? "");
  return TRACKED.find((e) => t.includes(e.key) || s.includes(e.key));
}

export function isMarginNotePost(post: Pick<WordPressPost, "title" | "slug">): boolean {
  return !!trackedEntry(post);
}

type Base = Pick<WordPressPost, "title" | "slug" | "date" | "modified">;
export type MarginNote<T> = { post: T; kind: "update" | "new"; when: string };

/** Tracked posts to announce, most recently changed first. */
export function marginNotePosts<T extends Base>(posts: T[]): MarginNote<T>[] {
  const notes: MarginNote<T>[] = [];
  for (const p of posts) {
    const entry = trackedEntry(p);
    if (!entry) continue;
    const published = new Date(p.date).getTime();
    const modified = p.modified ? new Date(p.modified).getTime() : NaN;
    if (Number.isFinite(published) && Number.isFinite(modified) && modified - published >= MARGIN_NOTE_THRESHOLD_MS) {
      notes.push({ post: p, kind: "update", when: p.modified! });
    } else if (entry.alwaysShow && Number.isFinite(published)) {
      notes.push({ post: p, kind: "new", when: p.date });
    }
  }
  return notes
    .sort((a, b) => new Date(b.when).getTime() - new Date(a.when).getTime())
    .slice(0, TRACKED.length);
}
