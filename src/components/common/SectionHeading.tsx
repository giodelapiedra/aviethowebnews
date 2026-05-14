import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { cn } from '@/utils/cn';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  cta?: { label: string; to: string };
  className?: string;
}

export const SectionHeading = ({
  eyebrow,
  title,
  description,
  align = 'left',
  cta,
  className,
}: SectionHeadingProps) => {
  return (
    <div
      className={cn(
        'flex flex-col gap-6',
        align === 'center'
          ? 'items-center text-center'
          : 'items-start text-left md:flex-row md:items-end md:justify-between',
        className,
      )}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          'max-w-3xl',
          align === 'center' && 'mx-auto',
        )}
      >
        {eyebrow && <p className="eyebrow mb-5">{eyebrow}</p>}
        <h2 className="font-display text-display-lg text-bone-50 text-balance">
          {title}
        </h2>
        {description && (
          <p className="mt-5 max-w-xl font-serif text-lg italic text-bone-200/80 text-pretty">
            {description}
          </p>
        )}
      </motion.div>
      {cta && (
        <Link
          to={cta.to}
          className="editorial-link self-start text-sm uppercase tracking-[0.22em] md:self-end"
        >
          {cta.label}
        </Link>
      )}
    </div>
  );
};
