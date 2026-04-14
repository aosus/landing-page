import { describe, it, expect, vi, beforeAll, afterAll } from "vitest";
import { remark } from "remark";
import html from "remark-html";
import fs from "fs";
import path from "path";

const manifestPath = path.join(process.cwd(), "public", "link-previews", "manifest.json");

describe("remarkLinkPreviews", () => {
  beforeAll(() => {
    fs.writeFileSync(manifestPath, JSON.stringify({
      "https://example.com/test": {
        title: "Example Title",
        description: "Example Description",
        siteName: "Example Site",
        localFavicon: "/link-previews/favicons/test.ico"
      }
    }));
  });

  afterAll(() => {
    fs.unlinkSync(manifestPath);
  });

  it("should transform standalone links into hover cards", async () => {
    const plugin = (await import("./remarkLinkPreviews")).default;
    
    const processor = remark()
      .use(plugin)
      .use(html, { sanitize: false });

    // Processing a known standalone link
    const result = await processor.process("[https://example.com/test](https://example.com/test)");
    const output = result.toString();
    
    expect(output).toContain("class=\"group relative inline-block align-baseline\"");
    expect(output).toContain("class=\"underline decoration-2 decoration-zinc-300 dark:decoration-zinc-700 hover:decoration-green-500 transition-colors\"");
    expect(output).toContain("Example Title");
    expect(output).toContain("Example Description");
    expect(output).toContain("Example Site");
    expect(output).toContain("/link-previews/favicons/test.ico");
    expect(output).toContain("preview-tooltip");
  });

  it("should transform raw standalone urls into hover cards", async () => {
    const plugin = (await import("./remarkLinkPreviews")).default;

    const processor = remark()
      .use(plugin)
      .use(html, { sanitize: false });

    const result = await processor.process("https://example.com/test");
    const output = result.toString();

    expect(output).toContain('href="https://example.com/test"');
    expect(output).toContain("preview-tooltip");
    expect(output).toContain("Example Title");
    expect(output).toContain("group relative inline-block align-baseline");
  });

  it("should NOT transform inline links inside text", async () => {
    const plugin = (await import("./remarkLinkPreviews")).default;
    const processor = remark()
      .use(plugin)
      .use(html, { sanitize: false });

    const result = await processor.process("This is an [inline link](https://example.com/test).");
    const output = result.toString();
    
    expect(output).not.toContain("preview-tooltip");
    expect(output).not.toContain("class=\"group relative inline-block");
  });
});
