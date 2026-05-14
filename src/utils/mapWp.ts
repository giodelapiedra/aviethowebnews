import type {
  Article,
  ArticleCategory,
  Author,
  SectionSlug,
  WPCategory,
  WPPost,
  WPTerm,
} from '@/types';

const FALLBACK_COVER =
  'https://images.unsplash.com/photo-1521577352947-9bb58764b69a?auto=format&fit=crop&w=2000&q=85';

const FALLBACK_AVATAR =
  'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=200&q=80';

export const SECTION_BY_CATEGORY: Record<string, SectionSlug> = {
  sports: 'spotlight',
  feature: 'spotlight',
  'top-news': 'spotlight',
  headlines: 'spotlight',
  istorya: 'spotlight',
  interest: 'spotlight',
  philippines: 'spotlight',
  'youth-student-corner': 'spotlight',
  'guest-spotlight': 'spotlight',
  fashion: 'spotlight',
  'celebrity-news': 'spotlight',
  'lifestyle-and-entertainment': 'spotlight',
  'entertainment-sports': 'spotlight',
  'film-series': 'spotlight',
  'sports-highlights': 'spotlight',

  politics: 'government',
  'good-governance': 'government',
  national: 'government',
  local: 'government',
  executive: 'government',
  judiciary: 'government',
  senate: 'government',
  'house-of-representatives': 'government',
  elections: 'government',
  'elections-campaigns': 'government',
  'local-government': 'government',
  'local-governance': 'government',
  'national-local-news': 'government',
  legaltok: 'government',
  world: 'government',

  'culture-lifestyle': 'kaladkain',
  'food-travel': 'kaladkain',
  'heritage-tradition': 'kaladkain',
  'community-events': 'kaladkain',
  'travel-and-tourism': 'kaladkain',
  'food-and-beverages': 'kaladkain',
  'style-and-beauty': 'kaladkain',

  'editors-lens': 'editorial',
  'editors-picks-editors-lens': 'editorial',
  contributor: 'editorial',
  column: 'editorial',
  'point-of-view': 'editorial',
  'episode-archive': 'editorial',
  'transparency-talk': 'editorial',
  'press-release': 'editorial',
  partnership: 'editorial',
};

