# Remove the deployment failure path completely

## Confirmed cause

The run is failing before your site build starts. GitHub cannot download `actions/checkout@v4` and reports **“Failed to resolve action download info” / “Service Unavailable.”** The current workflow still uses both `actions/checkout@v4` and `oven-sh/setup-bun@v2`; GitHub resolves every referenced action before running any step, so `continue-on-error` and the Bun fallback never get a chance to help.

The separate **“pages build and deployment — Internal server error”** is also a GitHub service failure, not an error in the memorial category or site code.

## Fix

1. Make the custom deploy job completely independent of downloadable marketplace actions:
   - remove `actions/checkout@v4`,
   - remove `oven-sh/setup-bun@v2`,
   - clone the repository with ordinary `git` commands and the built-in GitHub token,
   - install the pinned Bun version with Bun’s official installer and retries.
2. Keep the existing site build, strict prerender, asset verification, and dual publishing to `gh-pages` and `main` unchanged.
3. Preserve `[skip ci]` on the generated `main` commit to prevent a deployment loop.
4. Remove the temporary hash-diagnostic logging, which has served its purpose and does not contribute to deployment.

## Validation

- Confirm the workflow contains no `uses:` entries, so **“Failed to resolve action download info” cannot originate from this custom deploy again**.
- Confirm the workflow still fetches the full source checkout, builds the site, prerenders the Blitz category, verifies all referenced assets, and publishes the same output to both configured branches.

## Important limitation

This removes the marketplace/CDN dependency from the workflow we control. GitHub’s built-in Pages publishing service can still have an outage and show **“Internal server error”**; repository code cannot replace or repair GitHub’s hosting infrastructure. No page or design code will be changed.