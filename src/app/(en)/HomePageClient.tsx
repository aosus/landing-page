"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Users,
  MessageSquare,
  Database,
  Activity,
  Shield,
  Server,
  Cpu,
  ChevronRight,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import Layout, {
  CyberCard,
  SectionHeading,
  PrimaryButton,
  SecondaryButton,
  type Lang,
} from "@/components/layout/Layout";
import type { PostFrontMatter } from "@/lib/markdown";
import { getLocalizedPath, getPostPath } from "@/lib/locale";
import CalligraphyPattern from "@/components/CalligraphyPattern";

const CONTENT = {
  en: {
    heading: "The Largest Arabic Open-Source Community",
    subtitle:
      "Where Arab technologists build the future. Open-source code is the foundation of modern civilization — and we are driving the revolution.",
    ctaJoin: "Join the Community",
    ctaExplore: "Explore Projects",
    stats: [
      { label: "Members", value: "3,000+", icon: Users },
      { label: "Posts", value: "10,000+", icon: MessageSquare },
      { label: "Topics", value: "1,300+", icon: Database },
      { label: "Years", value: "9", icon: Activity },
    ],
    projectsHeading: "Active_Projects",
    projects: [
      {
        title: "Discourse Community",
        desc: "The central hub for Arabic tech discussions. The core of Aosus.",
        icon: Server,
        color: "#008a2f",
        link: "https://discourse.aosus.org/",
      },
      {
        title: "Privacy Services",
        desc: "Ad-free frontend services (SearXNG, Redlib, Simply Translate) hosted by Aosus.",
        icon: Shield,
        color: "#1d70ba",
        link: "/services",
      },
      {
        title: "Chat Bridge",
        desc: "Open-source tool connecting Discourse with Matrix, Telegram, and Discord.",
        icon: Cpu,
        color: "#008a2f",
        link: "https://github.com/aosus/discourse-chat-bridge",
      },
    ],
    timelineHeading: "Timeline",
    timeline: [
      {
        year: "2017",
        title: "Community Founded",
        desc: "Aosus established as an Arabic open-source community.",
      },
      {
        year: "2019",
        title: "Discourse Forum",
        desc: "Migration to Discourse as the primary discussion platform.",
      },
      {
        year: "2021",
        title: "Privacy Services",
        desc: "Launched SearXNG, SimplyTranslate, and other privacy frontends.",
      },
      {
        year: "2022",
        title: "Writing Contest",
        desc: "Launched the writing contest to encourage Arabic FOSS content.",
      },
      {
        year: "2023",
        title: "Chat Bridge",
        desc: "Released open-source bridge connecting Discourse, Matrix, Telegram.",
      },
      {
        year: "2024",
        title: "HCB Partnership",
        desc: "Became fiscally sponsored by The Hack Foundation (501(c)(3)).",
      },
      {
        year: "2025",
        title: "Daydream Sponsorship",
        desc: "Sponsored student hackathon in Alexandria introducing FOSS via Godot.",
      },
    ],
    aboutHeading: "About",
    aboutBody:
      "Aosus is a non-profit community established by Arab technologists from across the world. We focus on empowering and spreading awareness of Free and Open Source Software and its philosophy in Arabic.",
    aboutValues: [
      "Non-profit organization",
      "Founded by Arab technologists",
      "Spanning across the Arab world",
      "Promoting digital freedom",
    ],
    blogHeading: "Latest_Posts",
    blog: [
      {
        title: "Aosus Sponsors Daydream Hackathon",
        date: "2025-09-18",
        excerpt:
          "Introducing school students to FOSS through game dev with Godot engine.",
        link: "/2135",
      },
      {
        title: "Contribute to Translating Firefox!",
        date: "2025-09-01",
        excerpt:
          "Mozilla needs your help to improve Arabic language support in Firefox.",
        link: "/2125",
      },
      {
        title: "Piped Service Discontinuation",
        date: "2025-08-15",
        excerpt:
          "The Piped service has been facing playback issues. Announcing discontinuation.",
        link: "/2071",
      },
    ],
    ctaHeading: "Join the Open-Source Revolution",
    ctaSubtitle: "Join the largest Arabic open-source community today.",
    ctaButton: "Get Started",
  },
  ar: {
    heading: "أكبر مجتمع عربي للبرمجيات الحرة",
    subtitle:
      "حيث يبني التقنيون العرب مستقبل المصادر المفتوحة. الشيفرة الحرة هي أساس الحضارة الحديثة — ونحن القوة العربية التي تقود هذه الثورة.",
    ctaJoin: "انضم للمجتمع",
    ctaExplore: "تصفح المشاريع",
    stats: [
      { label: "عضو", value: "+3,000", icon: Users },
      { label: "منشور", value: "+10,000", icon: MessageSquare },
      { label: "موضوع", value: "+1,300", icon: Database },
      { label: "سنوات", value: "9", icon: Activity },
    ],
    projectsHeading: "المشاريع_النشطة",
    projects: [
      {
        title: "مجتمع ديسكورس",
        desc: "المركز الأساسي للنقاشات التقنية العربية. قلب مجتمع أسس.",
        icon: Server,
        color: "#008a2f",
        link: "https://discourse.aosus.org/",
      },
      {
        title: "خدمات الخصوصية",
        desc: "واجهات خالية من الإعلانات للخدمات الشائعة، مستضافة بواسطة أسس.",
        icon: Shield,
        color: "#1d70ba",
        link: "/services",
      },
      {
        title: "جسر المحادثات",
        desc: "أداة مفتوحة المصدر لربط ديسكورس مع ماتركس، تيليجرام وديسكورد.",
        icon: Cpu,
        color: "#008a2f",
        link: "https://github.com/aosus/discourse-chat-bridge",
      },
    ],
    timelineHeading: "الجدول_الزمني",
    timeline: [
      {
        year: "2017",
        title: "تأسيس المجتمع",
        desc: "تأسيس أسس كمجتمع عربي للبرمجيات الحرة.",
      },
      {
        year: "2019",
        title: "منتدى ديسكورس",
        desc: "الانتقال إلى Discourse كمنصة نقاش أساسية.",
      },
      {
        year: "2021",
        title: "خدمات الخصوصية",
        desc: "إطلاق SearXNG و SimplyTranslate وواجهات أخرى تحترم الخصوصية.",
      },
      {
        year: "2022",
        title: "جائزة الكتابة",
        desc: "إطلاق جائزة الكتابة لتشجيع المحتوى العربي حول البرمجيات الحرة.",
      },
      {
        year: "2023",
        title: "جسر المحادثات",
        desc: "إصدار جسر مفتوح المصدر يربط Discourse مع Matrix وTelegram.",
      },
      {
        year: "2024",
        title: "شراكة HCB",
        desc: "أصبح مستضافاً مالياً من The Hack Foundation (501(c)(3)).",
      },
      {
        year: "2025",
        title: "رعاية Daydream",
        desc: "رعاية هاكاثون طلابي في الإسكندرية لتعريفهم بالبرمجيات الحرة عبر Godot.",
      },
    ],
    aboutHeading: "من_نحن",
    aboutBody:
      "أسس مجتمع غير ربحي أنشئ على يد مجموعة من التقنيين العرب من مختلف أقطار العالم، يرتكز على تمكين ونشر الوعي والثقافة للبرمجيات الحرة والمفتوحة المصدر وفلسفتها باللغة العربية.",
    aboutValues: [
      "منظمة غير ربحية",
      "أسسها تقنيون عرب",
      "تمتد عبر العالم العربي",
      "تعزيز الحرية الرقمية",
    ],
    blogHeading: "آخر_التدوينات",
    blog: [
      {
        title: "أسس يرعى هاكاثون Daydream",
        date: "٢٠٢٥-٠٩-١٨",
        excerpt:
          "تعريف طلاب المدارس بالبرمجيات الحرة عبر تطوير الألعاب مع محرك Godot.",
        link: "/2135",
      },
      {
        title: "ساهم في ترجمة Firefox!",
        date: "٢٠٢٥-٠٩-٠١",
        excerpt: "Mozilla تحتاج مساعدتك لتحسين دعم اللغة العربية في Firefox.",
        link: "/2125",
      },
      {
        title: "إيقاف خدمة Piped",
        date: "٢٠٢٥-٠٨-١٥",
        excerpt: "خدمة Piped تواجه مشاكل في التشغيل. نعلن عن الإيقاف القريب.",
        link: "/2071",
      },
    ],
    ctaHeading: "انضم إلى ثورة المصادر المفتوحة",
    ctaSubtitle: "انضم إلى أكبر مجتمع عربي مفتوح المصدر اليوم.",
    ctaButton: "ابدأ الآن",
  },
};

