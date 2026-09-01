# Speed up the site (Journal pages especially)

## What I found

The pages themselves are served fast — the raw HTML for the home page, The Journal, and a category page each come back in under a quarter second from GitHub Pages. The slowdown is what happens *after* the page appears, and it lines up with the read-time + margin-notes work added two days ago.

Measured on the live site:

- Opening The Journal now makes **four** WordPress requests instead of one:
  1. all posts (blocks the page from rendering on navigation)
  2. the featured post's full body, to compute the true read time (also blocking)
  3. all posts again, from the live-refresh hook after the page mounts
  4. the featured post's full body again, from the read-time hook
- A cold WordPress request took **2.1 seconds**; warm ones ~0.4s. So a first visit can stall for several seconds before The Journal draws.
- Category pages (e.g. Blitz, Game Reviews) do the same double fetch: all posts in the loader, then all posts again after mount.
- Unrelated but worth noting: the home page ships about 4 MB of photos, two of them over 1.2 MB (`teaser-maternity.jpg`, `loose-frames-fury.jpg`). They're lazy-loaded, so they don't block first paint, but they make scrolling feel heavy on phones. Not new — it's been that way for months.

## The fix

1. **Share one posts fetch across the whole page.** Add a small in-memory cache (a single shared promise with a short lifetime, ~60 seconds) in the WordPress client so the loader and the live-refresh hooks reuse one result instead of each firing their own. Cuts the "all posts" calls from two (or three across a navigation) down to one.
2. **Stop blocking navigation on the read time.** Remove the featured post's full-body fetch from The Journal's loader; the existing after-mount hook already computes and fills in the accurate read time. The page draws immediately and the read time settles in a moment later, with no visible change to what's on screen.
3. **Skip the redundant refresh right after load.** When the live-refresh hook runs and the cached posts are already fresh, it returns the same data instead of hitting WordPress again.
4. **Cache the featured post body too**, so the read-time lookup doesn't repeat when you bounce between The Journal and a post.

Net effect: The Journal goes from up to four WordPress round trips (two of them blocking) to one non-blocking one; category pages go from two to one.

## Technical notes

- `src/lib/wordpress-public.ts`: add a module-level TTL cache around `getPublicWordPressPosts` and `getPublicWordPressPostBySlug`; the cache is per page-load, so prerender and each visitor still get fresh data.
- `src/routes/blog.index.tsx`: drop `readMinutesForPost` from the loader (keep `useFeaturedReadMinutes`); loader returns posts only.
- `src/hooks/useLiveWordPressPosts.ts`: reuse the cached fetch rather than always issuing a new one.
- `src/routes/blog.$category.index.tsx`: unchanged code, benefits from the shared cache.
- No change to what any page displays — margin notes, read time, entry counts, and the new-post feature all behave exactly as they do now.
