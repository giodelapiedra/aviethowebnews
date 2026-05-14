import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Article } from '@/types';
import { formatDate, formatReadingTime } from '@/utils/formatDate';
import { cn } from '@/utils/cn';

interface FeatureCardProps {
  article: Article;
  className?: string;
  reverse?: boolean;
}

export const FeatureCard = ({ article, className, reverse }: FeatureCardProps) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'group grid items-center gap-10 lg:grid-cols-2 lg:gap-16',
        reverse && 'lg:[&>*:first-child]:order-2',
        className,
      )}
    >
      <Link
        to={`/article/${article.slug}`}
        className="relative block overflow-hidden bg-ink-800"
      >
        <div className="relative aspect-[5/6] w-full overflow-hidden">
          <img
            src={article.cover}
            alt={article.title}
            className="h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-ink-950/60 via-transparent to-transparent" />
          <div className="absolute left-6 top-6 flex flex-col gap-2 text-bone-50">
            <span className="text-[0.65rem] uppercase tracking-[0.3em] text-gold-300">
              {article.categoryLabel}
            </span>
          </div>
        </div>
      </Link>

      <div className="flex flex-col gap-6">
        <span className="eyebrow">Featured Story</span>
        <Link to={`/article/${article.slug}`}>
          <h3 className="font-display text-display-md md:text-display-lg text-bone-50 text-balance leading-[1.05] transition-colors duration-500 group-hover:text-gold-200">
            {article.title}
          </h3>
        </Link>
        <p className="max-w-xl font-serif text-xl italic text-bone-200/85 text-pretty">
          {article.dek}
        </p>

        <div className="hairline" />

        <div className="flex flex-wrap items-center gap-5">
          <div className="flex items-center gap-3">
            <img
              src={article.author.avatar}
              alt={article.author.name}
              className="h-10 w-10 rounded-full object-cover ring-1 ring-bone-50/10"
              loading="lazy"
            />
            <div className="flex flex-col">
              <span className="text-sm font-medium text-bone-50">
                {article.author.name}
              </span>
              <span className="text-[0.65rem] uppercase tracking-[0.22em] text-bone-200/55">
                {article.author.role}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.22em] text-bone-200/55">
            <span>{formatDate(article.publishedAt)}</span>
            <span aria-hidden>·</span>
            <span>{formatReadingTime(article.readingTime)}</span>
          </div>
        </div>

        <Link
          to={`/article/${article.slug}`}
          className="editorial-link mt-2 text-sm uppercase tracking-[0.22em] self-start"
        >
          Read the feature
        </Link>
      </div>
    </motion.article>
  );
};
