## Add the golf-ball photo to Texture & Form

The uploaded shot (a crate of mixed-colour golf balls, all dimples and saturated colour) is a natural fit for Texture & Form.

### Steps

1. **Watermark it** with the standard recipe from project memory:
   - auto-orient, resize to 1600px long edge, strip metadata
   - composite the dark shadow watermark at `+28+30` and the light script watermark at `+30+32`, bottom-right (`-gravity southeast`), 450px wide, alpha 0.40 / 0.65
   - export JPG at quality 82
2. **Save it** as `src/assets/texture-form/golf-balls.jpg`.
3. **Wire it into the gallery** — add an import and one entry to the `items` array in `src/routes/gallery.texture-form.tsx`, placed first so it leads the grid ahead of the aquarium stones. Proposed title: **"A bucket of dimples"** (say the word if you'd rather have something else, e.g. "Range balls, all sorts").
4. Leave the kitten illustration, description, and empty slots as they are — gallery is still filling up.

Nothing else on the site changes; the homepage Recently Captured stays on the airplane-wing shot unless you want this swapped in.
