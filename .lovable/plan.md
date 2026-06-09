## Subtle animated shimmer on the candle wax drips

The drips are baked into `desk-scene.jpg` — they can't physically move. What I can do is overlay a very subtle moving highlight on top of them so they look slick and wet, like fresh wax catching the flame's light. No new dripping motion, no shape changes to the photo — just a slow glisten traveling down the existing drips.

### Approach

Scope: `src/routes/blog.raw-and-unhinged.tsx` only. Mirrors the pattern used by the candle flame, tea steam, and (now-removed) shimmer — small absolutely-positioned overlay anchored by percentage to the desk image.

1. **Anchor** — small vertical strip over the candle drip area: roughly `left: 16.5%`, `top: 17%`, `width: 5%`, `height: 18%` of the scene. Hard-clipped with `overflow: hidden` and a soft mask so the glow can't leak off the candle.
2. **Glisten content** — a thin, soft warm-white highlight (linear gradient strip, blurred, `mix-blend-mode: screen`, low opacity ~0.35 peak). Think wet wax catching candlelight.
3. **Motion** — the highlight slowly drifts top→bottom over ~6s, fades in mid-travel and out near the bottom, then a long pause before the next pass. Two staggered highlights at slightly different x-offsets and durations (6s / 8s) so the candle subtly "breathes" instead of pulsing on a beat.
4. **No horizontal motion** — vertical only, since wax flows down. Stays inside the clipped strip.
5. **Reduced motion** — frozen via the existing `prefers-reduced-motion` rule.

### Boundary safety

Same lessons as before: `overflow: hidden` + radial-gradient mask + percentage anchoring. If the position is even a hair off the actual drips in the photo, I'll nudge `left/top` only — nothing else changes.

### Preview before declaring done

After the edit I'll screenshot and zoom in on the candle so you can confirm the glow lands on the wax (not the brass dish, not the wall) before we ship.

### Files touched
- `src/routes/blog.raw-and-unhinged.tsx` — add `<WaxShimmer />` (~10 lines JSX) into the scene and a `.ru-wax-*` CSS block (~35 lines) near the existing flame/steam styles.
