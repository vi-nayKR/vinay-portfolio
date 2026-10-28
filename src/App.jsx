import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import HomeSection from './components/HomeSection.jsx';
import SkillsSection from './components/SkillsSection.jsx';
import ExperienceSection from './components/ExperienceSection.jsx';
import ProjectsSection from './components/ProjectsSection.jsx';
import ResearchSection from './components/ResearchSection.jsx';
import ContactSection from './components/ContactSection.jsx';

const THEMES = [
  { id: 'light',  label: 'Light',  icon: '☼', dot: '#2563eb' },
  { id: 'dark',   label: 'Dark',   icon: '☾', dot: '#3b82f6' },
  { id: 'system', label: 'System', icon: '💻', dot: '#64748b' },
];

function SectionRenderer({ id, onNavigate, theme }) {
  switch (id) {
    case 'home': return <HomeSection onNavigate={onNavigate} theme={theme} />;
    case 'skills': return <SkillsSection onNavigate={onNavigate} />;
    case 'experience': return <ExperienceSection onNavigate={onNavigate} />;
    case 'projects': return <ProjectsSection onNavigate={onNavigate} />;
    case 'research': return <ResearchSection onNavigate={onNavigate} />;
    case 'contact': return <ContactSection />;
    default: return <HomeSection onNavigate={onNavigate} theme={theme} />;
  }
}

export default function App() {
  const [activeTab, setActiveTab] = useState(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace('#', '');
      if (['home', 'skills', 'experience', 'projects', 'research', 'contact'].includes(hash)) {
        return hash;
      }
    }
    return 'home';
  });

  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'system';
    try {
      if (localStorage.getItem('themeVersion') !== '6') {
        localStorage.setItem('themeVersion', '6');
        localStorage.setItem('theme', 'system');
        return 'system';
      }
      const saved = localStorage.getItem('theme');
      if (saved && THEMES.some((t) => t.id === saved)) return saved;
    } catch {
      // storage blocked: fall through to the default
    }
    return 'system';
  });

  const [systemIsDark, setSystemIsDark] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const [themeMenuOpen, setThemeMenuOpen] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e) => setSystemIsDark(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  const effectiveTheme = theme === 'system' ? (systemIsDark ? 'dark' : 'light') : theme;

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (['home', 'skills', 'experience', 'projects', 'research', 'contact'].includes(hash)) {
        setActiveTab(hash);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    html.classList.add('theme-transition');
    html.classList.remove('theme-light', 'theme-dark', 'theme-aurora', 'theme-void', 'theme-neon', 'theme-arctic');
    html.classList.add(`theme-${effectiveTheme}`);
    html.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('theme', theme);
    } catch {
      // storage blocked: theme still applies for this visit
    }
    const t = setTimeout(() => html.classList.remove('theme-transition'), 500);
    return () => clearTimeout(t);
  }, [theme, effectiveTheme]);

  const switchTab = useCallback((id) => {
    setActiveTab(id);
    if (typeof window !== 'undefined') {
      window.location.hash = id;
    }
    setThemeMenuOpen(false);
  }, []);

  const toggleThemeMenu = useCallback((val) => {
    setThemeMenuOpen((m) => (typeof val === 'boolean' ? val : !m));
  }, []);

  const currentTheme = THEMES.find((t) => t.id === theme) || THEMES[0];

  return (
    <div className="relative h-[100dvh] w-full flex flex-col overflow-hidden" style={{ background: 'var(--bg-primary)' }}>
      <Navbar
        activeTab={activeTab}
        onTabChange={switchTab}
        currentTheme={currentTheme}
        themes={THEMES}
        onThemeChange={setTheme}
        themeMenuOpen={themeMenuOpen}
        onToggleThemeMenu={toggleThemeMenu}
      />

      <main
        id="main-scroll"
        className="relative flex-1 min-h-0 w-full overflow-hidden flex flex-col"
        style={{
          marginTop: 'var(--nav-height)',
          marginBottom: 'var(--footer-height)',
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15, ease: 'easeInOut' }}
            className="w-full flex-1 min-h-0 flex flex-col"
          >
            <SectionRenderer id={activeTab} onNavigate={switchTab} theme={effectiveTheme} />
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}
