import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight, ArrowLeft, MessageSquare, Tag } from 'lucide-react';
import Layout, { GlassCard, BASE, type Lang } from './Layout';

const ARTICLE = {
  en: {
    breadcrumb: ['Home', 'Blog'],
    title: 'Aosus Sponsors Daydream Hackathon for School Students in Alexandria',
    date: 'Sep 18, 2025',
    author: 'FarisZR',
    tags: ['Free Software', 'Sponsorship', 'Aosus Community'],
    body: [
      'Aosus community is pleased to announce its sponsorship of the Daydream Alexandria event, to be held in Alexandria, Egypt.',
      'Daydream is a global hackathon organized by Hack Club (HCB), the fiscal sponsor of the Aosus community. The hackathon targets school students to introduce them to the basics of programming through game development.',
      'The event in Alexandria will focus specifically on free software, using open-source game engines like Godot, and encouraging the use of community and open resources instead of proprietary solutions. Participants will also upload their games to GitHub and learn how to share and publish them on itch.io.',
      'Through this sponsorship, Aosus community aims to support student movements working to spread the culture of free software in the Arab world, increase student awareness of its importance, and introduce them to it at early stages of their software journey.',
      'It is worth noting that the Aosus community has previously supported the organizing team in the Alexandria edition of the Scrapyard Vanity event.',
    ],
    supportCta: 'Support Aosus Community',
    discussCta: 'Discuss this on the Community Forum',
    prevPost: 'Contribute to Translating Firefox!',
    prevLabel: 'Previous Post',
  },
  ar: {
    breadcrumb: ['الرئيسية', 'المدونة'],
    title: 'مجتمع أسس يرعى هاكاثون Daydream لطلاب المدارس بالإسكندرية',
    date: '18 سبتمبر 2025',
    author: 'FarisZR',
    tags: ['البرمجيات الحرة', 'رعاية', 'مجتمع أسس'],
    body: [
      'يسر مجتمع أُسُس أن يعلن عن رعايته لحدث Daydream Alexandria الذي سيُقام في مدينة الإسكندرية بجمهورية مصر العربية.',
      'يُعد Daydream هاكاثونًا عالميًا تنظمه Hack Club (HCB)، الراعي المالي لمجتمع أُسُس. يستهدف الهاكاثون طلاب المدارس لتعريفهم بأساسيات البرمجة عبر تطوير وبرمجة الألعاب.',
      'سيركز الحدث في الإسكندرية بشكل خاص على البرمجيات الحرة، مع استخدام محركات ألعاب مفتوحة المصدر مثل Godot، والتشجيع على استعمال الموارد المجتمعية والمفتوحة بدلاً من الحلول المغلقة. سيقوم المشاركون أيضًا برفع ألعابهم على منصة GitHub، وسيتعلمون كيفية مشاركتها ونشرها على منصة itch.io.',
      'من خلال هذه الرعاية، يهدف مجتمع أُسُس إلى دعم الحركات الطلابية التي تعمل على نشر ثقافة البرمجيات الحرة في عالمنا العربي، وزيادة وعي الطلاب بأهميتها، وتعريفهم بها في مراحل مبكرة من مسيرتهم في عالم البرمجيات.',
      'يُذكر أن مجتمع أُسُس قد سبق له دعم الفريق المنظمة في نسخة الإسكندرية من حدث Scrapyard Vanity.',
    ],
    supportCta: 'ادعم مجتمع أسس',
    discussCta: 'علّق على الموضوع في المجتمع',
    prevPost: 'ساهم في ترجمة Firefox!',
    prevLabel: 'المقال السابق',
  },
};

