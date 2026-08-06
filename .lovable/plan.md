# The stalled yellow "pages build and deployment"

## What's actually happening

There are two separate things running on every push:

1. **`deploy`** — the workflow in your repo. It builds the site, prerenders every page
   (including `/blog/in-loving-memory-of-blitz`), verifies assets, and pushes the finished
   site to both `gh-pages` and the root of `main`. This is the run that is **green**.
2. **`pages build and deployment`** — GitHub's own built-in Pages publisher. It is not in
   your repo, it isn't code I can edit, and it only exists because Pages is set to
   "Deploy from a branch." Yellow/stalled means GitHub's Pages service is queued or degraded
   on their side. This is the same service that reported "Internal server error" earlier today.

So: your content is built and committed correctly. What's stuck is GitHub's publishing step,
which nothing in the repository can force to run.

## What I propose

**Step 1 — confirm the content is really there (no code changes).**
Check the committed site files on `main` for the memorial category page and the Blitz card on
the Journal index. If those exist, the build side is proven done and the only remaining
variable is GitHub's publisher.

**Step 2 — nudge GitHub's publisher without touching the site.**
Options, in order of least risk:

- Re-run the stalled `pages build and deployment` job from the Actions tab.
- If it stays yellow, in **Settings → Pages** switch the source branch to `gh-pages` and save,
  which forces GitHub to queue a fresh publish. Both branches now hold byte-identical output,
  so either choice serves the same site.
- If GitHub's Pages service is degraded (check githubstatus.com), it clears on its own; the
  already-committed build publishes with no further action.

**Step 3 — no workflow edits.**
I do not want to change `deploy.yml` again. It is green and correct. Changing a working
deploy while GitHub is having an outage would only make it harder to tell what failed.

## Safety

- No files in `src/` change, so the Journal, the memorial category, and the preview stay
  exactly as they are now.
- Steps 1 is read-only; step 2 is a GitHub settings/re-run action, not a code change.
- Nothing here can break the site — the worst case is that GitHub's publisher stays slow and
  the live page updates later than we'd like.
