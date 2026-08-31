# Narrow Margin Notes to one update, game walk-throughs only

## Goal
Refine the "Margin Notes" section so it:
1. Shows **only the single most recently updated post** (not up to 3).
2. Only considers posts in the **Game Reviews & Walk-Throughs** category — updates in other categories never appear.
3. Uses a **24-hour** threshold after publishing (instead of 48) to count as an update.

So once you publish the TREAT update, it will replace whatever is currently shown (including the Aug 24 one) as the single margin note.

## Changes
- **`src/routes/blog.index.tsx`**:
  - In `recentlyUpdatedPosts`, filter to posts whose effective journal category is `game-reviews-walk-throughs`.
  - Change the threshold from `48h` to `24h`.
  - Take `.slice(0, 1)` so only the latest one renders.
  - Keep the "exclude the currently featured post" rule so it never duplicates the featured section.
- Styling, layout, links, and the featured-new-post section stay exactly as they are.

## Notes
- Detection is still automatic from WordPress `modified` timestamps — nothing extra for you to do when updating the TREAT post.
- Since the list is capped at 1, the Aug 24 note will naturally roll off the moment a newer update (TREAT) is published.
