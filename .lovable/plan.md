# Add "Accounting Against The Machine" journal category

A new journal category for your QBO / ProAdvisor / human-powered accounting journey, with a no-human card image and the tagline "Training humans to be harder to replace."

## What you'll see

- A new card on **The Journal** titled **Accounting Against The Machine**.
- Its own page at `/blog/accounting-against-the-machine` listing every WordPress post in that category.
- Posts written in WordPress under that category flow in automatically, and the newest one still appears in the "From the latest page" section.
- The entry count updates itself using the same live WordPress hook the other categories use.

## Image approach

I'll generate a warm, still-life category card image with no humans. Direction: a messy-but-cozy desk scene — calculator, coffee cup, open ledger or notebook, sticky notes, maybe a small red pen or highlighter, warm window light, matching the moody, personal feel of your existing card photos.

Because you want to approve the image first, I'll generate **2–3 card-image options**, save them under `/tmp/...` for review, and only watermark + commit the one you choose.

## Wording options for the card blurb

The tagline *"Training humans to be harder to replace."* will be part of the blurb. Pick one (or tell me to tweak):

**A. Punchy**
> "Training humans to be harder to replace. A casual corner for QBO tricks, ProAdvisor certs, and keeping bookkeeping stubbornly human."

**B. Story-forward**
> "Training humans to be harder to replace. From support-desk wanderer to ProAdvisor trainer — and maybe someday a human-powered operation. Tips, scavenger hunts, and lessons learned with The Resistance Accountants."

**C. Short & sassy**
> "Training humans to be harder to replace. QBO tips, certification notes, and the occasional scavenger hunt for The Resistance Accountants."

## Icon / emoji options

Pick whichever fits the vibe:

- Emoji: 🧮 | Icon: `Calculator`
- Emoji: 📊 | Icon: `TrendingUp`
- Emoji: 🎓 | Icon: `GraduationCap`
- Emoji: 🤖 | Icon: `Bot`

## How it works

1. **Generate card image options** and let you pick one.
2. **Watermark the chosen image** bottom-right with the MissKonstruction script logo, same as other gallery/category photos.
3. **Add the category entry** to `src/data/journalCategories.ts`:
   - slug: `accounting-against-the-machine`
   - title: `Accounting Against The Machine`
   - emoji/icon per your choice
   - blurb per your choice
   - aliases so WordPress name variants match, e.g. `accounting`, `qbo`, `proadvisor`, `quickbooks`, `resistance accountants`, `the resistance accountants`
4. **Update `scripts/prerender.mjs`**:
   - Add `/blog/accounting-against-the-machine` to `ROUTES`
   - Add `accounting-against-the-machine` to `KNOWN_CATEGORIES`
   - Add mapping rules so WordPress categories containing "accounting", "qbo", "proadvisor", "quickbooks", "resistance" land on this slug

No other wiring is needed — `blog.index.tsx` and `blog.$category.index.tsx` already read from the shared `journalCategories` registry.

## Note

After the code is deployed, add the category in WordPress named exactly **Accounting Against The Machine**. The aliases will also catch shorter versions like "QBO" or "ProAdvisor" if you ever rename it.
