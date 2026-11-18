import { describe, it, expect } from "vitest";
import { marginNotePosts } from "./marginNotes";

const base = { title: "Posts that don't make it to Instagram", slug: "posts-that-dont-make-it-to-instagram", date: "2026-11-18T10:00:00Z" };

describe("margin notes", () => {
  it("shows the post when edited exactly 12 hours after publishing", () => {
    expect(marginNotePosts([{ ...base, modified: "2026-11-18T22:00:00Z" }])).toHaveLength(1);
  });
  it("hides the post when edited under 12 hours after publishing", () => {
    expect(marginNotePosts([{ ...base, modified: "2026-11-18T21:59:00Z" }])).toHaveLength(0);
  });
  it("ignores any other post even if updated", () => {
    expect(marginNotePosts([{ ...base, title: "Gladys Gotcha Day!", slug: "gladys-gotcha-day", modified: "2026-11-20T10:00:00Z" }])).toHaveLength(0);
  });
});
