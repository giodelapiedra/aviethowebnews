import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Article } from '@/types';
import { formatDate, formatReadingTime } from '@/utils/formatDate';
import { cn } from '@/utils/cn';

interface ArticleCardProps {
  article: Article;
  variant?: 'default' | 'compact' | 'portrait';
  showExcerpt?: boolean;
  className?: string;
}

export const ArticleCard = ({
  article,
  variant = 'default',
  showExcerpt = false,
  className,
}: ArticleCardProps) => {
  const compact = variant === 'compact';
  const portrait = variant === 'portrait';

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={cn('group flex flex-col gap-4', className)}
    >
      <Link
        to={`/article/${article.slug}`}
        className="relative block overflow-hidden bg-ink-800"
        aria-label={article.title}
      >
        <div
          className={cn(
            'relative w-full overflow-hidden',
            compact ? 'aspect-[4/3]' : portrait ? 'aspect-[3/4]' : 'aspect-[16/10]',
          )}
        >
          <img
            src={article.cover}
            alt={article.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-ink-950/10 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />

          <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4">
            <span className="text-[0.65rem] uppercase tracking-[0.3em] text-gold-300">
              {article.categoryLabel}
            </span>
            {article.breaking && (
              <span className="flex items-center gap-1.5 text-[0.65rem] uppercase tracking-[0.25em] text-crimson-100">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-crimson-300" />
                Breaking
              </span>
            )}
          </div>
        </div>
      </Link>

      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.22em] text-bone-200/60">
          <span>{formatDate(article.publishedAt)}</span>
          <span aria-hidden>·</span>
          <span>{formatReadingTime(article.readingTime)}</span>
        </div>

        <Link to={`/article/${article.slug}`} className="block">
          <h3
            className={cn(
              'font-display tracking-tight text-bone-50 text-balance transition-colors duration-300 group-hover:text-gold-200',
              compact ? 'text-xl' : portrait ? 'text-2xl' : 'text-2xl md:text-[1.75rem] leading-[1.15]',
            )}
          >
            {article.title}
          </h3>
        </Link>

        {showExcerpt && (
          <p className="font-serif text-base italic text-bone-200/75 text-pretty">
            {article.excerpt}
          </p>
        )}

        <div className="flex items-center gap-3 pt-1">
          <img
            src={article.author.avatar}
            alt={article.author.name}
            className="h-8 w-8 rounded-full object-cover ring-1 ring-bone-50/10"
            loading="lazy"
          />
          <div className="flex flex-col">
            <span className="text-xs font-medium text-bone-50">
              {article.author.name}
            </span>
            <span className="text-[0.65rem] uppercase tracking-[0.2em] text-bone-200/50">
              {article.author.role}
            </span>
          </div>
        </div>
      </div>
    </motion.article>
  );
};
