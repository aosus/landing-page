import React from "react";
import { ExternalLink } from "lucide-react";

import type { CommunityPlatform } from "@/lib/community-platforms";

type CommunityLinksVariant = "icon-grid" | "cards";
type CommunityLinksSize = "sm" | "md";

interface CommunityLinksProps {
  platforms: readonly CommunityPlatform[];
  variant?: CommunityLinksVariant;
  size?: CommunityLinksSize;
  className?: string;
  itemClassName?: string;
}

const ICON_SIZE_CLASS: Record<CommunityLinksSize, string> = {
  sm: "h-3.5 w-3.5",
  md: "h-4 w-4",
};

const ICON_BUTTON_SIZE_CLASS: Record<CommunityLinksSize, string> = {
  sm: "h-8 w-8",
  md: "h-9 w-9",
};

export default function CommunityLinks({
  platforms,
  variant = "icon-grid",
  size = "md",
  className = "",
  itemClassName = "",
}: CommunityLinksProps) {
  if (variant === "cards") {
    return (
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ${className}`}>
        {platforms.map((platform) => {
          const Icon = platform.icon;

          return (
            <a
              key={platform.id}
              href={platform.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative border border-gray-200 bg-white p-4 shadow-sm transition-all duration-300 hover:border-gray-300 hover:shadow-md dark:border-[#008a2f]/20 dark:bg-[#008a2f]/5 dark:hover:border-[#008a2f]/40 dark:hover:bg-[#008a2f]/10 ${itemClassName}`}
            >
              <span className="pointer-events-none absolute left-0 top-0 h-3 w-3 border-l border-t border-[#008a2f]/50" />
              <span className="pointer-events-none absolute bottom-0 right-0 h-3 w-3 border-b border-r border-[#008a2f]/50" />
              <div className="flex items-center justify-between gap-4">
                <div className="flex min-w-0 items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-[#008a2f]/20 bg-[#008a2f]/5 text-[#008a2f] transition-colors group-hover:border-[#008a2f] group-hover:bg-[#008a2f]/10">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <div className="truncate font-mono text-sm font-bold transition-colors group-hover:text-[#008a2f]">
                      {platform.label}
                    </div>
                    <div className="truncate font-mono text-xs text-gray-400 dark:text-gray-600">
                      {platform.detail}
                    </div>
                  </div>
                </div>
                <ExternalLink className="h-4 w-4 shrink-0 text-gray-400 transition-colors group-hover:text-[#008a2f] dark:text-gray-700" />
              </div>
            </a>
          );
        })}
      </div>
    );
  }

  return (
    <div className={`flex flex-wrap items-center gap-1.5 ${className}`}>
      {platforms.map((platform) => {
        const Icon = platform.icon;

        return (
          <a
            key={platform.id}
            href={platform.href}
            target="_blank"
            rel="noopener noreferrer"
            title={platform.label}
            aria-label={platform.label}
            className={`group flex items-center justify-center border border-gray-200 text-gray-500 transition-all hover:border-[#008a2f] hover:bg-[#008a2f]/5 hover:text-[#008a2f] dark:border-[#008a2f]/20 dark:text-gray-400 dark:hover:text-[#008a2f] ${ICON_BUTTON_SIZE_CLASS[size]} ${itemClassName}`}
          >
            <Icon className={ICON_SIZE_CLASS[size]} />
            <span className="sr-only">{platform.label}</span>
          </a>
        );
      })}
    </div>
  );
}
