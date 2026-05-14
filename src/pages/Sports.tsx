import { useEffect } from 'react';
import { SectionHero } from '@/components/sections/SectionHero';
import { SectionArchive } from '@/components/sections/SectionArchive';
import { NewsletterSection } from '@/components/sections/NewsletterSection';
import { LoadingShell, ErrorShell } from '@/components/common/LoadingShell';
import { useArticles } from '@/hooks/useArticles';
import type { SectionMeta } from '@/data/sections';

const SPORTS_SLUGS = ['entertainment-sports', 'sports-highlights', 'sports', 'film-series'];

const META: SectionMeta = {
  slug: 'spotlight',
  title: 'Sports',
  kicker: 'Avietho · On the Field',
  description:
    'From the parquet to the pitch — match reports, profiles, and the cultural pulse of Filipino sport.',
  href: '/sports',
  cover:
    'https://images.unsplash.com/photo-1521412644187-c49fa049e84d?auto=format&fit=crop&w=2400&q=85',
  accent: 'crimson',
};

export const Sports = () => {
  const { articles, status, error, refresh, ensureSlugs } = useArticles();

  useEffect(() => {
    void ensureSlugs(SPORTS_SLUGS);
  }, [ensureSlugs]);

  if (status === 'loading' && articles.length === 0) return <LoadingShell />;
  if (status === 'error' && articles.length === 0) {
    return <ErrorShell message={error ?? undefined} onRetry={() => void refresh()} />;
  }

  const filtered = articles.filter((a) =>
    a.categorySlugs?.some((slug) => SPORTS_SLUGS.includes(slug)),
  );

  return (
    <>
      <SectionHero meta={META} />
      <SectionArchive
        articles={filtered}
        emptyLabel="No sports stories yet — fixtures incoming."
      />
      <NewsletterSection />
    </>
  );
};

export default Sports;
