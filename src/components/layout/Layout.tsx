"use client";

import React, { useState, useEffect, useRef, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sun,
  Moon,
  Menu,
  X,
  Github,
  MessageSquare,
  MessagesSquare,
  Heart,
  Twitter,
  Linkedin,
  Facebook,
  Rss,
  Share2,
  ChevronDown,
  Send,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getLocalizedPath, isEnglishPath, type Lang } from "@/lib/locale";

export type { Lang } from "@/lib/locale";

const THEME_STORAGE_KEY = "aosus-theme";

const NAV = {
  en: [
    { label: "Home", href: "/en" },
    { label: "Blog", href: "/en/blog" },
    { label: "Services", href: "/en/services" },
    { label: "Writing Contest", href: "/en/writing-contest" },
    { label: "Support Us", href: "/en/support-us" },
    { label: "Contact", href: "/en/contact-us" },
  ],
  ar: [
    { label: "الرئيسية", href: "/" },
    { label: "المدونة", href: "/blog" },
    { label: "خدمات", href: "/services" },
    { label: "جائزة الكتابة", href: "/writing-contest" },
    { label: "ادعمنا", href: "/support-us" },
    { label: "اتصل بنا", href: "/contact-us" },
  ],
};

type IconComponent = React.ComponentType<{ className?: string }>;

type FollowLink = {
  label: string;
  href: string;
  icon: IconComponent;
};

type FollowGroup = {
  label: string;
  icon: IconComponent;
  links: FollowLink[];
};

const SOCIAL_MEDIA_LINKS: FollowLink[] = [
  { label: "GitHub", href: "https://github.com/aosus", icon: Github },
  {
    label: "Twitter/X",
    href: "https://twitter.com/aosusdotorg",
    icon: Twitter,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/aosus/",
    icon: Linkedin,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/aosus1/",
    icon: Facebook,
  },
];

const CHAT_PLATFORM_LINKS: FollowLink[] = [
  {
    label: "Matrix",
    href: "https://matrix.to/#/#aosus:aosus.org",
    icon: MessageSquare,
  },
  {
    label: "Discord",
    href: "https://discord.gg/YJUzEhU955",
    icon: MessagesSquare,
  },
  { label: "Telegram", href: "https://t.me/aosus", icon: Send },
];

const RSS_LINK: FollowLink = {
  label: "RSS Feed",
  href: "https://aosus.org/feed",
  icon: Rss,
};

const COMMUNITY_LINKS: FollowLink[] = [
  ...SOCIAL_MEDIA_LINKS,
  ...CHAT_PLATFORM_LINKS,
  RSS_LINK,
];

const FOLLOW_GROUPS = (lang: Lang): FollowGroup[] => [
  {
    label: lang === "ar" ? "وسائل التواصل" : "Social media",
    icon: Share2,
    links: SOCIAL_MEDIA_LINKS,
  },
  {
    label: lang === "ar" ? "منصات الدردشة" : "Chat platforms",
    icon: MessagesSquare,
    links: CHAT_PLATFORM_LINKS,
  },
];

