import React from "react";
import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";

import ArticlePageClient from "../src/app/(en)/blog/[slug]/ArticlePageClient";
import { CHAT_PLATFORMS, getSocialPlatforms } from "../src/lib/community-platforms";

vi.mock("next/link", () => ({
  default: ({ href, children, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

vi.mock("next/navigation", () => ({
  usePathname: () => "/en/blog/example-post",
}));

vi.mock("framer-motion", () => ({
  AnimatePresence: ({ children }: any) => <>{children}</>,
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

vi.mock("@/components/layout/Layout", async () => {
  const actual = await vi.importActual<typeof import("@/components/layout/Layout")>(
    "@/components/layout/Layout",
  );

  return {
    ...actual,
    default: ({ children }: any) => <>{children({ lang: "en", isDark: false })}</>,
  };
});

describe("ArticlePageClient social banners", () => {
  const post = {
    title: "Example post",
    author: "Aosus",
    date: "2026-04-14",
    image: "/image.png",
    content: "<p>Body</p>",
    tags: ["tag"],
    commentsEnabled: false,
  } as any;

  it("renders compressed one-row icon banners for chat and social links", () => {
    render(<ArticlePageClient post={post} prevPost={null} lang="en" />);
    const socialPlatforms = getSocialPlatforms("en");

    expect(screen.getByText("Chat Rooms")).toBeInTheDocument();
    expect(screen.getByText("Follow Us")).toBeInTheDocument();

    for (const platform of CHAT_PLATFORMS) {
      expect(screen.getByRole("link", { name: platform.label })).toHaveAttribute(
        "href",
        platform.href,
      );
    }

    for (const platform of socialPlatforms) {
      expect(screen.getByRole("link", { name: platform.label })).toHaveAttribute(
        "href",
        platform.href,
      );
    }

    const bannerHeaders = screen.getAllByText(/Chat Rooms|Follow Us/);
    expect(bannerHeaders).toHaveLength(2);

    expect(screen.queryByText(/Join our chat rooms/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Follow our social media accounts/i)).not.toBeInTheDocument();
  });

  it("renders a lazy discourse comments shell with a forum fallback action", () => {
    render(
      <ArticlePageClient
        post={{ ...post, commentsEnabled: true }}
        prevPost={null}
        lang="en"
      />,
    );

    expect(screen.getByRole("heading", { name: "Comments" })).toBeInTheDocument();
    expect(screen.getByText(/Comments load only when you get here/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Open Forum/i })).toHaveAttribute(
      "href",
      "https://discourse.aosus.org/",
    );
  });

  it("does not render discourse comments when the post has not opted in", () => {
    render(<ArticlePageClient post={post} prevPost={null} lang="en" />);

    expect(screen.queryByRole("heading", { name: "Comments" })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /Open Forum/i })).not.toBeInTheDocument();
  });
});
