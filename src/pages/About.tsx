import { motion } from 'framer-motion';
import { Container } from '@/components/common/Container';
import { Button } from '@/components/common/Button';
import { NewsletterSection } from '@/components/sections/NewsletterSection';
import {
  ADMS_APPROACH,
  ADMS_INTRO,
  ADMS_MULTIMEDIA,
  ADMS_SERVICES,
  COMPANY,
  OFFICE_LINES,
} from '@/data/company';

const ease = [0.22, 1, 0.36, 1] as const;

const PRINCIPLES = [
  {
    title: 'Truth meets the timeline.',
    body: 'We do not wait for the print run. We publish where the public square actually lives — on the feeds, in the comments, inside the conversation.',
  },
  {
    title: 'Independent by design.',
    body: 'Unbound by the traditional structures of legacy publishers. A small, agile team — accountable to readers, not to gatekeepers.',
  },
  {
    title: 'Investigative by instinct.',
    body: 'A sharp lens on politics and government affairs, with critical conversations on transparency, policy, and public leadership.',
  },
  {
    title: 'Culture, fully present.',
    body: 'From the human stories that move us to the heritage and pageantry that make us, we hold space for what is beautiful too.',
  },
];

export const About = () => {
  return (
    <>
      <section className="relative -mt-[120px] flex min-h-[80svh] items-end overflow-hidden bg-ink-950 pb-20 pt-40 grain">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=2400&q=85"
            alt=""
            className="h-full w-full object-cover opacity-45"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-ink-950 via-ink-950/80 to-ink-950/40" />
          <div className="absolute inset-0 bg-gradient-to-b from-ink-950/40 via-transparent to-ink-950" />
        </div>

        <Container size="xl" className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease }}
            className="max-w-5xl"
          >
            <p className="eyebrow mb-6">About · Avietho Digital Media Network</p>
            <h1 className="font-display text-display-2xl text-bone-50 text-balance leading-[0.95]">
              An independent newsroom — <br />
              <em className="font-serif italic font-normal text-gold-300">built for the modern reader</em>.
            </h1>
            <p className="mt-10 max-w-3xl font-serif text-xl md:text-2xl italic text-bone-100/85 text-pretty">
              {COMPANY.intro}
            </p>
          </motion.div>
        </Container>
      </section>

      <section className="section-shell relative overflow-hidden">
        <Container size="xl">
          <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-24">
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease }}
              className="lg:sticky lg:top-32"
            >
              <p className="eyebrow mb-6">The Modern Newsroom</p>
              <h2 className="font-display text-display-lg text-bone-50 text-balance leading-[1]">
                The public square has moved.
                <br />
                <em className="font-serif italic font-normal text-gold-300">So have we.</em>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease, delay: 0.1 }}
              className="flex flex-col gap-8 font-serif text-xl leading-[1.7] text-bone-100/90"
            >
              <p className="text-pretty">{COMPANY.modernNewsroom}</p>
              <p className="text-pretty">{COMPANY.editorialFocus}</p>
              <p className="text-pretty text-bone-200/70 italic">{COMPANY.poweredBy}</p>
            </motion.div>
          </div>
        </Container>
      </section>

      <section id="standards" className="section-shell relative overflow-hidden border-y border-bone-50/10 bg-ink-900/40">
        <Container size="xl">
          <div className="mb-16 grid items-end gap-8 lg:grid-cols-[1fr_2fr]">
            <div>
              <p className="eyebrow mb-6">Editorial Standards</p>
              <h2 className="font-display text-display-md text-bone-50 text-balance leading-[1.02]">
                Four convictions we will not compromise on.
              </h2>
            </div>
          </div>

          <div className="grid gap-px overflow-hidden bg-bone-50/10 sm:grid-cols-2">
            {PRINCIPLES.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.06, ease }}
                className="bg-ink-950 p-10"
              >
                <span className="font-display text-3xl text-gold-300/80">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-5 font-display text-2xl md:text-[1.7rem] text-bone-50 text-balance leading-[1.1]">
                  {value.title}
                </h3>
                <p className="mt-4 font-serif text-lg italic text-bone-200/75 text-pretty">
                  {value.body}
                </p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-shell relative">
        <Container size="xl">
          <div className="grid items-stretch gap-12 lg:grid-cols-2 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease }}
              className="flex flex-col gap-6 border border-bone-50/10 bg-ink-900/30 p-10 md:p-14"
            >
              <p className="text-[0.65rem] uppercase tracking-[0.3em] text-gold-300">
                The Vision
              </p>
              <h3 className="font-display text-3xl md:text-[2rem] text-bone-50 text-balance leading-[1.1]">
                <em className="font-serif italic font-normal text-gold-300">Truth meets the timeline.</em>
              </h3>
              <p className="font-serif text-lg italic text-bone-100/85 text-pretty">
                {COMPANY.vision}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease, delay: 0.08 }}
              className="flex flex-col gap-6 border border-gold-400/40 bg-ink-950 p-10 md:p-14"
            >
              <p className="text-[0.65rem] uppercase tracking-[0.3em] text-gold-300">
                The Mission
              </p>
              <h3 className="font-display text-3xl md:text-[2rem] text-bone-50 text-balance leading-[1.1]">
                <em className="font-serif italic font-normal text-gold-300">Fearless, forward, in the feed.</em>
              </h3>
              <p className="font-serif text-lg italic text-bone-100/85 text-pretty">
                {COMPANY.mission}
              </p>
            </motion.div>
          </div>
        </Container>
      </section>

      <section
        id="adms"
        className="section-shell relative overflow-hidden bg-bone-100 text-ink-950"
      >
        <div className="pointer-events-none absolute inset-0 bg-noise opacity-[0.07] mix-blend-multiply" />
        <div className="pointer-events-none absolute right-[-6%] top-12 select-none">
          <span className="font-display text-stroke-ink text-[14rem] md:text-[20rem] leading-none tracking-[-0.04em] opacity-[0.08]">
            ADMS
          </span>
        </div>

        <Container size="xl" className="relative">
          <div className="mb-16 flex flex-wrap items-end justify-between gap-8 border-b border-ink-950/15 pb-10">
            <div>
              <p className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-gold-600">
                Est. {COMPANY.parentEstablished} · The Marketing Studio
              </p>
              <h2 className="mt-3 font-display text-display-xl text-ink-950 text-balance leading-[0.95]">
                Avietho Digital <br />
                <em className="font-serif italic font-normal text-crimson-400">Marketing Services</em>.
              </h2>
            </div>
            <div className="flex flex-col items-start gap-3 md:items-end">
              <a
                href={COMPANY.marketingWebsite}
                target="_blank"
                rel="noreferrer"
                className="arrow-link text-sm text-ink-950 hover:text-crimson-400"
              >
                marketing.aviethodigital.com
                <svg viewBox="0 0 24 8" fill="none" stroke="currentColor" strokeWidth="1.2">
                  <path d="M0 4h22M18 1l4 3-4 3" />
                </svg>
              </a>
              <div className="flex items-center gap-2">
                <a
                  href={COMPANY.marketingFacebook}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="ADMS on Facebook"
                  className="grid h-9 w-9 place-items-center rounded-full bg-[#1877F2] text-bone-50 transition-transform hover:scale-[1.05]"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden>
                    <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 4.99 3.66 9.13 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.52 1.5-3.91 3.78-3.91 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.77l-.44 2.91h-2.33V22c4.78-.81 8.43-4.95 8.43-9.94z" />
                  </svg>
                </a>
                <a
                  href={COMPANY.marketingMessenger}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Message ADMS"
                  className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-[#00B2FF] via-[#006AFF] to-[#FF006A] text-bone-50 transition-transform hover:scale-[1.05]"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden>
                    <path d="M12 2C6.27 2 2 6.31 2 11.7c0 2.82 1.18 5.27 3.1 6.97v3.4l2.86-1.57c.76.21 1.57.32 2.4.34h.04l.2.01h.04C12 21 12.32 21 12.65 20.97c5.27-.46 9.35-4.49 9.35-9.27C22 6.31 17.73 2 12 2zm.94 13l-2.51-2.68-4.93 2.68 5.42-5.74L13.5 11.9l4.9-2.68L12.94 15z" />
                  </svg>
                </a>
                <span className="text-[0.6rem] uppercase tracking-[0.3em] text-ink-700">
                  Follow / Message ADMS
                </span>
              </div>
            </div>
          </div>

          <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease }}
              className="flex flex-col gap-8 font-serif text-lg leading-[1.7] text-ink-800"
            >
              <p className="font-display text-2xl text-ink-950 leading-[1.25]">{ADMS_INTRO}</p>
              <p className="text-pretty">{ADMS_APPROACH}</p>
              <p className="text-pretty">{ADMS_MULTIMEDIA}</p>
            </motion.div>

            <div className="flex flex-col">
              <p className="text-[0.6rem] uppercase tracking-[0.3em] text-gold-600 mb-2">
                Core Services
              </p>
              {ADMS_SERVICES.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: index * 0.05, ease }}
                  className="group grid grid-cols-[auto_1fr] items-start gap-6 border-b border-ink-950/15 py-7 last:border-0"
                >
                  <span className="font-display text-3xl text-gold-600 leading-none">
                    0{index + 1}
                  </span>
                  <div className="flex flex-col gap-2">
                    <h3 className="font-display text-2xl md:text-[1.6rem] text-ink-950 text-balance leading-[1.15] transition-colors group-hover:text-crimson-400">
                      {service.title}
                    </h3>
                    <p className="font-serif italic text-ink-700 text-pretty">
                      {service.body}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section id="partner" className="section-shell relative overflow-hidden">
        <Container size="md" className="text-center">
          <p className="eyebrow mb-6 justify-center">Partner with Us</p>
          <h2 className="font-display text-display-xl text-bone-50 text-balance leading-[0.95]">
            Discover how our strategy can <em className="font-serif italic font-normal text-gold-300">elevate your public presence</em>.
          </h2>
          <p className="mx-auto mt-8 max-w-2xl font-serif text-xl italic text-bone-200/80 text-pretty">
            Interested in advertising, collaboration, or partnership opportunities?
            Our team is ready to talk. Tell us what you are building, and we will find the
            right way to amplify it.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button as="link" to="/contact" size="lg">
              Get in touch
            </Button>
            <Button as="anchor" href={COMPANY.marketingWebsite} variant="ghost" size="lg">
              Visit ADMS
            </Button>
          </div>
          <p className="mt-10 text-[0.65rem] uppercase tracking-[0.32em] text-bone-200/45">
            {OFFICE_LINES.join(' · ')}
          </p>
        </Container>
      </section>

      <NewsletterSection />
    </>
  );
};

export default About;
