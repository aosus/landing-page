import React from 'react';
import { motion } from 'framer-motion';
import { PenTool, Trophy, Share2, Newspaper, CheckCircle, DollarSign, ArrowRight, AlertCircle, Terminal } from 'lucide-react';
import Layout, { CyberCard, SectionHeading, PrimaryButton, BASE, type Lang } from '../components/layout/Layout';

const CONTENT = {
  en: {
    title: 'Writing_Contest',
    subtitle: 'A contest to encourage writers to create topics about free and open-source software, enriching Arabic content.',
    sponsorNotice: 'The writing contest is currently looking for a new sponsor.',
    prizeAmount: 'Total prizes up to $250+ USD',
    supportCta: 'Support the Contest',
    steps: {
      title: 'How_to_Participate',
      items: [
        { step: '01', title: 'Publish Your Topic', desc: 'Post a topic about free software that meets the contest criteria on the Aosus community forum.', icon: PenTool },
        { step: '02', title: 'Winner Selection', desc: 'At the end of each month, the oversight committee selects the winning articles.', icon: Trophy },
        { step: '03', title: 'Announce Winners', desc: 'Winners are announced on the official Aosus community blog.', icon: Newspaper },
        { step: '04', title: 'Content Republished', desc: 'Winning articles are republished on the GnulinuxSA blog with author attribution.', icon: Share2 },
      ],
    },
    rules: {
      title: 'Rules',
      items: [
        'Topic must relate to free and open-source software.',
        'Topic must be exclusive to the contest and not copied or published elsewhere.',
        'Topic must include sufficient detail without needing external sources.',
        'Sources must be cited at the end of the topic if applicable.',
        'Topic license follows Aosus community license: CC-BY-SA 4.0.',
        'Republishing elsewhere is prohibited for at least 90 days after winning.',
        '5 topics are selected each month.',
      ],
    },
    collection: {
      title: 'Prize_Collection',
      desc: 'Aosus uses Open Collective for all financial matters, providing high financial transparency. PayPal and bank transfers are supported.',
    },
    pastWinners: {
      title: 'Announcements',
      items: [
        { title: 'Writing Contest Looking for New Sponsor', date: 'Dec 2022' },
        { title: 'October 2022 Winners Announced', date: 'Oct 2022' },
        { title: 'September 2022 Winners Announced', date: 'Sep 2022' },
      ],
    },
    cta: 'Submit Your Article',
    ctaLink: 'https://discourse.aosus.org/',
  },
  ar: {
    title: 'جائزة_الكتابة',
    subtitle: 'جائزة لتحفيز الكتّاب لكتابة مواضيع حول البرمجيات الحرة والمفتوحة، لإثراء المحتوى العربي عنها.',
    sponsorNotice: 'جائزة أسس تبحث عن راعٍ جديد.',
    prizeAmount: 'يصل مجموع الجوائز إلى أكثر من 250 دولار',
    supportCta: 'ادعم الجائزة',
    steps: {
      title: 'كيفية_المشاركة',
      items: [
        { step: '01', title: 'انشر موضوعك', desc: 'قم بنشر موضوع يهتم بالبرمجيات الحرة يوافق شروط الجائزة على مجتمع أسس.', icon: PenTool },
        { step: '02', title: 'اختيار الفائزين', desc: 'في نهاية كل شهر، سيتم اختيار المقالات الفائزة من قبل هيئة الإشراف.', icon: Trophy },
        { step: '03', title: 'الإعلان عن الفائزين', desc: 'سيتم الإعلان عن الفائزين على مدونة مجتمع أسس الرسمية.', icon: Newspaper },
        { step: '04', title: 'نقل الموضوع', desc: 'سيتم نسخ المواضيع الفائزة إلى مدونة GnulinuxSA مع إبقاء اسم الكاتب.', icon: Share2 },
      ],
    },
    rules: {
      title: 'الشروط',
      items: [
        'الموضوع يجب أن يتعلق بالمصادر الحرة.',
        'يجب أن يكون الموضوع حصري للجائزة وليس منسوخاً أو منشوراً في مصدر آخر.',
        'الموضوع يذكر تفاصيل وشرح كافي بدون الحاجة إلى مصدر خارجي.',
        'يجب تحديد المصادر في حالة وجودها في آخر الموضوع.',
        'ترخيص الموضوع يتبع لترخيص مواضيع مجتمع أسس وهو CC-BY-SA 4.0.',
        'يمنع نشر الموضوع في مصادر أخرى إلا بعد مرور 90 يوم على الأقل.',
        'يتم اختيار 5 مواضيع كل شهر.',
      ],
    },
    collection: {
      title: 'استلام_الجائزة',
      desc: 'مجتمع أسس يستخدم منصة Open Collective لكل الأمور المالية، لأنها تقدم شفافية مالية عالية. يدعم Paypal وحوالات بنكية.',
    },
    pastWinners: {
      title: 'الإعلانات',
      items: [
        { title: 'جائزة أسس للكتابة تبحث عن راعٍ جديد', date: 'ديسمبر 2022' },
        { title: 'إعلان الفائزين لشهر أكتوبر', date: 'أكتوبر 2022' },
        { title: 'إعلان فائزين شهر سبتمبر', date: 'سبتمبر 2022' },
      ],
    },
    cta: 'اكتب الآن!',
    ctaLink: 'https://discourse.aosus.org/',
  },
};

