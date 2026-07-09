## Why deep links break today

Your site is a Single Page App on GitHub Pages. Only some URLs have their own prerendered folder in `dist-static/`:

- Prerendered (shared links work): `/`, `/about`, `/contact`, `/blog`, `/blog/reflections`, all `/gallery/*`, all `/recipes/*`, all `/prayers/*`.
- **NOT prerendered (shared links break)**: individual blog posts under `/blog/{category}/{post-slug}` — no folder exists for each post.

When someone opens a link with no matching folder, GitHub Pages serves `404.html`. Today `404.html` just runs `window.location.replace("/")`, which is exactly why every shared post link lands on the home page.

## The fix (industry-standard, minimal, safe)

Use the well-known "spa-github-pages" redirect. It only edits the deploy workflow — no source changes, no build changes, no prerender, no CNAME.

1. Replace `dist-static/404.html` with one whose only job is to encode the requested path into a query string and redirect to `/`. Example: `/blog/reflections/my-post` becomes `/?/blog/reflections/my-post`.
2. Inject a tiny script at the top of `<head>` in `dist-static/index.html` that, before the SPA boots, reads the encoded path and calls `history.replaceState` to restore the real URL. The SPA then routes normally and renders the correct post.

Both edits happen inside the existing "Prepare GitHub Pages artifact" step in `.github/workflows/deploy.yml`. Nothing else changes.

## Why this can't break the site

- Pages with their own prerendered folder still resolve normally — the 404 fallback is only used when GitHub Pages can't find a folder.
- The restore script is a no-op when there's no encoded path, so normal home visits are unaffected.
- Committed static files in the repo are not modified — the workflow only rewrites files inside `dist-static/` at deploy time. Reverting is one line in the workflow.
- No prerender, no wrangler, no server build, no CNAME, no repo-settings API calls — all the things that have broken deploys before are untouched.

## Technical details

Inside `.github/workflows/deploy.yml`, in the existing prepare step, replace the `cp dist-static/index.html dist-static/404.html` line with:

```bash
# SPA-fallback 404: encode the requested path and bounce to '/'.
cat > dist-static/404.html <<'HTML'
<!DOCTYPE html><html><head><meta charset="utf-8"><title>Redirecting…</title>
<script>
  var l = window.location;
  l.replace(
    l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') +
    '/?/' + l.pathname.slice(1).replace(/&/g, '~and~') +
    (l.search ? '&' + l.search.slice(1).replace(/&/g, '~and~') : '') +
    l.hash
  );
</script></head><body></body></html>
HTML

# Inject the URL-restore script into index.html once (idempotent).
if ! grep -q 'spa-github-pages-restore' dist-static/index.html; then
  python3 - <<'PY'
import pathlib, re
p = pathlib.Path('dist-static/index.html')
html = p.read_text()
snippet = '<script id="spa-github-pages-restore">(function(l){if(l.search[1]==="/"){var d=l.search.slice(1).split("&").map(function(s){return s.replace(/~and~/g,"&")}).join("?");window.history.replaceState(null,null,l.pathname.slice(0,-1)+d+l.hash);}}(window.location))</script>'
html = re.sub(r'<head([^>]*)>', r'<head\1>' + snippet, html, count=1)
p.write_text(html)
PY
fi
```

Everything else in the workflow (checkout, `.nojekyll`, gh-pages publish, no-CNAME) stays exactly as it is.

## If a 404 still shows up after this runs

The only remaining cause would be GitHub's own Pages settings — **Repo → Settings → Pages** must have the source set to the `gh-pages` branch (root). No code change can fix that toggle; check it once and it stays set.

## Out of scope

Prerendering individual blog posts. That path has broken deploys before, so I'm not touching it. The SPA redirect above already covers every deep link, including any new posts you add later.
