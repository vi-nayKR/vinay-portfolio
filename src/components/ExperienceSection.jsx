import { motion } from 'motion/react';
import { experienceData } from '../data/experience.js';
import PagedCarousel from './PagedCarousel.jsx';

export default function ExperienceSection({ onNavigate }) {
  const experiences = experienceData.experiences;

  return (
    <div
      id="experience"
      className="grid-bg w-full flex-1 flex flex-col justify-start px-3 sm:px-6 md:px-8 pt-2.5 sm:pt-4 md:pt-5 pb-2.5 sm:pb-4 min-h-0 overflow-hidden relative select-none"
    >
      <div className="max-w-7xl mx-auto w-full flex flex-col justify-start min-h-0">
        {/* Section Header */}
        <div className="flex items-center justify-center mb-2 sm:mb-2.5 px-1 shrink-0">
          <div className="text-center">
            <motion.h2
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xl sm:text-2xl md:text-3xl font-display font-bold tracking-tight inline-flex items-center gap-2"
              style={{ color: 'var(--text-primary)' }}
            >
              Work <span className="gradient-text">Experience</span>
            </motion.h2>
          </div>
        </div>

        {/* Paged carousel: 2 window cards per page (1 on phones) */}
        <PagedCarousel
          items={experiences}
          label="Work experience"
          itemLabel="experience"
          getKey={(exp, idx) => `${exp.slug}-${idx}`}
          renderItem={(exp) => (
              <div
                data-experience-card="true"
                className="w-full h-[470px] sm:h-[478px] md:h-[478px] rounded-2xl glass-card border flex flex-col overflow-hidden shadow-xl select-none"
                style={{
                  borderColor: 'var(--border-color)',
                  background: 'var(--card-bg)',
                }}
              >
                {/* OS Window Header Bar */}
                <div
                  className="flex items-center justify-between px-3.5 py-2 sm:px-4 sm:py-2.5 border-b shrink-0 text-xs font-mono"
                  style={{
                    borderColor: 'var(--border-color)',
                    background: 'color-mix(in srgb, var(--bg-secondary) 85%, transparent)',
                  }}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]/90 border border-black/20" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]/90 border border-black/20" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]/90 border border-black/20" />
                    <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-[var(--text-muted)] font-mono pl-1">
                      <span style={{ color: 'var(--accent)' }}>❯</span> ~/experience/{exp.slug}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className="text-[10px] font-mono px-2 py-0.5 rounded-md uppercase tracking-wider font-bold"
                      style={{
                        background: 'color-mix(in srgb, var(--accent) 12%, transparent)',
                        color: 'var(--accent)',
                        border: '1px solid color-mix(in srgb, var(--accent) 25%, transparent)',
                      }}
                    >
                      {exp.type}
                    </span>
                  </div>
                </div>

                {/* Window Body: Pure Experience Content (No Screenshot) */}
                <div className="flex-1 p-3.5 sm:p-4 md:p-5 flex flex-col justify-between min-h-0 overflow-y-auto">
                  <div className="min-w-0">
                    {/* Header Info */}
                    <div className="mb-2">
                      <h3
                        className="font-display font-bold text-base sm:text-lg md:text-xl leading-snug tracking-tight truncate"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        {exp.company}
                      </h3>
                      <p
                        className="text-xs sm:text-[13px] font-medium mt-0.5 line-clamp-1"
                        style={{ color: 'var(--accent)' }}
                      >
                        {exp.note}
                      </p>
                    </div>

                    {/* Period & Stat Pill */}
                    <div className="flex items-center gap-2.5 mb-2 sm:mb-2.5 text-xs font-mono" style={{ color: 'var(--text-muted)' }}>
                      <span className="flex items-center gap-1.5">
                        <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {exp.period}
                      </span>
                      <span>·</span>
                      <span
                        className="px-2 py-0.5 rounded text-[10px] sm:text-[11px] font-medium"
                        style={{
                          background: 'color-mix(in srgb, var(--border-color) 40%, transparent)',
                          color: 'var(--text-primary)',
                        }}
                      >
                        {exp.stat}
                      </span>
                    </div>

                    {/* Highlights Bullet Points */}
                    <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-[13px] leading-relaxed text-[var(--text-muted)]">
                      {exp.highlights.map((point, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span
                            className="font-mono font-bold shrink-0 mt-0.5 text-xs select-none"
                            style={{ color: 'var(--accent)' }}
                          >
                            ▹
                          </span>
                          <span className="text-[var(--text-primary)]/90">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech Stack Tags */}
                  <div
                    className="flex flex-wrap gap-1 sm:gap-1.5 pt-2 sm:pt-2.5 mt-2"
                    style={{ borderTop: '1px solid var(--border-subtle)' }}
                  >
                    {exp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-md text-[10px] sm:text-[11px] font-mono transition-colors"
                        style={{
                          background: 'color-mix(in srgb, var(--bg-primary) 70%, transparent)',
                          color: 'var(--text-muted)',
                          border: '1px solid var(--border-color)',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
          )}
        />

        {/* Experience Highlights Summary (desktop) */}
        <div className="hidden lg:flex [@media(max-height:820px)]:hidden flex-wrap items-center justify-center gap-3 mt-2 px-2 text-xs font-mono text-[var(--text-muted)] shrink-0">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border" style={{ borderColor: 'var(--border-color)', background: 'var(--card-bg)' }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--accent)' }} />
            3+ Years Production Engineering
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border" style={{ borderColor: 'var(--border-color)', background: 'var(--card-bg)' }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--accent)' }} />
            AI Features Built at 2 Companies
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border" style={{ borderColor: 'var(--border-color)', background: 'var(--card-bg)' }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--accent)' }} />
            Python AI Services &amp; Go Platforms
          </span>
        </div>

        {/* Bottom Navigation Hint */}
        {onNavigate && (
          <div className="text-center mt-2 shrink-0">
            <button
              onClick={() => onNavigate('projects')}
              className="inline-flex items-center gap-2 text-xs font-mono transition-all duration-200 hover:gap-3 cursor-pointer py-1 px-3 rounded-xl border border-transparent hover:border-[var(--border-color)]"
              style={{ color: 'var(--accent)' }}
            >
              Next: Explore Projects &amp; Systems →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
