import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Container } from '@/components/common/Container';
import { useYouTubePlaylist } from '@/hooks/useYouTubePlaylist';
import { AVIETHO_PLAYLIST_ID } from '@/services/youtube';
import { formatDate } from '@/utils/formatDate';
import { cn } from '@/utils/cn';

const PLAYLIST_URL = `https://www.youtube.com/playlist?list=${AVIETHO_PLAYLIST_ID}`;
const ease = [0.22, 1, 0.36, 1] as const;

export const WatchSection = () => {
  const { videos, status, error } = useYouTubePlaylist();
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (!activeId && videos.length > 0) {
      setActiveId(videos[0].id);
    }
  }, [activeId, videos]);

  const active = videos.find((v) => v.id === activeId) ?? videos[0] ?? null;
  const others = videos.filter((v) => v.id !== active?.id);

  const embedUrl = active
    ? `https://www.youtube.com/embed/${active.id}?list=${AVIETHO_PLAYLIST_ID}&rel=0`
    : `https://www.youtube.com/embed/videoseries?list=${AVIETHO_PLAYLIST_ID}`;

  return (
    <section
      id="watch"
      className="section-shell relative overflow-hidden border-y border-bone-50/10 bg-ink-900/30"
    >
      <div className="pointer-events-none absolute -left-32 top-12 hidden select-none lg:block">
        <span className="vertical-tag font-mono text-[0.7rem] uppercase text-bone-200/40">
          Avietho · On Air · Volume VII
        </span>
      </div>
      <div className="pointer-events-none absolute -bottom-24 right-[-6%] select-none">
        <span className="font-display text-stroke-bone text-[16rem] md:text-[22rem] leading-none tracking-[-0.05em] opacity-[0.06]">
          Watch
        </span>
      </div>

      <Container size="xl" className="relative">
        <div className="mb-14 grid items-end gap-8 border-b border-bone-50/15 pb-10 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <p className="eyebrow mb-6">Avietho · On Air</p>
            <h2 className="font-display text-display-xl text-bone-50 leading-[0.95] text-balance">
              Informative — <br />
              <em className="font-serif italic font-normal text-gold-300">on screen</em>.
            </h2>
          </div>
          <div className="flex flex-col gap-4 lg:pb-2">
            <p className="max-w-md font-serif text-xl italic text-bone-200/80 text-pretty">
              Explainers, conversations, and quick takes from the desk. Auto-updated from our
              YouTube channel — tap any tile to watch it inline.
            </p>
            <a
              href={PLAYLIST_URL}
              target="_blank"
              rel="noreferrer"
              className="arrow-link self-start text-sm text-bone-50 hover:text-gold-300"
            >
              Open the full playlist
              <svg viewBox="0 0 24 8" fill="none" stroke="currentColor" strokeWidth="1.2">
                <path d="M0 4h22M18 1l4 3-4 3" />
              </svg>
            </a>
          </div>
        </div>

        {status === 'loading' && (
          <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
            <div className="aspect-video animate-pulse bg-bone-50/5" />
            <div className="flex flex-col gap-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-24 animate-pulse bg-bone-50/5" />
              ))}
            </div>
          </div>
        )}

        {status === 'error' && (
          <div className="flex flex-col items-start gap-4 border border-crimson-300/30 bg-crimson-400/5 p-8">
            <p className="text-[0.65rem] uppercase tracking-[0.3em] text-crimson-200">
              The Wire · Video Feed Offline
            </p>
            <p className="font-serif italic text-bone-100/85 text-pretty max-w-xl">
              We could not reach the playlist right now. {error}
            </p>
            <a
              href={PLAYLIST_URL}
              target="_blank"
              rel="noreferrer"
              className="arrow-link text-sm text-bone-50 hover:text-gold-300"
            >
              Watch on YouTube instead
              <svg viewBox="0 0 24 8" fill="none" stroke="currentColor" strokeWidth="1.2">
                <path d="M0 4h22M18 1l4 3-4 3" />
              </svg>
            </a>
          </div>
        )}

        {status === 'ready' && active && (
          <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:gap-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease }}
              className="flex flex-col gap-6"
            >
              <div className="relative">
                <div className="pointer-events-none absolute -inset-3 -z-10 bg-gradient-to-tr from-gold-400/10 via-transparent to-crimson-400/10 blur-2xl" />
                <div className="relative aspect-video overflow-hidden ring-1 ring-bone-50/10 bg-ink-950 shadow-editorial">
                  <iframe
                    key={active.id}
                    src={embedUrl}
                    title={active.title}
                    className="absolute inset-0 h-full w-full"
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    referrerPolicy="strict-origin-when-cross-origin"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-3 border-l border-gold-400/40 pl-6">
                <div className="flex flex-wrap items-center gap-3 text-[0.6rem] uppercase tracking-[0.3em] text-bone-200/55">
                  <span className="text-gold-300">Now Playing</span>
                  <span aria-hidden className="text-bone-200/25">·</span>
                  <span>{formatDate(active.publishedAt)}</span>
                  {active.isShort && (
                    <>
                      <span aria-hidden className="text-bone-200/25">·</span>
                      <span className="rounded-full border border-crimson-300/40 px-2 py-0.5 text-crimson-100">
                        Short
                      </span>
                    </>
                  )}
                </div>
                <h3 className="font-display text-2xl md:text-[1.7rem] leading-[1.15] text-bone-50 text-balance">
                  {active.title}
                </h3>
                <p className="text-[0.65rem] uppercase tracking-[0.3em] text-bone-200/55">
                  {active.author}
                </p>
              </div>
            </motion.div>

            <div className="flex flex-col gap-2">
              <p className="mb-2 text-[0.6rem] uppercase tracking-[0.3em] text-bone-200/50">
                The Playlist · {videos.length} videos
              </p>
              <div className="flex max-h-[640px] flex-col gap-2 overflow-y-auto pr-2 [scrollbar-width:thin]">
                {[active, ...others].map((video, index) => {
                  const isActive = video.id === active.id;
                  return (
                    <button
                      key={video.id}
                      type="button"
                      onClick={() => setActiveId(video.id)}
                      className={cn(
                        'group grid grid-cols-[136px_1fr] items-start gap-4 border border-transparent p-3 text-left transition-colors',
                        isActive
                          ? 'bg-bone-50/5 border-gold-400/40'
                          : 'hover:bg-bone-50/[0.03] hover:border-bone-50/10',
                      )}
                    >
                      <div className="relative aspect-video overflow-hidden bg-ink-800">
                        <img
                          src={video.thumbnail}
                          alt=""
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.08]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/60 via-transparent to-transparent" />
                        <span
                          className={cn(
                            'absolute inset-0 grid place-items-center transition-opacity duration-300',
                            isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100',
                          )}
                          aria-hidden
                        >
                          <span className="grid h-9 w-9 place-items-center rounded-full bg-gold-400 text-ink-950">
                            ▶
                          </span>
                        </span>
                        <span className="absolute left-2 top-2 font-display text-sm text-bone-50/90">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        {video.isShort && (
                          <span className="absolute right-2 bottom-2 rounded-full bg-crimson-400/90 px-1.5 py-0.5 text-[0.55rem] uppercase tracking-[0.2em] text-bone-50">
                            Short
                          </span>
                        )}
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <span
                          className={cn(
                            'text-[0.6rem] uppercase tracking-[0.3em]',
                            isActive ? 'text-gold-300' : 'text-bone-200/55',
                          )}
                        >
                          {formatDate(video.publishedAt)}
                        </span>
                        <h4
                          className={cn(
                            'font-display text-base leading-[1.2] text-balance transition-colors line-clamp-3',
                            isActive ? 'text-gold-200' : 'text-bone-50 group-hover:text-gold-200',
                          )}
                        >
                          {video.title}
                        </h4>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </Container>
    </section>
  );
};
