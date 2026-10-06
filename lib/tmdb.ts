import axios from 'axios';
import { Media, MediaDetails, Video } from '../types';

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

export const getTmdbApiKey = (): string => {
  return (
    process.env.TMDB_API_KEY ||
    process.env.NEXT_PUBLIC_API_KEY ||
    ''
  );
};

export const tmdbClient = axios.create({
  baseURL: TMDB_BASE_URL,
  params: {
    language: 'en-US',
  },
});

tmdbClient.interceptors.request.use((config) => {
  const apiKey = getTmdbApiKey();
  config.params = {
    ...config.params,
    api_key: apiKey,
  };
  return config;
});

export const getTmdbImageUrl = (
  path: string | null | undefined,
  size: 'w500' | 'w1280' | 'original' = 'w500'
): string => {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
};

export const getMovieDetails = async (id: string | number): Promise<MediaDetails | null> => {
  try {
    const res = await tmdbClient.get<MediaDetails>(`/movie/${id}`, {
      params: {
        append_to_response: 'recommendations,images,credits',
        include_image_language: 'en,null',
      },
    });
    return res.data;
  } catch (error: any) {
    console.error(`[TMDB] Error fetching movie ${id}:`, error?.response?.status || error?.message);
    return null;
  }
};

export const getTvShowDetails = async (id: string | number): Promise<MediaDetails | null> => {
  try {
    const res = await tmdbClient.get<MediaDetails>(`/tv/${id}`, {
      params: {
        append_to_response: 'recommendations,images,credits',
        include_image_language: 'en,null',
      },
    });
    return res.data;
  } catch (error: any) {
    console.error(`[TMDB] Error fetching TV show ${id}:`, error?.response?.status || error?.message);
    return null;
  }
};

export const getTrending = async (
  mediaType: 'movie' | 'tv' | 'all' = 'all',
  timeWindow: 'day' | 'week' = 'week'
): Promise<Media[]> => {
  try {
    const res = await tmdbClient.get<{ results: Media[] }>(`/trending/${mediaType}/${timeWindow}`);
    return res.data.results || [];
  } catch (error: any) {
    console.error(`[TMDB] Error fetching trending ${mediaType}:`, error?.response?.status || error?.message);
    return [];
  }
};

export const getTopRated = async (mediaType: 'movie' | 'tv'): Promise<Media[]> => {
  try {
    const res = await tmdbClient.get<{ results: Media[] }>(`/${mediaType}/top_rated`);
    return res.data.results || [];
  } catch (error: any) {
    console.error(`[TMDB] Error fetching top rated ${mediaType}:`, error?.response?.status || error?.message);
    return [];
  }
};

export const getDiscover = async (mediaType: 'movie' | 'tv'): Promise<Media[]> => {
  try {
    const res = await tmdbClient.get<{ results: Media[] }>(`/discover/${mediaType}`, {
      params: {
        sort_by: 'popularity.desc',
        include_adult: false,
        include_video: false,
        page: 1,
      },
    });
    return res.data.results || [];
  } catch (error: any) {
    console.error(`[TMDB] Error fetching discover ${mediaType}:`, error?.response?.status || error?.message);
    return [];
  }
};

export const getVideos = async (
  mediaType: 'movie' | 'tv',
  id: string | number
): Promise<Video[]> => {
  try {
    const res = await tmdbClient.get<{ results: Video[] }>(`/${mediaType}/${id}/videos`);
    return res.data.results || [];
  } catch (error: any) {
    console.error(`[TMDB] Error fetching videos for ${mediaType}/${id}:`, error?.response?.status || error?.message);
    return [];
  }
};
