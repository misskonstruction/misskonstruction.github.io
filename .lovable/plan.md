# Remove the accounting journal category

The site has no category titled "Resistance Accountants" — that name is attached to **Accounting Against The Machine** (its description mentions "The Resistance Accountants", and WordPress posts filed under that name land there). This plan removes that whole category.

## What changes
- Remove the **Accounting Against The Machine** card from the journal page; remaining cards shift up to fill the gap.
- Delete its card photo (not used anywhere else).
- Its WordPress posts stay saved in WordPress but no longer appear on the website, and their old page links show "not found" (same as the categories removed earlier).

## Technical details
- `src/data/journalCategories.ts`: delete the category entry and the `blog-accounting.jpg` import.
- Delete `src/assets/blog-accounting.jpg`.
- `scripts/prerender.mjs`: remove the accounting/resistance slug mapping and the slug from the prerender list so those posts are skipped.
- Verify journal page and `/blog/accounting-against-the-machine` in a test browser.
