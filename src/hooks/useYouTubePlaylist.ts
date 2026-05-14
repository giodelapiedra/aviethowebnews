import { useEffect, useState } from 'react';
import { fetchPlaylistVideos, AVIETHO_PLAYLIST_ID } from '@/services/youtube';
import type { YouTubeVideo } from '@/types';

type Status = 'loading' | 'ready' | 'error';

export interface UseYouTubePlaylistResult {
  videos: YouTubeVideo[];
  status: Status;
  error: string | null;
}

export const useYouTubePlaylist = (
  playlistId: string = AVIETHO_PLAYLIST_ID,
): UseYouTubePlaylistResult => {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [status, setStatus] = useState<Status>('loading');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    setStatus('loading');
    setError(null);
    fetchPlaylistVideos(playlistId, controller.signal)
      .then((list) => {
        setVideos(list);
        setStatus('ready');
      })
      .catch((err: unknown) => {
        if ((err as { name?: string }).name === 'AbortError') return;
        setError(err instanceof Error ? err.message : 'Failed to load videos.');
        setStatus('error');
      });
    return () => controller.abort();
  }, [playlistId]);

  return { videos, status, error };
};
