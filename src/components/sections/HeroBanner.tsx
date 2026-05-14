import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Container } from '@/components/common/Container';
import { formatDate, formatReadingTime } from '@/utils/formatDate';
import type { Article } from '@/types';

const ease = [0.22, 1, 0.36, 1] as const;

interface HeroBannerProps {
  hero?: Article;
  total?: number;
}

export const HeroBanner = ({ hero, total = 0 }: HeroBannerProps) => {
  if (!hero) {
    return (
      <section className="relative -mt-[120px] flex min-h-[100svh] items-end overflow-hidden bg-ink-950 grain">
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950 via-ink-900 to-ink-950" />
        <Container size="xl" className="relative z-10 pb-20 pt-44">
          <div className="flex flex-col gap-7 max-w-3xl">
            <div className="h-3 w-40 animate-pulse bg-bone-50/10" />
            <div className="h-24 w-full animate-pulse bg-bone-50/10" />
            <div className="h-24 w-3/4 animate-pulse bg-bone-50/10" />
            <div className="h-6 w-2/3 animate-pulse bg-bone-50/10" />
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="relative -mt-[120px] min-h-[100svh] overflow-hidden bg-ink-950 text-bone-50 grain">
      <div className="absolute inset-0">
        <motion.img
          src={hero.cover}
          alt=""
          initial={{ scale: 1.15, opacity: 0.6 }}
          animate={{ scale: 1.02, opacity: 0.8 }}
          transition={{ duration: 2.4, ease }}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/30 to-ink-950/60" />
      </div>

      <div className="pointer-events-none absolute left-0 right-0 top-32 z-10 hidden md:block">
        <Container size="xl" className="flex items-start justify-between gap-6">
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease, delay: 0.2 }}
            className="flex flex-col gap-2"
          >
            <span className="flex items-center gap-3 text-[0.6rem] uppercase tracking-[0.35em] text-gold-300">
              <span className="h-px w-12 bg-gold-400" />
              The Avietho Cover
            </span>
            <span className="font-display text-2xl text-bone-50 tracking-tight leading-none">
              Volume <em className="font-serif italic font-normal text-gold-200">VII</em>
            </span>
            <span className="text-[0.6rem] uppercase tracking-[0.32em] text-bone-200/55">
              The Quiet Power Issue
            </span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease, delay: 0.25 }}
            className="flex flex-col items-end gap-2 text-[0.6rem] uppercase tracking-[0.32em] text-bone-200/55"
          >
            <span className="text-gold-300">The Cover</span>
            <span className="font-display text-xl text-bone-50 tracking-tight">
              N° 001 / {String(total).padStart(3, '0')}
            </span>
            <span>{formatDate(hero.publishedAt)}</span>
          </motion.div>
        </Container>
      </div>

      <div className="pointer-events-none absolute right-6 top-1/2 z-10 hidden -translate-y-1/2 lg:flex flex-col items-center gap-4">
        <span className="vertical-tag text-[0.65rem] uppercase text-bone-200/55">
          On the Cover · {hero.author.name}
        </span>
        <span className="block h-24 w-px bg-bone-50/15" />
        <span className="text-[0.65rem] uppercase tracking-[0.3em] text-gold-400">
          {formatDate(hero.publishedAt)}
        </span>
      </div>

      <Container
        size="xl"
        className="relative z-10 flex min-h-[100svh] flex-col justify-end pb-20 pt-44 lg:pt-56"
      >
        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.12 } },
          }}
          className="flex flex-col gap-7 max-w-[1100px]"
        >
          <motion.div
            variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } } }}
            className="flex flex-wrap items-center gap-4"
          >
            <span className="flex items-center gap-3 text-[0.65rem] uppercase tracking-[0.3em] text-gold-300">
              <span className="h-px w-10 bg-gold-400" />
              The Cover Story
            </span>
            <span className="text-[0.65rem] uppercase tracking-[0.3em] text-bone-200/55">
              {hero.categoryLabel}
            </span>
            {hero.breaking && (
              <span className="flex items-center gap-2 rounded-full border border-crimson-300/40 bg-crimson-400/10 px-3 py-1 text-[0.6rem] uppercase tracking-[0.3em] text-crimson-100">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-crimson-300" />
                Breaking
              </span>
            )}
          </motion.div>

          <motion.h1
            variants={{ hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: { duration: 1.1, ease } } }}
            className="font-display font-medium text-[clamp(2.5rem,8vw,8rem)] leading-[0.95] tracking-[-0.03em] text-bone-50 text-balance"
          >
            <Link to={`/article/${hero.slug}`} className="hover:text-gold-200 transition-colors duration-700">
              {hero.title}
            </Link>
          </motion.h1>

          <motion.p
            variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.9, ease, delay: 0.1 } } }}
            className="max-w-2xl font-serif text-xl md:text-2xl italic leading-[1.3] text-bone-100/85 text-pretty"
          >
            {hero.dek}
          </motion.p>

          <motion.div
            variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } } }}
            className="mt-6 grid gap-8 sm:grid-cols-[auto_1fr_auto] sm:items-center"
          >
            <div className="flex items-center gap-4">
              <img
                src={hero.author.avatar}
                alt={hero.author.name}
                className="h-12 w-12 rounded-full object-cover ring-1 ring-bone-50/15"
              />
              <div className="flex flex-col">
                <span className="text-sm text-bone-50">Words by {hero.author.name}</span>
                <span className="text-[0.65rem] uppercase tracking-[0.3em] text-bone-200/55">
                  {hero.author.role}
                </span>
              </div>
            </div>

            <div className="hidden h-px bg-bone-50/15 sm:block" />

            <div className="flex items-center gap-3 text-[0.65rem] uppercase tracking-[0.3em] text-bone-200/70">
              <span>{formatDate(hero.publishedAt)}</span>
              <span aria-hidden className="text-bone-200/30">·</span>
              <span>{formatReadingTime(hero.readingTime)}</span>
            </div>
          </motion.div>

          <motion.div
            variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } } }}
            className="mt-6 flex flex-wrap items-center gap-x-10 gap-y-4"
          >
            <Link
              to={`/article/${hero.slug}`}
              className="arrow-link text-sm text-bone-50 hover:text-gold-300 transition-colors"
            >
              Read the cover story
              <svg viewBox="0 0 24 8" fill="none" stroke="currentColor" strokeWidth="1.2">
                <path d="M0 4h22M18 1l4 3-4 3" />
              </svg>
            </Link>
            <Link
              to="/spotlight"
              className="arrow-link text-sm text-bone-200/70 hover:text-bone-50 transition-colors"
            >
              Explore Spotlight
              <svg viewBox="0 0 24 8" fill="none" stroke="currentColor" strokeWidth="1.2">
                <path d="M0 4h22M18 1l4 3-4 3" />
              </svg>
            </Link>
          </motion.div>
        </motion.div>
      </Container>

      <div className="pointer-events-none absolute bottom-8 left-6 z-10 hidden flex-col items-start gap-3 text-[0.6rem] uppercase tracking-[0.4em] text-bone-200/50 lg:flex">
        <span>Scroll · The Issue</span>
        <span className="block h-14 w-px bg-gradient-to-b from-gold-400/80 to-transparent" />
      </div>

      <div className="pointer-events-none absolute bottom-8 right-6 z-10 hidden text-[0.6rem] uppercase tracking-[0.35em] text-bone-200/50 lg:block">
        <span className="block">Photographed in 35mm</span>
        <span className="block text-bone-50/80">Manila · {formatDate(hero.publishedAt)}</span>
      </div>
    </section>
  );
};
