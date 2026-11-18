# Bring back Margin Notes (Gladys only)

Good news: the original Margin Notes code is still in your site's history, so it can come back exactly as it looked.

## Where it used to show
- It was only ever on **The Journal** page, just under the big featured "From the latest page" post. It was never on the home page.
- Plan: put it back in that same spot on The Journal, and also show it on **The Lovely Gladys** category page (under the Instagram follow-along banner, above her posts).
- If you'd also like it on the home page, say so and I'll add it in the same style.

## How it will look (same as before)
- Small handwritten heading: "~ margin notes ~" in your pink.
- One soft card: small thumbnail of the post, `Update to "Posts that don't make it to Instagram"`, a two-line italic preview, and "updated Nov 18"-style date on the right.
- Clicking it opens the post and smoothly scrolls to your newest "Update:" heading (same habit as before: a heading starting with "Update:").

## Rules
- Tracks only the Lovely Gladys post "Posts that don't make it to Instagram".
- Appears only when you edit that post 12 hours or more after it was published (quick typo fixes don't trigger it).
- If the post has no qualifying edit yet, the section stays hidden.

## Technical details
- Restore `recentlyUpdatedPosts` + `formatShortDate` and the removed JSX in `src/routes/blog.index.tsx`; extract into a shared `MarginNotes` component used by the Journal index and `blog.$category.index` (Gladys only).
- Identify the post by slug/title match (case-insensitive, "posts-that-dont-make-it-to-instagram") rather than a hard-coded ID, since its WordPress ID isn't known yet; restrict to Gladys category.
- Threshold `modified - date >= 12h`.
- Restore the `#latest-update` tagging in `JournalPostBody.tsx` and the scroll effect in `blog.$category.$postSlug.tsx`.
- Add a small test for the 12-hour rule and the single-post filter.
