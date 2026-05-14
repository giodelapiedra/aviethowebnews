import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import type { Article, SectionSlug, WPCategory } from '@/types';
import { fetchCategories, fetchPostBySlug, fetchPosts } from '@/services/wp';
import {
  annotateArticleFlags,
  categoryIdsForSection,
  categoryIdsForSlugs,
  mapPostToArticle,
  mapPostsToArticles,
} from '@/utils/mapWp';

type LoadStatus = 'idle' | 'loading' | 'ready' | 'error';

export interface ArticlesContextValue {
  articles: Article[];
  categories: WPCategory[];
  status: LoadStatus;
  error: string | null;
  refresh: () => Promise<void>;
  fetchArticleBySlug: (slug: string) => Promise<Article | null>;
  ensureSection: (section: SectionSlug) => Promise<void>;
  ensureSlugs: (slugs: string[]) => Promise<void>;
}

export const ArticlesContext = createContext<ArticlesContextValue | null>(null);

interface ArticlesProviderProps {
  children: ReactNode;
  perPage?: number;
}

export const ArticlesProvider = ({ children, perPage = 60 }: ArticlesProviderProps) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<WPCategory[]>([]);
  const [status, setStatus] = useState<LoadStatus>('idle');
  const [error, setError] = useState<string | null>(null);
  const categoriesRef = useRef<WPCategory[]>([]);
  const loadedSections = useRef<Set<SectionSlug>>(new Set());
  const loadedSlugs = useRef<Set<string>>(new Set());

  const mergeArticles = useCallback((incoming: Article[]) => {
    setArticles((prev) => {
      const seen = new Set(prev.map((a) => a.id));
      const additions = incoming.filter((a) => !seen.has(a.id));
      if (additions.length === 0) return prev;
      return [...prev, ...additions];
    });
  }, []);

  const load = useCallback(
    async (signal?: AbortSignal) => {
      setStatus((prev) => (prev === 'ready' ? 'ready' : 'loading'));
      setError(null);
      try {
        const [posts, cats] = await Promise.all([
          fetchPosts({ perPage, signal }),
          fetchCategories(signal),
        ]);
        categoriesRef.current = cats;
        const mapped = mapPostsToArticles(posts, cats);
        const withFlags = annotateArticleFlags(mapped);
        setCategories(cats);
        setArticles(withFlags);
        setStatus('ready');
      } catch (err) {
        if ((err as { name?: string }).name === 'AbortError') return;
        const message = err instanceof Error ? err.message : 'Failed to load content.';
        setError(message);
        setStatus('error');
      }
    },
    [perPage],
  );

  useEffect(() => {
    const controller = new AbortController();
    void load(controller.signal);
    return () => controller.abort();
  }, [load]);

  const fetchArticleBySlug = useCallback(
    async (slug: string): Promise<Article | null> => {
      const existing = articles.find((a) => a.slug === slug);
      if (existing) return existing;
      const post = await fetchPostBySlug(slug);
      if (!post) return null;
      const cats = categoriesRef.current.length
        ? categoriesRef.current
        : await fetchCategories().catch(() => []);
      const byId = new Map<number, WPCategory>();
      for (const cat of cats) byId.set(cat.id, cat);
      const article = mapPostToArticle(post, byId);
      setArticles((prev) => {
        if (prev.some((a) => a.slug === article.slug)) return prev;
        return [...prev, article];
      });
      return article;
    },
    [articles],
  );

  const ensureCategoriesLoaded = useCallback(async (): Promise<WPCategory[]> => {
    if (categoriesRef.current.length > 0) return categoriesRef.current;
    const cats = await fetchCategories();
    categoriesRef.current = cats;
    setCategories(cats);
    return cats;
  }, []);

  const ensureSection = useCallback(
    async (section: SectionSlug) => {
      if (loadedSections.current.has(section)) return;
      loadedSections.current.add(section);
      try {
        const cats = await ensureCategoriesLoaded();
        const ids = categoryIdsForSection(cats, section);
        if (ids.length === 0) return;
        const posts = await fetchPosts({ categories: ids, perPage: 30 });
        const mapped = mapPostsToArticles(posts, cats);
        mergeArticles(mapped);
      } catch {
        loadedSections.current.delete(section);
      }
    },
    [ensureCategoriesLoaded, mergeArticles],
  );

  const ensureSlugs = useCallback(
    async (slugs: string[]) => {
      const fresh = slugs.filter((s) => !loadedSlugs.current.has(s));
      if (fresh.length === 0) return;
      fresh.forEach((s) => loadedSlugs.current.add(s));
      try {
        const cats = await ensureCategoriesLoaded();
        const ids = categoryIdsForSlugs(cats, fresh);
        if (ids.length === 0) return;
        const posts = await fetchPosts({ categories: ids, perPage: 30 });
        const mapped = mapPostsToArticles(posts, cats);
        mergeArticles(mapped);
      } catch {
        fresh.forEach((s) => loadedSlugs.current.delete(s));
      }
    },
    [ensureCategoriesLoaded, mergeArticles],
  );

  const value = useMemo<ArticlesContextValue>(
    () => ({
      articles,
      categories,
      status,
      error,
      refresh: () => load(),
      fetchArticleBySlug,
      ensureSection,
      ensureSlugs,
    }),
    [articles, categories, status, error, load, fetchArticleBySlug, ensureSection, ensureSlugs],
  );

  return <ArticlesContext.Provider value={value}>{children}</ArticlesContext.Provider>;
};
