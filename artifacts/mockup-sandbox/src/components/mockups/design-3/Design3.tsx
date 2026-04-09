import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Globe, Users, MessageSquare, Clock, BookOpen, ArrowRight, Github, Twitter, Layers, Zap, Star, Shield, Sun, Moon } from 'lucide-react';

const ARABIC = {
  hero: {
    title: "أكبر مجتمع عربي للبرمجيات الحرة",
    subtitle: "نحن نبني شيئاً يتجاوز الحدود — عالم من العقول الناطقة بالعربية تتواصل عبر فضاء المصادر المفتوحة. اكتشف، شارك، وابنِ المستقبل معنا.",
    cta: "انضم إلى المجتمع",
    secondary: "استكشف المشاريع"
  },
  stats: [
    { label: "عضو", value: "+3,000", icon: Users },
    { label: "منشور", value: "+10,000", icon: MessageSquare },
    { label: "سنوات من العطاء", value: "9", icon: Clock },
    { label: "موضوع", value: "+1,300", icon: BookOpen }
  ],
  projects: {
    title: "مشاريع أسس",
    subtitle: "ابتكارات تضيء سماء العالم العربي",
    items: [
      { title: "خدمات أسس العامة", desc: "واجهات للمنصات المعروفة بدون إعلانات أو تتبع، لدعم الخصوصية الرقمية.", icon: Shield },
      { title: "جسر المحادثات", desc: "ربط المجتمع بغرف محادثة متعددة للتفاعل من داخل منصاتك المفضلة.", icon: Zap },
      { title: "جائزة أسس للكتابة", desc: "جائزة شهرية لتحفيز كتابة محتوى حول المصادر الحرة باللغة العربية.", icon: Star }
    ]
  },
  about: {
    title: "من نحن؟",
    content: "أسس مجتمع غير ربحي أنشئ على يد مجموعة من التقنيين العرب، نرتكز على تمكين ونشر الوعي للبرمجيات الحرة والمفتوحة المصدر وفلسفتها."
  },
  blog: {
    title: "آخر التحديثات",
    items: [
      { title: "هاكاثون Daydream", desc: "رعاية هاكاثون لطلاب المدارس للتعرف على البرمجيات المفتوحة عبر برمجة الألعاب.", date: "٢٤ مايو ٢٠٢٤" },
      { title: "ترجمة Firefox", desc: "المتصفح يحتاج لمساهمتكم لتحسين دعمه للغة العربية.", date: "١٢ أبريل ٢٠٢٤" },
      { title: "إيقاف خدمة Piped", desc: "توقف الخدمة قريباً بعد مواجهة مشاكل في التشغيل.", date: "٥ مارس ٢٠٢٤" }
    ]
  },
  footer: {
    rights: "© ٢٠٢٤ مجتمع أسس. جميع الحقوق محفوظة."
  }
};

const ENGLISH = {
  hero: {
    title: "The Largest Arabic Open-Source Community",
    subtitle: "We are building something that transcends borders — a cosmos of Arabic-speaking minds connecting across the universe of open source. Discover, share, and build the future with us.",
    cta: "Join the Community",
    secondary: "Explore Projects"
  },
  stats: [
    { label: "Members", value: "3,000+", icon: Users },
    { label: "Posts", value: "10,000+", icon: MessageSquare },
    { label: "Years Active", value: "9", icon: Clock },
    { label: "Topics", value: "1,300+", icon: BookOpen }
  ],
  projects: {
    title: "Aosus Projects",
    subtitle: "Innovations lighting up the Arab world",
    items: [
      { title: "Aosus Public Services", desc: "Ad-free, tracker-free frontends for popular platforms, supporting digital privacy.", icon: Shield },
      { title: "Chat Bridge", desc: "Connect the community with multiple chat rooms to interact from your favorite platforms.", icon: Zap },
      { title: "Aosus Writing Award", desc: "Monthly award to incentivize writing content about open source in Arabic.", icon: Star }
    ]
  },
  about: {
    title: "Who Are We?",
    content: "Aosus is a non-profit community founded by a group of Arab tech enthusiasts, focused on enabling and spreading awareness of free and open-source software and its philosophy."
  },
  blog: {
    title: "Latest Updates",
    items: [
      { title: "Daydream Hackathon", desc: "Sponsoring a school hackathon to introduce open-source through game dev.", date: "May 24, 2024" },
      { title: "Translate Firefox", desc: "The browser needs your contribution to improve Arabic support.", date: "Apr 12, 2024" },
      { title: "Piped Service Deprecation", desc: "Service stopping soon due to playback issues.", date: "Mar 5, 2024" }
    ]
  },
  footer: {
    rights: "© 2024 Aosus Community. All rights reserved."
  }
};

