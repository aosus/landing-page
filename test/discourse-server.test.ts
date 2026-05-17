import http from "node:http";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { resolveDiscourseDiscussionUrl } from "../src/lib/discourse.server";

describe("discourse server resolver", () => {
  let server: http.Server;
  let baseUrl: string;

  beforeEach(async () => {
    server = http.createServer((request, response) => {
      const url = new URL(request.url ?? "/", "http://127.0.0.1");

      if (url.pathname !== "/embed/comments") {
        response.writeHead(404);
        response.end("missing");
        return;
      }

      const embedUrl = url.searchParams.get("embed_url");

      if (embedUrl === "https://aosus.org/blog/aosus-v3") {
        response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        response.end(
          '<footer><a class="button" href="/t/topic/5323/2">Continue the discussion</a></footer>',
        );
        return;
      }

      response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      response.end("<div>No discussion</div>");
    });

    await new Promise<void>((resolve) => {
      server.listen(0, "127.0.0.1", () => {
        const address = server.address();

        if (!address || typeof address === "string") {
          throw new Error("Unable to determine test server address");
        }

        baseUrl = `http://127.0.0.1:${address.port}/`;
        resolve();
      });
    });
  });

  afterEach(async () => {
    await new Promise<void>((resolve, reject) => {
      server.close((error) => {
        if (error) {
          reject(error);
          return;
        }

        resolve();
      });
    });
  });

  it("resolves the exact discussion URL from the embed endpoint", async () => {
    await expect(
      resolveDiscourseDiscussionUrl("https://aosus.org/blog/aosus-v3", baseUrl),
    ).resolves.toBe("https://discourse.aosus.org/t/topic/5323/2");
  });

  it("returns null when the embed page has no discussion link", async () => {
    await expect(
      resolveDiscourseDiscussionUrl("https://aosus.org/blog/missing", baseUrl),
    ).resolves.toBeNull();
  });
});
