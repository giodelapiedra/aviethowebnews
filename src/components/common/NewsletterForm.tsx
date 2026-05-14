import { useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './Button';
import { cn } from '@/utils/cn';

interface NewsletterFormProps {
  className?: string;
  compact?: boolean;
}

export const NewsletterForm = ({ className, compact = false }: NewsletterFormProps) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('error');
      return;
    }
    setStatus('success');
    setEmail('');
  };

  return (
    <form
      onSubmit={onSubmit}
      className={cn(
        'flex w-full flex-col gap-3 sm:flex-row sm:items-stretch',
        className,
      )}
      aria-label="Newsletter signup"
    >
      <label className="sr-only" htmlFor="newsletter-email">
        Email address
      </label>
      <input
        id="newsletter-email"
        type="email"
        autoComplete="email"
        placeholder="Your email address"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          if (status !== 'idle') setStatus('idle');
        }}
        className={cn(
          'flex-1 bg-transparent border-b border-bone-50/20 px-1 py-3 text-base text-bone-50 placeholder:text-bone-200/40 focus:border-gold-400 focus:outline-none transition-colors',
          compact && 'text-sm',
        )}
      />
      <Button as="button" type="submit" size={compact ? 'sm' : 'md'}>
        Subscribe
      </Button>

      <AnimatePresence>
        {status !== 'idle' && (
          <motion.p
            key={status}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={cn(
              'mt-1 sm:absolute sm:mt-16 text-xs uppercase tracking-[0.22em]',
              status === 'success' ? 'text-gold-300' : 'text-crimson-200',
            )}
          >
            {status === 'success'
              ? 'Welcome to the Avietho list — check your inbox.'
              : 'Please enter a valid email address.'}
          </motion.p>
        )}
      </AnimatePresence>
    </form>
  );
};
