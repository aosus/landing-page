import sharp from "sharp";
import fs from "fs";
import path from "path";

const PUBLIC_DIR = path.join(process.cwd(), "public");
const IMAGES_DIR = path.join(PUBLIC_DIR, "images");
const OG_DIR = path.join(PUBLIC_DIR, "og");

const OG_WIDTH = 1200;
const OG_HEIGHT = 630;
const THUMB_WIDTH = 640;
const THUMB_HEIGHT = 360;

async function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

async function optimizeImages() {
  await ensureDir(OG_DIR);

  const thumbDir = path.join(IMAGES_DIR, "thumbs");
  await ensureDir(thumbDir);

  const imageFiles = fs
    .readdirSync(IMAGES_DIR)
    .filter(
      (f) =>
        (f.endsWith(".png") || f.endsWith(".jpg") || f.endsWith(".jpeg")) &&
        !f.includes("thumbs")
    );

  for (const file of imageFiles) {
    const inputPath = path.join(IMAGES_DIR, file);
    const baseName = path.parse(file).name;

    const thumbPath = path.join(thumbDir, `${baseName}.webp`);
    if (!fs.existsSync(thumbPath)) {
      await sharp(inputPath)
        .resize(THUMB_WIDTH, THUMB_HEIGHT, { fit: "cover" })
        .webp({ quality: 80 })
        .toFile(thumbPath);
      console.log(`  Thumbnail: ${thumbPath}`);
    }

    const ogPath = path.join(OG_DIR, `${baseName}.jpg`);
    if (!fs.existsSync(ogPath)) {
      await sharp(inputPath)
        .resize(OG_WIDTH, OG_HEIGHT, { fit: "cover" })
        .jpeg({ quality: 85 })
        .toFile(ogPath);
      console.log(`  OG image: ${ogPath}`);
    }
  }

  console.log("Image optimization complete.");
}

optimizeImages().catch((err) => {
  console.error("Image optimization failed:", err);
  process.exit(1);
});
