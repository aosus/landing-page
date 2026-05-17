import fs from "node:fs/promises";
import path from "node:path";
import { getAllPosts } from "@/lib/markdown";
import { getAbsolutePostUrl } from "@/lib/discourse";
import { resolveDiscourseDiscussionUrl } from "@/lib/discourse.server";

const publicOutputPath = path.join(process.cwd(), "public", "discourse-discussions.json");
const sourceOutputPath = path.join(
  process.cwd(),
  "src",
  "generated",
  "discourse-discussions.json",
);

async function main() {
  const posts = [...getAllPosts("ar"), ...getAllPosts("en")].filter((post) => post.commentsEnabled);
  const discussionEntries = await Promise.all(
    posts.map(async (post) => {
      const articleUrl = getAbsolutePostUrl(
        post.lang,
        post.slug,
        post.wpType === "post" && post.wpId === post.slug,
      );
      const discussionUrl = await resolveDiscourseDiscussionUrl(articleUrl);

      return discussionUrl ? ([articleUrl, discussionUrl] as const) : null;
    }),
  );

  const discussionMap = Object.fromEntries(
    discussionEntries.filter((entry): entry is readonly [string, string] => entry !== null),
  );

  const contents = `${JSON.stringify(discussionMap, null, 2)}\n`;

  await fs.mkdir(path.dirname(publicOutputPath), { recursive: true });
  await fs.mkdir(path.dirname(sourceOutputPath), { recursive: true });
  await Promise.all([
    fs.writeFile(publicOutputPath, contents, "utf8"),
    fs.writeFile(sourceOutputPath, contents, "utf8"),
  ]);

  console.log(`Discourse discussions synced: ${Object.keys(discussionMap).length} URLs`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
