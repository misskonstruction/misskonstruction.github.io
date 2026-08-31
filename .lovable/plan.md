# Quietly highlight updated journal posts

## Goal
Keep the "new post" featured section exactly as-is, but add a smaller, secondary signal when you go back into WordPress and *update* an existing post (e.g. the running game walk-through). The update callout should show: a small thumbnail, "Update to (post title)", and a line or two of update text.

## What we have to work with
- WordPress gives every post two timestamps: `date` (published) and `modified` (last edited). Confirmed on your site. So we can detect "this post was updated after it was published" automatically.
- What WordPress does **not** give us: the *specific text you added*. It only stores the full post. So the "line or two for the update itself" needs a source — that's the main choice between the options below.

## The options

### Option A — "Margin Notes" strip, automatic (recommended)
A small, quiet row on The Journal index, directly under the featured "From the latest page" section, styled like handwritten margin notes:

```text
~ margin notes ~

 [thumb]  Update to "Heartopia — Full Walk-Through"
          Added Chapter 4: the lighthouse puzzle, with screenshots.  · updated Aug 28

 [thumb]  Update to "ProAdvisor Prep: Module 3"
          Fixed the bank-feed steps for the new QBO layout.          · updated Aug 30
```

- Detection: any post whose `modified` is meaningfully later than its publish `date` (suggested threshold: more than 48 hours later, so quick typo fixes right after publishing don't trigger it). Show the 2–3 most recently updated.
- Thumbnail: the post's featured image, shown small.
- Update text: pulled from the post's **excerpt** or the last paragraph — automatic, but generic. It won't be exactly your new content.
- Zero extra work for you when updating a post.

### Option B — Same strip, but you write the update line
Same look as Option A, but the update text comes from a short line **you** add to the post when you update it — e.g. a line at the very top or bottom of the post in a recognizable format like:

> **Update 8/28:** Added Chapter 4 — the lighthouse puzzle.

We detect that marked line, show it in the strip, and it can also render as a styled "update note" on the post page itself. Exact, personal wording every time — at the cost of remembering to write that one line when you update.

### Option C — No homepage strip; badge on the post only
The quietest option: no new section on The Journal at all. Instead, updated posts get a small handwritten "updated Aug 28" tag on their card in category pages, and a styled note at the top of the post page itself ("Last updated August 28, 2026 — see what's new at the bottom"). Readers only see it once they're already browsing.

## Recommendation
**Option A** to start — automatic, zero maintenance, and it complements rather than competes with the featured new-post section (which stays newest-*published*, untouched). If the automatic blurb feels too generic once you see it live, upgrading to Option B later is a small change.

## Technical notes
- Add `modified` to the fetched fields and the `WPPost` type in `src/server/wordpress.ts` and the public-fetch mirror in `src/lib/wordpress-public.ts`.
- Detection rule: `modified - date > 48h` (adjustable), exclude the currently featured newest post so it never shows in both places.
- New section lives in `src/routes/blog.index.tsx`, under the featured section; styled in the established hand/journal fonts, smaller and lower-contrast than featured.
- Links point to the existing `/blog/$category/$postSlug` route using the shared category matcher.
- `scripts/prerender.mjs` needs no changes; the section prerenders with the same post data already fetched.
- Per-post "last updated" note on the post page is optional garnish — say the word and it's included.
