# Fix: shared category links show stale post counts

## What's happening

The Blitz category page at `/blog/in-loving-memory-of-blitz` was baked into the published site at build time, back when the category held one post. I confirmed the published `blog/in-loving-memory-of-blitz/index.html` still contains exactly one post card and the text "1 entry".

- Opening the link directly serves that frozen HTML, so you see 1 entry.
- Clicking in from The Journal makes the browser re-fetch WordPress live, which is why all 5 show up.

This affects every category page, not just Blitz — any posts published or moved since the last deploy are missing on direct/shared links.

## The fix

Two parts.

1. **Self-healing pages (the real fix).** After a category page loads, refresh the WordPress post list in the browser and re-render with the live results. Visitors landing from a shared link get the current post list even if the site hasn't been rebuilt since you published. The baked HTML stays as-is for instant first paint and for search engines, then quietly updates.

2. **Same treatment for The Journal index**, so the category cards and the "From the latest page" feature also reflect posts published since the last build.

A rebuild/redeploy will also correct today's snapshot; part 1 makes sure it doesn't drift again.

## Technical notes

- In `src/routes/blog.$category.index.tsx`, keep the loader as-is (it feeds SSR/prerender), and add a post-hydration client refresh via TanStack Query (`useQuery` on `getPublicWordPressPosts`, seeded with loader data as `initialData`, refetch on mount). Render from the query result rather than `Route.useLoaderData()` directly, so the entry count and cards recompute.
- Apply the identical pattern in `src/routes/blog.index.tsx`.
- Category filtering keeps using `effectiveJournalCategoryFor`, so overrides and aliases behave unchanged.
- No change to `scripts/prerender.mjs`, the deploy workflow, or any data files.
- Failure of the live fetch is non-fatal: the page silently keeps the prerendered content.
