import { motion } from 'motion/react';
import { researchData } from '../data/research.js';

export default function ResearchSection({ onNavigate }) {
  const thumbSrc = researchData.thumbnail.startsWith('/') ? researchData.thumbnail : `/${researchData.thumbnail}`;

  return (
    <div
      id="research"
      className="grid-bg w-full flex-1 flex flex-col justify-start px-4 sm:px-6 md:px-8 pt-4 sm:pt-6 md:pt-8 pb-4 sm:pb-6 min-h-0 overflow-hidden relative select-none"
    >
      <div className="max-w-4xl lg:max-w-5xl mx-auto w-full flex flex-col justify-start min-h-0">
        {/* Section Header */}
        <div className="text-center mb-3 sm:mb-4 shrink-0 px-1">
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[11px] sm:text-xs font-mono uppercase tracking-widest mb-0.5 sm:mb-1"
            style={{ color: 'var(--accent)' }}
          >
            Peer-Reviewed Research
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="text-xl sm:text-2xl md:text-3xl font-display font-bold tracking-tight"
            style={{ color: 'var(--text-primary)' }}
          >
            Research &amp; <span className="gradient-text">Exploration</span>
          </motion.h2>
        </div>

        {/* Unified Research Showcase Window */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="rounded-2xl glass-card border flex flex-col overflow-hidden shadow-xl"
          style={{ borderColor: 'var(--border-color)', background: 'var(--card-bg)' }}
        >
          {/* Header Bar with Publication Badges and Links */}
          <div
            className="px-3 py-1.5 sm:px-5 sm:py-2.5 border-b flex items-center justify-between gap-2 text-xs font-mono"
            style={{
              borderColor: 'var(--border-color)',
              background: 'color-mix(in srgb, var(--bg-secondary) 85%, transparent)',
            }}
          >
            <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]/90 border border-black/20 shrink-0" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]/90 border border-black/20 shrink-0" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]/90 border border-black/20 shrink-0" />
              <span
                className="text-[10px] font-mono px-2 py-0.5 rounded-md uppercase tracking-wider font-bold ml-0.5 sm:ml-1 shrink-0"
                style={{
                  background: 'rgba(8,153,125,0.14)',
                  color: '#089981',
                  border: '1px solid rgba(8,153,125,0.3)',
                }}
              >
                IEEE Published
              </span>
              <span className="text-[11px] text-[var(--text-muted)] hidden md:inline truncate">
                DOI: {researchData.doi}
              </span>
            </div>

            {/* Quick Publication Links */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              <a
                href={researchData.ieeeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md text-[10px] sm:text-[11px] font-mono border hover:scale-105 transition-all"
                style={{
                  background: 'rgba(0,98,155,0.12)',
                  borderColor: 'rgba(0,98,155,0.3)',
                  color: '#38bdf8',
                }}
              >
                <span className="hidden sm:inline">IEEE Xplore</span>
                <span className="sm:hidden">IEEE</span>
                <span className="text-[9px] sm:text-[10px]">↗</span>
              </a>
              <a
                href={researchData.researchGateUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md text-[10px] sm:text-[11px] font-mono border hover:scale-105 transition-all"
                style={{
                  background: 'rgba(64,186,33,0.1)',
                  borderColor: 'rgba(64,186,33,0.25)',
                  color: '#4ade80',
                }}
              >
                <span className="hidden sm:inline">ResearchGate</span>
                <span className="sm:hidden">RG</span>
                <span className="text-[9px] sm:text-[10px]">↗</span>
              </a>
            </div>
          </div>

          {/* Body: 2-Column Responsive Layout */}
          <div className="p-3.5 sm:p-5 md:p-6 flex flex-col md:flex-row gap-4 sm:gap-5 md:gap-6 items-stretch justify-between">
            {/* Left Column: Abstract, Tech Tags, and CTA */}
            <div className="flex-1 flex flex-col justify-between min-w-0 pr-0 md:pr-2">
              <div>
                <h3
                  className="text-base sm:text-xl md:text-2xl font-display font-bold tracking-tight leading-snug mb-2.5 sm:mb-3.5"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {researchData.paperTitle}
                </h3>
                <p
                  className="text-xs sm:text-sm md:text-base leading-relaxed sm:leading-7 mb-3.5 sm:mb-5 tracking-normal line-clamp-3 sm:line-clamp-none"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {researchData.paperAbstract}
                </p>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-2 mb-3.5 sm:mb-5">
                  {researchData.tags.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-lg text-[11px] sm:text-xs font-mono"
                      style={{
                        background: 'color-mix(in srgb, var(--bg-primary) 70%, transparent)',
                        color: 'var(--text-muted)',
                        border: '1px solid var(--border-color)',
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3.5 sm:pt-4 border-t flex items-center gap-3.5" style={{ borderColor: 'var(--border-subtle)' }}>
                <a
                  href={researchData.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-white font-bold text-xs sm:text-sm transition-all duration-200 shadow-md hover:scale-105 cursor-pointer"
                  style={{ background: 'var(--accent)' }}
                >
                  Launch Live Terminal
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
                <span className="text-[11px] font-mono text-[var(--text-muted)] hidden sm:inline">
                  Interactive model experiment
                </span>
              </div>
            </div>

            {/* Right Column: Live Terminal Visual Mockup */}
            <div className="w-full md:w-[300px] lg:w-[360px] shrink-0 flex flex-col justify-center items-center">
              <a
                href={researchData.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block w-full rounded-xl overflow-hidden border shadow-lg hover:border-[var(--accent)] transition-all duration-300 cursor-pointer"
                style={{ borderColor: 'var(--border-color)' }}
              >
                {/* Mini Titlebar */}
                <div
                  className="px-3 py-1 sm:py-1.5 border-b flex items-center justify-between text-[10px] font-mono text-[var(--text-muted)] select-none"
                  style={{
                    borderColor: 'var(--border-color)',
                    background: 'color-mix(in srgb, var(--bg-surface) 90%, transparent)',
                  }}
                >
                  <span className="truncate pr-1">stock-terminal-ml.workers.dev</span>
                  <div className="flex items-center gap-1.5 shrink-0" style={{ color: '#089981' }}>
                    <span className="w-1.5 h-1.5 rounded-full animate-pulse bg-[#089981]" />
                    <span className="font-bold">Live Demo</span>
                  </div>
                </div>

                {/* Thumbnail */}
                <div className="relative w-full h-[120px] sm:h-[160px] md:h-[190px] overflow-hidden bg-black/60 flex items-center justify-center">
                  <img
                    src={thumbSrc}
                    alt="Research terminal"
                    loading="eager"
                    decoding="sync"
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-[2px] bg-black/50 z-20">
                    <div
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-white font-display font-bold text-xs shadow-xl"
                      style={{ background: 'var(--accent)' }}
                    >
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                      Explore Live Terminal
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </motion.div>

        {/* Bottom Navigation Hint */}
        {onNavigate && (
          <div className="text-center mt-2.5 shrink-0">
            <button
              onClick={() => onNavigate('resume')}
              className="inline-flex items-center gap-2 text-xs font-mono transition-all duration-200 hover:gap-3 cursor-pointer py-1 px-3 rounded-xl border border-transparent hover:border-[var(--border-color)]"
              style={{ color: 'var(--accent)' }}
            >
              Next: View Interactive Resume →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
