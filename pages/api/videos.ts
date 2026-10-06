import { NextApiRequest, NextApiResponse } from 'next';
import { getVideos } from '../../lib/tmdb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { id, type } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'Valid media ID is required' });
  }

  const mediaType = type === 'movie' ? 'movie' : 'tv';

  try {
    res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=604800');
    const videos = await getVideos(mediaType, id);
    return res.status(200).json(videos);
  } catch (error) {
    console.error('Error fetching videos in API route:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
