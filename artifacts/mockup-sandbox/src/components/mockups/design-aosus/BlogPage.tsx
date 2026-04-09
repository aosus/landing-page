import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, User, Tag } from 'lucide-react';
import Layout, { GlassCard, SectionHeading, BASE, type Lang } from './Layout';

const POSTS = {
  en: [
    { title: 'Aosus Sponsors Daydream Hackathon for School Students in Alexandria', date: 'Sep 18, 2025', author: 'FarisZR', tag: 'Community', excerpt: 'Aosus sponsors the Daydream hackathon in Alexandria, introducing school students to free and open-source software through game development with the Godot engine.', link: `${BASE}/site/article` },
    { title: 'Contribute to Translating Firefox!', date: 'Sep 2025', author: 'FarisZR', tag: 'Open Source', excerpt: 'Do you use Firefox and want to improve its Arabic support? Mozilla needs your help! The browser needs contributions to improve Arabic language support.', link: '#' },
    { title: 'Piped Service Discontinuation', date: 'Aug 2025', author: 'FarisZR', tag: 'Services', excerpt: 'The Piped service in the Aosus community has been facing playback issues. We are announcing the upcoming discontinuation of the service.', link: '#' },
    { title: 'Aosus Partners with Hack Club Foundation', date: 'Jun 2024', author: 'FarisZR', tag: 'Community', excerpt: 'Aosus is now fiscally sponsored by The Hack Foundation, gaining 501(c)(3) nonprofit status for tax-deductible donations.', link: '#' },
    { title: 'Writing Contest: October Winners Announced', date: 'Oct 2022', author: 'FarisZR', tag: 'Writing Contest', excerpt: 'Valuable and detailed topics on free and open-source software win the Aosus Writing Award for October!', link: '#' },
    { title: 'Writing Contest: September Winners', date: 'Sep 2022', author: 'FarisZR', tag: 'Writing Contest', excerpt: '5 detailed topics on free and open-source software, this time also about web technologies!', link: '#' },
  ],
  ar: [
    { title: 'مجتمع أسس يرعى هاكاثون Daydream لطلاب المدارس بالإسكندرية', date: '18 سبتمبر 2025', author: 'FarisZR', tag: 'المجتمع', excerpt: 'يسر مجتمع أُسُس أن يعلن عن رعايته لحدث Daydream Alexandria الذي سيُقام في مدينة الإسكندرية. يُعد Daydream هاكاثونًا عالميًا تنظمه Hack Club.', link: `${BASE}/site/article` },
    { title: 'ساهم في ترجمة Firefox!', date: 'سبتمبر 2025', author: 'FarisZR', tag: 'مصادر مفتوحة', excerpt: 'هل تستخدم Firefox وتريد تحسين دعمه للعربية؟ Mozilla تحتاج مساعدتك! المتصفح يحتاج لمساهمات لتحسين دعم اللغة العربية.', link: '#' },
    { title: 'إيقاف خدمة Piped', date: 'أغسطس 2025', author: 'FarisZR', tag: 'خدمات', excerpt: 'خدمة Piped في مجتمع أسس تواجه مشاكل في التشغيل. نعلن عن الإيقاف القريب للخدمة.', link: '#' },
    { title: 'أسس تتشارك مع مؤسسة Hack Club', date: 'يونيو 2024', author: 'FarisZR', tag: 'المجتمع', excerpt: 'أسس الآن مستضاف مالياً من The Hack Foundation، وحصل على صفة منظمة غير ربحية 501(c)(3) للتبرعات المعفاة ضريبياً.', link: '#' },
    { title: 'إعلان الفائزين بجائزة الكتابة لشهر أكتوبر', date: 'أكتوبر 2022', author: 'FarisZR', tag: 'جائزة الكتابة', excerpt: 'مواضيع قيمة ومفصلة حول البرمجيات الحرة والمفتوحة تفوز بجائزة أسس للكتابة لشهر أكتوبر!', link: '#' },
    { title: 'إعلان فائزين شهر سبتمبر', date: 'سبتمبر 2022', author: 'FarisZR', tag: 'جائزة الكتابة', excerpt: '5 مواضيع مفصلة حول البرمجيات الحرة والمفتوحة، هذه المرة أيضاً عن تقنيات الويب!', link: '#' },
  ],
};

const PAGE = {
  en: { title: 'Blog', subtitle: 'News, tutorials, and updates from the Aosus community.', readMore: 'Read Article' },
  ar: { title: 'المدونة', subtitle: 'أخبار ومقالات وتحديثات من مجتمع أسس.', readMore: 'اقرأ المقال' },
};

export default function BlogPage({ lang: langProp }: { lang?: Lang }) {
  return (
    <Layout lang={langProp} activePath={`${BASE}/site/blog`}>
      {({ lang, isDark }) => {
        const posts = POSTS[lang];
        const page = PAGE[lang];
        const isRtl = lang === 'ar';
        const ff = isRtl ? 'Almarai, sans-serif' : undefined;

        return (
          <section className={`py-24 min-h-screen ${isDark ? 'bg-[#0a0f1a]' : 'bg-[#f8f9fc]'}`}>
            <div className="max-w-4xl mx-auto px-6">
              <SectionHeading title={page.title} subtitle={page.subtitle} isDark={isDark} lang={lang} />

              <div className="space-y-6">
                {posts.map((post, i) => (
                  <motion.a
                    key={i}
                    href={post.link}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="block"
                  >
                    <GlassCard isDark={isDark} className="p-6 group cursor-pointer">
                      <div className="flex items-center gap-3 mb-3 flex-wrap">
                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${isDark ? 'bg-[#008a2f]/15 text-[#00c853]' : 'bg-[#008a2f]/10 text-[#008a2f]'}`}>
                          {post.tag}
                        </span>
                        <span className={`flex items-center gap-1 text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                          <Calendar className="w-3 h-3" />
                          {post.date}
                        </span>
                        <span className={`flex items-center gap-1 text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
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
                      <span className="text-sm font-medium text-[#008a2f] flex items-center gap-1 group-hover:gap-2 transition-all">
                        {page.readMore}
                        <ArrowRight className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
                      </span>
                    </GlassCard>
                  </motion.a>
                ))}
              </div>
            </div>
          </section>
        );
      }}
    </Layout>
  );
}
