import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Globe, ChevronRight, Users, MessageSquare, Calendar, FolderHeart, Heart, Code, Shield, Newspaper, ArrowRight } from 'lucide-react';

const content = {
  ar: {
    nav: {
      about: 'من نحن',
      projects: 'مشاريعنا',
      community: 'المجتمع',
      blog: 'المدونة',
      theme: 'المظهر',
      lang: 'English'
    },
    hero: {
      badge: 'أكبر مجتمع عربي للبرمجيات الحرة والمفتوحة',
      title: 'مرحباً بك في وطنك الرقمي',
      subtitle: 'هنا حيث تنمو الأفكار وتزدهر. مجتمع دافئ يجمع المطورين العرب لبناء مستقبل تقني حر ومفتوح للجميع.',
      cta: 'انضم إلينا',
      secondaryCta: 'استكشف مشاريعنا'
    },
    stats: {
      members: 'عضو',
      posts: 'منشور',
      years: 'سنوات من العطاء',
      topics: 'موضوع'
    },
    projects: {
      title: 'ثمار مجتمعنا',
      subtitle: 'مشاريع حرة تنمو بفضل مساهماتكم',
      items: [
        {
          title: 'خدمات أسس العامة',
          desc: 'واجهات حرة ومنصات بدون إعلانات أو تتبع، حفاظاً على خصوصيتك الرقمية.',
          icon: <Shield className="w-6 h-6" />
        },
        {
          title: 'مجتمع أسس',
          desc: 'المساحة الدافئة للنقاش وإثراء المحتوى العربي المتخصص بالبرمجيات الحرة.',
          icon: <Users className="w-6 h-6" />
        },
        {
          title: 'Discourse Bridge',
          desc: 'جسر يربط مجتمعنا بمنصات المحادثة لتسهيل التفاعل أينما كنت.',
          icon: <MessageSquare className="w-6 h-6" />
        }
      ]
    },
    about: {
      title: 'أكثر من مجرد كود',
      desc: 'أسس هي عائلة تنمو بالحب والمشاركة. نؤمن بأن المعرفة يجب أن تكون حرة، وأن التكنولوجيا هي أداة لتمكين الإنسان لا للسيطرة عليه. نحن هنا لندعم بعضنا البعض في رحلتنا لتعلم ونشر البرمجيات المفتوحة المصدر.',
      values: ['التعاون', 'الشفافية', 'المسؤولية']
    },
    blog: {
      title: 'أحدث التدوينات',
      subtitle: 'نشارك المعرفة وننشر الوعي حول البرمجيات الحرة',
      readMore: 'أقرأ المزيد',
      posts: [
        {
          title: 'مجتمع أسس يرعى هاكاثون Daydream لطلاب المدارس بالإسكندرية',
          date: '12 مايو 2024',
          desc: 'مجتمع أسس يرعى هاكاثون Daydream في الاسكندرية, ليعرف طلاب المدارس على البرمجيات المفتوحة والحرة عبر برمجة الالعاب مع محرك Godot.'
        },
        {
          title: 'ساهم في تَرْجَمَة Firefox!',
          date: '5 أبريل 2024',
          desc: 'هل انت تستخدم متصفح Firefox ومهتم بتحسين دعمة للعربية؟ Mozilla تطلب منك المساعدة! المتصفح يحتاج لمساهمتكم لتحسين دعمه للعربية.'
        },
        {
          title: 'توقف خدمة Piped',
          date: '20 مارس 2024',
          desc: 'خدمة Piped في مجتمع أسس تواجه مشاكل بتشغيل الفيديوهات منذ فترة. ولذلك نعلن عن ايقاف الخدمة قريبا.'
        }
      ]
    },
    cta: {
      title: 'هل أنت مستعد لتكون جزءاً من التغيير؟',
      desc: 'انضم إلى مجتمعنا اليوم وابدأ رحلتك في عالم البرمجيات الحرة والمفتوحة المصدر. سواء كنت مطوراً محترفاً أو مبتدئاً، هناك مكان لك هنا.',
      buttonPrimary: 'انضم لمجتمعنا الآن',
      buttonSecondary: 'ادعمنا'
    },
    footer: {
      desc: 'مجتمع غير ربحي يهدف لنشر ثقافة البرمجيات الحرة في العالم العربي.',
      rights: 'جميع الحقوق محفوظة لمجتمع أسس © 2024'
    }
  },
  en: {
    nav: {
      about: 'About',
      projects: 'Projects',
      community: 'Community',
      blog: 'Blog',
      theme: 'Theme',
      lang: 'العربية'
    },
    hero: {
      badge: 'The Largest Arabic Open Source Community',
      title: 'Welcome to your digital home',
      subtitle: 'Here is where ideas grow and thrive. A warm community bringing Arab developers together to build a free and open tech future for everyone.',
      cta: 'Join Us',
      secondaryCta: 'Explore Projects'
    },
    stats: {
      members: 'Members',
      posts: 'Posts',
      years: 'Years of Giving',
      topics: 'Topics'
    },
    projects: {
      title: 'Fruits of our Community',
      subtitle: 'Free projects growing through your contributions',
      items: [
        {
          title: 'Aosus Public Services',
          desc: 'Free frontends and platforms without ads or tracking, protecting your digital privacy.',
          icon: <Shield className="w-6 h-6" />
        },
        {
          title: 'Aosus Community',
          desc: 'A warm space for discussion and enriching Arabic content specialized in free software.',
          icon: <Users className="w-6 h-6" />
        },
        {
          title: 'Discourse Bridge',
          desc: 'A bridge connecting our community to chat platforms to facilitate interaction wherever you are.',
          icon: <MessageSquare className="w-6 h-6" />
        }
      ]
    },
    about: {
      title: 'More than just code',
      desc: 'Aosus is a family that grows with love and sharing. We believe knowledge should be free, and technology is a tool to empower humans, not control them. We are here to support each other on our journey to learn and spread open source software.',
      values: ['Collaboration', 'Transparency', 'Responsibility']
    },
    blog: {
      title: 'Latest Posts',
      subtitle: 'Sharing knowledge and spreading awareness about free software',
      readMore: 'Read More',
      posts: [
        {
          title: 'Aosus Sponsors Daydream Hackathon for School Students in Alexandria',
          date: 'May 12, 2024',
          desc: 'Aosus sponsors the Daydream hackathon in Alexandria to introduce school students to free and open-source software through game development with the Godot engine.'
        },
        {
          title: 'Contribute to Translating Firefox!',
          date: 'Apr 5, 2024',
          desc: 'Do you use Firefox and are interested in improving its Arabic support? Mozilla needs your help! The browser needs your contributions to improve Arabic support.'
        },
        {
          title: 'Piped Service Discontinuation',
          date: 'Mar 20, 2024',
          desc: 'The Piped service in the Aosus community has been facing video playback issues for a while. Therefore, we are announcing the upcoming discontinuation of the service.'
        }
      ]
    },
    cta: {
      title: 'Are you ready to be part of the change?',
      desc: 'Join our community today and start your journey in the world of free and open-source software. Whether you are a professional developer or a beginner, there is a place for you here.',
      buttonPrimary: 'Join our community now',
      buttonSecondary: 'Support Us'
    },
    footer: {
      desc: 'A non-profit community aiming to spread the culture of free software in the Arab world.',
      rights: 'All rights reserved to Aosus Community © 2024'
    }
  }
};

