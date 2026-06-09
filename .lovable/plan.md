## Subtle sun-on-water shimmer in the window

A tiny, tightly-clipped shimmer of light just under the sun on the ocean — only inside the indicated white-marker patch, only moving left↔right (no vertical drift), no expansion beyond the marked area.

### Approach

Scope: `src/routes/blog.raw-and-unhinged.tsx` only — one new absolutely-positioned overlay inside the existing hero scene container, plus a small CSS block. No image edits, no layout changes, nothing outside that container.

1. **Placement** — a small horizontal ellipse anchored at roughly `left: 51%`, `top: 16%`, `width: ~7%`, `height: ~3%` of the scene container. That maps to the patch you drew on the water below the sun. Clipped with `overflow: hidden` + a radial fade mask so the edges feather into the water and nothing leaks outside the marked spot.
2. **Shimmer content** — 2 very thin horizontal warm-white highlight bands (think sunlight glint on a tiny ripple). Each is a soft `linear-gradient` strip, blurred, `mix-blend-mode: screen`, low opacity (~0.4 peak).
3. **Motion (left↔right only)** — each band translates a few pixels horizontally on a slow sine, fades in and out, with offset delays so it pulses like real water glint. No `translateY`, no `scale`, no rotation. Stays inside the clipped ellipse at all times.
4. **Realism touches** — slightly different durations per band (3.8s / 5.2s) so they never sync; very soft blur; low contrast; the whole layer sits below your title text z-index.
5. **Reduced motion** — `prefers-reduced-motion: reduce` freezes the bands (static faint highlight).

### Boundary safety

Because the previous shimmer attempts leaked out of the window, this one uses a hard `overflow: hidden` container plus a radial-gradient `mask-image` so even if a band animated wrong, it physically cannot render outside the small marked patch. Container is positioned by percentage of the scene image (same anchoring system the candle flame and tea steam use), so it stays glued to the water spot at every viewport size.

### Preview before declaring done

After the edit I'll screenshot the hero and crop in on the window so you can confirm placement and intensity before anything ships. If the position is off by a few pixels we tune `left/top` only — no other parameters change.

### Files touched
- `src/routes/blog.raw-and-unhinged.tsx` — add `<WaterShimmer />` component (~15 lines JSX) inside the hero scene, and a scoped `.ru-water-glint*` CSS block (~30 lines) near the existing `.ru-steam` styles.
