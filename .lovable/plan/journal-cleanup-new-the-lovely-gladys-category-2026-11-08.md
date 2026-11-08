# Journal cleanup + new "The Lovely Gladys" category

## Step 1 — Preview for your approval (nothing goes live yet)
- Widen Gladys's photo into a landscape (3:2) card image by extending the scene left and right (more of the black blanket and grey floor, plus a few soft touches like a pink toy or tennis ball), keeping her and the real background untouched. Watermark bottom-right with your Miss Konstruction signature.
- Draft description (written in Gladys's voice):
  > "Rescued from Partners for Pets in Marianna, FL, and now running Mother's house. My adventures, my opinions, and the stuff that doesn't make it to Instagram."
- I'll show you the image and description in chat and wait for your OK or changes before Step 2.

## Step 2 — Remove
- The Margin Notes section on the Journal page, plus the "jump to latest update" behavior it used.
- Categories: Platy Pals, Raw & Unhinged (including its journal-spread page and entries), Body & Bones, Home Improvement, Game Reviews & Walk-Throughs.
- Their card images and any data/files used only by them. Shared items stay (e.g. the three recipes stay in From the Kitchen; only their Body & Bones cross-listing goes away). Gallery photos are never touched.

## Step 3 — Add The Lovely Gladys
- New category connected to your existing WordPress category, placed in row 1, slot 3 (where Platy Pals is now).
- Footer: "@gladysunsupervised" with a small Instagram icon, right under "Light A Candle for Blitz", linking to her Instagram.
- QR code (optional, my suggestion): recolor it pink, remove the blue background, and show it small on the Gladys category page as "Follow Gladys on Instagram." Before it goes live I'll test that it still scans.

## Technical notes
- Edit src/data/journalCategories.ts (remove entries, insert gladys at index 2), blog.index.tsx (drop Margin Notes), JournalPostBody/post page (drop latest-update tagging), delete blog.raw-and-unhinged.tsx + rawUnhingedEntries.ts, delete unused assets after rg check, update recipes.ts alsoInCategories, SiteFooter.tsx.
- Update memory files that refer to removed features.
