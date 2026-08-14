# Add a health & wellness journal category

A new Journal category for your health journey — movement, eating well, familial high cholesterol and autoimmune realities, and the habits that hold it all together.

## The name

Confirmed name: **Body & Bones** — slug `body-and-bones`, with aliases for "Body and Bones", "body bones", "health", "wellness".



Use that exact name in WordPress; the site matches it via slug + aliases.

## What you'll get

- A new card on The Journal with a generated image (no people, matching your warm coastal/film look).
- Its own page at `/blog/<slug>` listing every WordPress post in that category, oldest to newest like your others.
- New posts appear automatically after the next build, and shared/direct links self-heal with the live post list.

## Avoiding last time's problems

Last round the category was invisible on the live site because pieces outside the category list weren't updated. This time all four are done together:

1. `src/data/journalCategories.ts` — the category entry, with generous aliases so WordPress name variants still match.
2. `scripts/prerender.mjs` — add the slug to both the `ROUTES` list and `KNOWN_CATEGORIES`, plus a keyword fallback in `mapCategoryToSlug` (health/exercise/wellness terms) so posts route correctly during prerender.
3. Card image generated and saved to `src/assets/blog-<slug>.jpg`, sized/optimized like the other card images.
4. Verify with a local build + preview that the card renders on `/blog` and the category page loads before we call it done.

No other files change; the category cards, post routes, and recent-posts feed already read from the shared registry.

## Card image direction

Still-life, no people: a pair of worn walking shoes and a water bottle by a sunlit window, or a simple wooden desk with greenery and morning light — warm film tones, soft natural light, slightly faded, same palette as your existing category cards. I'll generate and show it; you can approve or ask for a different take.

## Note

Since the site is a static build, the category page appears once the next deploy runs; posts you add later show up live via the client refresh.
