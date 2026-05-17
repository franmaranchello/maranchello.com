import { describe, expect, it } from "vitest";
import {
  formatDate,
  normalizeGallery,
  normalizeTags,
  postFromDoc,
  projectFromDoc,
  toDate,
  toIsoDate,
  toYear,
} from "./content";

describe("content utilities", () => {
  it("normalizes supported Firestore date shapes", () => {
    const directDate = new Date("2024-01-02T00:00:00.000Z");

    expect(toDate(directDate)?.toISOString()).toBe("2024-01-02T00:00:00.000Z");
    expect(toDate("2024-01-02T00:00:00.000Z")?.toISOString()).toBe(
      "2024-01-02T00:00:00.000Z"
    );
    expect(toDate({ seconds: 1704153600 })?.toISOString()).toBe(
      "2024-01-02T00:00:00.000Z"
    );
    expect(toDate({ toDate: () => directDate })?.toISOString()).toBe(
      "2024-01-02T00:00:00.000Z"
    );
    expect(toDate("not-a-date")).toBeNull();
  });

  it("creates stable date display values", () => {
    expect(toIsoDate({ seconds: 1704153600 })).toBe("2024-01-02T00:00:00.000Z");
    expect(toYear({ seconds: 1704153600 })).toBe(2024);
    expect(formatDate("2024-01-02T00:00:00.000Z")).toBe("Jan 2, 2024");
  });

  it("filters malformed tag and gallery values", () => {
    expect(normalizeTags(["nuxt", "", 5, "firebase"])).toEqual([
      "nuxt",
      "firebase",
    ]);
    expect(normalizeGallery(["/a.jpg", null, "/b.jpg"])).toEqual([
      "/a.jpg",
      "/b.jpg",
    ]);
  });

  it("maps project documents with defaults and computed year", () => {
    expect(
      projectFromDoc("project-1", {
        name: "Portfolio",
        type: "Software",
        date: { seconds: 1704153600 },
        tags: ["nuxt"],
        collection: "Web",
        description: "Modern portfolio",
        content: "<p>Hello</p>",
        gallery: ["/cover.jpg"],
      })
    ).toEqual({
      id: "project-1",
      name: "Portfolio",
      type: "Software",
      date: "2024-01-02T00:00:00.000Z",
      year: 2024,
      tags: ["nuxt"],
      collection: "Web",
      description: "Modern portfolio",
      content: "<p>Hello</p>",
      gallery: ["/cover.jpg"],
    });
  });

  it("maps post documents with safe empty defaults", () => {
    expect(postFromDoc("post-1", {})).toEqual({
      id: "post-1",
      name: "Untitled post",
      date: "",
      year: null,
      tags: [],
      description: "",
      content: "",
      gallery: [],
    });
  });
});
