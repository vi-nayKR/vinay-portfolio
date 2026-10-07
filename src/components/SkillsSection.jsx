import { motion } from 'motion/react';
import { skillsData } from '../data/skills.js';
import { useBoundedCarousel } from '../hooks/useBoundedCarousel.js';

export default function SkillsSection({ onNavigate }) {
  const {
    x,
    containerRef: mobileTrackContainer,
    trackRef: mobileTrackRef,
    maxScroll,
    stepPrev,
    stepNext,
    calculateBounds,
  } = useBoundedCarousel({ itemCount: skillsData.categories.length });

  return (
    <div id="skills" className="grid-bg w-full flex-1 flex flex-col justify-start px-3 sm:px-6 md:px-8 pt-3 sm:pt-6 md:pt-8 pb-3 sm:pb-6 min-h-0 overflow-hidden relative select-none">
      <div className="max-w-6xl mx-auto w-full flex-1 flex flex-col justify-between sm:justify-start min-h-0 py-1 sm:py-0">
        {/* Header */}
        <div className="text-center mb-3 sm:mb-4 shrink-0 px-1">
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[10px] sm:text-xs font-mono uppercase tracking-widest mb-0.5 sm:mb-1"
            style={{ color: 'var(--accent)' }}
          >
            Skills
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="text-xl sm:text-2xl md:text-3xl font-display font-bold tracking-tight"
            style={{ color: 'var(--text-primary)' }}
          >
            Skills &amp; <span className="gradient-text">Technologies</span>
          </motion.h2>
        </div>

        {/* Mobile: Horizontal Carousel Track (sm:hidden) */}
        <div className="sm:hidden w-full flex flex-col shrink-0" ref={mobileTrackContainer}>
          <div className="flex items-center justify-between px-1 mb-1.5 text-[11px] font-mono text-[var(--text-muted)]">
            <span>Swipe or use arrows</span>
            <div className="flex items-center gap-1">
              <button
                onClick={stepPrev}
                className="p-1 rounded-md border text-xs cursor-pointer"
                style={{ borderColor: 'var(--border-color)', background: 'var(--card-bg)', color: 'var(--text-primary)' }}
                aria-label="Previous skill category"
              >
                ←
              </button>
              <button
                onClick={stepNext}
                className="p-1 rounded-md border text-xs cursor-pointer"
                style={{ borderColor: 'var(--border-color)', background: 'var(--card-bg)', color: 'var(--text-primary)' }}
                aria-label="Next skill category"
              >
                →
              </button>
            </div>
          </div>
          <div className="overflow-hidden py-0.5">
            <motion.div
              ref={mobileTrackRef}
              drag="x"
              dragConstraints={{ left: -maxScroll, right: 0 }}
              dragElastic={0.15}
              onDragEnd={calculateBounds}
              style={{ x }}
              className="flex gap-2.5 w-max items-start"
            >
              {skillsData.categories.map((cat) => (
                <div
                  key={cat.name}
                  className="w-[280px] xs:w-[295px] shrink-0 p-3 rounded-xl glass-card flex flex-col gap-2"
                  style={{ borderColor: 'var(--border-color)', background: 'var(--card-bg)' }}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                      style={{
                        background: 'color-mix(in srgb, var(--accent) 12%, transparent)',
                        color: 'var(--accent)',
                        border: '1px solid color-mix(in srgb, var(--accent) 24%, transparent)',
                      }}
                      dangerouslySetInnerHTML={{ __html: cat.icon }}
                    />
                    <h3 className="font-display font-semibold text-xs leading-tight" style={{ color: 'var(--text-primary)' }}>
                      {cat.name}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {cat.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 rounded-md text-[10px] font-mono"
                        style={{
                          background: 'color-mix(in srgb, var(--bg-primary) 70%, transparent)',
                          color: 'var(--text-muted)',
                          border: '1px solid var(--border-color)',
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Desktop & Tablet: Grid of Categories (hidden sm:grid) */}
        <div className="hidden sm:grid sm:grid-cols-2 md:grid-cols-3 gap-2.5 sm:gap-3 lg:gap-3.5 shrink-0">
          {skillsData.categories.map((cat) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="p-3 sm:p-3.5 md:p-4 rounded-xl glass-card card-hover flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2.5 mb-2.5 sm:mb-3">
                  <div
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center shrink-0"
                    style={{
                      background: 'color-mix(in srgb, var(--accent) 12%, transparent)',
                      color: 'var(--accent)',
                      border: '1px solid color-mix(in srgb, var(--accent) 24%, transparent)',
                    }}
                    dangerouslySetInnerHTML={{ __html: cat.icon }}
                  />
                  <h3 className="font-display font-semibold text-xs sm:text-sm leading-snug tracking-tight" style={{ color: 'var(--text-primary)' }}>
                    {cat.name}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-1 sm:gap-1.5">
                  {cat.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg text-[10px] sm:text-[11px] font-mono transition-colors hover:border-[var(--accent)]"
                      style={{
                        background: 'color-mix(in srgb, var(--bg-primary) 70%, transparent)',
                        color: 'var(--text-muted)',
                        border: '1px solid var(--border-color)',
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Extra Tags */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="mt-2.5 sm:mt-3.5 text-center shrink-0"
        >
          <p className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.18em] mb-1.5 sm:mb-2" style={{ color: 'var(--text-muted)' }}>
            Also familiar with
          </p>
          <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 max-w-4xl mx-auto">
            {skillsData.extraTags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-lg text-[11px] sm:text-xs font-mono font-medium transition-transform duration-200 hover:scale-105"
                style={{
                  background: 'var(--card-bg)',
                  color: 'var(--text-muted)',
                  border: '1px solid var(--border-color)',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Bottom Navigation Hint */}
        {onNavigate && (
          <div className="text-center mt-2 sm:mt-2.5 shrink-0">
            <button
              onClick={() => onNavigate('experience')}
              className="inline-flex items-center gap-2 text-xs font-mono transition-all duration-200 hover:gap-3 cursor-pointer py-1 px-3 rounded-xl border border-transparent hover:border-[var(--border-color)]"
              style={{ color: 'var(--accent)' }}
            >
              Next: View Work Experience →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
