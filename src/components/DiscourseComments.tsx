"use client";

import React from "react";
import { ExternalLink, LoaderCircle, MessageSquare } from "lucide-react";
import { PrimaryButton } from "@/components/layout/Layout";
import type { Lang } from "@/lib/locale";

export const DISCOURSE_URL = "https://discourse.aosus.org/";

const EMBED_SCRIPT_ID = "aosus-discourse-embed-script";
const EMBED_ROOT_ID = "discourse-comments";

const COPY = {
  en: {
    title: "Comments",
    subtitle: "Read the discussion here and jump to the forum for the full reply editor.",
    action: "Open Forum",
    idle: "Comments load only when you get here, so the article stays fast.",
    loading: "Loading the discussion from Discourse...",
    error: "The embedded discussion could not be loaded right now.",
    fallback: "Continue the discussion on the Aosus forum",
  },
  ar: {
    title: "التعليقات",
    subtitle: "اقرأ النقاش هنا وانتقل إلى المنتدى لكتابة رد كامل.",
    action: "افتح المنتدى",
    idle: "تُحمّل التعليقات عند الوصول إلى هذا القسم فقط للحفاظ على سرعة الصفحة.",
    loading: "جارٍ تحميل النقاش من ديسكورس...",
    error: "تعذّر تحميل النقاش المضمّن الآن.",
    fallback: "تابع النقاش في منتدى أسس",
  },
} as const;

type DiscourseEmbedConfig = {
  discourseUrl: string;
  discourseEmbedUrl: string;
  fullApp?: boolean;
  dynamicHeight?: boolean;
  embedMinHeight?: string;
  embedMaxHeight?: string;
  className?: string;
  discourseReferrerPolicy?: string;
};

declare global {
  interface Window {
    DiscourseEmbed?: DiscourseEmbedConfig;
  }
}

export default function DiscourseComments({
  lang,
  articleUrl,
}: {
  lang: Lang;
  articleUrl: string;
}) {
  const t = COPY[lang];
  const titleId = React.useId();
  const isRtl = lang === "ar";
  const shellFont = isRtl ? "var(--font-arabic)" : undefined;
  const containerRef = React.useRef<HTMLDivElement>(null);
  const resetInProgressRef = React.useRef(false);
  const [isActivated, setIsActivated] = React.useState(false);
  const [status, setStatus] = React.useState<"idle" | "loading" | "ready" | "error">("idle");

  React.useEffect(() => {
    setIsActivated(false);
    setStatus("idle");

    if (containerRef.current) {
      containerRef.current.innerHTML = "";
    }
  }, [articleUrl]);

  React.useEffect(() => {
    if (isActivated) {
      return;
    }

    const node = containerRef.current;

    if (!node) {
      return;
    }

    let timeoutId: number | undefined;
    let idleId: number | undefined;
    let observer: IntersectionObserver | null = null;

    const activate = () => {
      resetInProgressRef.current = false;
      setIsActivated(true);
    };

    const scheduleActivation = () => {
      if (typeof window.requestIdleCallback === "function") {
        idleId = window.requestIdleCallback(() => activate(), { timeout: 800 });
        return;
      }

      timeoutId = window.setTimeout(activate, 0);
    };

    if (typeof window.IntersectionObserver !== "function") {
      scheduleActivation();
    } else {
      observer = new window.IntersectionObserver(
        (entries) => {
          if (!entries[0]?.isIntersecting) {
            return;
          }

          observer?.disconnect();
          scheduleActivation();
        },
        { rootMargin: "320px 0px" },
      );

      observer.observe(node);
    }

    return () => {
      observer?.disconnect();

      if (typeof timeoutId === "number") {
        window.clearTimeout(timeoutId);
      }

      if (typeof idleId === "number" && typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(idleId);
      }
    };
  }, [isActivated]);

  React.useEffect(() => {
    if (!isActivated) {
      return;
    }

    const node = containerRef.current;

    if (!node) {
      return;
    }

    if (resetInProgressRef.current) {
      return;
    }

    let isCancelled = false;
    setStatus("loading");
    node.innerHTML = "";

    window.DiscourseEmbed = {
      discourseUrl: DISCOURSE_URL,
      discourseEmbedUrl: articleUrl,
      fullApp: true,
      dynamicHeight: true,
      embedMinHeight: "360",
      embedMaxHeight: "1400",
      className: "aosus-discourse-embed",
      discourseReferrerPolicy: "strict-origin-when-cross-origin",
    };

    document.getElementById(EMBED_SCRIPT_ID)?.remove();

    const script = document.createElement("script");
    script.id = EMBED_SCRIPT_ID;
    script.type = "text/javascript";
    script.async = true;
    script.src = `${DISCOURSE_URL}javascripts/embed.js`;
    script.onload = () => {
      if (!isCancelled) {
        setStatus("ready");
      }
    };
    script.onerror = () => {
      if (!isCancelled) {
        setStatus("error");
      }
    };

    document.head.appendChild(script);
    resetInProgressRef.current = false;

    return () => {
      isCancelled = true;
      resetInProgressRef.current = true;
      script.remove();

      if (window.DiscourseEmbed?.discourseEmbedUrl === articleUrl) {
        delete window.DiscourseEmbed;
      }
    };
  }, [articleUrl, isActivated]);

  const statusText =
    status === "error" ? t.error : status === "loading" ? t.loading : t.idle;

  return (
    <section className="aosus-discourse-comments mb-12" aria-labelledby={titleId}>
      <div className="aosus-discourse-comments__shell">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="space-y-3">
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-[#008a2f]">
              <span className="opacity-50">/</span> forum
            </p>
            <div className="space-y-2">
              <h2
                id={titleId}
                className="flex items-center gap-2 text-2xl font-bold text-gray-900 dark:text-white"
                style={{ fontFamily: shellFont }}
              >
                <MessageSquare className="h-5 w-5 text-[#008a2f]" />
                {t.title}
              </h2>
              <p
                className="max-w-2xl text-sm leading-6 text-gray-600 dark:text-gray-300"
                style={{ fontFamily: shellFont }}
              >
                {t.subtitle}
              </p>
            </div>
          </div>

          <PrimaryButton
            href={DISCOURSE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0"
          >
            {t.action}
            <ExternalLink className="h-4 w-4" />
          </PrimaryButton>
        </div>

        {status !== "ready" && (
          <div className="aosus-discourse-comments__placeholder" aria-live="polite">
            {status === "loading" && <LoaderCircle className="h-5 w-5 animate-spin text-[#008a2f]" />}
            <p style={{ fontFamily: shellFont }}>{statusText}</p>
          </div>
        )}

        <div
          ref={containerRef}
          id={EMBED_ROOT_ID}
          className="aosus-discourse-comments__mount"
          aria-busy={status === "loading"}
        />

        <noscript>
          <p className="mt-4 text-sm text-gray-600">
            <a href={DISCOURSE_URL} className="text-[#008a2f] underline underline-offset-4">
              {t.fallback}
            </a>
          </p>
        </noscript>
      </div>
    </section>
  );
}
