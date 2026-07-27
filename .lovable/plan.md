# Trace the asset-hash mismatch to its real source

## Confirmation of the "same as committed root assets/" claim

Directly checked, not inferred:

```text
== mhJp_l7G ==   assets/SiteLayout-mhJp_l7G.js
== Db_OZXrz ==   assets/arrow-right-Db_OZXrz.js
== CZxY4Lzs ==   assets/index-CZxY4Lzs.js
== Dad_uxzM ==   assets/index-Dad_uxzM.js
```

All four of the "HTML wants this but the file isn't there" hashes exist verbatim in the checked-in repo-root `assets/` folder from the earlier manual syncs. That's a real signal, but on its own it doesn't prove the build is reading them from there — Rollup hashes are content-based, so it is also possible those four chunks simply haven't changed since the sync and the same content keeps producing the same hash. The diagnostic below is written to distinguish those two cases, not assume either.

## Two candidate mechanisms, and how the diagnostic tells them apart

1. **Two independent graphs, one output.** The client build and the SSR build each emit their own copy of chunks like `SiteLayout` and `index`, hashed from *their* graph's content. If SSR's `<Scripts />` links to the SSR-graph hash while `.output/public/assets/` only carries the client-graph hash, you'd see exactly this: HTML references files that never appear next to it. The stability across runs would come from the SSR graph's content being stable, not from anything stale.
2. **A stale artifact being pulled in.** Either the SSR build reads a cached/leftover manifest (unlikely — fresh checkout, no cache action), or something in the request path actually serves files from the repo-root `assets/` at build time. This is the mechanism to explicitly rule in or out; even though I can't see a plausible code path for it (Vite doesn't treat a top-level `assets/` folder as `publicDir`, the prerender crawler fetches HTML only, `.gitignore` covers `.output`/`dist`), the coincidence is strong enough to check rather than dismiss.

## What to add to `.github/workflows/deploy.yml`

One new step, inserted between `Build client + server bundle` and `Prerender static routes`. Read-only, no side effects:

```yaml
- name: Diagnose SSR/client hash disagreement
  run: |
    set +e
    echo "── .output tree (depth 3) ──"
    find .output -maxdepth 3 -type d | sort
    echo "── .output/public/assets listing ──"
    ls .output/public/assets 2>/dev/null | sort
    echo "── every manifest.json under .output ──"
    find .output -name "manifest.json" | sort
    for f in $(find .output -name "manifest.json"); do
      echo "── $f ──"
      head -c 6000 "$f"; echo
    done

    echo "── search WHOLE checkout for the 4 stale hashes ──"
    for h in mhJp_l7G Db_OZXrz CZxY4Lzs Dad_uxzM; do
      echo "  hash $h:"
      grep -rl --exclude-dir=node_modules --exclude-dir=.git "$h" . 2>/dev/null \
        | sed 's/^/    /'
    done

    echo "── same 4 hashes, scoped to .output/server only ──"
    for h in mhJp_l7G Db_OZXrz CZxY4Lzs Dad_uxzM; do
      echo "  hash $h in .output/server:"
      grep -rl "$h" .output/server 2>/dev/null | sed 's/^/    /' \
        || echo "    (not present)"
    done

    echo "── does .output/public/assets have the OWN copy of these chunk names? ──"
    ls .output/public/assets | grep -E 'SiteLayout|arrow-right|^index-' | sort
```

Reading the output tells us definitively:

- If the four hashes appear in `.output/server/*` **and** in `.output/public/assets/*`: content hasn't changed → not a bug; mismatch is elsewhere. Look at what else HTML references.
- If they appear in `.output/server/*` but NOT in `.output/public/assets/*`: the SSR bundle references chunks the client build never emitted → cause #1 (two graphs). Fix by making the SSR renderer read the client manifest, not the SSR one.
- If they appear ONLY in the checked-out repo root `assets/` (not in `.output/*`): cause #2 (build actually reads repo root). Purge the committed root `assets/`, `dist-static/`, `blog/`, etc. from `main` before the build step.
- If the SSR manifest file's listed chunk names disagree with the actual filenames in `.output/public/assets/`: same as cause #1, and the manifest is the smoking gun.

## Then fix, based on evidence

I'll make no build/config changes in this pass. Once the diagnostic output is in, one of the three fix paths above applies — I'll pick it based on what the log actually shows, not a guess.

## What I will not change in this pass

- No changes to `src/`, `vite.config.ts`, `scripts/prerender.mjs`.
- No touching GitHub Pages settings.
- No deleting the checked-in root `assets/` / `dist-static/` / `blog/` / etc. yet (leaving `main` serving as it is so the site stays stable).

## Deliverable of this pass

The next CI run's log — specifically the "Diagnose SSR/client hash disagreement" step — pasted back to me. From that I make a one-shot fix.
