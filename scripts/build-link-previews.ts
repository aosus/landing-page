import fs from "fs";
import path from "path";
import ogs from "open-graph-scraper";
import pLimit from "p-limit";

const contentRoot = path.join(process.cwd(), "content");
const blogRoot = path.join(contentRoot, "blog");
const previewsDir = path.join(process.cwd(), "public", "link-previews", "favicons");
const manifestPath = path.join(process.cwd(), "public", "link-previews", "manifest.json");

if (!fs.existsSync(previewsDir)) {
  fs.mkdirSync(previewsDir, { recursive: true });
}

function getAllMarkdownFiles(dir: string, fileList: string[] = []): string[] {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getAllMarkdownFiles(filePath, fileList);
    } else if (filePath.endsWith(".md")) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

const extractLinks = (markdown: string): string[] => {
  const links: string[] = [];
  // Match markdown links [text](url) and bare URLs
  const mdLinkRegex = /\[[^\]]*\]\((https?:\/\/[^\s)]+)\)/g;
  const bareUrlRegex = /(^|\s)(https?:\/\/[^\s]+)/g;

  let match;
  while ((match = mdLinkRegex.exec(markdown)) !== null) {
    links.push(match[1]);
  }
  while ((match = bareUrlRegex.exec(markdown)) !== null) {
    links.push(match[2]);
  }
  return Array.from(new Set(links));
};

async function downloadFavicon(url: string, dest: string): Promise<boolean> {
  try {
    const response = await fetch(url);
    if (!response.ok) return false;
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    fs.writeFileSync(dest, buffer);
    return true;
  } catch (e) {
    return false;
  }
}

async function main() {
  const mdFiles = getAllMarkdownFiles(blogRoot);
  let allLinks: string[] = [];

  for (const file of mdFiles) {
    const content = fs.readFileSync(file, "utf8");
    allLinks = allLinks.concat(extractLinks(content));
  }

  allLinks = Array.from(new Set(allLinks));
  // Filter out internal links and generic domains if needed
  allLinks = allLinks.filter((link) => !link.includes("aosus.org"));

  let manifest: Record<string, any> = {};
  if (fs.existsSync(manifestPath)) {
    manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
  }

  const limit = pLimit(5); // 5 concurrent requests
  let updated = false;

  await Promise.all(
    allLinks.map((link) =>
      limit(async () => {
        if (manifest[link]) return; // already cached

        try {
          console.log(`Fetching preview for: ${link}`);
          const { result, error } = await ogs({ url: link, timeout: 5000 });
          if (!error && result) {
            const data: any = {
              title: result.ogTitle || "",
              description: result.ogDescription || "",
              siteName: result.ogSiteName || "",
            };

            if (result.favicon) {
              let faviconUrl = result.favicon;
              if (faviconUrl.startsWith("/")) {
                const urlObj = new URL(link);
                faviconUrl = `${urlObj.protocol}//${urlObj.host}${faviconUrl}`;
              }
              const ext = path.extname(new URL(faviconUrl).pathname) || ".ico";
              const filename = Buffer.from(link).toString("base64url").replace(/[^a-zA-Z0-9]/g, "") + ext;
              const dest = path.join(previewsDir, filename);

              const success = await downloadFavicon(faviconUrl, dest);
              if (success) {
                data.localFavicon = `/link-previews/favicons/${filename}`;
              }
            }

            manifest[link] = data;
            updated = true;
          }
        } catch (e) {
          console.error(`Failed to fetch ${link}`);
          // mark as failed to avoid refetching every time
          manifest[link] = { error: true };
          updated = true;
        }
      })
    )
  );

  if (updated) {
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
    console.log("Updated link previews manifest.");
  } else {
    console.log("No new link previews to fetch.");
  }
}

main();
