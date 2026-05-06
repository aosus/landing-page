import http from "node:http";
import fs from "node:fs";
import path from "node:path";

const rootDir = path.join(process.cwd(), "out");
const port = Number(process.env.PORT || 25211);
const host = process.env.HOST || "0.0.0.0";

const contentTypes = new Map([
  [".html", "text/html; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".css", "text/css; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".xml", "application/rss+xml; charset=utf-8"],
  [".svg", "image/svg+xml"],
  [".png", "image/png"],
  [".jpg", "image/jpeg"],
  [".jpeg", "image/jpeg"],
  [".webp", "image/webp"],
  [".txt", "text/plain; charset=utf-8"],
  [".ico", "image/x-icon"],
  [".woff2", "font/woff2"],
]);

function contentTypeFor(filePath) {
  const basename = path.basename(filePath);

  if (basename === "rss" || basename === "feed") {
    return "application/rss+xml; charset=utf-8";
  }

  return contentTypes.get(path.extname(filePath)) || "application/octet-stream";
}

function fileExists(filePath) {
  return fs.existsSync(filePath) && fs.statSync(filePath).isFile();
}

function findAsset(requestPath) {
  const cleanedPath = decodeURIComponent(requestPath.split("?")[0]);
  const normalizedPath = path.normalize(cleanedPath).replace(/^([.]{2}[\/\\])+/, "");
  const directPath = path.join(rootDir, normalizedPath);

  const candidates = [
    directPath,
    `${directPath}.html`,
    path.join(directPath, "index.html"),
  ];

  for (const candidate of candidates) {
    if (fileExists(candidate)) {
      return { path: candidate, status: 200 };
    }
  }

  return { path: path.join(rootDir, "404.html"), status: 404 };
}

const server = http.createServer((req, res) => {
  const asset = findAsset(req.url || "/");

  if (!fileExists(asset.path)) {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Not found");
    return;
  }

  res.writeHead(asset.status, { "Content-Type": contentTypeFor(asset.path) });
  fs.createReadStream(asset.path).pipe(res);
});

server.listen(port, host, () => {
  console.log(`Serving ${rootDir} at http://${host}:${port}`);
});
