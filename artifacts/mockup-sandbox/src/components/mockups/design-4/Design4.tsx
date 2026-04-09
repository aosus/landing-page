import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Users, MessageSquare, Clock, Globe, Terminal, Shield, Github, Twitter } from 'lucide-react';

const CONTENT = {
  en: {
    nav: {
      badge: 'No permission needed.',
      links: ['Manifesto', 'Projects', 'Community'],
      darkLabel: 'DARK',
      lightLabel: 'LIGHT',
      toggle: 'AR',
    },
    hero: {
      line1: 'Build',
      line2: 'Beyond',
      line3: 'Borders',
      tagline: 'The Largest Arabic Open-Source Community',
      taglineSub: 'We are the largest Arabic open-source community. We build. We share. We change everything.',
      cta: 'Join Now',
      ctaSecondary: 'Read More',
    },
    marquee: ['OPEN SOURCE', '✖', 'FREE CULTURE', '✖', 'BUILD TOGETHER', '✖', 'OPEN SOURCE', '✖', 'FREE CULTURE', '✖'],
    stats: [
      { num: '3,000+', label: 'Members', icon: Users, color: 'bg-[#1d70ba]' },
      { num: '10,000+', label: 'Posts', icon: MessageSquare, color: 'bg-[#008a2f]' },
      { num: '9', label: 'Years', icon: Clock, color: 'bg-black dark:bg-white' },
      { num: '1,300+', label: 'Topics', icon: Terminal, color: 'bg-white dark:bg-black' },
    ],
    vision: {
      heading: 'Our Vision',
      body: 'To be the pioneers in spreading open-source culture in the Arab world. Hardware and software.',
    },
    projects: {
      heading: 'Projects',
      items: [
        {
          title: 'Discourse Bridge',
          subtitle: 'Cross-platform community chat',
          body: 'A bridge that connects the community to chat rooms, enabling users to interact with community topics from inside their preferred platforms.',
          link: 'View Code →',
          icon: Github,
          invert: false,
        },
        {
          title: 'Public Services',
          subtitle: 'Privacy-respecting frontends',
          body: 'In support of digital privacy, Aosus Community provides public services offering ad-free, tracker-free interfaces for popular platforms.',
          link: 'Explore →',
          icon: Globe,
          invert: true,
        },
      ],
    },
    blog: {
      heading: 'Latest',
      posts: [
        {
          num: '01',
          date: 'MAR 2024',
          title: 'Daydream Hackathon Sponsorship',
          desc: 'Aosus sponsors a school hackathon in Alexandria, introducing students to open-source via the Godot game engine.',
          link: 'https://aosus.org/2135',
        },
        {
          num: '02',
          date: 'FEB 2024',
          title: 'Contribute to Firefox Arabic!',
          desc: 'Mozilla calls on Arabic speakers to improve Firefox Arabic support. Join the translation effort now.',
          link: 'https://aosus.org/2125',
        },
        {
          num: '03',
          date: 'NOV 2023',
          title: 'Piped Service Shutdown',
          desc: 'Due to persistent technical issues with Piped, the service will be discontinued. Privacy alternatives remain available.',
          link: 'https://aosus.org/2071',
        },
      ],
    },
    cta: {
      heading: 'Ready to Contribute?',
      join: 'Join Discord',
      community: 'Community',
    },
    footer: `Aosus © ${new Date().getFullYear()}`,
    navToggle: 'AR',
  },
  ar: {
    nav: {
      badge: 'لا تحتاج إلى إذن.',
      links: ['البيان', 'المشاريع', 'المجتمع'],
      darkLabel: 'داكن',
      lightLabel: 'فاتح',
      toggle: 'EN',
    },
    hero: {
      line1: 'ابنِ',
      line2: 'بلا',
      line3: 'حدود',
      tagline: 'أكبر مجتمع عربي للبرمجيات الحرة',
      taglineSub: 'نحن أكبر مجتمع عربي مفتوح المصدر. نبني. نشارك. نغير كل شيء.',
      cta: 'انضم الآن',
      ctaSecondary: 'اقرأ المزيد',
    },
    marquee: ['البرمجيات الحرة', '✖', 'ثقافة مفتوحة', '✖', 'نبني معاً', '✖', 'البرمجيات الحرة', '✖', 'ثقافة مفتوحة', '✖'],
    stats: [
      { num: '+3,000', label: 'عضو', icon: Users, color: 'bg-[#1d70ba]' },
      { num: '+10,000', label: 'منشور', icon: MessageSquare, color: 'bg-[#008a2f]' },
      { num: '9', label: 'سنوات', icon: Clock, color: 'bg-black dark:bg-white' },
      { num: '+1,300', label: 'موضوع', icon: Terminal, color: 'bg-white dark:bg-black' },
    ],
    vision: {
      heading: 'رؤيتنا',
      body: 'أن تكون أسس رائدة في التوعية والنشر عن حركة المصادر الحرة والمفتوحة المصدر في العالم العربي على نطاق العتاد والبرمجيات.',
    },
    projects: {
      heading: 'المشاريع',
      items: [
        {
          title: 'جسر ديسكورس',
          subtitle: 'محادثة مجتمعية متعددة المنصات',
          body: 'جسر يقوم بربط المجتمع بغرف محادثة، لتمكن المستخدمين من التفاعل مع مواضيع المجتمع من داخل منصاتهم المفضلة.',
          link: 'شاهد الكود →',
          icon: Github,
          invert: false,
        },
        {
          title: 'الخدمات العامة',
          subtitle: 'واجهات تحترم خصوصيتك',
          body: 'في سبيل دعم الخصوصية الرقمية، يقدم مجتمع أسس خدمات عامة توفر واجهات لمنصات معروفة دون إعلانات أو تتبع.',
          link: 'استكشف →',
          icon: Globe,
          invert: true,
        },
      ],
    },
    blog: {
      heading: 'آخر الأخبار',
      posts: [
        {
          num: '٠١',
          date: 'مارس ٢٠٢٤',
          title: 'رعاية هاكاثون Daydream',
          desc: 'أسس يرعى هاكاثون للمدارس في الإسكندرية، مُعرِّفاً الطلاب بالمصادر المفتوحة عبر محرك Godot.',
          link: 'https://aosus.org/2135',
        },
        {
          num: '٠٢',
          date: 'فبراير ٢٠٢٤',
          title: 'ساهم في ترجمة Firefox!',
          desc: 'Mozilla تطلب من المتحدثين بالعربية تحسين دعم Firefox للعربية. انضم لجهود الترجمة الآن.',
          link: 'https://aosus.org/2125',
        },
        {
          num: '٠٣',
          date: 'نوفمبر ٢٠٢٣',
          title: 'توقف خدمة Piped',
          desc: 'بسبب مشاكل تقنية متكررة مع Piped، سيتم إيقاف الخدمة. تظل بدائل الخصوصية متاحة.',
          link: 'https://aosus.org/2071',
        },
      ],
    },
    cta: {
      heading: 'هل أنت مستعد للمساهمة؟',
      join: 'انضم لديسكورد',
      community: 'المجتمع',
    },
    footer: `أسس © ${new Date().getFullYear()}`,
    navToggle: 'EN',
  },
};

