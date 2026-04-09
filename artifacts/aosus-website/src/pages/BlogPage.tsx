import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, User } from 'lucide-react';
import { Link } from 'wouter';
import Layout, { CyberCard, SectionHeading, BASE, type Lang } from '../components/layout/Layout';

const POSTS = {
  en: [
    { title: 'Aosus Sponsors Daydream Hackathon for School Students in Alexandria', date: 'Sep 18, 2025', author: 'FarisZR', tag: 'Community', excerpt: 'Aosus sponsors the Daydream hackathon in Alexandria, introducing school students to free and open-source software through game development with the Godot engine.', link: `/article`, thumb: `${BASE}/images/hero-1.png` },
    { title: 'Contribute to Translating Firefox!', date: 'Sep 2025', author: 'FarisZR', tag: 'Open Source', excerpt: 'Do you use Firefox and want to improve its Arabic support? Mozilla needs your help! The browser needs contributions to improve Arabic language support.', link: '#', thumb: `${BASE}/images/hero-2.png` },
    { title: 'Piped Service Discontinuation', date: 'Aug 2025', author: 'FarisZR', tag: 'Services', excerpt: 'The Piped service in the Aosus community has been facing playback issues. We are announcing the upcoming discontinuation of the service.', link: '#', thumb: `${BASE}/images/hero-3.png` },
    { title: 'Aosus Partners with Hack Club Foundation', date: 'Jun 2024', author: 'FarisZR', tag: 'Community', excerpt: 'Aosus is now fiscally sponsored by The Hack Foundation, gaining 501(c)(3) nonprofit status for tax-deductible donations.', link: '#', thumb: `${BASE}/images/hero-4.png` },
    { title: 'Writing Contest: October Winners Announced', date: 'Oct 2022', author: 'FarisZR', tag: 'Writing Contest', excerpt: 'Valuable and detailed topics on free and open-source software win the Aosus Writing Award for October!', link: '#', thumb: `${BASE}/images/hero-5.png` },
    { title: 'Writing Contest: September Winners', date: 'Sep 2022', author: 'FarisZR', tag: 'Writing Contest', excerpt: '5 detailed topics on free and open-source software, this time also about web technologies!', link: '#', thumb: `${BASE}/images/hero-1.png` },
  ],
  ar: [
    { title: 'مجتمع أسس يرعى هاكاثون Daydream لطلاب المدارس بالإسكندرية', date: '18 سبتمبر 2025', author: 'FarisZR', tag: 'المجتمع', excerpt: 'يسر مجتمع أُسُس أن يعلن عن رعايته لحدث Daydream Alexandria الذي سيُقام في مدينة الإسكندرية.', link: `/ar/article`, thumb: `${BASE}/images/hero-1.png` },
    { title: 'ساهم في ترجمة Firefox!', date: 'سبتمبر 2025', author: 'FarisZR', tag: 'مصادر مفتوحة', excerpt: 'هل تستخدم Firefox وتريد تحسين دعمه للعربية؟ Mozilla تحتاج مساعدتك!', link: '#', thumb: `${BASE}/images/hero-2.png` },
    { title: 'إيقاف خدمة Piped', date: 'أغسطس 2025', author: 'FarisZR', tag: 'خدمات', excerpt: 'خدمة Piped في مجتمع أسس تواجه مشاكل في التشغيل. نعلن عن الإيقاف القريب للخدمة.', link: '#', thumb: `${BASE}/images/hero-3.png` },
    { title: 'أسس تتشارك مع مؤسسة Hack Club', date: 'يونيو 2024', author: 'FarisZR', tag: 'المجتمع', excerpt: 'أسس الآن مستضاف مالياً من The Hack Foundation، وحصل على صفة منظمة غير ربحية.', link: '#', thumb: `${BASE}/images/hero-4.png` },
    { title: 'إعلان الفائزين بجائزة الكتابة لشهر أكتوبر', date: 'أكتوبر 2022', author: 'FarisZR', tag: 'جائزة الكتابة', excerpt: 'مواضيع قيمة ومفصلة حول البرمجيات الحرة والمفتوحة تفوز بجائزة أسس للكتابة!', link: '#', thumb: `${BASE}/images/hero-5.png` },
    { title: 'إعلان فائزين شهر سبتمبر', date: 'سبتمبر 2022', author: 'FarisZR', tag: 'جائزة الكتابة', excerpt: '5 مواضيع مفصلة حول البرمجيات الحرة والمفتوحة، هذه المرة أيضاً عن تقنيات الويب!', link: '#', thumb: `${BASE}/images/hero-1.png` },
  ],
};

const PAGE = {
  en: { title: 'Blog', subtitle: 'News, tutorials, and updates from the Aosus community.', readMore: 'Read Article' },
  ar: { title: 'المدونة', subtitle: 'أخبار ومقالات وتحديثات من مجتمع أسس.', readMore: 'اقرأ المقال' },
};

export default function BlogPage({ lang: langProp }: { lang?: Lang }) {
  return (
    <Layout lang={langProp}>
      {({ lang, isDark }) => {
        const posts = POSTS[lang];
        const page = PAGE[lang];
        const isRtl = lang === 'ar';
        const ff = isRtl ? "'Almarai', sans-serif" : undefined;

        return (
          <section className={`py-24 min-h-screen ${isDark ? '' : 'bg-gray-50'}`}>
            <div className="max-w-5xl mx-auto px-6">
              <SectionHeading title={page.title} subtitle={page.subtitle} isDark={isDark} lang={lang} />

              <div className="space-y-6">
                {posts.map((post, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link href={post.link} className="block">
                      <CyberCard isDark={isDark} className="group cursor-pointer overflow-hidden">
                        <div className="flex flex-col md:flex-row">
                          <div className="md:w-64 md:flex-shrink-0 h-48 md:h-auto overflow-hidden">
                            <img
                              src={post.thumb}
                              alt={post.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                          <div className="p-6 flex-1">
                            <div className="flex items-center gap-3 mb-3 flex-wrap">
                              <span className="text-xs font-mono uppercase tracking-wider px-2 py-0.5 border border-[#008a2f]/30 text-[#008a2f] bg-[#008a2f]/5">
                                {post.tag}
                              </span>
                              <span className={`flex items-center gap-1 text-xs font-mono ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
                                <Calendar className="w-3 h-3" />
                                {post.date}
                              </span>
                              <span className={`flex items-center gap-1 text-xs font-mono ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
                                <User className="w-3 h-3" />
                                {post.author}
                              </span>
                            </div>
                            <h2 className="text-xl font-bold mb-2 group-hover:text-[#008a2f] transition-colors" style={{ fontFamily: ff }}>
                              {post.title}
                            </h2>
                            <p className={`text-sm leading-relaxed mb-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} style={{ fontFamily: ff }}>
                              {post.excerpt}
                            </p>
                            <span className="text-sm font-mono uppercase tracking-wider text-[#008a2f] flex items-center gap-1 group-hover:gap-2 transition-all">
                              {page.readMore}
                              <ArrowRight className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
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
