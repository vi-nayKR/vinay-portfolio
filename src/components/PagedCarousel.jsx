import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';

// Shows `perPage` items at a time (2 from lg up, 1 below) and pages through them with
// side arrows, dots, keyboard arrows or a swipe. Each page slides in from the travel
// direction with a tilt + blur-to-sharp, cards staggered.

function usePerPage() {
  const query = '(min-width: 1024px)';
  const get = () => (typeof window !== 'undefined' && window.matchMedia(query).matches ? 2 : 1);
  const [perPage, setPerPage] = useState(get);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = () => setPerPage(mq.matches ? 2 : 1);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return perPage;
}

const pageVariants = {
  enter: { transition: { staggerChildren: 0.09 } },
  center: { transition: { staggerChildren: 0.09, delayChildren: 0.02 } },
  exit: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
};

const cardVariants = {
  enter: (dir) => ({ opacity: 0, x: dir >= 0 ? 140 : -140, rotateY: dir >= 0 ? -14 : 14, scale: 0.94, filter: 'blur(8px)' }),
  center: {
    opacity: 1,
    x: 0,
    rotateY: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: { type: 'spring', stiffness: 210, damping: 24, mass: 0.9 },
  },
  exit: (dir) => ({
    opacity: 0,
    x: dir >= 0 ? -110 : 110,
    rotateY: dir >= 0 ? 10 : -10,
    scale: 0.96,
    filter: 'blur(6px)',
    transition: { duration: 0.22, ease: 'easeIn' },
  }),
};

function Arrow({ dir, disabled, onClick, label, className = '' }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      className={`${className} group shrink-0 justify-self-center w-9 h-9 sm:w-11 sm:h-11 rounded-full border inline-flex items-center justify-center transition-all duration-200 cursor-pointer hover:scale-110 active:scale-95 disabled:opacity-25 disabled:hover:scale-100 disabled:cursor-default`}
      style={{
        borderColor: disabled ? 'var(--border-color)' : 'color-mix(in srgb, var(--accent) 45%, transparent)',
        background: 'var(--card-bg)',
        color: disabled ? 'var(--text-muted)' : 'var(--accent)',
        boxShadow: disabled ? undefined : '0 0 18px color-mix(in srgb, var(--accent) 22%, transparent)',
      }}
    >
      <svg className="w-4 h-4 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d={dir < 0 ? 'M15 19l-7-7 7-7' : 'M9 5l7 7-7 7'} />
      </svg>
    </button>
  );
}

export default function PagedCarousel({ items, renderItem, getKey, label, itemLabel = 'item' }) {
  const perPage = usePerPage();
  const pageCount = Math.max(1, Math.ceil(items.length / perPage));
  const [[page, dir], setPage] = useState([0, 0]);
  const current = Math.min(page, pageCount - 1);

  const go = useCallback(
    (step) => {
      setPage(([p]) => {
        const next = Math.min(Math.max(Math.min(p, pageCount - 1) + step, 0), pageCount - 1);
        return next === p ? [p, step] : [next, step];
      });
    },
    [pageCount]
  );
  const goTo = (i) => i !== current && setPage([i, i > current ? 1 : -1]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go]);

  const visible = items.slice(current * perPage, current * perPage + perPage);
  const pad = String(pageCount).length < 2 ? 2 : String(pageCount).length;

  return (
    // One set of arrows. Phones: card full width, arrows flank the pager row below.
    // sm+: arrows flank the cards, pager centred underneath.
    <div
      className="w-full grid grid-cols-[auto_1fr_auto] items-center gap-x-2 sm:gap-x-4 gap-y-2.5 sm:gap-y-3"
      data-carousel-total={items.length}
      data-carousel-per-page={perPage}
    >
        <Arrow
          className="row-start-2 col-start-1 sm:row-start-1"
          dir={-1}
          disabled={current === 0}
          onClick={() => go(-1)}
          label={`Previous ${itemLabel}s`}
        />

        <div
          className="relative min-w-0 py-1 row-start-1 col-span-3 sm:col-span-1 sm:col-start-2"
          style={{ perspective: '1400px' }}
        >
          <AnimatePresence mode="wait" initial={false} custom={dir}>
            <motion.div
              key={`${current}-${perPage}`}
              custom={dir}
              variants={pageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.18}
              onDragEnd={(_, info) => {
                if (info.offset.x < -70 || info.velocity.x < -450) go(1);
                else if (info.offset.x > 70 || info.velocity.x > 450) go(-1);
              }}
              className={`grid gap-4 sm:gap-5 cursor-grab active:cursor-grabbing ${perPage === 2 ? 'grid-cols-2' : 'grid-cols-1'}`}
              role="group"
              aria-roledescription="carousel page"
              aria-label={`${label}: page ${current + 1} of ${pageCount}`}
            >
              {visible.map((item, i) => (
                <motion.div
                  key={getKey(item, current * perPage + i)}
                  custom={dir}
                  variants={cardVariants}
                  whileHover={{ y: -4, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
                  className="min-w-0"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {renderItem(item, current * perPage + i)}
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <Arrow
          className="row-start-2 col-start-3 sm:row-start-1"
          dir={1}
          disabled={current === pageCount - 1}
          onClick={() => go(1)}
          label={`Next ${itemLabel}s`}
        />

      {/* Pager: dots + counter + progress */}
      <div className="row-start-2 col-start-2 flex items-center justify-center gap-3">
        <div className="flex items-center gap-1.5">
          {Array.from({ length: pageCount }, (_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Go to page ${i + 1}`}
              aria-current={i === current}
              className="h-1.5 rounded-full transition-all duration-300 cursor-pointer"
              style={{
                width: i === current ? 24 : 8,
                background: i === current ? 'var(--accent-fill, var(--accent))' : 'var(--border-color)',
              }}
            />
          ))}
        </div>
        <span className="text-[11px] font-mono tabular-nums" style={{ color: 'var(--text-muted)' }}>
          <span style={{ color: 'var(--accent)' }}>{String(current + 1).padStart(pad, '0')}</span> / {String(pageCount).padStart(pad, '0')}
        </span>
        <div className="hidden sm:block w-24 h-0.5 rounded-full overflow-hidden" style={{ background: 'var(--border-color)' }}>
          <motion.div
            className="h-full rounded-full"
            style={{ background: 'var(--accent-fill, var(--accent))' }}
            animate={{ width: `${((current + 1) / pageCount) * 100}%` }}
            transition={{ type: 'spring', stiffness: 200, damping: 26 }}
          />
        </div>
      </div>
    </div>
  );
}
