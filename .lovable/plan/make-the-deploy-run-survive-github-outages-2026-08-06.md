# Make the deploy run survive GitHub outages

## What actually happened

None of the three messages are errors in your site's code:

- **"Internal server error. Correlation ID: …"** on *pages build and deployment* — GitHub's own Pages service failing.
- **"Failed to resolve action download info."** on *deploy* — GitHub couldn't download a third-party Action from its marketplace CDN.
- **"Bad Gateway"** on *deploy* — GitHub API returned 502.

All three are GitHub-side infrastructure failures happening at the same moment. The build never got far enough to touch your code. The first thing to do is simply re-run the workflow; if GitHub has recovered it will pass unchanged.

That said, the current workflow depends on three third-party Actions downloaded from GitHub's marketplace at run time, which is exactly the piece that failed. We can shrink that surface so a marketplace hiccup no longer kills a deploy.

## Plan

1. **Re-run the failed workflow first** (Actions tab → the failed run → "Re-run all jobs"). If it goes green, the rest below is purely hardening.

2. **Drop the `peaceiris/actions-gh-pages` dependency.** Replace that step with a few plain `git` commands that push `dist-static/` to the `gh-pages` branch using the built-in token. No marketplace download, nothing to fail to resolve.

3. **Make Bun setup resilient.** Keep `oven-sh/setup-bun@v2` but pin it to a version instead of `latest`, and add a fallback step that installs Bun via its official install script if the action step fails.

4. **Add automatic retry on transient failures.** Wrap the install step so a network blip retries rather than failing the run.

5. **Turn off the duplicate "pages build and deployment" job.** Your repo currently has GitHub's legacy branch-based Pages builder running alongside this workflow — that's the job throwing "Internal server error". Since the workflow publishes the finished `gh-pages` branch itself, that second builder is redundant noise. This one is a settings change on your side: Settings → Pages → keep Source as "Deploy from a branch" → `gh-pages` / root, which is what the workflow feeds.

## Technical notes

- The `gh-pages` push replaces `force_orphan: true` with a fresh orphan commit built in a temp worktree, so history stays clean exactly as before.
- No change to the build, prerender, neutralization, or asset-verifier steps — those are working and stay untouched.
- Nothing in `src/` changes.
