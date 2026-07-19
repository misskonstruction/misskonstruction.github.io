## Plan

1. **Fix the actual failing path in `scripts/prerender.mjs`**
   - The script currently starts non-Cloudflare builds with:

   ```text
   bunx vite preview --port 4321 --strictPort
   ```

   - That is the source of the `serverBuild.fetch is not a function` error, because Vite/TanStack preview middleware expects a different server export shape.
   - I will change only the non-Cloudflare prerender branch to start the built server directly with Node instead of `vite preview`.

2. **Keep the existing strict behavior**
   - Leave `STRICT_PRERENDER=true` in the workflow.
   - Do not restore any “client fallback” publishing path.
   - If prerender fails, the deploy should fail before publishing broken deep links.

3. **Make startup failure obvious**
   - Keep inherited server logs so GitHub Actions shows the real server crash if it exits early.
   - Update the misleading error text that currently says “Deploying the static client fallback” even when strict mode exits instead.

4. **Do not touch the live-site content or root static files**
   - No gallery changes.
   - No blog/journal changes.
   - No CNAME changes.
   - No manual syncing to the repository root.
   - No publish-source setting changes.

5. **Workflow file stays mostly unchanged**
   - Keep the diagnostic layout step for one more run if you want proof.
   - Keep the deploy step publishing only `dist-static` after `dist-static/index.html` exists.

6. **Expected outcome**
   - The prerender script should no longer enter TanStack’s Vite preview plugin, so this error should disappear:

   ```text
   TypeError: serverBuild.fetch is not a function
   ```

   - The next run should either prerender the routes successfully or expose a new, direct server startup error instead of hiding it behind Vite preview.

## Files I would change

- `scripts/prerender.mjs`
  - Replace the `vite preview` spawn in the Node-server branch with a direct Node launch of the built server entry.
  - Clean up misleading fallback wording.

Optional, only if you want the diagnostic step removed after a successful run:

- `.github/workflows/deploy.yml`
  - Remove the temporary “Diagnose server bundle layout” step once the deploy is stable.