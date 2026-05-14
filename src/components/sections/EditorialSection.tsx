import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Container } from '@/components/common/Container';
import { EDITORIAL_SUBCATEGORIES, SECTION_META } from '@/data/sections';
import type { Article } from '@/types';
import { formatDate } from '@/utils/formatDate';

const ease = [0.22, 1, 0.36, 1] as const;

interface EditorialSectionProps {
  articles: Article[];
}

export const EditorialSection = ({ articles }: EditorialSectionProps) => {
  const meta = SECTION_META.editorial;
  if (articles.length === 0) return null;

  const [lead, ...rest] = articles;

  return (
    <section className="section-shell relative overflow-hidden bg-bone-100 text-ink-950">
      <div className="pointer-events-none absolute inset-0 bg-noise opacity-[0.07] mix-blend-multiply" />
      <div className="pointer-events-none absolute right-[-4%] top-12 select-none">
        <span className="font-serif italic text-stroke-ink text-[14rem] md:text-[20rem] leading-none opacity-[0.08]">
          Desk
        </span>
      </div>

      <Container size="xl" className="relative">
        <div className="mb-16 flex flex-wrap items-end justify-between gap-8 border-b border-ink-950/15 pb-10">
          <div className="flex flex-col gap-2">
            <span className="inline-flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.3em] text-gold-600 font-medium">
              <span className="h-px w-10 bg-gold-500" />
              {meta.kicker}
            </span>
            <p className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-ink-700/60">
              Volume VII · Folio 04
            </p>
          </div>
          <h2 className="font-display text-display-xl text-ink-950 text-balance leading-[0.95] max-w-3xl">
            The Editorial Desk — <br />
            <em className="font-serif italic font-normal text-crimson-400">opinions, at the pace of thought.</em>
          </h2>
        </div>

        <div className="grid gap-16 lg:grid-cols-[1fr_1.6fr] lg:gap-24">
          <div className="flex flex-col gap-12">
            {lead && (
              <motion.article
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease }}
                className="group"
              >
                <Link to={`/article/${lead.slug}`} className="block">
                  <div className="relative aspect-[5/6] overflow-hidden bg-ink-900">
                    <img
                      src={lead.cover}
                      alt={lead.title}
                      className="h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
                    />
                    <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-bone-100/90 px-3 py-1 text-[0.6rem] uppercase tracking-[0.3em] text-gold-600">
                      {lead.categoryLabel}
                    </div>
                  </div>
                  <h3 className="mt-6 font-display text-3xl md:text-[2.4rem] leading-[1.05] text-ink-950 text-balance transition-colors duration-500 group-hover:text-crimson-400">
                    {lead.title}
                  </h3>
                  <p className="mt-4 font-serif text-xl italic text-ink-700 text-pretty">
                    {lead.dek}
                  </p>
                </Link>
              </motion.article>
            )}

            <div className="flex items-end justify-between rounded-sm border-t border-ink-950/15 pt-8">
              <div className="flex items-end gap-4">
                <img
                  src={lead?.author.avatar}
                  alt={lead?.author.name}
                  className="h-14 w-14 rounded-full object-cover ring-1 ring-ink-950/10"
                />
                <div className="flex flex-col">
                  <span className="font-serif italic text-2xl text-ink-950">
                    — {lead?.author.name}
                  </span>
                  <span className="text-[0.65rem] uppercase tracking-[0.3em] text-ink-700/70">
                    {lead?.author.role}
                  </span>
                </div>
              </div>
              <span className="text-[0.6rem] uppercase tracking-[0.3em] text-ink-700/55">
                {lead && formatDate(lead.publishedAt)}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-10">
            <div className="grid gap-2">
              <p className="text-[0.6rem] uppercase tracking-[0.3em] text-ink-700/55">
                In this folio
              </p>
              <div className="flex flex-col">
                {EDITORIAL_SUBCATEGORIES.map((sub, i) => (
                  <Link
                    key={sub.key}
                    to={`/editorial/${sub.key}`}
                    className="group flex items-baseline justify-between gap-6 border-b border-ink-950/15 py-5 last:border-0 hover:text-crimson-400 transition-colors"
                  >
                    <span className="font-display text-3xl text-ink-950 transition-colors group-hover:text-crimson-400">
                      <span className="mr-4 font-serif italic text-base text-ink-700/55">
                        0{i + 1}
                      </span>
                      {sub.label}
                    </span>
                    <span className="hidden flex-1 leader-dots self-end mb-2 md:block" />
                    <span aria-hidden className="text-ink-950/40 transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-10 pt-6">
              {rest.map((article, index) => (
                <motion.article
                  key={article.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: index * 0.06, ease }}
                  className="group grid items-start gap-6 border-b border-ink-950/15 pb-10 last:border-0 last:pb-0 md:grid-cols-[180px_1fr]"
                >
                  <Link to={`/article/${article.slug}`} className="block overflow-hidden bg-ink-900">
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <img
                        src={article.cover}
                        alt={article.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.06]"
                      />
                    </div>
                  </Link>
                  <div className="flex flex-col gap-3">
                    <span className="text-[0.6rem] uppercase tracking-[0.3em] text-gold-600">
                      {article.categoryLabel}
                    </span>
                    <Link to={`/article/${article.slug}`}>
                      <h3 className="font-display text-2xl md:text-[1.7rem] text-ink-950 text-balance leading-[1.1] transition-colors duration-500 group-hover:text-crimson-400">
                        {article.title}
                      </h3>
                    </Link>
                    <p className="font-serif italic text-ink-700 text-lg text-pretty line-clamp-2">
                      {article.dek}
                    </p>
                    <div className="mt-2 flex items-center gap-3 text-[0.6rem] uppercase tracking-[0.3em] text-ink-700/65">
                      <span>{article.author.name}</span>
                      <span aria-hidden>·</span>
                      <span>{formatDate(article.publishedAt)}</span>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
