## What's actually happening

Two separate things:

1. **The site isn't showing the new "Every. Single. Bloody. Morning." entry** — because the last deploy build failed. The GitHub Pages site still shows the previous successful deploy. Nothing about the entry itself is wrong; the artifact never made it out.

2. **The build fails with a CSS error** unrelated to any file I edited for the entry:

   ```
   [vite:css] [lightningcss] Unexpected end of input
   file: virtual:nitro:raw:/dev-server/assets/styles-B5rl2yxR.css:1:113343
   ```

   Diagnosis (verified locally):
   - The final CSS the client build emits (`dist/client/assets/styles-B5rl2yxR.css`, 111 KB) is valid — I parsed it directly with `lightningcss` and it succeeded.
   - The error only happens during the Nitro SSR pass, on a virtual module id that starts with `virtual:nitro:raw:…styles-….css`. Nitro wraps the CSS file into a JS module for embedding, and because the virtual id still ends in `.css`, Vite's CSS plugin re-runs Lightning CSS on the JS-wrapped text and chokes at the wrapper boundary (col 113343, past the file's real length of 111233).
   - Nothing in `src/styles.css` or the journal route CSS is malformed. This is a Lightning CSS × Nitro-raw plugin interaction.

3. **Deep-link 404s** — the root `index.html` and `404.html` SPA-restore pair from a previous turn is still in place on `main`, so once a good build deploys, `/blog/raw-and-unhinged` and every other route will resolve on refresh/share. No change needed there; verifying only.

## Fix plan

Phase 1 — Unblock the build (one line, scoped)
- Edit `vite.config.ts` only. Add a Vite override that tells Vite to skip Lightning CSS for Nitro's raw virtual modules, while keeping Lightning CSS everywhere else so the built output stays identical to today's:

  ```ts
  export default defineConfig({
    nitro: { preset: "node-server" },
    vite: {
      plugins: [
        {
          name: "skip-lightningcss-on-nitro-raw",
          enforce: "pre",
          resolveId(id) {
            // Nitro wraps built CSS as `virtual:nitro:raw:…file.css`.
            // The trailing .css makes Vite's css plugin re-parse the JS wrapper.
            // Returning a resolved id without the .css suffix keeps it out of the
            // CSS pipeline; Nitro still handles the raw content the same way.
            if (id.startsWith("virtual:nitro:raw:") && id.endsWith(".css")) {
              return { id: id + "?nitro-raw", moduleSideEffects: false };
            }
            return null;
          },
        },
      ],
    },
  });
  ```

- Nothing else in the project changes. No source CSS, no route files, no build script, no deploy workflow.

Phase 2 — Verify locally before pushing
- Run `bun run build:dev` in the sandbox.
- Confirm it exits 0 and `dist-static/blog/raw-and-unhinged/index.html` is produced.
- Grep the produced HTML for the entry's title (`Every. Single. Bloody. Morning.`) to confirm the new entry is baked into the prerender.

Phase 3 — Sanity-check deep-link protection is still in place
- Read-only check `index.html` and `404.html` at repo root and on `gh-pages`. Confirm the SPA restore script is still injected and `404.html` is the redirect version. No edits unless something regressed — this stays untouched.

Phase 4 — Deploy
- Nothing manual. Once the build passes, the existing GitHub Actions workflow publishes `dist-static` to `gh-pages` as before.

## What I will NOT touch

- `src/styles.css`, `src/routes/blog.raw-and-unhinged.tsx`, `src/data/rawUnhingedEntries.ts`, and the new image assets — all correct.
- `.github/workflows/deploy.yml` — the current workflow works; the failure is upstream in the build.
- `CNAME` (still absent) and `.nojekyll` — untouched.
- Root `index.html` / `404.html` SPA redirect files — untouched unless the read-only check finds a regression.

## If something goes wrong

- If `bun run build:dev` still fails after the plugin change: I stop, do not push, and revert `vite.config.ts` to the current one-line version. The site keeps serving today's deploy — no new 404s, no regression.
- If the build passes locally but a page 404s after deploy: the SPA restore in `index.html` already handles that; if a specific route is broken I would investigate the route file only, not the build config.
