import { describe, it, expect } from "vitest";
import { marginNotePosts } from "./marginNotes";

const insta = { title: "Posts that don't make it to Instagram", slug: "posts-that-dont-make-it-to-instagram", date: "2026-11-18T10:00:00Z" };
const chron = { title: "My Service Dog Training Chronicles", slug: "my-service-dog-training-chronicles", date: "2026-11-20T16:58:33Z" };

describe("margin notes", () => {
  it("shows the Instagram post when edited exactly 12 hours after publishing", () => {
    expect(marginNotePosts([{ ...insta, modified: "2026-11-18T22:00:00Z" }])[0].kind).toBe("update");
  });
  it("hides the Instagram post when edited under 12 hours after publishing", () => {
    expect(marginNotePosts([{ ...insta, modified: "2026-11-18T21:59:00Z" }])).toHaveLength(0);
  });
  it("shows Service Dog Training Chronicles as new before any update", () => {
    const n = marginNotePosts([{ ...chron, modified: chron.date }]);
    expect(n).toHaveLength(1);
    expect(n[0].kind).toBe("new");
  });
  it("shows Service Dog Training Chronicles as an update after a 12h+ edit", () => {
    expect(marginNotePosts([{ ...chron, modified: "2026-11-21T05:00:00Z" }])[0].kind).toBe("update");
  });
  it("ignores any other post even if updated", () => {
    expect(marginNotePosts([{ ...insta, title: "Gladys Gotcha Day!", slug: "gladys-gotcha-day", modified: "2026-11-20T10:00:00Z" }])).toHaveLength(0);
  });
});
