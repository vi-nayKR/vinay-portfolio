import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import HomeSection from './components/HomeSection.jsx';
import SkillsSection from './components/SkillsSection.jsx';
import ExperienceSection from './components/ExperienceSection.jsx';
import ResumeSection from './components/ResumeSection.jsx';
import ProjectsSection from './components/ProjectsSection.jsx';
import ResearchSection from './components/ResearchSection.jsx';
import ContactSection from './components/ContactSection.jsx';

const THEMES = [
  { id: 'aurora',  label: 'Aurora',   icon: '✦', dot: '#22d3ee' },
  { id: 'void',    label: 'Void',     icon: '☀', dot: '#ff6b00' },
  { id: 'neon',    label: 'Neon',     icon: '◈', dot: '#ff2e9a' },
  { id: 'arctic',  label: 'Arctic',   icon: '❄', dot: '#00d4ff' },
  { id: 'light',   label: 'Light',    icon: '☾', dot: '#6366f1' },
];

function SectionRenderer({ id, onNavigate }) {
  switch (id) {
    case 'home': return <HomeSection onNavigate={onNavigate} />;
    case 'skills': return <SkillsSection onNavigate={onNavigate} />;
    case 'experience': return <ExperienceSection onNavigate={onNavigate} />;
    case 'resume': return <ResumeSection onNavigate={onNavigate} />;
    case 'projects': return <ProjectsSection onNavigate={onNavigate} />;
    case 'research': return <ResearchSection onNavigate={onNavigate} />;
    case 'contact': return <ContactSection />;
    default: return <HomeSection onNavigate={onNavigate} />;
  }
}

export default function App() {
  const [activeTab, setActiveTab] = useState(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace('#', '');
      if (['home', 'skills', 'experience', 'projects', 'research', 'resume', 'contact'].includes(hash)) {
        return hash;
      }
    }
    return 'home';
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'aurora';
    try {
      // v2 made Aurora the default; earlier visitors start on it once, then their choice sticks.
      if (localStorage.getItem('themeVersion') !== '2') {
        localStorage.setItem('themeVersion', '2');
        return 'aurora';
      }
      const saved = localStorage.getItem('theme');
      if (saved && THEMES.some((t) => t.id === saved)) return saved;
    } catch {
      // storage blocked: fall through to the default
    }
    return 'aurora';
  });
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  const mainScrollRef = useRef(null);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (['home', 'skills', 'experience', 'projects', 'research', 'resume', 'contact'].includes(hash)) {
        setActiveTab(hash);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    html.classList.add('theme-transition');
    THEMES.forEach((t) => html.classList.remove(`theme-${t.id}`));
    html.classList.add(`theme-${theme}`);
    try {
      localStorage.setItem('theme', theme);
    } catch {
      // storage blocked: theme still applies for this visit
    }
    const t = setTimeout(() => html.classList.remove('theme-transition'), 500);
    return () => clearTimeout(t);
  }, [theme]);

  const switchTab = useCallback((id) => {
    setActiveTab(id);
    if (typeof window !== 'undefined') {
      window.location.hash = id;
    }
    setMenuOpen(false);
    setThemeMenuOpen(false);
    if (mainScrollRef.current) {
      mainScrollRef.current.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, []);

  const toggleThemeMenu = useCallback((val) => {
    setThemeMenuOpen((m) => (typeof val === 'boolean' ? val : !m));
  }, []);

  const toggleMenu = useCallback((val) => {
    setMenuOpen((m) => (typeof val === 'boolean' ? val : !m));
  }, []);

  const currentTheme = THEMES.find((t) => t.id === theme) || THEMES[0];

  return (
    <div className="relative h-[100dvh] w-full flex flex-col overflow-hidden" style={{ background: 'var(--bg-primary)' }}>
      <Navbar
        activeTab={activeTab}
        onTabChange={switchTab}
        menuOpen={menuOpen}
        onToggleMenu={toggleMenu}
        currentTheme={currentTheme}
        themes={THEMES}
        onThemeChange={setTheme}
        themeMenuOpen={themeMenuOpen}
        onToggleThemeMenu={toggleThemeMenu}
      />

      <main
        ref={mainScrollRef}
        id="main-scroll"
        className="relative flex-1 w-full overflow-y-auto overflow-x-hidden flex flex-col"
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
            className="w-full flex-1 flex flex-col"
          >
            <SectionRenderer id={activeTab} onNavigate={switchTab} />
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}
