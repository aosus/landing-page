"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Search,
  Globe,
  MessageSquare,
  BookOpen,
  ImageIcon,
  ExternalLink,
  Shield,
} from "lucide-react";
import Layout, {
  CyberCard,
  SectionHeading,
  PrimaryButton,
  type Lang,
} from "@/components/layout/Layout";

const SERVICES = {
  en: {
    title: "Services",
    subtitle:
      "Privacy-respecting frontends for popular platforms. No ads, no tracking.",
    notice:
      "These services are public. Please be mindful of server resources.",
    supportCta: "Support Us",
    items: [
      {
        name: "Simply Translate",
        desc: "Interface for multiple translation services like Google Translate without tracking, with automatic translation and audio support.",
        icon: Globe,
        link: "https://simplytranslate.aosus.link/",
        color: "#008a2f",
      },
      {
        name: "SearXNG",
        desc: "A metasearch engine that fetches results from other engines while protecting your privacy. Default results from Google and Brave.",
        icon: Search,
        link: "https://search.aosus.link/",
        color: "#1d70ba",
      },
      {
        name: "Redlib",
        desc: "Reddit frontend without ads or tracking. Does not use JavaScript and is built with Rust.",
        icon: MessageSquare,
        link: "https://redlib.aosus.link/",
        color: "#008a2f",
      },
      {
        name: "Element",
        desc: "The most popular Matrix protocol client. A federated, open-source messaging protocol.",
        icon: MessageSquare,
        link: "https://element.aosus.link/",
        color: "#1d70ba",
      },
      {
        name: "rimgo",
        desc: "Imgur frontend without ads, tracking, or JavaScript. Faster and lighter.",
        icon: ImageIcon,
        link: "https://rimgo.aosus.link/",
        color: "#008a2f",
      },
      {
        name: "Scribe",
        desc: "Frontend for the Medium blogging platform. Much lighter, no ads, no login required.",
        icon: BookOpen,
        link: "https://scribe.aosus.link/",
        color: "#1d70ba",
      },
    ],
    extensionsTitle: "Browser_Extensions",
    extensions: [
      {
        name: "LibRedirect",
        desc: "Redirect platform links to privacy-respecting frontends. More features and active development.",
        link: "https://github.com/libredirect/libredirect",
      },
      {
        name: "Privacy Redirect",
        desc: "Redirect platform links to privacy-friendly frontends. Available on Chrome Web Store.",
        link: "https://github.com/SimonBrazell/privacy-redirect",
      },
    ],
  },
  ar: {
    title: "الخدمات",
    subtitle:
      "واجهات تحترم الخصوصية للمنصات الشائعة. بدون إعلانات أو تتبع.",
    notice: "هذه الخدمات عامة. يرجى مراعاة استخدام موارد الخادم.",
    supportCta: "ادعمنا",
    items: [
      {
        name: "Simply Translate",
        desc: "واجهة لخدمات ترجمة متعددة مثل ترجمة Google دون تتبع مع دعم الترجمة التلقائية والصوت.",
        icon: Globe,
        link: "https://simplytranslate.aosus.link/",
        color: "#008a2f",
      },
      {
        name: "SearXNG",
        desc: "محرك بحث يجلب النتائج من محركات بحث أخرى مع المحافظة على خصوصيتك الرقمية.",
        icon: Search,
        link: "https://search.aosus.link/",
        color: "#1d70ba",
      },
      {
        name: "Redlib",
        desc: "واجهة لمنصة Reddit دون إعلانات أو تتبع، لا تستخدم JS وهي مبنية بلغة Rust.",
        icon: MessageSquare,
        link: "https://redlib.aosus.link/",
        color: "#008a2f",
      },
      {
        name: "Element",
        desc: "أشهر واجهة لبروتوكول Matrix، بروتوكول فدرالي للمحادثة مفتوح المصدر.",
        icon: MessageSquare,
        link: "https://element.aosus.link/",
        color: "#1d70ba",
      },
      {
        name: "rimgo",
        desc: "واجهة لموقع Imgur لرفع الصور، دون إعلانات أو تتبع أو سكربتات.",
        icon: ImageIcon,
        link: "https://rimgo.aosus.link/",
        color: "#008a2f",
      },
      {
        name: "Scribe",
        desc: "واجهة لمنصة التدوينات الشهيرة Medium. أخف بكثير من الموقع الرسمي.",
        icon: BookOpen,
        link: "https://scribe.aosus.link/",
        color: "#1d70ba",
      },
    ],
    extensionsTitle: "إضافات_المتصفح",
    extensions: [
      {
        name: "LibRedirect",
        desc: "إعادة توجيه روابط المنصات إلى واجهات تحافظ على الخصوصية مع ميزات أكثر.",
        link: "https://github.com/libredirect/libredirect",
      },
      {
        name: "Privacy Redirect",
        desc: "إعادة توجيه روابط المنصات إلى واجهات تحافظ على الخصوصية. متوفرة على متجر Chrome.",
        link: "https://github.com/SimonBrazell/privacy-redirect",
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
        const ff = isRtl ? "'Almarai', sans-serif" : undefined;
        const supportLink =
          lang === "ar" ? "/ar/support-us" : "/support-us";

        return (
          <div className={`min-h-screen ${isDark ? "" : "bg-gray-50"}`}>
            <section className="py-24">
              <div className="max-w-6xl mx-auto px-6">
                <SectionHeading
                  title={t.title}
                  subtitle={t.subtitle}
                  isDark={isDark}
                  lang={lang}
                />

                <CyberCard
                  isDark={isDark}
                  className="p-4 mb-12 flex items-center gap-3"
                  hover={false}
                >
                  <Shield className="w-5 h-5 text-[#008a2f] flex-shrink-0" />
                  <p
                    className={`text-sm font-mono ${isDark ? "text-gray-400" : "text-gray-600"}`}
                    style={{ fontFamily: ff }}
                  >
                    {t.notice}
                  </p>
                  <PrimaryButton
                    href={supportLink}
                    className="ml-auto text-xs px-3 py-1.5 whitespace-nowrap"
                  >
                    {t.supportCta}
                  </PrimaryButton>
                </CyberCard>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
                  {t.items.map((service, i) => (
                    <motion.a
                      key={i}
                      href={service.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <CyberCard
                        isDark={isDark}
                        className="p-6 h-full group cursor-pointer"
                      >
                        <service.icon
                          className="w-8 h-8 mb-4"
                          style={{ color: service.color }}
                        />
                        <h3 className="text-lg font-bold mb-2 font-mono group-hover:text-[#008a2f] transition-colors">
                          {service.name}
                        </h3>
                        <p
                          className={`text-sm leading-relaxed ${isDark ? "text-gray-400" : "text-gray-500"}`}
                          style={{ fontFamily: ff }}
                        >
                          {service.desc}
                        </p>
                        <div className="mt-4 flex items-center gap-1 text-xs font-mono text-[#008a2f]">
                          <ExternalLink className="w-3 h-3" />
                          {service.link
                            .replace("https://", "")
                            .replace("/", "")}
                        </div>
                      </CyberCard>
                    </motion.a>
                  ))}
                </div>

                <SectionHeading
                  title={t.extensionsTitle}
                  isDark={isDark}
                  lang={lang}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {t.extensions.map((ext, i) => (
                    <a
                      key={i}
                      href={ext.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <CyberCard
                        isDark={isDark}
                        className="p-6 group cursor-pointer"
                      >
                        <h3 className="text-lg font-bold mb-2 font-mono group-hover:text-[#008a2f] transition-colors">
                          {ext.name}
                        </h3>
                        <p
                          className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}
                          style={{ fontFamily: ff }}
                        >
                          {ext.desc}
                        </p>
                      </CyberCard>
                    </a>
                  ))}
                </div>
              </div>
            </section>
          </div>
        );
      }}
    </Layout>
  );
}
