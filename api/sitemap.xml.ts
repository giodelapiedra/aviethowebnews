export const config = { runtime: 'edge' };

const SITE = 'https://aviethodigital.com';
const WP_ENDPOINT = 'https://admin.aviethodigital.com/wp-json/wp/v2/posts';

const STATIC_ROUTES: { path: string; priority: number; changefreq: string }[] = [
  { path: '/', priority: 1.0, changefreq: 'hourly' },
  { path: '/spotlight', priority: 0.9, changefreq: 'daily' },
  { path: '/government', priority: 0.9, changefreq: 'daily' },
  { path: '/kaladkain', priority: 0.8, changefreq: 'daily' },
  { path: '/editorial', priority: 0.8, changefreq: 'daily' },
  { path: '/sports', priority: 0.8, changefreq: 'daily' },
  { path: '/press-release', priority: 0.8, changefreq: 'daily' },
  { path: '/about', priority: 0.5, changefreq: 'monthly' },
  { path: '/contact', priority: 0.5, changefreq: 'monthly' },
];

interface SlugRow {
  slug: string;
  modified?: string;
}

const fetchAllSlugs = async (): Promise<SlugRow[]> => {
  const collected: SlugRow[] = [];
  const perPage = 100;
  let page = 1;
  let totalPages = 1;

  do {
    const url = `${WP_ENDPOINT}?per_page=${perPage}&page=${page}&_fields=slug,modified&orderby=modified&order=desc`;
    const res = await fetch(url, { headers: { 'user-agent': 'AviethoSitemapBot/1.0' } });
    if (!res.ok) break;
    if (page === 1) {
      totalPages = Number(res.headers.get('x-wp-totalpages') ?? '1');
    }
    const rows = (await res.json()) as SlugRow[];
    for (const row of rows) {
      if (row.slug) collected.push({ slug: row.slug, modified: row.modified });
    }
    page += 1;
  } while (page <= Math.min(totalPages, 12));

  return collected;
};

const escapeXml = (input: string): string =>
  input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

export default async function handler(): Promise<Response> {
  const articles = await fetchAllSlugs().catch(() => [] as SlugRow[]);
  const now = new Date().toISOString();

  const entries: string[] = [
    ...STATIC_ROUTES.map(
      ({ path, priority, changefreq }) => `  <url>
    <loc>${SITE}${path}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority.toFixed(1)}</priority>
  </url>`,
    ),
    ...articles.map(({ slug, modified }) => {
      const lastmod = modified ? new Date(modified).toISOString() : now;
      return `  <url>
    <loc>${SITE}/article/${escapeXml(slug)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
    }),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join('\n')}
</urlset>`;

  return new Response(xml, {
    status: 200,
    headers: {
      'content-type': 'application/xml; charset=utf-8',
      'cache-control': 'public, max-age=600, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
