import { useEffect } from 'react';
import { SectionHero } from '@/components/sections/SectionHero';
import { SectionArchive } from '@/components/sections/SectionArchive';
import { NewsletterSection } from '@/components/sections/NewsletterSection';
import { LoadingShell, ErrorShell } from '@/components/common/LoadingShell';
import { useArticles } from '@/hooks/useArticles';
import type { SectionMeta } from '@/data/sections';

const PR_SLUGS = ['press-release', 'partnership'];

const META: SectionMeta = {
  slug: 'editorial',
  title: 'Press Release',
  kicker: 'Avietho · The Record',
  description:
    'Official statements, partner announcements, and notices for the record — published as filed.',
  href: '/press-release',
  cover:
    'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=2400&q=85',
  accent: 'ink',
};

export const PressRelease = () => {
  const { articles, status, error, refresh, ensureSlugs } = useArticles();

  useEffect(() => {
    void ensureSlugs(PR_SLUGS);
  }, [ensureSlugs]);

  if (status === 'loading' && articles.length === 0) return <LoadingShell />;
  if (status === 'error' && articles.length === 0) {
    return <ErrorShell message={error ?? undefined} onRetry={() => void refresh()} />;
  }

  const filtered = articles.filter((a) =>
    a.categorySlugs?.some((slug) => PR_SLUGS.includes(slug)),
  );

  return (
    <>
      <SectionHero meta={META} />
      <SectionArchive
        articles={filtered}
        emptyLabel="No press releases on file yet."
      />
      <NewsletterSection />
    </>
  );
};

export default PressRelease;
