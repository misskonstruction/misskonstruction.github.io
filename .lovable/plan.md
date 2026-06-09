## Make the teacup steam swirly (not tugboat puffy)

The current steam is three big round radial-gradient puffs that drift up and right — reads more "smokestack" than "tea." I'll replace them with thin, wavy ribbons that sway side-to-side as they rise, like real hot-tea steam.

### Approach

Scope: CSS + a tiny markup change inside `TeaSteam()` in `src/routes/blog.raw-and-unhinged.tsx`. No other files, no layout changes, no repositioning of the steam container (keeps the same anchor over the teacup rim you already approved).

1. **Markup** — replace the 3 round `<span>` puffs with 3–4 thin vertical "wisp" ribbons (SVG paths, each a soft gently-curved squiggle). SVG lets the wisp actually look like a curling ribbon instead of a circle.
2. **Animation** — each wisp:
   - rises straight up (no more drift to the right),
   - sways left↔right via a `translateX` sine on a separate keyframe,
   - slowly rotates a few degrees for the curl,
   - fades in near the cup, fades out near the top,
   - staggered delays + slightly different durations (3.8s / 4.6s / 5.2s) so they never sync.
3. **Look** — keep the warm cream color, screen blend, and blur you already have, but drop opacity a touch and narrow the wisps so it whispers instead of billows.
4. **Reduced motion** — keep the existing `prefers-reduced-motion` rule (wisps go static).

### Preview before committing

Per your note: I won't leave it in place blind. After the edit I'll screenshot the Raw & Unhinged hero in the preview and show you. If the swirl isn't right (too wild / too faint / wrong direction), I'll tune it or revert — your call before anything ships.

### Files touched
- `src/routes/blog.raw-and-unhinged.tsx` — `TeaSteam()` JSX (~6 lines) + the `.ru-steam*` CSS block (~lines 960–999).
