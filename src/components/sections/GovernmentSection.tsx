import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Container } from '@/components/common/Container';
import { GOVERNMENT_SUBCATEGORIES, SECTION_META } from '@/data/sections';
import type { Article } from '@/types';
import { formatDate, formatReadingTime } from '@/utils/formatDate';

const ease = [0.22, 1, 0.36, 1] as const;

interface GovernmentSectionProps {
  articles: Article[];
}

export const GovernmentSection = ({ articles }: GovernmentSectionProps) => {
  const meta = SECTION_META.government;
  const [lead, ...rest] = articles;
  if (!lead) return null;

  return (
    <section className="section-shell relative overflow-hidden border-y border-bone-50/10 bg-ink-900/40">
      <div className="pointer-events-none absolute right-[-8%] top-1/3 hidden select-none lg:block">
        <span className="vertical-tag font-display text-[8rem] leading-none tracking-tight text-stroke-bone opacity-[0.07]">
          Politics
        </span>
      </div>

      <Container size="xl" className="relative">
        <div className="mb-16 grid items-end gap-8 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <div className="mb-6 flex items-center gap-3 text-[0.65rem] uppercase tracking-[0.3em] text-crimson-200">
              <span className="h-px w-10 bg-crimson-300" />
              {meta.kicker}
            </div>
            <h2 className="font-display text-display-xl text-bone-50 text-balance leading-[0.95]">
              Government <br />
              <em className="font-serif italic font-normal text-crimson-100">& politics</em>.
            </h2>
          </div>
          <p className="max-w-md font-serif text-lg italic text-bone-200/80 text-pretty lg:pb-2">
            {meta.description}
          </p>
        </div>

        <div className="mb-12 flex flex-wrap items-center gap-x-8 gap-y-3 border-y border-bone-50/10 py-5">
          <span className="text-[0.6rem] uppercase tracking-[0.3em] text-bone-200/45">
            Beats
          </span>
          {GOVERNMENT_SUBCATEGORIES.map((sub) => (
            <Link
              key={sub.key}
              to={`/government/${sub.key}`}
              className="group inline-flex items-center gap-2 text-sm uppercase tracking-[0.18em] text-bone-50/80 hover:text-crimson-100 transition-colors"
            >
              {sub.label}
              <span className="text-bone-200/30 group-hover:text-crimson-300">·</span>
            </Link>
          ))}
          <Link
            to={meta.href}
            className="ml-auto text-[0.65rem] uppercase tracking-[0.3em] text-bone-50/60 hover:text-crimson-100 transition-colors"
          >
            The full beat →
          </Link>
        </div>

        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, ease }}
            className="lg:col-span-7"
          >
            <Link to={`/article/${lead.slug}`} className="group block">
              <div className="relative aspect-[16/10] overflow-hidden bg-ink-800">
                <img
                  src={lead.cover}
                  alt=""
                  className="h-full w-full object-cover grayscale-[35%] saturate-[0.85] transition-all duration-[1600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:grayscale-0 group-hover:saturate-100 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-ink-950/70 via-ink-950/20 to-transparent" />
                <div className="absolute left-6 top-6 flex items-center gap-3 text-[0.65rem] uppercase tracking-[0.3em] text-crimson-100">
                  <span className="h-1.5 w-1.5 rounded-full bg-crimson-300" />
                  {lead.categoryLabel}
                </div>
                <div className="absolute bottom-6 right-6 text-right text-[0.6rem] uppercase tracking-[0.35em] text-bone-50/60">
                  <span className="block">Filed from</span>
                  <span className="block text-bone-50/90">Manila Bureau</span>
                </div>
              </div>

              <div className="mt-8 grid items-end gap-8 md:grid-cols-[1fr_auto]">
                <div>
                  <h3 className="font-display text-3xl md:text-[2.4rem] leading-[1.05] text-bone-50 text-balance transition-colors duration-500 group-hover:text-crimson-100">
                    {lead.title}
                  </h3>
                  <p className="mt-5 max-w-2xl font-serif text-xl italic text-bone-200/80 text-pretty">
                    {lead.dek}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3 text-[0.65rem] uppercase tracking-[0.3em] text-bone-200/55">
                <span className="text-gold-300">{lead.author.name}</span>
                <span aria-hidden className="text-bone-200/25">·</span>
                <span>{formatDate(lead.publishedAt)}</span>
                <span aria-hidden className="text-bone-200/25">·</span>
                <span>{formatReadingTime(lead.readingTime)}</span>
              </div>
            </Link>
          </motion.div>

          <div className="lg:col-span-5">
            <p className="mb-6 text-[0.6rem] uppercase tracking-[0.3em] text-bone-200/45">
              Also on the desk
            </p>
            <div className="flex flex-col divide-y divide-bone-50/10 border-y border-bone-50/10">
              {rest.map((article, index) => (
                <motion.article
                  key={article.id}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: index * 0.06, ease }}
                  className="group"
                >
                  <Link to={`/article/${article.slug}`} className="grid grid-cols-[auto_1fr_auto] items-start gap-6 py-6">
                    <span className="font-display text-3xl text-crimson-200/60 leading-none">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div className="flex flex-col gap-2">
                      <span className="text-[0.6rem] uppercase tracking-[0.3em] text-crimson-200">
                        {article.categoryLabel}
                      </span>
                      <h4 className="font-display text-xl leading-[1.15] text-bone-50 text-balance transition-colors duration-300 group-hover:text-crimson-100">
                        {article.title}
                      </h4>
                      <span className="text-[0.6rem] uppercase tracking-[0.3em] text-bone-200/55">
                        {article.author.name} · {formatReadingTime(article.readingTime)}
                      </span>
                    </div>
                    <div className="relative aspect-square w-20 overflow-hidden bg-ink-800">
                      <img
                        src={article.cover}
                        alt=""
                        loading="lazy"
                        className="h-full w-full object-cover grayscale-[40%] transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                      />
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
