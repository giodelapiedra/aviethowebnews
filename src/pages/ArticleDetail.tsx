import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Container } from '@/components/common/Container';
import { ArticleCard } from '@/components/cards/ArticleCard';
import { NewsletterSection } from '@/components/sections/NewsletterSection';
import { LoadingShell, ErrorShell } from '@/components/common/LoadingShell';
import { useArticles } from '@/hooks/useArticles';
import { findBySlug, related } from '@/utils/articleHelpers';
import { formatDate, formatReadingTime } from '@/utils/formatDate';
import type { Article } from '@/types';
import { NotFound } from './NotFound';

export const ArticleDetail = () => {
  const { slug = '' } = useParams<{ slug: string }>();
  const { articles, status, fetchArticleBySlug } = useArticles();
  const [progress, setProgress] = useState(0);
  const [article, setArticle] = useState<Article | null>(() => findBySlug(articles, slug) ?? null);
  const [loadState, setLoadState] = useState<'idle' | 'loading' | 'missing' | 'error'>('idle');
  const [errMessage, setErrMessage] = useState<string | null>(null);

  useEffect(() => {
    const fromList = findBySlug(articles, slug);
    if (fromList) {
      setArticle(fromList);
      setLoadState('idle');
      return;
    }

    if (status === 'loading') {
      setLoadState('loading');
      return;
    }

    let cancelled = false;
    setLoadState('loading');
    fetchArticleBySlug(slug)
      .then((found) => {
        if (cancelled) return;
        if (!found) {
          setLoadState('missing');
          setArticle(null);
        } else {
          setArticle(found);
          setLoadState('idle');
        }
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setLoadState('error');
        setErrMessage(err instanceof Error ? err.message : 'Failed to load article.');
      });

    return () => {
      cancelled = true;
    };
  }, [slug, articles, status, fetchArticleBySlug]);

  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? Math.min(1, window.scrollY / total) : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [slug]);

  if (loadState === 'loading' && !article) {
    return <LoadingShell label="Loading the story…" />;
  }
  if (loadState === 'error' && !article) {
    return <ErrorShell message={errMessage ?? undefined} />;
  }
  if (loadState === 'missing') {
    return <NotFound />;
  }
  if (!article) return null;

  const relatedArticles = related(articles, article, 3);

  return (
    <>
      <div className="fixed left-0 right-0 top-0 z-[60] h-[2px] bg-transparent">
        <div
          className="h-full bg-gold-400"
          style={{ width: `${progress * 100}%`, transition: 'width 0.1s linear' }}
        />
      </div>

      <article className="relative -mt-[120px]">
        <header className="relative overflow-hidden bg-ink-950 pt-40 pb-20 text-bone-50">
          <div className="absolute inset-0">
            <img src={article.cover} alt="" className="h-full w-full object-cover opacity-40" />
            <div className="absolute inset-0 bg-gradient-to-b from-ink-950/70 via-ink-950/85 to-ink-950" />
          </div>

          <Container size="md" className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center gap-6 text-center"
            >
              <Link
                to={`/${article.section}`}
                className="eyebrow"
              >
                {article.categoryLabel}
              </Link>
              <h1 className="font-display text-display-xl text-bone-50 text-balance">
                {article.title}
              </h1>
              {article.dek && (
                <p className="max-w-2xl font-serif text-xl md:text-2xl italic text-bone-100/85 text-pretty">
                  {article.dek}
                </p>
              )}

              <div className="mt-4 flex flex-wrap items-center justify-center gap-6">
                <div className="flex items-center gap-3">
                  <img
                    src={article.author.avatar}
                    alt={article.author.name}
                    className="h-11 w-11 rounded-full object-cover ring-1 ring-bone-50/15"
                  />
                  <div className="flex flex-col items-start text-left">
                    <span className="text-sm font-medium text-bone-50">
                      {article.author.name}
                    </span>
                    <span className="text-[0.65rem] uppercase tracking-[0.25em] text-bone-200/55">
                      {article.author.role}
                    </span>
                  </div>
                </div>
                <span aria-hidden className="hidden h-8 w-px bg-bone-50/15 md:block" />
                <p className="text-[0.7rem] uppercase tracking-[0.22em] text-bone-200/70">
                  {formatDate(article.publishedAt)} · {formatReadingTime(article.readingTime)}
                </p>
              </div>
            </motion.div>
          </Container>
        </header>

        <Container size="sm" className="-mt-12 relative z-10">
          <motion.figure
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden bg-ink-800 shadow-editorial"
          >
            <img
              src={article.cover}
              alt={article.title}
              className="w-full object-cover aspect-[16/9]"
            />
            <figcaption className="px-6 py-4 text-[0.7rem] uppercase tracking-[0.25em] text-bone-200/55">
              Photograph for Avietho Digital · {article.author.name}
            </figcaption>
          </motion.figure>
        </Container>

        <Container size="sm" className="py-20">
          <div
            className="article-body font-read text-[1.15rem] md:text-[1.2rem] leading-[1.8] text-bone-100/95"
            dangerouslySetInnerHTML={{ __html: article.bodyHtml }}
          />

          <div className="hairline my-16" />

          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-bone-50/15 px-3 py-1 text-[0.65rem] uppercase tracking-[0.25em] text-bone-200/70"
                >
                  {tag}
                </span>
              ))}
            </div>
            <Link to="/" className="editorial-link text-sm uppercase tracking-[0.22em]">
              Back to the front page
            </Link>
          </div>

          {article.author.bio && (
            <div className="mt-16 flex items-start gap-6 rounded-sm border border-bone-50/10 bg-ink-900/40 p-8">
              <img
                src={article.author.avatar}
                alt={article.author.name}
                className="h-16 w-16 rounded-full object-cover ring-1 ring-bone-50/10"
              />
              <div className="flex flex-col gap-2">
                <span className="text-[0.65rem] uppercase tracking-[0.25em] text-gold-300">
                  About the writer
                </span>
                <h3 className="font-display text-2xl text-bone-50">
                  {article.author.name}
                </h3>
                <p className="font-serif italic text-bone-200/80">{article.author.bio}</p>
              </div>
            </div>
          )}
        </Container>

        {relatedArticles.length > 0 && (
          <section className="section-shell border-t border-bone-50/5">
            <Container size="xl">
              <div className="mb-12 flex items-end justify-between gap-6">
                <h2 className="font-display text-display-md text-bone-50 text-balance">
                  Read next.
                </h2>
                <Link to="/" className="editorial-link text-sm uppercase tracking-[0.22em]">
                  More from Avietho
                </Link>
              </div>
              <div className="grid gap-12 md:grid-cols-3">
                {relatedArticles.map((a) => (
                  <ArticleCard key={a.id} article={a} variant="compact" />
                ))}
              </div>
            </Container>
          </section>
        )}
      </article>

      <NewsletterSection />
    </>
  );
};

export default ArticleDetail;
