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
  Heart,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export type Lang = "ar" | "en";

const NAV = {
  en: [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
    { label: "Services", href: "/services" },
    { label: "Writing Contest", href: "/writing-contest" },
    { label: "Support Us", href: "/support-us" },
    { label: "Contact", href: "/contact-us" },
  ],
  ar: [
    { label: "الرئيسية", href: "/ar" },
    { label: "المدونة", href: "/ar/blog" },
    { label: "خدمات", href: "/ar/services" },
    { label: "جائزة الكتابة", href: "/ar/writing-contest" },
    { label: "ادعمنا", href: "/ar/support-us" },
    { label: "اتصل بنا", href: "/ar/contact-us" },
  ],
};

const SOCIALS = [
  { label: "GitHub", href: "https://github.com/aosus", icon: Github },
  {
    label: "Matrix",
    href: "https://matrix.to/#/#aosus:aosus.org",
    icon: MessageSquare,
  },
  {
    label: "Discord",
    href: "https://discord.gg/YJUzEhU955",
    icon: MessageSquare,
  },
  { label: "Telegram", href: "https://t.me/aosus", icon: MessageSquare },
];

function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars =
      "أبجدهوزحطيكلمنسعفصقرشتثخذضظغABCDEF0123456789$+-*/=".split("");
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
  const defaultLang = pathname.startsWith("/ar") ? "ar" : "en";
  const lang = langProp ?? defaultLang;
  const [isDark, setIsDark] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const isRtl = lang === "ar";

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    document.documentElement.dir = isRtl ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }, [isDark, isRtl, lang]);

  const navItems = NAV[lang];

  const langToggleHref = (() => {
    if (lang === "ar") {
      const newPath = pathname.replace(/^\/ar/, "") || "/";
      return newPath;
    } else {
      return `/ar${pathname === "/" ? "" : pathname}`;
    }
  })();

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${isDark ? "bg-black text-white" : "bg-white text-gray-900"} selection:bg-[#008a2f] selection:text-black overflow-x-hidden`}
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

      <header
        className={`fixed top-0 inset-x-0 z-50 border-b border-[#008a2f]/20 ${isDark ? "bg-black/60" : "bg-white/60"} backdrop-blur-md`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link
            href={lang === "ar" ? "/ar" : "/"}
            className="flex items-center gap-3 group"
          >
            <img
              src="/images/aosus-logo.png"
              alt="Aosus Logo"
              className={`h-8 w-auto filter brightness-0 ${isDark ? "invert" : ""}`}
            />
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive =
                pathname === item.href ||
                (pathname === "/" && item.href === "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 text-sm font-medium transition-all font-mono ${
                    isActive
                      ? "text-[#008a2f] border-b-2 border-[#008a2f]"
                      : isDark
                        ? "text-gray-400 hover:text-[#008a2f]"
                        : "text-gray-600 hover:text-[#008a2f]"
                  }`}
                  style={
                    isRtl
                      ? { fontFamily: "'Almarai', sans-serif" }
                      : undefined
                  }
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <Link
              href={langToggleHref}
              className="px-3 py-1 text-xs border border-[#1d70ba]/30 text-[#1d70ba] hover:bg-[#1d70ba]/10 transition-all font-mono"
            >
              {lang === "ar" ? "EN" : "AR"}
            </Link>
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2 border border-[#008a2f]/30 text-[#008a2f] hover:bg-[#008a2f]/10 transition-all"
            >
              {isDark ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`p-2 lg:hidden border border-[#008a2f]/30 ${isDark ? "text-gray-300" : "text-gray-600"}`}
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
              className={`lg:hidden overflow-hidden border-t border-[#008a2f]/20 ${isDark ? "bg-black/95" : "bg-white/95"} backdrop-blur-md`}
            >
              <div className="px-4 py-3 space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className={`block px-3 py-2 text-sm font-medium ${isDark ? "text-gray-400 hover:text-[#008a2f]" : "text-gray-600 hover:text-[#008a2f]"} transition-colors`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="pt-16 relative z-10">{children({ lang, isDark })}</main>

      <footer
        className={`relative z-10 border-t border-[#008a2f]/20 ${isDark ? "bg-black/80" : "bg-gray-50"}`}
      >
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="md:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <img
                  src="/images/aosus-logo.png"
                  alt="Aosus"
                  className={`h-7 w-auto filter brightness-0 ${isDark ? "invert" : ""}`}
                />
              </div>
              <p
                className={`text-sm leading-relaxed ${isDark ? "text-gray-500" : "text-gray-500"}`}
              >
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
                      className={`text-sm ${isDark ? "text-gray-400 hover:text-[#008a2f]" : "text-gray-500 hover:text-[#008a2f]"} transition-colors`}
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
                {SOCIALS.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-sm ${isDark ? "text-gray-400 hover:text-[#008a2f]" : "text-gray-500 hover:text-[#008a2f]"} transition-colors`}
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
              <p
                className={`text-sm mb-4 ${isDark ? "text-gray-500" : "text-gray-500"}`}
              >
                {lang === "ar"
                  ? "ادعم المجتمع عبر التبرع أو المساهمة في المشاريع."
                  : "Support the community through donations or contributing to projects."}
              </p>
              <Link
                href={lang === "ar" ? "/ar/support-us" : "/support-us"}
                className="group inline-flex items-center gap-2 px-4 py-2 border border-[#008a2f] text-[#008a2f] text-sm font-mono uppercase tracking-wider hover:bg-[#008a2f] hover:text-black transition-all"
              >
                <Heart className="w-4 h-4" />
                {lang === "ar" ? "تبرع" : "Donate"}
              </Link>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-[#008a2f]/10 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p
              className={`text-xs font-mono ${isDark ? "text-gray-600" : "text-gray-400"}`}
            >
              © {new Date().getFullYear()} Aosus Community.{" "}
              {lang === "ar"
                ? "جميع الحقوق محفوظة."
                : "All rights reserved."}
            </p>
            <p
              className={`text-xs font-mono ${isDark ? "text-gray-700" : "text-gray-400"}`}
            >
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
      className={`relative border ${
        isDark
          ? "bg-[#008a2f]/5 border-[#008a2f]/20"
          : "bg-white border-gray-200 shadow-sm"
      } ${hover ? (isDark ? "hover:bg-[#008a2f]/10 hover:border-[#008a2f]/40" : "hover:shadow-md hover:border-gray-300") : ""} transition-all duration-300 ${className}`}
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
          fontFamily: isRtl
            ? "'Almarai', sans-serif"
            : "var(--font-mono)",
        }}
      >
        <span className="text-[#008a2f]">/</span> {title}
      </h2>
      {subtitle && (
        <p
          className={`text-base max-w-2xl ${center ? "mx-auto" : ""} ${isDark ? "text-gray-400" : "text-gray-500"}`}
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
  const cls = `inline-flex items-center gap-2 px-6 py-3 font-mono uppercase tracking-wider border transition-all duration-300 ${
    isDark
      ? "border-white/20 text-gray-300 hover:border-[#1d70ba] hover:text-[#1d70ba]"
      : "border-gray-300 text-gray-700 hover:border-[#1d70ba] hover:text-[#1d70ba]"
  } ${className}`;
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
