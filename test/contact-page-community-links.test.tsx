import React from "react";
import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";

import ContactPage from "../src/app/(en)/contact-us/ContactPageClient";
import { CHAT_PLATFORMS, getSocialPlatforms } from "../src/lib/community-platforms";

vi.mock("next/link", () => ({
  default: ({ href, children, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

vi.mock("next/navigation", () => ({
  usePathname: () => "/en/contact-us",
}));

vi.mock("framer-motion", () => ({
  AnimatePresence: ({ children }: any) => <>{children}</>,
  motion: {
    a: ({ children, ...props }: any) => <a {...props}>{children}</a>,
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

describe("ContactPage community links", () => {
  it("renders separate chat and social sections with all shared platforms", () => {
    render(<ContactPage lang="en" />);
    const socialPlatforms = getSocialPlatforms("en");

    expect(screen.getByText("Chat_Platforms")).toBeInTheDocument();
    expect(screen.getByText("Follow_Us")).toBeInTheDocument();

    for (const platform of CHAT_PLATFORMS) {
      expect(screen.getByRole("link", { name: platform.label })).toHaveAttribute(
        "href",
        platform.href,
      );
      expect(screen.getByText(platform.detail)).toBeInTheDocument();
    }

    for (const platform of socialPlatforms) {
      expect(screen.getByRole("link", { name: platform.label })).toHaveAttribute(
        "href",
        platform.href,
      );
      expect(screen.getByText(platform.detail)).toBeInTheDocument();
    }
  });
});
