import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { SectionHero } from '@/components/sections/SectionHero';
import { SectionArchive } from '@/components/sections/SectionArchive';
import { NewsletterSection } from '@/components/sections/NewsletterSection';
import { LoadingShell, ErrorShell } from '@/components/common/LoadingShell';
import { useArticles } from '@/hooks/useArticles';
import { byCategory } from '@/utils/articleHelpers';
import { EDITORIAL_SUBCATEGORIES, SECTION_META } from '@/data/sections';

export const Editorial = () => {
  const { category } = useParams<{ category?: string }>();
  const { articles, status, error, refresh, ensureSection } = useArticles();

  useEffect(() => {
    void ensureSection('editorial');
  }, [ensureSection]);

  if (status === 'loading' && articles.length === 0) return <LoadingShell />;
  if (status === 'error' && articles.length === 0) {
    return <ErrorShell message={error ?? undefined} onRetry={() => void refresh()} />;
  }

  const filtered = byCategory(articles, 'editorial', category);

  return (
    <>
      <SectionHero
        meta={SECTION_META.editorial}
        subcategories={EDITORIAL_SUBCATEGORIES}
        activeCategory={category}
      />
      <SectionArchive articles={filtered} />
      <NewsletterSection />
    </>
  );
};

export default Editorial;
