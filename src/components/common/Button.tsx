import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/utils/cn';

export type ButtonVariant = 'primary' | 'ghost' | 'outline' | 'link';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface CommonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
}

type NativeButtonAttrs = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'children' | 'className'
>;

type ButtonProps =
  | (CommonProps & NativeButtonAttrs & { as?: 'button'; to?: never; href?: never })
  | (CommonProps & { as: 'link'; to: string; href?: never })
  | (CommonProps & { as: 'anchor'; href: string; to?: never });

const baseClass =
  'group inline-flex items-center justify-center gap-2.5 font-medium uppercase tracking-[0.2em] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950';

const sizes: Record<ButtonSize, string> = {
  sm: 'text-[0.7rem] px-4 py-2.5',
  md: 'text-xs px-6 py-3.5',
  lg: 'text-sm px-8 py-4',
};

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-bone-50 text-ink-950 hover:bg-gold-300 hover:text-ink-950 shadow-[0_10px_40px_-10px_rgba(200,164,92,0.6)]',
  ghost:
    'bg-transparent text-bone-50 hover:bg-bone-50/5 border border-bone-50/15 hover:border-bone-50/40',
  outline:
    'bg-transparent text-bone-50 border border-gold-400/60 hover:border-gold-300 hover:text-gold-200',
  link: 'text-bone-50 hover:text-gold-300 px-0 py-0 tracking-normal normal-case',
};

export const Button = (props: ButtonProps) => {
  const variant = props.variant ?? 'primary';
  const size = props.size ?? 'md';
  const classes = cn(baseClass, sizes[size], variants[variant], props.className);

  if (props.as === 'link') {
    return (
      <Link to={props.to} className={classes}>
        {props.children}
      </Link>
    );
  }

  if (props.as === 'anchor') {
    return (
      <a href={props.href} className={classes} target="_blank" rel="noreferrer">
        {props.children}
      </a>
    );
  }

  const {
    as,
    variant: _variant,
    size: _size,
    className: _className,
    children,
    ...rest
  } = props;
  void as;
  void _variant;
  void _size;
  void _className;

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
};
