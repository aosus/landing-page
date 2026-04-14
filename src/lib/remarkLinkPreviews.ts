import { visit } from "unist-util-visit";
import fs from "fs";
import path from "path";

const manifestPath = path.join(process.cwd(), "public", "link-previews", "manifest.json");

let manifest: Record<string, any> = {};
try {
  if (fs.existsSync(manifestPath)) {
    manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
  }
} catch (e) {
  console.warn("Failed to load link previews manifest");
}

function escapeHtml(unsafe: string) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export default function remarkLinkPreviews() {
  return (tree: any) => {
    const makePreviewHtml = (url: string, preview: Record<string, any>) => {
      let hostname = url;
      try {
        hostname = new URL(url).hostname;
      } catch {
        // Ignore malformed URLs and fall back to the raw value.
      }

      const title = preview.title ? escapeHtml(preview.title) : escapeHtml(url);
      const desc = preview.description ? escapeHtml(preview.description) : "";
      const site = preview.siteName ? escapeHtml(preview.siteName) : escapeHtml(hostname);
      const icon = preview.localFavicon ? escapeHtml(preview.localFavicon) : "";

      return `
        <span class="preview-tooltip absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 md:w-80 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-xl opacity-0 invisible max-md:hidden md:group-hover:opacity-100 md:group-hover:visible transition-all duration-200 z-[100] p-4 pointer-events-none text-start flex flex-col gap-2">
          <span class="flex items-center gap-2">
            ${icon ? `<img src="${icon}" alt="" class="w-4 h-4 rounded-sm flex-shrink-0 bg-white" />` : ""}
            <span class="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider truncate">${site}</span>
          </span>
          <span class="text-sm font-bold text-zinc-900 dark:text-zinc-100 line-clamp-2 leading-snug break-words">${title}</span>
          ${desc ? `<span class="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2 leading-relaxed break-words">${desc}</span>` : ""}
        </span>
      `;
    };

    visit(tree, "paragraph", (node: any) => {
      if (node.children.length !== 1) {
        return;
      }

      const child = node.children[0];
      const url = child.type === "link" ? child.url : child.type === "text" ? child.value.trim() : null;

      if (!url || !/^https?:\/\/\S+$/.test(url)) {
        return;
      }

      const preview = manifest[url];

      if (!preview || preview.error) {
        return;
      }

      node.type = "html";
      node.value = `
        <span class="group relative inline-block align-baseline">
          <a href="${escapeHtml(url)}" class="underline decoration-2 decoration-zinc-300 dark:decoration-zinc-700 hover:decoration-green-500 transition-colors">${escapeHtml(url)}</a>
          ${makePreviewHtml(url, preview)}
        </span>
      `;
      delete node.children;
    });
  };
}
