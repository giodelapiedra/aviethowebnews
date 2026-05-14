import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Container } from '@/components/common/Container';
import { Button } from '@/components/common/Button';
import { CONTACTS, COMPANY, OFFICE, OFFICE_LINES } from '@/data/company';
import { cn } from '@/utils/cn';

const ease = [0.22, 1, 0.36, 1] as const;

const CONTACT_REASONS = [
  { value: 'advertise', label: 'Advertise' },
  { value: 'collaborate', label: 'Collaborate' },
  { value: 'partner', label: 'Partnership' },
  { value: 'editorial', label: 'Story Pitch' },
  { value: 'press', label: 'Press' },
  { value: 'careers', label: 'Careers' },
] as const;

export const Contact = () => {
  const [reason, setReason] = useState<typeof CONTACT_REASONS[number]['value']>('advertise');
  const [sent, setSent] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
  };

  return (
    <>
      <section className="relative -mt-[120px] overflow-hidden bg-ink-950 pb-16 pt-40 grain">
        <Container size="xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease }}
            className="max-w-4xl"
          >
            <p className="eyebrow mb-6">Contact · Advertise · Collaborate · Partner</p>
            <h1 className="font-display text-display-2xl text-bone-50 text-balance leading-[0.95]">
              Advertise, collaborate, <br />
              or <em className="font-serif italic font-normal text-gold-300">partner with us</em>.
            </h1>
            <p className="mt-8 max-w-2xl font-serif text-xl md:text-2xl italic text-bone-100/85 text-pretty">
              Interested in advertising, collaboration, or partnership opportunities? Tell us what
              you are building — the Avietho desk reads every note, and we answer most of them.
            </p>
          </motion.div>
        </Container>
      </section>

      <section className="relative border-y border-bone-50/10 bg-ink-900/40 py-10">
        <Container size="xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {CONTACTS.map((channel) => (
              <a
                key={channel.label}
                href={channel.href}
                className="group flex flex-col gap-2 border-l border-bone-50/15 pl-5 transition-colors hover:border-gold-400"
              >
                <span className="text-[0.6rem] uppercase tracking-[0.3em] text-gold-300">
                  {channel.label}
                </span>
                <span className="font-display text-2xl text-bone-50 transition-colors group-hover:text-gold-200">
                  {channel.value}
                </span>
              </a>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-shell pt-20">
        <Container size="xl">
          <div className="grid gap-16 lg:grid-cols-[1.4fr_1fr] lg:gap-24">
            <motion.form
              onSubmit={onSubmit}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease }}
              className="flex flex-col gap-10 rounded-sm border border-bone-50/10 bg-ink-900/30 p-8 md:p-14"
              id="advertise"
            >
              <div>
                <p className="eyebrow mb-4">Tell us why</p>
                <div className="flex flex-wrap gap-2">
                  {CONTACT_REASONS.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setReason(option.value)}
                      className={cn(
                        'rounded-full border px-4 py-2 text-[0.65rem] uppercase tracking-[0.25em] transition-colors',
                        reason === option.value
                          ? 'border-gold-400 text-gold-200 bg-gold-400/10'
                          : 'border-bone-50/15 text-bone-50/80 hover:border-gold-400 hover:text-gold-200',
                      )}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid gap-8 sm:grid-cols-2">
                <Field label="First name" name="firstName" required />
                <Field label="Last name" name="lastName" required />
                <Field label="Email" name="email" type="email" required />
                <Field label="Phone" name="phone" type="tel" />
                <Field
                  label="Organization"
                  name="organization"
                  className="sm:col-span-2"
                />
              </div>

              <div className="flex flex-col gap-3">
                <label
                  htmlFor="message"
                  className="text-[0.65rem] uppercase tracking-[0.3em] text-bone-200/60"
                >
                  Your message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  required
                  placeholder="Tell us what you are working on — campaign, partnership, brief, or pitch."
                  className="resize-none bg-transparent border-b border-bone-50/15 py-3 text-base text-bone-50 placeholder:text-bone-200/30 focus:border-gold-400 focus:outline-none"
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-6">
                <p className="text-[0.65rem] uppercase tracking-[0.25em] text-bone-200/45 max-w-xs">
                  By submitting, you agree to our editorial standards and privacy policy.
                </p>
                <Button as="button" type="submit" size="lg">
                  Send message
                </Button>
              </div>

              {sent && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-sm text-gold-300"
                >
                  Thank you. A member of the Avietho team will be in touch within two working days.
                </motion.p>
              )}
            </motion.form>

            <div className="flex flex-col gap-12">
              <div>
                <p className="eyebrow mb-5">The Office</p>
                <h3 className="font-display text-3xl text-bone-50 leading-[1.05]">
                  Madrigal Business Park, <br />
                  <em className="font-serif italic font-normal text-gold-300">Ayala Alabang.</em>
                </h3>
                <address className="mt-6 not-italic font-serif text-lg italic text-bone-100/85 leading-[1.7]">
                  {OFFICE_LINES.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    `${OFFICE.building}, ${OFFICE.street}, ${OFFICE.city}`,
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="arrow-link mt-6 text-sm text-bone-50 hover:text-gold-300"
                >
                  Open in Maps
                  <svg viewBox="0 0 24 8" fill="none" stroke="currentColor" strokeWidth="1.2">
                    <path d="M0 4h22M18 1l4 3-4 3" />
                  </svg>
                </a>
              </div>

              <div>
                <p className="eyebrow mb-4">Direct lines</p>
                <ul className="flex flex-col divide-y divide-bone-50/10">
                  {CONTACTS.map((channel) => (
                    <li key={channel.label} className="py-4 first:pt-0">
                      <a
                        href={channel.href}
                        className="group flex items-baseline justify-between gap-4 hover:text-gold-300 transition-colors"
                      >
                        <span className="text-[0.65rem] uppercase tracking-[0.3em] text-bone-200/55">
                          {channel.label}
                        </span>
                        <span className="font-serif italic text-bone-50 text-lg transition-colors group-hover:text-gold-200">
                          {channel.value}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-sm border border-gold-400/40 bg-ink-950 p-6">
                <div className="flex items-center justify-between">
                  <p className="text-[0.6rem] uppercase tracking-[0.3em] text-gold-300">
                    Powered by ADMS
                  </p>
                  <span className="text-[0.55rem] uppercase tracking-[0.3em] text-bone-200/45">
                    Est. 2018
                  </span>
                </div>
                <h3 className="mt-4 font-display text-2xl text-bone-50 leading-[1.15]">
                  Need <em className="font-serif italic font-normal text-gold-300">digital marketing</em>?
                </h3>
                <p className="mt-3 font-serif italic text-bone-100/80 text-pretty">
                  For campaigns, websites, video production, social media, and digital PR — work
                  directly with our parent studio. DM us anytime.
                </p>

                <div className="mt-5 grid grid-cols-2 gap-2">
                  <a
                    href={COMPANY.marketingFacebook}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center gap-2 rounded-md border border-bone-50/15 bg-bone-50/5 px-3 py-2.5 transition-colors hover:border-gold-400 hover:bg-gold-400/10"
                    aria-label="Follow ADMS on Facebook"
                  >
                    <span className="grid h-7 w-7 place-items-center rounded-full bg-[#1877F2] text-bone-50">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden>
                        <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 4.99 3.66 9.13 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.52 1.5-3.91 3.78-3.91 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.77l-.44 2.91h-2.33V22c4.78-.81 8.43-4.95 8.43-9.94z" />
                      </svg>
                    </span>
                    <span className="flex flex-col">
                      <span className="text-[0.55rem] uppercase tracking-[0.25em] text-bone-200/55">
                        Follow
                      </span>
                      <span className="text-xs text-bone-50 group-hover:text-gold-200 leading-tight">
                        ADMS Page
                      </span>
                    </span>
                  </a>
                  <a
                    href={COMPANY.marketingMessenger}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center gap-2 rounded-md border border-bone-50/15 bg-bone-50/5 px-3 py-2.5 transition-colors hover:border-gold-400 hover:bg-gold-400/10"
                    aria-label="Message ADMS on Messenger"
                  >
                    <span className="grid h-7 w-7 place-items-center rounded-full bg-gradient-to-br from-[#00B2FF] via-[#006AFF] to-[#FF006A] text-bone-50">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden>
                        <path d="M12 2C6.27 2 2 6.31 2 11.7c0 2.82 1.18 5.27 3.1 6.97v3.4l2.86-1.57c.76.21 1.57.32 2.4.34h.04l.2.01h.04C12 21 12.32 21 12.65 20.97c5.27-.46 9.35-4.49 9.35-9.27C22 6.31 17.73 2 12 2zm.94 13l-2.51-2.68-4.93 2.68 5.42-5.74L13.5 11.9l4.9-2.68L12.94 15z" />
                      </svg>
                    </span>
                    <span className="flex flex-col">
                      <span className="text-[0.55rem] uppercase tracking-[0.25em] text-bone-200/55">
                        Message
                      </span>
                      <span className="text-xs text-bone-50 group-hover:text-gold-200 leading-tight">
                        Send a brief
                      </span>
                    </span>
                  </a>
                </div>

                <a
                  href={COMPANY.marketingWebsite}
                  target="_blank"
                  rel="noreferrer"
                  className="arrow-link mt-5 text-sm text-gold-200 hover:text-gold-300"
                >
                  marketing.aviethodigital.com
                  <svg viewBox="0 0 24 8" fill="none" stroke="currentColor" strokeWidth="1.2">
                    <path d="M0 4h22M18 1l4 3-4 3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

interface FieldProps {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  className?: string;
}

const Field = ({ label, name, type = 'text', required, className }: FieldProps) => (
  <div className={cn('flex flex-col gap-3', className)}>
    <label
      htmlFor={name}
      className="text-[0.65rem] uppercase tracking-[0.3em] text-bone-200/60"
    >
      {label}
      {required && <span className="ml-1 text-gold-400">*</span>}
    </label>
    <input
      id={name}
      name={name}
      type={type}
      required={required}
      className="bg-transparent border-b border-bone-50/15 py-3 text-base text-bone-50 placeholder:text-bone-200/30 focus:border-gold-400 focus:outline-none"
    />
  </div>
);

export default Contact;
