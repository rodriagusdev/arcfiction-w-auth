import { NextApiRequest, NextApiResponse } from 'next';
import { getDiscover, getTopRated, getTrending } from '../../../lib/tmdb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { page = 'main' } = req.query;

  try {
    if (page === 'tv') {
      const [discover, trending, toprated] = await Promise.all([
        getDiscover('tv'),
        getTrending('tv'),
        getTopRated('tv'),
      ]);
      return res.status(200).json({ discover, trending, toprated });
    }

    if (page === 'movie') {
      const [discover, trending, toprated] = await Promise.all([
        getDiscover('movie'),
        getTrending('movie'),
        getTopRated('movie'),
      ]);
      return res.status(200).json({ discover, trending, toprated });
    }

    const [discover, trending, toprated] = await Promise.all([
      getDiscover('movie'),
      getTrending('all'),
      getTopRated('movie'),
    ]);
    return res.status(200).json({ discover, trending, toprated });
  } catch (error) {
    console.error('Error in /api/data/requests:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
