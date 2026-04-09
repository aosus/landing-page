import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Shield, Users, Server, MessageSquare, ChevronRight, Moon, Sun, Globe, Cpu, Database, Activity, ExternalLink, BookOpen } from 'lucide-react';

const CONTENT = {
  en: {
    badge: 'v3.0.0_ONLINE',
    statusBadge: 'STATUS: ACTIVE',
    heading: 'The Largest Arabic Open-Source Community',
    subtitle: 'Where Arab tech rebels build the future. Open-source code is the foundation of modern civilization, and we are driving the revolution.',
    ctaJoin: 'Execute.JOIN()',
    nav: { about: '/about', projects: '/projects', blog: '/blog', toggle: 'AR' },
    stats: [
      { label: 'Members', value: '3,000+', icon: Users },
      { label: 'Posts', value: '10,000+', icon: MessageSquare },
      { label: 'Topics', value: '1,300+', icon: Database },
      { label: 'Years', value: '9', icon: Activity },
    ],
    projectsHeading: 'Active_Projects',
    projects: [
      {
        titleEn: 'Discourse Community',
        descEn: 'The central hub for Arabic tech discussions. The core of Aosus.',
        icon: Server,
        iconClass: 'text-[#008a2f]',
        link: 'https://discourse.aosus.org/',
      },
      {
        titleEn: 'Privacy Services',
        descEn: 'Ad-free frontend services (SearXNG, Nitter, Redlib) hosted by Aosus.',
        icon: Shield,
        iconClass: 'text-[#1d70ba]',
        link: 'https://aosus.org/services',
      },
      {
        titleEn: 'Chat Bridge',
        descEn: 'Open-source tool connecting Discourse with Matrix, Telegram, and Discord.',
        icon: Cpu,
        iconClass: 'text-[#008a2f]',
        link: 'https://github.com/aosus/discourse-chat-bridge',
      },
    ],
    blogHeading: 'Latest_Logs',
    blog: [
      {
        title: 'Aosus Sponsors Daydream Hackathon for School Students',
        date: '2024-03-15',
        excerpt: 'Aosus sponsors the Daydream hackathon in Alexandria, introducing school students to free and open-source software through game dev with the Godot engine.',
        link: 'https://aosus.org/2135',
      },
      {
        title: 'Contribute to Translating Firefox!',
        date: '2024-02-28',
        excerpt: 'Do you use Firefox and want to improve its Arabic support? Mozilla needs your help! The browser needs contributions to improve Arabic language support.',
        link: 'https://aosus.org/2125',
      },
      {
        title: 'Piped Service Discontinuation',
        date: '2023-11-10',
        excerpt: 'The Piped service in the Aosus community has been facing playback issues. We are announcing the upcoming discontinuation of the service.',
        link: 'https://aosus.org/2071',
      },
    ],
    aboutHeading: 'sys.info("about")',
    aboutTerminal: ['> Non-profit organization', '> Founded by Arab technologists', '> Spanning across the Arab world'],
    aboutBody: 'Aosus is a non-profit community established by Arab technologists from across the world. We focus on empowering and spreading awareness of Free and Open Source Software and its philosophy in Arabic.',
    ctaHeading: 'Join the Open-Source Revolution',
    ctaSubtitle: '> Join the largest Arabic open-source community today.',
    ctaButton: 'initiate_connection()',
    footerStatus: 'Systems operational',
    footerRights: `© ${new Date().getFullYear()} Aosus Community. All rights reserved.`,
    aboutTitle: 'Who Are We?',
  },
  ar: {
    badge: 'الإصدار 3.0.0_متصل',
    statusBadge: 'الحالة: نشط',
    heading: 'أكبر مجتمع عربي للبرمجيات الحرة',
    subtitle: 'حيث يبني التقنيون العرب مستقبل المصادر المفتوحة. الشيفرة الحرة هي أساس الحضارة الحديثة، ونحن القوة العربية التي تقود هذه الثورة.',
    ctaJoin: 'انضم الآن',
    nav: { about: '/من-نحن', projects: '/المشاريع', blog: '/المدونة', toggle: 'EN' },
    stats: [
      { label: 'عضو', value: '+3,000', icon: Users },
      { label: 'منشور', value: '+10,000', icon: MessageSquare },
      { label: 'موضوع', value: '+1,300', icon: Database },
      { label: 'سنوات', value: '9', icon: Activity },
    ],
    projectsHeading: 'المشاريع_النشطة',
    projects: [
      {
        titleEn: 'مجتمع ديسكورس',
        descEn: 'المركز الأساسي للنقاشات التقنية العربية. قلب مجتمع أسس.',
        icon: Server,
        iconClass: 'text-[#008a2f]',
        link: 'https://discourse.aosus.org/',
      },
      {
        titleEn: 'خدمات الخصوصية',
        descEn: 'واجهات خالية من الإعلانات للخدمات الشائعة، مستضافة بواسطة أسس.',
        icon: Shield,
        iconClass: 'text-[#1d70ba]',
        link: 'https://aosus.org/services',
      },
      {
        titleEn: 'جسر المحادثات',
        descEn: 'أداة مفتوحة المصدر لربط ديسكورس مع ماتركس، تيليجرام وديسكورد.',
        icon: Cpu,
        iconClass: 'text-[#008a2f]',
        link: 'https://github.com/aosus/discourse-chat-bridge',
      },
    ],
    blogHeading: 'آخر_التدوينات',
    blog: [
      {
        title: 'مجتمع أسس يرعى هاكاثون Daydream لطلاب المدارس',
        date: '٢٠٢٤-٠٣-١٥',
        excerpt: 'مجتمع أسس يرعى هاكاثون Daydream في الإسكندرية، ليعرف طلاب المدارس على البرمجيات المفتوحة والحرة عبر برمجة الألعاب مع محرك Godot.',
        link: 'https://aosus.org/2135',
      },
      {
        title: 'ساهم في تَرْجَمَة Firefox!',
        date: '٢٠٢٤-٠٢-٢٨',
        excerpt: 'هل تستخدم متصفح Firefox ومهتم بتحسين دعمه للعربية؟ Mozilla تطلب منك المساعدة! المتصفح يحتاج لمساهمتكم لتحسين دعمه للعربية.',
        link: 'https://aosus.org/2125',
      },
      {
        title: 'توقف خدمة Piped',
        date: '٢٠٢٣-١١-١٠',
        excerpt: 'خدمة Piped في مجتمع أسس تواجه مشاكل بتشغيل الفيديوهات منذ فترة. ولذلك نعلن عن إيقاف الخدمة قريبا.',
        link: 'https://aosus.org/2071',
      },
    ],
    aboutHeading: 'معلومات_النظام',
    aboutTerminal: ['> منظمة غير ربحية', '> أسسها تقنيون عرب', '> تمتد عبر العالم العربي'],
    aboutBody: 'أسس مجتمع غير ربحي أنشئ على يد مجموعة من التقنيين العرب من مختلف أقطار العالم، يرتكز على تمكين ونشر الوعي والثقافة للبرمجيات الحرة والمفتوحة المصدر وفلسفتها باللغة العربية.',
    ctaHeading: 'انضم إلى ثورة المصادر المفتوحة',
    ctaSubtitle: '> انضم إلى أكبر مجتمع عربي مفتوح المصدر اليوم.',
    ctaButton: 'ابدأ_الاتصال()',
    footerStatus: 'الأنظمة تعمل',
    footerRights: `© ${new Date().getFullYear()} مجتمع أسس. جميع الحقوق محفوظة.`,
    aboutTitle: 'من نحن؟',
  },
};

const MatrixRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const arabicChars = 'أبجدهوزحطيكلمنسعفصقرشتثخذضظغ'.split('');
    const latinChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%"\'#&_(),.;:?!\\|{}<>[]^~'.split('');
    const chars = [...arabicChars, ...latinChars];
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops: number[] = [];

    for (let x = 0; x < columns; x++) drops[x] = 1;

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#008a2f';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33);
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none opacity-20 z-0 mix-blend-screen" />;
};

export default function Design1({ lang: langProp }: { lang?: 'ar' | 'en' } = {}) {
  const [lang, setLang] = useState<'ar' | 'en'>(langProp ?? 'en');
  const [isDark, setIsDark] = useState(true);
  const [mounted, setMounted] = useState(false);
  const t = CONTENT[lang];
  const isRtl = lang === 'ar';

  useEffect(() => {
    setMounted(true);
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  if (!mounted) return null;

  return (
    <div
      className={`min-h-screen ${isDark ? 'bg-black text-white' : 'bg-white text-gray-900'} selection:bg-[#008a2f] selection:text-black overflow-x-hidden font-mono transition-colors duration-300`}
      dir={isRtl ? 'rtl' : 'ltr'}
      style={{ fontFamily: isRtl ? "'Almarai', monospace" : "monospace" }}
    >
      <MatrixRain />

      <div className="fixed top-0 left-1/4 w-96 h-96 bg-[#008a2f]/10 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-[#1d70ba]/10 rounded-full blur-[120px] pointer-events-none z-0" />

      {/* Navigation */}
      <nav className={`fixed w-full z-50 border-b border-[#008a2f]/20 ${isDark ? 'bg-black/50' : 'bg-white/50'} backdrop-blur-md`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <img
                src="https://aosus.org/wp-content/uploads/2021/09/aosus-w-lwogores.png"
                alt="Aosus Logo"
                className={`h-8 w-auto filter brightness-0 ${isDark ? 'invert' : ''}`}
              />
              <div className="hidden md:flex text-sm text-[#008a2f] tracking-widest uppercase">
                <span className="opacity-50">sys.</span>INIT()
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className={`hidden md:flex gap-6 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                <a href="#about" className="hover:text-[#008a2f] transition-all px-2 py-1 rounded">{t.nav.about}</a>
                <a href="#projects" className="hover:text-[#008a2f] transition-all px-2 py-1 rounded">{t.nav.projects}</a>
                <a href="#blog" className="hover:text-[#008a2f] transition-all px-2 py-1 rounded">{t.nav.blog}</a>
              </div>
              {!langProp && (
                <button
                  onClick={() => setLang(l => l === 'ar' ? 'en' : 'ar')}
                  className={`px-3 py-1 text-xs border border-[#1d70ba]/30 text-[#1d70ba] hover:bg-[#1d70ba]/10 transition-all rounded`}
                >
                  {t.nav.toggle}
                </button>
              )}
              <button
                onClick={() => setIsDark(!isDark)}
                className="p-2 border border-[#008a2f]/30 rounded text-[#008a2f] hover:bg-[#008a2f]/10 transition-all"
              >
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#008a2f]/30 bg-[#008a2f]/5 text-[#008a2f] text-xs">
              <Terminal className="w-3 h-3 animate-pulse" />
              <span>{t.badge}</span>
            </div>

            <h1 className={`text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {t.heading}
            </h1>

            <p className={`text-lg sm:text-xl max-w-2xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {t.subtitle}
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://discourse.aosus.org"
                className="group relative inline-flex items-center justify-center px-8 py-3 bg-transparent border border-[#008a2f] text-[#008a2f] font-bold uppercase tracking-wider overflow-hidden hover:shadow-[0_0_20px_rgba(0,138,47,0.6)] transition-all"
              >
                <span className="absolute inset-0 bg-[#008a2f] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
                <span className="relative z-10 group-hover:text-black flex items-center gap-2">
                  {t.ctaJoin}
                  <ChevronRight className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className={`py-20 relative z-10 ${isDark ? 'bg-black/40' : 'bg-gray-50/80'} border-y border-[#008a2f]/10 backdrop-blur-sm`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {t.stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`p-6 border border-[#008a2f]/20 bg-[#008a2f]/5 relative group hover:bg-[#008a2f]/10 transition-colors cursor-default`}
              >
                <stat.icon className="w-6 h-6 text-[#008a2f] mb-4 opacity-50 group-hover:opacity-100 transition-all" />
                <div className={`text-3xl sm:text-4xl font-bold mb-2 group-hover:text-[#008a2f] transition-colors ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {stat.value}
                </div>
                <div className={`text-xs uppercase tracking-widest ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                  {stat.label}
                </div>
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#008a2f] group-hover:w-full group-hover:h-full transition-all duration-500 opacity-50 pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#008a2f] group-hover:w-full group-hover:h-full transition-all duration-500 opacity-50 pointer-events-none" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <h2 className={`text-3xl font-bold uppercase tracking-widest ${isDark ? 'text-white' : 'text-gray-900'}`}>
              <span className="text-[#008a2f]">/</span> {t.projectsHeading}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {t.projects.map((project, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className={`group p-1 bg-gradient-to-b ${isDark ? 'from-gray-800 to-black' : 'from-gray-100 to-white'} rounded-lg relative overflow-hidden`}
              >
                <div className={`${isDark ? 'bg-black' : 'bg-white'} p-6 rounded-md h-full border ${isDark ? 'border-gray-800 group-hover:border-[#008a2f]/50' : 'border-gray-200 group-hover:border-[#008a2f]/50'} transition-colors relative z-10 flex flex-col`}>
                  <project.icon className={`w-8 h-8 mb-6 ${project.iconClass} group-hover:scale-110 transition-transform`} />
                  <div className="space-y-2 flex-grow">
                    <h3 className={`text-lg font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>{project.titleEn}</h3>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{project.descEn}</p>
                  </div>
                  <a
                    href={project.link}
                    className={`mt-6 flex items-center gap-2 text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'} hover:text-[#008a2f] transition-colors uppercase tracking-widest w-fit`}
                  >
                    <ExternalLink className="w-3 h-3" /> Execute()
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className={`py-24 relative z-10 ${isDark ? 'bg-gray-900/20' : 'bg-gray-50/80'} border-t border-[#008a2f]/10`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <h2 className={`text-3xl font-bold uppercase tracking-widest ${isDark ? 'text-white' : 'text-gray-900'}`}>
              <span className="text-[#008a2f]">/</span> {t.blogHeading}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {t.blog.map((post, i) => (
              <motion.a
                key={i}
                href={post.link}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`group block p-6 border ${isDark ? 'border-gray-800 bg-black hover:border-[#008a2f]' : 'border-gray-200 bg-white hover:border-[#008a2f]'} relative overflow-hidden transition-all hover:shadow-[0_0_30px_rgba(0,138,47,0.15)]`}
              >
                <BookOpen className="absolute top-4 right-4 w-10 h-10 opacity-5 group-hover:opacity-20 group-hover:text-[#008a2f] transition-all" />
                <div className="relative z-10 flex flex-col h-full">
                  <div className="text-xs font-mono text-[#008a2f] mb-4">{post.date}</div>
                  <h3 className={`text-lg font-bold mb-3 group-hover:text-[#008a2f] transition-colors ${isDark ? 'text-white' : 'text-gray-900'}`}>{post.title}</h3>
                  <p className={`text-sm leading-relaxed flex-grow ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{post.excerpt}</p>
                  <div className={`mt-6 flex items-center gap-2 text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'} group-hover:text-[#008a2f] transition-colors font-mono`}>
                    <span>read_more()</span>
                    <ChevronRight className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className={`py-24 relative z-10 ${isDark ? 'bg-black/80' : 'bg-white'} border-t border-[#008a2f]/10`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#008a2f] to-[#1d70ba] rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000" />
              <img
                src="/__mockup/images/hero-1.png"
                alt="Aosus community"
                className="relative rounded-lg w-full object-cover border border-gray-800 aspect-video"
              />
            </div>
            <div className="space-y-8">
              <h2 className="text-2xl font-bold text-[#008a2f] uppercase tracking-widest">
                {t.aboutHeading}
              </h2>
              <div className={`p-4 ${isDark ? 'bg-gray-900/50' : 'bg-gray-50'} border-l-2 border-[#008a2f] font-mono text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                {t.aboutTerminal.map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
                <p className="text-[#008a2f] animate-pulse">_</p>
              </div>
              <div>
                <h3 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>{t.aboutTitle}</h3>
                <p className={`text-lg leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{t.aboutBody}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-24 relative z-10 border-t border-[#008a2f]/20 ${isDark ? 'bg-gradient-to-b from-black to-gray-900' : 'bg-gradient-to-b from-white to-gray-50'} overflow-hidden`}>
        <div className="absolute inset-0 bg-[#008a2f]/5" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-8">
          <Globe className="w-16 h-16 text-[#008a2f] mx-auto animate-pulse" />
          <h2 className={`text-4xl md:text-5xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{t.ctaHeading}</h2>
          <p className={`text-xl ${isDark ? 'text-gray-400' : 'text-gray-500'} max-w-2xl mx-auto font-mono`}>{t.ctaSubtitle}</p>
          <a
            href="https://discourse.aosus.org"
            className="inline-flex items-center justify-center px-10 py-4 bg-[#008a2f] text-black font-bold text-lg uppercase tracking-widest hover:bg-white hover:shadow-[0_0_40px_rgba(0,138,47,0.8)] transition-all duration-300"
          >
            {t.ctaButton}
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-8 border-t ${isDark ? 'border-gray-900 bg-black' : 'border-gray-100 bg-white'} relative z-10 text-center`}>
        <div className={`flex flex-col items-center justify-center gap-4 text-sm ${isDark ? 'text-gray-600' : 'text-gray-400'} font-mono`}>
          <p>{t.footerRights}</p>
          <div className="flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#008a2f] animate-pulse shadow-[0_0_10px_rgba(0,138,47,1)]" />
            <span>{t.footerStatus}</span>
          </div>
        </div>
      </footer>

      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Almarai:wght@400;700;800&display=swap');
      `}} />
    </div>
  );
}
