## Replace the candle with a dripping-wax version (same holder, same scene)

The candle lives baked into the hero image at `src/assets/raw-unhinged/desk-scene.jpg`. I'll do an AI image edit on just the candle, keeping everything else (brass holder, wick, flame area, wood desk, ginger cat, journal, tea, plant, window, lighting) untouched.

### Approach

1. **Edit the existing scene image** with `imagegen--edit_image` on `desk-scene.jpg`, prompting for: same cream pillar candle in the same brass dish holder, same height and position, same warm candlelit lighting from the right — but with thick, irregular wax drips running down the sides of the candle and pooling slightly on the brass dish. Preserve the rest of the photo exactly.
2. **Save in place** to `src/assets/raw-unhinged/desk-scene.jpg` (overwrite) so the existing `<img>`, OG image, all anchor percentages (flame, steam, journal hotspot), and the wall cover all keep working without any code changes.
3. **Verify** with a fresh preview screenshot. If the candle position shifts even slightly (and the animated flame ends up off the wick), I'll either re-run the edit asking for tighter preservation, or nudge the flame's `top`/`left` percentages — no other CSS or layout changes.

### Risk + fallback

AI edits sometimes move things a few pixels or alter neighboring objects. If anything other than the candle visibly changes, or the candle position drifts, I'll retry the edit (up to twice) with stricter "do not modify anything else" wording. If it still won't behave, I'll stop and show you both before pushing further.

### Files touched
- `src/assets/raw-unhinged/desk-scene.jpg` — overwritten with the dripping-wax version.
- No code changes expected.
