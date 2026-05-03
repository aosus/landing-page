import { describe, expect, it } from "vitest";
import { buildRssXml, getRssFeedPath, getRssFeedUrl } from "../src/lib/rss";

describe("rss", () => {
  it("builds an RSS feed with locale-specific metadata and post links", () => {
    const xml = buildRssXml("en", [
      {
        title: "Example post",
        excerpt: "Feed excerpt",
        image: "/content/blog/example/cover.png",
        ogImage: "/content/blog/example/cover.png",
        thumbnail: "/content/blog/example/thumb.png",
        date: "2026-04-14",
        author: "Aosus",
        tags: ["news"],
        categories: ["updates"],
        slug: "example-post",
        lang: "en",
        content: "<p>Hello feed readers.</p>",
      },
    ] as any);

    expect(xml).toContain("<title>Aosus Blog</title>");
    expect(xml).toContain("<language>en</language>");
    expect(xml).toContain('<atom:link href="https://aosus.org/en/rss.xml" rel="self" type="application/rss+xml" />');
    expect(xml).toContain("<link>https://aosus.org/en/blog/example-post</link>");
    expect(xml).toContain("<dc:creator><![CDATA[Aosus]]></dc:creator>");
    expect(xml).toContain('<enclosure url="https://aosus.org/content/blog/example/cover.png" type="image/png" />');
    expect(xml).toContain("<content:encoded><![CDATA[<p>Hello feed readers.</p>]]></content:encoded>");
  });

  it("uses root-level URLs for Arabic WordPress-style posts", () => {
    const xml = buildRssXml("ar", [
      {
        title: "Arabic post",
        excerpt: "Excerpt",
        image: "/content/blog/example/cover.jpg",
        ogImage: "/content/blog/example/cover.jpg",
        date: "2026-04-14",
        author: "Aosus",
        tags: [],
        categories: [],
        slug: "1192",
        lang: "ar",
        wpId: "1192",
        wpType: "post",
        content: "<p>Arabic body</p>",
      },
    ] as any);

    expect(xml).toContain("<link>https://aosus.org/1192</link>");
  });

  it("exposes stable feed paths and URLs", () => {
    expect(getRssFeedPath("ar")).toBe("/rss.xml");
    expect(getRssFeedPath("en")).toBe("/en/rss.xml");
    expect(getRssFeedUrl("ar")).toBe("https://aosus.org/rss.xml");
    expect(getRssFeedUrl("en")).toBe("https://aosus.org/en/rss.xml");
  });
});
