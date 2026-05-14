import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Container } from '@/components/common/Container';
import { SECTION_META } from '@/data/sections';
import type { Article } from '@/types';

const ease = [0.22, 1, 0.36, 1] as const;

interface SpotlightSectionProps {
  articles: Article[];
}

export const SpotlightSection = ({ articles }: SpotlightSectionProps) => {
  const meta = SECTION_META.spotlight;
  if (articles.length === 0) return null;

  const [hero, ...rest] = articles;

  return (
    <section className="section-shell relative overflow-hidden">
      <div className="pointer-events-none absolute -left-12 top-24 hidden select-none lg:block">
        <span className="vertical-tag font-mono text-[0.7rem] uppercase text-bone-200/40">
          Spotlight · Long Form · Volume VII
        </span>
      </div>

      <div className="pointer-events-none absolute -bottom-32 right-[-6%] select-none">
        <span className="font-display text-stroke-bone text-[18rem] md:text-[26rem] leading-none tracking-[-0.05em] opacity-[0.06]">
          Spotlight
        </span>
      </div>

      <Container size="xl" className="relative">
        <div className="mb-20 grid items-end gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="eyebrow mb-6">{meta.kicker}</p>
            <h2 className="font-display text-display-xl text-bone-50 text-balance leading-[0.95]">
              Spotlight — <br />
              <em className="font-serif italic font-normal text-gold-300">portraits that take their time.</em>
            </h2>
          </div>
          <div className="flex flex-col gap-6 lg:pb-2">
            <p className="font-serif text-xl italic text-bone-200/80 text-pretty">
              {meta.description}
            </p>
            <Link to={meta.href} className="arrow-link self-start text-sm text-bone-50">
              All of Spotlight
              <svg viewBox="0 0 24 8" fill="none" stroke="currentColor" strokeWidth="1.2">
                <path d="M0 4h22M18 1l4 3-4 3" />
              </svg>
            </Link>
          </div>
        </div>

        <div className="grid gap-px overflow-hidden bg-bone-50/10 lg:grid-cols-[1.5fr_1fr]">
          {hero && (
            <motion.article
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 1.1, ease }}
              className="group relative isolate flex flex-col bg-ink-950"
            >
              <Link to={`/article/${hero.slug}`} className="block">
                <div className="relative aspect-[5/4] overflow-hidden lg:aspect-auto lg:h-full lg:min-h-[640px]">
                  <img
                    src={hero.cover}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-[1800ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-transparent" />
                </div>

                <div className="absolute inset-0 flex flex-col justify-between p-8 md:p-12">
                  <div className="flex items-start justify-between text-bone-50">
                    <span className="text-[0.65rem] uppercase tracking-[0.3em] text-gold-300">
                      {hero.categoryLabel}
                    </span>
                    <span className="font-display text-6xl text-gold-300/80">N° 01</span>
                  </div>
                  <div className="flex flex-col gap-5 max-w-xl">
                    <h3 className="font-display text-3xl md:text-[2.4rem] leading-[1.02] text-bone-50 text-balance transition-colors duration-500 group-hover:text-gold-200">
                      {hero.title}
                    </h3>
                    <p className="font-serif text-lg italic text-bone-200/85 line-clamp-2 max-w-md">
                      {hero.dek}
                    </p>
                    <div className="flex items-center gap-3 pt-2">
                      <span className="h-px w-10 bg-gold-400" />
                      <span className="text-[0.65rem] uppercase tracking-[0.3em] text-bone-50">
                        By {hero.author.name}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.article>
          )}

          <div className="flex flex-col divide-y divide-bone-50/10 bg-ink-950">
            {rest.map((article, index) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.08, ease }}
                className="group relative flex-1"
              >
                <Link
                  to={`/article/${article.slug}`}
                  className="grid grid-cols-[100px_1fr] items-center gap-6 p-6 md:p-8 lg:grid-cols-1 lg:grid-rows-[auto_1fr] lg:gap-5"
                >
                  <div className="relative aspect-square overflow-hidden bg-ink-800 lg:aspect-[16/10]">
                    <img
                      src={article.cover}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                    />
                  </div>

                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[0.6rem] uppercase tracking-[0.3em] text-gold-300">
                        {article.categoryLabel}
                      </span>
                      <span className="font-display text-2xl text-gold-400/60">
                        N° {String(index + 2).padStart(2, '0')}
                      </span>
                    </div>
                    <h4 className="font-display text-xl md:text-2xl leading-[1.12] text-bone-50 text-balance transition-colors duration-500 group-hover:text-gold-200">
                      {article.title}
                    </h4>
                    <span className="text-[0.6rem] uppercase tracking-[0.3em] text-bone-200/55">
                      {article.author.name}
                    </span>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};
