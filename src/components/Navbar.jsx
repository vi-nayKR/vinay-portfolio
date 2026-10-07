import { useRef, useEffect, useState } from 'react';
import { soundService } from '../services/soundService.js';

const desktopTabs = [
  { id: 'home', label: 'Home' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'research', label: 'Research' },
  { id: 'resume', label: 'Resume' },
];

const mobileTabs = [
  {
    id: 'home',
    label: 'Home',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 12l2-2m7 7l-2-2M5 12h3l1-2h8l1 2h3M5 12v7a1 1 0 001 1h3m10-9v7a1 1 0 001 1h3" />
      </svg>
    ),
  },
  {
    id: 'skills',
    label: 'Skills',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    id: 'experience',
    label: 'Experience',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 13.255A23.931 23.931 0 0112 21c-2.615 0-5.126-.472-7.456-1.339M9 12a4 4 0 11-8 0 4 4 0 018 0zm0 0v4m0-4H5m4 4h4" />
      </svg>
    ),
  },
  {
    id: 'projects',
    label: 'Projects',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
      </svg>
    ),
  },
  {
    id: 'research',
    label: 'Research',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    id: 'resume',
    label: 'Resume',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    id: 'contact',
    label: 'Contact',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
  },
];


export default function Navbar({
  activeTab,
  onTabChange,
  menuOpen,
  onToggleMenu,
  currentTheme,
  themes,
  onThemeChange,
  themeMenuOpen,
  onToggleThemeMenu,
}) {
  const themeId = currentTheme?.id || 'light';
  const isContactActive = activeTab === 'contact';
  const navRef = useRef(null);
  const themeContainerRef = useRef(null);
  const [soundActive, setSoundActive] = useState(() => soundService.isEnabled());

  useEffect(() => {
    return soundService.subscribe((enabled) => setSoundActive(enabled));
  }, []);

  const handleSoundToggle = () => {
    const next = soundService.toggleSound();
    setSoundActive(next);
  };

  // Close menus on click outside or Escape key
  useEffect(() => {
    function handleClickOutside(event) {
      if (themeMenuOpen && themeContainerRef.current && !themeContainerRef.current.contains(event.target)) {
        onToggleThemeMenu(false);
      }
      if (menuOpen && navRef.current && !navRef.current.contains(event.target)) {
        onToggleMenu(false);
      }
    }

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        if (themeMenuOpen) onToggleThemeMenu(false);
        if (menuOpen) onToggleMenu(false);
      }
    }

    if (themeMenuOpen || menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [themeMenuOpen, menuOpen, onToggleThemeMenu, onToggleMenu]);

  const handleToggleTheme = () => {
    if (!themeMenuOpen && menuOpen) onToggleMenu(false);
    onToggleThemeMenu();
  };

  const handleToggleMenu = () => {
    if (!menuOpen && themeMenuOpen) onToggleThemeMenu(false);
    onToggleMenu();
  };

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 transition-colors duration-300"
      style={{
        background: 'color-mix(in srgb, var(--bg-primary) 88%, transparent)',
        backdropFilter: 'saturate(180%) blur(20px)',
        WebkitBackdropFilter: 'saturate(180%) blur(20px)',
        borderBottom: '1px solid var(--border-color)',
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 flex items-center justify-between h-[64px] sm:h-[72px] md:h-[80px]">
        {/* Brand Logo */}
        <button
          onClick={() => onTabChange('home')}
          className="shrink-0 flex items-center py-1 group focus:outline-none cursor-pointer"
          aria-label="Navigate to Home"
        >
          <span
            className="text-3xl sm:text-4xl md:text-5xl tracking-tight transition-transform duration-200 group-hover:scale-105 leading-none select-none"
            style={{ fontFamily: "'Alex Brush', cursive", color: 'var(--accent)' }}
          >
            Vinay
          </span>
        </button>

        {/* Tab Pills — Desktop (lg+) */}
        <ul
          className="hidden lg:flex items-center gap-1 p-1.5 rounded-2xl mx-auto shadow-xs"
          style={{
            background: 'color-mix(in srgb, var(--bg-surface) 75%, transparent)',
            border: '1px solid var(--border-color)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
          }}
        >
          {desktopTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <li key={tab.id}>
                <button
                  onClick={() => onTabChange(tab.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-[13px] font-sans font-medium transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'font-semibold'
                      : 'hover:text-[var(--text-primary)] hover:bg-[var(--border-subtle)]'
                  }`}
                  style={
                    isActive
                      ? {
                          color: 'var(--accent)',
                          background: 'color-mix(in srgb, var(--accent) 14%, transparent)',
                          boxShadow: '0 0 16px color-mix(in srgb, var(--accent) 15%, transparent)',
                        }
                      : { color: 'var(--text-muted)' }
                  }
                >
                  <span className="whitespace-nowrap">{tab.label}</span>
                </button>
              </li>
            );
          })}
        </ul>

        {/* Right side actions */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Sound Toggle Button */}
          <button
            onClick={handleSoundToggle}
            className="p-1.5 sm:p-2 rounded-xl border transition-all duration-200 hover:scale-105 cursor-pointer text-xs font-mono"
            style={{
              borderColor: soundActive ? 'var(--accent)' : 'var(--border-color)',
              color: soundActive ? 'var(--accent)' : 'var(--text-muted)',
              background: 'color-mix(in srgb, var(--bg-surface) 75%, transparent)',
            }}
            title={soundActive ? 'Sound Effects Enabled (Click to Mute)' : 'Sound Effects Muted (Click to Enable)'}
            aria-label={soundActive ? 'Mute sound effects' : 'Enable sound effects'}
          >
            {soundActive ? (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
              </svg>
            )}
          </button>

          {/* Theme selector */}
          <div ref={themeContainerRef} className="relative">
            <button
              onClick={handleToggleTheme}
              className="p-1.5 sm:p-2 rounded-xl border flex items-center justify-center gap-1.5 transition-all duration-200 hover:border-[var(--accent)] hover:scale-105 cursor-pointer"
              style={{
                borderColor: themeMenuOpen ? 'var(--accent)' : 'var(--border-color)',
                color: themeMenuOpen ? 'var(--text-primary)' : 'var(--text-muted)',
                background: 'color-mix(in srgb, var(--bg-surface) 75%, transparent)',
                boxShadow: themeMenuOpen ? '0 0 12px color-mix(in srgb, var(--accent) 25%, transparent)' : undefined,
              }}
              aria-label="Change theme"
              aria-expanded={themeMenuOpen}
              title={`Theme: ${currentTheme?.label || 'Light'} (click to change)`}
            >
              <span
                className="w-3 h-3 rounded-full shrink-0 border border-white/20 transition-all duration-300"
                style={{
                  background: currentTheme?.dot || 'var(--accent)',
                  boxShadow: `0 0 8px ${currentTheme?.dot || 'var(--accent)'}`,
                }}
              />
              <svg
                className={`w-3 h-3 text-[var(--text-muted)] transition-transform duration-200 ${
                  themeMenuOpen ? 'rotate-180 text-[var(--accent)]' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Floating theme dropdown popover */}
            {themeMenuOpen && (
              <div
                className="absolute right-0 top-full mt-2.5 py-1.5 px-1.5 rounded-2xl border shadow-2xl min-w-[170px] z-50 glass-card animate-in fade-in slide-in-from-top-2 duration-150"
                style={{
                  background: 'var(--bg-surface)',
                  borderColor: 'var(--border-color)',
                  boxShadow: '0 16px 40px rgba(0,0,0,0.5)',
                }}
              >
                <div className="p-1 space-y-1">
                  {themes.map((t) => {
                    const isSelected = themeId === t.id;
                    return (
                      <button
                        key={t.id}
                        data-theme-id={t.id}
                        onClick={() => {
                          onThemeChange(t.id);
                          onToggleThemeMenu(false);
                        }}
                        className={`w-full flex items-center gap-2.5 px-3 py-2 text-left text-xs sm:text-sm transition-all rounded-xl cursor-pointer ${
                          isSelected ? 'font-semibold' : 'hover:bg-[var(--border-subtle)]'
                        }`}
                        style={{
                          color: isSelected ? 'var(--text-primary)' : 'var(--text-muted)',
                          background: isSelected
                            ? 'color-mix(in srgb, var(--accent) 14%, transparent)'
                            : undefined,
                        }}
                      >
                        <span
                          className="w-3 h-3 rounded-full shrink-0 border border-white/20"
                          style={{
                            background: t.dot,
                            boxShadow: isSelected ? `0 0 10px ${t.dot}` : undefined,
                          }}
                        />
                        <span className="flex-1 font-medium">{t.label}</span>
                        {isSelected && (
                          <svg
                            className="w-4 h-4 shrink-0"
                            style={{ color: t.dot }}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Connect button — visible on sm+ screens */}
          <button
            onClick={() => onTabChange('contact')}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all duration-200 hover:shadow-lg hover:scale-105 cursor-pointer shadow-xs"
            style={
              isContactActive
                ? {
                    background: 'var(--accent-fill, var(--accent))',
                    color: '#fff',
                    boxShadow: '0 0 20px color-mix(in srgb, var(--accent) 45%, transparent)',
                    outline: '2px solid var(--accent)',
                    outlineOffset: '2px',
                  }
                : {
                    background: 'var(--accent-fill, var(--accent))',
                    color: '#fff',
                  }
            }
            aria-label="Navigate to Contact"
            title="Get in Touch & Connect"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse shrink-0" />
            <span className="whitespace-nowrap">Connect</span>
          </button>

          {/* Mobile / Tablet: hamburger */}
          <button
            onClick={handleToggleMenu}
            className="lg:hidden p-2 rounded-xl border flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Menu"
            aria-expanded={menuOpen}
            style={{
              borderColor: menuOpen ? 'var(--accent)' : 'var(--border-color)',
              color: 'var(--text-primary)',
              background: 'var(--border-subtle)',
            }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile / Tablet Drawer */}
      {menuOpen && (
        <div
          className="lg:hidden px-4 sm:px-6 pb-4 pt-2 border-b animate-in fade-in slide-in-from-top-2 duration-150"
          style={{ background: 'var(--bg-surface)', borderBottom: '1px solid var(--border-color)' }}
        >
          <div className="grid grid-cols-4 gap-2">
            {mobileTabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={`flex flex-col items-center justify-center gap-1.5 py-2.5 px-1 rounded-xl text-[11px] font-mono transition-all duration-200 cursor-pointer ${
                    isActive ? 'font-bold' : ''
                  }`}
                  style={{
                    color: isActive ? 'var(--accent)' : 'var(--text-muted)',
                    background: isActive
                      ? 'color-mix(in srgb, var(--accent) 12%, transparent)'
                      : 'var(--border-subtle)',
                  }}
                >
                  <span className="shrink-0">{tab.icon}</span>
                  <span className="truncate max-w-full">{tab.label}</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2 pt-2 mt-2 border-t" style={{ borderColor: 'var(--border-color)' }}>
            <button
              onClick={handleSoundToggle}
              className="w-full py-2 px-3 rounded-xl text-xs font-mono border flex items-center justify-center gap-2 cursor-pointer"
              style={{
                borderColor: soundActive ? 'var(--accent)' : 'var(--border-color)',
                color: soundActive ? 'var(--accent)' : 'var(--text-muted)',
                background: 'var(--border-subtle)',
              }}
              title={soundActive ? 'Sound Effects Enabled (Click to Mute)' : 'Sound Effects Muted (Click to Enable)'}
              aria-label={soundActive ? 'Mute sound effects' : 'Enable sound effects'}
            >
              {soundActive ? '🔊 Sound On (Click to Mute)' : '🔇 Sound Muted (Click to Enable)'}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
