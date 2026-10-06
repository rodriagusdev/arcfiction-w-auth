import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '../../lib/prismadb';
import serverAuth from '../../lib/serverAuth';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === 'POST') {
      const { media } = req.body;

      if (!media?.id) {
        return res.status(400).json({ error: 'Media object with id is required' });
      }

      const { currentUser } = await serverAuth(req, res);

      const existingMedia = await prismadb.media.findUnique({
        where: {
          media_id: media.id.toString(),
        },
      });

      if (existingMedia) {
        return res.status(200).json(existingMedia);
      }

      const sendMedia = await prismadb.media.create({
        data: {
          media_id: media.id.toString(),
          title: media.name ? media.name : media.title || 'Untitled',
          poster: media.poster_path || '',
          type: media.name ? 'tvshow' : 'movie',
          userId: currentUser.id,
        },
      });

      return res.status(200).json(sendMedia);
    }

    return res.status(405).end();
  } catch (error) {
    console.log(error);

    return res.status(500).end();
  }
}
