## Protecting the Newborns gallery photos

Short answer: there is no way to make an image *impossible* to save once a browser has rendered it — anyone can screenshot. But we can put up enough friction that casual right-click / drag-save / "Save image as…" won't work, which is what most photographers mean by "protected."

Here's what I'd add, scoped **only to `/gallery/newborns`** so your other galleries stay unchanged:

### Deterrents I'll add
1. **Disable right-click** on gallery images (context menu suppressed).
2. **Block drag-to-save** with `draggable={false}` and CSS `user-select: none` + `-webkit-user-drag: none`.
3. **Transparent overlay** on top of each thumbnail and the lightbox image, so "Save image as…" on the overlay saves a 1×1 transparent PNG instead of the photo.
4. **Disable long-press save on mobile** via `-webkit-touch-callout: none`.
5. **Suppress the lightbox's direct image URL** from being trivially copyable (no "open image in new tab" affordance).
6. **Add a subtle "© MissKonstruction — do not download" caption** under the lightbox on this gallery only.

### What this does NOT stop (being honest)
- Screenshots (phone or desktop).
- DevTools users who inspect the network tab.
- Anyone determined enough to grab the file from the page source.

The only way to fully block those is signed short-lived URLs + DRM-style streaming, which isn't worth the complexity for a photo gallery and still can't beat a screenshot. Your existing bottom-right watermark is the real long-term protection.

### Scope
- Extend `GalleryGrid` with an optional `protect` prop (default `false`) so I don't change behavior on Boats, Flowers, etc.
- Pass `protect` from `src/routes/gallery.newborns.tsx` only.
- Add the small caption text under the newborn header noting images are protected/watermarked.

### Optional (say yes/no)
- Add a **larger, semi-transparent diagonal watermark** across the lightbox view (in addition to your existing bottom-right one) on newborn photos only, for extra deterrence. Thumbnails stay clean.

Want me to include the diagonal lightbox watermark, or just the anti-download deterrents?
