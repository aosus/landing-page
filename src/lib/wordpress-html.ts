import { JSDOM } from "jsdom";
import TurndownService from "turndown";

const turndown = new TurndownService({
  headingStyle: "atx",
  bulletListMarker: "-",
  codeBlockStyle: "fenced",
  emDelimiter: "*",
  strongDelimiter: "**",
});

const socialHosts = new Set([
  "twitter.com",
  "x.com",
  "facebook.com",
  "linkedin.com",
  "github.com",
  "instagram.com",
  "tiktok.com",
  "youtube.com",
  "youtu.be",
  "matrix.to",
  "discord.gg",
  "discord.com",
  "t.me",
  "telegram.me",
  "opencollective.com",
]);

function isSocialOrSupportUrl(href: string, text = ""): boolean {
  try {
    const url = new URL(href, "https://aosus.org");
    const host = url.hostname.toLowerCase();
    const path = url.pathname.toLowerCase();
    const label = text.trim().toLowerCase();

    if (socialHosts.has(host)) {
      return true;
    }

    if (host === "aosus.org" && (path.startsWith("/support") || path.startsWith("/donate") || path.startsWith("/feed"))) {
      return true;
    }

    return /^(support|donate|join|follow|subscribe|أدعم|ادعم|تبرع|دعم|انضم|أنضم|تابع)/u.test(label) &&
      (host === "aosus.org" || host === "opencollective.com");
  } catch {
    return false;
  }
}

function removeSocialLinkLists(markdown: string): string {
  const lines = markdown.split("\n");
  const output: string[] = [];

  for (let index = 0; index < lines.length; ) {
    if (lines[index].trim() === "") {
      output.push(lines[index]);
      index += 1;
      continue;
    }

    const block: string[] = [];
    while (index < lines.length && lines[index].trim() !== "") {
      block.push(lines[index]);
      index += 1;
    }

    const listItems = block
      .map((line) => line.match(/^\s*[-*+]\s+\[([^\]]+)\]\(([^)]+)\)\s*$/))
      .filter((match): match is RegExpMatchArray => Boolean(match));

    if (listItems.length === block.length && block.length > 0 && listItems.every((match) => isSocialOrSupportUrl(match[2], match[1]))) {
      while (output.length > 0 && output[output.length - 1].trim() === "") {
        output.pop();
      }
      continue;
    }

    output.push(...block);

    if (index < lines.length) {
      output.push(lines[index]);
      index += 1;
    }
  }

  return output.join("\n").replace(/\n{3,}/g, "\n\n").trim();
}

function replaceLegacyLinkPreviewCards(html: string): string {
  const dom = new JSDOM(`<body>${html}</body>`);
  const { document } = dom.window;

  document
    .querySelectorAll(".vlp-link-container, .wp-block-visual-link-preview-link")
    .forEach((node) => {
      const href = node.querySelector("a[href]")?.getAttribute("href")?.trim();

      if (!href) {
        return;
      }

      const paragraph = document.createElement("p");
      paragraph.textContent = href;
      node.replaceWith(paragraph);
    });

  document.querySelectorAll(".wp-block-social-links").forEach((node) => {
    node.remove();
  });

  document.querySelectorAll(".wp-block-buttons").forEach((container) => {
    container.querySelectorAll(".wp-block-button").forEach((button) => {
      const link = button.querySelector("a[href]");
      const href = link?.getAttribute("href")?.trim() ?? "";
      const text = link?.textContent ?? "";

      if (href && isSocialOrSupportUrl(href, text)) {
        button.remove();
      }
    });

    if (!container.querySelector(".wp-block-button")) {
      container.remove();
    }
  });

  return document.body.innerHTML;
}

export function convertWordPressHtmlToMarkdown(html: string): string {
  return removeSocialLinkLists(turndown.turndown(replaceLegacyLinkPreviewCards(html)).trim());
}
