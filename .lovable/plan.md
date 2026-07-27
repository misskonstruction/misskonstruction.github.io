## Revised targeted fix plan

Scope: fix the asset-hash-mismatch pipeline bug on gh-pages. No changes to GitHub Pages settings, no branch changes, no journal content, no design. **The WordPress silent-empty-list bug in `fetchWordPressPostRoutes()` is out of scope for this plan** — separate plan on request.

### Corrected mechanism (from empirical `bun run build` probe, two runs)

- CI (sandbox env vars unset) honors `nitro: { preset: "node-server" }` → client output is `.output/public/`, server output is `.output/server/`. Directly observed via `ls` on a probe build in `/tmp/build-probe2`.
- Sandbox (env vars set — this environment) forces `cloudflare-module` → client output is `dist/client/`, server output is `dist/server/`. Directly observed via `ls` on a probe build in `/tmp/build-probe`.
- `dist/` root is never a client dir — in sandbox mode it's a parent of `client/` + `server/` + Nitro metadata only; in CI mode it doesn't exist at all.
- `.vinxi/build/client` did not exist in either observed run.
- Neither build mode emits `index.html` from `vite build`. Every `index.html` in `dist-static/` is written by the crawl in `scripts/prerender.mjs`.
- You were right that "stale output between runs" isn't the mechanism in CI. Dropped that framing.

Residual uncertainty: the CI-mode probe ran outside `/dev-server` with env vars stripped, not inside `/dev-server` itself. Something project-local could theoretically change CI's layout vs. that probe. The verifier in step 2 makes that residual uncertainty non-fatal.

### What I will change

1. **Tighten `findClientDir()` in `scripts/prerender.mjs`** — validation-based, not order-based
   - Candidate list becomes exactly the two empirically observed client paths: `.output/public`, `dist/client`. Drop `dist` and `.vinxi/build/client` — neither was observed as a client dir in either probe.
   - A candidate is only accepted if it contains an `assets/` directory with at least one `.js` file. Not gating on `index.html`, since neither build mode emits it.
   - If no candidate qualifies, prerender fails immediately with a message naming what it saw.

2. **Add a hard asset-reference verifier in `scripts/prerender.mjs`, run at the end of `main()` before returning**
   - Walk every `dist-static/**/*.html`.
   - Extract every local reference matching `/assets/[^"' )]+` from `src=`, `href=`, and `modulepreload` attributes.
   - Assert each referenced path exists on disk under `dist-static/`.
   - On any miss: print the offending html file, the missing asset path, and the closest existing filename in `dist-static/assets/` for that base name, then exit non-zero.
   - This is what makes the bug you documented (HTML asks for `SiteLayout-mhJp_l7G.js`, only `SiteLayout-DcbVI9ki.js` exists) impossible to publish silently, regardless of which mechanism caused the drift — including any layout the empirical probe didn't catch.

3. **Re-run the same verifier in `.github/workflows/deploy.yml`**, as a step between "Prepare GitHub Pages artifact" (which mutates HTML by injecting the SPA-restore snippet) and "Publish to gh-pages branch"
   - Same walker, same assertion.
   - Catches corruption by the post-prerender HTML injection step, and guarantees the exact bytes about to be pushed to `gh-pages` pass the check.
   - Fails the job, blocking publish, if anything is off.

4. **Small hygiene inside the run**
   - Keep the existing `rmSync(OUT, …)` before repopulating `dist-static`.
   - Add `rmSync("dist-static", …)` in the workflow before `bun run prerender` too, so a partial prior artifact from the same job never blends into the new one.
   - No cross-run cleanup, no cache invalidation.

### Files touched

- `scripts/prerender.mjs`
- `.github/workflows/deploy.yml`

### Verification I will show after implementation

Actual byte-level checks pasted back to you:

1. `dist-static/index.html` — every `/assets/*.{js,css,jpg,png,svg,webp}` reference resolves to a real file under `dist-static/assets/`.
2. All `dist-static/**/*.html` — same check, aggregated. Total files scanned, total refs checked, zero missing.
3. `dist-static/blog/reflections/you-have-to-earn-the-prosecco/index.html` exists and its asset refs pass the same check.
4. The verifier fails on a synthetic missing-file case (rename one asset to prove the verifier actually errors), then restore.

Only after all four pass will I say it's resolved.

### Explicitly out of scope

- GitHub Pages source/branch settings — untouched.
- WordPress `fetchWordPressPostRoutes()` silent-empty-list bug — real bug, separate plan on request.
- Any journal content, layout, watermark, or design change.