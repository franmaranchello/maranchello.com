import { describe, expect, it } from "vitest";
import {
  absoluteUrl,
  buildCanonicalUrl,
  escapeXml,
  normalizePath,
  projectPath,
  projectSeoDescription,
  safeJsonLd,
  stripHtml,
  truncateDescription,
} from "./seo";

describe("seo helpers", () => {
  it("builds clean canonical URLs", () => {
    expect(buildCanonicalUrl("https://maranchello.com/", "/projects/?tag=x")).toBe(
      "https://maranchello.com/projects"
    );
    expect(buildCanonicalUrl("https://maranchello.com", "about")).toBe(
      "https://maranchello.com/about"
    );
    expect(normalizePath("/")).toBe("/");
  });

  it("keeps absolute URLs and resolves relative URLs", () => {
    expect(absoluteUrl("https://maranchello.com", "https://example.com/image.jpg")).toBe(
      "https://example.com/image.jpg"
    );
    expect(absoluteUrl("https://maranchello.com", "/apple-touch-icon.png")).toBe(
      "https://maranchello.com/apple-touch-icon.png"
    );
  });

  it("normalizes text for metadata and XML", () => {
    expect(stripHtml("<p>Hello <strong>world</strong></p>")).toBe("Hello world");
    expect(escapeXml(`Fran & "projects"`)).toBe("Fran &amp; &quot;projects&quot;");
    expect(truncateDescription("x".repeat(200))).toHaveLength(160);
  });

  it("encodes project paths", () => {
    expect(projectPath({ id: "mixed media" })).toBe("/projects/mixed%20media");
  });

  it("builds project descriptions with safe fallbacks", () => {
    expect(projectSeoDescription(null)).toBe("Project by Francisco Maranchello.");
    expect(
      projectSeoDescription({
        id: "project-1",
        name: "Project",
        type: "Software",
        date: "",
        year: null,
        tags: [],
        collection: "Automation",
        description: "<p>Useful AEC tooling.</p>",
        content: "",
        gallery: [],
      })
    ).toBe("Useful AEC tooling. Software Automation");
  });

  it("escapes JSON-LD script-breaking characters", () => {
    expect(safeJsonLd({ name: "</script><script>alert(1)</script>" })).not.toContain(
      "</script>"
    );
  });
});
