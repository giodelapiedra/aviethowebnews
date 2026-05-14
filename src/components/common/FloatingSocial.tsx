import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/utils/cn';

const FB_PAGE_URL = 'https://www.facebook.com/aviethodigital';
const FB_MESSENGER_URL = 'https://m.me/aviethodigital';

const STORAGE_KEY = 'avietho.social.dismissed';
const ease = [0.22, 1, 0.36, 1] as const;

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden
    className={className}
  >
    <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 4.99 3.66 9.13 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.52 1.5-3.91 3.78-3.91 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.77l-.44 2.91h-2.33V22c4.78-.81 8.43-4.95 8.43-9.94z" />
  </svg>
);

const MessengerIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
    <path d="M12 2C6.27 2 2 6.31 2 11.7c0 2.82 1.18 5.27 3.1 6.97v3.4l2.86-1.57c.76.21 1.57.32 2.4.34h.04l.2.01h.04C12 21 12.32 21 12.65 20.97c5.27-.46 9.35-4.49 9.35-9.27C22 6.31 17.73 2 12 2zm.94 13l-2.51-2.68-4.93 2.68 5.42-5.74L13.5 11.9l4.9-2.68L12.94 15z" />
  </svg>
);

const CloseIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden className={className}>
    <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
  </svg>
);

export const FloatingSocial = () => {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    const stored = typeof window === 'undefined' ? null : window.localStorage.getItem(STORAGE_KEY);
    setDismissed(stored === '1');
    const timer = window.setTimeout(() => setVisible(true), 1400);
    return () => window.clearTimeout(timer);
  }, []);

  const onDismiss = () => {
    setDismissed(true);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, '1');
    }
  };

  if (dismissed) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.aside
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 40 }}
          transition={{ duration: 0.8, ease }}
          onMouseEnter={() => setExpanded(true)}
          onMouseLeave={() => setExpanded(false)}
          onFocus={() => setExpanded(true)}
          onBlur={() => setExpanded(false)}
          aria-label="Follow Avietho on Facebook"
          className="fixed right-3 bottom-5 z-40 flex flex-col items-end gap-2 sm:right-4 sm:bottom-8"
        >
          <button
            type="button"
            onClick={onDismiss}
            aria-label="Hide social panel"
            className="grid h-6 w-6 place-items-center rounded-full border border-bone-50/15 bg-ink-950/80 text-bone-200/55 backdrop-blur-md transition-colors hover:border-gold-400 hover:text-gold-300"
          >
            <CloseIcon className="h-3 w-3" />
          </button>

          <div className="flex flex-col gap-2 rounded-2xl border border-bone-50/10 bg-ink-950/85 p-2 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.8)] backdrop-blur-xl">
            <span className="px-3 pt-2 text-[0.55rem] uppercase tracking-[0.35em] text-gold-300">
              Avietho · On Facebook
            </span>

            <a
              href={FB_PAGE_URL}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-3 rounded-xl border border-transparent px-3 py-2 transition-colors hover:border-gold-400/40 hover:bg-gold-400/5"
            >
              <span className="grid h-10 w-10 place-items-center rounded-full bg-[#1877F2] text-bone-50 transition-transform duration-500 group-hover:scale-[1.06]">
                <FacebookIcon className="h-5 w-5" />
              </span>
              <span
                className={cn(
                  'flex flex-col overflow-hidden transition-all duration-500',
                  expanded ? 'max-w-[12rem] opacity-100' : 'max-w-0 opacity-0 sm:max-w-[12rem] sm:opacity-100',
                )}
                style={{ minWidth: 0 }}
              >
                <span className="text-[0.65rem] uppercase tracking-[0.28em] text-bone-200/55">
                  Follow
                </span>
                <span className="font-display text-base text-bone-50 leading-tight whitespace-nowrap">
                  @aviethodigital
                </span>
              </span>
            </a>

            <a
              href={FB_MESSENGER_URL}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-3 rounded-xl border border-transparent px-3 py-2 transition-colors hover:border-gold-400/40 hover:bg-gold-400/5"
            >
              <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-[#00B2FF] via-[#006AFF] to-[#FF006A] text-bone-50 transition-transform duration-500 group-hover:scale-[1.06]">
                <MessengerIcon className="h-5 w-5" />
              </span>
              <span
                className={cn(
                  'flex flex-col overflow-hidden transition-all duration-500',
                  expanded ? 'max-w-[12rem] opacity-100' : 'max-w-0 opacity-0 sm:max-w-[12rem] sm:opacity-100',
                )}
                style={{ minWidth: 0 }}
              >
                <span className="text-[0.65rem] uppercase tracking-[0.28em] text-bone-200/55">
                  Message
                </span>
                <span className="font-display text-base text-bone-50 leading-tight whitespace-nowrap">
                  Send a note
                </span>
              </span>
            </a>

            <p
              className={cn(
                'px-3 pb-2 text-[0.6rem] italic font-serif text-bone-200/60 transition-opacity duration-500',
                expanded ? 'opacity-100' : 'opacity-0 sm:opacity-100',
              )}
            >
              Please follow or message us — we read everything.
            </p>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
};
