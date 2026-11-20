# Add "My Service Dog Training Chronicles" to Margin Notes

I found the post in WordPress. It's filed under The Lovely Gladys and was published today at 11:58 AM.

## What you'll see
- Margin Notes will show two cards, on The Journal and on Gladys's page, in the same style as now.
- **Service Dog Training Chronicles shows up right away**, even with no update yet. Until you update it, the card says `New: "My Service Dog Training Chronicles"` with the date you published it, and clicking it opens the post at the top.
- When you edit it 12 hours or more after publishing, the card switches to `Update to "My Service Dog Training Chronicles"` with the new date. Clicking it then jumps to your latest "Update:" heading, just like the other post.
- "Posts that don't make it to Instagram" works the same as before: it stays hidden until you make an edit 12+ hours after publishing.
- The most recently changed post goes on top.

## Technical details
- `src/lib/marginNotes.ts`: change the tracked list to two entries, each with an `alwaysShow` flag (true for service-dog-training-chronicles). Return up to 2 notes, each tagged `kind: "update" | "new"`. A note is "update" when `modified - date >= 12h`; otherwise it's "new" only if alwaysShow is set. Sort by the update date, or the publish date for "new" notes.
- `MarginNotes.tsx`: render the "New:" label, publish date and no `#latest-update` hash for "new" notes.
- Add tests: Chronicles shows as "new" with no edits; shows as "update" after an edit 12h+ later; Instagram post still hidden under 12h.
