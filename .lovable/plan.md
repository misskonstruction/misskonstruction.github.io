## Plan: add "Every. Single. Bloody. Morning!" entry

Follow the exact same pattern already used for the June 10 three-page entry — no new components, no layout changes.

### Files touched
1. **New assets** in `src/assets/raw-unhinged/`:
   - `entry-2026-07-13-page-1.jpg` (from `user-uploads://pg_1.jpg`)
   - `entry-2026-07-13-page-2.jpg` (from `user-uploads://pg_2.jpg`)
   - `entry-2026-07-13-page-3.jpg` (from `user-uploads://pg_3.jpg`)
   - `entry-2026-07-13-winnie.jpg` (from `user-uploads://winnie.jpg`)
   - `entry-2026-07-13-no-winnie.jpg` (from `user-uploads://no_winnie.jpg`)

2. **`src/data/rawUnhingedEntries.ts`** — append one new entry at the END of the array (oldest-first ordering, per project memory):
   ```
   {
     id: "every-single-bloody-morning",
     date: "2026-07-13",
     title: "Every. Single. Bloody. Morning. — losing Winston",
     entryImages: [ page1, page2, page3 ],   // three left-hand pages
     finalPagePhotos: [ winnie, noWinnie ],  // scrapbook on final spread's right page
   }
   ```
   Uses the existing `finalPagePhotos` field, same as the June 10 entry — the journal template already renders 2 photos as an overlapping scrapbook collage on the opposite page (Winnie on top, no-Winnie underneath, per your order).

### What I am NOT touching
- No changes to `src/routes/blog.raw-and-unhinged.tsx` (the renderer already handles multi-page entries + final-spread photos).
- No changes to deployment, workflow, `404.html`, or `index.html`.
- No changes to any other route, style, or component.
- Watermark rule doesn't apply — these are journal-entry photos, not gallery photos (matches how prior R&U photos like Blitz were handled).

### Title
I've drafted **"Every. Single. Bloody. Morning. — losing Winston"** to match the tone of your existing R&U titles (e.g. "My Faithful Blitz — celebrating the little things"). If you want a different title, tell me and I'll swap it before building.

### Alt text
Descriptive alt text for each of the 5 images, matching the style already used in the file.

Approve and I'll build it exactly as scoped.