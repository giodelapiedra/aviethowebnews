import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';

interface MarqueeProps {
  children: ReactNode;
  className?: string;
  reverse?: boolean;
  speed?: 'slow' | 'normal' | 'fast';
}

const speeds = {
  slow: 'marquee-slow',
  normal: 'marquee-normal',
  fast: 'marquee-fast',
} as const;

export const Marquee = ({
  children,
  className,
  reverse = false,
  speed = 'normal',
}: MarqueeProps) => {
  const speedClass = speeds[speed];
  const dir = reverse ? 'marquee-reverse' : '';

  return (
    <div className={cn('marquee group/marquee', className)}>
      <div className={cn('marquee-track', speedClass, dir)}>
        <div className="marquee-row">{children}</div>
        <div className="marquee-row" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
};
