import React, { useState, useEffect, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Globe, Menu, X, Github, MessageSquare, Heart } from 'lucide-react';

const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

type Lang = 'ar' | 'en';

const NAV = {
  en: [
    { label: 'Home', href: `${BASE}/site` },
    { label: 'Blog', href: `${BASE}/site/blog` },
    { label: 'Services', href: `${BASE}/site/services` },
    { label: 'Writing Contest', href: `${BASE}/site/writing-contest` },
    { label: 'Support Us', href: `${BASE}/site/support-us` },
    { label: 'Contact', href: `${BASE}/site/contact-us` },
  ],
  ar: [
    { label: 'الرئيسية', href: `${BASE}/site` },
    { label: 'المدونة', href: `${BASE}/site/blog` },
    { label: 'خدمات', href: `${BASE}/site/services` },
    { label: 'جائزة الكتابة', href: `${BASE}/site/writing-contest` },
    { label: 'ادعمنا', href: `${BASE}/site/support-us` },
    { label: 'اتصل بنا', href: `${BASE}/site/contact-us` },
  ],
};

const SOCIALS = [
  { label: 'GitHub', href: 'https://github.com/aosus', icon: Github },
  { label: 'Matrix', href: 'https://matrix.to/#/#aosus:aosus.org', icon: MessageSquare },
  { label: 'Discord', href: 'https://discord.gg/YJUzEhU955', icon: MessageSquare },
  { label: 'Telegram', href: 'https://t.me/aosus', icon: MessageSquare },
];

interface LayoutProps {
  children: (ctx: { lang: Lang; isDark: boolean }) => ReactNode;
  lang?: Lang;
  activePath?: string;
}

