import { describe, expect, it } from "vitest";
import { remark } from "remark";
import html from "remark-html";
import { createRemarkLinkPreviews } from "../src/lib/remarkLinkPreviews";

const manifest = {
  "https://example.com": {
    title: "Example Domain",
    description: "Example Description",
    siteName: "Example",
    hostname: "example.com",
    localFavicon: "/link-previews/favicons/example.ico",
  },
  "https://news.ycombinator.com/item?id=1": {
    title: "Hacker News",
    description: "Thread",
    siteName: "HN",
    hostname: "news.ycombinator.com",
    localFavicon: "/link-previews/favicons/hn.ico",
  },
  "https://aosus.org/support-us": {
    title: "Support Aosus",
    description: "Help the community",
    siteName: "Aosus",
    hostname: "aosus.org",
    localFavicon: "/link-previews/favicons/aosus.ico",
  },
  "https://fallback.example": {
    title: "fallback.example",
    description: "",
    siteName: "fallback.example",
    hostname: "fallback.example",
    localFavicon: "/link-previews/favicons/default.svg",
    error: true,
  },
};

async function render(markdown: string) {
  const output = await remark()
    .use(createRemarkLinkPreviews({ manifest }))
    .use(html, { sanitize: false })
    .process(markdown);

  return output.toString();
}

describe("remarkLinkPreviews", () => {
  it("replaces standalone raw URLs with full preview cards", async () => {
    const output = await render("https://example.com");

    expect(output).toContain("aosus-link-preview-card");
    expect(output).toContain("aosus-link-preview-card__link");
    expect(output).toContain("Example Domain");
  });

  it("adds desktop hover previews for inline links", async () => {
    const output = await render("Read [this thread](https://news.ycombinator.com/item?id=1) now.");

    expect(output).toContain("aosus-link-preview-inline");
    expect(output).toContain("aosus-link-preview-hover");
    expect(output).toContain("Hacker News");
    expect(output).toContain('target="_blank"');
  });

  it("adds previews for internal Aosus links too", async () => {
    const output = await render("[Support us](https://aosus.org/support-us)");

    expect(output).toContain("aosus-link-preview-inline");
    expect(output).toContain("aosus-link-preview-hover");
  });

  it("gives inline hover to a named link alone in its paragraph", async () => {
    // A link like [Discord](url) alone in a paragraph should still get
    // inline hover treatment — only bare raw URLs (link text === URL)
    // should become standalone cards.
    const output = await render("[Example](https://example.com)");

    expect(output).toContain("aosus-link-preview-inline");
    expect(output).toContain("aosus-link-preview-hover");
    expect(output).toContain("Example Domain");
    expect(output).not.toContain("aosus-link-preview-card");
  });

  it("converts a bare URL alone in its paragraph to a standalone card", async () => {
    const output = await render("https://example.com");

    expect(output).toContain("aosus-link-preview-card");
    expect(output).not.toContain("aosus-link-preview-inline");
  });

  it("does not add previews for links without manifest entries", async () => {
    const output = await render("[Unknown](https://unknown-site.org)");

    expect(output).not.toContain("aosus-link-preview-inline");
    expect(output).not.toContain("aosus-link-preview-card");
    expect(output).toContain("https://unknown-site.org");
  });

  it("converts bare URLs without manifest match to clickable links", async () => {
    // A bare URL with no preview data should still become a clickable <a> tag,
    // not stay as plain text.
    const output = await render("https://aosus.org/unknown-page");

    expect(output).toContain('<a href="https://aosus.org/unknown-page"');
    expect(output).toContain(">https://aosus.org/unknown-page</a>");
    expect(output).not.toContain("aosus-link-preview-card");
  });

  it("renders fallback previews for entries marked with fetch errors", async () => {
    const output = await render("https://fallback.example");

    expect(output).toContain("aosus-link-preview-card");
    expect(output).toContain("fallback.example");
    expect(output).toContain("/link-previews/favicons/default.svg");
  });
});
