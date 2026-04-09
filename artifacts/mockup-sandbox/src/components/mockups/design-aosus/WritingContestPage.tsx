import React from 'react';
import { motion } from 'framer-motion';
import { PenTool, Trophy, Share2, Newspaper, CheckCircle, DollarSign, ArrowRight, AlertCircle } from 'lucide-react';
import Layout, { GlassCard, SectionHeading, PrimaryButton, SecondaryButton, BASE, type Lang } from './Layout';

const CONTENT = {
  en: {
    title: 'Aosus Writing Contest',
    subtitle: 'A contest to encourage writers to create topics about free and open-source software, enriching Arabic content.',
    sponsorNotice: 'The writing contest is currently looking for a new sponsor.',
    prizeAmount: 'Total prizes up to $250+ USD!',
    supportCta: 'Support the Contest',
    steps: {
      title: 'How to Participate',
      items: [
        { step: 'Step 1', title: 'Publish Your Topic', desc: 'Post a topic about free software that meets the contest criteria on the Aosus community forum.', icon: PenTool },
        { step: 'Step 2', title: 'Winner Selection', desc: 'At the end of each month, the contest oversight committee selects the winning articles and contacts the winners.', icon: Trophy },
        { step: 'Step 3', title: 'Announce Winners', desc: 'Winners are announced on the official Aosus community blog at the end of each month.', icon: Newspaper },
        { step: 'Step 4', title: 'Content Republished', desc: 'Winning articles are republished on the GnulinuxSA blog with the author\'s name and personal information.', icon: Share2 },
      ],
    },
    rules: {
      title: 'Contest Rules',
      items: [
        'Topic must relate to free and open-source software.',
        'Topic must be exclusive to the contest and not copied or published elsewhere.',
        'Topic must include sufficient detail and explanation without needing external sources.',
        'Sources must be cited at the end of the topic if applicable.',
        'Topic license follows Aosus community license: CC-BY-SA 4.0.',
        'Republishing elsewhere is prohibited for at least 90 days after winning.',
        '5 topics are selected each month.',
      ],
    },
    collection: {
      title: 'Prize Collection',
      desc: 'Aosus uses Open Collective for all financial matters, providing high financial transparency. PayPal and bank transfers are supported in select countries.',
    },
    pastWinners: {
      title: 'Past Announcements',
      items: [
        { title: 'Writing Contest Looking for New Sponsor', date: 'Dec 2022', desc: 'After more than a year of the contest, which produced content that pushed Arabic FOSS content to a new level.' },
        { title: 'October 2022 Winners Announced', date: 'Oct 2022', desc: 'Valuable and detailed topics on free and open-source software win the writing award!' },
        { title: 'September 2022 Winners Announced', date: 'Sep 2022', desc: '5 detailed topics on free and open-source software, this time about web technologies too!' },
      ],
    },
    cta: 'Submit Your Article',
    ctaLink: 'https://discourse.aosus.org/',
  },
  ar: {
    title: 'جائزة أسس للكتابة',
    subtitle: 'جائزة لتحفيز الكتّاب لكتابة مواضيع حول البرمجيات الحرة والمفتوحة، لإثراء المحتوى العربي عنها.',
    sponsorNotice: 'جائزة أسس تبحث عن راعٍ جديد.',
    prizeAmount: 'يصل مجموع جوائز الجائزة إلى أكثر من 250 دولار أمريكي!',
    supportCta: 'ادعم الجائزة',
    steps: {
      title: 'كيفية المشاركة في الجائزة',
      items: [
        { step: 'الخطوة الأولى', title: 'انشر موضوعك', desc: 'قم بنشر موضوع يهتم بالبرمجيات الحرة يوافق شروط الجائزة على مجتمع أسس.', icon: PenTool },
        { step: 'الخطوة الثانية', title: 'اختيار الفائزين', desc: 'في نهاية كل شهر، سيتم اختيار المقالات الفائزة من قبل هيئة الإشراف على الجائزة والتواصل مع الفائزين.', icon: Trophy },
        { step: 'الخطوة الثالثة', title: 'الإعلان عن الفائزين', desc: 'سيتم الإعلان عن الفائزين على مدونة مجتمع أسس الرسمية في نهاية كل شهر.', icon: Newspaper },
        { step: 'الخطوة الرابعة', title: 'نقل الموضوع', desc: 'سيتم نسخ المواضيع الفائزة إلى مدونة GnulinuxSA مع إبقاء اسم الكاتب ومعلوماته الشخصية.', icon: Share2 },
      ],
    },
    rules: {
      title: 'شروط الجائزة',
      items: [
        'الموضوع يجب أن يتعلق بالمصادر الحرة.',
        'يجب أن يكون الموضوع حصري للجائزة وليس منسوخاً أو منشوراً في مصدر آخر.',
        'الموضوع يذكر تفاصيل وشرح كافي بدون الحاجة إلى مصدر خارجي.',
        'يجب تحديد المصادر في حالة وجودها في آخر الموضوع.',
        'ترخيص الموضوع يتبع لترخيص مواضيع مجتمع أسس وهو CC-BY-SA 4.0.',
        'يمنع نشر الموضوع في مصادر أخرى إلا بعد مرور 90 يوم على الأقل من الفوز بالجائزة.',
        'يتم اختيار 5 مواضيع كل شهر.',
      ],
    },
    collection: {
      title: 'استلام الجائزة',
      desc: 'مجتمع أسس يستخدم منصة Open Collective لكل الأمور المالية، لأنها تقدم شفافية مالية عالية. يدعم Paypal وحوالات بنكية في دول محدودة.',
    },
    pastWinners: {
      title: 'إعلانات الجائزة',
      items: [
        { title: 'جائزة أسس للكتابة تبحث عن راعٍ جديد', date: 'ديسمبر 2022', desc: 'بعد أكثر من سنة من إطلاق الجائزة التي قدمت محتوى دفع المحتوى العربي حول البرمجيات المفتوحة إلى مستوى جديد.' },
        { title: 'إعلان الفائزين لشهر أكتوبر', date: 'أكتوبر 2022', desc: 'مواضيع قيمة ومفصلة حول البرمجيات الحرة والمفتوحة تفوز بجائزة أسس للكتابة!' },
        { title: 'إعلان فائزين شهر سبتمبر', date: 'سبتمبر 2022', desc: '5 مواضيع مفصلة حول البرمجيات الحرة والمفتوحة، هذه المرة أيضاً عن تقنيات الويب!' },
      ],
    },
    cta: 'اكتب الآن!',
    ctaLink: 'https://discourse.aosus.org/',
  },
};

