import React from 'react';
import { motion } from 'framer-motion';
import { Search, Globe, MessageSquare, BookOpen, ImageIcon, ExternalLink, Shield } from 'lucide-react';
import Layout, { GlassCard, SectionHeading, PrimaryButton, BASE, type Lang } from './Layout';

const SERVICES = {
  en: {
    title: 'Community Services',
    subtitle: 'Privacy-respecting frontends for popular platforms, hosted on Aosus servers. No ads, no tracking.',
    notice: 'These services are public. Please be mindful of server resources as they are resource-intensive on the Aosus network.',
    supportCta: 'Support Us',
    items: [
      { name: 'Simply Translate', desc: 'Interface for multiple translation services like Google Translate without tracking, with automatic translation and audio support, plus a translation API.', icon: Globe, link: 'https://simplytranslate.aosus.link/', color: '#008a2f' },
      { name: 'SearXNG', desc: 'A metasearch engine that fetches results from other engines while protecting your privacy. Default results from Google and Brave.', icon: Search, link: 'https://search.aosus.link/', color: '#1d70ba' },
      { name: 'Redlib', desc: 'Reddit frontend without ads or tracking. Does not use JavaScript and is built with Rust. All content routes through Aosus servers.', icon: MessageSquare, link: 'https://redlib.aosus.link/', color: '#008a2f' },
      { name: 'Element', desc: 'The most popular Matrix protocol client. A federated, open-source messaging protocol. Full-featured and actively developed.', icon: MessageSquare, link: 'https://element.aosus.link/', color: '#1d70ba' },
      { name: 'rimgo', desc: 'Imgur frontend without ads, tracking, or JavaScript. Faster because the site is lighter, and no app download prompts.', icon: ImageIcon, link: 'https://rimgo.aosus.link/', color: '#008a2f' },
      { name: 'Scribe', desc: 'Frontend for the Medium blogging platform. Much lighter than the official site, no ads or tracking, no login required.', icon: BookOpen, link: 'https://scribe.aosus.link/', color: '#1d70ba' },
    ],
    extensionsTitle: 'Browser Extensions for Redirect',
    extensions: [
      { name: 'LibRedirect', desc: 'Browser extension to redirect platform links to privacy-respecting frontends. More features and active development.', link: 'https://github.com/libredirect/libredirect' },
      { name: 'Privacy Redirect', desc: 'Browser extension to redirect platform links to privacy-friendly frontends. Fewer features but available on Chrome Web Store.', link: 'https://github.com/SimonBrazell/privacy-redirect' },
    ],
  },
  ar: {
    title: 'خدمات مجتمع أسس',
    subtitle: 'واجهات تحترم الخصوصية للمنصات الشائعة، مستضافة على خوادم أسس. بدون إعلانات أو تتبع.',
    notice: 'هذه الخدمات عامة. يرجى مراعاة استخدام موارد الخادم، لأنها ثقيلة على استخدام الشبكة في خوادم أسس.',
    supportCta: 'ادعمنا',
    items: [
      { name: 'Simply Translate', desc: 'واجهة لخدمات ترجمة متعددة مثل ترجمة Google دون تتبع مع دعم الترجمة التلقائية والصوت، بالإضافة لواجهة برمجية API للترجمة.', icon: Globe, link: 'https://simplytranslate.aosus.link/', color: '#008a2f' },
      { name: 'SearXNG', desc: 'محرك بحث يجلب النتائج من محركات بحث أخرى مع المحافظة على خصوصيتك الرقمية. بشكل افتراضي النتائج من Google وBrave.', icon: Search, link: 'https://search.aosus.link/', color: '#1d70ba' },
      { name: 'Redlib', desc: 'واجهة لمنصة Reddit دون إعلانات أو تتبع، لا تستخدم JS وهي مبنية بلغة Rust. جميع المحتوى يمر عبر خوادم أسس.', icon: MessageSquare, link: 'https://redlib.aosus.link/', color: '#008a2f' },
      { name: 'Element', desc: 'أشهر واجهة لبروتوكول Matrix، بروتوكول فدرالي للمحادثة مفتوح المصدر. تقدم كامل ميزات البروتوكول.', icon: MessageSquare, link: 'https://element.aosus.link/', color: '#1d70ba' },
      { name: 'rimgo', desc: 'واجهة لموقع Imgur لرفع الصور، دون إعلانات أو تتبع أو استخدام سكربتات Javascript. تقدم سرعة أفضل لأن الموقع أخف.', icon: ImageIcon, link: 'https://rimgo.aosus.link/', color: '#008a2f' },
      { name: 'Scribe', desc: 'واجهة لمنصة التدوينات الشهيرة Medium. أخف بكثير من الموقع الرسمي وبدون أي إعلانات أو تتبع.', icon: BookOpen, link: 'https://scribe.aosus.link/', color: '#1d70ba' },
    ],
    extensionsTitle: 'إضافات للمتصفح لإعادة توجيه الروابط',
    extensions: [
      { name: 'LibRedirect', desc: 'إضافة للمتصفح لإعادة توجيه روابط المنصات إلى واجهات تحافظ على الخصوصية مع ميزات أكثر وتطوير أكثر نشاطاً.', link: 'https://github.com/libredirect/libredirect' },
      { name: 'Privacy Redirect', desc: 'إضافة للمتصفح لإعادة توجيه روابط المنصات إلى واجهات تحافظ على الخصوصية. ميزات أقل لكنها متوفرة على متجر Google Chrome.', link: 'https://github.com/SimonBrazell/privacy-redirect' },
    ],
  },
};

