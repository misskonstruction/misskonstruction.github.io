# Fix: Blitz category card missing from The Journal

You're right — this isn't a GitHub Pages problem. I found the actual cause.

## What's wrong

The Journal page (`/blog`) does not read from the shared category list. It has its own
hardcoded copy of the seven old categories inside `src/routes/blog.index.tsx`
(`categoryDefs`). The Blitz category was added to the shared list
(`src/data/journalCategories.ts`), which is what the category page and post pages use —
so `/blog/in-loving-memory-of-blitz` exists, but the card never appears on The Journal
grid, in preview or live.

Two sources of truth, only one updated. That is the whole bug.

## The fix

1. Delete the duplicated `categoryDefs` array from `src/routes/blog.index.tsx` and import
   `journalCategories` from `src/data/journalCategories.ts` instead.
2. Reuse the shared matching helper (`journalCategoryMatches` / `effectiveJournalCategoryFor`)
   for the entry counts, the featured-post image, and the "Read the full entry" link, instead
   of the local lowercase title comparison. This makes the WordPress alias matching
   ("blitz", "in loving memory", etc.) work on the Journal page too.
3. Remove the now-unused image and icon imports from `blog.index.tsx`.

Result: any category added to `journalCategories.ts` from now on shows up everywhere at once —
grid card, category page, post routes, newest-posts feed. No third place to forget.

## Verify before I hand it back

- Load `/blog` in the preview and confirm the "In Loving Memory of Blitz 🕊️" card renders with
  the shadow-box photo and a correct entry count.
- Click through to `/blog/in-loving-memory-of-blitz` and confirm the listing loads.
- Confirm the other seven cards are unchanged (same images, blurbs, order).

## Separate: the stalled workflow

The prerender script and workflow already know about the Blitz route, so nothing there needs
changing for this fix. A queued-but-not-starting run is GitHub-side runner availability, not the
workflow file — the deploy will pick this fix up on the next successful run. I'd rather not touch
the workflow again in the same change, so the deploy stays a known quantity.
