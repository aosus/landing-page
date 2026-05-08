import type { IconType } from "react-icons";
import {
  FaDiscord,
  FaFacebook,
  FaGithub,
  FaLinkedin,
  FaMastodon,
  FaRss,
  FaTelegram,
  FaXTwitter,
} from "react-icons/fa6";
import { SiBluesky, SiMatrix } from "react-icons/si";
import type { Lang } from "@/lib/locale";
import { getRssFeedPath, getRssFeedUrl } from "@/lib/rss";

export type CommunityPlatformId =
  | "twitter"
  | "bluesky"
  | "mastodon"
  | "facebook"
  | "linkedin"
  | "github"
  | "rss"
  | "matrix"
  | "telegram"
  | "discord";

export interface CommunityPlatform {
  id: CommunityPlatformId;
  label: string;
  href: string;
  icon: IconType;
  detail: string;
}

const BASE_SOCIAL_PLATFORMS: readonly CommunityPlatform[] = [
  {
    id: "twitter",
    label: "X / Twitter",
    href: "https://twitter.com/aosusdotorg",
    icon: FaXTwitter,
    detail: "@aosusdotorg",
  },
  {
    id: "bluesky",
    label: "Bluesky",
    href: "https://bsky.app/profile/aosus.org",
    icon: SiBluesky,
    detail: "@aosus.org",
  },
  {
    id: "mastodon",
    label: "Mastodon",
    href: "https://mastodon.online/@aosus",
    icon: FaMastodon,
    detail: "@aosus@mastodon.online",
  },
  {
    id: "facebook",
    label: "Facebook",
    href: "https://www.facebook.com/aosus1/",
    icon: FaFacebook,
    detail: "aosus1",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/aosus/",
    icon: FaLinkedin,
    detail: "Aosus",
  },
  {
    id: "github",
    label: "GitHub",
    href: "https://github.com/aosus",
    icon: FaGithub,
    detail: "aosus",
  },
];

export function getSocialPlatforms(lang: Lang): readonly CommunityPlatform[] {
  return [
    ...BASE_SOCIAL_PLATFORMS,
    {
      id: "rss",
      label: "RSS Feed",
      href: getRssFeedUrl(lang),
      icon: FaRss,
      detail: `aosus.org${getRssFeedPath(lang)}`,
    },
  ];
}

export const SOCIAL_PLATFORMS_AR: readonly CommunityPlatform[] = getSocialPlatforms("ar");

export const CHAT_PLATFORMS: readonly CommunityPlatform[] = [
  {
    id: "matrix",
    label: "Matrix",
    href: "https://matrix.to/#/#aosus:aosus.org",
    icon: SiMatrix,
    detail: "#aosus:aosus.org",
  },
  {
    id: "telegram",
    label: "Telegram",
    href: "https://t.me/aosus",
    icon: FaTelegram,
    detail: "@aosus",
  },
  {
    id: "discord",
    label: "Discord",
    href: "https://discord.gg/YJUzEhU955",
    icon: FaDiscord,
    detail: "discord.gg/YJUzEhU955",
  },
];
