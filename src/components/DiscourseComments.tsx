"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ExternalLink, MessageSquare } from "lucide-react";
import { CyberCard, type Lang } from "@/components/layout/Layout";

const DISCOURSE_URL = "https://discourse.aosus.org";
const DISCOURSE_ORIGIN = new URL(DISCOURSE_URL).origin;

const LABELS = {
  en: {
    eyebrow: "Forum",
    title: "Comments",
    subtitle: "Continue the conversation with the Aosus community.",
    loading: "Loading discussion...",
    open: "Open full discussion",
    frameTitle: "Aosus article comments",
  },
  ar: {
    eyebrow: "المنتدى",
    title: "التعليقات",
    subtitle: "أكمل النقاش مع مجتمع أسس في المنتدى.",
    loading: "جاري تحميل النقاش...",
    open: "افتح النقاش الكامل",
    frameTitle: "تعليقات مقالة أسس",
  },
} satisfies Record<Lang, {
  eyebrow: string;
  title: string;
  subtitle: string;
  loading: string;
  open: string;
  frameTitle: string;
}>;

function getFrameTop(frame: HTMLIFrameElement): number {
  let top = 0;
  let current: HTMLElement | null = frame;

  while (current) {
    top += current.offsetTop;
    current = current.offsetParent as HTMLElement | null;
  }

  return top;
}

export default function DiscourseComments({
  lang,
  isDark,
  embedUrl,
}: {
  lang: Lang;
  isDark: boolean;
  embedUrl: string;
}) {
  const t = LABELS[lang];
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [iframeHeight, setIframeHeight] = useState(420);
  const [isLoaded, setIsLoaded] = useState(false);
  const iframeSrc = useMemo(
    () => `${DISCOURSE_URL}/embed/comments?embed_url=${encodeURIComponent(embedUrl)}`,
    [embedUrl],
  );

  useEffect(() => {
    setIframeHeight(420);
    setIsLoaded(false);
  }, [iframeSrc]);

  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      if (event.origin !== DISCOURSE_ORIGIN || !event.data || typeof event.data !== "object") {
        return;
      }

      if (event.data.type === "discourse-resize") {
        const nextHeight = Number(event.data.height);

        if (Number.isFinite(nextHeight) && nextHeight > 0) {
          setIframeHeight(nextHeight);
          setIsLoaded(true);
        }

        return;
      }

      if (event.data.type === "discourse-scroll") {
        const nextTop = Number(event.data.top);
        const frame = iframeRef.current;

        if (!frame || !Number.isFinite(nextTop)) {
          return;
        }

        window.scrollTo({ top: getFrameTop(frame) + nextTop, left: 0 });
      }
    }

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  return (
    <CyberCard isDark={isDark} className="mb-12 overflow-hidden" hover={false}>
      <div className="border-b border-[#008a2f]/15 bg-[#008a2f]/5 px-5 py-4 dark:bg-[#008a2f]/10">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="mb-1 font-mono text-xs uppercase tracking-[0.24em] text-[#008a2f]">
              <span className="opacity-50">/</span> {t.eyebrow}
            </div>
            <div className="flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-white">
              <MessageSquare className="h-5 w-5 text-[#008a2f]" />
              <h2 style={{ fontFamily: lang === "ar" ? "var(--font-arabic)" : undefined }}>
                {t.title}
              </h2>
            </div>
            <p
              className="mt-1 text-sm text-gray-600 dark:text-gray-300"
              style={{ fontFamily: lang === "ar" ? "var(--font-arabic)" : undefined }}
            >
              {t.subtitle}
            </p>
          </div>

          <a
            href={DISCOURSE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 self-start text-xs font-mono uppercase tracking-wider text-[#008a2f] hover:underline"
          >
            {t.open}
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>

      <div className="relative bg-white dark:bg-black/20">
        {!isLoaded && (
          <div className="px-5 py-4 text-xs font-mono uppercase tracking-wider text-gray-400 dark:text-gray-500">
            {t.loading}
          </div>
        )}

        <iframe
          key={iframeSrc}
          ref={iframeRef}
          src={iframeSrc}
          title={t.frameTitle}
          className="w-full border-0"
          style={{ height: `${iframeHeight}px` }}
          scrolling="no"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          onLoad={() => setIsLoaded(true)}
        />
      </div>
    </CyberCard>
  );
}
