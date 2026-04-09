import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Terminal, Shield, Users, Server, MessageSquare, ChevronRight, Moon, Sun, Globe, Code, Cpu, Database, Activity, ExternalLink, BookOpen } from 'lucide-react';

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
    const latinChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%""\'#&_(),.;:?!\\|{}<>[]^~'.split('');
    const chars = [...arabicChars, ...latinChars];

    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops: number[] = [];

    for (let x = 0; x < columns; x++) {
      drops[x] = 1;
    }

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#008a2f';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
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

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none opacity-20 z-0 mix-blend-screen"
    />
  );
};

const TypewriterText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    let i = 0;
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        if (i < text.length) {
          setDisplayText((prev) => prev + text.charAt(i));
          i++;
        } else {
          clearInterval(interval);
        }
      }, 50);
      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timer);
  }, [text, delay]);

  return (
    <span className="inline-block relative">
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ repeat: Infinity, duration: 0.8 }}
        className="inline-block w-[0.5em] h-[1em] bg-[#008a2f] ml-1 align-middle"
      />
    </span>
  );
};

export default function Design1() {
  const [isDark, setIsDark] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  if (!mounted) return null;

  const bgClass = isDark ? 'bg-black text-white' : 'bg-gray-950 text-gray-100';

  return (
    <div className={`min-h-screen ${bgClass} selection:bg-[#008a2f] selection:text-black overflow-x-hidden font-mono ${isDark ? 'dark' : ''}`}>
      <MatrixRain />
      
      {/* Background glow effects */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-[#008a2f]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-[#1d70ba]/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Navigation */}
      <nav className="fixed w-full z-50 border-b border-[#008a2f]/20 bg-black/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <img src="https://aosus.org/wp-content/uploads/2021/09/aosus-w-lwogores.png" alt="Aosus Logo" className="h-8 w-auto filter brightness-0 invert" />
              <div className="hidden md:flex text-sm text-[#008a2f] tracking-widest uppercase">
                <span className="opacity-50">sys.</span>INIT()
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="hidden md:flex gap-6 text-sm text-gray-400">
                <a href="#about" className="hover:text-[#008a2f] hover:shadow-[0_0_10px_rgba(0,138,47,0.5)] transition-all px-2 py-1 rounded">/about</a>
                <a href="#projects" className="hover:text-[#008a2f] hover:shadow-[0_0_10px_rgba(0,138,47,0.5)] transition-all px-2 py-1 rounded">/projects</a>
                <a href="#blog" className="hover:text-[#008a2f] hover:shadow-[0_0_10px_rgba(0,138,47,0.5)] transition-all px-2 py-1 rounded">/blog</a>
              </div>
              <button 
                onClick={() => setIsDark(!isDark)}
                className="p-2 border border-[#008a2f]/30 rounded text-[#008a2f] hover:bg-[#008a2f]/10 hover:shadow-[0_0_15px_rgba(0,138,47,0.4)] transition-all"
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
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* English Side (LTR) */}
            <div className="order-2 lg:order-1 text-left space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#008a2f]/30 bg-[#008a2f]/5 text-[#008a2f] text-xs">
                <Terminal className="w-3 h-3 animate-pulse" />
                <span>v3.0.0_ONLINE</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                <TypewriterText text="The Largest Arabic Open-Source Community" delay={0} />
              </h1>
              
              <p className="text-gray-400 text-lg sm:text-xl max-w-xl">
                Where Arab tech rebels build the future. Open-source code is the foundation of modern civilization, and we are driving the revolution.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <a 
                  href="https://discourse.aosus.org" 
                  className="group relative inline-flex items-center justify-center px-8 py-3 bg-transparent border border-[#008a2f] text-[#008a2f] font-bold uppercase tracking-wider overflow-hidden hover:shadow-[0_0_20px_rgba(0,138,47,0.6)] transition-all"
                >
                  <span className="absolute inset-0 bg-[#008a2f] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
                  <span className="relative z-10 group-hover:text-black flex items-center gap-2">
                    Execute.JOIN()
                    <ChevronRight className="w-4 h-4" />
                  </span>
                </a>
              </div>
            </div>

            {/* Arabic Side (RTL) */}
            <div className="order-1 lg:order-2 text-right space-y-8 font-['Almarai']" dir="rtl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#1d70ba]/30 bg-[#1d70ba]/5 text-[#1d70ba] text-xs font-mono" dir="ltr">
                <Code className="w-3 h-3 animate-pulse" />
                <span>STATUS: ACTIVE</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight text-transparent bg-clip-text bg-gradient-to-l from-white to-gray-500">
                أكبر مجتمع عربي للبرمجيات الحرة
              </h1>
              
              <p className="text-gray-400 text-lg sm:text-2xl max-w-xl mr-auto leading-relaxed">
                حيث يبني التقنيون العرب مستقبل المصادر المفتوحة. الشيفرة الحرة هي أساس الحضارة الحديثة، ونحن القوة العربية التي تقود هذه الثورة.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="py-20 relative z-10 bg-black/40 border-y border-[#008a2f]/10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'أعضاء / Members', value: '3,000+', icon: Users },
              { label: 'مشاركات / Posts', value: '10,000+', icon: MessageSquare },
              { label: 'مواضيع / Topics', value: '1,300+', icon: Database },
              { label: 'سنوات / Years', value: '9', icon: Activity },
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 border border-[#008a2f]/20 bg-[#008a2f]/5 relative group hover:bg-[#008a2f]/10 transition-colors cursor-default"
              >
                <div className="absolute inset-0 bg-[#008a2f]/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <stat.icon className="w-6 h-6 text-[#008a2f] mb-4 opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                <div className="text-3xl sm:text-4xl font-bold text-white mb-2 glowing-text group-hover:text-[#008a2f] transition-colors">
                  {stat.value}
                </div>
                <div className="text-xs text-gray-500 uppercase tracking-widest font-['Almarai']">
                  {stat.label}
                </div>
                {/* Decorative corners */}
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#008a2f] group-hover:w-full group-hover:h-full transition-all duration-500 opacity-50 group-hover:opacity-100 pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#008a2f] group-hover:w-full group-hover:h-full transition-all duration-500 opacity-50 group-hover:opacity-100 pointer-events-none" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl font-bold text-white uppercase tracking-widest">
              <span className="text-[#008a2f]">/</span> Active_Projects
            </h2>
            <h3 className="text-2xl font-['Almarai'] text-gray-400" dir="rtl">
              أبرز مشاريعنا
            </h3>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                titleEn: "Discourse Community",
                titleAr: "المجتمع",
                descEn: "The central hub for Arabic tech discussions. The core of Aosus.",
                descAr: "المركز الأساسي للنقاشات التقنية العربية. قلب مجتمع أسس.",
                icon: Server,
                iconClass: "text-[#008a2f]",
                link: "https://discourse.aosus.org/"
              },
              {
                titleEn: "Privacy Services",
                titleAr: "خدمات الخصوصية",
                descEn: "Ad-free frontend services (SearXNG, Nitter, Redlib) hosted by Aosus.",
                descAr: "واجهات خالية من الإعلانات للخدمات الشائعة، مستضافة بواسطة أسس.",
                icon: Shield,
                iconClass: "text-[#1d70ba]",
                link: "https://aosus.org/services"
              },
              {
                titleEn: "Chat Bridge",
                titleAr: "جسر المحادثات",
                descEn: "Open-source tool connecting Discourse with Matrix, Telegram, and Discord.",
                descAr: "أداة مفتوحة المصدر لربط ديسكورس مع ماتركس، تيليجرام وديسكورد.",
                icon: Cpu,
                iconClass: "text-[#008a2f]",
                link: "https://github.com/aosus/discourse-chat-bridge"
              }
            ].map((project, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="group p-1 bg-gradient-to-b from-gray-800 to-black rounded-lg relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-[#008a2f]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="bg-black p-6 rounded-md h-full border border-gray-800 group-hover:border-[#008a2f]/50 transition-colors relative z-10 flex flex-col">
                  <project.icon className={`w-8 h-8 mb-6 ${project.iconClass} group-hover:scale-110 transition-transform`} />
                  <div className="space-y-4 flex-grow">
                    <div>
                      <h3 className="text-lg font-bold text-white mb-1">{project.titleEn}</h3>
                      <p className="text-sm text-gray-400">{project.descEn}</p>
                    </div>
                    <div className="w-full h-px bg-gray-800 group-hover:bg-[#008a2f]/30 transition-colors" />
                    <div dir="rtl" className="font-['Almarai']">
                      <h3 className="text-lg font-bold text-white mb-1">{project.titleAr}</h3>
                      <p className="text-sm text-gray-400">{project.descAr}</p>
                    </div>
                  </div>
                  <a href={project.link} className="mt-6 flex items-center gap-2 text-xs text-gray-500 hover:text-[#008a2f] transition-colors uppercase tracking-widest w-fit">
                    <ExternalLink className="w-3 h-3" /> Execute()
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-24 relative z-10 bg-gray-900/20 border-t border-[#008a2f]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl font-bold text-white uppercase tracking-widest">
              <span className="text-[#008a2f]">/</span> Latest_Logs
            </h2>
            <h3 className="text-2xl font-['Almarai'] text-gray-400" dir="rtl">
              أحدث التدوينات
            </h3>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "مجتمع أسس يرعى هاكاثون Daydream لطلاب المدارس",
                date: "2024-03-15",
                excerpt: "مجتمع أسس يرعى هاكاثون Daydream في الإسكندرية، ليعرف طلاب المدارس على البرمجيات المفتوحة والحرة عبر برمجة الألعاب مع محرك Godot.",
                link: "https://aosus.org/2135"
              },
              {
                title: "ساهم في تَرْجَمَة Firefox!",
                date: "2024-02-28",
                excerpt: "هل تستخدم متصفح Firefox ومهتم بتحسين دعمه للعربية؟ Mozilla تطلب منك المساعدة! المتصفح يحتاج لمساهمتكم لتحسين دعمه للعربية.",
                link: "https://aosus.org/2125"
              },
              {
                title: "توقف خدمة Piped.",
                date: "2023-11-10",
                excerpt: "خدمة Piped في مجتمع أسس تواجه مشاكل بتشغيل الفيديوهات منذ فترة. ولذلك نعلن عن إيقاف الخدمة قريبا.",
                link: "https://aosus.org/2071"
              }
            ].map((post, i) => (
              <motion.a
                key={i}
                href={post.link}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group block p-6 border border-gray-800 hover:border-[#008a2f] bg-black relative overflow-hidden transition-all hover:shadow-[0_0_30px_rgba(0,138,47,0.15)]"
              >
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 group-hover:text-[#008a2f] transition-all transform group-hover:rotate-12 group-hover:scale-125">
                  <BookOpen className="w-16 h-16" />
                </div>
                <div className="relative z-10 flex flex-col h-full font-['Almarai']" dir="rtl">
                  <div className="text-xs font-mono text-[#008a2f] mb-4" dir="ltr">{post.date}</div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#008a2f] transition-colors">{post.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed flex-grow">{post.excerpt}</p>
                  <div className="mt-6 flex items-center gap-2 text-sm text-gray-500 group-hover:text-[#008a2f] transition-colors font-mono" dir="ltr">
                    <span>read_more()</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* About Section with generated image */}
      <section id="about" className="py-24 relative z-10 bg-black/80 border-t border-[#008a2f]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#008a2f] to-[#1d70ba] rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
              <img 
                src="/__mockup/images/hero-1.png" 
                alt="Matrix hacker background" 
                className="relative rounded-lg w-full object-cover border border-gray-800 aspect-video"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition duration-500 rounded-lg" />
              
              <div className="absolute top-4 left-4 border border-[#008a2f]/50 bg-black/80 p-2 font-mono text-xs text-[#008a2f] backdrop-blur-sm">
                IMG_SYS_CORE
              </div>
            </div>

            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-[#008a2f] uppercase tracking-widest">
                  sys.info("about")
                </h2>
                <div className="p-4 bg-gray-900/50 border-l-2 border-[#008a2f] font-mono text-sm text-gray-300 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]">
                  <p>{`> Non-profit organization`}</p>
                  <p>{`> Founded by Arab technologists`}</p>
                  <p>{`> Spanning across the Arab world`}</p>
                  <p className="text-[#008a2f] animate-pulse">{`_`}</p>
                </div>
              </div>

              <div dir="rtl" className="font-['Almarai'] space-y-4">
                <h2 className="text-3xl font-bold text-white">من نحن؟</h2>
                <p className="text-gray-400 text-lg leading-relaxed">
                  أسس مجتمع غير ربحي أنشئ على يد مجموعة من التقنيين العرب من مختلف أقطار العالم، يرتكز على تمكين ونشر الوعي والثقافة للبرمجيات الحرة والمفتوحة المصدر وفلسفتها باللغة العربية.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative z-10 border-t border-[#008a2f]/20 bg-gradient-to-b from-black to-gray-900 overflow-hidden">
        <div className="absolute inset-0 bg-[#008a2f]/5" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,138,47,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,138,47,0.1)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,black,transparent)]" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-8">
          <Globe className="w-16 h-16 text-[#008a2f] mx-auto animate-pulse" />
          
          <h2 className="text-4xl md:text-5xl font-bold font-['Almarai'] text-white">
            انضم إلى ثورة المصادر المفتوحة
          </h2>
          
          <p className="text-xl text-gray-400 max-w-2xl mx-auto font-mono">
            {`> Join the largest Arabic open-source community today.`}
          </p>
          
          <a 
            href="https://discourse.aosus.org" 
            className="inline-flex items-center justify-center px-10 py-4 bg-[#008a2f] text-black font-bold text-lg uppercase tracking-widest hover:bg-white hover:shadow-[0_0_40px_rgba(0,138,47,0.8)] transition-all duration-300"
          >
            initiate_connection()
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-gray-900 bg-black relative z-10 text-center">
        <div className="flex flex-col items-center justify-center gap-4 text-sm text-gray-600 font-mono">
          <p>© {new Date().getFullYear()} Aosus Community. All rights reserved.</p>
          <div className="flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#008a2f] animate-pulse shadow-[0_0_10px_rgba(0,138,47,1)]" />
            <span>Systems operational</span>
          </div>
        </div>
      </footer>

      {/* Global CSS for glowing text */}
      <style dangerouslySetInnerHTML={{__html: `
        .glowing-text {
          text-shadow: 0 0 10px rgba(0, 138, 47, 0.5), 0 0 20px rgba(0, 138, 47, 0.3);
        }
      `}} />
    </div>
  );
}
