import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Container } from '@/components/common/Container';
import { formatDate, formatReadingTime } from '@/utils/formatDate';
import type { Article } from '@/types';

const ease = [0.22, 1, 0.36, 1] as const;

interface FeaturedGridProps {
  articles: Article[];
}

export const FeaturedGrid = ({ articles }: FeaturedGridProps) => {
  const [lead, ...rest] = articles;
  if (!lead) return null;

  return (
    <section className="section-shell relative overflow-hidden">
      <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 select-none">
        <span className="font-display text-stroke-bone text-[28rem] leading-none tracking-[-0.05em] opacity-[0.04]">
          Issue
        </span>
      </div>

      <Container size="xl" className="relative">
        <div className="mb-20 grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="eyebrow mb-6">The Issue · Front of Book</p>
            <h2 className="font-display text-display-lg md:text-display-xl text-bone-50 text-balance leading-[0.98]">
              Six pieces of journalism <br className="hidden md:block" />
              we will <em className="font-serif italic font-normal text-gold-300">stand behind</em>.
            </h2>
          </div>
          <Link to="/spotlight" className="arrow-link self-start text-sm text-bone-50 md:self-end">
            See the full table
            <svg viewBox="0 0 24 8" fill="none" stroke="currentColor" strokeWidth="1.2">
              <path d="M0 4h22M18 1l4 3-4 3" />
            </svg>
          </Link>
        </div>

        <motion.article
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease }}
          className="group relative grid items-end gap-10 lg:grid-cols-12 lg:gap-x-16"
        >
          <Link to={`/article/${lead.slug}`} className="relative block overflow-hidden bg-ink-800 lg:col-span-8">
            <div className="relative aspect-[16/10] w-full overflow-hidden">
              <img
                src={lead.cover}
                alt={lead.title}
                className="h-full w-full object-cover transition-transform duration-[1600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-ink-950/40 via-transparent to-transparent" />

              <div className="absolute left-6 top-6 flex items-center gap-3 text-bone-50">
                <span className="font-display text-5xl text-gold-300/90">01</span>
                <span className="h-px w-12 bg-bone-50/50" />
                <span className="text-[0.65rem] uppercase tracking-[0.3em]">
                  The Lead Story
                </span>
              </div>

              <div className="absolute bottom-6 right-6 hidden flex-col items-end gap-1 text-right text-[0.6rem] uppercase tracking-[0.35em] text-bone-50/75 md:flex">
                <span>Photographed for Avietho</span>
                <span className="text-gold-300">{lead.author.name}</span>
              </div>
            </div>
          </Link>

          <div className="flex flex-col gap-7 lg:col-span-4 lg:pb-6">
            <span className="text-[0.65rem] uppercase tracking-[0.3em] text-gold-300">
              {lead.categoryLabel}
            </span>
            <h3 className="font-display text-3xl md:text-[2.6rem] leading-[1.02] text-bone-50 text-balance transition-colors duration-500 group-hover:text-gold-200">
              <Link to={`/article/${lead.slug}`}>{lead.title}</Link>
            </h3>
            <p className="font-serif text-xl italic text-bone-200/85 text-pretty">
              {lead.dek}
            </p>

            <div className="hairline" />

            <div className="flex flex-wrap items-center gap-5">
              <div className="flex items-center gap-3">
                <img
                  src={lead.author.avatar}
                  alt={lead.author.name}
                  className="h-10 w-10 rounded-full object-cover ring-1 ring-bone-50/10"
                />
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-bone-50">
                    {lead.author.name}
                  </span>
                  <span className="text-[0.6rem] uppercase tracking-[0.3em] text-bone-200/55">
                    {formatDate(lead.publishedAt)} · {formatReadingTime(lead.readingTime)}
                  </span>
                </div>
              </div>
            </div>

            <Link
              to={`/article/${lead.slug}`}
              className="arrow-link self-start text-sm text-bone-50 hover:text-gold-300"
            >
              Read the feature
              <svg viewBox="0 0 24 8" fill="none" stroke="currentColor" strokeWidth="1.2">
                <path d="M0 4h22M18 1l4 3-4 3" />
              </svg>
            </Link>
          </div>
        </motion.article>

        {rest.length > 0 && (
          <>
            <div className="hairline my-20" />

            <div className="grid gap-x-10 gap-y-16 md:grid-cols-2 lg:grid-cols-4">
              {rest.map((article, index) => {
                const indexLabel = String(index + 2).padStart(2, '0');
                return (
                  <motion.article
                    key={article.id}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.8, delay: index * 0.06, ease }}
                    className="group flex flex-col gap-5"
                  >
                    <div className="flex items-center justify-between border-t border-bone-50/20 pt-5">
                      <span className="font-display text-2xl text-gold-400/70 leading-none">
                        {indexLabel}
                      </span>
                      <span className="text-[0.6rem] uppercase tracking-[0.3em] text-bone-200/55">
                        {article.categoryLabel}
                      </span>
                    </div>

                    <Link to={`/article/${article.slug}`} className="relative block overflow-hidden bg-ink-800">
                      <div className="relative aspect-[5/6] w-full overflow-hidden">
                        <img
                          src={article.cover}
                          alt={article.title}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.07]"
                        />
                      </div>
                    </Link>

                    <h3 className="font-display text-xl md:text-2xl leading-[1.12] text-bone-50 text-balance transition-colors duration-500 group-hover:text-gold-200">
                      <Link to={`/article/${article.slug}`}>{article.title}</Link>
                    </h3>

                    <p className="text-[0.65rem] uppercase tracking-[0.3em] text-bone-200/55">
                      {article.author.name} · {formatReadingTime(article.readingTime)}
                    </p>
                  </motion.article>
                );
              })}
            </div>
          </>
        )}
      </Container>
    </section>
  );
};
