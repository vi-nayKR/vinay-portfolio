import { useRef, useState, useEffect, useCallback } from 'react';
import { useMotionValue, animate } from 'motion/react';

export function useBoundedCarousel({ itemCount, stepDistance = 400 } = {}) {
  const x = useMotionValue(0);
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const [maxScroll, setMaxScroll] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const calculateBounds = useCallback(() => {
    if (containerRef.current && trackRef.current) {
      const containerWidth = containerRef.current.clientWidth;
      const trackWidth = trackRef.current.scrollWidth;
      const max = Math.max(0, trackWidth - containerWidth);
      setMaxScroll(max);

      const curX = x.get();
      if (curX < -max) {
        x.set(-max);
      } else if (curX > 0) {
        x.set(0);
      }

      const updatedX = x.get();
      setCanScrollLeft(updatedX < -5);
      setCanScrollRight(updatedX > -max + 5);
    }
  }, [x]);

  useEffect(() => {
    calculateBounds();
    // Re-check after images/fonts might have rendered
    const timer = setTimeout(calculateBounds, 150);
    window.addEventListener('resize', calculateBounds);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', calculateBounds);
    };
  }, [calculateBounds, itemCount]);

  const getStep = useCallback(() => {
    if (trackRef.current?.firstElementChild) {
      const firstChild = trackRef.current.firstElementChild;
      const style = window.getComputedStyle(trackRef.current);
      const gap = parseFloat(style.columnGap || style.gap) || 16;
      return firstChild.offsetWidth + gap;
    }
    return stepDistance || 400;
  }, [stepDistance]);

  const stepNext = useCallback(() => {
    calculateBounds();
    const curX = x.get();
    const step = getStep();
    if (curX <= -maxScroll + 15) {
      // Loop back to start if at the end
      animate(x, 0, { duration: 0.4, ease: [0.16, 1, 0.3, 1] });
    } else {
      const target = Math.max(-maxScroll, curX - step);
      animate(x, target, { duration: 0.35, ease: [0.16, 1, 0.3, 1] });
    }
  }, [x, maxScroll, getStep, calculateBounds]);

  const stepPrev = useCallback(() => {
    calculateBounds();
    const curX = x.get();
    const step = getStep();
    if (curX >= -15) {
      // Loop to end if at the start
      animate(x, -maxScroll, { duration: 0.4, ease: [0.16, 1, 0.3, 1] });
    } else {
      const target = Math.min(0, curX + step);
      animate(x, target, { duration: 0.35, ease: [0.16, 1, 0.3, 1] });
    }
  }, [x, maxScroll, getStep, calculateBounds]);

  return {
    x,
    containerRef,
    trackRef,
    maxScroll,
    stepPrev,
    stepNext,
    canScrollLeft,
    canScrollRight,
    calculateBounds,
  };
}
