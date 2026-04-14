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

  it("does not preview internal Aosus links", async () => {
    const output = await render("[Support us](https://aosus.org/support-us)");

    expect(output).not.toContain("aosus-link-preview-inline");
    expect(output).not.toContain("aosus-link-preview-card");
  });
});
