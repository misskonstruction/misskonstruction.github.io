# Fix "Failed to resolve entry for package h3-v2" error

## What's actually wrong

This is NOT a code bug — nothing in your site code changed or broke. The build log shows "build OK".

The error is a corrupted dependency install in the sandbox: the package `h3-v2` (an internal dependency of the framework, aliased to `h3@2.0.1-rc.20`) is missing its `dist/_entries/` build output inside `node_modules`. Its `package.json` points entry points at files that were never installed, so Vite's dev server can't resolve it when server-rendering `/`. That's why the banner came back after a refresh even though the last build was clean.

Confirmed by inspection: `/dev-server/node_modules/h3-v2/dist/` contains only a stray `docs` folder — all the entry files (`node.mjs`, `generic.mjs`, etc.) are absent.

## Fix

1. Reinstall dependencies so the corrupted package is restored:
   - Run `npm install` (or `npm ci` if needed) to force a fresh, complete copy of `h3-v2`.
2. Verify `/dev-server/node_modules/h3-v2/dist/_entries/` now contains the entry files.
3. Restart the dev server (kill the `vite` process; it respawns automatically) and wait for it to answer on port 8080.
4. Confirm the fix:
   - Check `/tmp/observability/build-errors.log` shows "build OK".
   - Load the preview at `http://localhost:8080/` (Playwright) and confirm the error overlay is gone and the home page renders.

## What this does NOT touch

- No source files, no content, no galleries or images — only a dependency reinstall in the sandbox environment.
- No changes get pushed to GitHub, so your live site is completely unaffected (your live site already works, since this corruption is sandbox-only).

## Risk

Very low. Worst case, if `npm install` can't restore the package, fall back to `npm ci` for a clean install from the lockfile, which guarantees the exact pinned versions.
