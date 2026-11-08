# Show posts in every category they're filed under

You don't need to remove Gotcha Day from Reflections. The website is the problem, not WordPress.

## What's wrong now
- WordPress has the Gotcha Day post in both **Reflections** and **The Lovely Gladys**, with your edit saved today.
- The website gives each post only one home, the first category on its list. That's Reflections, so Gladys's page leaves it out, even though her card counts it.
- "From the latest page" shows the post with the newest **publish** date. Gotcha Day was published Oct 6, so the newer payroll Module 4 post (Oct 21) stays on top. Your edit today doesn't change that.

## Changes
1. **Posts appear in every category they're filed under.** Gotcha Day will show on both Reflections and The Lovely Gladys, and the counts will match what's shown.
2. **Post links stay stable.** A post's web address keeps using its first category, so existing links don't break. Opening it from either category shows the same post.
3. **"From the latest page" uses the most recent activity.** It shows whichever post was published *or* edited most recently. So Gotcha Day goes to the top today, and any meaningful update you make later will bring a post back up there.
4. The prerendered pages (the copies shared links and Google see) will also list the post under both categories.

## Technical details
- `journalCategories.ts`: add `journalCategoriesFor(post)`, which returns every matching category (overrides first). Keep `effectiveJournalCategoryFor` as the "primary" category for URLs.
- Category filtering in `useLiveCategoryPosts` and `blog.$category.index.tsx` loader: use `journalCategoriesFor(p).some(c => c.slug === slug)`.
- Post route `blog.$category.$postSlug.tsx`: accept the URL category if the post belongs to it. Otherwise fall back to the primary category.
- `blog.index.tsx`: pick `latest` by max(`modified`, `date`). The journal list order stays the same.
- `scripts/prerender.mjs`: list the post under each matching category's page.

Note: with item 3, small fixes like a typo will also bump a post to the top. If you'd rather only new posts appear there, I'll skip item 3, and you can change the post's publish date in WordPress instead.