export default function ServicesPage({ lang: langProp }: { lang?: Lang }) {
  return (
    <Layout lang={langProp} activePath={`${BASE}/site/services`}>
      {({ lang, isDark }) => {
        const t = SERVICES[lang];
        const isRtl = lang === 'ar';
        const ff = isRtl ? 'Almarai, sans-serif' : undefined;

        return (
          <div className={`min-h-screen ${isDark ? 'bg-[#0a0f1a]' : 'bg-[#f8f9fc]'}`}>
            <section className="py-24">
              <div className="max-w-6xl mx-auto px-6">
                <SectionHeading title={t.title} subtitle={t.subtitle} isDark={isDark} lang={lang} />

                <GlassCard isDark={isDark} className="p-4 mb-12 flex items-center gap-3" hover={false}>
                  <Shield className="w-5 h-5 text-[#008a2f] flex-shrink-0" />
                  <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`} style={{ fontFamily: ff }}>
                    {t.notice}
                  </p>
                  <PrimaryButton href={`${BASE}/site/support-us`} className="ml-auto text-xs px-3 py-1.5 whitespace-nowrap">
                    {t.supportCta}
                  </PrimaryButton>
                </GlassCard>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
                  {t.items.map((service, i) => (
                    <motion.a
                      key={i}
                      href={service.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <GlassCard isDark={isDark} className="p-6 h-full group cursor-pointer">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: `${service.color}20` }}>
                          <service.icon className="w-6 h-6" style={{ color: service.color }} />
                        </div>
                        <h3 className="text-lg font-bold mb-2 group-hover:text-[#008a2f] transition-colors">{service.name}</h3>
                        <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-500'}`} style={{ fontFamily: ff }}>
                          {service.desc}
                        </p>
                        <div className="mt-4 flex items-center gap-1 text-xs font-medium text-[#008a2f]">
                          <ExternalLink className="w-3 h-3" />
                          {service.link.replace('https://', '').replace('/', '')}
                        </div>
                      </GlassCard>
                    </motion.a>
                  ))}
                </div>

                <SectionHeading title={t.extensionsTitle} isDark={isDark} lang={lang} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {t.extensions.map((ext, i) => (
                    <a key={i} href={ext.link} target="_blank" rel="noopener noreferrer">
                      <GlassCard isDark={isDark} className="p-6 group cursor-pointer">
                        <h3 className="text-lg font-bold mb-2 group-hover:text-[#008a2f] transition-colors">{ext.name}</h3>
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`} style={{ fontFamily: ff }}>{ext.desc}</p>
                      </GlassCard>
                    </a>
                  ))}
                </div>
              </div>
            </section>
          </div>
        );
      }}
    </Layout>
  );
}
