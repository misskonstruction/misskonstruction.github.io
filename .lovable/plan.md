## What's actually happening

Your `src/routes/contact.tsx` already has the Discord button — that's why the Lovable preview shows it. But your live site at misskonstruction.github.io is **not built by GitHub Actions**. Look at `.github/workflows/deploy.yml`:

> "Stable deploy: keep the committed static site published… No server build, no prerender."

The workflow only takes the already-built files sitting in `dist-static/` (and the duplicated copies at the repo root) and publishes them to the `gh-pages` branch. It never runs `bun run build`. So when I edit a file under `src/`, nothing in `dist-static/` changes, and the live site keeps serving the old bundle.

That's why:
- Early on it felt "instant and one-step" — the workflow used to build from source on every push.
- Now every change takes "two commits" — one to edit `src/`, and a second manual rebuild to refresh `dist-static/` + root. When we skip the rebuild, the live site simply doesn't update.
- Trying to flip Pages to `gh-pages/root` broke styling because the two sources (repo root vs `gh-pages`) were out of sync.

This was locked down deliberately after the earlier prerender/`dist/server/server.js` failures kept breaking the site. The tradeoff was: stop building in CI to stop the crashes, at the cost of needing a rebuild step for every content change.

## The fix (two parts)

### Part 1 — Ship the Discord button now

1. Run `bun run build` + `bun run prerender` locally in the sandbox to regenerate `dist-static/`.
2. Re-apply the SPA redirect injection to the fresh `dist-static/index.html` files (same Python snippet the workflow already uses, so deep links keep working).
3. Sync the fresh `dist-static/` contents to the repo root so both publish sources match.
4. Verify the built HTML/JS contains the Discord link string before finishing.

That's the same rebuild sequence that fixed the Winston entry and the blank-page incident — proven to work, no schema/config changes.

### Part 2 — Stop the "two commits every time" problem

Make the workflow build from source again, but safely this time (this was the piece that used to keep things "seamless"):

- In `.github/workflows/deploy.yml`, add a build step **before** the publish step:
  - `bun install`
  - `bun run build`
  - `bun run prerender` — but wrapped so a prerender failure falls back to the plain client build instead of failing the whole job (the old crash mode).
  - Re-apply the SPA 404 + restore-script injection to the freshly built `dist-static/`.
- Keep the existing `peaceiris/actions-gh-pages@v4` publish step pointing at `dist-static/`.
- Leave the committed `dist-static/` + root copies in place as a safety net — if a build ever fails, the workflow can still publish the last known-good static output.

Net effect: one edit → one push → live site updates on its own, like it used to.

## What could go wrong and how I'll handle it

- **Prerender fails in CI** (the original reason we disabled it): the build step is wrapped so prerender failure doesn't fail the deploy — it just publishes the SPA client build with the 404 redirect. Site stays up.
- **Styling mismatch between `main/root` and `gh-pages`**: Part 1 syncs both from the same fresh build, so hashes match regardless of which source Pages is set to.
- **404 on deep links**: the SPA 404.html + restore-script injection is preserved in both parts.

## What I will not touch

- `vite.config.ts`, `src/router.tsx`, route files, or any component code beyond what's already in `contact.tsx`.
- GitHub Pages settings (branch/source). You control that in the repo UI.
- No API calls to the GitHub REST API from CI (that's what caused the 403 loop earlier).

## Approval

Say "go" and I'll do Part 1 first (Discord button live), verify it in the built output, then do Part 2 (workflow) as a separate change so you can see each step land cleanly.