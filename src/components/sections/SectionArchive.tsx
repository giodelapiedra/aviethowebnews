import { Container } from '@/components/common/Container';
import { ArticleCard } from '@/components/cards/ArticleCard';
import type { Article } from '@/types';

interface SectionArchiveProps {
  articles: Article[];
  emptyLabel?: string;
}

export const SectionArchive = ({ articles, emptyLabel = 'No stories yet — check back soon.' }: SectionArchiveProps) => {
  if (articles.length === 0) {
    return (
      <section className="section-shell">
        <Container size="md" className="py-16 text-center">
          <p className="font-serif text-2xl italic text-bone-200/70">{emptyLabel}</p>
        </Container>
      </section>
    );
  }

  const [lead, ...rest] = articles;

  return (
    <section className="section-shell">
      <Container size="xl">
        {lead && (
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <ArticleCard article={lead} variant="default" showExcerpt />
            <div className="hidden lg:flex flex-col gap-6">
              <p className="eyebrow">The Lead</p>
              <h2 className="font-display text-display-md text-bone-50 text-balance leading-[1.05]">
                {lead.title}
              </h2>
              <p className="max-w-md font-serif text-lg italic text-bone-200/80">
                {lead.dek}
              </p>
            </div>
          </div>
        )}

        {rest.length > 0 && (
          <>
            <div className="hairline my-16" />
            <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
              {rest.map((article) => (
                <ArticleCard key={article.id} article={article} variant="compact" showExcerpt />
              ))}
            </div>
          </>
        )}
      </Container>
    </section>
  );
};
