import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Github, ExternalLink, CreditCard, Globe, Terminal } from 'lucide-react';
import Layout, { CyberCard, SectionHeading, PrimaryButton, BASE, type Lang } from '../components/layout/Layout';

const CONTENT = {
  en: {
    title: 'Support_Us',
    subtitle: 'Help Aosus continue its mission to promote free and open-source software in the Arabic world.',
    donateTitle: 'Donate_Directly',
    donateDesc: 'Aosus is fiscally sponsored by The Hack Foundation (d.b.a. Hack Club), a 501(c)(3) nonprofit (EIN: 81-2908499). Your donations are tax-deductible in the United States.',
    monthly: 'Monthly',
    donateButton: 'Donate via HCB',
    donateLink: 'https://hcb.hackclub.com/donations/start/aosus',
    financialRecords: 'View Financial Records',
    financialLink: 'https://hcb.hackclub.com/aosus',
    githubTitle: 'GitHub Sponsors',
    githubDesc: 'Sponsor Aosus on GitHub and get a badge showing your support for the community.',
    githubLink: 'https://github.com/sponsors/aosus',
    referrals: {
      title: 'Referral_Links',
      subtitle: 'Support Aosus at no extra cost by using our referral links.',
      items: [
        { name: 'Hetzner Cloud', desc: 'Get 20 EUR credit on Hetzner Cloud when you use this referral link.', link: 'https://hetzner.cloud/?ref=3IzL1OLbBdrT', color: '#d50c2d' },
        { name: 'Netcup', desc: 'Referral link that supports Aosus community on the Netcup hosting platform.', link: 'https://www.netcup.de/?ref=228088', color: '#1d70ba' },
      ],
    },
    impactTitle: 'Your_Impact',
    impacts: [
      'Hosting privacy-respecting services for the community',
      'Sponsoring student hackathons and events',
      'Running the writing contest for Arabic FOSS content',
      'Maintaining the Discourse community forum',
      'Developing open-source tools like the Chat Bridge',
    ],
  },
  ar: {
    title: 'ادعمنا',
    subtitle: 'ساعد أسس في مواصلة مهمتها لتعزيز البرمجيات الحرة والمفتوحة المصدر في العالم العربي.',
    donateTitle: 'تبرع_مباشرة',
    donateDesc: 'أسس مستضاف مالياً من The Hack Foundation (المعروفة باسم Hack Club)، منظمة غير ربحية من نوع 501(c)(3) (رقم EIN: 81-2908499). تبرعاتك معفاة ضريبياً في الولايات المتحدة.',
    monthly: 'شهري',
    donateButton: 'تبرع عبر HCB',
    donateLink: 'https://hcb.hackclub.com/donations/start/aosus',
    financialRecords: 'السجلات المالية',
    financialLink: 'https://hcb.hackclub.com/aosus',
    githubTitle: 'رعاية عبر GitHub',
    githubDesc: 'بإمكانكم رعاية أسس على منصة GitHub والحصول على علامة تدل على دعمكم.',
    githubLink: 'https://github.com/sponsors/aosus',
    referrals: {
      title: 'روابط_الإحالة',
      subtitle: 'ادعم أسس بدون تكلفة إضافية باستخدام روابط الإحالة.',
      items: [
        { name: 'Hetzner Cloud', desc: 'ستحصل على 20 يورو رصيد على منصة Hetzner السحابية عند استخدامك هذا الرابط.', link: 'https://hetzner.cloud/?ref=3IzL1OLbBdrT', color: '#d50c2d' },
        { name: 'Netcup', desc: 'رابط ربحي يدعم مجتمع أسس على منصة Netcup للاستضافة.', link: 'https://www.netcup.de/?ref=228088', color: '#1d70ba' },
      ],
    },
    impactTitle: 'أثر_دعمك',
    impacts: [
      'استضافة خدمات تحترم الخصوصية للمجتمع',
      'رعاية هاكاثونات وفعاليات للطلاب',
      'إدارة مسابقة الكتابة لإنتاج محتوى عربي عن البرمجيات الحرة',
      'صيانة منتدى مجتمع Discourse',
      'تطوير أدوات مفتوحة المصدر مثل جسر المحادثات',
    ],
  },
};

