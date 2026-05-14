import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Logo } from '@/components/common/Logo';
import { Container } from '@/components/common/Container';
import { PRIMARY_NAV } from '@/data/navigation';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import { useLockBody } from '@/hooks/useLockBody';
import { cn } from '@/utils/cn';

const formatDateLong = () =>
  new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { atTop } = useScrollPosition();
  const location = useLocation();

  useLockBody(open);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-500',
        atTop
          ? 'bg-transparent border-b border-transparent'
          : 'bg-ink-950/85 backdrop-blur-xl border-b border-bone-50/10',
      )}
    >
      <div
        className={cn(
          'overflow-hidden border-b border-bone-50/10 transition-all duration-500',
          atTop ? 'max-h-14 opacity-100' : 'max-h-0 opacity-0',
        )}
      >
        <Container
          size="xl"
          className="flex items-center justify-between py-3 text-[0.6rem] uppercase tracking-[0.32em] text-bone-200/60"
        >
          <div className="flex items-center gap-4">
            <span className="text-gold-400">Avietho Digital</span>
            <span aria-hidden className="text-bone-200/25">·</span>
            <span>{formatDateLong()}</span>
          </div>
          <span className="hidden sm:block">
            Issue Nº 07 — <em className="font-serif italic">The Quiet Power Issue</em>
          </span>
          <span className="hidden md:block">Manila · 28°C</span>
        </Container>
      </div>

      <Container size="xl" className="flex items-center justify-between gap-6 py-5">
        <Logo />

        <nav className="hidden lg:flex items-center gap-x-6 xl:gap-x-8" aria-label="Primary">
          {PRIMARY_NAV.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  'relative text-[0.7rem] uppercase tracking-[0.22em] transition-colors duration-300 hover:text-gold-300',
                  isActive ? 'text-gold-300' : 'text-bone-50/85',
                )
              }
            >
              {({ isActive }) => (
                <span className="relative inline-flex flex-col items-center">
                  <span className="block overflow-hidden">
                    <span className="block transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-full">
                      {item.label}
                    </span>
                  </span>
                  <span
                    className={cn(
                      'absolute -bottom-2 left-1/2 h-px -translate-x-1/2 bg-gold-400 transition-all duration-500',
                      isActive ? 'w-8 opacity-100' : 'w-0 opacity-0',
                    )}
                  />
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            aria-label="Search"
            className="hidden md:grid h-10 w-10 place-items-center rounded-full border border-bone-50/15 text-bone-50/80 transition-colors hover:border-gold-400 hover:text-gold-300"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" strokeLinecap="round" />
            </svg>
          </button>

          <NavLink
            to="/contact"
            className="hidden md:inline-flex items-center gap-2.5 rounded-full border border-gold-400/60 px-5 py-2.5 text-[0.65rem] uppercase tracking-[0.22em] text-bone-50 transition-colors hover:bg-gold-400 hover:text-ink-950"
          >
            Subscribe
            <span aria-hidden>↗</span>
          </NavLink>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className="grid h-10 w-10 place-items-center rounded-full border border-bone-50/15 text-bone-50 transition-colors hover:border-gold-400 hover:text-gold-300 lg:hidden"
          >
            <span className="relative block h-2.5 w-4">
              <span
                className={cn(
                  'absolute left-0 top-0 h-px w-full bg-current transition-transform duration-300',
                  open && 'translate-y-[5px] rotate-45',
                )}
              />
              <span
                className={cn(
                  'absolute left-0 top-[5px] h-px w-full bg-current transition-transform duration-300',
                  open && '-translate-y-[5px] -rotate-45',
                )}
              />
            </span>
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 top-20 z-40 overflow-y-auto bg-ink-950/97 backdrop-blur-2xl lg:hidden"
          >
            <Container size="xl" className="flex min-h-full flex-col gap-10 py-12">
              <span className="text-[0.6rem] uppercase tracking-[0.35em] text-bone-200/45">
                The Index · {formatDateLong()}
              </span>

              <nav className="flex flex-col" aria-label="Mobile">
                {PRIMARY_NAV.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.04 * index, duration: 0.45 }}
                    className="border-b border-bone-50/10"
                  >
                    <NavLink
                      to={item.href}
                      onClick={() => setOpen(false)}
                      className={({ isActive }) =>
                        cn(
                          'flex items-baseline justify-between py-5',
                          isActive ? 'text-gold-300' : 'text-bone-50',
                        )
                      }
                    >
                      <div className="flex items-baseline gap-4">
                        <span className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-bone-200/40">
                          0{index + 1}
                        </span>
                        <span className="font-display text-3xl md:text-4xl tracking-tight">
                          {item.label}
                        </span>
                      </div>
                      <span aria-hidden className="text-bone-200/40">→</span>
                    </NavLink>
                    {item.description && (
                      <p className="-mt-2 pb-5 pl-12 font-serif italic text-bone-200/55 text-base">
                        {item.description}
                      </p>
                    )}
                  </motion.div>
                ))}
              </nav>

              <div className="mt-auto flex flex-col gap-4">
                <p className="text-[0.6rem] uppercase tracking-[0.3em] text-bone-200/40">
                  Currently on · {location.pathname === '/' ? 'Front Page' : location.pathname}
                </p>
                <NavLink
                  to="/contact"
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center justify-between rounded-full border border-gold-400 bg-gold-400 px-6 py-4 text-xs uppercase tracking-[0.25em] text-ink-950"
                >
                  Become a subscriber
                  <span aria-hidden>↗</span>
                </NavLink>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
