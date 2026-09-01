# Plan: Stale error banner — no action

## Summary
- Build logs show the latest build is clean ("build OK"). The error banner in the preview is a stale leftover from a mid-edit moment during the previous change.
- Cami has chosen to ignore it for now. **No code changes are required.**

## If it returns
If the banner reappears after a fresh preview reload, investigate then:
1. Re-check `/tmp/observability/build-errors.log` and runtime logs for a fresh entry.
2. Only fix something if a real, reproducible error appears.

Nothing else on the site is touched.
