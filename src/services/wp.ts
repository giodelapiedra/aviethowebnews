import type { WPCategory, WPPost } from '@/types';

export const WP_API_BASE = 'https://admin.aviethodigital.com/wp-json/wp/v2';

interface FetchPostsParams {
  perPage?: number;
  page?: number;
  categories?: number[];
  search?: string;
  slug?: string;
  signal?: AbortSignal;
}

const buildQuery = (params: Record<string, string | number | string[]>): string => {
  const sp = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (Array.isArray(value)) {
      if (value.length) sp.set(key, value.join(','));
    } else if (value !== undefined && value !== null && value !== '') {
      sp.set(key, String(value));
    }
  }
  return sp.toString();
};

export const fetchPosts = async ({
  perPage = 30,
  page = 1,
  categories,
  search,
  slug,
  signal,
}: FetchPostsParams = {}): Promise<WPPost[]> => {
  const qs = buildQuery({
    per_page: perPage,
    page,
    _embed: 'true',
    categories: (categories ?? []).map(String),
    search: search ?? '',
    slug: slug ?? '',
  });
  const res = await fetch(`${WP_API_BASE}/posts?${qs}`, { signal });
  if (!res.ok) {
    throw new Error(`WP posts request failed: ${res.status} ${res.statusText}`);
  }
  return (await res.json()) as WPPost[];
};

export const fetchPostBySlug = async (slug: string, signal?: AbortSignal): Promise<WPPost | null> => {
  const posts = await fetchPosts({ slug, perPage: 1, signal });
  return posts[0] ?? null;
};

export const fetchCategories = async (signal?: AbortSignal): Promise<WPCategory[]> => {
  const res = await fetch(`${WP_API_BASE}/categories?per_page=100`, { signal });
  if (!res.ok) {
    throw new Error(`WP categories request failed: ${res.status} ${res.statusText}`);
  }
  return (await res.json()) as WPCategory[];
};
