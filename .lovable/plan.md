## Problem

Your new Reflections post "You Have to Earn the Prosecco 🍾🛁" has emojis in its WordPress slug, which WordPress stores percent‑encoded: `you-have-to-earn-the-prosecco-%f0%9f%8d%be%f0%9f%9b%81`.

The list page (the "New!" preview) displays fine because it just renders titles. But the entry page fails because the slug gets **double‑encoded** in the request:

1. `post.slug` from WordPress already contains `%f0%9f...`
2. The `<Link>` passes that as a route param → TanStack encodes it again → URL becomes `%25f0%259f...`
3. Loader decodes once (`%f0%9f...`) then calls `encodeURIComponent()` again → `%25f0...`
4. WordPress API returns 404 for the double‑encoded slug → "Entry not found"

I confirmed this by hitting the WP.com API directly: the correctly single‑encoded URL returns 200; the double‑encoded one returns 404.

You didn't do anything wrong in WordPress — this is a bug in how our code handles emoji/non‑ASCII slugs.

## Fix

One tiny change in `src/lib/wordpress-public.ts`:

- In `normalize()`, decode `post.slug` before returning it, so downstream code always sees the human/emoji form (`you-have-to-earn-the-prosecco-🍾🛁`).
- In `getPublicWordPressPostBySlug()`, keep the single `encodeURIComponent(slug)` call — it will now produce exactly one level of encoding for the API request.

That's it. No route changes, no link changes, no other files touched. All your existing ASCII‑slug posts are unaffected (decoding an already‑plain slug is a no‑op).

## Verification

After the edit I'll:
1. Confirm the preview loads `/blog/reflections/you-have-to-earn-the-prosecco-🍾🛁` and renders the post.
2. Spot‑check one older Reflections post still works.

No deployment workflow changes.
