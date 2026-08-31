# Deep-link Margin Notes to the latest "Update:" section

## Goal
Clicking a margin note on The Journal takes the reader straight to the newest
update section inside the post, instead of the top of the page.

## What you do in WordPress
Nothing new. Keep doing exactly what you already do: start each update section
with a heading (or line) beginning with **"Update:"**. The site will
automatically treat the **last** "Update:" in the post as the starting point.
Your separator above it stays untouched and will still display normally.

## Changes
1. **`src/components/JournalPostBody.tsx`**
   - After the post HTML renders, scan for headings/paragraphs whose text
     starts with `Update:` (case-insensitive).
   - Tag the **last** one found with `id="latest-update"` so it can be
     scrolled to.
2. **`src/routes/blog.index.tsx`** (margin notes link)
   - The margin note link gains the hash `#latest-update`
     (`/blog/game-reviews-walk-throughs/<slug>#latest-update`).
3. **`src/routes/blog.$category.$postSlug.tsx`** (post page)
   - After the post body renders, if the URL hash is `#latest-update` and
     such a section exists, smoothly scroll it into view (with a small offset
     so it isn't flush under the header).
   - If no "Update:" section exists (e.g. you share the link before adding
     the update), the page just opens at the top as usual — no error.

## Notes
- Works for every post, not just TREAT — any future walk-through update gets
  the same behavior automatically.
- If a post has several updates (Update:, Update:, ...), readers land on the
  most recent one, since that's always the last in your running-post format.
- Margin notes still only appear for Game Reviews & Walk-Throughs posts with
  the 24-hour rule — unchanged from the last iteration.
