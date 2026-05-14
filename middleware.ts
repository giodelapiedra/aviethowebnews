import { next } from '@vercel/edge';

export const config = {
  matcher: '/article/:slug*',
};

const BOT_PATTERN =
  /facebookexternalhit|facebot|twitterbot|linkedinbot|whatsapp|telegrambot|slackbot|discordbot|pinterest|skype|googlebot|bingbot|applebot|tumblr|embedly|outbrain|vkshare|w3c_validator|redditbot/i;

const SITE_ORIGIN = 'https://aviethodigital.com';
const WP_ENDPOINT = 'https://admin.aviethodigital.com/wp-json/wp/v2/posts';

const escapeHtml = (input: string): string =>
  input.replace(/[&<>"']/g, (c) => {
    switch (c) {
      case '&':
        return '&amp;';
      case '<':
        return '&lt;';
      case '>':
        return '&gt;';
      case '"':
        return '&quot;';
      case "'":
        return '&#39;';
      default:
        return c;
    }
  });

const decodeEntities = (input: string): string =>
  input
    .replace(/&#(\d+);/g, (_, code: string) => String.fromCharCode(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, hex: string) =>
      String.fromCharCode(parseInt(hex, 16)),
    )
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'");

const stripHtml = (html: string): string =>
  decodeEntities(html.replace(/<[^>]+>/g, '')).replace(/\s+/g, ' ').trim();

interface WPMediaSize {
  source_url: string;
  width: number;
  height: number;
}

interface WPPostMinimal {
  id: number;
  slug: string;
  date: string;
  date_gmt?: string;
  modified?: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  _embedded?: {
    author?: { name: string }[];
    'wp:featuredmedia'?: {
      source_url?: string;
      media_details?: { sizes?: Record<string, WPMediaSize> };
    }[];
    'wp:term'?: { name: string; slug: string; taxonomy: string }[][];
  };
}

const buildArticleHtml = (post: WPPostMinimal, canonical: string): string => {
  const title = stripHtml(post.title?.rendered ?? '');
  const description = stripHtml(post.excerpt?.rendered ?? '').slice(0, 240);
  const media = post._embedded?.['wp:featuredmedia']?.[0];
  const sizes = media?.media_details?.sizes;
  const image =
    sizes?.['large']?.source_url ??
    sizes?.['medium_large']?.source_url ??
    media?.source_url ??
    `${SITE_ORIGIN}/og-image.png`;
  const imageWidth = sizes?.['large']?.width ?? 1200;
  const imageHeight = sizes?.['large']?.height ?? 630;
  const author = post._embedded?.author?.[0]?.name ?? 'Avietho Digital';
  const datePublished = post.date_gmt
    ? `${post.date_gmt}Z`
    : new Date(post.date).toISOString();
  const dateModified = post.modified
    ? new Date(post.modified).toISOString()
    : datePublished;
  const terms = post._embedded?.['wp:term']?.flat?.() ?? [];
  const primaryTerm = terms.find((t) => t.taxonomy === 'category');
  const section = primaryTerm ? decodeEntities(primaryTerm.name) : 'News';

  const ld = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: title,
    description,
    image: [image],
    datePublished,
    dateModified,
    author: [{ '@type': 'Person', name: author }],
    publisher: {
      '@type': 'NewsMediaOrganization',
      name: 'Avietho Digital',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_ORIGIN}/og-image.png`,
        width: 1080,
        height: 1080,
      },
    },
    mainEntityOfPage: canonical,
    articleSection: section,
    inLanguage: 'en-PH',
  };

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${escapeHtml(title)} — Avietho Digital</title>
<meta name="description" content="${escapeHtml(description)}" />
<link rel="canonical" href="${escapeHtml(canonical)}" />

<meta property="og:type" content="article" />
<meta property="og:site_name" content="Avietho Digital" />
<meta property="og:locale" content="en_PH" />
<meta property="og:title" content="${escapeHtml(title)}" />
<meta property="og:description" content="${escapeHtml(description)}" />
<meta property="og:url" content="${escapeHtml(canonical)}" />
<meta property="og:image" content="${escapeHtml(image)}" />
<meta property="og:image:secure_url" content="${escapeHtml(image)}" />
<meta property="og:image:width" content="${imageWidth}" />
<meta property="og:image:height" content="${imageHeight}" />
<meta property="og:image:alt" content="${escapeHtml(title)}" />
<meta property="article:published_time" content="${escapeHtml(datePublished)}" />
<meta property="article:modified_time" content="${escapeHtml(dateModified)}" />
<meta property="article:author" content="${escapeHtml(author)}" />
<meta property="article:section" content="${escapeHtml(section)}" />
<meta property="article:publisher" content="https://www.facebook.com/aviethodigital" />

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:site" content="@aviethodigital" />
<meta name="twitter:title" content="${escapeHtml(title)}" />
<meta name="twitter:description" content="${escapeHtml(description)}" />
<meta name="twitter:image" content="${escapeHtml(image)}" />

<script type="application/ld+json">${JSON.stringify(ld)}</script>
</head>
<body>
<article>
<h1>${escapeHtml(title)}</h1>
<p>${escapeHtml(description)}</p>
<p>By ${escapeHtml(author)} — published ${escapeHtml(new Date(datePublished).toDateString())} on Avietho Digital.</p>
<p><a href="${escapeHtml(canonical)}">Read the full story on Avietho Digital</a></p>
</article>
</body>
</html>`;
};

export default async function middleware(req: Request): Promise<Response | undefined> {
  const ua = req.headers.get('user-agent') ?? '';
  if (!BOT_PATTERN.test(ua)) return next();

  const url = new URL(req.url);
  const slug = url.pathname.replace(/^\/article\//, '').replace(/\/$/, '');
  if (!slug || slug.includes('/')) return next();

  const canonical = `${SITE_ORIGIN}/article/${slug}`;

  try {
    const apiUrl = `${WP_ENDPOINT}?slug=${encodeURIComponent(slug)}&_embed=true`;
    const res = await fetch(apiUrl, {
      headers: { 'user-agent': 'AviethoOGBot/1.0' },
      cf: { cacheTtl: 300 } as never,
    });
    if (!res.ok) return next();

    const posts = (await res.json()) as WPPostMinimal[];
    const post = posts?.[0];
    if (!post) return next();

    const html = buildArticleHtml(post, canonical);
    return new Response(html, {
      status: 200,
      headers: {
        'content-type': 'text/html; charset=utf-8',
        'cache-control':
          'public, max-age=60, s-maxage=300, stale-while-revalidate=86400',
        'x-avietho-og': 'edge',
      },
    });
  } catch {
    return next();
  }
}
