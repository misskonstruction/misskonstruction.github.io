## Raw & Unhinged — handwritten journal category

### What I'll build

1. **New journal category: "Raw & Unhinged"**
   - Add to `src/data/journalCategories.ts` with slug `raw-and-unhinged`, a warm-toned card image, blurb, and ink-pot icon (lucide `Feather` or `BookOpen`).
   - Card description: "Unfiltered, handwritten pages from my desk — the thoughts that don't fit anywhere else. Photos of actual ink on actual paper."
   - Generate a warm category card image (rose-leather journal + candle + tea on a wood desk, overhead, evening light).

2. **Custom category landing page (replaces the standard category list for this slug only)**
   - Route: `src/routes/blog.raw-and-unhinged.tsx` (intercepts before the generic `blog.$category` route via more-specific match).
   - **Hero scene**: a generated overhead desk image — your rose/mandala journal closed in the center, warm amber candle with an SVG-animated flickering flame layered on top, cup of tea, fountain pen, Canon DSLR, small potted plant, sleeping cat, window with evening ocean view. Warm vintage palette.
   - The journal is the only clickable element (subtle hover lift + glow on the leather).

3. **The book itself (click to open)**
   - On click, the desk dims and the journal scales up and centers, then plays a cover-open animation (CSS 3D rotateY on the front cover) revealing a two-page spread.
   - Spread layout:
     - **Page 1 (left)**: Table of Contents — "Raw & Unhinged" header in script, then a list of entries `MM.DD.YYYY — one-line description`. Each row is clickable and flips to that entry.
     - **Page 2 (right)**: Title page / intro flourish.
   - Page-turn animation: CSS 3D `perspective` + `rotateY` on a page element, with a subtle paper-curl shadow. Forward = right page peels left; back = left page peels right. ~700ms ease.
   - **Ribbon bookmark** dangling from the spine (matches your real journal's gold tassel): hover reveals a small menu of all entries; click jumps straight to that spread.
   - Corner page-flip arrows on each spread for one-at-a-time navigation, plus a small "← Contents" link.

4. **Entry data model**
   - New file `src/data/rawUnhingedEntries.ts` — array of entries: `{ id, date, title, entryImages: string[], extraImages?: string[] }`.
   - Convention: any file named `entry-*.jpg` is an entry page image. If multiple, numbered (`entry-1-*.jpg`, `entry-2-*.jpg`) and rendered in that order across consecutive left pages.
   - Each entry occupies a spread:
     - **Left page**: the entry photo (your handwritten/sketched page), sized to fit the page, with crisp edge + little black photo-corner holders (scrapbook style), nothing cropped — spiral binding, background, etc. all preserved.
     - **Right page**: accompanying photos. 0 = blank aged-paper page with just the date in script at the top. 1 = single photo with corners. 2+ = scrapbook collage (slightly rotated, overlapping, taped/cornered).
   - "Any actual images should be on the final page unless otherwise specified" — I'll add a `finalPagePhotos` field for that case, where photos appear on a dedicated final spread after all entry pages.

5. **First entry: "Winston"**
   - Asset: `entry-WinstonSketch.jpg` uploaded → externalized via lovable-assets, soft-edge treatment preserved on the page surface, photo-corner mounts.
   - Date: today (06.05.2026), TOC line: "Winston — an unfinished sketch of an old friend".
   - Single entry image, no accompanying photos → right page is blank aged paper with the date.

6. **Styling**
   - Warm palette scoped to this page only (CSS variables on the route container, not global tokens) — candlelit ambers, aged-paper cream, sepia ink, oxblood accents. Existing site theme untouched everywhere else.
   - Paper texture via subtle SVG noise + warm gradient.
   - Script display font (e.g. Cormorant Garamond italic) for TOC and date labels — body fonts on the page only, no handwriting font (your photo IS the handwriting).

### Suggestions / notes for you

- **Naming convention for entry files**: use `entry-YYYY-MM-DD-slug.jpg` so I can sort them automatically by date as you add more. For multi-image entries: `entry-YYYY-MM-DD-slug-1.jpg`, `-2.jpg`, etc.
- **TOC scaling**: once you pass ~12 entries the TOC will need a second left page — I'll auto-paginate it (TOC pages first, then entry spreads).
- **Mobile**: a true two-page spread doesn't work on phones. On mobile I'll show one page at a time with the same flip animation, and the ribbon menu becomes a tap-to-open drawer. Same content, same feel.
- **Reduced motion**: respect `prefers-reduced-motion` — candle becomes static, page turns become quick fades.
- **No link to the Reflections post yet** — you said you'll add that yourself once the category exists.

### Files I'll create / edit

- `src/data/journalCategories.ts` (edit) — add the new category
- `src/data/rawUnhingedEntries.ts` (new) — entry registry
- `src/routes/blog.raw-and-unhinged.tsx` (new) — custom landing + book viewer
- `src/components/raw-unhinged/DeskScene.tsx` (new) — overhead scene + flickering candle SVG
- `src/components/raw-unhinged/JournalBook.tsx` (new) — open/close + page-turn logic
- `src/components/raw-unhinged/BookPage.tsx` (new) — single page renderer (TOC / entry / collage / blank)
- `src/components/raw-unhinged/RibbonBookmark.tsx` (new) — tassel + entry jump menu
- Generated assets (via imagegen): category card image, overhead desk scene (journal + candle + props), aged paper texture
- Externalized asset: `entry-WinstonSketch.jpg` via lovable-assets
