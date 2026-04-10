"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, User } from "lucide-react";
import Link from "next/link";
import Layout, {
  CyberCard,
  SectionHeading,
  type Lang,
} from "@/components/layout/Layout";
import type { PostFrontMatter } from "@/lib/markdown";

const PAGE = {
  en: {
    title: "Blog",
    subtitle: "News, tutorials, and updates from the Aosus community.",
    readMore: "Read Article",
  },
  ar: {
    title: "المدونة",
    subtitle: "أخبار ومقالات وتحديثات من مجتمع أسس.",
    readMore: "اقرأ المقال",
  },
};

export default function BlogPageClient({
  posts,
  lang: langProp,
}: {
  posts: PostFrontMatter[];
  lang: Lang;
}) {
  return (
    <Layout lang={langProp}>
      {({ lang, isDark }) => {
        const page = PAGE[lang];
        const isRtl = lang === "ar";
        const ff = isRtl ? "'Almarai', sans-serif" : undefined;
        const blogBase = lang === "ar" ? "/ar/blog" : "/blog";

        return (
          <section
            className={`py-24 min-h-screen ${isDark ? "" : "bg-gray-50"}`}
          >
            <div className="max-w-5xl mx-auto px-6">
              <SectionHeading
                title={page.title}
                subtitle={page.subtitle}
                isDark={isDark}
                lang={lang}
              />

              <div className="space-y-6">
                {posts.map((post, i) => (
                  <motion.div
                    key={post.slug}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={`${blogBase}/${post.slug}`}
                      className="block"
                    >
                      <CyberCard
                        isDark={isDark}
                        className="group cursor-pointer overflow-hidden"
                      >
                        <div className="flex flex-col md:flex-row">
                          <div className="md:w-64 md:flex-shrink-0 h-48 md:h-auto overflow-hidden">
                            <img
                              src={post.thumbnail}
                              alt={post.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                          <div className="p-6 flex-1">
                            <div className="flex items-center gap-3 mb-3 flex-wrap">
                              {post.tags[0] && (
                                <span className="text-xs font-mono uppercase tracking-wider px-2 py-0.5 border border-[#008a2f]/30 text-[#008a2f] bg-[#008a2f]/5">
                                  {post.tags[0]}
                                </span>
                              )}
                              <span
                                className={`flex items-center gap-1 text-xs font-mono ${isDark ? "text-gray-600" : "text-gray-400"}`}
                              >
                                <Calendar className="w-3 h-3" />
                                {post.date}
                              </span>
                              <span
                                className={`flex items-center gap-1 text-xs font-mono ${isDark ? "text-gray-600" : "text-gray-400"}`}
                              >
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
                              className={`text-sm leading-relaxed mb-4 ${isDark ? "text-gray-400" : "text-gray-500"}`}
                              style={{ fontFamily: ff }}
                            >
                              {post.excerpt}
                            </p>
                            <span className="text-sm font-mono uppercase tracking-wider text-[#008a2f] flex items-center gap-1 group-hover:gap-2 transition-all">
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
            </div>
          </section>
        );
      }}
    </Layout>
  );
}
