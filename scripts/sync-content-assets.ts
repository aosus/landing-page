import fs from "fs";
import path from "path";

const root = process.cwd();
const contentDir = path.join(root, "content", "blog");
const publicContentDir = path.join(root, "public", "content", "blog");

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

if (fs.existsSync(publicContentDir)) {
  fs.rmSync(publicContentDir, { recursive: true, force: true });
}

syncDirectory(contentDir, publicContentDir);
