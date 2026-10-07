import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { resumeData } from '../data/resume.js';

const pageVariants = {
  enter: (dir) => ({ x: dir > 0 ? '55%' : '-55%', rotateY: dir > 0 ? -18 : 18, opacity: 0, scale: 0.96 }),
  center: { x: 0, rotateY: 0, opacity: 1, scale: 1 },
  exit: (dir) => ({ x: dir > 0 ? '-55%' : '55%', rotateY: dir > 0 ? 18 : -18, opacity: 0, scale: 0.96 }),
};

const icons = {
  download: 'M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4',
  view: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z',
  docx: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
  print: 'M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4H7v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z',
  prev: 'M15 19l-7-7 7-7',
  next: 'M9 5l7 7-7 7',
};

function Icon({ d, className = 'w-4 h-4' }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
      {d.split(' M').map((seg, i) => (
        <path key={i} strokeLinecap="round" strokeLinejoin="round" d={i ? `M${seg}` : seg} />
      ))}
    </svg>
  );
}

function ActionButton({ icon, label, primary, ...props }) {
  const Tag = props.href ? 'a' : 'button';
  return (
    <Tag
      {...props}
      title={label}
      aria-label={label}
      className={`inline-flex items-center gap-1.5 h-8 px-2.5 sm:px-3 rounded-lg text-xs font-mono font-semibold transition-all duration-200 hover:scale-105 cursor-pointer ${
        primary ? 'shadow-md' : 'glass-card border'
      }`}
      style={
        primary
          ? { background: 'var(--accent-fill, var(--accent))', color: '#fff' }
          : { borderColor: 'var(--border-color)', color: 'var(--text-primary)' }
      }
    >
      <Icon d={icons[icon]} className="w-3.5 h-3.5 shrink-0" />
      <span className="hidden sm:inline">{label}</span>
    </Tag>
  );
}

