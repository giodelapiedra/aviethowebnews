import { motion } from 'framer-motion';
import { Container } from '@/components/common/Container';
import { NewsletterForm } from '@/components/common/NewsletterForm';

const ease = [0.22, 1, 0.36, 1] as const;

export const NewsletterSection = () => {
  return (
    <section className="relative overflow-hidden border-y border-bone-50/10 bg-ink-950">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-1/2 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-gold-400/10 blur-3xl" />
        <div className="absolute -right-24 bottom-0 h-[300px] w-[300px] rounded-full bg-crimson-400/10 blur-3xl" />
      </div>

      <Container size="lg" className="relative grid gap-16 py-24 md:py-32 lg:grid-cols-[auto_1fr] lg:items-center lg:gap-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease }}
          className="relative hidden lg:block"
        >
          <div className="relative aspect-[3/4] w-[280px] border border-gold-400/40 bg-ink-900/40 p-8 backdrop-blur-sm">
            <div className="flex h-full flex-col justify-between">
              <div className="flex items-start justify-between text-[0.6rem] uppercase tracking-[0.3em]">
                <span className="text-gold-300">Avietho · No. 07</span>
                <span className="text-bone-200/50">2026</span>
              </div>
              <div className="flex flex-col gap-3">
                <span className="font-display text-7xl text-gold-300 leading-none">
                  AD
                </span>
                <span className="font-serif italic text-2xl text-bone-50">
                  Subscriber Card
                </span>
                <span className="text-[0.6rem] uppercase tracking-[0.3em] text-bone-200/55">
                  Member · Founding Reader
                </span>
              </div>
              <div className="flex items-center justify-between text-[0.55rem] uppercase tracking-[0.3em] text-bone-200/40">
                <span>EST. 2024</span>
                <span>Manila</span>
              </div>
            </div>
          </div>
          <div className="pointer-events-none absolute -right-6 -top-6 h-full w-full border border-gold-400/20" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease, delay: 0.1 }}
          className="flex flex-col gap-7"
        >
          <p className="eyebrow">The Avietho List · Friday at dawn</p>
          <h2 className="font-display text-display-xl text-bone-50 text-balance leading-[0.95]">
            Five hand-picked stories. <br className="hidden md:inline" />
            <em className="font-serif italic font-normal text-gold-300">No notifications.</em>
          </h2>
          <p className="max-w-xl font-serif text-xl italic text-bone-200/80 text-pretty">
            No autoplay, no anxious red dots. Just five pieces — chosen slowly, sent quietly,
            and read with a coffee.
          </p>

          <NewsletterForm className="mt-3 max-w-xl" />

          <div className="mt-2 flex flex-wrap items-center gap-x-6 gap-y-2 text-[0.6rem] uppercase tracking-[0.3em] text-bone-200/45">
            <span>Joined by 38,000 quiet readers</span>
            <span aria-hidden className="text-bone-200/25">·</span>
            <span>14 countries</span>
            <span aria-hidden className="text-bone-200/25">·</span>
            <span>One unsubscribe click, anytime</span>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};
