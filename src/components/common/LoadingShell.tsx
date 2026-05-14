import { Container } from './Container';

interface LoadingShellProps {
  label?: string;
}

export const LoadingShell = ({ label = 'Loading the issue…' }: LoadingShellProps) => (
  <section className="relative -mt-[120px] flex min-h-[100svh] items-center justify-center bg-ink-950 text-bone-50">
    <Container size="md" className="flex flex-col items-center gap-6 text-center">
      <span className="grid h-12 w-12 place-items-center rounded-full border border-gold-400/40">
        <span className="h-2 w-2 animate-ping rounded-full bg-gold-400" />
      </span>
      <p className="font-serif text-2xl italic text-bone-200/85">{label}</p>
      <p className="text-[0.65rem] uppercase tracking-[0.35em] text-bone-200/45">
        Avietho Digital · The Wire is loading
      </p>
    </Container>
  </section>
);

interface ErrorShellProps {
  message?: string;
  onRetry?: () => void;
}

export const ErrorShell = ({ message, onRetry }: ErrorShellProps) => (
  <section className="relative -mt-[120px] flex min-h-[100svh] items-center justify-center bg-ink-950 text-bone-50">
    <Container size="md" className="flex flex-col items-center gap-6 text-center">
      <span className="eyebrow justify-center">Connection · Interrupted</span>
      <h2 className="font-display text-display-lg text-bone-50 text-balance">
        We could not reach the desk right now.
      </h2>
      {message && (
        <p className="font-mono text-xs text-bone-200/60 max-w-md break-all">{message}</p>
      )}
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="rounded-full border border-gold-400 px-6 py-3 text-[0.65rem] uppercase tracking-[0.3em] text-bone-50 transition-colors hover:bg-gold-400 hover:text-ink-950"
        >
          Try again
        </button>
      )}
    </Container>
  </section>
);
