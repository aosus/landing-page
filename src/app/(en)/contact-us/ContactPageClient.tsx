"use client";

import React from "react";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import CommunityLinks from "@/components/CommunityLinks";
import Layout, {
  CyberCard,
  SectionHeading,
  type Lang,
} from "@/components/layout/Layout";
import { CHAT_PLATFORMS, SOCIAL_PLATFORMS } from "@/lib/community-platforms";

const CONTENT = {
  en: {
    title: "Contact",
    subtitle: "Get in touch with the Aosus community team.",
    email: {
      title: "Email",
      desc: "For general inquiries, partnerships, or sponsorship opportunities.",
      value: "contact@aosus.org",
      href: "mailto:contact@aosus.org",
    },
    chatTitle: "Chat_Platforms",
    chatSubtitle:
      "Join the community where discussions, support, and community events already happen.",
    socialTitle: "Follow_Us",
    socialSubtitle:
      "Follow Aosus across our public accounts for project updates, releases, and community news.",
  },
  ar: {
    title: "اتصل_بنا",
    subtitle: "تواصل مع فريق مجتمع أسس.",
    email: {
      title: "البريد الإلكتروني",
      desc: "للاستفسارات العامة والشراكات وفرص الرعاية.",
      value: "contact@aosus.org",
      href: "mailto:contact@aosus.org",
    },
    chatTitle: "منصات_المحادثة",
    chatSubtitle:
      "انضم إلى المجتمع على المنصات التي تدور فيها النقاشات والدعم والفعاليات المجتمعية.",
    socialTitle: "تابعنا",
    socialSubtitle:
      "تابع أسس عبر حساباتنا العامة للاطلاع على تحديثات المشاريع والإصدارات وأخبار المجتمع.",
  },
};

export default function ContactPage({ lang: langProp }: { lang?: Lang }) {
  return (
    <Layout lang={langProp}>
      {({ lang, isDark }) => {
        const t = CONTENT[lang];
        const isRtl = lang === "ar";
        const ff = isRtl ? "var(--font-arabic)" : undefined;

        return (
          <div className="min-h-screen bg-gray-50 dark:bg-transparent">
            <section className="py-24">
              <div className="max-w-4xl mx-auto px-6">
                <SectionHeading
                  title={t.title}
                  subtitle={t.subtitle}
                  isDark={isDark}
                  lang={lang}
                />

                <div className="mx-auto mb-20 max-w-xl">
                  <motion.a
                    href={t.email.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <CyberCard
                      isDark={isDark}
                      className="p-6 text-center group cursor-pointer"
                    >
                      <Mail
                        className="w-8 h-8 mx-auto mb-4"
                        style={{ color: "#008a2f" }}
                      />
                      <h3
                        className="text-lg font-bold mb-2 font-mono group-hover:text-[#008a2f] transition-colors"
                        style={
                          isRtl
                            ? { fontFamily: "var(--font-arabic)" }
                            : undefined
                        }
                      >
                        {t.email.title}
                      </h3>
                      <p
                        className="text-sm mb-3 text-gray-500 dark:text-gray-400"
                        style={{ fontFamily: ff }}
                      >
                        {t.email.desc}
                      </p>
                      <span className="text-sm font-mono text-[#008a2f]">
                        {t.email.value}
                      </span>
                    </CyberCard>
                  </motion.a>
                </div>

                <div className="mb-20">
                  <SectionHeading
                    title={t.chatTitle}
                    subtitle={t.chatSubtitle}
                    isDark={isDark}
                    lang={lang}
                  />
                  <CommunityLinks platforms={CHAT_PLATFORMS} variant="cards" />
                </div>

                <div>
                  <SectionHeading
                    title={t.socialTitle}
                    subtitle={t.socialSubtitle}
                    isDark={isDark}
                    lang={lang}
                  />
                  <CommunityLinks
                    platforms={SOCIAL_PLATFORMS}
                    variant="cards"
                  />
                </div>
              </div>
            </section>
          </div>
        );
      }}
    </Layout>
  );
}
