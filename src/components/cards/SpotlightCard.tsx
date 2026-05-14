import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Article } from '@/types';
import { cn } from '@/utils/cn';

interface SpotlightCardProps {
  article: Article;
  index: number;
  className?: string;
}

export const SpotlightCard = ({ article, index, className }: SpotlightCardProps) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: index * 0.05 }}
      className={cn('group relative isolate flex flex-col overflow-hidden bg-ink-800', className)}
    >
      <Link to={`/article/${article.slug}`} className="absolute inset-0 z-10" aria-label={article.title} />

      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={article.cover}
          alt=""
          className="h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.08]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-transparent" />
      </div>

      <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-8">
        <div className="flex items-start justify-between">
          <span className="eyebrow">{article.categoryLabel}</span>
          <span className="font-display text-2xl text-gold-300/70">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="font-display text-2xl md:text-[1.75rem] text-bone-50 text-balance leading-[1.1] transition-colors duration-500 group-hover:text-gold-200">
            {article.title}
          </h3>
          <p className="font-serif italic text-bone-200/80 line-clamp-2">
            {article.excerpt}
          </p>
          <div className="flex items-center gap-3 pt-2">
            <span className="h-px w-8 bg-gold-400/70" />
            <span className="text-[0.7rem] uppercase tracking-[0.25em] text-bone-50/90">
              {article.author.name}
            </span>
          </div>
        </div>
      </div>
    </motion.article>
  );
};