// Canvas Starfield Component
const Starfield = ({ isDark }: { isDark: boolean }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;

    canvas.width = width;
    canvas.height = height;

    const stars: { x: number; y: number; radius: number; speed: number; opacity: number }[] = [];
    const numStars = 200;

    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.5,
        speed: Math.random() * 0.5 + 0.1,
        opacity: Math.random()
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = isDark ? '#ffffff' : '#008a2f';

      stars.forEach(star => {
        ctx.globalAlpha = star.opacity * (isDark ? 1 : 0.4);
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();

        star.y -= star.speed;
        if (star.y < 0) {
          star.y = height;
          star.x = Math.random() * width;
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDark]);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.6 }}
    />
  );
};

export function Design3({ lang: langProp }: { lang?: 'ar' | 'en' } = {}) {
  const [lang, setLang] = useState<'ar' | 'en'>(langProp ?? 'ar');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const content = lang === 'ar' ? ARABIC : ENGLISH;
  const isDark = theme === 'dark';

  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Handle theme class
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');
  const toggleLang = () => setLang(l => l === 'ar' ? 'en' : 'ar');

  return (
    <div 
      className={`min-h-screen relative overflow-hidden transition-colors duration-700 font-sans ${isDark ? 'bg-[#020617] text-white' : 'bg-slate-50 text-slate-900'} ${lang === 'ar' ? 'font-arabic' : 'font-outfit'}`}
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
      style={{
        fontFamily: lang === 'ar' ? '"Almarai", sans-serif' : '"Space Grotesk", "Outfit", sans-serif'
      }}
    >
      <Starfield isDark={isDark} />

      {/* Cosmic Orbs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.div 
          animate={{ 
            x: [0, 50, 0, -50, 0],
            y: [0, 30, 0, -30, 0],
            scale: [1, 1.1, 1, 0.9, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full blur-[120px] opacity-30 mix-blend-screen"
          style={{ background: 'radial-gradient(circle, #008a2f 0%, transparent 70%)' }}
        />
        <motion.div 
          animate={{ 
            x: [0, -60, 0, 60, 0],
            y: [0, -40, 0, 40, 0],
            scale: [1, 1.2, 1, 0.8, 1]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full blur-[150px] opacity-30 mix-blend-screen"
          style={{ background: 'radial-gradient(circle, #1d70ba 0%, transparent 70%)' }}
        />
      </div>

      {/* Navbar */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 backdrop-blur-md ${isDark ? 'bg-[#020617]/50 border-b border-white/10' : 'bg-white/50 border-b border-slate-200/50'}`}>
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#008a2f] to-[#1d70ba] flex items-center justify-center text-white font-bold text-xl shadow-[0_0_20px_rgba(0,138,47,0.4)]">
              أس
            </div>
            <span className="font-bold text-xl tracking-wide">Aosus</span>
          </div>
          
          <div className="flex items-center gap-4">
            {!langProp && (
              <button 
                onClick={toggleLang}
                className={`p-2 rounded-full backdrop-blur-sm border transition-colors ${isDark ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-slate-900/5 border-slate-900/10 hover:bg-slate-900/10'}`}
                aria-label="Toggle Language"
              >
                <Globe className="w-5 h-5" />
              </button>
            )}
            <button 
              onClick={toggleTheme}
              className={`p-2 rounded-full backdrop-blur-sm border transition-colors ${isDark ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-slate-900/5 border-slate-900/10 hover:bg-slate-900/10'}`}
              aria-label="Toggle Theme"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-6 pt-20">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <h1 className={`text-5xl md:text-7xl lg:text-8xl font-extrabold mb-8 leading-tight tracking-tight ${isDark ? 'text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400' : 'text-slate-900'}`}>
                {content.hero.title}
              </h1>
              <p className={`text-lg md:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                {content.hero.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 rounded-full bg-gradient-to-r from-[#008a2f] to-[#1d70ba] text-white font-bold text-lg shadow-[0_0_30px_rgba(0,138,47,0.3)] hover:shadow-[0_0_40px_rgba(29,112,186,0.5)] transition-shadow w-full sm:w-auto"
                >
                  {content.hero.cta}
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-8 py-4 rounded-full font-bold text-lg backdrop-blur-md border w-full sm:w-auto transition-colors ${isDark ? 'bg-white/5 border-white/10 hover:bg-white/10 text-white' : 'bg-slate-900/5 border-slate-900/10 hover:bg-slate-900/10 text-slate-900'}`}
                >
                  {content.hero.secondary}
                </motion.button>
              </div>
            </motion.div>
          </div>
          
          <motion.div 
            style={{ y, opacity }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
          >
            <div className={`w-[1px] h-24 ${isDark ? 'bg-gradient-to-b from-white/0 via-white/50 to-white/0' : 'bg-gradient-to-b from-slate-900/0 via-slate-900/50 to-slate-900/0'}`} />
          </motion.div>
        </section>

        {/* Stats Cosmos */}
        <section className="py-24 px-6 relative">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {content.stats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className={`relative group rounded-3xl p-8 backdrop-blur-xl border transition-all duration-500 hover:-translate-y-2 ${isDark ? 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20' : 'bg-white/60 border-slate-200 shadow-xl hover:shadow-2xl hover:border-[#008a2f]/30'}`}
                >
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#008a2f]/10 to-[#1d70ba]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <stat.icon className={`w-10 h-10 mb-6 ${isDark ? 'text-[#008a2f]' : 'text-[#1d70ba]'}`} />
                  <h3 className={`text-4xl font-extrabold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {stat.value}
                  </h3>
                  <p className={`text-lg ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects / Nebula */}
        <section className="py-32 px-6 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {content.projects.title}
              </h2>
              <p className={`text-xl ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                {content.projects.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {content.projects.items.map((project, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.2 }}
                  className={`group relative h-full rounded-[2rem] p-10 overflow-hidden backdrop-blur-2xl border ${isDark ? 'bg-[#020617]/40 border-white/10' : 'bg-white/80 border-slate-200 shadow-2xl'}`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#008a2f]/20 to-[#1d70ba]/20 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-out" />
                  <div className="relative z-10">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 ${isDark ? 'bg-white/10 text-white' : 'bg-slate-900/5 text-slate-900'}`}>
                      <project.icon className="w-8 h-8" />
                    </div>
                    <h3 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      {project.title}
                    </h3>
                    <p className={`leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      {project.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Hero Image Section */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto rounded-[3rem] overflow-hidden relative group">
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
            <img 
              src="/__mockup/images/hero-3.png" 
              alt="Cosmic Aosus" 
              className="w-full h-[60vh] object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute bottom-10 left-10 right-10 z-20">
              <h2 className="text-4xl font-bold text-white mb-4">{content.about.title}</h2>
              <p className="text-xl text-slate-200 max-w-2xl">{content.about.content}</p>
            </div>
          </div>
        </section>

        {/* Blog / Constellations */}
        <section className="py-32 px-6 relative">
          <div className="max-w-5xl mx-auto">
            <h2 className={`text-4xl font-bold mb-16 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {content.blog.title}
            </h2>
            <div className="space-y-6">
              {content.blog.items.map((post, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: lang === 'ar' ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className={`group p-8 rounded-3xl backdrop-blur-xl border cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all ${isDark ? 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-[#1d70ba]/50' : 'bg-white/60 border-slate-200 shadow-lg hover:shadow-xl hover:border-[#1d70ba]/30'}`}
                >
                  <div className="flex-1">
                    <span className={`text-sm font-medium mb-3 block ${isDark ? 'text-[#008a2f]' : 'text-[#008a2f]'}`}>
                      {post.date}
                    </span>
                    <h3 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      {post.title}
                    </h3>
                    <p className={`${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      {post.desc}
                    </p>
                  </div>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-transform group-hover:scale-110 group-hover:bg-[#1d70ba] group-hover:text-white ${isDark ? 'bg-white/10 text-white' : 'bg-slate-900/5 text-slate-900'}`}>
                    <ArrowRight className={`w-5 h-5 ${lang === 'ar' ? 'rotate-180' : ''}`} />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className={`py-12 px-6 border-t ${isDark ? 'border-white/10 bg-[#020617]' : 'border-slate-200 bg-slate-50'}`}>
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#008a2f] to-[#1d70ba] flex items-center justify-center text-white font-bold text-sm">
                أس
              </div>
              <span className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Aosus</span>
            </div>
            <div className={`text-sm ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
              {content.footer.rights}
            </div>
            <div className="flex items-center gap-4">
              <a href="#" className={`transition-colors ${isDark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'}`}><Github className="w-5 h-5" /></a>
              <a href="#" className={`transition-colors ${isDark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'}`}><Twitter className="w-5 h-5" /></a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
