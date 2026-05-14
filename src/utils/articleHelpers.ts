import type { Article, SectionSlug } from '@/types';

export const byFeatured = (articles: Article[]): Article[] =>
  articles.filter((a) => a.featured);

export const byBreaking = (articles: Article[]): Article[] =>
  articles.filter((a) => a.breaking);

export const byTrending = (articles: Article[]): Article[] =>
  articles.filter((a) => a.trending);

export const bySection = (articles: Article[], section: SectionSlug): Article[] =>
  articles.filter((a) => a.section === section);

export const byCategory = (
  articles: Article[],
  section: SectionSlug,
  category: string | undefined,
): Article[] =>
  articles.filter((a) => {
    if (a.section !== section) return false;
    if (!category) return true;
    if (a.category === category) return true;
    return a.categorySlugs?.includes(category);
  });

export const findBySlug = (articles: Article[], slug: string): Article | undefined =>
  articles.find((a) => a.slug === slug);

export const related = (articles: Article[], article: Article, limit = 3): Article[] =>
  articles
    .filter((a) => a.section === article.section && a.id !== article.id)
    .slice(0, limit);
