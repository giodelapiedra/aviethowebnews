import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';

type Tone = 'gold' | 'crimson' | 'bone' | 'ink';

interface BadgeProps {
  tone?: Tone;
  children: ReactNode;
  className?: string;
}

const tones: Record<Tone, string> = {
  gold: 'text-gold-300 border-gold-400/40 bg-gold-400/5',
  crimson: 'text-crimson-100 border-crimson-300/40 bg-crimson-400/10',
  bone: 'text-bone-50 border-bone-50/20 bg-bone-50/5',
  ink: 'text-ink-950 border-ink-950/20 bg-bone-50',
};

export const Badge = ({ tone = 'gold', children, className }: BadgeProps) => (
  <span
    className={cn(
      'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[0.65rem] uppercase tracking-widest font-medium',
      tones[tone],
      className,
    )}
  >
    {children}
  </span>
);
