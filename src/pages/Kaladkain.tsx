import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { SectionHero } from '@/components/sections/SectionHero';
import { SectionArchive } from '@/components/sections/SectionArchive';
import { NewsletterSection } from '@/components/sections/NewsletterSection';
import { LoadingShell, ErrorShell } from '@/components/common/LoadingShell';
import { useArticles } from '@/hooks/useArticles';
import { byCategory } from '@/utils/articleHelpers';
import { KALADKAIN_SUBCATEGORIES, SECTION_META } from '@/data/sections';

export const Kaladkain = () => {
  const { category } = useParams<{ category?: string }>();
  const { articles, status, error, refresh, ensureSection } = useArticles();

  useEffect(() => {
    void ensureSection('kaladkain');
  }, [ensureSection]);

  if (status === 'loading' && articles.length === 0) return <LoadingShell />;
  if (status === 'error' && articles.length === 0) {
    return <ErrorShell message={error ?? undefined} onRetry={() => void refresh()} />;
  }

  const filtered = byCategory(articles, 'kaladkain', category);

  return (
    <>
      <SectionHero
        meta={SECTION_META.kaladkain}
        subcategories={KALADKAIN_SUBCATEGORIES}
        activeCategory={category}
      />
      <SectionArchive articles={filtered} />
      <NewsletterSection />
    </>
  );
};

export default Kaladkain;