export default function ArticlePage({ lang: langProp }: { lang?: Lang }) {
  return (
    <Layout lang={langProp} activePath={`${BASE}/site/blog`}>
      {({ lang, isDark }) => {
        const t = ARTICLE[lang];
        const isRtl = lang === 'ar';
        const ff = isRtl ? 'Almarai, sans-serif' : undefined;
        const BackArrow = isRtl ? ArrowRight : ArrowLeft;

        return (
          <article className={`py-24 min-h-screen ${isDark ? 'bg-[#0a0f1a]' : 'bg-[#f8f9fc]'}`}>
            <div className="max-w-3xl mx-auto px-6">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <nav className={`flex items-center gap-2 text-sm mb-8 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                  <a href={`${BASE}/site`} className="hover:text-[#008a2f] transition-colors">{t.breadcrumb[0]}</a>
                  <span>›</span>
                  <a href={`${BASE}/site/blog`} className="hover:text-[#008a2f] transition-colors">{t.breadcrumb[1]}</a>
                  <span>›</span>
                  <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>{t.title.slice(0, 40)}…</span>
                </nav>

                <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-6" style={{ fontFamily: ff }}>
                  {t.title}
                </h1>

                <div className="flex items-center gap-4 mb-8 flex-wrap">
                  <span className={`flex items-center gap-1.5 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    <User className="w-4 h-4" />
                    {t.author}
                  </span>
                  <span className={`flex items-center gap-1.5 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    <Calendar className="w-4 h-4" />
                    {t.date}
                  </span>
                </div>

                <div className={`w-full h-64 md:h-80 rounded-2xl mb-10 overflow-hidden ${isDark ? 'bg-gradient-to-br from-[#008a2f]/30 to-[#1d70ba]/20' : 'bg-gradient-to-br from-[#008a2f]/10 to-[#1d70ba]/10'} flex items-center justify-center`}>
                  <img
                    src={`${BASE}/images/hero-1.png`}
                    alt=""
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </div>

                <div className="space-y-6 mb-12">
                  {t.body.map((paragraph, i) => (
                    <p key={i} className={`text-base md:text-lg leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`} style={{ fontFamily: ff }}>
                      {paragraph}
                    </p>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2 mb-10">
                  {t.tags.map((tag, i) => (
                    <span key={i} className={`inline-flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-full ${isDark ? 'bg-white/5 text-gray-300 border border-white/10' : 'bg-gray-100 text-gray-600 border border-gray-200'}`}>
                      <Tag className="w-3 h-3" />
                      {tag}
                    </span>
                  ))}
                </div>

                <GlassCard isDark={isDark} className="p-6 mb-8" hover={false}>
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className={`font-semibold ${isDark ? 'text-gray-200' : 'text-gray-700'}`} style={{ fontFamily: ff }}>
                      {t.supportCta}
                    </p>
                    <a
                      href={`${BASE}/site/support-us`}
                      className="px-5 py-2.5 bg-[#008a2f] text-white text-sm font-medium rounded-lg hover:bg-[#006b24] transition-colors"
                    >
                      {lang === 'ar' ? 'ادعمنا' : 'Support Us'}
                    </a>
                  </div>
                </GlassCard>

                <a
                  href="https://discourse.aosus.org/"
                  className={`flex items-center gap-2 text-sm font-medium mb-12 ${isDark ? 'text-[#008a2f] hover:text-[#00c853]' : 'text-[#008a2f] hover:text-[#006b24]'} transition-colors`}
                >
                  <MessageSquare className="w-4 h-4" />
                  {t.discussCta}
                </a>

                <div className={`border-t ${isDark ? 'border-white/10' : 'border-gray-200'} pt-8`}>
                  <a href={`${BASE}/site/blog`} className={`flex items-center gap-3 group ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'} transition-colors`}>
                    <BackArrow className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    <div>
                      <div className="text-xs uppercase tracking-wider mb-0.5">{t.prevLabel}</div>
                      <div className="font-semibold" style={{ fontFamily: ff }}>{t.prevPost}</div>
                    </div>
                  </a>
                </div>
              </motion.div>
            </div>
          </article>
        );
      }}
    </Layout>
  );
}
