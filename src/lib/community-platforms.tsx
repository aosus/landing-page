import type { IconType } from "react-icons";
import {
  FaDiscord,
  FaFacebook,
  FaGithub,
  FaLinkedin,
  FaMastodon,
  FaTelegram,
  FaXTwitter,
} from "react-icons/fa6";
import { SiBluesky, SiMatrix } from "react-icons/si";

export type CommunityPlatformId =
  | "twitter"
  | "bluesky"
  | "mastodon"
  | "facebook"
  | "linkedin"
  | "github"
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

export const SOCIAL_PLATFORMS: readonly CommunityPlatform[] = [
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
