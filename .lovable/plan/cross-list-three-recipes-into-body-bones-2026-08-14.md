# Cross-list three recipes into Body & Bones

Yes — this works, and the two systems don't conflict. Body & Bones can pull WordPress posts automatically (as it already does) *and* show hand-built recipe cards from your recipe box, exactly like From the Kitchen does.

## What you'll get

- Body & Bones keeps pulling every WordPress post you write in that category, unchanged.
- Above the posts, a "from the recipe box" section shows three recipes:
  - Lemon-Turmeric Cabbage & White Bean Soup
  - High-Protein Dill Chicken Orzo
  - Saag Aloo Matar
- Those three stay listed in From the Kitchen too — nothing is moved or removed. One recipe page, one URL, listed in two places.

## How it works

Each recipe currently belongs to exactly one category via `categorySlug`. I'll add an optional second field, `alsoInCategories`, so a recipe can appear in extra categories without changing its home.

- `src/data/recipes.ts` — add `alsoInCategories?: string[]` to the `Recipe` type, set it to `["body-and-bones"]` on the three recipes, and update `getRecipesByCategory` to match either the home category or the extra list.
- No changes needed to the category page itself — it already renders whatever `getRecipesByCategory` returns, so the section appears automatically.
- The recipe pages keep linking back to From the Kitchen (their home category), so nothing about the existing recipe experience changes.

Any future recipe can be cross-listed the same way by adding one line.