export const decodeHtmlEntities = (input: string): string => {
  if (!input) return '';
  return input
    .replace(/&#(\d+);/g, (_, code: string) => String.fromCharCode(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, hex: string) => String.fromCharCode(parseInt(hex, 16)))
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#8217;/g, '’')
    .replace(/&#8220;/g, '“')
    .replace(/&#8221;/g, '”')
    .replace(/&hellip;/g, '…');
};

export const stripHtml = (html: string): string => {
  if (!html) return '';
  const clean = html.replace(/<\/(p|div|h[1-6]|li)>/gi, '$&\n').replace(/<[^>]+>/g, '');
  return decodeHtmlEntities(clean).replace(/\s+\n/g, '\n').trim();
};

export const htmlToParagraphs = (html: string): string[] => {
  if (!html) return [];
  const matches = html.match(/<p[^>]*>[\s\S]*?<\/p>/gi);
  if (matches && matches.length) {
    return matches
      .map((p) => decodeHtmlEntities(p.replace(/<[^>]+>/g, '')).trim())
      .filter((p) => p.length > 0);
  }
  return stripHtml(html)
    .split(/\n+/)
    .map((p) => p.trim())
    .filter(Boolean);
};

const estimateReadingTime = (html: string): number => {
  const text = stripHtml(html);
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
};

const pickTerm = (terms: WPTerm[][] | undefined): WPTerm | undefined => {
  if (!terms || terms.length === 0) return undefined;
  const flat = terms.flat().filter((t) => t.taxonomy === 'category');
  if (flat.length === 0) return undefined;
  const matched = flat.find((t) => SECTION_BY_CATEGORY[t.slug]);
  return matched ?? flat[0];
};

export const mapPostToArticle = (
  post: WPPost,
  categoriesById: Map<number, WPCategory> = new Map(),
): Article => {
  const embedAuthor = post._embedded?.author?.[0];
  const embedMedia = post._embedded?.['wp:featuredmedia']?.[0];
  const embedTerms = post._embedded?.['wp:term'];

  const allTerms =
    embedTerms?.flat().filter((t) => t.taxonomy === 'category') ?? [];
  const categorySlugsFromTerms = allTerms.map((t) => t.slug);
  const categorySlugsFromIds = post.categories
    .map((id) => categoriesById.get(id)?.slug)
    .filter((slug): slug is string => Boolean(slug));
  const categorySlugs = Array.from(
    new Set([...categorySlugsFromTerms, ...categorySlugsFromIds]),
  );

  const term = pickTerm(embedTerms);
  let section: SectionSlug = 'spotlight';
  let categorySlug: string = term?.slug ?? 'spotlight';
  let categoryLabel = term ? decodeHtmlEntities(term.name) : 'Story';

  if (term && SECTION_BY_CATEGORY[term.slug]) {
    section = SECTION_BY_CATEGORY[term.slug];
  } else {
    for (const slug of categorySlugs) {
      if (SECTION_BY_CATEGORY[slug]) {
        section = SECTION_BY_CATEGORY[slug];
        if (!SECTION_BY_CATEGORY[categorySlug]) {
          const cat = allTerms.find((t) => t.slug === slug);
          categorySlug = slug;
          if (cat) categoryLabel = decodeHtmlEntities(cat.name);
        }
        break;
      }
    }
  }

  const title = decodeHtmlEntities(post.title.rendered).replace(/\s+/g, ' ').trim();
  const excerptText = stripHtml(post.excerpt.rendered);
  const cleanExcerpt = excerptText.replace(/\[…\]$|…$/g, '').trim();
  const dek = cleanExcerpt.length > 220 ? `${cleanExcerpt.slice(0, 217).trim()}…` : cleanExcerpt;
  const excerpt = cleanExcerpt.length > 320 ? `${cleanExcerpt.slice(0, 317).trim()}…` : cleanExcerpt;
  const body = htmlToParagraphs(post.content.rendered);

  const cover =
    embedMedia?.media_details?.sizes?.['large']?.source_url ??
    embedMedia?.source_url ??
    FALLBACK_COVER;

  const author: Author = {
    id: embedAuthor ? String(embedAuthor.id) : String(post.author),
    name: embedAuthor ? decodeHtmlEntities(embedAuthor.name) : 'Avietho Desk',
    role: 'Contributor',
    avatar: embedAuthor?.avatar_urls?.['96'] ?? embedAuthor?.avatar_urls?.['48'] ?? FALLBACK_AVATAR,
    bio: embedAuthor?.description ? stripHtml(embedAuthor.description) : undefined,
  };

  return {
    id: String(post.id),
    slug: post.slug,
    title,
    dek: dek || title,
    excerpt: excerpt || dek || title,
    body: body.length ? body : [dek || title],
    section,
    category: categorySlug as ArticleCategory,
    categoryLabel,
    categorySlugs,
    cover,
    author,
    publishedAt: post.date,
    readingTime: estimateReadingTime(post.content.rendered),
    tags: allTerms.map((t) => decodeHtmlEntities(t.name)),
    featured: false,
    trending: false,
    breaking: Boolean(post.sticky),
  };
};

export const mapPostsToArticles = (
  posts: WPPost[],
  categories: WPCategory[],
): Article[] => {
  const byId = new Map<number, WPCategory>();
  for (const cat of categories) byId.set(cat.id, cat);

  return posts.map((post) => mapPostToArticle(post, byId));
};

export const categoryIdsForSection = (
  categories: { id: number; slug: string }[],
  section: SectionSlug,
): number[] =>
  categories
    .filter((cat) => SECTION_BY_CATEGORY[cat.slug] === section)
    .map((cat) => cat.id);

export const categoryIdsForSlugs = (
  categories: { id: number; slug: string }[],
  slugs: string[],
): number[] =>
  categories.filter((cat) => slugs.includes(cat.slug)).map((cat) => cat.id);

export const annotateArticleFlags = (articles: Article[]): Article[] => {
  return articles.map((article, index) => ({
    ...article,
    featured: article.featured || index < 6,
    trending: article.trending || index < 6,
    breaking: article.breaking || index < 2,
  }));
};
