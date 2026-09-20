# Track three specific posts in Margin Notes

## Goal
Keep Margin Notes as a small, intentional list for exactly these three ongoing posts:

1. **I Finally Planted My Herb Garden!🌿**
2. **Home Improvement: The Previous Owner Left Me Cat Furniture. He Just Didn’t Know It.**
3. **I Was Supposed to Be Working. Instead, I Accidentally Started Helping a Shelter Dog.** (TREAT)

Each note will announce the newest update inside that post and jump directly to its latest `Update:` section.

## Changes
- Replace the current category-wide TREAT lookup with a short tracked-post list using the posts’ stable WordPress IDs, so unrelated Home Improvement or game posts never enter Margin Notes.
- Apply the same existing eligibility rules to each tracked post:
  - it appears only after its modified time is more than 24 hours after publication;
  - quick edits during the first 24 hours do not count;
  - a currently featured newest post remains excluded;
  - clicking the note opens that post at its final `Update:` section;
  - if no matching update section exists, the post opens normally without an error.
- Show every eligible tracked post, up to the fixed maximum of three, ordered by most recently updated first.
- Keep the current note image, title, excerpt, updated date, colors, typography, and link behavior.

## Placement recommendation
Keep Margin Notes directly below **From the latest page**, where update announcements naturally follow the newest post. For three items, retain the existing centered vertical stack rather than switching to columns: it reads like handwritten notes in sequence, preserves the full post titles, and remains easy to scan on phones. Tighten only the spacing between cards if needed after visual review; do not redesign them.

## Verification
- Confirm each tracked post appears only after qualifying under the 24-hour rule.
- Confirm multiple qualifying posts display newest-update-first, with no more than three notes.
- Confirm each link opens the correct post and lands on its latest `Update:` section.
- Check the stacked notes on desktop and mobile without adding another WordPress request or slowing Journal loading.
