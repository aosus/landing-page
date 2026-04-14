import React from "react";
import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";

import Layout, {
  CHAT_PLATFORMS,
  SOCIAL_PLATFORMS,
} from "../src/components/layout/Layout";

vi.mock("next/link", () => ({
  default: ({ href, children, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

vi.mock("next/navigation", () => ({
  usePathname: () => "/en",
}));

vi.mock("framer-motion", () => ({
  AnimatePresence: ({ children }: any) => <>{children}</>,
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

describe("Layout community navigation", () => {
  it("renders chat and social platform groups in the footer", () => {
    render(<Layout lang="en">{() => <div>content</div>}</Layout>);

    expect(screen.getByText("Chat Rooms")).toBeInTheDocument();
    expect(screen.getByText("Follow Us")).toBeInTheDocument();

    for (const platform of CHAT_PLATFORMS) {
      expect(screen.getByText(platform.label)).toBeInTheDocument();
    }

    for (const platform of SOCIAL_PLATFORMS) {
      expect(screen.getByText(platform.label)).toBeInTheDocument();
    }
  });

  it("keeps the chat dropdown in the nav and opens it on click", async () => {
    render(<Layout lang="en">{() => <div>content</div>}</Layout>);

    fireEvent.click(screen.getAllByRole("button", { name: /chat/i })[0]);

    expect(screen.getByRole("menuitem", { name: "Matrix" })).toBeInTheDocument();
    expect(screen.getByRole("menuitem", { name: "Discord" })).toBeInTheDocument();
    expect(screen.getByRole("menuitem", { name: "Telegram" })).toBeInTheDocument();
  });
});
