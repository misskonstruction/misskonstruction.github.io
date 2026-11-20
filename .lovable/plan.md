# Keep edits out of "From the latest page"

Yes, this can be fixed. Right now "From the latest page" shows whichever post was published **or edited** most recently, so your Gotcha Day edit pushed it back to the top.

## Change
- "From the latest page" will show your **newest published post** only. Edits to older posts won't move them back to the top.
- Today that means "My Service Dog Training Chronicles" goes back in that spot.
- Updates to posts you're following will still show in Margin Notes, the same way they do now.

## Technical details
- In `src/routes/blog.index.tsx`, change `activityTime` to use only `Date.parse(p.date)` (drop `modified`).
- Save a memory note: "From the latest page" = newest by publish date; edits never bump it.
- Check /blog in the browser to confirm Chronicles is featured.
