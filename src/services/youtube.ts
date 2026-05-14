import type { YouTubeVideo } from '@/types';

export const AVIETHO_PLAYLIST_ID = 'PLZBlyg--Ps_5zoqp5Tn5vSt5lZK-aG5ep';

const RSS_FEED = (playlistId: string) =>
  `https://www.youtube.com/feeds/videos.xml?playlist_id=${playlistId}`;

const PROXY = (rssUrl: string) =>
  `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;

interface Rss2JsonItem {
  title: string;
  pubDate: string;
  link: string;
  guid: string;
  author: string;
  thumbnail: string;
  description?: string;
}

interface Rss2JsonResponse {
  status: 'ok' | 'error';
  message?: string;
  feed?: { title: string; link: string };
  items?: Rss2JsonItem[];
}

const extractVideoId = (guid: string, link: string): string => {
  const guidMatch = guid.match(/^yt:video:(.+)$/);
  if (guidMatch) return guidMatch[1];
  try {
    const url = new URL(link);
    const v = url.searchParams.get('v');
    if (v) return v;
    const segments = url.pathname.split('/').filter(Boolean);
    return segments[segments.length - 1] ?? '';
  } catch {
    return '';
  }
};

const upgradedThumbnail = (videoId: string, fallback: string): string =>
  videoId ? `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg` : fallback;

export const fetchPlaylistVideos = async (
  playlistId: string = AVIETHO_PLAYLIST_ID,
  signal?: AbortSignal,
): Promise<YouTubeVideo[]> => {
  const res = await fetch(PROXY(RSS_FEED(playlistId)), { signal });
  if (!res.ok) {
    throw new Error(`YouTube feed request failed: ${res.status}`);
  }
  const json = (await res.json()) as Rss2JsonResponse;
  if (json.status !== 'ok' || !json.items) {
    throw new Error(json.message ?? 'YouTube feed returned no items.');
  }
  return json.items.map((item): YouTubeVideo => {
    const videoId = extractVideoId(item.guid, item.link);
    const isShort = item.link.includes('/shorts/');
    return {
      id: videoId,
      title: item.title,
      link: item.link,
      publishedAt: item.pubDate,
      thumbnail: upgradedThumbnail(videoId, item.thumbnail),
      author: item.author,
      isShort,
    };
  });
};
