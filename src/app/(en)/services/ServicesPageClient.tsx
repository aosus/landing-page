"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Languages,
  ImageIcon,
  AlertTriangle,
  ArrowRight,
} from "lucide-react";
import {
  FaChrome,
  FaMedium,
  FaPuzzlePiece,
  FaQuora,
  FaReddit,
  FaTiktok,
  FaXTwitter,
} from "react-icons/fa6";
import { SiMatrix, SiSearxng } from "react-icons/si";
import Layout, {
  CyberCard,
  PrimaryButton,
  type Lang,
} from "@/components/layout/Layout";
import { getLocalizedPath } from "@/lib/locale";

const SERVICES = {
  en: {
    title: "Services",
    subtitle:
      "Privacy-respecting frontends for popular platforms. No ads, no tracking.",
    notice:
      "Aosus public services have been shut down. Most of them were already broken by newly introduced AI scraper protections, so we've turned them off to use our resources more effectively internally.",
    readMore: "Read more",
    items: [
      {
        name: "Simply Translate",
        desc: "Interface for multiple translation services like Google Translate without tracking, with automatic translation and audio support.",
        icon: Languages,
        color: "#008a2f",
      },
      {
        name: "Nitter",
        desc: "Twitter/X frontend without ads or tracking. No JavaScript required and supports RSS feeds.",
        icon: FaXTwitter,
        color: "#1d70ba",
      },
      {
        name: "SearXNG",
        desc: "A metasearch engine that fetches results from other engines while protecting your privacy. Default results from Google and Brave.",
        icon: SiSearxng,
        color: "#008a2f",
      },
      {
        name: "Redlib",
        desc: "Reddit frontend without ads or tracking. Does not use JavaScript and is built with Rust.",
        icon: FaReddit,
        color: "#1d70ba",
      },
      {
        name: "Element",
        desc: "The most popular Matrix protocol client. A federated, open-source messaging protocol.",
        icon: SiMatrix,
        color: "#008a2f",
      },
      {
        name: "rimgo",
        desc: "Imgur frontend without ads, tracking, or JavaScript. Faster and lighter.",
        icon: ImageIcon,
        color: "#008a2f",
      },
      {
        name: "Scribe",
        desc: "Frontend for the Medium blogging platform. Much lighter, no ads, no login required.",
        icon: FaMedium,
        color: "#1d70ba",
      },
      {
        name: "Quetre",
        desc: "Frontend for Quora with cleaner layout and without ads or tracking.",
        icon: FaQuora,
        color: "#008a2f",
      },
      {
        name: "Sticktock",
        desc: "TikTok frontend to browse content without ads, tracking, or needing an account.",
        icon: FaTiktok,
        color: "#1d70ba",
      },
    ],
    extensionsTitle: "Browser_Extensions",
    extensions: [
      {
        name: "LibRedirect",
        desc: "Redirect platform links to privacy-respecting frontends. More features and active development.",
        icon: FaPuzzlePiece,
        color: "#008a2f",
      },
      {
        name: "Privacy Redirect",
        desc: "Redirect platform links to privacy-friendly frontends. Available on Chrome Web Store.",
        icon: FaChrome,
        color: "#1d70ba",
      },
    ],
  },
  ar: {
    title: "الخدمات",
    subtitle: "واجهات تحترم الخصوصية للمنصات الشائعة. بدون إعلانات أو تتبع.",
    notice:
      "تم إيقاف خدمات أسس العامة. معظمها كان معطلاً أصلاً بسبب حمايات الـ AI scrapers الجديدة، لذا أوقفناها لاستخدام مواردنا بشكل أكثر فعالية داخلياً.",
    readMore: "اقرأ المزيد",
    items: [
      {
        name: "Simply Translate",
        desc: "واجهة لخدمات ترجمة متعددة مثل ترجمة Google دون تتبع مع دعم الترجمة التلقائية والصوت.",
        icon: Languages,
        color: "#008a2f",
      },
      {
        name: "Nitter",
        desc: "واجهة لمنصة Twitter/X دون إعلانات أو تتبع. لا تستخدم JavaScript وتدعم RSS.",
        icon: FaXTwitter,
        color: "#1d70ba",
      },
      {
        name: "SearXNG",
        desc: "محرك بحث يجلب النتائج من محركات بحث أخرى مع المحافظة على خصوصيتك الرقمية.",
        icon: SiSearxng,
        color: "#008a2f",
      },
      {
        name: "Redlib",
        desc: "واجهة لمنصة Reddit دون إعلانات أو تتبع، لا تستخدم JS وهي مبنية بلغة Rust.",
        icon: FaReddit,
        color: "#1d70ba",
      },
      {
        name: "Element",
        desc: "أشهر واجهة لبروتوكول Matrix، بروتوكول فدرالي للمحادثة مفتوح المصدر.",
        icon: SiMatrix,
        color: "#008a2f",
      },
      {
        name: "rimgo",
        desc: "واجهة لموقع Imgur لرفع الصور، دون إعلانات أو تتبع أو سكربتات.",
        icon: ImageIcon,
        color: "#008a2f",
      },
      {
        name: "Scribe",
        desc: "واجهة لمنصة التدوينات الشهيرة Medium. أخف بكثير من الموقع الرسمي.",
        icon: FaMedium,
        color: "#1d70ba",
      },
      {
        name: "Quetre",
        desc: "واجهة لمنصة Quora دون تتبع أو إعلانات مع ترتيب أوضح من الموقع الرسمي.",
        icon: FaQuora,
        color: "#008a2f",
      },
      {
        name: "Sticktock",
        desc: "واجهة لمنصة TikTok دون إعلانات أو تتبع لمشاهدة المحتوى بدون حساب.",
        icon: FaTiktok,
        color: "#1d70ba",
      },
    ],
    extensionsTitle: "إضافات_المتصفح",
    extensions: [
      {
        name: "LibRedirect",
        desc: "إعادة توجيه روابط المنصات إلى واجهات تحافظ على الخصوصية مع ميزات أكثر.",
        icon: FaPuzzlePiece,
        color: "#008a2f",
      },
      {
        name: "Privacy Redirect",
        desc: "إعادة توجيه روابط المنصات إلى واجهات تحافظ على الخصوصية. متوفرة على متجر Chrome.",
        icon: FaChrome,
        color: "#1d70ba",
      },
    ],
  },
};

