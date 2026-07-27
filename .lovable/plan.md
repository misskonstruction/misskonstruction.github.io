# Fix the SSR-vs-client manifest mismatch, then clean up

## What's ruled in and out

**Ruled out (with evidence just gathered):** root `index.html` is NOT the build's HTML entry.
- `@tanstack/start-plugin-core/.../vite/planning.js:31` sets the client Rollup input to `ENTRY_POINTS.client` (a virtual module); line 48 does the same for the server. No `index.html` is in either input list.
- The HTML shell is synthesized in `dev-server-plugin/plugin.js` as a literal string, and at SSR time comes from `src/routes/__root.tsx`.
- `vite.config.ts` sets no `rollupOptions.input`.

**Ruled in (from the CI diagnostic step):** the four stale hashes appear in `.output/server/_chunks/renderer-template.mjs` while `.output/public/assets/` for the same run contains different, correct hashes. Two Rollup graphs, two manifests, SSR reading its own instead of the client's.

## Fix

### Step 1 — Read the CI diagnostic's manifest dump and identify the read path

The previous "Diagnose SSR/client hash disagreement" step already dumped every `manifest.json` under `.output/`. First build-mode action: pull that log and identify which manifest file `.output/server/_chunks/renderer-template.mjs` is sourcing hashes from (SSR-side manifest, or a captured-at-bundle-time constant).

### Step 2 — Point the SSR renderer at the client manifest

Two possible shapes depending on step 1's finding:
- **If SSR reads a separate SSR manifest:** override the manifest path so both graphs consult `.output/public/_build/manifest.json` (the client one). Likely a `tanstackStart` plugin option or a small `vite.config.ts` addition.
- **If SSR hardcodes chunk names captured at bundle time:** align the two graphs' `output.chunkFileNames` so shared chunks produce identical hashes, or force the SSR bundle to import the client manifest at runtime.

I won't commit to which until step 1's log names the file — that's what the diagnostic step was for.

### Step 3 — Strengthen the guard

`scripts/prerender.mjs`'s `verifyAssetReferences()` already catches drift in HTML. Extend it to also scan `.output/server/_chunks/renderer-template.mjs` (or whatever step 1 names) for hashes not present in `.output/public/assets/`. This makes the next regression point at SSR directly.

### Step 4 — Purge stale root artifacts from `main`

After steps 1–3 produce a green CI run, delete from `main`: root `index.html`, `assets/`, `about/`, `contact/`, `blog/`, `gallery/`, `prayers/`, `recipes/`, `404.html`, `_headers`, `.nojekyll`, `dist-static/`. These are all leftovers from the manual-sync workaround.

### Step 5 — Flip Pages source back to `gh-pages` (manual, in GitHub UI)

## Not touching this pass

- No dependency version changes.
- No `src/` route/component changes.
- No WordPress-fetch fix (out of scope, agreed earlier).
- No deletions until step 3 produces a green CI run — leaving `main` as-is keeps the site loading (broken nav, but loading) mid-fix.

## Deliverable

A CI run whose "Verify every HTML asset reference resolves on disk" step passes, followed by the root cleanup and Pages-source flip. Publishes then become one-step again.