const Blob = ({ className, delay = 0, duration = 20 }: { className?: string, delay?: number, duration?: number }) => (
  <motion.div
    className={`absolute rounded-full mix-blend-screen filter blur-[80px] opacity-30 ${className}`}
    animate={{
      x: [0, 30, -20, 0],
      y: [0, -40, 20, 0],
      scale: [1, 1.1, 0.9, 1],
    }}
    transition={{
      duration,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
      delay,
    }}
  />
);

const Particle = ({ x, y, delay }: { x: number, y: number, delay: number }) => (
  <motion.div
    className="absolute w-1.5 h-1.5 rounded-full bg-[#008a2f] shadow-[0_0_10px_#008a2f]"
    style={{ left: `${x}%`, top: `${y}%` }}
    animate={{
      y: ["0%", "-100%"],
      opacity: [0, 0.8, 0],
      scale: [0.5, 1.5, 0.5],
    }}
    transition={{
      duration: Math.random() * 5 + 5,
      repeat: Infinity,
      ease: "linear",
      delay,
    }}
  />
);

export default function Design5({ lang: langProp }: { lang?: 'ar' | 'en' } = {}) {
  const [lang, setLang] = useState<'ar' | 'en'>(langProp ?? 'en');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const t = content[lang];
  const isRtl = lang === 'ar';

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  const toggleLang = () => setLang(prev => prev === 'ar' ? 'en' : 'ar');

  const particles = Array.from({ length: 30 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 5,
  }));

  return (
    <div 
      className={`min-h-screen transition-colors duration-1000 ease-in-out overflow-hidden relative ${isRtl ? 'dir-rtl' : 'dir-ltr'}`}
      style={{
        fontFamily: isRtl ? "'Almarai', sans-serif" : "'Plus Jakarta Sans', sans-serif",
        direction: isRtl ? 'rtl' : 'ltr',
        backgroundColor: theme === 'dark' ? '#020b06' : '#f4fbf6',
        color: theme === 'dark' ? '#e2f5e8' : '#041f10'
      }}
    >
      {/* Background Organic Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <Blob className="bg-[#008a2f] w-[40vw] h-[40vw] top-[-10%] left-[-10%]" delay={0} />
        <Blob className="bg-[#1d70ba] w-[50vw] h-[50vw] top-[20%] right-[-10%]" delay={2} duration={25} />
        <Blob className="bg-[#008a2f] w-[30vw] h-[30vw] bottom-[-5%] left-[20%]" delay={4} duration={18} />
      </div>

      {/* Floating Particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-50">
        {particles.map(p => <Particle key={p.id} x={p.x} y={p.y} delay={p.delay} />)}
      </div>

      {/* Navigation */}
      <nav className="relative z-50 w-full px-6 py-6 md:px-12 flex items-center justify-between backdrop-blur-md border-b border-[#008a2f]/10">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#008a2f] to-[#1d70ba] flex items-center justify-center shadow-[0_0_20px_rgba(0,138,47,0.3)]">
            <Heart className="text-white w-5 h-5" />
          </div>
          <span className="text-2xl font-bold tracking-tight">أسس</span>
        </motion.div>

        <div className="hidden md:flex items-center gap-8">
          <motion.a whileHover={{ scale: 1.05 }} className="hover:text-[#008a2f] transition-colors cursor-pointer">{t.nav.about}</motion.a>
          <motion.a whileHover={{ scale: 1.05 }} className="hover:text-[#008a2f] transition-colors cursor-pointer">{t.nav.projects}</motion.a>
          <motion.a whileHover={{ scale: 1.05 }} className="hover:text-[#008a2f] transition-colors cursor-pointer">{t.nav.community}</motion.a>
          <motion.a whileHover={{ scale: 1.05 }} className="hover:text-[#008a2f] transition-colors cursor-pointer">{t.nav.blog}</motion.a>
        </div>

        <div className="flex items-center gap-4">
          {!langProp && (
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleLang}
              className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-white/5 transition-colors"
            >
              <Globe className="w-4 h-4" />
              <span className="text-sm font-medium">{t.nav.lang}</span>
            </motion.button>
          )}
          
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-white/5 transition-colors"
          >
            <AnimatePresence mode="wait">
              {theme === 'dark' ? (
                <motion.div key="moon" initial={{ opacity:0, rotate:-90 }} animate={{ opacity:1, rotate:0 }} exit={{ opacity:0, rotate:90 }}>
                  <Moon className="w-5 h-5 text-[#008a2f]" />
                </motion.div>
              ) : (
                <motion.div key="sun" initial={{ opacity:0, rotate:-90 }} animate={{ opacity:1, rotate:0 }} exit={{ opacity:0, rotate:90 }}>
                  <Sun className="w-5 h-5 text-[#008a2f]" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </nav>

      <main className="relative z-10 px-6 md:px-12 max-w-7xl mx-auto pt-20 pb-32 space-y-32">
        {/* Hero Section */}
        <section className="grid md:grid-cols-2 gap-12 items-center min-h-[70vh]">
          <motion.div 
            initial={{ opacity: 0, x: isRtl ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#008a2f]/10 border border-[#008a2f]/20 text-[#008a2f]">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#008a2f] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#008a2f]"></span>
              </span>
              <span className="text-sm font-bold">{t.hero.badge}</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              {t.hero.title}
            </h1>
            
            <p className="text-lg md:text-xl opacity-80 leading-relaxed max-w-lg">
              {t.hero.subtitle}
            </p>
            
            <div className="flex flex-wrap items-center gap-4">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-full bg-gradient-to-r from-[#008a2f] to-[#1d70ba] text-white font-bold shadow-[0_0_30px_rgba(0,138,47,0.4)] flex items-center gap-2 hover:shadow-[0_0_40px_rgba(0,138,47,0.6)] transition-shadow"
              >
                {t.hero.cta}
                <ChevronRight className={`w-5 h-5 ${isRtl ? 'rotate-180' : ''}`} />
              </motion.button>
              
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-full border-2 border-[#008a2f]/30 hover:bg-[#008a2f]/10 font-bold transition-colors"
              >
                {t.hero.secondaryCta}
              </motion.button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-square rounded-[3rem] overflow-hidden relative shadow-[0_0_50px_rgba(0,138,47,0.2)]">
              <img 
                src="/__mockup/images/hero-5.png" 
                alt="Bioluminescent Arabic Forest" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1542401886-65d6c61de152?q=80&w=2000&auto=format&fit=crop";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020b06] via-transparent to-transparent opacity-80"></div>
            </div>
          </motion.div>
        </section>

        {/* Stats Section */}
        <section className="py-12 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-[#008a2f]/5 via-[#1d70ba]/5 to-[#008a2f]/5 rounded-[3rem] blur-xl"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10 p-8 rounded-[3rem] bg-white/5 border border-white/10 backdrop-blur-lg">
            {[
              { label: t.stats.members, value: '+3,000', icon: Users },
              { label: t.stats.posts, value: '+10,000', icon: MessageSquare },
              { label: t.stats.years, value: '9', icon: Calendar },
              { label: t.stats.topics, value: '+1,300', icon: FolderHeart }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center text-center gap-4"
              >
                <div className="p-4 rounded-full bg-[#008a2f]/20 text-[#008a2f]">
                  <stat.icon className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#008a2f] to-[#1d70ba]">
                    {stat.value}
                  </h3>
                  <p className="mt-2 opacity-70">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section className="space-y-12">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <h2 className="text-4xl font-bold">{t.projects.title}</h2>
            <p className="text-xl opacity-70">{t.projects.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {t.projects.items.map((project, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -10 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#008a2f]/20 to-[#1d70ba]/20 rounded-[2.5rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative h-full p-8 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-md flex flex-col gap-6 hover:bg-white/10 transition-colors">
                  <div className="w-14 h-14 rounded-2xl bg-[#008a2f]/20 flex items-center justify-center text-[#008a2f] group-hover:scale-110 transition-transform">
                    {project.icon}
                  </div>
                  <h3 className="text-2xl font-bold">{project.title}</h3>
                  <p className="opacity-70 leading-relaxed flex-1">{project.desc}</p>
                  <button className={`mt-auto inline-flex items-center gap-2 text-[#008a2f] font-bold self-start group-hover:gap-4 transition-all`}>
                    {t.hero.secondaryCta}
                    <ChevronRight className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* About/Manifesto Section */}
        <section className="relative rounded-[3rem] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#008a2f] to-[#1d70ba] opacity-20"></div>
          <div className="relative p-12 md:p-24 flex flex-col items-center text-center gap-8 backdrop-blur-md border border-white/10">
            <Heart className="w-16 h-16 text-[#008a2f] animate-pulse" />
            <h2 className="text-4xl md:text-5xl font-bold">{t.about.title}</h2>
            <p className="text-xl md:text-2xl leading-relaxed max-w-4xl opacity-90">
              "{t.about.desc}"
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              {t.about.values.map((value, i) => (
                <div key={i} className="px-6 py-3 rounded-full bg-white/10 border border-white/20 font-bold backdrop-blur-sm">
                  {value}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Posts Section */}
        <section className="space-y-12">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6">
            <div className="space-y-4 max-w-2xl">
              <h2 className="text-4xl font-bold flex items-center gap-3">
                <Newspaper className="w-8 h-8 text-[#008a2f]" />
                {t.blog.title}
              </h2>
              <p className="text-xl opacity-70">{t.blog.subtitle}</p>
            </div>
            <motion.button 
              whileHover={{ x: isRtl ? -5 : 5 }}
              className="inline-flex items-center gap-2 text-[#1d70ba] font-bold hover:text-[#008a2f] transition-colors"
            >
              {t.blog.readMore}
              <ArrowRight className={`w-5 h-5 ${isRtl ? 'rotate-180' : ''}`} />
            </motion.button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {t.blog.posts.map((post, i) => (
              <motion.article
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group p-6 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors flex flex-col gap-4 cursor-pointer"
              >
                <div className="text-sm opacity-50 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {post.date}
                </div>
                <h3 className="text-xl font-bold group-hover:text-[#008a2f] transition-colors leading-snug">
                  {post.title}
                </h3>
                <p className="opacity-70 leading-relaxed text-sm flex-1">
                  {post.desc}
                </p>
                <div className="mt-4 pt-4 border-t border-white/10">
                  <span className="text-sm font-bold text-[#008a2f] flex items-center gap-1 group-hover:gap-2 transition-all">
                    {t.blog.readMore}
                    <ChevronRight className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
                  </span>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative rounded-[3rem] overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-r from-[#008a2f]/30 to-[#1d70ba]/30"></div>
            <div className="absolute inset-0 backdrop-blur-[100px]"></div>
          </div>
          <div className="relative p-12 md:p-24 flex flex-col items-center text-center gap-8 border border-white/20 rounded-[3rem]">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#008a2f] to-[#1d70ba] flex items-center justify-center shadow-[0_0_30px_rgba(0,138,47,0.5)] mb-4">
              <Globe className="text-white w-10 h-10 animate-[spin_10s_linear_infinite]" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold">{t.cta.title}</h2>
            <p className="text-xl md:text-2xl leading-relaxed max-w-3xl opacity-90">
              {t.cta.desc}
            </p>
            <div className="flex flex-wrap justify-center items-center gap-4 mt-6">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-full bg-white text-[#041f10] font-bold shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] transition-shadow"
              >
                {t.cta.buttonPrimary}
              </motion.button>
              
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-full border-2 border-white/50 hover:bg-white/10 font-bold transition-colors"
              >
                {t.cta.buttonSecondary}
              </motion.button>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 bg-black/20 backdrop-blur-xl pt-16 pb-8 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center gap-8">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#008a2f] to-[#1d70ba] flex items-center justify-center shadow-[0_0_20px_rgba(0,138,47,0.3)]">
            <Code className="text-white w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold">مجتمع أسس</h2>
          <p className="opacity-60 max-w-md">{t.footer.desc}</p>
          
          <div className="flex gap-6 mt-4">
            {['Twitter', 'GitHub', 'Discord', 'Matrix'].map(social => (
              <a key={social} href="#" className="opacity-60 hover:opacity-100 hover:text-[#008a2f] transition-all">
                {social}
              </a>
            ))}
          </div>
          
          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent my-4"></div>
          
          <p className="opacity-40 text-sm">{t.footer.rights}</p>
        </div>
      </footer>
    </div>
  );
}