export default function ServicesPage({ lang: langProp }: { lang?: Lang }) {
  return (
    <Layout lang={langProp}>
      {({ lang, isDark }) => {
        const t = SERVICES[lang];
        const isRtl = lang === "ar";
        const ff = isRtl ? "var(--font-arabic)" : undefined;
        const blogPostLink = `${getLocalizedPath(lang, "/blog")}/aosus-services-shutdown`;

        return (
          <div className="min-h-screen bg-gray-50 dark:bg-transparent">
            <section className="py-24">
              <div className="max-w-6xl mx-auto px-6">
                <div className="mb-12 text-center">
                  <h1
                    className="text-3xl md:text-4xl font-bold uppercase tracking-widest mb-4"
                    style={{
                      fontFamily: isRtl ? "var(--font-arabic)" : "var(--font-mono)",
                    }}
                  >
                    <span className="text-[#008a2f]">/</span> {t.title}
                  </h1>
                  <p
                    className="text-base max-w-2xl text-gray-500 dark:text-gray-400 mx-auto"
                    style={{ fontFamily: ff }}
                  >
                    {t.subtitle}
                  </p>
                </div>

                <div className="relative">
                  {/* Blurred, inert archive of the retired service catalog */}
                  <div
                    aria-hidden="true"
                    className="select-none blur-sm opacity-40 saturate-50 pointer-events-none"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
                      {t.items.map((service, i) => (
                        <CyberCard
                          key={i}
                          isDark={isDark}
                          className="p-6 h-full"
                          hover={false}
                        >
                          <service.icon
                            className="w-8 h-8 mb-4"
                            style={{ color: service.color }}
                          />
                          <h3 className="text-lg font-bold mb-2 font-mono">
                            {service.name}
                          </h3>
                          <p
                            className="text-sm leading-relaxed text-gray-500 dark:text-gray-400"
                            style={{ fontFamily: ff }}
                          >
                            {service.desc}
                          </p>
                        </CyberCard>
                      ))}
                    </div>

                    <div className="mb-12 text-center">
                      <h2
                        className="text-3xl md:text-4xl font-bold uppercase tracking-widest mb-4"
                        style={{
                          fontFamily: isRtl
                            ? "var(--font-arabic)"
                            : "var(--font-mono)",
                        }}
                      >
                        <span className="text-[#008a2f]">/</span>{" "}
                        {t.extensionsTitle}
                      </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {t.extensions.map((ext, i) => (
                        <CyberCard
                          key={i}
                          isDark={isDark}
                          className="p-6"
                          hover={false}
                        >
                          <ext.icon
                            className="w-8 h-8 mb-4"
                            style={{ color: ext.color }}
                          />
                          <h3 className="text-lg font-bold mb-2 font-mono">
                            {ext.name}
                          </h3>
                          <p
                            className="text-sm text-gray-500 dark:text-gray-400"
                            style={{ fontFamily: ff }}
                          >
                            {ext.desc}
                          </p>
                        </CyberCard>
                      ))}
                    </div>
                  </div>

                  {/* Shutdown notice overlaid on top of the blurred catalog */}
                  <div className="absolute inset-0 z-10 flex items-center justify-center p-4">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="max-w-2xl w-full"
                    >
                      <CyberCard
                        isDark={isDark}
                        className="p-6 sm:p-8 bg-white/95 dark:bg-black/90 backdrop-blur-md"
                        hover={false}
                      >
                        <div className="flex items-start gap-4">
                          <AlertTriangle className="w-8 h-8 text-[#008a2f] flex-shrink-0 mt-1" />
                          <div>
                            <p
                              className="text-base sm:text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-6"
                              style={{ fontFamily: ff }}
                            >
                              {t.notice}
                            </p>
                            <PrimaryButton href={blogPostLink}>
                              {t.readMore}
                              <ArrowRight
                                className={`w-4 h-4 ${isRtl ? "rotate-180" : ""}`}
                              />
                            </PrimaryButton>
                          </div>
                        </div>
                      </CyberCard>
                    </motion.div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        );
      }}
    </Layout>
  );
}
