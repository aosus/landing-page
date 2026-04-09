import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, 
  ArrowRight, 
  Moon, 
  Sun, 
  BookOpen, 
  Users, 
  MessageSquare, 
  Calendar,
  Code2,
  Globe2,
  TerminalSquare,
  HeartHandshake
} from "lucide-react";

const AosusLogo = () => (
  <img 
    src="https://aosus.org/wp-content/uploads/2021/09/aosus-w-lwogores.png" 
    alt="Aosus Logo" 
    className="h-10 w-auto invert dark:invert-0 transition-all duration-500" 
  />
);

const SectionHeading = ({ english, arabic }: { english: string, arabic: string }) => (
  <div className="flex flex-col md:flex-row justify-between items-end md:items-end border-b border-black/10 dark:border-white/10 pb-6 mb-12 gap-4">
    <h2 className="font-playfair text-4xl md:text-5xl font-medium tracking-tight text-slate-900 dark:text-slate-50 w-full md:w-1/2">
      {english}
    </h2>
    <h2 className="font-almarai text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-slate-50 w-full md:w-1/2 text-right" dir="rtl">
      {arabic}
    </h2>
  </div>
);

export const Design2 = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
    }
  };

  return (
    <div className={`min-h-screen bg-[#faf9f7] dark:bg-[#0f1115] text-slate-900 dark:text-slate-100 selection:bg-[#008a2f] selection:text-white transition-colors duration-700 ease-in-out font-sans`}>
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Almarai:wght@300;400;700;800&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Inter:wght@300;400;500;600&display=swap');
        
        .font-almarai { font-family: 'Almarai', sans-serif; }
        .font-playfair { font-family: 'Playfair Display', serif; }
        .font-inter { font-family: 'Inter', sans-serif; }
        
        .bg-grid-pattern {
          background-image: linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px);
          background-size: 4rem 4rem;
        }
        .dark .bg-grid-pattern {
          background-image: linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px);
        }
      `}} />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 mix-blend-difference px-6 py-6 md:px-12 flex justify-between items-center pointer-events-none">
        <div className="pointer-events-auto">
          <AosusLogo />
        </div>
        <button 
          onClick={toggleTheme}
          className="pointer-events-auto w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors backdrop-blur-md"
          aria-label="Toggle Theme"
        >
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col justify-center px-6 md:px-12 pt-32 pb-24 overflow-hidden bg-grid-pattern">
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent to-[#faf9f7] dark:to-[#0f1115] z-0" />
        
        <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* English Side */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="flex flex-col space-y-8 order-2 lg:order-1"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center space-x-2">
              <span className="h-px w-8 bg-[#008a2f]"></span>
              <span className="font-inter text-sm tracking-widest uppercase text-[#008a2f] font-medium">A Cultural Force</span>
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="font-playfair text-6xl md:text-7xl lg:text-8xl leading-[1.1] font-medium text-slate-900 dark:text-white">
              The Largest <br/>
              <span className="italic text-[#1d70ba]">Arabic</span> <br/>
              Open-Source <br/>
              Community.
            </motion.h1>
            
            <motion.p variants={itemVariants} className="font-inter text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-md leading-relaxed">
              Preserving Arabic technical knowledge, building a legacy, and celebrating the richness of the language in technology.
            </motion.p>
          </motion.div>

          {/* Arabic Side */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="flex flex-col space-y-8 text-right order-1 lg:order-2"
            dir="rtl"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center justify-end space-x-2 space-x-reverse">
              <span className="font-almarai text-sm tracking-wide text-[#008a2f] font-bold">قوة ثقافية</span>
              <span className="h-px w-8 bg-[#008a2f]"></span>
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="font-almarai text-6xl md:text-7xl lg:text-8xl leading-[1.2] font-bold text-slate-900 dark:text-white">
              أكبر مجتمع <br/>
              <span className="text-[#1d70ba]">عربي</span> <br/>
              للبرمجيات <br/>
              الحرة.
            </motion.h1>
            
            <motion.p variants={itemVariants} className="font-almarai text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-md mr-auto leading-relaxed">
              حفظ المعرفة التقنية العربية، وبناء إرث، والاحتفاء بثراء اللغة العربية في عالم التكنولوجيا.
            </motion.p>
          </motion.div>

        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="relative w-full max-w-7xl mx-auto mt-24 h-[400px] md:h-[600px] overflow-hidden rounded-sm"
        >
          <img 
            src="/__mockup/images/hero-2.png" 
            alt="Arabic Calligraphy and Code" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 border border-black/10 dark:border-white/10 rounded-sm pointer-events-none" />
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-24 px-6 md:px-12 bg-[#1d70ba]/5 dark:bg-[#1d70ba]/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-6 divide-x divide-black/5 dark:divide-white/5 rtl:divide-x-reverse">
            {[
              { num: "+3,000", eng: "Members", ar: "عضو", icon: Users },
              { num: "+10,000", eng: "Posts", ar: "منشور", icon: MessageSquare },
              { num: "9", eng: "Years", ar: "سنوات من العطاء", icon: Calendar },
              { num: "+1,300", eng: "Topics", ar: "موضوع", icon: BookOpen }
            ].map((stat, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="flex flex-col items-center text-center px-4"
              >
                <stat.icon className="w-6 h-6 mb-6 text-[#1d70ba] opacity-50" />
                <span className="font-playfair text-4xl md:text-5xl font-semibold mb-4">{stat.num}</span>
                <div className="flex flex-col space-y-1">
                  <span className="font-inter text-sm text-slate-500 uppercase tracking-widest">{stat.eng}</span>
                  <span className="font-almarai text-sm text-slate-500">{stat.ar}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-32 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <SectionHeading english="About Us" arabic="من نحن" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 text-lg md:text-xl leading-relaxed text-slate-600 dark:text-slate-300">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="font-inter space-y-6"
            >
              <p>
                <strong className="font-playfair font-medium text-2xl text-slate-900 dark:text-white block mb-4">A Non-Profit Founded by Arab Technologists</strong>
                Aosus is a non-profit community established by a group of Arab technologists from around the world. We focus on empowering and spreading awareness about Free and Open Source Software (FOSS) and its philosophy in Arabic.
              </p>
              <p>
                Our vision is to be the leading force in educating and publishing about the free and open-source movement in the Arab world, bridging the knowledge gap in operations and development.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="font-almarai space-y-6 text-right"
              dir="rtl"
            >
              <p>
                <strong className="font-bold text-2xl text-slate-900 dark:text-white block mb-4">مجتمع غير ربحي أسسه تقنيون عرب</strong>
                أسس مجتمع غير ربحي أنشئ على يد مجموعة من التقنيين العرب من مختلف أقطار العالم، يرتكز على تمكين ونشر الوعي والثقافة للبرمجيات الحرة والمفتوحة المصدر وفلسفتها باللغة العربية.
              </p>
              <p>
                رؤيتنا أن تكون أسس رائدة في التوعية والنشر عن حركة المصادر الحرة والمفتوحة المصدر في العالم العربي على نطاق العتاد والبرمجيات في سبيل الاعتماد وسد الاحتياجات المعرفية.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Showcase */}
      <section className="py-32 px-6 md:px-12 bg-slate-900 text-white dark:bg-black">
        <div className="max-w-7xl mx-auto">
          <SectionHeading english="Public Services" arabic="خدمات أسس العامة" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Globe2,
                title: "Public Services",
                arTitle: "الخدمات العامة",
                desc: "Alternative frontends for popular platforms like YouTube, TikTok, and Reddit without ads or tracking, supporting digital privacy.",
                arDesc: "في سبيل دعم الخصوصية الرقمية، نقدم واجهات لمنصات معروفة مثل يوتيوب وريديت دون إعلانات أو تتبع.",
                color: "group-hover:text-[#008a2f]"
              },
              {
                icon: TerminalSquare,
                title: "The Community",
                arTitle: "المجتمع",
                desc: "The largest part of the Aosus project, dedicated to enriching specialized Arabic technical content in free and open-source software.",
                arDesc: "أكبر جزء من مشروع أسس، مخصص لإثراء المحتوى العربي التقني المتخصص بالبرمجيات الحرة والمفتوحة.",
                color: "group-hover:text-[#1d70ba]"
              },
              {
                icon: Code2,
                title: "Chat Bridge",
                arTitle: "جسر المحادثات",
                desc: "A bridge connecting the community to chat rooms, allowing users to interact with community topics from their favorite platforms.",
                arDesc: "جسر يقوم بربط المجتمع بغرف محادثة، لتمكن المستخدمين من التفاعل مع المواضيع من منصاتهم المفضلة.",
                color: "group-hover:text-amber-500"
              }
            ].map((project, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                className="group relative p-8 border border-white/10 bg-white/5 hover:bg-white/10 transition-colors duration-500 flex flex-col h-full"
              >
                <project.icon className={`w-8 h-8 mb-8 text-white/50 transition-colors duration-500 ${project.color}`} />
                <div className="mb-12">
                  <h3 className="font-playfair text-2xl font-medium mb-3">{project.title}</h3>
                  <p className="font-inter text-sm text-white/60 leading-relaxed">{project.desc}</p>
                </div>
                <div className="mt-auto text-right" dir="rtl">
                  <h3 className="font-almarai text-2xl font-bold mb-3">{project.arTitle}</h3>
                  <p className="font-almarai text-sm text-white/60 leading-relaxed">{project.arDesc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-32 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <SectionHeading english="Latest Updates" arabic="أخر التحديثات" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                date: "Oct 2023",
                arDate: "أكتوبر ٢٠٢٣",
                title: "Daydream Hackathon Sponsorship",
                arTitle: "رعاية هاكاثون Daydream",
                excerpt: "Aosus sponsors the Daydream hackathon in Alexandria, introducing school students to open-source software via game programming with Godot.",
                arExcerpt: "مجتمع أسس يرعى هاكاثون Daydream في الإسكندرية، ليعرف طلاب المدارس على البرمجيات المفتوحة."
              },
              {
                date: "Sep 2023",
                arDate: "سبتمبر ٢٠٢٣",
                title: "Contribute to Firefox Translation!",
                arTitle: "ساهم في ترجمة Firefox!",
                excerpt: "Do you use Firefox and want to improve its Arabic support? Mozilla needs your help! The browser needs your contribution.",
                arExcerpt: "هل تستخدم متصفح Firefox ومهتم بتحسين دعمه للعربية؟ المتصفح يحتاج لمساهمتكم."
              },
              {
                date: "Aug 2023",
                arDate: "أغسطس ٢٠٢٣",
                title: "Piped Service Deprecation",
                arTitle: "توقف خدمة Piped",
                excerpt: "The Piped service in the Aosus community has been facing issues playing videos. Therefore, we announce the service will be stopped soon.",
                arExcerpt: "خدمة Piped في مجتمع أسس تواجه مشاكل بتشغيل الفيديوهات. ولذلك نعلن عن إيقاف الخدمة قريبا."
              }
            ].map((post, idx) => (
              <motion.article 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="aspect-[4/3] bg-slate-100 dark:bg-slate-800 mb-6 overflow-hidden">
                  <div className="w-full h-full bg-slate-200 dark:bg-slate-800 transform group-hover:scale-105 transition-transform duration-700 ease-out" />
                </div>
                <div className="flex justify-between items-center mb-4 text-xs tracking-widest text-[#008a2f] font-medium uppercase">
                  <span className="font-inter">{post.date}</span>
                  <span className="font-almarai">{post.arDate}</span>
                </div>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-playfair text-xl font-medium mb-2 text-slate-900 dark:text-white group-hover:text-[#1d70ba] transition-colors">{post.title}</h3>
                    <p className="font-inter text-sm text-slate-500 line-clamp-2">{post.excerpt}</p>
                  </div>
                  <div className="text-right" dir="rtl">
                    <h3 className="font-almarai text-xl font-bold mb-2 text-slate-900 dark:text-white group-hover:text-[#1d70ba] transition-colors">{post.arTitle}</h3>
                    <p className="font-almarai text-sm text-slate-500 line-clamp-2">{post.arExcerpt}</p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 md:px-12 border-t border-black/5 dark:border-white/5 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#008a2f]/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <HeartHandshake className="w-12 h-12 mx-auto mb-8 text-[#008a2f]" />
          
          <div className="mb-12">
            <h2 className="font-playfair text-4xl md:text-5xl font-medium mb-4 text-slate-900 dark:text-white">Support the Mission</h2>
            <p className="font-inter text-lg text-slate-600 dark:text-slate-400">Help us continue our work in enriching the Arabic technical landscape.</p>
          </div>
          
          <div className="mb-16">
            <h2 className="font-almarai text-4xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white">ادعم رسالتنا</h2>
            <p className="font-almarai text-lg text-slate-600 dark:text-slate-400" dir="rtl">ساعدنا في مواصلة عملنا في إثراء المشهد التقني العربي.</p>
          </div>

          <button className="group relative inline-flex items-center justify-center px-8 py-4 bg-[#008a2f] text-white font-inter text-sm tracking-widest uppercase overflow-hidden transition-transform hover:scale-105 active:scale-95">
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            <span className="relative flex items-center gap-2">
              <span>Donate</span>
              <span className="font-almarai font-bold mx-2">تبرع</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 md:px-12 border-t border-black/5 dark:border-white/5 text-center">
        <p className="font-inter text-sm text-slate-500 mb-2">© {new Date().getFullYear()} Aosus Community. All rights reserved.</p>
        <p className="font-almarai text-sm text-slate-500" dir="rtl">© {new Date().getFullYear()} مجتمع أسس. جميع الحقوق محفوظة.</p>
      </footer>
    </div>
  );
};

export default Design2;
