import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Container } from '@/components/common/Container';
import { formatReadingTime } from '@/utils/formatDate';
import type { Article } from '@/types';

const ease = [0.22, 1, 0.36, 1] as const;

interface TrendingStoriesProps {
  articles: Article[];
}

export const TrendingStories = ({ articles: trending }: TrendingStoriesProps) => {
  if (trending.length === 0) return null;
  const [feature, ...rest] = trending;

  return (
    <section className="section-shell relative overflow-hidden">
      <Container size="xl">
        <div className="mb-16 flex flex-wrap items-end justify-between gap-8 border-b border-bone-50/15 pb-10">
          <div>
            <p className="eyebrow mb-5">On The Rise · Week №19</p>
            <h2 className="font-display text-display-xl text-bone-50 text-balance leading-[0.95]">
              The pieces our readers <em className="font-serif italic font-normal text-gold-300">cannot stop sending</em>.
            </h2>
          </div>
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-bone-200/55">
            Updated · Tuesday 06:00 PHT
          </p>
        </div>

        <div className="grid gap-16 lg:grid-cols-[1fr_1.2fr] lg:gap-24">
          {feature && (
            <motion.article
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease }}
              className="group"
            >
              <Link to={`/article/${feature.slug}`} className="block">
                <div className="relative aspect-[5/6] overflow-hidden bg-ink-800">
                  <img
                    src={feature.cover}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-[1600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/30 to-transparent" />
                  <div className="absolute left-6 top-6 flex items-center gap-3 text-bone-50">
                    <span className="font-display text-7xl text-gold-300">01</span>
                    <span className="text-[0.65rem] uppercase tracking-[0.3em]">
                      Most Read
                    </span>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 p-6 md:p-8">
                    <span className="text-[0.65rem] uppercase tracking-[0.3em] text-gold-300">
                      {feature.categoryLabel}
                    </span>
                    <h3 className="font-display text-2xl md:text-[2rem] leading-[1.05] text-bone-50 text-balance transition-colors duration-500 group-hover:text-gold-200">
                      {feature.title}
                    </h3>
                  </div>
                </div>
              </Link>
            </motion.article>
          )}

          <div className="flex flex-col">
            {rest.map((article, index) => {
              const number = String(index + 2).padStart(2, '0');
              return (
                <motion.article
                  key={article.id}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: index * 0.05, ease }}
                  className="group border-b border-bone-50/15 first:border-t"
                >
                  <Link
                    to={`/article/${article.slug}`}
                    className="grid grid-cols-[auto_1fr_auto] items-center gap-6 py-6"
                  >
                    <span className="font-display text-4xl md:text-5xl text-gold-400/60 leading-none transition-colors group-hover:text-gold-300">
                      {number}
                    </span>
                    <div className="flex flex-col gap-1">
                      <span className="text-[0.6rem] uppercase tracking-[0.3em] text-gold-300">
                        {article.categoryLabel}
                      </span>
                      <h4 className="font-display text-xl md:text-2xl leading-[1.15] text-bone-50 text-balance transition-colors duration-300 group-hover:text-gold-200">
                        {article.title}
                      </h4>
                      <span className="text-[0.6rem] uppercase tracking-[0.3em] text-bone-200/55">
                        {article.author.name} · {formatReadingTime(article.readingTime)}
                      </span>
                    </div>
                    <span className="hidden text-[0.65rem] uppercase tracking-[0.3em] text-bone-200/40 transition-all duration-500 group-hover:translate-x-2 group-hover:text-gold-300 md:inline">
                      Read →
                    </span>
                  </Link>
                </motion.article>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
};