export default function ResumeSection({ onNavigate }) {
  const pages = resumeData.pageImages;
  const [[page, dir], setPage] = useState([0, 0]);
  const scrollRef = useRef(null);
  const printFrameRef = useRef(null);

  const paginate = (step) => {
    const next = page + step;
    if (next < 0 || next >= pages.length) return;
    setPage([next, step]);
  };
  const goTo = (i) => i !== page && setPage([i, i > page ? 1 : -1]);

  // New page starts at its top; preload the other pages so slides never flash.
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
  }, [page]);
  useEffect(() => {
    pages.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [pages]);

  const handlePrint = () => {
    const open = () => window.open(resumeData.url, '_blank');
    try {
      let frame = printFrameRef.current;
      if (!frame) {
        frame = document.createElement('iframe');
        frame.style.cssText = 'position:fixed;right:0;bottom:0;width:0;height:0;border:0;visibility:hidden';
        frame.src = resumeData.url;
        frame.onload = () => {
          try {
            frame.contentWindow.focus();
            frame.contentWindow.print();
          } catch {
            open();
          }
        };
        document.body.appendChild(frame);
        printFrameRef.current = frame;
        return;
      }
      frame.contentWindow.focus();
      frame.contentWindow.print();
    } catch {
      open();
    }
  };

  useEffect(() => () => printFrameRef.current?.remove(), []);

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') paginate(1);
    if (e.key === 'ArrowLeft') paginate(-1);
  };

  return (
    <div id="resume" className="grid-bg w-full flex-1 flex flex-col justify-start px-3 sm:px-6 md:px-8 pt-3 sm:pt-5 pb-3 sm:pb-5 min-h-0 relative select-none h-full">
      <div className="max-w-5xl mx-auto w-full flex-1 flex flex-col justify-start min-h-0">
        {/* Header + actions */}
        <div className="shrink-0 mb-2 sm:mb-3 px-1 flex flex-col items-center text-center gap-2">
          <div className="min-w-0 flex flex-col items-center">
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[10px] sm:text-xs font-mono uppercase tracking-widest mb-0.5"
              style={{ color: 'var(--accent)' }}
            >
              Resume · Updated {resumeData.updated}
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="text-xl sm:text-2xl md:text-3xl font-display font-bold tracking-tight"
              style={{ color: 'var(--text-primary)' }}
            >
              <span className="gradient-text">Resume</span>
            </motion.h2>
            <p className="hidden sm:block text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              {resumeData.headline}
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-1.5 sm:gap-2"
          >
            <ActionButton icon="download" label="Download" primary href={resumeData.url} download={resumeData.download} />
            <ActionButton icon="view" label="View" href={resumeData.url} target="_blank" rel="noopener noreferrer" />
            <ActionButton icon="docx" label="DOCX" href={resumeData.docxUrl} download />
            <ActionButton icon="print" label="Print" type="button" onClick={handlePrint} />
          </motion.div>
        </div>

        {/* Page viewer */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="glass-card rounded-2xl shadow-xl flex-1 flex flex-col min-h-0 overflow-hidden"
        >
          {/* absolute scroller: page height must not stretch the section */}
          <div className="relative flex-1 min-h-0">
          <div
            ref={scrollRef}
            tabIndex={0}
            onKeyDown={onKeyDown}
            aria-label={`Resume page ${page + 1} of ${pages.length}. Use the arrow keys to change pages.`}
            className="absolute inset-0 overflow-y-auto overflow-x-hidden outline-none px-2 sm:px-6 py-3 sm:py-5"
            style={{ perspective: '1600px' }}
          >
            <AnimatePresence initial={false} custom={dir} mode="popLayout">
              <motion.div
                key={page}
                custom={dir}
                variants={pageVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: 'spring', stiffness: 260, damping: 30 }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.25}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -80 || info.velocity.x < -500) paginate(1);
                  else if (info.offset.x > 80 || info.velocity.x > 500) paginate(-1);
                }}
                className="mx-auto w-full max-w-[780px] cursor-grab active:cursor-grabbing"
              >
                <div
                  className="bg-white rounded-md overflow-hidden"
                  style={{
                    aspectRatio: resumeData.pageAspect,
                    boxShadow: '0 18px 50px -12px rgba(0,0,0,0.55), 0 0 0 1px var(--border-color)',
                  }}
                >
                  <img
                    src={pages[page]}
                    alt={`${resumeData.title}, page ${page + 1} of ${pages.length}`}
                    draggable={false}
                    className="w-full h-full block pointer-events-none"
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          </div>

          {/* Pager */}
          <div
            className="shrink-0 flex items-center justify-center gap-3 px-3 py-2"
            style={{ borderTop: '1px solid var(--border-subtle)' }}
          >
            <button
              type="button"
              onClick={() => paginate(-1)}
              disabled={page === 0}
              aria-label="Previous page"
              className="glass-card border w-8 h-8 rounded-full inline-flex items-center justify-center transition-all duration-200 hover:scale-110 disabled:opacity-30 disabled:hover:scale-100 cursor-pointer disabled:cursor-default"
              style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
            >
              <Icon d={icons.prev} />
            </button>

            <div className="flex items-center gap-2">
              {pages.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Go to page ${i + 1}`}
                  aria-current={i === page}
                  className="h-2 rounded-full transition-all duration-300 cursor-pointer"
                  style={{
                    width: i === page ? 22 : 8,
                    background: i === page ? 'var(--accent)' : 'var(--border-color)',
                  }}
                />
              ))}
              <span className="ml-1 text-[11px] font-mono" style={{ color: 'var(--text-muted)' }}>
                Page {page + 1} / {pages.length}
              </span>
            </div>

            <button
              type="button"
              onClick={() => paginate(1)}
              disabled={page === pages.length - 1}
              aria-label="Next page"
              className="glass-card border w-8 h-8 rounded-full inline-flex items-center justify-center transition-all duration-200 hover:scale-110 disabled:opacity-30 disabled:hover:scale-100 cursor-pointer disabled:cursor-default"
              style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
            >
              <Icon d={icons.next} />
            </button>
          </div>
        </motion.div>

        {onNavigate && (
          <div className="text-center mt-1.5 sm:mt-2 shrink-0">
            <button
              onClick={() => onNavigate('contact')}
              className="inline-flex items-center gap-2 text-xs font-mono transition-all duration-200 hover:gap-3 cursor-pointer py-1 px-3 rounded-xl border border-transparent hover:border-[var(--border-color)]"
              style={{ color: 'var(--accent)' }}
            >
              Next: Get in Touch &amp; Connect →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