export default function SupportPage({ lang: langProp }: { lang?: Lang }) {
  return (
    <Layout lang={langProp}>
      {({ lang, isDark }) => {
        const t = CONTENT[lang];
        const isRtl = lang === 'ar';
        const ff = isRtl ? "'Almarai', sans-serif" : undefined;

        return (
          <div className={`min-h-screen ${isDark ? '' : 'bg-gray-50'}`}>
            <section className="relative py-24 overflow-hidden border-b border-[#008a2f]/20">
              <div className="absolute inset-0 bg-gradient-to-br from-[#1d70ba]/10 to-transparent" />
              <div className="relative max-w-3xl mx-auto px-6 text-center">
                <Heart className="w-12 h-12 mx-auto mb-6 text-[#008a2f]" />
                <h1 className="text-3xl md:text-5xl font-bold uppercase tracking-widest mb-4 font-mono" style={isRtl ? { fontFamily: "'Almarai', sans-serif" } : undefined}>
                  <span className="text-[#008a2f]">/</span> {t.title}
                </h1>
                <p className={`text-lg max-w-xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`} style={{ fontFamily: ff }}>{t.subtitle}</p>
              </div>
            </section>

            <section className={`py-20 ${isDark ? 'bg-black/40' : 'bg-white'}`}>
              <div className="max-w-4xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h2 className="text-2xl font-bold uppercase tracking-widest mb-4 font-mono" style={isRtl ? { fontFamily: "'Almarai', sans-serif" } : undefined}>
                      <span className="text-[#008a2f]">/</span> {t.donateTitle}
                    </h2>
                    <p className={`text-sm leading-relaxed mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} style={{ fontFamily: ff }}>
                      {t.donateDesc}
                    </p>
                    <div className="flex flex-wrap gap-3 mb-6">
                      <PrimaryButton href={t.donateLink}>
                        <CreditCard className="w-4 h-4" />
                        {t.donateButton}
                      </PrimaryButton>
                      <a
                        href={`${t.donateLink}?monthly=true`}
                        className={`inline-flex items-center gap-2 px-5 py-3 font-mono uppercase tracking-wider border transition-all ${isDark ? 'border-white/20 text-gray-300 hover:border-[#008a2f] hover:text-[#008a2f]' : 'border-gray-300 text-gray-700 hover:border-[#008a2f] hover:text-[#008a2f]'}`}
                      >
                        <Heart className="w-4 h-4" />
                        {t.monthly}
                      </a>
                    </div>
                    <a href={t.financialLink} target="_blank" rel="noopener noreferrer" className="text-sm font-mono text-[#008a2f] hover:underline flex items-center gap-1">
                      <ExternalLink className="w-3 h-3" />
                      {t.financialRecords}
                    </a>
                  </div>

                  <CyberCard isDark={isDark} className="p-6" hover={false}>
                    <div className="flex items-center gap-3 mb-4">
                      <Github className="w-8 h-8" />
                      <h3 className="text-xl font-bold font-mono">{t.githubTitle}</h3>
                    </div>
                    <p className={`text-sm mb-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} style={{ fontFamily: ff }}>
                      {t.githubDesc}
                    </p>
                    <a href={t.githubLink} target="_blank" rel="noopener noreferrer" className="text-sm font-mono text-[#008a2f] hover:underline flex items-center gap-1">
                      <ExternalLink className="w-3 h-3" />
                      github.com/sponsors/aosus
                    </a>
                  </CyberCard>
                </div>
              </div>
            </section>

            <section className="py-20">
              <div className="max-w-4xl mx-auto px-6">
                <SectionHeading title={t.referrals.title} subtitle={t.referrals.subtitle} isDark={isDark} lang={lang} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {t.referrals.items.map((ref, i) => (
                    <a key={i} href={ref.link} target="_blank" rel="noopener noreferrer">
                      <CyberCard isDark={isDark} className="p-6 group cursor-pointer">
                        <Globe className="w-6 h-6 mb-3" style={{ color: ref.color }} />
                        <h3 className="text-lg font-bold mb-2 font-mono group-hover:text-[#008a2f] transition-colors">{ref.name}</h3>
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`} style={{ fontFamily: ff }}>{ref.desc}</p>
                      </CyberCard>
                    </a>
                  ))}
                </div>
              </div>
            </section>

            <section className={`py-20 ${isDark ? 'bg-black/40' : 'bg-white'}`}>
              <div className="max-w-3xl mx-auto px-6">
                <SectionHeading title={t.impactTitle} isDark={isDark} lang={lang} />
                <CyberCard isDark={isDark} className="p-8" hover={false}>
                  <ul className="space-y-4">
                    {t.impacts.map((impact, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: isRtl ? 20 : -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-center gap-3"
                      >
                        <span className="text-[#008a2f] font-mono text-sm">{'>'}</span>
                        <span className={isDark ? 'text-gray-300' : 'text-gray-600'} style={{ fontFamily: ff }}>{impact}</span>
                      </motion.li>
                    ))}
                  </ul>
                </CyberCard>
              </div>
            </section>
          </div>
        );
      }}
    </Layout>
  );
}
