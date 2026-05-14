import { useMemo } from 'react';
import { useArticles } from './useArticles';
import type { Article, SectionSlug } from '@/types';

export interface HomeFeed {
  hero?: Article;
  trio: Article[];
  featured: Article[];
  spotlight: Article[];
  government: Article[];
  kaladkain: Article[];
  editorial: Article[];
  trending: Article[];
  ticker: Article[];
  all: Article[];
}

interface UseHomeFeedResult extends HomeFeed {
  status: ReturnType<typeof useArticles>['status'];
  error: string | null;
}

export const useHomeFeed = (): UseHomeFeedResult => {
  const { articles, status, error } = useArticles();

  const feed = useMemo<HomeFeed>(() => {
    const used = new Set<string>();
    const take = (
      filter: (a: Article) => boolean,
      count: number,
    ): Article[] => {
      const picks: Article[] = [];
      for (const article of articles) {
        if (picks.length >= count) break;
        if (used.has(article.id)) continue;
        if (!filter(article)) continue;
        picks.push(article);
        used.add(article.id);
      }
      return picks;
    };

    const inSection = (s: SectionSlug) => (a: Article) => a.section === s;

    const hero = take(() => true, 1)[0];
    const trio = take(() => true, 3);
    const featured = take(() => true, 5);

    const spotlight = take(inSection('spotlight'), 4);
    const government = take(inSection('government'), 4);
    const kaladkain = take(inSection('kaladkain'), 4);
    const editorial = take(inSection('editorial'), 3);

    const trending = take(() => true, 6);

    return {
      hero,
      trio,
      featured,
      spotlight,
      government,
      kaladkain,
      editorial,
      trending,
      ticker: articles.slice(0, 12),
      all: articles,
    };
  }, [articles]);

  return { ...feed, status, error };
};
