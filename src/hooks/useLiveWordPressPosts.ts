import { useEffect, useState } from "react";
import { getPublicWordPressPosts, type WordPressPost } from "@/lib/wordpress-public";
import { effectiveJournalCategoryFor } from "@/data/journalCategories";

/**
 * Pages are prerendered at build time, so a shared/direct link serves whatever
 * post list existed at the last deploy. After hydration we quietly refresh the
 * list from WordPress so visitors always see the current posts.
 *
 * The prerendered data is used for first paint (and by crawlers); the live
 * result replaces it once it arrives. A failed fetch is a no-op.
 */
export function useLiveWordPressPosts(initialPosts: WordPressPost[]): WordPressPost[] {
  const [posts, setPosts] = useState<WordPressPost[]>(initialPosts);

  useEffect(() => {
    let cancelled = false;
    getPublicWordPressPosts()
      .then((fresh) => {
        if (!cancelled && Array.isArray(fresh) && fresh.length > 0) setPosts(fresh);
      })
      .catch((e) => {
        console.warn("Live WordPress refresh failed; keeping prerendered posts", e);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return posts;
}

/** Same refresh, filtered to a single journal category (alias/override aware). */
export function useLiveCategoryPosts(
  initialPosts: WordPressPost[],
  categorySlug: string | undefined,
): WordPressPost[] {
  const [posts, setPosts] = useState<WordPressPost[]>(initialPosts);

  useEffect(() => {
    if (!categorySlug) return;
    let cancelled = false;
    getPublicWordPressPosts()
      .then((all) => {
        if (cancelled || !Array.isArray(all)) return;
        setPosts(all.filter((p) => effectiveJournalCategoryFor(p)?.slug === categorySlug));
      })
      .catch((e) => {
        console.warn("Live WordPress refresh failed; keeping prerendered posts", e);
      });
    return () => {
      cancelled = true;
    };
  }, [categorySlug]);

  return posts;
}
