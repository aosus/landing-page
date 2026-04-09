import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
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
  HeartHandshake,
} from "lucide-react";

const CONTENT = {
  en: {
    badge: "A Cultural Force",
    heading: ["The Largest", "Arabic", "Open-Source", "Community."],
    headingItalic: "Arabic",
    subtitle:
      "Preserving Arabic technical knowledge, building a legacy, and celebrating the richness of the language in technology.",
    about: {
      title: "About Us",
      subheading: "A Non-Profit Founded by Arab Technologists",
      body: "Aosus is a non-profit community established by a group of Arab technologists from around the world. We focus on empowering and spreading awareness about Free and Open Source Software (FOSS) and its philosophy in Arabic.",
      body2: "Our vision is to be the leading force in educating and publishing about the free and open-source movement in the Arab world, bridging the knowledge gap in operations and development.",
    },
    stats: [
      { num: "+3,000", label: "Members", icon: Users },
      { num: "+10,000", label: "Posts", icon: MessageSquare },
      { num: "9", label: "Years", icon: Calendar },
      { num: "+1,300", label: "Topics", icon: BookOpen },
    ],
    projects: {
      title: "Public Services",
      items: [
        {
          icon: Globe2,
          title: "Public Services",
          desc: "Alternative frontends for popular platforms like YouTube, TikTok, and Reddit without ads or tracking, supporting digital privacy.",
        },
        {
          icon: TerminalSquare,
          title: "The Community",
          desc: "The largest part of the Aosus project, dedicated to enriching specialized Arabic technical content in free and open-source software.",
        },
        {
          icon: Code2,
          title: "Chat Bridge",
          desc: "A bridge connecting the community to chat rooms, allowing users to interact with community topics from their favorite platforms.",
        },
      ],
    },
    blog: {
      title: "Latest Updates",
      posts: [
        {
          date: "Oct 2023",
          title: "Daydream Hackathon Sponsorship",
          excerpt:
            "Aosus sponsors the Daydream hackathon in Alexandria, introducing school students to open-source software via game programming with Godot.",
        },
        {
          date: "Sep 2023",
          title: "Contribute to Firefox Translation!",
          excerpt:
            "Do you use Firefox and want to improve its Arabic support? Mozilla needs your help! The browser needs your contribution.",
        },
        {
          date: "Aug 2023",
          title: "Piped Service Deprecation",
          excerpt:
            "The Piped service in the Aosus community has been facing issues playing videos. Therefore, we announce the service will be stopped soon.",
        },
      ],
    },
    cta: {
      title: "Support the Mission",
      subtitle:
        "Help us continue our work in enriching the Arabic technical landscape.",
      button: "Donate",
    },
    footer: `© ${new Date().getFullYear()} Aosus Community. All rights reserved.`,
  },
  ar: {
    badge: "قوة ثقافية",
    heading: ["أكبر مجتمع", "عربي", "للبرمجيات", "الحرة."],
    headingItalic: "عربي",
    subtitle:
      "حفظ المعرفة التقنية العربية، وبناء إرث، والاحتفاء بثراء اللغة العربية في عالم التكنولوجيا.",
    about: {
      title: "من نحن",
      subheading: "مجتمع غير ربحي أسسه تقنيون عرب",
      body: "أسس مجتمع غير ربحي أنشئ على يد مجموعة من التقنيين العرب من مختلف أقطار العالم، يرتكز على تمكين ونشر الوعي والثقافة للبرمجيات الحرة والمفتوحة المصدر وفلسفتها باللغة العربية.",
      body2:
        "رؤيتنا أن تكون أسس رائدة في التوعية والنشر عن حركة المصادر الحرة والمفتوحة المصدر في العالم العربي على نطاق العتاد والبرمجيات في سبيل الاعتماد وسد الاحتياجات المعرفية.",
    },
    stats: [
      { num: "+3,000", label: "عضو", icon: Users },
      { num: "+10,000", label: "منشور", icon: MessageSquare },
      { num: "9", label: "سنوات من العطاء", icon: Calendar },
      { num: "+1,300", label: "موضوع", icon: BookOpen },
    ],
    projects: {
      title: "خدمات أسس العامة",
      items: [
        {
          icon: Globe2,
          title: "الخدمات العامة",
          desc: "في سبيل دعم الخصوصية الرقمية، نقدم واجهات لمنصات معروفة مثل يوتيوب وريديت دون إعلانات أو تتبع.",
        },
        {
          icon: TerminalSquare,
          title: "المجتمع",
          desc: "أكبر جزء من مشروع أسس، مخصص لإثراء المحتوى العربي التقني المتخصص بالبرمجيات الحرة والمفتوحة.",
        },
        {
          icon: Code2,
          title: "جسر المحادثات",
          desc: "جسر يقوم بربط المجتمع بغرف محادثة، لتمكن المستخدمين من التفاعل مع المواضيع من منصاتهم المفضلة.",
        },
      ],
    },
    blog: {
      title: "آخر التحديثات",
      posts: [
        {
          date: "أكتوبر ٢٠٢٣",
          title: "رعاية هاكاثون Daydream",
          excerpt:
            "مجتمع أسس يرعى هاكاثون Daydream في الإسكندرية، ليعرف طلاب المدارس على البرمجيات المفتوحة.",
        },
        {
          date: "سبتمبر ٢٠٢٣",
          title: "ساهم في ترجمة Firefox!",
          excerpt:
            "هل تستخدم متصفح Firefox ومهتم بتحسين دعمه للعربية؟ المتصفح يحتاج لمساهمتكم.",
        },
        {
          date: "أغسطس ٢٠٢٣",
          title: "توقف خدمة Piped",
          excerpt:
            "خدمة Piped في مجتمع أسس تواجه مشاكل بتشغيل الفيديوهات. ولذلك نعلن عن إيقاف الخدمة قريبا.",
        },
      ],
    },
    cta: {
      title: "ادعم رسالتنا",
      subtitle: "ساعدنا في مواصلة عملنا في إثراء المشهد التقني العربي.",
      button: "تبرع",
    },
    footer: `© ${new Date().getFullYear()} مجتمع أسس. جميع الحقوق محفوظة.`,
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

export const Design2 = ({ lang: langProp }: { lang?: "ar" | "en" } = {}) => {
  const [lang, setLang] = useState<"ar" | "en">(langProp ?? "ar");
  const [isDark, setIsDark] = useState(false);
  const t = CONTENT[lang];
  const isRtl = lang === "ar";

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  return (
    <div
      className={`min-h-screen bg-[#faf9f7] dark:bg-[#0f1115] text-slate-900 dark:text-slate-100 selection:bg-[#008a2f] selection:text-white transition-colors duration-700 ease-in-out font-sans`}
      dir={isRtl ? "rtl" : "ltr"}
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
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
      `,
        }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 mix-blend-difference px-6 py-6 md:px-12 flex justify-between items-center pointer-events-none">
        <div className="pointer-events-auto">
          <img
            src="https://aosus.org/wp-content/uploads/2021/09/aosus-w-lwogores.png"
            alt="Aosus Logo"
            className="h-10 w-auto invert dark:invert-0 transition-all duration-500"
          />
        </div>
        <div className="flex items-center gap-3 pointer-events-auto">
          {!langProp && (
            <button
              onClick={() => setLang((l) => (l === "ar" ? "en" : "ar"))}
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors backdrop-blur-md text-sm font-bold"
              aria-label="Toggle Language"
            >
              {lang === "ar" ? "EN" : "AR"}
            </button>
          )}
          <button
            onClick={() => setIsDark(!isDark)}
            className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors backdrop-blur-md"
            aria-label="Toggle Theme"
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col justify-center px-6 md:px-12 pt-32 pb-24 overflow-hidden bg-grid-pattern">
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent to-[#faf9f7] dark:to-[#0f1115] z-0" />

        <div className="relative z-10 max-w-4xl mx-auto w-full text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="flex flex-col space-y-8"
          >
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center justify-center space-x-2"
            >
              <span className="h-px w-8 bg-[#008a2f]" />
              <span
                className={`text-sm tracking-widest uppercase text-[#008a2f] font-medium ${isRtl ? "font-almarai" : "font-inter"}`}
              >
                {t.badge}
              </span>
              <span className="h-px w-8 bg-[#008a2f]" />
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className={`text-6xl md:text-7xl lg:text-8xl leading-[1.15] ${isRtl ? "font-almarai font-bold" : "font-playfair font-medium"} text-slate-900 dark:text-white`}
            >
              {t.heading.map((line, i) => (
                <span key={i}>
                  {line === t.headingItalic ? (
                    <span className={`${isRtl ? "" : "italic"} text-[#1d70ba]`}>
                      {line}
                    </span>
                  ) : (
                    line
                  )}
                  {i < t.heading.length - 1 && <br />}
                </span>
              ))}
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className={`text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-xl mx-auto leading-relaxed ${isRtl ? "font-almarai" : "font-inter"}`}
            >
              {t.subtitle}
            </motion.p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="relative w-full max-w-7xl mx-auto mt-24 h-[400px] md:h-[500px] overflow-hidden rounded-sm"
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-6 divide-x dark:divide-x divide-black/5 dark:divide-white/5 rtl:divide-x-reverse">
            {t.stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="flex flex-col items-center text-center px-4"
              >
                <stat.icon className="w-6 h-6 mb-6 text-[#1d70ba] opacity-50" />
                <span
                  className={`text-4xl md:text-5xl font-semibold mb-4 ${isRtl ? "font-almarai" : "font-playfair"}`}
                >
                  {stat.num}
                </span>
                <span
                  className={`text-sm text-slate-500 uppercase tracking-widest ${isRtl ? "font-almarai" : "font-inter"}`}
                >
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-32 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="border-b border-black/10 dark:border-white/10 pb-6 mb-12">
            <h2
              className={`text-4xl md:text-5xl font-medium tracking-tight text-slate-900 dark:text-slate-50 ${isRtl ? "font-almarai font-bold" : "font-playfair"}`}
            >
              {t.about.title}
            </h2>
          </div>

          <div className="text-lg md:text-xl leading-relaxed text-slate-600 dark:text-slate-300 max-w-3xl">
            <motion.div
              initial={{ opacity: 0, x: isRtl ? 20 : -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className={`${isRtl ? "font-almarai" : "font-inter"} space-y-6`}
            >
              <p>
                <strong
                  className={`${isRtl ? "font-almarai" : "font-playfair font-medium"} text-2xl text-slate-900 dark:text-white block mb-4`}
                >
                  {t.about.subheading}
                </strong>
                {t.about.body}
              </p>
              <p>{t.about.body2}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Showcase */}
      <section className="py-32 px-6 md:px-12 bg-slate-900 text-white dark:bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="border-b border-white/10 pb-6 mb-12">
            <h2
              className={`text-4xl md:text-5xl font-medium tracking-tight ${isRtl ? "font-almarai font-bold" : "font-playfair"}`}
            >
              {t.projects.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {t.projects.items.map((project, idx) => {
              const colorClasses = [
                "group-hover:text-[#008a2f]",
                "group-hover:text-[#1d70ba]",
                "group-hover:text-amber-500",
              ];
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.2 }}
                  className="group relative p-8 border border-white/10 bg-white/5 hover:bg-white/10 transition-colors duration-500 flex flex-col h-full"
                >
                  <project.icon
                    className={`w-8 h-8 mb-8 text-white/50 transition-colors duration-500 ${colorClasses[idx]}`}
                  />
                  <h3
                    className={`text-2xl font-medium mb-3 ${isRtl ? "font-almarai font-bold" : "font-playfair"}`}
                  >
                    {project.title}
                  </h3>
                  <p
                    className={`text-sm text-white/60 leading-relaxed ${isRtl ? "font-almarai" : "font-inter"}`}
                  >
                    {project.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-32 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="border-b border-black/10 dark:border-white/10 pb-6 mb-12">
            <h2
              className={`text-4xl md:text-5xl font-medium tracking-tight text-slate-900 dark:text-slate-50 ${isRtl ? "font-almarai font-bold" : "font-playfair"}`}
            >
              {t.blog.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {t.blog.posts.map((post, idx) => (
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
                <div className="text-xs tracking-widest text-[#008a2f] font-medium uppercase mb-4">
                  <span className={isRtl ? "font-almarai" : "font-inter"}>
                    {post.date}
                  </span>
                </div>
                <h3
                  className={`text-xl font-medium mb-2 text-slate-900 dark:text-white group-hover:text-[#1d70ba] transition-colors ${isRtl ? "font-almarai font-bold" : "font-playfair"}`}
                >
                  {post.title}
                </h3>
                <p
                  className={`text-sm text-slate-500 line-clamp-2 ${isRtl ? "font-almarai" : "font-inter"}`}
                >
                  {post.excerpt}
                </p>
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

          <h2
            className={`text-4xl md:text-5xl font-medium mb-4 text-slate-900 dark:text-white ${isRtl ? "font-almarai font-bold" : "font-playfair"}`}
          >
            {t.cta.title}
          </h2>
          <p
            className={`text-lg text-slate-600 dark:text-slate-400 mb-12 ${isRtl ? "font-almarai" : "font-inter"}`}
          >
            {t.cta.subtitle}
          </p>

          <button className="group relative inline-flex items-center justify-center px-8 py-4 bg-[#008a2f] text-white text-sm tracking-widest uppercase overflow-hidden transition-transform hover:scale-105 active:scale-95">
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            <span className="relative flex items-center gap-2">
              <span className={isRtl ? "font-almarai font-bold" : "font-inter"}>
                {t.cta.button}
              </span>
              <ArrowRight className={`w-4 h-4 group-hover:translate-x-1 transition-transform ${isRtl ? "rotate-180" : ""}`} />
            </span>
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 md:px-12 border-t border-black/5 dark:border-white/5 text-center">
        <p
          className={`text-sm text-slate-500 ${isRtl ? "font-almarai" : "font-inter"}`}
        >
          {t.footer}
        </p>
      </footer>
    </div>
  );
};

export default Design2;
