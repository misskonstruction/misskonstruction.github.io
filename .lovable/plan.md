# Make deploys actually reach the live site

## What I found

The build is green and the new memorial category **is** in the freshly built output — `dist-static/blog/index.html` contains "Blitz". But the copy of the site that's committed at the repository **root** (the `index.html`, `assets/`, `blog/…` folders sitting in `main`) is an old snapshot: its `blog/index.html` has no Blitz, and it still has an old `blog/creative-life` folder that no longer exists in the new build.

So the workflow is publishing correctly to `gh-pages`, but the live pages you're seeing are the stale root copy in `main`. That's why a green run changes nothing. Re-running the failed job would not have helped — it was already fixed by the last green run.

## The fix

Publish to **both** places so it can't matter which source GitHub Pages is reading:

1. Keep the existing `gh-pages` push exactly as it is (it works).
2. Add a step that also commits the freshly built `dist-static/` contents into the root of `main`:
   - delete the stale generated folders/files at root (`index.html`, `404.html`, `assets/`, `blog/`, `gallery/`, `recipes/`, `prayers/`, `about/`, `contact/`, `_headers`, `.nojekyll`),
   - copy the new build in their place,
   - commit and push back to `main` with `[skip ci]` in the message so it doesn't trigger an endless deploy loop.
   - Source code in `src/`, `scripts/`, `.github/`, `public/` is never touched by this step.
3. This also removes the stale `blog/creative-life` leftovers and keeps root and `gh-pages` byte-identical from now on.

## Also fixing while we're here

The new category is missing from the prerender lists in `scripts/prerender.mjs`:

- add `/blog/in-loving-memory-of-blitz` to `ROUTES` so the category page ships as real static HTML,
- add `in-loving-memory-of-blitz` to `KNOWN_CATEGORIES` and a name match for `blitz` / `loving memory` in `mapCategoryToSlug`, so WordPress posts you move into that category get prerendered under the right URL instead of falling through to `reflections`.

## Safety

- Nothing in `src/` changes, so the site's look and behaviour stay exactly as they are today.
- The existing asset verifier still runs before anything is published; if a build is broken, nothing gets pushed to either branch.
- No action needed from you afterwards — no re-runs, no settings changes.
