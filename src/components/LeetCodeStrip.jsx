import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { leetcodeData } from '../data/leetcode.js';

const LEVELS = [
  { key: 'Easy', color: '#22c55e' },
  { key: 'Medium', color: '#f59e0b' },
  { key: 'Hard', color: '#ef4444' },
];

// Problems solved by difficulty: one stacked bar showing the Easy / Medium / Hard mix.
export default function LeetCodeStrip() {
  const [stats, setStats] = useState(leetcodeData.snapshot);

  useEffect(() => {
    const ctrl = new AbortController();
    fetch(leetcodeData.liveUrl, { signal: ctrl.signal, cache: 'no-cache' })
      .then((r) => (r.ok ? r.json() : null))
      .then((live) => {
        if (live?.solved && LEVELS.every((l) => Number.isFinite(live.solved[l.key]))) setStats(live);
      })
      .catch(() => {}); // offline or blocked: keep the snapshot
    return () => ctrl.abort();
  }, []);

  const { solved, neetcode } = stats;
  const sum = LEVELS.reduce((n, l) => n + solved[l.key], 0) || 1;

  return (
    <motion.a
      href={leetcodeData.profileUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="mt-2.5 sm:mt-3 shrink-0 w-full max-w-4xl mx-auto px-3 py-2 sm:px-4 rounded-xl glass-card card-hover flex flex-wrap items-center gap-x-4 gap-y-1.5 font-mono"
      aria-label={`LeetCode: ${solved.All} problems solved. Easy ${solved.Easy}, Medium ${solved.Medium}, Hard ${solved.Hard}`}
    >
      <span className="flex items-baseline gap-2 shrink-0">
        <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.18em]" style={{ color: 'var(--accent)' }}>
          LeetCode
        </span>
        <span className="text-base sm:text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
          {solved.All}
        </span>
        <span className="text-[10px] sm:text-[11px]" style={{ color: 'var(--text-muted)' }}>
          solved
        </span>
      </span>

      <span className="flex-1 min-w-[140px] flex h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--border-color)' }} aria-hidden="true">
        {LEVELS.map((l) => (
          <span key={l.key} style={{ width: `${(100 * solved[l.key]) / sum}%`, background: l.color }} />
        ))}
      </span>

      <span className="flex items-center gap-3 text-[10px] sm:text-[11px] shrink-0" style={{ color: 'var(--text-muted)' }}>
        {LEVELS.map((l) => (
          <span key={l.key} className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: l.color }} />
            {l.key} <b style={{ color: 'var(--text-primary)' }}>{solved[l.key]}</b>
          </span>
        ))}
        {neetcode &&
          Object.entries(neetcode).map(([name, n]) => (
            <span key={name} className="hidden md:inline">
              {name} <b style={{ color: 'var(--text-primary)' }}>{n.solved}/{n.total}</b>
            </span>
          ))}
        <span style={{ color: 'var(--accent)' }}>↗</span>
      </span>
    </motion.a>
  );
}
