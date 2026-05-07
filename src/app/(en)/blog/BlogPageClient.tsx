"use client";

import React, { Suspense } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Languages, User } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Layout, {
  CyberCard,
  PrimaryButton,
  type Lang,
} from "@/components/layout/Layout";
import type { PostFrontMatter } from "@/lib/markdown";
import { getBlogIndexPath, getPostPath } from "@/lib/locale";

const POSTS_PER_PAGE = 9;

const PAGE = {
  en: {
    title: "Blog",
    subtitle: "News, tutorials, and updates from the Aosus community.",
    readMore: "Read Article",
    newer: "Newer Posts",
    older: "Older Posts",
  },
  ar: {
    title: "المدونة",
    subtitle: "أخبار ومقالات وتحديثات من مجتمع أسس.",
    readMore: "اقرأ المقال",
    newer: "التدوينات الأحدث",
    older: "التدوينات الأقدم",
  },
};

function BlogPageContent({
  posts,
  lang,
  isDark,
  currentPage,
  untranslatedNotice,
}: {
  posts: PostFrontMatter[];
  lang: Lang;
  isDark: boolean;
  currentPage: number;
  untranslatedNotice?: {
    title: string;
    description: string;
    href: string;
    cta: string;
  };
}) {
  const page = PAGE[lang];
  const isRtl = lang === "ar";
  const ff = isRtl ? "var(--font-arabic)" : undefined;
  const totalPages = Math.max(1, Math.ceil(posts.length / POSTS_PER_PAGE));
  const normalizedPage = Math.min(Math.max(currentPage, 1), totalPages);
  const visiblePosts = posts.slice(
    (normalizedPage - 1) * POSTS_PER_PAGE,
    normalizedPage * POSTS_PER_PAGE,
  );
  const previousPageHref =
    normalizedPage > 1 ? getBlogIndexPath(lang, normalizedPage - 1) : null;
  const nextPageHref =
    normalizedPage < totalPages
      ? getBlogIndexPath(lang, normalizedPage + 1)
      : null;

  return (
    <section className="min-h-screen py-24 bg-gray-50 dark:bg-transparent">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12 text-center">
          <h1
            className="text-3xl md:text-4xl font-bold uppercase tracking-widest mb-4"
            style={{
              fontFamily: isRtl ? "var(--font-arabic)" : "var(--font-mono)",
            }}
          >
            <span className="text-[#008a2f]">/</span> {page.title}
          </h1>
          <p
            className="text-base max-w-2xl text-gray-500 dark:text-gray-400 mx-auto"
            style={{ fontFamily: ff }}
          >
            {page.subtitle}
          </p>
        </div>

        {untranslatedNotice && (
          <CyberCard isDark={isDark} className="mb-12 p-6" hover={false}>
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <div className="mb-2 flex items-center gap-2 text-xs font-mono uppercase tracking-[0.3em] text-[#008a2f]">
                  <Languages className="h-4 w-4" />
                  <span>Translation note</span>
                </div>
                <h2
                  className="mb-2 text-xl font-bold text-gray-900 dark:text-white"
                  style={{ fontFamily: ff }}
                >
                  {untranslatedNotice.title}
                </h2>
                <p
                  className="text-sm leading-relaxed text-gray-500 dark:text-gray-400"
                  style={{ fontFamily: ff }}
                >
                  {untranslatedNotice.description}
                </p>
              </div>
              <PrimaryButton href={untranslatedNotice.href} className="shrink-0">
                {untranslatedNotice.cta}
                <ArrowRight className="w-4 h-4" />
              </PrimaryButton>
            </div>
          </CyberCard>
        )}

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {visiblePosts.map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
                <Link
                  href={getPostPath(
                    lang,
                    post.slug,
                    post.wpType === "post" && post.wpId === post.slug,
                  )}
                  className="block h-full"
                >
                <CyberCard
                  isDark={isDark}
                  className="group h-full cursor-pointer overflow-hidden"
                >
                  <div className="flex h-full flex-col">
                    <div className="h-56 overflow-hidden">
                      <img
                        src={post.thumbnail || post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <div className="flex items-center gap-3 mb-3 flex-wrap">
                        {post.tags[0] && (
                          <span className="text-xs font-mono uppercase tracking-wider px-2 py-0.5 border border-[#008a2f]/30 text-[#008a2f] bg-[#008a2f]/5">
                            {post.tags[0]}
                          </span>
                        )}
                        <span className="flex items-center gap-1 text-xs font-mono text-gray-400 dark:text-gray-600">
                          <Calendar className="w-3 h-3" />
                          {post.date}
                        </span>
                        <span className="flex items-center gap-1 text-xs font-mono text-gray-400 dark:text-gray-600">
                          <User className="w-3 h-3" />
                          {post.author}
                        </span>
                      </div>
                      <h2
                        className="text-xl font-bold mb-2 group-hover:text-[#008a2f] transition-colors"
                        style={{ fontFamily: ff }}
                      >
                        {post.title}
                      </h2>
                      <p
                        className="mb-4 text-sm leading-relaxed text-gray-500 dark:text-gray-400"
                        style={{ fontFamily: ff }}
                      >
                        {post.excerpt}
                      </p>
                      <span className="mt-auto flex items-center gap-1 text-sm font-mono uppercase tracking-wider text-[#008a2f] transition-all group-hover:gap-2">
                        {page.readMore}
                        <ArrowRight
                          className={`w-4 h-4 ${isRtl ? "rotate-180" : ""}`}
                        />
                      </span>
                    </div>
                  </div>
                </CyberCard>
              </Link>
            </motion.div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="mt-12 flex items-center justify-between gap-4 border-t border-[#008a2f]/10 pt-6">
            <div>
              {previousPageHref && (
                <Link
                  href={previousPageHref}
                  className="inline-flex items-center gap-2 text-sm font-mono text-[#008a2f] transition-colors hover:text-[#1d70ba]"
                >
                  <ArrowRight
                    className={`h-4 w-4 ${isRtl ? "" : "rotate-180"}`}
                  />
                  {page.newer}
                </Link>
              )}
            </div>
            <div className="text-xs font-mono tracking-widest text-gray-500 dark:text-gray-400">
              {normalizedPage} / {totalPages}
            </div>
            <div>
              {nextPageHref && (
                <Link
                  href={nextPageHref}
                  className="inline-flex items-center gap-2 text-sm font-mono text-[#008a2f] transition-colors hover:text-[#1d70ba]"
                >
                  {page.older}
                  <ArrowRight
                    className={`h-4 w-4 ${isRtl ? "rotate-180" : ""}`}
                  />
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function PaginatedBlogPageContent({
  posts,
  lang,
  isDark,
  untranslatedNotice,
}: {
  posts: PostFrontMatter[];
  lang: Lang;
  isDark: boolean;
  untranslatedNotice?: {
    title: string;
    description: string;
    href: string;
    cta: string;
  };
}) {
  const searchParams = useSearchParams();
  const requestedPage = Number(searchParams.get("page") ?? "1");
  const currentPage =
    Number.isInteger(requestedPage) && requestedPage > 0 ? requestedPage : 1;

  return (
    <BlogPageContent
      posts={posts}
      lang={lang}
      isDark={isDark}
      currentPage={currentPage}
      untranslatedNotice={untranslatedNotice}
    />
  );
}

export default function BlogPageClient({
  posts,
  lang: langProp,
  untranslatedNotice,
}: {
  posts: PostFrontMatter[];
  lang: Lang;
  untranslatedNotice?: {
    title: string;
    description: string;
    href: string;
    cta: string;
  };
}) {
  return (
    <Layout lang={langProp}>
      {({ lang, isDark }) => (
        <Suspense
          fallback={
            <BlogPageContent
              posts={posts}
              lang={lang}
              isDark={isDark}
              currentPage={1}
              untranslatedNotice={untranslatedNotice}
            />
          }
        >
          <PaginatedBlogPageContent
            posts={posts}
            lang={lang}
            isDark={isDark}
            untranslatedNotice={untranslatedNotice}
          />
        </Suspense>
      )}
    </Layout>
  );
}
