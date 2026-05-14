import { Link } from 'react-router-dom';
import logoUrl from '@/assets/LOGO.png';
import { cn } from '@/utils/cn';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  withTagline?: boolean;
}

const sizes = {
  sm: 'h-10 w-[6rem]',
  md: 'h-12 w-[7.25rem]',
  lg: 'h-16 w-[10rem]',
  xl: 'h-24 w-[15rem]',
};

export const Logo = ({ className, size = 'md', withTagline = false }: LogoProps) => {
  return (
    <Link
      to="/"
      aria-label="Avietho Digital — home"
      className={cn(
        'group inline-flex items-center gap-4 text-bone-50',
        className,
      )}
    >
      <span
        role="img"
        aria-label="Avietho Digital"
        className={cn(
          'block bg-no-repeat transition-transform duration-500 group-hover:scale-[1.04]',
          'drop-shadow-[0_0_18px_rgba(200,164,92,0.35)]',
          sizes[size],
        )}
        style={{
          backgroundImage: `url(${logoUrl})`,
          backgroundSize: '108% auto',
          backgroundPosition: '50% 51%',
        }}
      />
      {withTagline && (
        <span className="hidden flex-col leading-none lg:flex">
          <span className="text-[0.55rem] uppercase tracking-[0.35em] text-bone-200/55">
            Where truth meets
          </span>
          <span className="mt-1 text-[0.55rem] uppercase tracking-[0.35em] text-gold-300/85">
            the timeline
          </span>
        </span>
      )}
    </Link>
  );
};