export default function WritingContestPage({ lang: langProp }: { lang?: Lang }) {
  return (
    <Layout lang={langProp} activePath={`${BASE}/site/writing-contest`}>
      {({ lang, isDark }) => {
        const t = CONTENT[lang];
        const isRtl = lang === 'ar';
        const ff = isRtl ? 'Almarai, sans-serif' : undefined;

        return (
          <div className={`min-h-screen ${isDark ? 'bg-[#0a0f1a]' : 'bg-[#f8f9fc]'}`}>
            <section className="relative py-24 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#008a2f] to-[#006520]" />
              <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white/5 blur-3xl" />
              <div className="relative max-w-4xl mx-auto px-6 text-center text-white">
                <PenTool className="w-12 h-12 mx-auto mb-6 opacity-80" />
                <h1 className="text-3xl md:text-5xl font-bold mb-4" style={{ fontFamily: ff }}>{t.title}</h1>
                <p className="text-lg text-white/80 mb-4 max-w-2xl mx-auto" style={{ fontFamily: ff }}>{t.subtitle}</p>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-sm font-medium border border-white/20 mb-6">
                  <DollarSign className="w-4 h-4" />
                  {t.prizeAmount}
                </div>
                <div className="flex items-center justify-center gap-2 text-sm text-white/70">
                  <AlertCircle className="w-4 h-4" />
                  <span style={{ fontFamily: ff }}>{t.sponsorNotice}</span>
                </div>
              </div>
            </section>

            <section className={`py-20 ${isDark ? 'bg-[#0d1220]' : 'bg-white'}`}>
              <div className="max-w-5xl mx-auto px-6">
                <SectionHeading title={t.steps.title} isDark={isDark} lang={lang} />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {t.steps.items.map((step, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                      <GlassCard isDark={isDark} className="p-6 text-center h-full" hover={false}>
                        <div className="text-xs font-bold text-[#008a2f] uppercase tracking-wider mb-3">{step.step}</div>
                        <step.icon className="w-8 h-8 mx-auto mb-3 text-[#008a2f]" />
                        <h3 className="font-bold mb-2" style={{ fontFamily: ff }}>{step.title}</h3>
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`} style={{ fontFamily: ff }}>{step.desc}</p>
                      </GlassCard>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            <section className={`py-20 ${isDark ? 'bg-[#0a0f1a]' : 'bg-[#f8f9fc]'}`}>
              <div className="max-w-4xl mx-auto px-6">
                <SectionHeading title={t.rules.title} isDark={isDark} lang={lang} />
                <GlassCard isDark={isDark} className="p-8" hover={false}>
                  <ul className="space-y-4">
                    {t.rules.items.map((rule, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-[#008a2f] flex-shrink-0 mt-0.5" />
                        <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`} style={{ fontFamily: ff }}>{rule}</span>
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              </div>
            </section>

            <section className={`py-20 ${isDark ? 'bg-[#0d1220]' : 'bg-white'}`}>
              <div className="max-w-4xl mx-auto px-6">
                <SectionHeading title={t.collection.title} isDark={isDark} lang={lang} />
                <GlassCard isDark={isDark} className="p-6" hover={false}>
                  <p className={`text-sm leading-relaxed mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`} style={{ fontFamily: ff }}>{t.collection.desc}</p>
                  <a href="https://opencollective.com/aosus" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-[#008a2f] hover:underline">
                    Open Collective →
                  </a>
                </GlassCard>
              </div>
            </section>

            <section className={`py-20 ${isDark ? 'bg-[#0a0f1a]' : 'bg-[#f8f9fc]'}`}>
              <div className="max-w-4xl mx-auto px-6">
                <SectionHeading title={t.pastWinners.title} isDark={isDark} lang={lang} />
                <div className="space-y-4">
                  {t.pastWinners.items.map((item, i) => (
                    <GlassCard key={i} isDark={isDark} className="p-6">
                      <div className={`text-xs font-medium mb-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{item.date}</div>
                      <h3 className="font-bold mb-1" style={{ fontFamily: ff }}>{item.title}</h3>
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`} style={{ fontFamily: ff }}>{item.desc}</p>
                    </GlassCard>
                  ))}
                </div>
              </div>
            </section>

            <section className={`py-16 ${isDark ? 'bg-[#0d1220]' : 'bg-white'}`}>
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