export default function Layout({ children, lang: langProp, activePath }: LayoutProps) {
  const [lang, setLang] = useState<Lang>(langProp ?? 'en');
  const [isDark, setIsDark] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const isRtl = lang === 'ar';

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [isDark, isRtl, lang]);

  const navItems = NAV[lang];
  const fontFamily = isRtl ? 'Almarai, sans-serif' : 'Inter, system-ui, sans-serif';

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${isDark ? 'bg-[#0a0f1a] text-white' : 'bg-[#f8f9fc] text-gray-900'}`}
      dir={isRtl ? 'rtl' : 'ltr'}
      style={{ fontFamily }}
    >
      <header className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${isDark ? 'bg-[#0a0f1a]/80' : 'bg-white/80'} backdrop-blur-xl border-b ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <a href={`${BASE}/site`} className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-full bg-[#008a2f] flex items-center justify-center text-white font-bold text-sm group-hover:scale-110 transition-transform">
              <img src={`${BASE}/images/hero-1.png`} alt="Aosus" className="w-9 h-9 rounded-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
            </div>
            <span className="font-bold text-lg" style={{ fontFamily: 'Almarai, sans-serif' }}>أسس</span>
          </a>

          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activePath === item.href;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive
                    ? 'text-[#008a2f] bg-[#008a2f]/10'
                    : isDark ? 'text-gray-300 hover:text-white hover:bg-white/5' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            {!langProp && (
              <button
                onClick={() => setLang(l => l === 'ar' ? 'en' : 'ar')}
                className={`p-2 rounded-lg transition-colors ${isDark ? 'hover:bg-white/10 text-gray-300' : 'hover:bg-gray-100 text-gray-600'}`}
                title="Toggle language"
              >
                <Globe className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={() => setIsDark(!isDark)}
              className={`p-2 rounded-lg transition-colors ${isDark ? 'hover:bg-white/10 text-gray-300' : 'hover:bg-gray-100 text-gray-600'}`}
              title="Toggle theme"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`p-2 rounded-lg lg:hidden transition-colors ${isDark ? 'hover:bg-white/10' : 'hover:bg-gray-100'}`}
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className={`lg:hidden overflow-hidden border-t ${isDark ? 'border-white/10 bg-[#0a0f1a]/95' : 'border-gray-200 bg-white/95'} backdrop-blur-xl`}
            >
              <div className="px-4 py-3 space-y-1">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className={`block px-3 py-2 rounded-lg text-sm font-medium ${isDark ? 'text-gray-300 hover:text-white hover:bg-white/5' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="pt-16">
        {children({ lang, isDark })}
      </main>

      <footer className={`border-t ${isDark ? 'border-white/10 bg-[#060b14]' : 'border-gray-200 bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-[#008a2f] flex items-center justify-center text-white font-bold text-xs">أ</div>
                <span className="font-bold text-lg" style={{ fontFamily: 'Almarai, sans-serif' }}>أسس</span>
              </div>
              <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                {lang === 'ar'
                  ? 'أكبر مجتمع عربي للبرمجيات الحرة والمفتوحة المصدر.'
                  : 'The largest Arabic community for free and open-source software.'}
              </p>
            </div>

            <div>
              <h4 className={`font-semibold text-sm uppercase tracking-wider mb-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                {lang === 'ar' ? 'روابط' : 'Links'}
              </h4>
              <ul className="space-y-2">
                {navItems.slice(0, 4).map(item => (
                  <li key={item.href}>
                    <a href={item.href} className={`text-sm ${isDark ? 'text-gray-400 hover:text-[#008a2f]' : 'text-gray-500 hover:text-[#008a2f]'} transition-colors`}>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className={`font-semibold text-sm uppercase tracking-wider mb-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                {lang === 'ar' ? 'المجتمع' : 'Community'}
              </h4>
              <ul className="space-y-2">
                {SOCIALS.map(s => (
                  <li key={s.label}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer" className={`text-sm ${isDark ? 'text-gray-400 hover:text-[#008a2f]' : 'text-gray-500 hover:text-[#008a2f]'} transition-colors`}>
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className={`font-semibold text-sm uppercase tracking-wider mb-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                {lang === 'ar' ? 'ادعمنا' : 'Support'}
              </h4>
              <p className={`text-sm mb-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                {lang === 'ar'
                  ? 'ادعم المجتمع عبر التبرع أو المساهمة في المشاريع.'
                  : 'Support the community through donations or contributing to projects.'}
              </p>
              <a
                href={`${BASE}/site/support-us`}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#008a2f] text-white text-sm font-medium rounded-lg hover:bg-[#006b24] transition-colors"
              >
                <Heart className="w-4 h-4" />
                {lang === 'ar' ? 'تبرع' : 'Donate'}
              </a>
            </div>
          </div>

          <div className={`mt-12 pt-8 border-t ${isDark ? 'border-white/10' : 'border-gray-200'} flex flex-col sm:flex-row justify-between items-center gap-4`}>
            <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
              © {new Date().getFullYear()} Aosus Community. {lang === 'ar' ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}
            </p>
            <p className={`text-xs ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
              {lang === 'ar'
                ? 'أسس مستضاف مالياً من The Hack Foundation (501(c)(3))'
                : 'Fiscally sponsored by The Hack Foundation (501(c)(3))'}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export function GlassCard({ children, className = '', isDark = true, hover = true }: { children: ReactNode; className?: string; isDark?: boolean; hover?: boolean }) {
  return (
    <div className={`rounded-2xl border ${isDark
      ? 'bg-white/5 border-white/10 backdrop-blur-sm'
      : 'bg-white border-gray-200 shadow-sm'
    } ${hover ? (isDark ? 'hover:bg-white/10 hover:border-white/20' : 'hover:shadow-md hover:border-gray-300') : ''} transition-all duration-300 ${className}`}>
      {children}
    </div>
  );
}

export function SectionHeading({ title, subtitle, isDark = true, center = true, lang = 'en' }: { title: string; subtitle?: string; isDark?: boolean; center?: boolean; lang?: Lang }) {
  return (
    <div className={`mb-12 ${center ? 'text-center' : ''}`}>
      <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: lang === 'ar' ? 'Almarai, sans-serif' : undefined }}>
        {title}
      </h2>
      {subtitle && (
        <p className={`text-lg max-w-2xl ${center ? 'mx-auto' : ''} ${isDark ? 'text-gray-400' : 'text-gray-500'}`} style={{ fontFamily: lang === 'ar' ? 'Almarai, sans-serif' : undefined }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

export function PrimaryButton({ children, href, className = '' }: { children: ReactNode; href?: string; className?: string }) {
  const cls = `inline-flex items-center gap-2 px-6 py-3 bg-[#008a2f] text-white font-semibold rounded-xl hover:bg-[#006b24] transition-all duration-300 hover:shadow-lg hover:shadow-[#008a2f]/25 ${className}`;
  if (href) return <a href={href} className={cls}>{children}</a>;
  return <button className={cls}>{children}</button>;
}

export function SecondaryButton({ children, href, isDark = true, className = '' }: { children: ReactNode; href?: string; isDark?: boolean; className?: string }) {
  const cls = `inline-flex items-center gap-2 px-6 py-3 font-semibold rounded-xl border-2 transition-all duration-300 ${isDark
    ? 'border-white/20 text-white hover:bg-white/10 hover:border-white/40'
    : 'border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400'
  } ${className}`;
  if (href) return <a href={href} className={cls}>{children}</a>;
  return <button className={cls}>{children}</button>;
}

export { BASE, type Lang };
