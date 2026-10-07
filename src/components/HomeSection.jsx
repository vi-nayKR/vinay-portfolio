import { motion } from 'motion/react';
import { heroData } from '../data/hero.js';

export default function HomeSection({ onNavigate, theme }) {
  const isLight = theme === 'light' || theme === 'cat-light';
  return (
    <div id="home" className="grid-bg relative w-full flex-1 flex flex-col items-center justify-start px-4 sm:px-6 md:px-8 pt-3 sm:pt-6 md:pt-8 pb-3 sm:pb-6 min-h-0">
      {/* Ambient accent glow */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] rounded-full pointer-events-none -z-10 blur-3xl opacity-20"
        style={{ background: 'radial-gradient(circle, color-mix(in srgb, var(--accent) 35%, transparent) 0%, transparent 70%)' }}
      />

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center w-full">
        {/* Avatar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-3 sm:mb-6"
        >
          {/* HUD frame: square photo, accent corner brackets, side connector lines (matches the GitHub profile card) */}
          <div className="relative w-24 sm:w-32 md:w-36 transition-transform duration-300 hover:scale-105">
            {[
              'top-0 left-0 border-t-2 border-l-2',
              'top-0 right-0 border-t-2 border-r-2',
              'bottom-0 left-0 border-b-2 border-l-2',
              'bottom-0 right-0 border-b-2 border-r-2',
            ].map((pos) => (
              <span
                key={pos}
                aria-hidden="true"
                className={`absolute w-4 h-4 sm:w-6 sm:h-6 pointer-events-none ${pos}`}
                style={{ borderColor: 'var(--accent)' }}
              />
            ))}
            {['top-[38%]', 'top-[70%]'].map((top) =>
              ['right-full', 'left-full'].map((side) => (
                <span
                  key={top + side}
                  aria-hidden="true"
                  className={`hidden sm:flex absolute ${top} ${side} items-center w-8 md:w-10 pointer-events-none ${side === 'right-full' ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  <span className="w-1 h-1 rounded-full shrink-0" style={{ background: 'var(--accent)' }} />
                  <span className="flex-1 h-px" style={{ background: 'color-mix(in srgb, var(--accent) 35%, transparent)' }} />
                </span>
              ))
            )}
            {/* Black-and-white cut-out on black; the frame, brackets and glow carry the theme colour. */}
            <div
              className="relative m-1.5 sm:m-2 overflow-hidden"
              style={{
                background: isLight ? 'var(--bg-surface, #ffffff)' : '#000000',
                isolation: 'isolate',
                boxShadow: '0 0 40px color-mix(in srgb, var(--accent) 22%, transparent)',
              }}
            >
              <img
                src={isLight ? '/images/avatar-light.webp' : '/images/avatar.webp'}
                alt="Vinay K R"
                width="560"
                height="489"
                className="w-full h-auto block"
              />
            </div>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-2xl sm:text-4xl md:text-5xl font-display font-bold tracking-normal mb-2 sm:mb-4 text-center"
          style={{ color: 'var(--text-primary)' }}
        >
          Hey, I'm <span className="gradient-text">Vinay</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-xs sm:text-lg md:text-xl font-medium max-w-2xl leading-relaxed tracking-normal mb-2 sm:mb-4"
          style={{ color: 'var(--text-primary)' }}
        >
          {heroData.tagline}{' '}
          <span style={{ color: 'var(--accent)' }}>{heroData.subtitle}</span>
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-xs sm:text-sm md:text-[15px] max-w-2xl leading-relaxed sm:leading-7 md:leading-8 tracking-wide mb-4 sm:mb-8"
          style={{ color: 'var(--text-muted)' }}
        >
          {heroData.description}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 mb-4 sm:mb-8"
        >
          <button
            onClick={() => onNavigate('projects')}
            className="px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold text-xs sm:text-sm tracking-wide transition-all duration-300 hover:shadow-lg hover:scale-105 flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            style={{ background: 'var(--accent-fill, var(--accent))', color: '#fff' }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" /></svg>
            View Projects
          </button>
          <button
            onClick={() => onNavigate('contact')}
            className="px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold text-xs sm:text-sm tracking-wide transition-all duration-300 hover:shadow-lg hover:scale-105 border flex items-center justify-center gap-2 cursor-pointer glass-card"
            style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
            Get in Touch
          </button>
          <button
            onClick={() => onNavigate('resume')}
            className="px-4 sm:px-5 py-2 sm:py-3 rounded-xl font-semibold text-xs sm:text-sm tracking-wide transition-all duration-300 hover:scale-105 border flex items-center justify-center gap-2 cursor-pointer"
            style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-muted)', background: 'var(--border-subtle)' }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            View Resume
          </button>
        </motion.div>

        {/* Tech stack */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="w-full"
        >
          <p className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.18em] sm:tracking-[0.2em] mb-2 sm:mb-4" style={{ color: 'var(--text-muted)' }}>
            Core Technologies &amp; Frameworks
          </p>
          <div className="flex flex-wrap gap-1.5 sm:gap-2.5 justify-center max-w-3xl mx-auto">
            {heroData.techs.map((t) => (
              <span
                key={t}
                className="px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-lg text-[11px] sm:text-[13px] font-mono tracking-wide transition-all duration-200 hover:scale-105"
                style={{ background: 'var(--card-bg)', color: 'var(--accent)', border: '1px solid var(--border-color)' }}
              >
                {t}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
