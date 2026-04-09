import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowRight, Code2, Users, MessageSquare, Clock, Globe, Terminal, Shield, Github, Twitter } from 'lucide-react';

const Design4 = () => {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const themeClasses = isDark 
    ? "bg-black text-white selection:bg-[#008a2f] selection:text-white" 
    : "bg-white text-black selection:bg-[#1d70ba] selection:text-white";

  const borderColor = isDark ? "border-white" : "border-black";

  return (
    <div className={`min-h-screen w-full transition-colors duration-300 font-['Space_Mono'] ${themeClasses}`}>
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 border-b-8 ${borderColor} bg-inherit mix-blend-difference px-6 py-4 flex justify-between items-center`}>
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 bg-[#008a2f] border-4 ${borderColor} flex items-center justify-center`}>
            <span className="font-['Almarai'] font-black text-2xl text-white">أ</span>
          </div>
          <span className="font-black text-3xl uppercase tracking-tighter hidden md:block">Aosus</span>
        </div>
        
        <div className="flex items-center gap-8">
          <div className="hidden md:flex gap-6 font-bold uppercase tracking-widest text-lg">
            <a href="#" className="hover:text-[#008a2f] transition-colors">Manifesto</a>
            <a href="#" className="hover:text-[#1d70ba] transition-colors">Projects</a>
            <a href="#" className="hover:text-[#008a2f] transition-colors">Community</a>
          </div>
          <button 
            onClick={toggleTheme}
            className={`w-16 h-16 rounded-full border-4 ${borderColor} flex items-center justify-center hover:bg-[#1d70ba] hover:text-white transition-all`}
          >
            {mounted && (isDark ? "LIGHT" : "DARK")}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 min-h-[90vh] flex flex-col justify-center px-6 relative overflow-hidden">
        {/* Background typographic noise */}
        <div className="absolute inset-0 opacity-5 pointer-events-none overflow-hidden flex items-center justify-center">
           <span className="font-['Almarai'] font-black text-[40vw] leading-none whitespace-nowrap text-black dark:text-white">أسس</span>
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <motion.div 
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col gap-8 relative z-20"
          >
            <div className={`inline-block border-4 ${borderColor} px-4 py-2 w-fit bg-[#008a2f] text-white font-bold uppercase tracking-widest transform -rotate-2`}>
              No permission needed.
            </div>
            
            <h1 className="font-black text-7xl md:text-9xl uppercase leading-[0.8] tracking-tighter">
              Build <br />
              <span className="text-[#1d70ba]">Beyond</span> <br />
              Borders
            </h1>

            <div className={`p-6 border-8 ${borderColor} bg-white dark:bg-black w-fit transform translate-x-4 translate-y-4 hover:translate-x-0 hover:translate-y-0 transition-transform`}>
              <h2 className="font-['Almarai'] font-black text-5xl md:text-7xl text-[#008a2f] leading-tight">
                أكبر مجتمع<br />عربي مفتوح
              </h2>
            </div>

            <p className="text-2xl md:text-3xl max-w-xl font-bold border-l-8 border-[#1d70ba] pl-6 leading-tight">
              We are the largest Arabic open-source community. We build. We share. We change everything.
            </p>

            <div className="flex flex-wrap gap-6 pt-8">
              <button className={`group flex items-center gap-4 bg-[#008a2f] text-white px-8 py-6 text-2xl font-black uppercase border-4 ${borderColor} hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors`}>
                Join Now
                <ArrowRight className="w-8 h-8 group-hover:translate-x-2 transition-transform" />
              </button>
              <button className={`group flex items-center gap-4 bg-transparent px-8 py-6 text-2xl font-black uppercase border-4 ${borderColor} hover:bg-[#1d70ba] hover:text-white transition-colors font-['Almarai']`}>
                اقرأ المزيد
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="relative h-[600px] w-full"
          >
             <div className={`absolute inset-0 border-8 ${borderColor} bg-[#1d70ba] transform translate-x-8 translate-y-8`} />
             <div className={`absolute inset-0 border-8 ${borderColor} overflow-hidden bg-white`}>
                {/* Fallback image if generated one fails */}
                <div className="w-full h-full bg-[#008a2f] flex flex-col items-center justify-center p-8">
                   <div className="w-full h-full border-4 border-black relative overflow-hidden group">
                      <img 
                        src="/__mockup/images/hero-4.png" 
                        alt="Brutalist tech poster" 
                        className="w-full h-full object-cover grayscale contrast-150 mix-blend-multiply opacity-80 group-hover:grayscale-0 group-hover:mix-blend-normal transition-all duration-500"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center mix-blend-difference pointer-events-none">
                        <span className="font-['Almarai'] font-black text-9xl text-white opacity-50">أسس</span>
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
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 10 }}
          className="flex font-black text-5xl md:text-7xl uppercase tracking-tighter items-center"
        >
          <span className="px-8">OPEN SOURCE</span>
          <span className="px-8 text-black">✖</span>
          <span className="px-8 font-['Almarai']">البرمجيات الحرة</span>
          <span className="px-8 text-black">✖</span>
          <span className="px-8">OPEN SOURCE</span>
          <span className="px-8 text-black">✖</span>
          <span className="px-8 font-['Almarai']">البرمجيات الحرة</span>
          <span className="px-8 text-black">✖</span>
          <span className="px-8">OPEN SOURCE</span>
          <span className="px-8 text-black">✖</span>
          <span className="px-8 font-['Almarai']">البرمجيات الحرة</span>
          <span className="px-8 text-black">✖</span>
        </motion.div>
      </div>

      {/* Stats Section */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { num: "3,000+", label: "Members", arab: "عضو", icon: Users, color: "bg-[#1d70ba]" },
            { num: "10,000+", label: "Posts", arab: "منشور", icon: MessageSquare, color: "bg-[#008a2f]" },
            { num: "9", label: "Years", arab: "سنوات", icon: Clock, color: "bg-black dark:bg-white text-white dark:text-black" },
            { num: "1,300+", label: "Topics", arab: "موضوع", icon: Terminal, color: "bg-white dark:bg-black" }
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`border-8 ${borderColor} p-8 flex flex-col justify-between aspect-square group hover:-translate-y-4 transition-transform relative overflow-hidden ${stat.color === 'bg-white dark:bg-black' ? 'bg-white dark:bg-black' : stat.color}`}
            >
              {/* Optional background icon */}
              <stat.icon className={`absolute -bottom-10 -right-10 w-64 h-64 opacity-10 group-hover:scale-110 transition-transform ${stat.color.includes('bg-white') ? 'text-black dark:text-white' : 'text-white'}`} />
              
              <div className={`text-xl font-bold uppercase tracking-widest ${stat.color.includes('bg-white') ? '' : 'text-white'}`}>
                {stat.label}
              </div>
              <div>
                <div className={`font-black text-6xl md:text-8xl tracking-tighter ${stat.color.includes('bg-white') ? '' : 'text-white'}`}>
                  {stat.num}
                </div>
                <div className={`font-['Almarai'] font-black text-4xl mt-2 ${stat.color.includes('bg-white') ? '' : 'text-white'}`}>
                  {stat.arab}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Manifesto */}
      <section className={`py-32 px-6 bg-black text-white dark:bg-white dark:text-black border-y-8 ${borderColor}`}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="flex flex-col gap-8">
              <h2 className="font-black text-7xl md:text-9xl uppercase tracking-tighter leading-none">
                Our<br/>Vision
              </h2>
              <div className={`w-full h-4 bg-[#008a2f]`} />
              <p className="text-3xl font-bold leading-tight">
                To be the pioneers in spreading open-source culture in the Arab world. Hardware and software.
              </p>
            </div>
            
            <div className="flex flex-col gap-8 justify-end text-right">
              <h2 className="font-['Almarai'] font-black text-6xl md:text-8xl leading-none text-[#1d70ba]">
                رؤيتنا
              </h2>
              <div className={`w-full h-4 bg-[#1d70ba]`} />
              <p className="font-['Almarai'] text-3xl md:text-4xl font-bold leading-tight">
                أن تكون أسس رائدة في التوعية والنشر عن حركة المصادر الحرة والمفتوحة المصدر في العالم العربي على نطاق العتاد والبرمجيات
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-16 border-b-8 border-black dark:border-white pb-8">
            <h2 className="font-black text-6xl md:text-8xl uppercase tracking-tighter">Projects</h2>
            <h2 className="font-['Almarai'] font-black text-5xl md:text-7xl text-[#008a2f]">المشاريع</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Project 1 */}
            <div className={`group border-8 ${borderColor} bg-white dark:bg-black hover:bg-[#1d70ba] hover:text-white transition-colors relative overflow-hidden`}>
              <div className={`p-8 border-b-8 ${borderColor} group-hover:border-white`}>
                <h3 className="font-black text-4xl uppercase mb-2">Discourse Bridge</h3>
                <p className="font-bold text-xl opacity-80">Cross-platform community chat</p>
              </div>
              <div className="p-8 font-['Almarai'] text-right flex flex-col h-full justify-between gap-8">
                <p className="text-2xl font-bold">
                  جسر يقوم بربط المجتمع بغرف محادثة, لتمكن المستخدمين من التفاعل مع مواضيع المجتمع من داخل منصاتهم المفضلة
                </p>
                <div className="flex justify-between items-center self-end w-full">
                  <Github className="w-12 h-12" />
                  <a href="#" className="font-black text-3xl uppercase underline decoration-4 underline-offset-8 group-hover:text-white text-black dark:text-white">View Code &rarr;</a>
                </div>
              </div>
            </div>

            {/* Project 2 */}
            <div className={`group border-8 ${borderColor} bg-[#008a2f] text-white hover:bg-black dark:hover:bg-white dark:hover:text-black transition-colors relative overflow-hidden mt-0 md:mt-24`}>
              <div className={`p-8 border-b-8 ${borderColor} group-hover:border-white dark:group-hover:border-black`}>
                <h3 className="font-black text-4xl uppercase mb-2">Public Services</h3>
                <p className="font-bold text-xl opacity-80">Privacy-respecting frontends</p>
              </div>
              <div className="p-8 font-['Almarai'] text-right flex flex-col h-full justify-between gap-8">
                <p className="text-2xl font-bold">
                  في سبيل دعم الخصوصية الرقمية, يقدم مجتمع أسس خِدْمَات عامة, توفر واجهات لمنصات معروفة دون أعلانات او تتبع
                </p>
                <div className="flex justify-between items-center self-end w-full">
                  <Globe className="w-12 h-12" />
                  <a href="#" className="font-black text-3xl uppercase underline decoration-4 underline-offset-8">Explore &rarr;</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <footer className={`border-t-8 ${borderColor} bg-[#1d70ba] text-white pt-32 pb-16 px-6 relative overflow-hidden`}>
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center text-center gap-12">
          <h2 className="font-black text-7xl md:text-9xl uppercase tracking-tighter leading-none mix-blend-difference">
            Ready to<br/>Contribute?
          </h2>
          <h2 className="font-['Almarai'] font-black text-6xl md:text-8xl leading-none text-[#008a2f] bg-white p-4 transform rotate-2 border-8 border-black">
            هل أنت مستعد للمساهمة؟
          </h2>
          
          <div className="flex flex-wrap justify-center gap-8 mt-12">
            <button className="bg-black text-white px-12 py-8 text-3xl font-black uppercase hover:bg-white hover:text-black border-8 border-black transition-colors transform hover:-translate-y-2">
              Join Discord
            </button>
            <button className="bg-[#008a2f] text-white px-12 py-8 text-3xl font-black uppercase hover:bg-black hover:text-white border-8 border-black transition-colors transform hover:-translate-y-2 font-['Almarai']">
              المجتمع
            </button>
          </div>
        </div>
        
        {/* Giant background text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none opacity-10 font-black text-[30vw] uppercase leading-none text-black">
          AOSUS
        </div>

        <div className="max-w-7xl mx-auto mt-32 pt-8 border-t-8 border-black flex flex-col md:flex-row justify-between items-center gap-8 relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-black flex items-center justify-center border-4 border-black">
              <span className="font-['Almarai'] font-black text-2xl text-white">أ</span>
            </div>
            <span className="font-black text-2xl uppercase">Aosus © {new Date().getFullYear()}</span>
          </div>
          
          <div className="flex gap-6">
            <a href="#" className="hover:text-black transition-colors"><Twitter className="w-8 h-8" /></a>
            <a href="#" className="hover:text-black transition-colors"><Github className="w-8 h-8" /></a>
            <a href="#" className="hover:text-black transition-colors"><MessageSquare className="w-8 h-8" /></a>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default Design4;
