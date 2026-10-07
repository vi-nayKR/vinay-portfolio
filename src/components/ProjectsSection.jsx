import { motion } from 'motion/react';
import { projectsData } from '../data/projects.js';
import PagedCarousel from './PagedCarousel.jsx';

export default function ProjectsSection({ onNavigate }) {
  const highlights = projectsData.highlights;

  return (
    <div
      id="projects"
      className="grid-bg w-full flex-1 flex flex-col justify-start px-3 sm:px-6 md:px-8 pt-4 sm:pt-5 md:pt-6 pb-3 sm:pb-4 min-h-0 overflow-hidden relative select-none"
    >
      <div className="max-w-7xl mx-auto w-full flex flex-col justify-start min-h-0">
        {/* Section Header */}
        <div className="flex items-center justify-center mb-2 sm:mb-3 px-1 shrink-0">
          <div className="text-center min-w-0">
            <motion.h2
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xl sm:text-2xl md:text-3xl font-display font-bold tracking-tight inline-flex items-center gap-2"
              style={{ color: 'var(--text-primary)' }}
            >
              Projects &amp; <span className="gradient-text">Systems</span>
            </motion.h2>
            <p className="text-xs sm:text-[13px] font-mono mt-0.5 max-w-xl mx-auto truncate hidden sm:block" style={{ color: 'var(--text-muted)' }}>
              {projectsData.intro}
            </p>
          </div>
        </div>

        {/* Paged carousel: 2 project cards per page (1 on phones) */}
        <PagedCarousel
          items={highlights}
          label="Projects"
          itemLabel="project"
          getKey={(repo, i) => `${repo.title}-${i}`}
          renderItem={(repo) => (
              <div
                data-project-card="true"
                className="w-full h-[380px] sm:h-[415px] md:h-[426px] p-4 sm:p-5 md:p-6 rounded-2xl glass-card card-hover flex flex-col justify-between select-none group"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-2.5">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span
                        className="text-[10px] font-mono px-2.5 py-0.5 rounded-md uppercase tracking-wider font-bold"
                        style={{
                          background: 'color-mix(in srgb, var(--accent) 10%, transparent)',
                          color: 'var(--accent)',
                          border: '1px solid color-mix(in srgb, var(--accent) 22%, transparent)',
                        }}
                      >
                        {repo.domain}
                      </span>
                      {repo.badge && (
                        <span
                          className="text-[10px] font-mono px-2 py-0.5 rounded-md font-semibold hidden sm:inline-block"
                          style={{
                            background: 'color-mix(in srgb, var(--border-color) 40%, transparent)',
                            color: 'var(--text-primary)',
                          }}
                        >
                          {repo.badge}
                        </span>
                      )}
                    </div>
                    <a
                      href={repo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View ${repo.title} repository`}
                      className="p-1 rounded-lg hover:bg-[var(--border-subtle)] transition-all duration-200"
                      style={{ color: 'var(--text-muted)' }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <svg
                        className="w-4 h-4 transition-transform group-hover:scale-110"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </a>
                  </div>

                  <h3 className="font-display font-semibold text-base sm:text-lg md:text-xl mb-2.5 leading-snug tracking-tight break-words">
                    <a
                      href={repo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[var(--accent)] transition-colors inline-flex items-center gap-1.5"
                      style={{ color: 'var(--text-primary)' }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {repo.title}
                    </a>
                  </h3>

                  <p className="text-xs sm:text-sm leading-relaxed sm:leading-6 mb-3.5 tracking-normal line-clamp-3" style={{ color: 'var(--text-muted)' }}>
                    {repo.desc}
                  </p>

                  {repo.evidence && repo.evidence.length > 0 && (
                    <div className="flex flex-wrap items-center gap-2 mb-2.5">
                      <span className="text-[11px] font-mono text-[var(--text-muted)]">Verified in:</span>
                      {repo.evidence.map((ev) => (
                        <a
                          key={ev.label}
                          href={ev.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-mono font-medium transition-all duration-200 hover:scale-105"
                          style={{
                            background: 'color-mix(in srgb, var(--accent) 8%, transparent)',
                            color: 'var(--accent)',
                            border: '1px solid color-mix(in srgb, var(--accent) 20%, transparent)',
                          }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          {ev.label} ↗
                        </a>
                      ))}
                    </div>
                  )}
                </div>

                <div
                  className="flex items-center justify-between gap-2 pt-3.5 mt-2.5"
                  style={{ borderTop: '1px solid var(--border-subtle)' }}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: repo.langColor }} />
                    <span className="text-xs sm:text-[13px] font-mono" style={{ color: 'var(--text-muted)' }}>
                      {repo.lang}
                    </span>
                  </div>
                  <a
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs sm:text-[13px] font-mono font-medium transition-colors hover:underline flex items-center gap-1"
                    style={{ color: 'var(--accent)' }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    GitHub repo ↗
                  </a>
                </div>
              </div>
          )}
        />

        {/* Core Architecture Capabilities Bar (fills empty space on desktop) */}
        <div className="hidden lg:flex [@media(max-height:820px)]:hidden flex-wrap items-center justify-center gap-2 mt-2 px-2 shrink-0">
          <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)] mr-1">
            Core Architecture:
          </span>
          {projectsData.domains.slice(0, 6).map((dom) => (
            <span
              key={dom}
              className="px-2.5 py-0.5 rounded-lg text-[11px] font-mono text-[var(--text-muted)] border"
              style={{
                borderColor: 'var(--border-color)',
                background: 'var(--card-bg)',
              }}
            >
              {dom}
            </span>
          ))}
        </div>

        {/* Bottom Navigation Hint */}
        {onNavigate && (
          <div className="text-center mt-2 shrink-0">
            <button
              onClick={() => onNavigate('research')}
              className="inline-flex items-center gap-2 text-xs font-mono transition-all duration-200 hover:gap-3 cursor-pointer py-1 px-3 rounded-xl border border-transparent hover:border-[var(--border-color)]"
              style={{ color: 'var(--accent)' }}
            >
              Next: Explore Research &amp; Publications →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}