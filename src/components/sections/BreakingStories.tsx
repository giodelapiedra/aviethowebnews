import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Container } from '@/components/common/Container';
import { Marquee } from '@/components/common/Marquee';
import { formatDate } from '@/utils/formatDate';
import type { Article } from '@/types';

interface BreakingStoriesProps {
  ticker: Article[];
  trio: Article[];
}

export const BreakingStories = ({ ticker, trio }: BreakingStoriesProps) => {
  if (ticker.length === 0 && trio.length === 0) return null;

  return (
    <section className="relative overflow-hidden border-y border-bone-50/10 bg-ink-950">
      <div className="border-b border-bone-50/10 bg-ink-900/40 py-4">
        <div className="relative flex items-center gap-6">
          <span className="ml-6 hidden shrink-0 items-center gap-2 rounded-full border border-crimson-300/40 bg-crimson-400/10 px-3 py-1.5 text-[0.65rem] uppercase tracking-[0.3em] text-crimson-100 md:flex">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-crimson-300" />
            The Wire · Live
          </span>

          <Marquee className="flex-1" speed="slow">
            {ticker.map((article) => (
              <Link
                key={article.id}
                to={`/article/${article.slug}`}
                className="group inline-flex items-center gap-4 whitespace-nowrap text-sm text-bone-100/85 hover:text-gold-300 transition-colors"
              >
                <span className="text-[0.65rem] uppercase tracking-[0.3em] text-gold-400">
                  {article.categoryLabel}
                </span>
                <span className="font-serif italic">{article.title}</span>
                <span className="text-bone-200/40">·</span>
                <span className="text-[0.7rem] uppercase tracking-[0.25em] text-bone-200/55">
                  {formatDate(article.publishedAt)}
                </span>
                <span className="text-gold-400/40">◆</span>
              </Link>
            ))}
          </Marquee>
        </div>
      </div>

      {trio.length > 0 && (
        <Container size="xl" className="py-20 lg:py-28">
          <div className="mb-16 grid items-end gap-8 md:grid-cols-[1fr_auto]">
            <div>
              <p className="eyebrow mb-5">The Trio · Right Now</p>
              <h2 className="font-display text-display-md md:text-display-lg text-bone-50 text-balance leading-[1.02]">
                The three stories <em className="font-serif italic font-normal text-gold-300">moving the room</em> this week.
              </h2>
            </div>
            <p className="hidden max-w-xs font-serif text-base italic text-bone-200/65 md:block">
              Chosen by the desk on Tuesday morning. Rotated when the news outpaces us.
            </p>
          </div>

          <div className="grid gap-px overflow-hidden bg-bone-50/10 md:grid-cols-3">
            {trio.map((article, index) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="group relative flex flex-col bg-ink-950"
              >
                <Link to={`/article/${article.slug}`} className="flex flex-col gap-6 p-8 md:p-10">
                  <div className="flex items-center justify-between">
                    <span className="font-display text-3xl text-gold-400/80">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="text-[0.6rem] uppercase tracking-[0.3em] text-bone-200/45">
                      {formatDate(article.publishedAt)}
                    </span>
                  </div>

                  <div className="relative aspect-[5/4] overflow-hidden bg-ink-800">
                    <img
                      src={article.cover}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-950/30 to-transparent" />
                  </div>

                  <div className="flex flex-col gap-3">
                    <span className="text-[0.65rem] uppercase tracking-[0.3em] text-gold-300">
                      {article.categoryLabel}
                    </span>
                    <h3 className="font-display text-2xl md:text-[1.7rem] leading-[1.1] text-bone-50 text-balance transition-colors duration-500 group-hover:text-gold-200">
                      {article.title}
                    </h3>
                    <p className="font-serif italic text-bone-200/70 text-pretty line-clamp-2">
                      {article.dek}
                    </p>
                  </div>

                  <div className="mt-auto flex items-center justify-between border-t border-bone-50/10 pt-5">
                    <span className="text-[0.65rem] uppercase tracking-[0.3em] text-bone-200/55">
                      {article.author.name}
                    </span>
                    <span className="text-[0.7rem] uppercase tracking-[0.25em] text-gold-400 transition-transform duration-500 group-hover:translate-x-1">
                      Read →
                    </span>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </Container>
      )}
    </section>
  );
};
