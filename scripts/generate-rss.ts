import fs from "fs";
import path from "path";
import { getAllPosts, getPostBySlug } from "../src/lib/markdown";
import { buildRssXml, getRssFeedPath } from "../src/lib/rss";
import type { Lang } from "../src/lib/locale";

const root = process.cwd();
const publicDir = path.join(root, "public");
const langs: Lang[] = ["ar", "en"];

function ensureDir(dir: string) {
  fs.mkdirSync(dir, { recursive: true });
}

async function generateFeed(lang: Lang) {
  const posts = await Promise.all(
    getAllPosts(lang).map(async (post) => getPostBySlug(post.slug, lang)),
  );
  const publishedPosts = posts.filter((post): post is NonNullable<typeof post> => Boolean(post));
  const feedPath = getRssFeedPath(lang);
  const outputPath = path.join(publicDir, feedPath.replace(/^\//, ""));

  ensureDir(path.dirname(outputPath));
  const xml = buildRssXml(lang, publishedPosts);
  fs.writeFileSync(outputPath, xml);

  for (const aliasPath of [outputPath.replace(/rss\.xml$/, "rss"), outputPath.replace(/rss\.xml$/, "feed")]) {
    fs.writeFileSync(aliasPath, xml);
  }
}

await Promise.all(langs.map((lang) => generateFeed(lang)));
