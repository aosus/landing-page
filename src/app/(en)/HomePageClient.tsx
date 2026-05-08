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
import { SITE_URL } from "@/lib/rss";

const YEARS_ACTIVE = new Date().getFullYear() - 2016;
const NORMALIZED_SITE_URL = SITE_URL.replace(/\/$/, "");

function serializeJsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

const CONTENT = {
  en: {
    heading: "The largest Arabic FOSS community",
    subtitle:
      "A community with the aim of spreading and enriching the culture of FOSS software in the Arab world and to make it easy for people to contribute and take part.",
    ctaJoin: "Join us",
    ctaExplore: "Privacy frontends",
    stats: [
      { label: "Members", value: "3,000+", icon: Users },
      { label: "Posts", value: "10,000+", icon: MessageSquare },
      { label: "Years of activity", value: String(YEARS_ACTIVE), icon: Activity },
      { label: "Topics", value: "1,300+", icon: Database },
    ],
    projectsHeading: "Aosus projects",
    projects: [
      {
        title: "Aosus services",
        desc: "To support and raise awareness about Digital privacy, we host Privacy services/front ends for popular social platforms, allowing you to browse their content without Ads and tracking.",
        icon: Shield,
        color: "#1d70ba",
        link: getLocalizedPath("en", "/services"),
      },
      {
        title: "Community",
        desc: "The largest part of the Aosus project, which is dedicated to everyone interested in contributing to the enrichment of technical Arabic content, specializing in free and open source software and hardware.",
        icon: Server,
        color: "#008a2f",
        link: "https://discourse.aosus.org/",
      },
      {
        title: "discourse-chat-bridge",
        desc: "A bridge allowing users to post and reply to posts on discourse through Telegram or Matrix.",
        icon: Cpu,
        color: "#008a2f",
        link: "https://github.com/aosus/discourse-chat-bridge",
      },
    ],
    timelineHeading: "Project Timeline",
    timeline: [
      {
        year: "2015",
        title: "Early days",
        desc: "The beginning was on social media platforms such as WhatsApp and Telegram, where members seek to have a community on the web different from Linuxac.org and be unique in offering and contributing to the world of free and open source software.",
      },
      {
        year: "2016",
        title: "Aosus Launch",
        desc: "Aosus was founded in 2016 by a group of Arab FOSS enthusiasts as a complete community for free and open source software, with the aim of spreading and raising awareness for Arabic speakers in all countries of the world.",
      },
      {
        year: "2016",
        title: "Held the first localization workshop for open source software",
        desc: "Several open source software such as Discourse and Rocket Chat, and many of them were localized by the efforts of members of the Aosus community.",
      },
      {
        year: "2017",
        title: "Support Arab projects",
        desc: "The beginning of the first support for Arab projects concerned with free and open source software by providing financial and infrastructure support.",
      },
      {
        year: "2021",
        title: "Merger between two groups on Telegram",
        desc: "In order to have new members with aspirations and energy to contribute to Aosus. The team decided to merge the two groups of Aosus and the GNU Linux on Telegram into one group to unite efforts in the Arabic FOSS movement.",
      },
      {
        year: "2021",
        title: "Joining the Matrix network",
        desc: "In line with our goal to promote FOSS software in the Arab world, we joined the Federated Matrix Network with Bridges to enable cross-platform chat.",
      },
      {
        year: "2021",
        title: "Starting the Aosus Writing Award",
        desc: "The first award of its kind in the Arab world. A monthly award to motivate the writing of content on free and open source software in the Arabic language. With financial prizes of up to $250!",
      },
      {
        year: "2022",
        title: "Joining Open Collective",
        desc: "We have joined the Open Collective, as one of the first Arab projects on the platforms, so that we can be financially independent and transparent. Open Collective will now be used for all future costs, expenses, and support for the Aosus community.",
      },
      {
        year: "2023",
        title: "Joining Discord",
        desc: "We always aim to be present on the most popular platforms to reach people interested in FOSS wherever they may be. And for gamers and tech enthusiasts, Discord is clearly one of the most widely used social platforms. That's why we've set up our own Discord server with a matrix bridge to allow people to talk across platforms, using their favourite platform.",
      },
      {
        year: "2024",
        title: "Aosus gets non-profit status in the U.S.",
        desc: "Aosus moved in 2024 to The Hack Foundation as its fiscal sponsor, becoming a registered U.S. 501(c)(3) nonprofit and gaining greater independence as well as the ability to offer tax-deductible donations in the United States.",
      },
    ],
    aboutHeading: "Who are we?",
    aboutBody:
      "Aosus Community is a non-profit project by a group of Arab tech enthusiasts to create a dedicated community for FOSS software, hardware and its philosophy in the Arabic language.",
    aboutValues: [
      "Our Goal: To promote the idea and values of free and open source software & hardware in the Arab world.",
      "Our Vision: To be a pioneer in raising awareness and promoting free and open source software and hardware in the Arab world. To create an Arabic center for all things open source.",
      "Our Values: Collaboration, Transparency, Commitment, Responsibility and Privacy",
    ],
    blogHeading: "Latest Posts",
    ctaHeading: "Join our community",
    ctaSubtitle: "Connect with the Aosus community on our forum",
    ctaButton: "Visit the community",
  },
  ar: {
    heading: "أكبر مجتمع عربي للبرمجيات الحرة والمفتوحة",
    subtitle:
      "مجتمع أسس يهدف لنشر وإثراء ثقافة البرمجيات الحرة والمفتوحة في العالم العربي, ولتسهيل المساهمة والمشاركة فيها",
    ctaJoin: "انضم الان",
    ctaExplore: "خدمات أسس",
    stats: [
      { label: "عضو", value: "+3,000", icon: Users },
      { label: "منشور", value: "+10,000", icon: MessageSquare },
      { label: "سنين من العطاء", value: String(YEARS_ACTIVE), icon: Activity },
      { label: "موضوع", value: "+1,300", icon: Database },
    ],
    projectsHeading: "أبرز انتاجات أسس",
    projects: [
      {
        title: "خِدْمَات أسس العامة",
        desc: "في سبيل دعم الخصوصية الرقمية, وزيادة الوعي عنها, يقدم مجتمع أسس خِدْمَات عامة, توفر واجهات لمنصات معروفة مثل YouTube, TikTok, Reddit وغيرها دون أعلانات او تتبع.",
        icon: Shield,
        color: "#1d70ba",
        link: "/services",
      },
      {
        title: "المجتمع",
        desc: "أكبر جزء من مشروع أسس, وهو مخصص للجميع في مساهمه أثراء المحتوى العربي التقني المتخصص بالبرمجيات الحرة والمفتوحة.",
        icon: Server,
        color: "#008a2f",
        link: "https://discourse.aosus.org/",
      },
      {
        title: "discourse-chat-bridge",
        desc: "جسر يقوم بربط المجتمع بغرف محادثة, لتمكن المستخدمين من التفاعل مع مواضيع المجتمع من داخل منصاتهم المفضلة, دون الحاجة لزيارة موقع المجتمع.",
        icon: Cpu,
        color: "#008a2f",
        link: "https://github.com/aosus/discourse-chat-bridge",
      },
    ],
    timelineHeading: "التسلسل الزمني",
    timeline: [
      {
        year: "2015",
        title: "البداية",
        desc: "كانت البداية هي تواجد كبير على منصات التواصل الاجتماعي السريع في عدة منصات مثل الوآتس آب - WhatsApp و التيليجرام Telegram حيث أجمع العديد من الأعضاء على إنشاء مجتمع متكامل يُعنى بالبرمجيات الحرة والمفتوحة المصدر يختلف عن مجتمع لينكس العربي ويكون متفردا في الطرح والمساهمة في عالم البرمجيات الحرة والمفتوحة المصدر.",
      },
      {
        year: "2016",
        title: "إنطلاقة أسس",
        desc: "تم تأسيس أسس بواسطة مجموعة من التقنين العرب في عام ٢٠١٦ ميلادي كمجتمع متكامل للبرمجيات الحرة والمفتوحة المصدر يهدف للنشر والتوعية للناطقين باللغة العربية في جميع أقطار العالم.",
      },
      {
        year: "2016",
        title: "انعقاد أول ورشة تعريب عدة برمجيات حرة",
        desc: "تم تعريب (توطين) عدة برمجيات مفتوحة المصدر مثل منصة دسكورس (Discourse) و روكت تشات (Rocket Chat) والعديد منها بجهود من أعضاء مجتمع أسس.",
      },
      {
        year: "2017",
        title: "دعم مشاريع عربية",
        desc: "بداية أول دعم لمشاريع عربية تُعنى بالبرمجيات الحرة والمفتوحة المصدر من خلال تقديم الدعم المادي و البنية التحتية.",
      },
      {
        year: "2021",
        title: "الإندماج بين مجموعتين على منصة التيليجرام",
        desc: "إستهدف الإندماج والتوسع في ضخ دماء جديدة لديها تطلعات وطاقات للمساهمة في البرمجيات الحرة والمفتوحة المصدر، حيث تقرر دمج مجموعتي أسس ومجموعة جنو لينكس في مجموعة واحده للمثابرة في الجهود والاستمرار في النشر للمحتوى العربي.",
      },
      {
        year: "2021",
        title: "الانضمام لشبكة ماتركس",
        desc: "تبعا لهدف مجتمع أسس نشر البرمجيات المفتوحة والحرة بالعالم العربي, تبنى مجتمع أسس معيار ماتركس الغير مركزي للمحادثة في عام 2021, مع تمكين المحادثة العابرة للمنصات.",
      },
      {
        year: "2021",
        title: "بدء جائزة أسس للكتابة",
        desc: "أول جائزة من نوعها بالعالم العربي. جائزة شهرية لتحفيز كتابة محتوى حول المصادر الحرة والمفتوحة باللغة العربية. مع جوائز مالية تصل الى 1000 ريال سعودي!",
      },
      {
        year: "2022",
        title: "الانضمام لمنصة Open Collective",
        desc: "أنضم مجتمع أسس لمنصة Open Collective كاحد اوائل المشاريع العربية التي تنضم لها, لتكون لدينا استقلالية و شفافية مالية عالية. كل تكاليف و مصروفات وداعمين مجتمع أسس تظهر على Open Collective.",
      },
      {
        year: "2023",
        title: "الانضمام لمنصة Discord",
        desc: "لنصل لاكبر عدد من الناس, يحاول مشروع أسس دائما التواجد على أهم المنصات. ومنصة Discord اثبتت اهميتها بين المطورين والمهتمين بالتقنية. لذلك تم أفتتاح سيرفر خاص لمجتمع أسس, يستخدم جسور مفتوحه المصدر, تمكن النقاشات العابرة للمنصات, بحيث يمكن لمستخدم Discord التحدث مع Telegram و Matrix.",
      },
      {
        year: "2024",
        title: "أسس يحصل على تواجد قانوني كمنظمة غير ربحية في الولايات المتحدة",
        desc: "أنتقل مجتمع أسس في 2024 الى The Hack foundation كراعي قانوني, مما ممكن أسس من الحصول على تواجد قانوني كمنظمة غير ربحية مسجله بالولايات المتحدة من نوع 501(c)(3), وهذا يعطينا استقلالية اكبر بالإضافة لإمكانية أعطاء تخفيض ضريبي على التبرعات في الولايات المتحدة.",
      },
    ],
    aboutHeading: "من نحن ؟",
    aboutBody:
      "أسس مجتمع غير ربحي  أنشأت على يد مجموعة من التقنين العرب من مختلف أقطار العالم حيث ترتكز على تمكين ونشر الوعي والثقافة للبرمجيات الحرة والمفتوحة المصدر وفلسفتها باللغة العربية",
    aboutValues: [
      "هدفنا: التوعية ونشر فكرة البرمجيات الحرة والمفتوحة المصدر وفلسفتها في العالم العربي",
      "رؤيتنا: أن تكون أسس رائدة في التوعية والنشر عن حركة المصادر الحرة والمفتوحة المصدر في العالم العربي على نطاق العتاد والبرمجيات في سبيل الاعتماد وسد الاحتياجات المعرفية للتشغيل والتطوير",
      "قيمنا: التعاون والشفافية والإلتزام والمسؤولية والخصوصية",
    ],
    blogHeading: "آخر التدوينات",
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
        const homeUrl = new URL(
          getLocalizedPath(lang, "/"),
          NORMALIZED_SITE_URL,
        ).toString();
        const blogUrl = new URL(
          getLocalizedPath(lang, "/blog"),
          NORMALIZED_SITE_URL,
        ).toString();
        const socialProfiles = [
          "https://twitter.com/aosusdotorg",
          "https://bsky.app/profile/aosus.org",
          "https://mastodon.online/@aosus",
          "https://www.facebook.com/aosus1/",
          "https://www.linkedin.com/company/aosus/",
          "https://github.com/aosus",
        ];
        const structuredData = {
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              "@id": `${NORMALIZED_SITE_URL}/#organization`,
              name: lang === "ar" ? "مجتمع أسس" : "Aosus Community",
              url: NORMALIZED_SITE_URL,
              logo: `${NORMALIZED_SITE_URL}/brand/logo-symbol.svg`,
              sameAs: socialProfiles,
            },
            {
              "@type": "WebSite",
              "@id": `${NORMALIZED_SITE_URL}/#website`,
              url: NORMALIZED_SITE_URL,
              name: lang === "ar" ? "مجتمع أسس" : "Aosus Community",
              inLanguage: lang,
            },
            {
              "@type": "WebPage",
              "@id": `${homeUrl}#webpage`,
              url: homeUrl,
              name: t.heading,
              isPartOf: { "@id": `${NORMALIZED_SITE_URL}/#website` },
              about: { "@id": `${NORMALIZED_SITE_URL}/#organization` },
              inLanguage: lang,
              description: t.subtitle,
              mainEntity: { "@id": `${NORMALIZED_SITE_URL}/#organization` },
            },
          ],
        };
        const structuredDataJson = serializeJsonLd(structuredData);

        return (
          <>
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: structuredDataJson,
              }}
            />
            <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">
              <CalligraphyPattern isDark={isDark} />
              <div className="relative z-[2] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pointer-events-none">
                <div className="max-w-3xl mx-auto text-center space-y-8">
                  {/*
                    * data-calligraphy-avoid-text / data-calligraphy-avoid-buttons:
                    * CalligraphyPattern uses these elements' bounding boxes as
                    * per-element exclusion zones on mobile so random pulses never
                    * fire directly behind the headline/subtitle or the CTA buttons.
                    * Desktop hover is unrestricted and ignores these attributes.
                    */}
                  <motion.h1
                    data-calligraphy-avoid-text
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight text-gray-900 dark:text-white"
                    style={{ fontFamily: ff }}
                  >
                    {t.heading}
                  </motion.h1>

                  <motion.p
                    data-calligraphy-avoid-text
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-lg sm:text-xl max-w-2xl mx-auto text-gray-600 dark:text-gray-400"
                    style={{ fontFamily: ff }}
                  >
                    {t.subtitle}
                  </motion.p>

                  <motion.div
                    data-calligraphy-avoid-buttons
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
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
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
                        className="h-full min-w-0 overflow-hidden p-6 group cursor-default flex flex-col gap-3"
                      >
                        <stat.icon className="w-6 h-6 text-[#008a2f] opacity-50 group-hover:opacity-100 transition-all self-end shrink-0" />
                        <div className="text-2xl sm:text-3xl font-bold font-mono text-gray-900 transition-colors group-hover:text-[#008a2f] dark:text-white break-words leading-none">
                          {stat.value}
                        </div>
                        <div className="text-xs uppercase tracking-widest font-mono text-gray-400 dark:text-gray-500 leading-snug break-words">
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
                          className={`${isRtl ? "mr-12 md:mr-0" : "ml-12 md:ml-0"} md:w-[45%] ${!isLeft ? (isRtl ? "md:mr-auto" : "md:ml-auto") : ""}`}
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
                      {(dynamicPosts ?? []).map((post, i) => {
                        const isDynamic = "slug" in post;
                        const link = isDynamic
                          ? getPostPath(
                              (post as PostFrontMatter).lang,
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
                    {lang === "en" && !dynamicPosts?.length && (
                      <div className="rounded-sm border border-[#008a2f]/20 bg-[#008a2f]/5 p-4 text-sm text-gray-500 dark:text-gray-400">
                        English posts appear here once they are translated and published.
                        <Link
                          href={blogUrl.replace(NORMALIZED_SITE_URL, "")}
                          className="ml-2 font-mono text-[#008a2f] hover:underline"
                        >
                          Visit the English blog
                        </Link>
                      </div>
                    )}
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
