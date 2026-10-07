// Sound Service: Web Audio API mechanical brass compass ratchet synthesizer
// Lightweight, zero network downloads, pure synthetic audio

let isSoundEnabled = true;
let audioCtx = null;
let lastClickTime = 0;
const listeners = new Set();

if (typeof window !== 'undefined') {
  try {
    if (localStorage.getItem('soundVersion') !== '2') {
      localStorage.setItem('soundVersion', '2');
      localStorage.setItem('soundEnabled', 'true');
      isSoundEnabled = true;
    } else {
      const saved = localStorage.getItem('soundEnabled');
      isSoundEnabled = saved !== 'false';
    }
  } catch {
    isSoundEnabled = true;
  }

  // Global delegation for instant mechanical ratchet click feedback on any interactive element
  document.addEventListener(
    'click',
    (e) => {
      if (!isSoundEnabled) return;
      const target = e.target;
      if (target && target.closest('button, a, [role="button"], input[type="submit"], input[type="checkbox"], [data-clickable="true"]')) {
        soundService.playClickSound();
      }
    },
    { capture: true, passive: true }
  );

  // Resume Web Audio context immediately on first user gesture only when sound is enabled
  const unlockAudio = () => {
    if (!isSoundEnabled) return;
    getContext();
    window.removeEventListener('click', unlockAudio);
    window.removeEventListener('keydown', unlockAudio);
    window.removeEventListener('touchstart', unlockAudio);
  };
  window.addEventListener('click', unlockAudio, { passive: true });
  window.addEventListener('keydown', unlockAudio, { passive: true });
  window.addEventListener('touchstart', unlockAudio, { passive: true });
}

function getContext() {
  if (!audioCtx && typeof window !== 'undefined') {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

export const soundService = {
  isEnabled() {
    return isSoundEnabled;
  },

  subscribe(listener) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },

  toggleSound() {
    isSoundEnabled = !isSoundEnabled;
    try {
      localStorage.setItem('soundEnabled', String(isSoundEnabled));
    } catch {}
    listeners.forEach((fn) => fn(isSoundEnabled));
    if (isSoundEnabled) {
      getContext();
      soundService.playCompassClickSound();
    }
    return isSoundEnabled;
  },

  setSoundEnabled(enabled) {
    isSoundEnabled = Boolean(enabled);
    try {
      localStorage.setItem('soundEnabled', String(isSoundEnabled));
    } catch {}
    listeners.forEach((fn) => fn(isSoundEnabled));
  },

  /** Authentic mechanical brass compass dial notch click sound */
  playCompassClickSound() {
    if (!isSoundEnabled) return;

    // Throttle to 35ms to eliminate double-firing from synthetic + delegated clicks
    const nowMs = typeof performance !== 'undefined' ? performance.now() : Date.now();
    if (nowMs - lastClickTime < 35) return;
    lastClickTime = nowMs;

    const ctx = getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;

      // Primary metallic detent click (gear tooth impact)
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'triangle';
      osc1.frequency.setValueAtTime(2400, now);
      osc1.frequency.exponentialRampToValueAtTime(1100, now + 0.012);

      gain1.gain.setValueAtTime(0.08, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.012);

      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.012);

      // High-frequency brass resonance ring (authentic compass dial sheen)
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(3600, now);
      osc2.frequency.exponentialRampToValueAtTime(2200, now + 0.008);

      gain2.gain.setValueAtTime(0.03, now);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.008);

      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(now);
      osc2.stop(now + 0.008);
    } catch {
      // Ignore audio errors
    }
  },

  playClickSound() {
    soundService.playCompassClickSound();
  },
};
