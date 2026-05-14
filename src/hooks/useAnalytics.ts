import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const GA_ID = import.meta.env.VITE_GA_ID ?? 'G-Y7PB4CJ73D';

const isDev = import.meta.env.DEV;

const send = (params: Record<string, unknown>): void => {
  if (!GA_ID) return;
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  window.gtag('event', 'page_view', { send_to: GA_ID, ...params });
};

export const useAnalytics = (): void => {
  const location = useLocation();
  const sentInitial = useRef(false);

  useEffect(() => {
    const url = location.pathname + location.search + location.hash;
    const payload = {
      page_path: location.pathname + location.search,
      page_title: document.title,
      page_location: window.location.href,
    };

    if (isDev) {
      // eslint-disable-next-line no-console
      console.debug('[analytics] page_view', url);
    }

    if (!sentInitial.current) {
      sentInitial.current = true;
      send(payload);
      return;
    }

    const id = window.setTimeout(() => send(payload), 50);
    return () => window.clearTimeout(id);
  }, [location]);
};

export const trackEvent = (
  name: string,
  params: Record<string, unknown> = {},
): void => {
  if (!GA_ID) return;
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  window.gtag('event', name, { send_to: GA_ID, ...params });
};
