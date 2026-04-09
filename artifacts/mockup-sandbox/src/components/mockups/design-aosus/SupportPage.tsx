import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Github, ExternalLink, CreditCard, Globe } from 'lucide-react';
import Layout, { GlassCard, SectionHeading, PrimaryButton, BASE, type Lang } from './Layout';

const CONTENT = {
  en: {
    title: 'Support Us',
    subtitle: 'Help Aosus continue its mission to promote free and open-source software in the Arabic world.',
    donateTitle: 'Donate Directly',
    donateDesc: 'Aosus is fiscally sponsored by The Hack Foundation (d.b.a. Hack Club), a 501(c)(3) nonprofit (EIN: 81-2908499). Your donations are tax-deductible in the United States.',
    oneTime: 'One-time',
    monthly: 'Monthly',
    donateButton: 'Donate via HCB',
    donateLink: 'https://hcb.hackclub.com/donations/start/aosus',
    financialRecords: 'View Financial Records',
    financialLink: 'https://hcb.hackclub.com/aosus',
    githubTitle: 'GitHub Sponsors',
    githubDesc: 'Sponsor Aosus on GitHub and get a badge showing your support for the community.',
    githubLink: 'https://github.com/sponsors/aosus',
    referrals: {
      title: 'Referral Links',
      subtitle: 'Support Aosus at no extra cost by using our referral links when signing up for hosting services.',
      items: [
        {
          name: 'Hetzner Cloud',
          desc: 'Get €20 credit on Hetzner Cloud platform when you use this referral link.',
          link: 'https://hetzner.cloud/?ref=3IzL1OLbBdrT',
          color: '#d50c2d',
        },
        {
          name: 'Netcup',
          desc: 'Referral link that supports Aosus community on the Netcup hosting platform.',
          link: 'https://www.netcup.de/?ref=228088',
          color: '#1d70ba',
        },
      ],
    },
    impactTitle: 'Your Support Enables',
    impacts: [
      'Hosting privacy-respecting services for the community',
      'Sponsoring student hackathons and events',
      'Running the writing contest to produce Arabic FOSS content',
      'Maintaining the Discourse community forum',
      'Developing open-source tools like the Chat Bridge',
    ],
  },
  ar: {
    title: 'ادعمنا',
    subtitle: 'ساعد أسس في مواصلة مهمتها لتعزيز البرمجيات الحرة والمفتوحة المصدر في العالم العربي.',
    donateTitle: 'تبرع مباشرة',
    donateDesc: 'أسس مستضاف مالياً من The Hack Foundation (المعروفة باسم Hack Club)، منظمة غير ربحية من نوع 501(c)(3) (رقم EIN: 81-2908499). تبرعاتك معفاة ضريبياً في الولايات المتحدة.',
    oneTime: 'مرة واحدة',
    monthly: 'شهري',
    donateButton: 'تبرع عبر HCB',
    donateLink: 'https://hcb.hackclub.com/donations/start/aosus',
    financialRecords: 'السجلات المالية لأسس',
    financialLink: 'https://hcb.hackclub.com/aosus',
    githubTitle: 'رعاية عبر GitHub',
    githubDesc: 'بإمكانكم رعاية أسس على منصة GitHub والحصول على علامة تدل على دعمكم لمجتمع أسس.',
    githubLink: 'https://github.com/sponsors/aosus',
    referrals: {
      title: 'روابط الإحالة',
      subtitle: 'ادعم أسس بدون تكلفة إضافية باستخدام روابط الإحالة عند التسجيل في خدمات الاستضافة.',
      items: [
        {
          name: 'Hetzner Cloud',
          desc: 'ستحصل على 20 يورو رصيد على منصة Hetzner السحابية عند استخدامك هذا الرابط.',
          link: 'https://hetzner.cloud/?ref=3IzL1OLbBdrT',
          color: '#d50c2d',
        },
        {
          name: 'Netcup',
          desc: 'رابط ربحي يدعم مجتمع أسس على منصة Netcup للاستضافة.',
          link: 'https://www.netcup.de/?ref=228088',
          color: '#1d70ba',
        },
      ],
    },
    impactTitle: 'دعمك يمكّننا من',
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
    <Layout lang={langProp} activePath={`${BASE}/site/support-us`}>
      {({ lang, isDark }) => {
        const t = CONTENT[lang];
        const isRtl = lang === 'ar';
        const ff = isRtl ? 'Almarai, sans-serif' : undefined;

        return (
          <div className={`min-h-screen ${isDark ? 'bg-[#0a0f1a]' : 'bg-[#f8f9fc]'}`}>
            <section className="relative py-24 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#1d70ba] to-[#0d4a7a]" />
              <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-[#008a2f]/10 blur-3xl" />
              <div className="relative max-w-3xl mx-auto px-6 text-center text-white">
                <Heart className="w-12 h-12 mx-auto mb-6 opacity-80" />
                <h1 className="text-3xl md:text-5xl font-bold mb-4" style={{ fontFamily: ff }}>{t.title}</h1>
                <p className="text-lg text-white/80 max-w-xl mx-auto" style={{ fontFamily: ff }}>{t.subtitle}</p>
              </div>
            </section>

            <section className={`py-20 ${isDark ? 'bg-[#0d1220]' : 'bg-white'}`}>
              <div className="max-w-4xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: ff }}>{t.donateTitle}</h2>
                    <p className={`text-sm leading-relaxed mb-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`} style={{ fontFamily: ff }}>
                      {t.donateDesc}
                    </p>
                    <div className="flex flex-wrap gap-3 mb-6">
                      <PrimaryButton href={t.donateLink}>
                        <CreditCard className="w-4 h-4" />
                        {t.donateButton}
                      </PrimaryButton>
                      <a
                        href={`${t.donateLink}?monthly=true`}
                        className={`inline-flex items-center gap-2 px-5 py-3 font-semibold rounded-xl border-2 transition-all ${isDark ? 'border-white/20 text-white hover:bg-white/10' : 'border-gray-300 text-gray-700 hover:bg-gray-100'}`}
                      >
                        <Heart className="w-4 h-4" />
                        {t.monthly}
                      </a>
                    </div>
                    <a href={t.financialLink} target="_blank" rel="noopener noreferrer" className="text-sm text-[#008a2f] hover:underline flex items-center gap-1">
                      <ExternalLink className="w-3 h-3" />
                      {t.financialRecords}
                    </a>
                  </div>

                  <GlassCard isDark={isDark} className="p-6" hover={false}>
                    <div className="flex items-center gap-3 mb-4">
                      <Github className="w-8 h-8" />
                      <h3 className="text-xl font-bold">{t.githubTitle}</h3>
                    </div>
                    <p className={`text-sm mb-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} style={{ fontFamily: ff }}>
                      {t.githubDesc}
                    </p>
                    <a href={t.githubLink} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-[#008a2f] hover:underline flex items-center gap-1">
                      <ExternalLink className="w-3 h-3" />
                      github.com/sponsors/aosus
                    </a>
                  </GlassCard>
                </div>
              </div>
            </section>

            <section className={`py-20 ${isDark ? 'bg-[#0a0f1a]' : 'bg-[#f8f9fc]'}`}>
              <div className="max-w-4xl mx-auto px-6">
                <SectionHeading title={t.referrals.title} subtitle={t.referrals.subtitle} isDark={isDark} lang={lang} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {t.referrals.items.map((ref, i) => (
                    <a key={i} href={ref.link} target="_blank" rel="noopener noreferrer">
                      <GlassCard isDark={isDark} className="p-6 group cursor-pointer">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3" style={{ backgroundColor: `${ref.color}20` }}>
                          <Globe className="w-5 h-5" style={{ color: ref.color }} />
                        </div>
                        <h3 className="text-lg font-bold mb-2 group-hover:text-[#008a2f] transition-colors">{ref.name}</h3>
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`} style={{ fontFamily: ff }}>{ref.desc}</p>
                      </GlassCard>
                    </a>
                  ))}
                </div>
              </div>
            </section>

            <section className={`py-20 ${isDark ? 'bg-[#0d1220]' : 'bg-white'}`}>
              <div className="max-w-3xl mx-auto px-6">
                <SectionHeading title={t.impactTitle} isDark={isDark} lang={lang} />
                <GlassCard isDark={isDark} className="p-8" hover={false}>
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
                        <div className="w-2 h-2 rounded-full bg-[#008a2f] flex-shrink-0" />
                        <span className={isDark ? 'text-gray-300' : 'text-gray-600'} style={{ fontFamily: ff }}>{impact}</span>
                      </motion.li>
                    ))}
                  </ul>
                </GlassCard>
              </div>
            </section>
          </div>
        );
      }}
    </Layout>
  );
}
