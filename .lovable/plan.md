## Diagnostic-only workflow change

Goal: capture ground truth about the `.output/server/` and `dist/server/` filesystem state during the failing prerender step so the next fix is targeted, not guessed.

### What changes

Only `.github/workflows/deploy.yml`. No source code, no scripts, no site content.

Add a diagnostic step immediately before the `node scripts/prerender.mjs` invocation:

```yaml
- name: Diagnose server bundle layout (read-only)
  run: |
    echo "=== .output tree ==="
    ls -laR .output 2>&1 || echo "(no .output dir)"
    echo "=== dist tree ==="
    ls -laR dist 2>&1 || echo "(no dist dir)"
    echo "=== dist-static tree (top only) ==="
    ls -la dist-static 2>&1 || echo "(no dist-static dir)"
```

### What we learn

- Whether `.output/server/index.mjs` (or the current entry name) exists after the Vite build.
- Whether `.output/server/_libs/srvx.mjs` exists at the source before `prerender.mjs` tries to copy.
- Whether `dist/server/` is being pre-populated by anything before the copy step.
- The exact filename of the server entry (in case the name shifted between framework versions).

### What does NOT change

- No changes to `scripts/prerender.mjs`.
- No changes to `STRICT_PRERENDER`, timeouts, or fallbacks.
- No changes to any site files, routes, or content.
- The build still fails on the same error — this run just prints the filesystem before it fails.

### Next step after the run

You paste the diagnostic output. I read it, identify exactly why `_libs/srvx.mjs` isn't reachable when the prerender server starts, and propose a single targeted fix.

### Risk

Zero — read-only shell commands appended to a step that already fails. The failure mode is unchanged; we just get visibility.
