import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Container } from '@/components/common/Container';
import type { SectionMeta } from '@/data/sections';
import { cn } from '@/utils/cn';

interface Sub {
  key: string;
  label: string;
  description?: string;
}

interface SectionHeroProps {
  meta: SectionMeta;
  subcategories?: readonly Sub[];
  activeCategory?: string;
}

export const SectionHero = ({ meta, subcategories = [], activeCategory }: SectionHeroProps) => {
  const location = useLocation();

  return (
    <section className="relative -mt-[120px] flex min-h-[70svh] items-end overflow-hidden bg-ink-950 text-bone-50 grain pb-16 pt-40">
      <div className="absolute inset-0">
        <img src={meta.cover} alt="" className="h-full w-full object-cover opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-tr from-ink-950 via-ink-950/80 to-ink-950/30" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950/40 via-transparent to-ink-950" />
      </div>

      <Container size="xl" className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="flex max-w-4xl flex-col gap-6"
        >
          <p className="eyebrow">{meta.kicker}</p>
          <h1 className="font-display text-display-xl text-bone-50 text-balance">
            {meta.title}.
          </h1>
          <p className="max-w-2xl font-serif text-xl md:text-2xl italic text-bone-100/85 text-pretty">
            {meta.description}
          </p>

          {subcategories.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to={meta.href}
                className={cn(
                  'rounded-full border px-4 py-2 text-[0.65rem] uppercase tracking-[0.25em] transition-colors',
                  location.pathname === meta.href
                    ? 'border-gold-400 text-gold-200 bg-gold-400/10'
                    : 'border-bone-50/15 text-bone-50/80 hover:border-gold-400 hover:text-gold-200',
                )}
              >
                All
              </Link>
              {subcategories.map((sub) => {
                const isActive = activeCategory === sub.key;
                return (
                  <Link
                    key={sub.key}
                    to={`${meta.href}/${sub.key}`}
                    className={cn(
                      'rounded-full border px-4 py-2 text-[0.65rem] uppercase tracking-[0.25em] transition-colors',
                      isActive
                        ? 'border-gold-400 text-gold-200 bg-gold-400/10'
                        : 'border-bone-50/15 text-bone-50/80 hover:border-gold-400 hover:text-gold-200',
                    )}
                  >
                    {sub.label}
                  </Link>
                );
              })}
            </div>
          )}
        </motion.div>
      </Container>
    </section>
  );
};
