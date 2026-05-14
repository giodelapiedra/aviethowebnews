import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Container } from '@/components/common/Container';
import { KALADKAIN_SUBCATEGORIES, SECTION_META } from '@/data/sections';
import type { Article } from '@/types';

const ease = [0.22, 1, 0.36, 1] as const;

interface KaladkainSectionProps {
  articles: Article[];
}

export const KaladkainSection = ({ articles }: KaladkainSectionProps) => {
  const meta = SECTION_META.kaladkain;
  if (articles.length === 0) return null;

  const [main, second, third, fourth] = articles;

  return (
    <section className="section-shell relative overflow-hidden">
      <div className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 select-none">
        <span className="font-serif italic text-stroke-bone text-[16rem] md:text-[24rem] leading-none opacity-[0.05]">
          Kaladkain
        </span>
      </div>

      <Container size="xl" className="relative">
        <div className="mb-20 grid items-end gap-10 lg:grid-cols-[1fr_1fr]">
          <div>
            <p className="eyebrow mb-6">{meta.kicker}</p>
            <h2 className="font-display text-display-xl text-bone-50 text-balance leading-[0.95]">
              <em className="font-serif italic font-normal text-gold-300">Kaladkain</em> —<br />
              the country, savored slowly.
            </h2>
          </div>
          <div className="flex flex-col gap-6">
            <p className="font-serif text-xl italic text-bone-200/80 text-pretty">
              {meta.description}
            </p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              {KALADKAIN_SUBCATEGORIES.map((sub) => (
                <Link
                  key={sub.key}
                  to={`/kaladkain/${sub.key}`}
                  className="group inline-flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-bone-50/80 hover:text-gold-300 transition-colors"
                >
                  <span className="h-px w-6 bg-gold-400/60 group-hover:w-10 transition-all duration-500" />
                  {sub.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="grid auto-rows-fr gap-px overflow-hidden bg-bone-50/10 md:grid-cols-12 md:grid-rows-[1fr_1fr]">
          {main && (
            <motion.article
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 1, ease }}
              className="group relative overflow-hidden bg-ink-950 md:col-span-7 md:row-span-2"
            >
              <Link to={`/article/${main.slug}`} className="block h-full">
                <div className="relative h-full min-h-[420px] overflow-hidden md:min-h-[640px]">
                  <img
                    src={main.cover}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-[1800ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/30 to-transparent" />
                </div>
                <div className="absolute inset-0 flex flex-col justify-between p-8 md:p-12">
                  <div className="flex items-start justify-between">
                    <span className="text-[0.65rem] uppercase tracking-[0.3em] text-gold-300">
                      {main.categoryLabel}
                    </span>
                    <span className="font-serif italic text-bone-50/70 text-lg">— No. 01</span>
                  </div>
                  <div className="flex flex-col gap-5 max-w-2xl">
                    <h3 className="font-display text-3xl md:text-[3rem] leading-[1.02] text-bone-50 text-balance transition-colors duration-500 group-hover:text-gold-200">
                      {main.title}
                    </h3>
                    <p className="font-serif text-xl italic text-bone-200/80 text-pretty line-clamp-2 max-w-xl">
                      {main.dek}
                    </p>
                    <div className="flex items-center gap-3 pt-2">
                      <span className="h-px w-12 bg-gold-400" />
                      <span className="text-[0.65rem] uppercase tracking-[0.3em] text-bone-50">
                        By {main.author.name}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.article>
          )}

          {[second, third, fourth].filter(Boolean).map((article, index) => {
            if (!article) return null;
            return (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 + index * 0.06, ease }}
                className="group relative overflow-hidden bg-ink-950 md:col-span-5"
              >
                <Link to={`/article/${article.slug}`} className="block h-full">
                  <div className="relative h-full min-h-[280px] overflow-hidden">
                    <img
                      src={article.cover}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-[1600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.07]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-950/95 via-ink-950/30 to-transparent" />
                  </div>
                  <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-8">
                    <div className="flex items-center justify-between text-[0.6rem] uppercase tracking-[0.3em]">
                      <span className="text-gold-300">{article.categoryLabel}</span>
                      <span className="font-serif italic text-bone-50/65 text-base">
                        No. 0{index + 2}
                      </span>
                    </div>
                    <h4 className="font-display text-xl md:text-2xl leading-[1.12] text-bone-50 text-balance transition-colors duration-500 group-hover:text-gold-200">
                      {article.title}
                    </h4>
                  </div>
                </Link>
              </motion.article>
            );
          })}
        </div>
      </Container>
    </section>
  );
};