const Design4 = ({ lang: langProp }: { lang?: 'ar' | 'en' } = {}) => {
  const [lang, setLang] = useState<'ar' | 'en'>(langProp ?? 'en');
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);
  const t = CONTENT[lang];
  const isRtl = lang === 'ar';

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const themeClasses = isDark
    ? 'bg-black text-white selection:bg-[#008a2f] selection:text-white'
    : 'bg-white text-black selection:bg-[#1d70ba] selection:text-white';

  const borderColor = isDark ? 'border-white' : 'border-black';

  return (
    <div
      className={`min-h-screen w-full transition-colors duration-300 font-["Space_Mono"] ${themeClasses}`}
      dir={isRtl ? 'rtl' : 'ltr'}
      style={{ fontFamily: isRtl ? "'Almarai', 'Space Mono', monospace" : "'Space Mono', monospace" }}
    >
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 border-b-8 ${borderColor} bg-inherit px-6 py-4 flex justify-between items-center`}
        style={{ backgroundColor: isDark ? 'black' : 'white' }}
      >
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 bg-[#008a2f] border-4 ${borderColor} flex items-center justify-center`}>
            <span className="font-black text-2xl text-white" style={{ fontFamily: 'Almarai, sans-serif' }}>أ</span>
          </div>
          <span className="font-black text-3xl uppercase tracking-tighter hidden md:block">Aosus</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex gap-6 font-bold uppercase tracking-widest text-lg">
            {t.nav.links.map((link, i) => (
              <a
                key={i}
                href="#"
                className={`transition-colors ${i % 2 === 0 ? 'hover:text-[#008a2f]' : 'hover:text-[#1d70ba]'}`}
              >
                {link}
              </a>
            ))}
          </div>
          {!langProp && (
            <button
              onClick={() => setLang(l => l === 'ar' ? 'en' : 'ar')}
              className={`px-4 py-2 border-4 ${borderColor} font-black text-sm hover:bg-[#1d70ba] hover:text-white hover:border-[#1d70ba] transition-all`}
            >
              {t.nav.toggle}
            </button>
          )}
          <button
            onClick={() => setIsDark(!isDark)}
            className={`w-16 h-16 rounded-full border-4 ${borderColor} flex items-center justify-center hover:bg-[#1d70ba] hover:text-white transition-all text-xs font-black`}
          >
            {mounted && (isDark ? t.nav.lightLabel : t.nav.darkLabel)}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 min-h-[90vh] flex flex-col justify-center px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none overflow-hidden flex items-center justify-center">
          <span className="font-black text-[40vw] leading-none whitespace-nowrap" style={{ fontFamily: 'Almarai, sans-serif' }}>أسس</span>
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ x: isRtl ? 100 : -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="flex flex-col gap-8 relative z-20"
          >
            <div className={`inline-block border-4 ${borderColor} px-4 py-2 w-fit bg-[#008a2f] text-white font-bold uppercase tracking-widest transform -rotate-2`} style={{ fontFamily: isRtl ? 'Almarai, sans-serif' : undefined }}>
              {t.nav.badge}
            </div>

            <h1 className="font-black text-7xl md:text-9xl uppercase leading-[0.8] tracking-tighter">
              {t.hero.line1} <br />
              <span className="text-[#1d70ba]">{t.hero.line2}</span> <br />
              {t.hero.line3}
            </h1>

            <div className={`p-6 border-8 ${borderColor} ${isDark ? 'bg-black' : 'bg-white'} w-fit transform translate-x-4 translate-y-4 hover:translate-x-0 hover:translate-y-0 transition-transform`}>
              <h2 className="font-black text-4xl md:text-5xl text-[#008a2f] leading-tight" style={{ fontFamily: 'Almarai, sans-serif' }}>
                {t.hero.tagline}
              </h2>
            </div>

            <p className="text-xl md:text-2xl max-w-xl font-bold border-l-8 border-[#1d70ba] pl-6 leading-tight">
              {t.hero.taglineSub}
            </p>

            <div className="flex flex-wrap gap-6 pt-8">
              <button className={`group flex items-center gap-4 bg-[#008a2f] text-white px-8 py-6 text-2xl font-black uppercase border-4 ${borderColor} hover:bg-black hover:text-white transition-colors`}>
                {t.hero.cta}
                <ArrowRight className={`w-8 h-8 group-hover:translate-x-2 transition-transform ${isRtl ? 'rotate-180' : ''}`} />
              </button>
              <button className={`group flex items-center gap-4 bg-transparent px-8 py-6 text-2xl font-black uppercase border-4 ${borderColor} hover:bg-[#1d70ba] hover:text-white transition-colors`} style={{ fontFamily: isRtl ? 'Almarai, sans-serif' : undefined }}>
                {t.hero.ctaSecondary}
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ x: isRtl ? -100 : 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            className="relative h-[600px] w-full"
          >
            <div className={`absolute inset-0 border-8 ${borderColor} bg-[#1d70ba] transform translate-x-8 translate-y-8`} />
            <div className={`absolute inset-0 border-8 ${borderColor} overflow-hidden bg-white`}>
              <div className="w-full h-full bg-[#008a2f] flex flex-col items-center justify-center p-8">
                <div className="w-full h-full border-4 border-black relative overflow-hidden group">
                  <img
                    src="/__mockup/images/hero-4.png"
                    alt="Brutalist tech poster"
                    className="w-full h-full object-cover grayscale contrast-150 mix-blend-multiply opacity-80 group-hover:grayscale-0 group-hover:mix-blend-normal transition-all duration-500"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center mix-blend-difference pointer-events-none">
                    <span className="font-black text-9xl text-white opacity-50" style={{ fontFamily: 'Almarai, sans-serif' }}>أسس</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Marquee */}
      <div className={`w-full overflow-hidden bg-[#008a2f] text-white border-y-8 ${borderColor} py-6 flex whitespace-nowrap`}>
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ repeat: Infinity, ease: 'linear', duration: 12 }}
          className="flex font-black text-5xl md:text-7xl uppercase tracking-tighter items-center"
          style={{ fontFamily: isRtl ? 'Almarai, sans-serif' : undefined }}
        >
          {t.marquee.map((item, i) => (
            <span key={i} className={`px-8 ${item === '✖' ? 'text-black' : ''}`}>{item}</span>
          ))}
        </motion.div>
      </div>

      {/* Stats Section */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {t.stats.map((stat, i) => {
            const isLight = stat.color.includes('bg-white');
            return (
              <motion.div
                key={i}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`border-8 ${borderColor} p-8 flex flex-col justify-between aspect-square group hover:-translate-y-4 transition-transform relative overflow-hidden ${isDark ? (isLight ? 'bg-black text-white' : stat.color.replace('bg-white dark:bg-black', 'bg-black') ) : stat.color.replace('dark:bg-white', '').replace('dark:bg-black', '')}`}
              >
                <stat.icon className={`absolute -bottom-10 -right-10 w-64 h-64 opacity-10 group-hover:scale-110 transition-transform ${isLight ? '' : 'text-white'}`} />
                <div className={`text-xl font-bold uppercase tracking-widest ${isLight && !isDark ? '' : 'text-white'}`}>
                  {stat.label}
                </div>
                <div>
                  <div className={`font-black text-6xl md:text-8xl tracking-tighter ${isLight && !isDark ? '' : 'text-white'}`}>
                    {stat.num}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Manifesto / Vision */}
      <section className={`py-32 px-6 ${isDark ? 'bg-white text-black' : 'bg-black text-white'} border-y-8 ${borderColor}`}>
        <div className="max-w-6xl mx-auto flex flex-col gap-8">
          <h2 className="font-black text-7xl md:text-9xl uppercase tracking-tighter leading-none">
            {t.vision.heading}
          </h2>
          <div className={`w-full h-4 bg-[#008a2f]`} />
          <p className="text-3xl font-bold leading-tight max-w-3xl" style={{ fontFamily: isRtl ? 'Almarai, sans-serif' : undefined }}>
            {t.vision.body}
          </p>
        </div>
      </section>

      {/* Projects */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className={`flex items-end justify-between mb-16 border-b-8 ${borderColor} pb-8`}>
            <h2 className="font-black text-6xl md:text-8xl uppercase tracking-tighter">{t.projects.heading}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {t.projects.items.map((project, i) => (
              <div
                key={i}
                className={`group border-8 ${borderColor} transition-colors relative overflow-hidden ${i === 1 ? 'md:mt-24' : ''} ${project.invert ? `bg-[#008a2f] text-white ${isDark ? 'hover:bg-white hover:text-black' : 'hover:bg-black hover:text-white'}` : `${isDark ? 'bg-black' : 'bg-white'} hover:bg-[#1d70ba] hover:text-white`}`}
              >
                <div className={`p-8 border-b-8 ${borderColor}`}>
                  <h3 className="font-black text-4xl uppercase mb-2">{project.title}</h3>
                  <p className="font-bold text-xl opacity-80">{project.subtitle}</p>
                </div>
                <div className="p-8 flex flex-col h-full justify-between gap-8">
                  <p className="text-2xl font-bold" style={{ fontFamily: isRtl ? 'Almarai, sans-serif' : undefined }}>
                    {project.body}
                  </p>
                  <div className="flex justify-between items-center self-end w-full">
                    <project.icon className="w-12 h-12" />
                    <a href="#" className="font-black text-3xl uppercase underline decoration-4 underline-offset-8">
                      {project.link}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog / News Section */}
      <section className={`py-32 px-6 bg-[#008a2f] text-white border-y-8 ${borderColor}`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-16 border-b-8 border-white pb-8">
            <h2 className="font-black text-6xl md:text-8xl uppercase tracking-tighter">{t.blog.heading}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            {t.blog.posts.map((post, i) => (
              <motion.a
                key={i}
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ y: 40, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className={`group border-8 ${borderColor} ${i > 0 ? (isRtl ? 'border-r-0' : 'border-l-0') : ''} p-8 flex flex-col justify-between min-h-[400px] bg-white text-black hover:bg-black hover:text-white transition-colors relative overflow-hidden`}
              >
                <div>
                  <div className="flex justify-between items-start mb-8">
                    <span className="font-black text-7xl opacity-20 group-hover:opacity-40 transition-opacity">{post.num}</span>
                    <span className="font-bold text-sm uppercase tracking-widest opacity-60" style={{ fontFamily: isRtl ? 'Almarai, sans-serif' : undefined }}>{post.date}</span>
                  </div>
                  <h3 className="font-black text-3xl uppercase leading-tight mb-4" style={{ fontFamily: isRtl ? 'Almarai, sans-serif' : undefined }}>{post.title}</h3>
                  <p className="text-lg opacity-80 leading-snug" style={{ fontFamily: isRtl ? 'Almarai, sans-serif' : undefined }}>{post.desc}</p>
                </div>
                <div className={`flex items-center gap-3 font-black uppercase tracking-widest mt-8 group-hover:gap-6 transition-all`}>
                  <span>{isRtl ? 'اقرأ' : 'Read'}</span>
                  <ArrowRight className={`w-6 h-6 ${isRtl ? 'rotate-180' : ''}`} />
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <footer className={`border-t-8 ${borderColor} bg-[#1d70ba] text-white pt-32 pb-16 px-6 relative overflow-hidden`}>
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center text-center gap-12">
          <h2 className="font-black text-7xl md:text-9xl uppercase tracking-tighter leading-none mix-blend-difference">
            {t.cta.heading}
          </h2>

          <div className="flex flex-wrap justify-center gap-8 mt-12">
            <button className="bg-black text-white px-12 py-8 text-3xl font-black uppercase hover:bg-white hover:text-black border-8 border-black transition-colors transform hover:-translate-y-2">
              {t.cta.join}
            </button>
            <button className="bg-[#008a2f] text-white px-12 py-8 text-3xl font-black uppercase hover:bg-black hover:text-white border-8 border-black transition-colors transform hover:-translate-y-2" style={{ fontFamily: isRtl ? 'Almarai, sans-serif' : undefined }}>
              {t.cta.community}
            </button>
          </div>
        </div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none opacity-10 font-black text-[30vw] uppercase leading-none text-black">
          AOSUS
        </div>

        <div className="max-w-7xl mx-auto mt-32 pt-8 border-t-8 border-black flex flex-col md:flex-row justify-between items-center gap-8 relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-black flex items-center justify-center border-4 border-black">
              <span className="font-black text-2xl text-white" style={{ fontFamily: 'Almarai, sans-serif' }}>أ</span>
            </div>
            <span className="font-black text-2xl uppercase">{t.footer}</span>
          </div>

          <div className="flex gap-6">
            <a href="#" className="hover:text-black transition-colors"><Twitter className="w-8 h-8" /></a>
            <a href="#" className="hover:text-black transition-colors"><Github className="w-8 h-8" /></a>
            <a href="#" className="hover:text-black transition-colors"><Shield className="w-8 h-8" /></a>
          </div>
        </div>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Almarai:wght@400;700;800&family=Space+Mono:wght@400;700&display=swap');
      ` }} />
    </div>
  );
};

export default Design4;
