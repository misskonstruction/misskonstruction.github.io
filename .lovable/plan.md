# Add "Accounting Against The Machine" journal category

A new journal category for your QBO / ProAdvisor / human-powered accounting journey. All choices are locked in.

## Locked-in decisions

- **Card image:** Option 1 — "Ledger & coffee by the window" (open handwritten ledger, vintage calculator, steaming mug, afternoon light). I will watermark it bottom-right with the MissKonstruction script logo, same as all other category cards, then save it as `src/assets/blog-accounting.jpg`.
- **Blurb (Option C, short & sassy):**
  > "Training humans to be harder to replace. QBO tips, certification notes, and the occasional scavenger hunt for The Resistance Accountants."
- **Emoji / icon:** 📊 with the `TrendingUp` Lucide icon.

## What you'll see

- A new card on **The Journal** titled **Accounting Against The Machine**.
- Its own page at `/blog/accounting-against-the-machine` listing every WordPress post in that category.
- Posts written in WordPress under that category flow in automatically, and the newest one appears in the "From the latest page" section.
- The entry count updates itself using the same live WordPress hook the other categories use.

## How it works

1. **Watermark the chosen image** bottom-right with the MissKonstruction script logo and save it to `src/assets/blog-accounting.jpg`.
2. **Add the category entry** to `src/data/journalCategories.ts`:
   - slug: `accounting-against-the-machine`
   - title: `Accounting Against The Machine`
   - emoji: 📊, icon: `TrendingUp`
   - blurb: the Option C text above
   - aliases so WordPress name variants match: `accounting`, `qbo`, `proadvisor`, `pro advisor`, `quickbooks`, `resistance accountants`, `the resistance accountants`, `accounting against the machine`
3. **Update `scripts/prerender.mjs`**:
   - Add `/blog/accounting-against-the-machine` to `ROUTES`
   - Add `accounting-against-the-machine` to `KNOWN_CATEGORIES`
   - Add mapping rules so WordPress categories containing "accounting", "qbo", "proadvisor", "quickbooks", or "resistance" land on this slug
4. **Verify** the new card renders on The Journal and the category page loads at `/blog/accounting-against-the-machine`.

No other wiring is needed — `blog.index.tsx` and `blog.$category.index.tsx` already read from the shared `journalCategories` registry, and the live WordPress hook picks the category up automatically.

## Note

After the code is deployed, add the category in WordPress named exactly **Accounting Against The Machine**. The aliases will also catch shorter versions like "QBO" or "ProAdvisor" if you ever rename it.
