## Goal

Host your ScratchPad tool at a clean, shareable URL on your existing GitHub Pages site, with one quiet footer link.

## Steps

1. **Copy the file to `public/scratchpad/index.html`** — it's one self-contained 5 KB HTML file (inline CSS + JS, no external assets).
   - Result URL: `https://misskonstruction.github.io/scratchpad`
   - Living in `public/` means it's copied verbatim into the build output and served as a plain static page. It never touches React, routing, or the prerender/deploy pipeline, so it can't break the photography site.
2. **Add `<meta name="robots" content="noindex, nofollow">`** to its `<head>` so it stays out of search results and doesn't muddy your photography SEO.
3. **Add the footer link (option A)** in `src/components/SiteFooter.tsx` — a small line under the GitHub link:
   > Tools: **ScratchPad** — a simple browser notepad
   
   Styled like the existing footer text links (muted, hover-to-primary, underline on hover), opening in a new tab. Discoverable if someone looks, invisible if they don't.
4. **Verify** `/scratchpad` doesn't collide with any route in `src/routes/` and isn't swallowed by the SPA 404 redirect script (a real `index.html` resolves before the 404 handler, so this should be a no-op — I'll confirm).

## Technical notes

- No changes needed to `.github/workflows/deploy.yml` or `scripts/prerender.mjs`.
- No bundling or asset-hashing concerns since the file has zero external dependencies.
