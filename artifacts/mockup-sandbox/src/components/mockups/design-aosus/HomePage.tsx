import React from 'react';
import { motion } from 'framer-motion';
import { Users, MessageSquare, Clock, BookOpen, Shield, Zap, Star, ArrowRight, ChevronRight, Newspaper, Globe, Server } from 'lucide-react';
import Layout, { GlassCard, SectionHeading, PrimaryButton, SecondaryButton, BASE, type Lang } from './Layout';

const CONTENT = {
  en: {
    hero: {
      badge: 'The Largest Arabic Open-Source Community',
      title: 'Building the Future of\nArabic Open Source',
      subtitle: 'A community of Arab technologists united by a passion for free and open-source software. We create, educate, and advocate for digital freedom in the Arabic world.',
      cta: 'Join the Community',
      secondary: 'Explore Projects',
    },
    stats: [
      { label: 'Community Members', value: '3,000+', icon: Users },
      { label: 'Published Posts', value: '10,000+', icon: MessageSquare },
      { label: 'Discussion Topics', value: '1,300+', icon: BookOpen },
      { label: 'Years Active', value: '9+', icon: Clock },
    ],
    projects: {
      title: 'Our Projects',
      subtitle: 'Open-source tools and services built by the community, for the community.',
      items: [
        {
          title: 'Discourse Community',
          desc: 'The central hub for Arabic tech discussions. The core of Aosus — where ideas are born and knowledge is shared.',
          icon: Server,
          color: '#008a2f',
          link: 'https://discourse.aosus.org/',
        },
        {
          title: 'Privacy Services',
          desc: 'Ad-free, tracker-free frontends for popular platforms (SearXNG, Redlib, Nitter) hosted on Aosus servers.',
          icon: Shield,
          color: '#1d70ba',
          link: `${BASE}/site/services`,
        },
        {
          title: 'Chat Bridge',
          desc: 'Open-source tool connecting Discourse forums with Matrix, Telegram, and Discord chat rooms.',
          icon: Zap,
          color: '#008a2f',
          link: 'https://github.com/aosus/discourse-chat-bridge',
        },
        {
          title: 'Writing Contest',
          desc: 'Monthly award to incentivize quality Arabic content about free and open-source software.',
          icon: Star,
          color: '#1d70ba',
          link: `${BASE}/site/writing-contest`,
        },
      ],
    },
    timeline: {
      title: 'Our Journey',
      subtitle: 'Key milestones in the Aosus community story.',
      events: [
        { year: '2017', title: 'Community Founded', desc: 'Aosus was established as a gathering place for Arabic-speaking FOSS enthusiasts.' },
        { year: '2019', title: 'Discourse Platform Launch', desc: 'Migrated to a Discourse-based community forum, becoming the central hub for discussions.' },
        { year: '2021', title: 'Privacy Services Launch', desc: 'Launched publicly hosted privacy-respecting frontends for popular platforms.' },
        { year: '2022', title: 'Writing Contest Begins', desc: 'Started the Aosus Writing Award to encourage Arabic tech content creation.' },
        { year: '2023', title: 'Chat Bridge Released', desc: 'Open-sourced the Discourse Chat Bridge connecting Matrix, Telegram, and Discord.' },
        { year: '2024', title: 'Fiscal Sponsorship', desc: 'Partnered with The Hack Foundation (Hack Club) as fiscal sponsor for 501(c)(3) status.' },
        { year: '2025', title: 'Hackathon Sponsorships', desc: 'Sponsored Daydream and Scrapyard hackathons in Alexandria, supporting student developers.' },
      ],
    },
    about: {
      title: 'Who Are We?',
      content: 'Aosus is a non-profit community established by Arab technologists from across the world. We focus on empowering and spreading awareness of Free and Open Source Software and its philosophy in Arabic. Our community spans developers, writers, designers, and advocates united by a shared vision of digital freedom.',
      values: [
        { label: 'Open Source', desc: 'We believe in transparent, collaborative software development.' },
        { label: 'Arabic First', desc: 'Building technical knowledge and tools in the Arabic language.' },
        { label: 'Privacy', desc: 'Advocating for digital rights and privacy-respecting alternatives.' },
      ],
    },
    blog: {
      title: 'Latest from the Blog',
      subtitle: 'News, tutorials, and updates from the community.',
      items: [
        {
          title: 'Aosus Sponsors Daydream Hackathon for School Students',
          date: 'Sep 18, 2025',
          excerpt: 'Aosus sponsors the Daydream hackathon in Alexandria, introducing school students to free software through game dev with Godot.',
          link: `${BASE}/site/article`,
          tag: 'Community',
        },
        {
          title: 'Contribute to Translating Firefox!',
          date: 'Sep 2025',
          excerpt: 'Mozilla needs your help to improve Firefox\'s Arabic language support. Learn how to contribute.',
          link: '#',
          tag: 'Open Source',
        },
        {
          title: 'Piped Service Update',
          date: 'Aug 2025',
          excerpt: 'Updates on the Piped service status and alternative privacy-friendly video frontends.',
          link: '#',
          tag: 'Services',
        },
      ],
    },
    cta: {
      title: 'Ready to Join?',
      subtitle: 'Become part of the largest Arabic open-source community. Share knowledge, contribute to projects, and help shape the future of FOSS in Arabic.',
      button: 'Join Aosus Community',
      secondary: 'Support Us',
    },
  },
  ar: {
    hero: {
      badge: 'أكبر مجتمع عربي للبرمجيات الحرة',
      title: 'نبني مستقبل\nالمصادر المفتوحة العربية',
      subtitle: 'مجتمع من التقنيين العرب يجمعهم شغف البرمجيات الحرة والمفتوحة المصدر. نبتكر ونثقّف وندافع عن الحرية الرقمية في العالم العربي.',
      cta: 'انضم إلى المجتمع',
      secondary: 'استكشف المشاريع',
    },
    stats: [
      { label: 'عضو في المجتمع', value: '+3,000', icon: Users },
      { label: 'منشور', value: '+10,000', icon: MessageSquare },
      { label: 'موضوع نقاشي', value: '+1,300', icon: BookOpen },
      { label: 'سنوات من العطاء', value: '+9', icon: Clock },
    ],
    projects: {
      title: 'مشاريعنا',
      subtitle: 'أدوات وخدمات مفتوحة المصدر بُنيت من المجتمع وللمجتمع.',
      items: [
        {
          title: 'مجتمع النقاشات',
          desc: 'المركز الرئيسي للنقاشات التقنية العربية. جوهر أسس — حيث تولد الأفكار ويُشارك العلم.',
          icon: Server,
          color: '#008a2f',
          link: 'https://discourse.aosus.org/',
        },
        {
          title: 'خدمات الخصوصية',
          desc: 'واجهات للمنصات المشهورة بدون إعلانات أو تتبع (SearXNG, Redlib, Nitter) مستضافة على خوادم أسس.',
          icon: Shield,
          color: '#1d70ba',
          link: `${BASE}/site/services`,
        },
        {
          title: 'جسر المحادثات',
          desc: 'أداة مفتوحة المصدر تربط منتديات Discourse مع غرف Matrix وTelegram وDiscord.',
          icon: Zap,
          color: '#008a2f',
          link: 'https://github.com/aosus/discourse-chat-bridge',
        },
        {
          title: 'جائزة الكتابة',
          desc: 'جائزة شهرية لتحفيز كتابة محتوى عربي عالي الجودة حول البرمجيات الحرة والمفتوحة.',
          icon: Star,
          color: '#1d70ba',
          link: `${BASE}/site/writing-contest`,
        },
      ],
    },
    timeline: {
      title: 'مسيرتنا',
      subtitle: 'أبرز المحطات في قصة مجتمع أسس.',
      events: [
        { year: '2017', title: 'تأسيس المجتمع', desc: 'أُسّس مجتمع أسس كمنصة تجمع المهتمين بالبرمجيات الحرة من العرب.' },
        { year: '2019', title: 'إطلاق منصة Discourse', desc: 'الانتقال إلى منصة Discourse لتصبح المركز الرئيسي للنقاشات التقنية.' },
        { year: '2021', title: 'إطلاق خدمات الخصوصية', desc: 'إطلاق واجهات تحترم الخصوصية للمنصات الشائعة مستضافة على خوادم أسس.' },
        { year: '2022', title: 'بداية جائزة الكتابة', desc: 'بدء جائزة أسس للكتابة لتحفيز إنشاء محتوى تقني عربي.' },
        { year: '2023', title: 'إطلاق جسر المحادثات', desc: 'نشر جسر محادثات Discourse مفتوح المصدر يربط Matrix وTelegram وDiscord.' },
        { year: '2024', title: 'الرعاية المالية', desc: 'شراكة مع The Hack Foundation للحصول على صفة منظمة غير ربحية 501(c)(3).' },
        { year: '2025', title: 'رعاية الهاكاثونات', desc: 'رعاية هاكاثونات Daydream وScrapyard في الإسكندرية لدعم المطورين الطلاب.' },
      ],
    },
    about: {
      title: 'من نحن؟',
      content: 'أسس مجتمع غير ربحي أسسه تقنيون عرب من مختلف أنحاء العالم. نركز على تمكين ونشر الوعي بالبرمجيات الحرة والمفتوحة المصدر وفلسفتها باللغة العربية. يضم مجتمعنا مطورين وكتّاباً ومصممين ومناصرين يوحدهم حلم الحرية الرقمية.',
      values: [
        { label: 'مفتوح المصدر', desc: 'نؤمن بتطوير البرمجيات الشفاف والتعاوني.' },
        { label: 'العربية أولاً', desc: 'بناء المعرفة التقنية والأدوات باللغة العربية.' },
        { label: 'الخصوصية', desc: 'الدفاع عن الحقوق الرقمية وبدائل تحترم الخصوصية.' },
      ],
    },
    blog: {
      title: 'آخر أخبار المدونة',
      subtitle: 'أخبار ومقالات وتحديثات من المجتمع.',
      items: [
        {
          title: 'أسس يرعى هاكاثون Daydream لطلاب المدارس',
          date: '18 سبتمبر 2025',
          excerpt: 'رعاية هاكاثون لطلاب المدارس في الإسكندرية للتعرف على البرمجيات الحرة عبر برمجة الألعاب بمحرك Godot.',
          link: `${BASE}/site/article`,
          tag: 'المجتمع',
        },
        {
          title: 'ساهم في ترجمة Firefox!',
          date: 'سبتمبر 2025',
          excerpt: 'Mozilla تحتاج مساعدتك لتحسين دعم المتصفح للغة العربية. تعلم كيف تساهم.',
          link: '#',
          tag: 'مصادر مفتوحة',
        },
        {
          title: 'تحديث خدمة Piped',
          date: 'أغسطس 2025',
          excerpt: 'تحديثات حول حالة خدمة Piped والبدائل الصديقة للخصوصية لمشاهدة الفيديو.',
          link: '#',
          tag: 'خدمات',
        },
      ],
    },
    cta: {
      title: 'مستعد للانضمام؟',
      subtitle: 'كن جزءاً من أكبر مجتمع عربي للبرمجيات الحرة. شارك المعرفة وساهم في المشاريع وساعد في تشكيل مستقبل المصادر المفتوحة بالعربية.',
      button: 'انضم لمجتمع أسس',
      secondary: 'ادعمنا',
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function HomePage({ lang: langProp }: { lang?: Lang }) {
  return (
    <Layout lang={langProp} activePath={`${BASE}/site`}>
      {({ lang, isDark }) => {
        const t = CONTENT[lang];
        const isRtl = lang === 'ar';
        const ff = isRtl ? 'Almarai, sans-serif' : undefined;

        return (
          <>
            <section className="relative min-h-[90vh] flex items-center overflow-hidden">
              <div className="absolute inset-0">
                <div className={`absolute inset-0 ${isDark
                  ? 'bg-gradient-to-br from-[#0a0f1a] via-[#0d1a2d] to-[#0a1a0f]'
                  : 'bg-gradient-to-br from-[#f0f4f8] via-[#e8f4ec] to-[#e8eef4]'
                }`} />
                <div className={`absolute top-20 ${isRtl ? 'left-20' : 'right-20'} w-96 h-96 rounded-full ${isDark ? 'bg-[#008a2f]/10' : 'bg-[#008a2f]/5'} blur-3xl`} />
                <div className={`absolute bottom-20 ${isRtl ? 'right-20' : 'left-20'} w-80 h-80 rounded-full ${isDark ? 'bg-[#1d70ba]/10' : 'bg-[#1d70ba]/5'} blur-3xl`} />
              </div>

              <div className="relative max-w-7xl mx-auto px-6 py-24 w-full">
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={stagger}
                  className="max-w-3xl"
                >
                  <motion.div variants={fadeUp} className="mb-6">
                    <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium ${isDark
                      ? 'bg-[#008a2f]/15 text-[#00c853] border border-[#008a2f]/30'
                      : 'bg-[#008a2f]/10 text-[#008a2f] border border-[#008a2f]/20'
                    }`} style={{ fontFamily: ff }}>
                      <span className="w-2 h-2 rounded-full bg-[#008a2f] animate-pulse" />
                      {t.hero.badge}
                    </span>
                  </motion.div>

                  <motion.h1
                    variants={fadeUp}
                    className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6 whitespace-pre-line"
                    style={{ fontFamily: ff }}
                  >
                    {t.hero.title}
                  </motion.h1>

                  <motion.p
                    variants={fadeUp}
                    className={`text-lg md:text-xl leading-relaxed mb-8 max-w-2xl ${isDark ? 'text-gray-300' : 'text-gray-600'}`}
                    style={{ fontFamily: ff }}
                  >
                    {t.hero.subtitle}
                  </motion.p>

                  <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
                    <PrimaryButton href="https://discourse.aosus.org/">
                      {t.hero.cta}
                      <ArrowRight className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
                    </PrimaryButton>
                    <SecondaryButton isDark={isDark} href="#projects">
                      {t.hero.secondary}
                    </SecondaryButton>
                  </motion.div>
                </motion.div>
              </div>
            </section>

            <section className={`py-20 ${isDark ? 'bg-[#0d1220]' : 'bg-white'}`}>
              <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {t.stats.map((stat, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <GlassCard isDark={isDark} className="p-6 text-center">
                        <stat.icon className={`w-6 h-6 mx-auto mb-3 ${isDark ? 'text-[#008a2f]' : 'text-[#008a2f]'}`} />
                        <div className="text-3xl md:text-4xl font-bold text-[#008a2f] mb-1">{stat.value}</div>
                        <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`} style={{ fontFamily: ff }}>{stat.label}</div>
                      </GlassCard>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            <section id="projects" className={`py-24 ${isDark ? 'bg-[#0a0f1a]' : 'bg-[#f8f9fc]'}`}>
              <div className="max-w-7xl mx-auto px-6">
                <SectionHeading title={t.projects.title} subtitle={t.projects.subtitle} isDark={isDark} lang={lang} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {t.projects.items.map((project, i) => (
                    <motion.a
                      key={i}
                      href={project.link}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <GlassCard isDark={isDark} className="p-8 h-full group cursor-pointer">
                        <div className="flex items-start gap-4">
                          <div
                            className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                            style={{ backgroundColor: `${project.color}20` }}
                          >
                            <project.icon className="w-6 h-6" style={{ color: project.color }} />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-bold mb-2 group-hover:text-[#008a2f] transition-colors" style={{ fontFamily: ff }}>
                              {project.title}
                            </h3>
                            <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-500'}`} style={{ fontFamily: ff }}>
                              {project.desc}
                            </p>
                          </div>
                          <ChevronRight className={`w-5 h-5 flex-shrink-0 ${isDark ? 'text-gray-600' : 'text-gray-400'} group-hover:text-[#008a2f] transition-colors ${isRtl ? 'rotate-180' : ''}`} />
                        </div>
                      </GlassCard>
                    </motion.a>
                  ))}
                </div>
              </div>
            </section>

            <section className={`py-24 ${isDark ? 'bg-[#0d1220]' : 'bg-white'}`}>
              <div className="max-w-7xl mx-auto px-6">
                <SectionHeading title={t.timeline.title} subtitle={t.timeline.subtitle} isDark={isDark} lang={lang} />
                <div className="relative">
                  <div className={`absolute ${isRtl ? 'right-6 md:right-1/2' : 'left-6 md:left-1/2'} top-0 bottom-0 w-px ${isDark ? 'bg-[#008a2f]/30' : 'bg-[#008a2f]/20'}`} />
                  <div className="space-y-12">
                    {t.timeline.events.map((event, i) => {
                      const isLeft = i % 2 === 0;
                      return (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.05 }}
                          className={`relative flex items-start gap-6 ${isRtl ? '' : ''} md:justify-center`}
                        >
                          <div className={`hidden md:block w-[calc(50%-2rem)] ${isLeft ? 'text-end' : 'order-last text-start'}`}>
                            {isLeft && (
                              <GlassCard isDark={isDark} className="p-6 inline-block max-w-md" hover={false}>
                                <div className="text-sm font-bold text-[#008a2f] mb-1">{event.year}</div>
                                <h3 className="font-bold text-lg mb-1" style={{ fontFamily: ff }}>{event.title}</h3>
                                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`} style={{ fontFamily: ff }}>{event.desc}</p>
                              </GlassCard>
                            )}
                          </div>

                          <div className="relative z-10 flex-shrink-0">
                            <div className={`w-4 h-4 rounded-full border-4 ${isDark ? 'border-[#0d1220] bg-[#008a2f]' : 'border-white bg-[#008a2f]'} shadow-lg shadow-[#008a2f]/30`} />
                          </div>

                          <div className={`hidden md:block w-[calc(50%-2rem)] ${isLeft ? 'order-first' : ''}`}>
                            {!isLeft && (
                              <GlassCard isDark={isDark} className="p-6 inline-block max-w-md" hover={false}>
                                <div className="text-sm font-bold text-[#008a2f] mb-1">{event.year}</div>
                                <h3 className="font-bold text-lg mb-1" style={{ fontFamily: ff }}>{event.title}</h3>
                                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`} style={{ fontFamily: ff }}>{event.desc}</p>
                              </GlassCard>
                            )}
                          </div>

                          <div className="md:hidden flex-1">
                            <GlassCard isDark={isDark} className="p-5" hover={false}>
                              <div className="text-sm font-bold text-[#008a2f] mb-1">{event.year}</div>
                              <h3 className="font-bold mb-1" style={{ fontFamily: ff }}>{event.title}</h3>
                              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`} style={{ fontFamily: ff }}>{event.desc}</p>
                            </GlassCard>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </section>

            <section className={`py-24 ${isDark ? 'bg-[#0a0f1a]' : 'bg-[#f8f9fc]'}`}>
              <div className="max-w-7xl mx-auto px-6">
                <SectionHeading title={t.about.title} isDark={isDark} lang={lang} />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                  <div>
                    <p className={`text-lg leading-relaxed mb-8 ${isDark ? 'text-gray-300' : 'text-gray-600'}`} style={{ fontFamily: ff }}>
                      {t.about.content}
                    </p>
                  </div>
                  <div className="grid gap-4">
                    {t.about.values.map((v, i) => (
                      <GlassCard key={i} isDark={isDark} className="p-6" hover={false}>
                        <h4 className="font-bold text-[#008a2f] mb-1" style={{ fontFamily: ff }}>{v.label}</h4>
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`} style={{ fontFamily: ff }}>{v.desc}</p>
                      </GlassCard>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <section className={`py-24 ${isDark ? 'bg-[#0d1220]' : 'bg-white'}`}>
              <div className="max-w-7xl mx-auto px-6">
                <SectionHeading title={t.blog.title} subtitle={t.blog.subtitle} isDark={isDark} lang={lang} />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {t.blog.items.map((post, i) => (
                    <motion.a
                      key={i}
                      href={post.link}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <GlassCard isDark={isDark} className="overflow-hidden h-full group cursor-pointer">
                        <div className={`h-2 ${i === 0 ? 'bg-[#008a2f]' : i === 1 ? 'bg-[#1d70ba]' : 'bg-[#008a2f]'}`} />
                        <div className="p-6">
                          <div className="flex items-center gap-2 mb-3">
                            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${isDark ? 'bg-[#008a2f]/15 text-[#00c853]' : 'bg-[#008a2f]/10 text-[#008a2f]'}`}>
                              {post.tag}
                            </span>
                            <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{post.date}</span>
                          </div>
                          <h3 className="font-bold text-lg mb-2 group-hover:text-[#008a2f] transition-colors" style={{ fontFamily: ff }}>
                            {post.title}
                          </h3>
                          <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-500'}`} style={{ fontFamily: ff }}>
                            {post.excerpt}
                          </p>
                        </div>
                      </GlassCard>
                    </motion.a>
                  ))}
                </div>
                <div className="text-center mt-8">
                  <SecondaryButton isDark={isDark} href={`${BASE}/site/blog`}>
                    {lang === 'ar' ? 'عرض جميع المقالات' : 'View All Posts'}
                    <ArrowRight className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
                  </SecondaryButton>
                </div>
              </div>
            </section>

            <section className="relative py-24 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#008a2f] to-[#006520]" />
              <div className={`absolute top-0 ${isRtl ? 'left-0' : 'right-0'} w-96 h-96 rounded-full bg-white/5 blur-3xl`} />
              <div className="relative max-w-3xl mx-auto px-6 text-center text-white">
                <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ fontFamily: ff }}>{t.cta.title}</h2>
                <p className="text-lg text-white/80 mb-8 leading-relaxed" style={{ fontFamily: ff }}>{t.cta.subtitle}</p>
                <div className="flex flex-wrap justify-center gap-4">
                  <a
                    href="https://discourse.aosus.org/"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#008a2f] font-semibold rounded-xl hover:bg-white/90 transition-all"
                    style={{ fontFamily: ff }}
                  >
                    {t.cta.button}
                    <ArrowRight className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
                  </a>
                  <a
                    href={`${BASE}/site/support-us`}
                    className="inline-flex items-center gap-2 px-6 py-3 border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 transition-all"
                    style={{ fontFamily: ff }}
                  >
                    {t.cta.secondary}
                  </a>
                </div>
              </div>
            </section>
          </>
        );
      }}
    </Layout>
  );
}
