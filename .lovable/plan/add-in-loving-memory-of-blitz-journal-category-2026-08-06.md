# Add "In Loving Memory of Blitz" journal category

A new category card on The Journal that pulls posts automatically from WordPress, just like the existing ones.

## What you'll see

- A new card on the Journal page titled **In Loving Memory of Blitz 🕊️**, using your uploaded memorial shadow-box photo.
- Its own page at `/blog/in-loving-memory-of-blitz` listing every WordPress post in that category.
- Posts written or moved into the category in WordPress appear automatically on the site (and in the newest-posts feed) with no code changes.

## How it works

1. Save the uploaded photo as `src/assets/blog-blitz-memorial.jpg` (resized/optimized like the other card images).
2. Add an entry to `src/data/journalCategories.ts`:
   - slug: `in-loving-memory-of-blitz`
   - title: `In Loving Memory of Blitz`
   - emoji: 🕊️
   - short blurb about Blitz
   - icon from lucide (e.g. `Heart`)
   - aliases so WordPress name variants still match: `blitz`, `in loving memory of blitz`, `loving memory of blitz`, `in loving memory`
3. Category listing, post routes, and the recent-posts section already read from this list plus the WordPress feed, so no further wiring is needed.

## Note

Because the site is a static GitHub Pages build, new WordPress posts show up after the next deploy/build runs — same as your other categories today.