export default function HomePageClient({
  lang: langProp,
  latestPosts,
}: {
  lang?: Lang;
  latestPosts?: { en: PostFrontMatter[]; ar: PostFrontMatter[] };
}) {
  return (
    <Layout lang={langProp}>
      {({ lang, isDark }) => {
        const t = CONTENT[lang];
        const isRtl = lang === "ar";
        const ff = isRtl ? "var(--font-arabic)" : undefined;
        const servicesLink = getLocalizedPath(lang, "/services");
        const dynamicPosts = latestPosts?.[lang]?.slice(0, 3);

        return (
          <>
            <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">
              <CalligraphyPattern isDark={isDark} />
              {/*
                * pointer-events-none on the content wrapper so mouse events
                * pass through to the calligraphy layer below (z-[1]).
                * Buttons re-enable pointer-events-auto individually.
                */}
              <div className="relative z-[2] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pointer-events-none">
                <div className="max-w-3xl mx-auto text-center space-y-8">
                  <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight text-gray-900 dark:text-white"
                    style={{ fontFamily: ff }}
                  >
                    {t.heading}
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-lg sm:text-xl max-w-2xl mx-auto text-gray-600 dark:text-gray-400"
                    style={{ fontFamily: ff }}
                  >
                    {t.subtitle}
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-wrap justify-center gap-4 pointer-events-auto"
                  >
                    <PrimaryButton href="https://discourse.aosus.org">
                      {t.ctaJoin}
                      <ChevronRight
                        className={`w-4 h-4 ${isRtl ? "rotate-180" : ""}`}
                      />
                    </PrimaryButton>
                    <SecondaryButton href={servicesLink} isDark={isDark}>
                      {t.ctaExplore}
                    </SecondaryButton>
                  </motion.div>
                </div>
              </div>
            </section>

            <section className="py-20 border-y border-[#008a2f]/10 bg-gray-50/80 backdrop-blur-sm dark:bg-black/40">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  {t.stats.map((stat, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <CyberCard
                        isDark={isDark}
                        className="p-6 group cursor-default"
                      >
                        <stat.icon className="w-6 h-6 text-[#008a2f] mb-4 opacity-50 group-hover:opacity-100 transition-all" />
                        <div className="text-3xl sm:text-4xl font-bold mb-2 font-mono text-gray-900 transition-colors group-hover:text-[#008a2f] dark:text-white">
                          {stat.value}
                        </div>
                        <div className="text-xs uppercase tracking-widest font-mono text-gray-400 dark:text-gray-500">
                          {stat.label}
                        </div>
                      </CyberCard>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            <section className="py-24">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionHeading
                  title={t.projectsHeading}
                  isDark={isDark}
                  lang={lang}
                />
                <div className="grid md:grid-cols-3 gap-8">
                  {t.projects.map((project, i) => {
                    const isExternal = project.link.startsWith("http");
                    const CardContent = (
                      <CyberCard
                        isDark={isDark}
                        className="p-6 h-full group cursor-pointer"
                      >
                        <project.icon
                          className="w-8 h-8 mb-4"
                          style={{ color: project.color }}
                        />
                        <h3
                          className="text-lg font-bold mb-2 group-hover:text-[#008a2f] transition-colors"
                          style={{ fontFamily: ff }}
                        >
                          {project.title}
                        </h3>
                        <p
                          className="text-sm text-gray-500 dark:text-gray-400"
                          style={{ fontFamily: ff }}
                        >
                          {project.desc}
                        </p>
                        <div className="mt-4 flex items-center gap-1 text-xs font-mono text-[#008a2f] opacity-0 group-hover:opacity-100 transition-opacity">
                          <ExternalLink className="w-3 h-3" />
                          <span>OPEN</span>
                        </div>
                      </CyberCard>
                    );

                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                      >
                        {isExternal ? (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {CardContent}
                          </a>
                        ) : (
                          <Link href={project.link}>{CardContent}</Link>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </section>

            <section className="py-24 border-y border-[#008a2f]/10 bg-gray-50/80 dark:bg-black/40">
              <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionHeading
                  title={t.timelineHeading}
                  isDark={isDark}
                  lang={lang}
                />
                <div className="relative">
                  <div
                    className={`absolute ${isRtl ? "right-4 md:right-1/2" : "left-4 md:left-1/2"} top-0 bottom-0 w-px bg-[#008a2f]/30`}
                  />
                  {t.timeline.map((event, i) => {
                    const isLeft = i % 2 === 0;
                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.08 }}
                        className={`relative flex items-start mb-8 md:${isLeft ? "justify-start" : "justify-end"}`}
                      >
                        <div
                          className={`absolute ${isRtl ? "right-3 md:right-[calc(50%-5px)]" : "left-3 md:left-[calc(50%-5px)]"} top-2 w-2.5 h-2.5 bg-[#008a2f] border-2 border-black z-10`}
                        />
                        <div
                          className={`${isRtl ? "mr-12 md:mr-0" : "ml-12 md:ml-0"} md:w-[45%] ${!isLeft ? "md:ml-auto" : ""}`}
                        >
                          <CyberCard
                            isDark={isDark}
                            className="p-4"
                            hover={false}
                          >
                            <div className="text-xs font-mono text-[#008a2f] mb-1">
                              {event.year}
                            </div>
                            <h3
                              className="font-bold mb-1"
                              style={{ fontFamily: ff }}
                            >
                              {event.title}
                            </h3>
                            <p
                              className="text-sm text-gray-500 dark:text-gray-400"
                              style={{ fontFamily: ff }}
                            >
                              {event.desc}
                            </p>
                          </CyberCard>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </section>

            <section className="py-24">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 gap-12 items-start">
                  <div>
                    <SectionHeading
                      title={t.aboutHeading}
                      isDark={isDark}
                      lang={lang}
                      center={false}
                    />
                    <p
                      className="text-base leading-relaxed mb-6 text-gray-600 dark:text-gray-300"
                      style={{ fontFamily: ff }}
                    >
                      {t.aboutBody}
                    </p>
                    <ul className="space-y-2">
                      {t.aboutValues.map((v, i) => (
                        <li
                          key={i}
                          className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400"
                        >
                          <span className="text-[#008a2f] font-mono text-xs">
                            {">"}
                          </span>
                          <span style={{ fontFamily: ff }}>{v}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <SectionHeading
                      title={t.blogHeading}
                      isDark={isDark}
                      lang={lang}
                      center={false}
                    />
                    <div className="space-y-4">
                      {(dynamicPosts && dynamicPosts.length ? dynamicPosts : t.blog).map((post, i) => {
                        const isDynamic = "slug" in post;
                        const link = isDynamic
                          ? getPostPath(
                              lang,
                              (post as PostFrontMatter).slug,
                              (post as PostFrontMatter).wpType === "post"
                                && (post as PostFrontMatter).wpId === (post as PostFrontMatter).slug,
                            )
                          : (post as { link: string }).link;
                        const title = post.title;
                        const date = post.date;
                        const excerpt = post.excerpt;
                        return (
                          <Link key={i} href={link}>
                            <CyberCard
                              isDark={isDark}
                              className="p-4 group cursor-pointer block"
                            >
                              <div className="text-xs font-mono mb-1 text-gray-400 dark:text-gray-600">
                                {date}
                              </div>
                              <h3
                                className="font-bold text-sm mb-1 group-hover:text-[#008a2f] transition-colors"
                                style={{ fontFamily: ff }}
                              >
                                {title}
                              </h3>
                              <p
                                className="text-xs text-gray-400 dark:text-gray-500"
                                style={{ fontFamily: ff }}
                              >
                                {excerpt}
                              </p>
                            </CyberCard>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="py-20 border-t border-[#008a2f]/20 bg-[#008a2f]/5">
              <div className="max-w-3xl mx-auto px-6 text-center space-y-6">
                <h2
                  className="text-3xl md:text-4xl font-bold"
                  style={{
                    fontFamily: isRtl
                      ? "var(--font-arabic)"
                      : "var(--font-mono)",
                  }}
                >
                  {t.ctaHeading}
                </h2>
                <p
                  className="text-lg text-gray-500 dark:text-gray-400"
                  style={{ fontFamily: ff }}
                >
                  <span className="text-[#008a2f] font-mono">{">"}</span>{" "}
                  {t.ctaSubtitle}
                </p>
                <PrimaryButton href="https://discourse.aosus.org">
                  {t.ctaButton}
                  <ArrowRight
                    className={`w-5 h-5 ${isRtl ? "rotate-180" : ""}`}
                  />
                </PrimaryButton>
              </div>
            </section>
          </>
        );
      }}
    </Layout>
  );
}
