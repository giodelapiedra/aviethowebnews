import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Article } from '@/types';
import { formatReadingTime } from '@/utils/formatDate';
import { cn } from '@/utils/cn';

interface TrendingCardProps {
  article: Article;
  index: number;
  className?: string;
}

export const TrendingCard = ({ article, index, className }: TrendingCardProps) => {
  return (
    <motion.article
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: index * 0.05 }}
      className={cn('group flex items-start gap-6 py-6 border-b border-bone-50/5', className)}
    >
      <span className="font-display text-3xl text-gold-400/60 leading-none min-w-[3rem]">
        {String(index + 1).padStart(2, '0')}
      </span>
      <div className="flex flex-col gap-2 flex-1">
        <span className="text-[0.65rem] uppercase tracking-[0.28em] text-gold-300">
          {article.categoryLabel}
        </span>
        <Link to={`/article/${article.slug}`}>
          <h4 className="font-display text-lg md:text-xl text-bone-50 text-balance transition-colors duration-300 group-hover:text-gold-200">
            {article.title}
          </h4>
        </Link>
        <p className="text-xs text-bone-200/60 uppercase tracking-[0.2em]">
          {article.author.name} · {formatReadingTime(article.readingTime)}
        </p>
      </div>
    </motion.article>
  );
};
