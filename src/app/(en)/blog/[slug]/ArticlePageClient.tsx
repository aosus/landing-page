"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  User,
  ArrowLeft,
  ArrowRight,
  MessageSquare,
  Tag,
} from "lucide-react";
import Link from "next/link";
import CommunityLinks from "@/components/CommunityLinks";
import Layout, {
  CyberCard,
  PrimaryButton,
  type Lang,
} from "@/components/layout/Layout";
import { CHAT_PLATFORMS, getSocialPlatforms } from "@/lib/community-platforms";
import type { Post, PostFrontMatter } from "@/lib/markdown";
import { getLocalizedPath, getPostPath } from "@/lib/locale";
import { SITE_URL } from "@/lib/rss";

const LABELS = {
  en: {
    breadcrumb: ["Home", "Blog"],
    supportCta: "Support Aosus Community",
    discussCta: "Discuss on Forum",
    prevLabel: "Previous Post",
    supportBtn: "Support Us",
  },
  ar: {
    breadcrumb: ["الرئيسية", "المدونة"],
    supportCta: "ادعم مجتمع أسس",
    discussCta: "علّق في المنتدى",
    prevLabel: "المقال السابق",
    supportBtn: "ادعمنا",
  },
};

export default function ArticlePageClient({
  post,
  prevPost,
  lang: langProp,
}: {
  post: Post;
  prevPost: PostFrontMatter | null;
  lang: Lang;
}) {
  return (
    <Layout lang={langProp}>
      {({ lang, isDark }) => {
        const t = LABELS[lang];
        const isRtl = lang === "ar";
        const ff = isRtl ? "var(--font-arabic)" : undefined;
        const socialPlatforms = getSocialPlatforms(lang);
        const BackArrow = isRtl ? ArrowRight : ArrowLeft;
        const homeLink = getLocalizedPath(lang, "/");
        const blogLink = getLocalizedPath(lang, "/blog");
        const supportLink = getLocalizedPath(lang, "/support-us");
        const articleUrl = new URL(
          getPostPath(
            lang,
            post.slug,
            post.wpType === "post" && post.wpId === post.slug,
          ),
          SITE_URL,
        ).toString();
        const articleStructuredData = {
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: t.breadcrumb[0],
                  item: new URL(homeLink, SITE_URL).toString(),
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: t.breadcrumb[1],
                  item: new URL(blogLink, SITE_URL).toString(),
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: post.title,
                  item: articleUrl,
                },
              ],
            },
            {
              "@type": "Article",
              headline: post.title,
              description: post.excerpt,
              image: [new URL(post.image, SITE_URL).toString()],
              datePublished: post.date,
              dateModified: post.date,
              author: {
                "@type": "Person",
                name: post.author,
              },
              publisher: {
                "@type": "Organization",
                name: lang === "ar" ? "مجتمع أسس" : "Aosus Community",
                logo: {
                  "@type": "ImageObject",
                  url: `${SITE_URL}/brand/logo-symbol.svg`,
                },
              },
              mainEntityOfPage: articleUrl,
              inLanguage: lang,
              keywords: post.tags.join(", "),
            },
          ],
        };

        return (
          <article className="min-h-screen py-24 bg-gray-50 dark:bg-transparent">
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify(articleStructuredData),
              }}
            />
            <div className="max-w-3xl mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <nav className="flex items-center gap-2 text-xs font-mono mb-8 text-gray-400 dark:text-gray-600">
                  <Link
                    href={homeLink}
                    className="hover:text-[#008a2f] transition-colors"
                  >
                    {t.breadcrumb[0]}
                  </Link>
                  <span className="text-[#008a2f]">/</span>
                  <Link
                    href={blogLink}
                    className="hover:text-[#008a2f] transition-colors"
                  >
                    {t.breadcrumb[1]}
                  </Link>
                  <span className="text-[#008a2f]">/</span>
                  <span className="text-gray-600 dark:text-gray-400">
                    {post.title.slice(0, 40)}…
                  </span>
                </nav>

                <h1
                  className="text-3xl md:text-4xl font-bold leading-tight mb-6"
                  style={{ fontFamily: ff }}
                >
                  {post.title}
                </h1>

                <div className="flex items-center gap-4 mb-8 flex-wrap">
                  <span className="flex items-center gap-1.5 text-sm font-mono text-gray-500 dark:text-gray-400">
                    <User className="w-4 h-4" />
                    {post.author}
                  </span>
                  <span className="flex items-center gap-1.5 text-sm font-mono text-gray-500 dark:text-gray-400">
                    <Calendar className="w-4 h-4" />
                    {post.date}
                  </span>
                </div>

                <div className="w-full h-64 md:h-80 mb-10 overflow-hidden border border-[#008a2f]/20">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div
                  className="prose prose-lg max-w-none mb-12 prose-p:text-gray-600 prose-a:text-[#008a2f] dark:prose-invert dark:prose-p:text-gray-300 dark:prose-headings:text-white"
                  style={{ fontFamily: ff }}
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />

                <div className="flex flex-wrap gap-2 mb-10">
                  {post.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1 text-xs font-mono uppercase tracking-wider px-3 py-1.5 border border-[#008a2f]/20 text-[#008a2f] bg-[#008a2f]/5"
                    >
                      <Tag className="w-3 h-3" />
                      {tag}
                    </span>
                  ))}
                </div>

                <CyberCard isDark={isDark} className="p-6 mb-8" hover={false}>
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p
                      className="font-bold text-gray-700 dark:text-gray-200"
                      style={{ fontFamily: ff }}
                    >
                      {t.supportCta}
                    </p>
                    <PrimaryButton href={supportLink}>
                      {t.supportBtn}
                    </PrimaryButton>
                  </div>
                </CyberCard>

                
                <div className="flex flex-col sm:flex-row gap-6 mb-12">
                  <CyberCard isDark={isDark} className="flex-1 p-4" hover={false}>
                    <div className="flex flex-col sm:flex-row items-center gap-3">
                      <h3 className="font-mono text-sm uppercase tracking-wider text-[#008a2f] whitespace-nowrap shrink-0 self-start sm:self-auto">
                        <span className="opacity-50">/</span> {lang === "ar" ? "غرف المحادثة" : "Chat Rooms"}
                      </h3>
                      <CommunityLinks
                        platforms={CHAT_PLATFORMS}
                        size="sm"
                        className="w-full justify-start sm:ms-auto sm:w-auto sm:justify-end sm:flex-nowrap"
                      />
                    </div>
                  </CyberCard>

                  <CyberCard isDark={isDark} className="flex-1 p-4" hover={false}>
                    <div className="flex flex-col sm:flex-row items-center gap-3">
                      <h3 className="font-mono text-sm uppercase tracking-wider text-[#008a2f] whitespace-nowrap shrink-0 self-start sm:self-auto">
                        <span className="opacity-50">/</span> {lang === "ar" ? "تابعنا" : "Follow Us"}
                      </h3>
                      <CommunityLinks
                        platforms={socialPlatforms}
                        size="sm"
                        className="w-full justify-start sm:ms-auto sm:w-auto sm:justify-end sm:flex-nowrap"
                      />
                    </div>
                  </CyberCard>
                </div>

                <a
                  href="https://discourse.aosus.org/"
                  className="flex items-center gap-2 text-sm font-mono uppercase tracking-wider text-[#008a2f] hover:underline mb-12"
                >
                  <MessageSquare className="w-4 h-4" />
                  {t.discussCta}
                </a>

                {prevPost && (
                  <div className="border-t border-[#008a2f]/20 pt-8">
                    <Link
                      href={getPostPath(
                        lang,
                        prevPost.slug,
                        prevPost.wpType === "post" && prevPost.wpId === prevPost.slug,
                      )}
                      className="flex items-center gap-3 text-gray-500 transition-colors group hover:text-[#008a2f] dark:text-gray-400"
                    >
                      <BackArrow className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                      <div>
                        <div className="text-xs uppercase tracking-wider font-mono mb-0.5">
                          {t.prevLabel}
                        </div>
                        <div className="font-bold" style={{ fontFamily: ff }}>
                          {prevPost.title}
                        </div>
                      </div>
                    </Link>
                  </div>
                )}
              </motion.div>
            </div>
          </article>
        );
      }}
    </Layout>
  );
}
