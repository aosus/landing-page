import http from "node:http";
import https from "node:https";
import { DISCOURSE_URL, extractDiscourseDiscussionUrl } from "@/lib/discourse";

function fetchText(url: URL): Promise<{ ok: boolean; body: string }> {
  const client = url.protocol === "http:" ? http : https;

  return new Promise((resolve, reject) => {
    const request = client.request(
      url,
      {
        headers: {
          Accept: "text/html,application/xhtml+xml",
        },
        method: "GET",
      },
      (response) => {
        const chunks: Buffer[] = [];

        response.on("data", (chunk) => {
          chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
        });

        response.on("end", () => {
          resolve({
            ok: (response.statusCode ?? 500) >= 200 && (response.statusCode ?? 500) < 300,
            body: Buffer.concat(chunks).toString("utf8"),
          });
        });
      },
    );

    request.on("error", reject);
    request.end();
  });
}

export async function resolveDiscourseDiscussionUrl(
  articleUrl: string,
  discourseUrl = DISCOURSE_URL,
): Promise<string | null> {
  try {
    const embedUrl = new URL("embed/comments", discourseUrl);
    embedUrl.searchParams.set("embed_url", articleUrl);

    const response = await fetchText(embedUrl);

    if (!response.ok) {
      return null;
    }

    return extractDiscourseDiscussionUrl(response.body);
  } catch {
    return null;
  }
}
