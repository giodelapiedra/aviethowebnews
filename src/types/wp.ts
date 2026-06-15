export interface WPRendered {
  rendered: string;
  protected?: boolean;
}

export interface WPAuthor {
  id: number;
  name: string;
  slug: string;
  description?: string;
  link?: string;
  url?: string;
  roles?: string[];
  avatar_urls?: Record<'24' | '48' | '96' | string, string>;
}

export interface WPMedia {
  id: number;
  source_url: string;
  alt_text?: string;
  media_details?: {
    width?: number;
    height?: number;
    sizes?: Record<string, { source_url: string; width: number; height: number }>;
  };
}

export interface WPTerm {
  id: number;
  name: string;
  slug: string;
  taxonomy: string;
}

export interface WPPost {
  id: number;
  date: string;
  date_gmt?: string;
  modified?: string;
  slug: string;
  status: string;
  link: string;
  title: WPRendered;
  content: WPRendered;
  excerpt: WPRendered;
  author: number;
  featured_media: number;
  categories: number[];
  tags?: number[];
  sticky?: boolean;
  _embedded?: {
    author?: WPAuthor[];
    'wp:featuredmedia'?: WPMedia[];
    'wp:term'?: WPTerm[][];
  };
}

export interface WPCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
  parent: number;
  count: number;
}
