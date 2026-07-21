## What I verified read-only

- The live Reflections category page shows your newest WordPress posts, so WordPress data is reachable.
- The links being generated for those posts lead to `404 Not Found` on the live site.
- The local checked-in static folders are missing the newest post detail folders, including:
  - `blog/reflections/you-have-to-earn-the-prosecco.../index.html`
  - `blog/reflections/my-new-house-came-with-an-unexpected-assistant/index.html`
  - `blog/reflections/hope-sneaks-in-quietly/index.html`
- The live site is therefore relying on the SPA `404.html` redirect for real post pages. That is exactly the fragile path that breaks for iOS users and produces “Entry not found.”

## Plan

1. **Stop relying on the SPA redirect for journal posts**
   - Keep `404.html` only as a fallback safety net.
   - Make `/blog/<category>/<post-slug>/index.html` exist for every current WordPress journal post.

2. **Fix the WordPress slug handling in one place**
   - Use decoded slugs inside the React app so TanStack Router encodes them once.
   - Use filesystem-safe encoded route names during static prerender so GitHub Pages can serve them directly.
   - Avoid double-encoded links like `%25f0...`, which are currently visible on the live Reflections page.

3. **Fix the category route mapping for WordPress posts**
   - Confirm every WordPress post category maps to the correct local journal category route.
   - Ensure Reflections posts prerender under `/blog/reflections/...`, not only in the category listing.

4. **Repair the deploy/prerender flow without fallback guessing**
   - Keep strict prerendering enabled.
   - If the server cannot start or a journal post returns 404 during prerender, the deploy should fail instead of publishing a broken partial site.
   - Remove only the diagnostic workflow noise after the real fix is verified.

5. **Verify before calling it fixed**
   - Run a read-only local check against the built static output for several affected posts.
   - Confirm each generated detail route returns `200`, not `404`.
   - Confirm the Reflections page links point to the same static route folders that were generated.

## If the next deploy creates 404s

- I will not keep changing random files.
- First action will be read-only: compare the generated `dist-static/blog/reflections/` folders against the live URL paths.
- If the generated files exist but live URLs 404, the issue is GitHub Pages source/settings.
- If the generated files do not exist, the issue is prerender route discovery or WordPress slug mapping.
- The fallback will be to publish the last known good static output while keeping the source fix isolated, so the whole site does not go blank again.