export default function WritingContestPage({ lang: langProp }: { lang?: Lang }) {
  return (
    <Layout lang={langProp}>
      {({ lang, isDark }) => {
        const t = CONTENT[lang];
        const isRtl = lang === 'ar';
        const ff = isRtl ? "'Almarai', sans-serif" : undefined;

        return (
          <div className={`min-h-screen ${isDark ? '' : 'bg-gray-50'}`}>
            <section className="relative py-24 overflow-hidden border-b border-[#008a2f]/20">
              <div className="absolute inset-0 bg-gradient-to-br from-[#008a2f]/10 to-transparent" />
              <div className="relative max-w-4xl mx-auto px-6 text-center">
                <PenTool className="w-12 h-12 mx-auto mb-6 text-[#008a2f]" />
                <h1 className="text-3xl md:text-5xl font-bold uppercase tracking-widest mb-4 font-mono" style={isRtl ? { fontFamily: "'Almarai', sans-serif" } : undefined}>
                  <span className="text-[#008a2f]">/</span> {t.title}
                </h1>
                <p className={`text-lg mb-4 max-w-2xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`} style={{ fontFamily: ff }}>{t.subtitle}</p>
                <div className="inline-flex items-center gap-2 px-4 py-2 border border-[#008a2f]/30 bg-[#008a2f]/5 text-sm font-mono text-[#008a2f] mb-4">
                  <DollarSign className="w-4 h-4" />
                  {t.prizeAmount}
                </div>
                <div className={`flex items-center justify-center gap-2 text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                  <AlertCircle className="w-4 h-4 text-yellow-500" />
                  <span style={{ fontFamily: ff }}>{t.sponsorNotice}</span>
                </div>
              </div>
            </section>

            <section className={`py-20 ${isDark ? 'bg-black/40' : 'bg-white'}`}>
              <div className="max-w-5xl mx-auto px-6">
                <SectionHeading title={t.steps.title} isDark={isDark} lang={lang} />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {t.steps.items.map((step, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                      <CyberCard isDark={isDark} className="p-6 text-center h-full" hover={false}>
                        <div className="text-2xl font-bold font-mono text-[#008a2f] mb-3">{step.step}</div>
                        <step.icon className="w-8 h-8 mx-auto mb-3 text-[#008a2f]" />
                        <h3 className="font-bold mb-2" style={{ fontFamily: ff }}>{step.title}</h3>
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`} style={{ fontFamily: ff }}>{step.desc}</p>
                      </CyberCard>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            <section className="py-20">
              <div className="max-w-4xl mx-auto px-6">
                <SectionHeading title={t.rules.title} isDark={isDark} lang={lang} />
                <CyberCard isDark={isDark} className="p-8" hover={false}>
                  <ul className="space-y-4">
                    {t.rules.items.map((rule, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="text-[#008a2f] font-mono text-sm mt-0.5">{'>'}</span>
                        <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`} style={{ fontFamily: ff }}>{rule}</span>
                      </li>
                    ))}
                  </ul>
                </CyberCard>
              </div>
            </section>

            <section className={`py-20 ${isDark ? 'bg-black/40' : 'bg-white'}`}>
              <div className="max-w-4xl mx-auto px-6">
                <SectionHeading title={t.collection.title} isDark={isDark} lang={lang} />
                <CyberCard isDark={isDark} className="p-6" hover={false}>
                  <p className={`text-sm leading-relaxed mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`} style={{ fontFamily: ff }}>{t.collection.desc}</p>
                  <a href="https://opencollective.com/aosus" target="_blank" rel="noopener noreferrer" className="text-sm font-mono text-[#008a2f] hover:underline">
                    Open Collective →
                  </a>
                </CyberCard>
              </div>
            </section>

            <section className="py-20">
              <div className="max-w-4xl mx-auto px-6">
                <SectionHeading title={t.pastWinners.title} isDark={isDark} lang={lang} />
                <div className="space-y-4">
                  {t.pastWinners.items.map((item, i) => (
                    <CyberCard key={i} isDark={isDark} className="p-4">
                      <div className={`text-xs font-mono mb-1 ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>{item.date}</div>
                      <h3 className="font-bold" style={{ fontFamily: ff }}>{item.title}</h3>
                    </CyberCard>
                  ))}
                </div>
              </div>
            </section>

            <section className={`py-16 border-t border-[#008a2f]/20 ${isDark ? 'bg-[#008a2f]/5' : 'bg-[#008a2f]/5'}`}>
              <div className="text-center">
                <PrimaryButton href={t.ctaLink} className="text-lg px-8 py-4">
                  {t.cta}
                  <ArrowRight className={`w-5 h-5 ${isRtl ? 'rotate-180' : ''}`} />
                </PrimaryButton>
              </div>
            </section>
          </div>
        );
      }}
    </Layout>
  );
}
