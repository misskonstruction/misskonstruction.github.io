# Replace 5 journal category card images

Swap in your five uploaded photos for these category cards: In Loving Memory of Blitz, Body & Bones, Home Improvement, Game Reviews & Walk-Throughs, and Accounting Against The Machine. (I matched each upload to its category by filename, so the out-of-order upload doesn't matter.)

## Shape decision

Your current cards are 4:3. The new images are 3:2 with lettering near the edges — cropping to 4:3 would cut off text. So I'll gently widen all journal category cards to 3:2. It's a subtle change and keeps every word in your images intact.

## Steps

1. Optimize each upload: convert PNG → JPG at the same dimensions/quality tier as your existing card images, watermarked bottom-right with the MissKonstruction script logo (same recipe as your other category cards).
2. Save over the existing files so no registry changes are needed:
   - `src/assets/blog-blitz-memorial.jpg`
   - `src/assets/blog-body-and-bones.jpg`
   - `src/assets/blog-home-improvement.jpg`
   - `src/assets/blog-game-reviews.jpg`
   - `src/assets/blog-accounting.jpg`
3. Update the category card frame in `src/routes/blog.index.tsx` from `aspect-[4/3]` to `aspect-[3/2]` so nothing gets cropped.
4. Check the category page header banner (`blog.$category.index.tsx` uses the same image as a faint backdrop — fine as-is).
5. Verify the Journal grid renders all 12 cards evenly and the 5 new images look right.

Nothing else changes — titles, blurbs, slugs, and WordPress wiring all stay the same.
