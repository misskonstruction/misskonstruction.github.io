# Fix the Body & Bones entry count

## What's actually happening

The three recipes are on the live site — verified in a browser at `/blog/body-and-bones`, where the "from the recipe box" section shows all three and the page reads "3 entries". Your normal desktop window was serving a cached copy, which is why the private window looked right.

The one real bug: the Body & Bones **card on The Journal index** still reads "0 entries".

## Why

The journal index tallies each recipe only against its home category (`categorySlug`), so the cross-listed recipes are counted for From the Kitchen and nowhere else. The category page itself uses the cross-list-aware lookup, which is why it correctly says 3.

## The fix

In `src/routes/blog.index.tsx`, the in-house entry tally also counts each recipe's `alsoInCategories` entries (same for prayers if they ever get cross-listed). Result: Body & Bones shows 3 entries, From the Kitchen keeps its full count unchanged, and future cross-listings count automatically.

No other files change.

## On the caching

Once this deploys, a hard refresh (Ctrl+Shift+R) on your desktop will pull the new build; the private window already shows the current site.
