import { Link } from 'react-router-dom';
import { Container } from '@/components/common/Container';
import { Logo } from '@/components/common/Logo';
import { NewsletterForm } from '@/components/common/NewsletterForm';
import { FOOTER_NAV } from '@/data/navigation';
import { SITE, SOCIAL_LINKS } from '@/data/site';
import { CONTACTS, OFFICE_LINES } from '@/data/company';

export const Footer = () => {
  return (
    <footer className="relative border-t border-bone-50/5 bg-ink-950 pt-24 pb-12">
      <Container size="xl">
        <div className="grid gap-16 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div className="flex flex-col gap-8">
            <Logo />
            <p className="max-w-md font-serif text-xl italic text-bone-200/80 text-pretty">
              {SITE.description}
            </p>
            <div className="flex flex-col gap-3 pt-4">
              <p className="text-eyebrow uppercase tracking-[0.3em] text-gold-400">
                The Avietho List
              </p>
              <p className="text-sm text-bone-200/70 max-w-sm">
                Five hand-picked stories, every Friday at dawn. No noise. No filler.
              </p>
              <NewsletterForm compact className="mt-2" />
            </div>
          </div>

          {FOOTER_NAV.map((column) => (
            <div key={column.title} className="flex flex-col gap-5">
              <h3 className="text-eyebrow uppercase tracking-[0.3em] text-gold-400 font-medium">
                {column.title}
              </h3>
              <ul className="flex flex-col gap-3">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-sm text-bone-200/80 transition-colors hover:text-gold-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="hairline mt-20" />

        <div className="mt-10 grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div className="flex flex-col gap-3">
            <p className="text-[0.6rem] uppercase tracking-[0.3em] text-gold-300">
              The Office
            </p>
            <address className="not-italic font-serif italic text-bone-100/80 leading-[1.7] text-base">
              {OFFICE_LINES.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-[0.6rem] uppercase tracking-[0.3em] text-gold-300">
              Direct lines
            </p>
            <ul className="flex flex-col gap-2 text-sm text-bone-100/80">
              {CONTACTS.map((c) => (
                <li key={c.label}>
                  <a href={c.href} className="hover:text-gold-300 transition-colors">
                    <span className="block text-[0.6rem] uppercase tracking-[0.28em] text-bone-200/55">
                      {c.label}
                    </span>
                    <span className="font-serif italic">{c.value}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-[0.6rem] uppercase tracking-[0.3em] text-gold-300">
              Partner with ADMS
            </p>
            <p className="font-serif italic text-bone-100/80 text-base text-pretty">
              For campaigns, websites, video, and live broadcasts — work directly with our parent studio.
            </p>
            <a
              href="https://www.marketing.aviethodigital.com"
              target="_blank"
              rel="noreferrer"
              className="arrow-link self-start text-sm text-bone-50 hover:text-gold-300"
            >
              marketing.aviethodigital.com
              <svg viewBox="0 0 24 8" fill="none" stroke="currentColor" strokeWidth="1.2">
                <path d="M0 4h22M18 1l4 3-4 3" />
              </svg>
            </a>
            <div className="mt-1 flex items-center gap-2">
              <a
                href="https://www.facebook.com/aviethodigitalmarketing"
                target="_blank"
                rel="noreferrer"
                aria-label="ADMS on Facebook"
                className="grid h-8 w-8 place-items-center rounded-full bg-[#1877F2] text-bone-50 transition-transform hover:scale-[1.05]"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden>
                  <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 4.99 3.66 9.13 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.52 1.5-3.91 3.78-3.91 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.77l-.44 2.91h-2.33V22c4.78-.81 8.43-4.95 8.43-9.94z" />
                </svg>
              </a>
              <a
                href="https://m.me/aviethodigitalmarketing"
                target="_blank"
                rel="noreferrer"
                aria-label="Message ADMS"
                className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-[#00B2FF] via-[#006AFF] to-[#FF006A] text-bone-50 transition-transform hover:scale-[1.05]"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden>
                  <path d="M12 2C6.27 2 2 6.31 2 11.7c0 2.82 1.18 5.27 3.1 6.97v3.4l2.86-1.57c.76.21 1.57.32 2.4.34h.04l.2.01h.04C12 21 12.32 21 12.65 20.97c5.27-.46 9.35-4.49 9.35-9.27C22 6.31 17.73 2 12 2zm.94 13l-2.51-2.68-4.93 2.68 5.42-5.74L13.5 11.9l4.9-2.68L12.94 15z" />
                </svg>
              </a>
              <span className="text-[0.55rem] uppercase tracking-[0.28em] text-bone-200/55">
                Follow / Message
              </span>
            </div>
          </div>
        </div>

        <div className="hairline mt-12" />

        <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-2">
            <p className="text-[0.7rem] uppercase tracking-[0.3em] text-bone-200/40">
              © {new Date().getFullYear()} Avietho Digital. All rights reserved.
            </p>
            <p className="text-[0.7rem] tracking-[0.22em] text-bone-200/30">
              {SITE.established} · Powered by Avietho Digital Marketing Services.
            </p>
          </div>

          <ul className="flex items-center gap-2 sm:gap-3">
            {SOCIAL_LINKS.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className="grid h-9 w-9 place-items-center rounded-full border border-bone-50/10 text-bone-200/70 transition-colors hover:border-gold-400 hover:text-gold-300"
                >
                  <span className="text-[0.65rem] uppercase tracking-[0.2em]">
                    {social.label.slice(0, 2)}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
};
