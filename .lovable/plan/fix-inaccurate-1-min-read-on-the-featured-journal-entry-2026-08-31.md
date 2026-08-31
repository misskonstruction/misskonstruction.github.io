# Fix inaccurate "1 min read" on the featured journal entry

## Problem

On The Journal page, the featured "From the latest page" entry shows a read time calculated from the post's **excerpt** (a 1–2 sentence teaser), not the full post. Everything rounds to "1 min read" even for long tutorials.

WordPress.com's API does not provide a read-time field, so it can't be imported directly. But we can compute an accurate one from the full post body.

## Fix

1. **Fetch the full featured post** — In `src/routes/blog.index.tsx`, after loading the post list, fetch the newest post's full content (via the existing `getPublicWordPressPostBySlug` in `src/lib/wordpress-public.ts`).
2. **Compute read time from full content** — Strip HTML, count words, divide by 200 wpm (the same standard WordPress uses). A 1,500-word tutorial will correctly show ~8 min read.
3. **Keep it fast and resilient** — Only the single featured post gets the extra fetch. If it fails, fall back to the excerpt-based estimate (or hide the line) so the page never breaks.
4. **Verify** — Confirm the featured entry shows a realistic read time and the rest of The Journal page is unchanged.

## Fallback option

If you'd rather not show read time at all, I can simply delete the line instead — say the word and I'll switch the plan to removal.

## Technical notes

- Files touched: `src/routes/blog.index.tsx` only (reuses existing `getPublicWordPressPostBySlug` and its HTML-stripping helpers).
- No changes to WordPress, categories, or any other page.
