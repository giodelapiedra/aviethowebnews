export type SectionSlug =
  | 'spotlight'
  | 'government'
  | 'kaladkain'
  | 'editorial';

export type GovernmentCategory = 'national' | 'local' | 'elections';
export type EditorialCategory = 'editors-pick' | 'contributor' | 'say-what' | 'gen-speaks';
export type SpotlightCategory =
  | 'success'
  | 'personalities'
  | 'pageantry'
  | 'innovators'
  | 'human-journeys';
export type KaladkainCategory = 'travel' | 'food' | 'hidden-gems' | 'business';

export type ArticleCategory =
  | GovernmentCategory
  | EditorialCategory
  | SpotlightCategory
  | KaladkainCategory;

export interface Author {
  id: string;
  name: string;
  role: string;
  avatar: string;
  bio?: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  dek: string;
  excerpt: string;
  body: string[];
  bodyHtml: string;
  section: SectionSlug;
  category: ArticleCategory;
  categoryLabel: string;
  categorySlugs: string[];
  cover: string;
  thumbnail?: string;
  author: Author;
  publishedAt: string;
  readingTime: number;
  tags: string[];
  featured?: boolean;
  trending?: boolean;
  breaking?: boolean;
}
