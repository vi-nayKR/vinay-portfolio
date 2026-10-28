import { useEffect, useState } from 'react';
import { soundService } from '../services/soundService.js';

const desktopTabs = [
  { id: 'home', label: 'Home' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'research', label: 'Research' },
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
    id: 'contact',
    label: 'Contact',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
  },
];


const themeIcons = {
  light: (
    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  ),
  dark: (
    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
  ),
  system: (
    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
};

export default function Navbar({
  activeTab,
  onTabChange,
  currentTheme,
  themes,
  onThemeChange,
}) {
  const themeId = currentTheme?.id || 'system';
  const isContactActive = activeTab === 'contact';
  const [soundActive, setSoundActive] = useState(() => soundService.isEnabled());

  useEffect(() => {
    return soundService.subscribe((enabled) => setSoundActive(enabled));
  }, []);

  const handleSoundToggle = () => {
    const next = soundService.toggleSound();
    setSoundActive(next);
  };

  return (
    <nav
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

          {/* Horizontal Theme Selector */}
          <div
            className="flex items-center gap-0.5 p-0.5 sm:p-1 rounded-xl border"
            style={{
              borderColor: 'var(--border-color)',
              background: 'color-mix(in srgb, var(--bg-surface) 75%, transparent)',
            }}
            role="group"
            aria-label="Theme selection"
          >
            {themes.map((t) => {
              const isSelected = themeId === t.id;
              return (
                <button
                  key={t.id}
                  data-theme-id={t.id}
                  onClick={() => onThemeChange(t.id)}
                  className={`p-1.5 sm:p-2 rounded-lg transition-all duration-200 cursor-pointer flex items-center justify-center ${
                    isSelected
                      ? 'shadow-xs font-semibold'
                      : 'hover:text-[var(--text-primary)] hover:bg-[var(--border-subtle)]'
                  }`}
                  style={
                    isSelected
                      ? {
                          color: 'var(--accent)',
                          background: 'color-mix(in srgb, var(--accent) 15%, transparent)',
                          boxShadow: '0 0 10px color-mix(in srgb, var(--accent) 20%, transparent)',
                        }
                      : { color: 'var(--text-muted)' }
                  }
                  title={`${t.label} theme`}
                  aria-label={`Switch to ${t.label} theme`}
                  aria-pressed={isSelected}
                >
                  {themeIcons[t.id] || t.icon}
                </button>
              );
            })}
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

        </div>
      </div>

      <div className="lg:hidden h-12 px-1.5 sm:px-4 border-t" style={{ borderColor: 'var(--border-color)' }}>
        <div className="grid grid-cols-6 h-full max-w-3xl mx-auto gap-1 items-center" aria-label="Primary navigation">
          {mobileTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onTabChange(tab.id)}
                aria-current={isActive ? 'page' : undefined}
                className="min-w-0 h-9 px-0.5 rounded-lg font-mono font-medium leading-none truncate transition-all duration-200 cursor-pointer [font-size:clamp(8px,1.5vw,11px)]"
                style={{
                  color: isActive ? 'var(--accent)' : 'var(--text-muted)',
                  background: isActive ? 'color-mix(in srgb, var(--accent) 14%, transparent)' : 'transparent',
                  border: `1px solid ${isActive ? 'color-mix(in srgb, var(--accent) 28%, transparent)' : 'transparent'}`,
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
