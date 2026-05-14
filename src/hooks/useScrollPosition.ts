import { useEffect, useState } from 'react';

export interface ScrollState {
  y: number;
  direction: 'up' | 'down';
  atTop: boolean;
}

export const useScrollPosition = (threshold = 8): ScrollState => {
  const [state, setState] = useState<ScrollState>(() => ({
    y: typeof window === 'undefined' ? 0 : window.scrollY,
    direction: 'up',
    atTop: true,
  }));

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const handle = () => {
      const y = window.scrollY;
      if (Math.abs(y - lastY) < threshold) {
        ticking = false;
        return;
      }
      setState({
        y,
        direction: y > lastY ? 'down' : 'up',
        atTop: y < 4,
      });
      lastY = y;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(handle);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  return state;
};
