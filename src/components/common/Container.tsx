import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/utils/cn';

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  children: ReactNode;
}

const sizes = {
  sm: 'max-w-3xl',
  md: 'max-w-5xl',
  lg: 'max-w-7xl',
  xl: 'max-w-[1480px]',
  full: 'max-w-none',
} as const;

export const Container = ({
  size = 'lg',
  className,
  children,
  ...rest
}: ContainerProps) => (
  <div
    className={cn('mx-auto w-full px-5 sm:px-8 lg:px-12', sizes[size], className)}
    {...rest}
  >
    {children}
  </div>
);
