import { describe, expect, it } from "vitest";

import {
  extractDiscourseDiscussionUrl,
  getAbsolutePostUrl,
} from "../src/lib/discourse";

describe("discourse helpers", () => {
  it("builds canonical article URLs for blog routes", () => {
    expect(getAbsolutePostUrl("ar", "aosus-v3")).toBe("https://aosus.org/blog/aosus-v3");
    expect(getAbsolutePostUrl("en", "aosus-v3")).toBe("https://aosus.org/en/blog/aosus-v3");
  });

  it("builds canonical article URLs for root-level WordPress posts", () => {
    expect(getAbsolutePostUrl("ar", "1192", true)).toBe("https://aosus.org/1192");
    expect(getAbsolutePostUrl("en", "1192", true)).toBe("https://aosus.org/en/1192");
  });

  it("extracts the exact discussion URL from the embed footer button", () => {
    const html = `
      <footer class="clearfix">
        <a target="_blank" href="https://discourse.aosus.org">logo</a>
        <a class="button" target="_blank" href="https://discourse.aosus.org/t/topic/5323/2">متابعة المناقشة</a>
      </footer>
    `;

    expect(extractDiscourseDiscussionUrl(html)).toBe("https://discourse.aosus.org/t/topic/5323/2");
  });

  it("falls back to the post date link when the footer button is absent", () => {
    const html = `
      <article class="post" id="post-15319">
        <a class="post-date" target="_blank" href="/t/topic/5323/2">&lt; 10 د</a>
      </article>
    `;

    expect(extractDiscourseDiscussionUrl(html)).toBe("https://discourse.aosus.org/t/topic/5323/2");
  });

  it("returns null when no discussion link is present", () => {
    expect(extractDiscourseDiscussionUrl("<div>No discussion yet</div>")).toBeNull();
  });
});
