import fs from "fs";
import path from "path";

const root = process.cwd();
const contentDir = path.join(root, "content", "blog");
const publicContentDir = path.join(root, "public", "content", "blog");
const brandAssetsDir = path.join(root, "brand-assets");

const brandAssetCopies = [
  {
    source: path.join(brandAssetsDir, "logos", "Aosus Logo", "SVG", "aosus-logo.svg"),
    target: path.join(root, "public", "images", "aosus-logo.svg"),
  },
  {
    source: path.join(brandAssetsDir, "logos", "Aosus Logo", "PNG", "writing-contest.png"),
    target: path.join(root, "public", "images", "writing-contest.png"),
  },
  {
    source: path.join(brandAssetsDir, "logos", "discourse-chat-bridge", "Discourse_Bridge.webp"),
    target: path.join(root, "public", "images", "discourse-bridge.webp"),
  },
  {
    source: path.join(brandAssetsDir, "assets", "aosus-preview.jpg"),
    target: path.join(root, "public", "opengraph.jpg"),
  },
  {
    source: path.join(brandAssetsDir, "assets", "writing-preview.jpg"),
    target: path.join(root, "public", "og", "writing-contest.jpg"),
  },
];

function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function syncDirectory(sourceDir: string, targetDir: string) {
  ensureDir(targetDir);

  for (const entry of fs.readdirSync(sourceDir, { withFileTypes: true })) {
    const sourcePath = path.join(sourceDir, entry.name);
    const targetPath = path.join(targetDir, entry.name);

    if (entry.isDirectory()) {
      syncDirectory(sourcePath, targetPath);
      continue;
    }

    if (entry.name.endsWith(".md")) {
      continue;
    }

    fs.copyFileSync(sourcePath, targetPath);
  }
}

function syncBrandAssets() {
  for (const { source, target } of brandAssetCopies) {
    if (!fs.existsSync(source)) {
      continue;
    }

    ensureDir(path.dirname(target));
    fs.copyFileSync(source, target);
  }
}

if (fs.existsSync(publicContentDir)) {
  fs.rmSync(publicContentDir, { recursive: true, force: true });
}

syncDirectory(contentDir, publicContentDir);
syncBrandAssets();
