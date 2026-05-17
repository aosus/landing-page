import { describe, expect, it } from "vitest";

import { getArticleDiscussionUrl, getDiscussionUrl } from "../src/lib/article-pages";

const sampleUrl = "https://aosus.org/blog/aosus-v3";
const sampleDiscussionUrl = "https://discourse.aosus.org/t/topic/5323/2";

describe("article page helpers", () => {
  it("looks up discussion URLs from the generated map", () => {
    expect(getDiscussionUrl(sampleUrl, { [sampleUrl]: sampleDiscussionUrl })).toBe(
      sampleDiscussionUrl,
    );
    expect(getDiscussionUrl("https://aosus.org/blog/missing", { [sampleUrl]: sampleDiscussionUrl })).toBeNull();
  });

  it("reads the resolved discussion URL from the generated map", async () => {
    const discussionUrl = await getArticleDiscussionUrl(
      {
        slug: "aosus-v3",
        lang: "ar",
        commentsEnabled: true,
      } as any,
      "ar",
    );

    expect(discussionUrl).toBe(sampleDiscussionUrl);
  });

  it("returns null for posts without comments enabled", async () => {
    const discussionUrl = await getArticleDiscussionUrl(
      {
        slug: "aosus-v3",
        lang: "ar",
        commentsEnabled: false,
      } as any,
      "ar",
    );

    expect(discussionUrl).toBeNull();
  });
});
