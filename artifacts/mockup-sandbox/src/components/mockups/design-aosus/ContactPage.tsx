import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, Send, ExternalLink } from 'lucide-react';
import Layout, { GlassCard, SectionHeading, BASE, type Lang } from './Layout';

const CONTENT = {
  en: {
    title: 'Contact Us',
    subtitle: 'Get in touch with the Aosus community team.',
    channels: [
      {
        title: 'Email',
        desc: 'For general inquiries, partnerships, or sponsorship opportunities.',
        value: 'contact@aosus.org',
        href: 'mailto:contact@aosus.org',
        icon: Mail,
        color: '#008a2f',
      },
      {
        title: 'Matrix Room',
        desc: 'The Aosus room on the federated Matrix network is active and all team members are present. Connected to the Telegram group.',
        value: '#aosus:aosus.org',
        href: 'https://matrix.to/#/#aosus:aosus.org',
        icon: MessageSquare,
        color: '#1d70ba',
      },
      {
        title: 'Telegram Group',
        desc: 'Moderators and the Aosus community team are active on the official Telegram group.',
        value: '@aosus',
        href: 'https://t.me/aosus',
        icon: Send,
        color: '#008a2f',
      },
    ],
    socialTitle: 'Follow Us',
    socials: [
      { name: 'Twitter/X', handle: '@aosusdotorg', href: 'https://twitter.com/aosusdotorg' },
      { name: 'LinkedIn', handle: 'Aosus', href: 'https://www.linkedin.com/company/aosus/' },
      { name: 'Facebook', handle: 'aosus1', href: 'https://www.facebook.com/aosus1/' },
      { name: 'GitHub', handle: 'aosus', href: 'https://github.com/aosus' },
      { name: 'Discord', handle: 'Aosus', href: 'https://discord.gg/YJUzEhU955' },
      { name: 'RSS Feed', handle: 'aosus.org/feed', href: 'https://aosus.org/feed' },
    ],
  },
  ar: {
    title: 'اتصل بنا',
    subtitle: 'تواصل مع فريق مجتمع أسس.',
    channels: [
      {
        title: 'البريد الإلكتروني',
        desc: 'للاستفسارات العامة والشراكات وفرص الرعاية.',
        value: 'contact@aosus.org',
        href: 'mailto:contact@aosus.org',
        icon: Mail,
        color: '#008a2f',
      },
      {
        title: 'غرفة أسس على Matrix',
        desc: 'غرفة أسس على شبكة Matrix الفدرالية فعالة ويوجد فيها جميع فريق أسس، وهي موصولة بمجموعة الTelegram.',
        value: '#aosus:aosus.org',
        href: 'https://matrix.to/#/#aosus:aosus.org',
        icon: MessageSquare,
        color: '#1d70ba',
      },
      {
        title: 'مجموعتنا على Telegram',
        desc: 'مشرفون وفريق مجتمع أسس نشيطين على مجموعة المجتمع الرسمية.',
        value: '@aosus',
        href: 'https://t.me/aosus',
        icon: Send,
        color: '#008a2f',
      },
    ],
    socialTitle: 'تابعنا',
    socials: [
      { name: 'Twitter/X', handle: '@aosusdotorg', href: 'https://twitter.com/aosusdotorg' },
      { name: 'LinkedIn', handle: 'Aosus', href: 'https://www.linkedin.com/company/aosus/' },
      { name: 'Facebook', handle: 'aosus1', href: 'https://www.facebook.com/aosus1/' },
      { name: 'GitHub', handle: 'aosus', href: 'https://github.com/aosus' },
      { name: 'Discord', handle: 'Aosus', href: 'https://discord.gg/YJUzEhU955' },
      { name: 'RSS Feed', handle: 'aosus.org/feed', href: 'https://aosus.org/feed' },
    ],
  },
};

export default function ContactPage({ lang: langProp }: { lang?: Lang }) {
  return (
    <Layout lang={langProp} activePath={`${BASE}/site/contact-us`}>
      {({ lang, isDark }) => {
        const t = CONTENT[lang];
        const isRtl = lang === 'ar';
        const ff = isRtl ? 'Almarai, sans-serif' : undefined;

        return (
          <div className={`min-h-screen ${isDark ? 'bg-[#0a0f1a]' : 'bg-[#f8f9fc]'}`}>
            <section className="py-24">
              <div className="max-w-4xl mx-auto px-6">
                <SectionHeading title={t.title} subtitle={t.subtitle} isDark={isDark} lang={lang} />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
                  {t.channels.map((channel, i) => (
                    <motion.a
                      key={i}
                      href={channel.href}
                      target={channel.href.startsWith('mailto') ? undefined : '_blank'}
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <GlassCard isDark={isDark} className="p-6 text-center h-full group cursor-pointer">
                        <div className="w-14 h-14 rounded-2xl mx-auto flex items-center justify-center mb-4" style={{ backgroundColor: `${channel.color}15` }}>
                          <channel.icon className="w-7 h-7" style={{ color: channel.color }} />
                        </div>
                        <h3 className="text-lg font-bold mb-2 group-hover:text-[#008a2f] transition-colors" style={{ fontFamily: ff }}>
                          {channel.title}
                        </h3>
                        <p className={`text-sm mb-3 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} style={{ fontFamily: ff }}>
                          {channel.desc}
                        </p>
                        <span className="text-sm font-medium text-[#008a2f]">{channel.value}</span>
                      </GlassCard>
                    </motion.a>
                  ))}
                </div>

                <SectionHeading title={t.socialTitle} isDark={isDark} lang={lang} />
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {t.socials.map((social, i) => (
                    <a key={i} href={social.href} target="_blank" rel="noopener noreferrer">
                      <GlassCard isDark={isDark} className="p-4 group cursor-pointer">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-semibold text-sm group-hover:text-[#008a2f] transition-colors">{social.name}</div>
                            <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{social.handle}</div>
                          </div>
                          <ExternalLink className={`w-4 h-4 ${isDark ? 'text-gray-600' : 'text-gray-400'} group-hover:text-[#008a2f] transition-colors`} />
                        </div>
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
