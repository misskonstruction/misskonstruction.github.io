## Fix mobile lightbox navigation in GalleryGrid

**Problem:** In the lightbox (`src/components/GalleryGrid.tsx`), the prev/next arrow buttons and the `<figure>` holding the image are siblings inside a flex container. On mobile the figure is full-width (`w-full`), so it visually and interactively covers the `left-4`/`right-4` arrow buttons — they're effectively unreachable. On desktop there's enough horizontal room that the arrows peek out beyond the image.

**Fix (presentation-only, single file):**

1. Give the prev/next buttons `z-10` (and keep the close button on top) so they layer above the figure.
2. Enlarge the mobile tap target and add a subtle translucent background circle so the arrows are visible against any photo (e.g. `rounded-full bg-background/60 p-2` with `h-6 w-6` icon on mobile, scaling up on `md:`).
3. Add touch-swipe support: track `touchstart`/`touchend` on the lightbox overlay; a horizontal swipe > ~50px calls `step(1)` or `step(-1)`. This is the native gesture iOS/Android users expect and also serves as a fallback.
4. No changes to gallery data, routes, or desktop behavior.

**Verification:** Use Playwright at mobile viewport (390×844) to open a gallery, tap a photo, confirm the arrows are visible and tappable, and simulate a swipe to advance the image. Screenshot before/after.