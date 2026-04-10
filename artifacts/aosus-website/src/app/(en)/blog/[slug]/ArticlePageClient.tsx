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
import Layout, {
  CyberCard,
  PrimaryButton,
  type Lang,
} from "@/components/layout/Layout";
import type { Post, PostFrontMatter } from "@/lib/markdown";

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
        const ff = isRtl ? "'Almarai', sans-serif" : undefined;
        const BackArrow = isRtl ? ArrowRight : ArrowLeft;
        const homeLink = lang === "ar" ? "/ar" : "/";
        const blogLink = lang === "ar" ? "/ar/blog" : "/blog";
        const supportLink =
          lang === "ar" ? "/ar/support-us" : "/support-us";

        return (
          <article
            className={`py-24 min-h-screen ${isDark ? "" : "bg-gray-50"}`}
          >
            <div className="max-w-3xl mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <nav
                  className={`flex items-center gap-2 text-xs font-mono mb-8 ${isDark ? "text-gray-600" : "text-gray-400"}`}
                >
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
                  <span className={isDark ? "text-gray-400" : "text-gray-600"}>
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
                  <span
                    className={`flex items-center gap-1.5 text-sm font-mono ${isDark ? "text-gray-400" : "text-gray-500"}`}
                  >
                    <User className="w-4 h-4" />
                    {post.author}
                  </span>
                  <span
                    className={`flex items-center gap-1.5 text-sm font-mono ${isDark ? "text-gray-400" : "text-gray-500"}`}
                  >
                    <Calendar className="w-4 h-4" />
                    {post.date}
                  </span>
                </div>

                <div className="w-full h-64 md:h-80 mb-10 overflow-hidden border border-[#008a2f]/20">
                  <img
                    src={post.thumbnail}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>

                <div
                  className={`prose prose-lg max-w-none mb-12 ${
                    isDark
                      ? "prose-invert prose-p:text-gray-300 prose-headings:text-white prose-a:text-[#008a2f]"
                      : "prose-p:text-gray-600 prose-a:text-[#008a2f]"
                  }`}
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

                <CyberCard
                  isDark={isDark}
                  className="p-6 mb-8"
                  hover={false}
                >
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p
                      className={`font-bold ${isDark ? "text-gray-200" : "text-gray-700"}`}
                      style={{ fontFamily: ff }}
                    >
                      {t.supportCta}
                    </p>
                    <PrimaryButton href={supportLink}>
                      {t.supportBtn}
                    </PrimaryButton>
                  </div>
                </CyberCard>

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
                      href={`${blogLink}/${prevPost.slug}`}
                      className={`flex items-center gap-3 group ${isDark ? "text-gray-400 hover:text-[#008a2f]" : "text-gray-500 hover:text-[#008a2f]"} transition-colors`}
                    >
                      <BackArrow className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                      <div>
                        <div className="text-xs uppercase tracking-wider font-mono mb-0.5">
                          {t.prevLabel}
                        </div>
                        <div
                          className="font-bold"
                          style={{ fontFamily: ff }}
                        >
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
