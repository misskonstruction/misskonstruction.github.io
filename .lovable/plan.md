# Fix: prerender silently ships without blog posts → iOS deep links break

## Root cause (confirmed against your files)

`scripts/prerender.mjs` has three defects that combine into the iOS symptom:

1. `ensurePreviewServerEntry()` only looks under `dist/server/*` and, when nothing matches, **writes a stub worker that returns 404 for every request**. It never checks `.output/server/` where TanStack Start's Nitro build actually lands.
2. `waitForServer()` treats **`status === 404` as ready**, so the 404-stub passes the readiness gate instantly.
3. `main().catch(...)` and `warnOrThrow()` downgrade every failure to a warning unless `STRICT_PRERENDER=true`, and CI never sets it. Result: every route logs `❌ … → 404`, the script exits 0, and `dist-static/` ships with only the base client — no post HTML, so iOS falls into the fragile `404.html` redirect on every blog URL.

## Changes

### 1. `scripts/prerender.mjs` — fail loudly, look in the right place

- `ensurePreviewServerEntry()`:
  - Add `.output/server/index.mjs` and `.output/server/server.mjs` to the candidate list (Nitro/Vinxi default for TanStack Start).
  - When no candidate exists, **throw** with the checked paths in the message. Delete the stub-writing branch entirely.
- `waitForServer()`:
  - Only return on `r.status === 200`. 404 no longer counts as ready.
  - Keep the timeout; increase the message to include the URL.
- No other logic changes (route list, WP fetch, output paths untouched).

### 2. `scripts/prerender.mjs` — make failures fatal by default

- Change `STRICT_PRERENDER` default: treat missing/false as **strict** (fatal). Only `STRICT_PRERENDER=false` opts out. This ensures any 4xx/5xx from a route fails the build so we can't silently republish without posts.
- Keep the existing per-route error logging so the failing route is visible in CI logs.

### 3. `.github/workflows/deploy.yml` — remove the silent-fallback safety net for prerender

- Drop the `set +e` / exit-code branch that swallows a failed prerender and copies the raw client build over `dist-static/`. If prerender fails, the workflow must fail — that's the whole point.
- Keep everything after prerender (SPA redirect script injection, `404.html` generation, `.nojekyll`, `peaceiris/actions-gh-pages` publish) exactly as-is. This preserves the working parts of the current deploy.
- The committed `dist-static/` in the repo still acts as the last-known-good safety net because a failed workflow doesn't overwrite `gh-pages`.

## What this fixes for you

- Blog posts (WordPress + local routes) are prerendered to real static files like `dist-static/blog/coastal-photography/<slug>/index.html`. GitHub Pages serves them directly with a 200 — no client-side redirect trick needed.
- iOS Safari / Facebook in-app browser gets a real HTML file on first hit, so deep links work the same as Android.
- The `404.html` redirect stays as a fallback for URLs that legitimately don't exist, but it's no longer the primary path for shared blog links.
- A future broken build fails visibly in CI instead of silently shipping a site with missing pages.

## Files touched

- `scripts/prerender.mjs` (edits to two functions + default-strict flag)
- `.github/workflows/deploy.yml` (remove the fallback branch in the prerender step)

## Out of scope (not touching)

- Route definitions in `src/routes/**` — they already exist for every category and the WordPress crawler already builds the per-post URLs; the bug is purely in the prerender harness.
- The SPA redirect script and `dist-static/` publish step — those work.
- Vite config, TanStack config, GitHub Pages settings.

## Verification before saying done

- Run `bun run build && bun run prerender` in the sandbox and confirm:
  - No "No server bundle found" warning; the real `.output/server/…` gets picked up.
  - `dist-static/blog/coastal-photography/<some-real-slug>/index.html` exists and is non-empty.
  - Script exits 0 with the WordPress post count logged.
- If prerender fails, it now fails loudly with the actual failing route(s) named — no guessing next round.