export function FollowLinksPanel({
  lang,
  groups = FOLLOW_GROUPS(lang),
  className = "",
  buttonClassName = "",
  onLinkClick,
}: {
  lang: Lang;
  groups?: FollowGroup[];
  className?: string;
  buttonClassName?: string;
  onLinkClick?: () => void;
}) {
  return (
    <div className={`space-y-4 ${className}`.trim()}>
      {groups.map((group) => {
        const GroupIcon = group.icon;
        return (
          <section key={group.label} className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#008a2f]">
              <GroupIcon className="h-4 w-4" />
              <span>{group.label}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {group.links.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={onLinkClick}
                    className={`inline-flex items-center gap-2 rounded-full border border-[#008a2f]/20 px-3 py-2 text-xs font-medium text-gray-500 transition-all hover:border-[#008a2f] hover:text-[#008a2f] dark:text-gray-400 dark:hover:text-[#008a2f] ${buttonClassName}`.trim()}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{link.label}</span>
                  </a>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}

function FollowDropdown({
  lang,
  open,
  onToggle,
  onLinkClick,
  align = "end",
  label,
}: {
  label: string;
  lang: Lang;
  open: boolean;
  onToggle: () => void;
  onLinkClick?: () => void;
  align?: "start" | "end";
}) {
  const alignClass = align === "start" ? "left-0" : "right-0";
  const buttonLabel = label;

  return (
    <div className="relative">
      <button
        type="button"
        onClick={onToggle}
        className="inline-flex h-9 items-center gap-1.5 rounded-full border border-[#008a2f]/20 bg-white/70 px-3 text-xs font-mono text-gray-500 transition-all hover:border-[#008a2f] hover:text-[#008a2f] dark:bg-black/20 dark:text-gray-400"
        aria-label={buttonLabel}
        aria-expanded={open}
        title={buttonLabel}
      >
        <Share2 className="h-4 w-4" />
        <MessagesSquare className="h-4 w-4" />
        <span className="hidden xl:inline">{label}</span>
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            className={`absolute ${alignClass} top-full z-50 mt-3 w-80 rounded-2xl border border-[#008a2f]/20 bg-white/95 p-4 shadow-[0_18px_48px_rgba(0,0,0,0.18)] backdrop-blur-md dark:bg-black/95`}
          >
            <div className="mb-4 flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#008a2f]">
              <Share2 className="h-4 w-4" />
              <MessagesSquare className="h-4 w-4" />
              <span>{label}</span>
            </div>
            <FollowLinksPanel
              lang={lang}
              onLinkClick={onLinkClick}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = "أبجدهوزحطيكلمنسعفصقرشتثخذضظغABCDEF0123456789$+-*/=".split(
      "",
    );
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops: number[] = [];
    for (let x = 0; x < columns; x++) drops[x] = 1;

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#008a2f";
      ctx.font = `${fontSize}px monospace`;
      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975)
          drops[i] = 0;
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33);
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);
    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none opacity-[0.08] z-0 mix-blend-screen"
    />
  );
}

interface LayoutProps {
  children: (ctx: { lang: Lang; isDark: boolean }) => ReactNode;
  lang?: Lang;
}

export default function Layout({ children, lang: langProp }: LayoutProps) {
  const pathname = usePathname();
  const defaultLang = isEnglishPath(pathname) ? "en" : "ar";
  const lang = langProp ?? defaultLang;
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [communityMenuOpen, setCommunityMenuOpen] = useState(false);
  const actionsRef = useRef<HTMLDivElement>(null);
  const isRtl = lang === "ar";

  useEffect(() => {
    document.documentElement.dir = isRtl ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }, [isRtl, lang]);

  useEffect(() => {
    setMounted(true);

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const applyTheme = (nextIsDark: boolean) => {
      document.documentElement.classList.toggle("dark", nextIsDark);
      document.documentElement.style.colorScheme = nextIsDark
        ? "dark"
        : "light";
      setIsDark(nextIsDark);
    };

    const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
    applyTheme(
      storedTheme === "light" || storedTheme === "dark"
        ? storedTheme === "dark"
        : mediaQuery.matches,
    );

    const handleSystemThemeChange = (event: MediaQueryListEvent) => {
      const activeTheme = window.localStorage.getItem(THEME_STORAGE_KEY);

      if (activeTheme === "light" || activeTheme === "dark") {
        return;
      }

      applyTheme(event.matches);
    };

    mediaQuery.addEventListener("change", handleSystemThemeChange);

    return () => {
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
    };
  }, []);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (!actionsRef.current?.contains(event.target as Node)) {
        setCommunityMenuOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setCommunityMenuOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const navItems = NAV[lang];
  const homeHref = getLocalizedPath(lang, "/");
  const supportHref = getLocalizedPath(lang, "/support-us");
  const langToggleHref = getLocalizedPath(
    lang === "ar" ? "en" : "ar",
    pathname,
  );

  const toggleTheme = () => {
    const nextIsDark = !isDark;
    window.localStorage.setItem(
      THEME_STORAGE_KEY,
      nextIsDark ? "dark" : "light",
    );
    document.documentElement.classList.toggle("dark", nextIsDark);
    document.documentElement.style.colorScheme = nextIsDark ? "dark" : "light";
    setIsDark(nextIsDark);
  };

  return (
    <div
      className="min-h-screen overflow-x-hidden bg-white text-gray-900 transition-colors duration-300 selection:bg-[#008a2f] selection:text-black dark:bg-black dark:text-white"
      dir={isRtl ? "rtl" : "ltr"}
      style={{
        fontFamily: isRtl
          ? "'Almarai', sans-serif"
          : "'Inter', system-ui, sans-serif",
      }}
    >
      <MatrixRain />

      <div className="fixed top-0 left-1/4 w-96 h-96 bg-[#008a2f]/10 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-[#1d70ba]/10 rounded-full blur-[120px] pointer-events-none z-0" />

      <header className="fixed inset-x-0 top-0 z-50 border-b border-[#008a2f]/20 bg-white/60 backdrop-blur-md dark:bg-black/60">
        <nav className="max-w-7xl mx-auto px-3 sm:px-6 h-16 grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-3">
          <Link href={homeHref} className="justify-self-start flex items-center gap-3 group">
            <img
              src="/images/aosus-logo.png"
              alt="Aosus Logo"
              className="h-8 w-auto brightness-0 transition-[filter] dark:invert"
            />
          </Link>

          <div className="hidden lg:flex items-center gap-1 justify-self-center">
            {navItems.map((item) => {
              const isActive =
                pathname === item.href ||
                pathname === `${item.href}/` ||
                (item.href !== homeHref &&
                  pathname.startsWith(`${item.href}/`));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 text-sm font-medium transition-all font-mono ${
                    isActive
                      ? "text-[#008a2f] border-b-2 border-[#008a2f]"
                      : "text-gray-600 hover:text-[#008a2f] dark:text-gray-400"
                  }`}
                  style={
                    isRtl ? { fontFamily: "'Almarai', sans-serif" } : undefined
                  }
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div ref={actionsRef} className="justify-self-end flex items-center gap-2">
            <div className="hidden xl:flex items-center gap-2 mr-1">
              <FollowDropdown
                label={lang === "ar" ? "المجتمع" : "Community"}
                lang={lang}
                open={communityMenuOpen}
                onToggle={() => setCommunityMenuOpen((current) => !current)}
                onLinkClick={() => setCommunityMenuOpen(false)}
                align={isRtl ? "start" : "end"}
              />
            </div>
            <Link
              href={langToggleHref}
              className="px-3 py-1 text-xs border border-[#1d70ba]/30 text-[#1d70ba] hover:bg-[#1d70ba]/10 transition-all font-mono"
            >
              {lang === "ar" ? "EN" : "AR"}
            </Link>
            <button
              onClick={toggleTheme}
              className="p-2 border border-[#008a2f]/30 text-[#008a2f] hover:bg-[#008a2f]/10 transition-all"
              aria-label={
                isDark ? "Switch to light mode" : "Switch to dark mode"
              }
            >
              {mounted && isDark ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 text-gray-600 border border-[#008a2f]/30 dark:text-gray-300 lg:hidden"
            >
              {menuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden border-t border-[#008a2f]/20 bg-white/95 backdrop-blur-md dark:bg-black/95 lg:hidden"
            >
              <div className="px-4 py-3 space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="block px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:text-[#008a2f] dark:text-gray-400"
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="pt-4 border-t border-[#008a2f]/10">
                  <FollowLinksPanel
                    lang={lang}
                    onLinkClick={() => setMenuOpen(false)}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="pt-16 relative z-10">{children({ lang, isDark })}</main>

      <footer className="relative z-10 border-t border-[#008a2f]/20 bg-gray-50 dark:bg-black/80">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="md:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <img
                  src="/images/aosus-logo.png"
                  alt="Aosus"
                  className="h-7 w-auto brightness-0 transition-[filter] dark:invert"
                />
              </div>
              <p className="text-sm leading-relaxed text-gray-500">
                {lang === "ar"
                  ? "أكبر مجتمع عربي للبرمجيات الحرة والمفتوحة المصدر."
                  : "The largest Arabic community for free and open-source software."}
              </p>
            </div>

            <div>
              <h4 className="font-mono text-xs uppercase tracking-widest mb-4 text-[#008a2f]">
                <span className="opacity-50">/</span>{" "}
                {lang === "ar" ? "روابط" : "Links"}
              </h4>
              <ul className="space-y-2">
                {navItems.slice(0, 4).map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-gray-500 transition-colors hover:text-[#008a2f] dark:text-gray-400"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-mono text-xs uppercase tracking-widest mb-4 text-[#008a2f]">
                <span className="opacity-50">/</span>{" "}
                {lang === "ar" ? "المجتمع" : "Community"}
              </h4>
              <ul className="space-y-2">
                {COMMUNITY_LINKS.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-gray-500 transition-colors hover:text-[#008a2f] dark:text-gray-400"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-mono text-xs uppercase tracking-widest mb-4 text-[#008a2f]">
                <span className="opacity-50">/</span>{" "}
                {lang === "ar" ? "ادعمنا" : "Support"}
              </h4>
              <p className="text-sm mb-4 text-gray-500">
                {lang === "ar"
                  ? "ادعم المجتمع عبر التبرع أو المساهمة في المشاريع."
                  : "Support the community through donations or contributing to projects."}
              </p>
              <Link
                href={supportHref}
                className="group inline-flex items-center gap-2 px-4 py-2 border border-[#008a2f] text-[#008a2f] text-sm font-mono uppercase tracking-wider hover:bg-[#008a2f] hover:text-black transition-all"
              >
                <Heart className="w-4 h-4" />
                {lang === "ar" ? "تبرع" : "Donate"}
              </Link>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-[#008a2f]/10 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs font-mono text-gray-400 dark:text-gray-600">
              © {new Date().getFullYear()} Aosus Community.{" "}
              {lang === "ar" ? "جميع الحقوق محفوظة." : "All rights reserved."}
            </p>
            <p className="text-xs font-mono text-gray-400 dark:text-gray-700">
              {lang === "ar"
                ? "مستضاف مالياً من The Hack Foundation (501(c)(3))"
                : "Fiscally sponsored by The Hack Foundation (501(c)(3))"}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export function CyberCard({
  children,
  className = "",
  isDark = true,
  hover = true,
}: {
  children: ReactNode;
  className?: string;
  isDark?: boolean;
  hover?: boolean;
}) {
  return (
    <div
      className={`relative border ${"bg-white border-gray-200 shadow-sm dark:bg-[#008a2f]/5 dark:border-[#008a2f]/20"} ${hover ? "hover:border-gray-300 hover:shadow-md dark:hover:border-[#008a2f]/40 dark:hover:bg-[#008a2f]/10" : ""} transition-all duration-300 ${className}`}
    >
      <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#008a2f]/50 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#008a2f]/50 pointer-events-none" />
      {children}
    </div>
  );
}

export function SectionHeading({
  title,
  subtitle,
  isDark = true,
  center = true,
  lang = "en",
}: {
  title: string;
  subtitle?: string;
  isDark?: boolean;
  center?: boolean;
  lang?: Lang;
}) {
  const isRtl = lang === "ar";
  return (
    <div className={`mb-12 ${center ? "text-center" : ""}`}>
      <h2
        className="text-3xl md:text-4xl font-bold uppercase tracking-widest mb-4"
        style={{
          fontFamily: isRtl ? "'Almarai', sans-serif" : "var(--font-mono)",
        }}
      >
        <span className="text-[#008a2f]">/</span> {title}
      </h2>
      {subtitle && (
        <p
          className={`text-base max-w-2xl text-gray-500 dark:text-gray-400 ${center ? "mx-auto" : ""}`}
          style={{
            fontFamily: isRtl ? "'Almarai', sans-serif" : undefined,
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

export function PrimaryButton({
  children,
  href,
  className = "",
  ...props
}: {
  children: ReactNode;
  href?: string;
  className?: string;
  [key: string]: any;
}) {
  const cls = `group relative inline-flex items-center justify-center gap-2 px-6 py-3 border border-[#008a2f] text-[#008a2f] font-bold uppercase tracking-wider overflow-hidden hover:shadow-[0_0_20px_rgba(0,138,47,0.4)] transition-all font-mono ${className}`;
  const inner = (
    <>
      <span className="absolute inset-0 bg-[#008a2f] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
      <span className="relative z-10 group-hover:text-black flex items-center gap-2 transition-colors">
        {children}
      </span>
    </>
  );
  if (href && (href.startsWith("http") || href.startsWith("mailto"))) {
    return (
      <a href={href} className={cls} {...props}>
        {inner}
      </a>
    );
  }
  if (href)
    return (
      <Link href={href} className={cls} {...props}>
        {inner}
      </Link>
    );
  return (
    <button className={cls} {...props}>
      {inner}
    </button>
  );
}

export function SecondaryButton({
  children,
  href,
  isDark = true,
  className = "",
  ...props
}: {
  children: ReactNode;
  href?: string;
  isDark?: boolean;
  className?: string;
  [key: string]: any;
}) {
  const cls = `inline-flex items-center gap-2 px-6 py-3 font-mono uppercase tracking-wider border border-gray-300 text-gray-700 transition-all duration-300 hover:border-[#1d70ba] hover:text-[#1d70ba] dark:border-white/20 dark:text-gray-300 ${className}`;
  if (href && (href.startsWith("http") || href.startsWith("mailto"))) {
    return (
      <a href={href} className={cls} {...props}>
        {children}
      </a>
    );
  }
  if (href)
    return (
      <Link href={href} className={cls} {...props}>
        {children}
      </Link>
    );
  return (
    <button className={cls} {...props}>
      {children}
    </button>
  );
}
