import { NextPage, GetServerSideProps } from 'next';
import { MediaDetails } from '../../types';
import { MediaDetailed } from '../../components';
import { getMovieDetails } from '../../lib/tmdb';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const mediaId = context.params?.id || context.query.id;

  if (!mediaId || Array.isArray(mediaId)) {
    return { notFound: true };
  }

  if (context.res) {
    context.res.setHeader(
      'Cache-Control',
      'public, s-maxage=3600, stale-while-revalidate=86400'
    );
  }

  const media = await getMovieDetails(mediaId);

  if (!media) {
    return { notFound: true };
  }

  return {
    props: {
      media,
    },
  };
};

interface Props {
  media: MediaDetails;
}

const MoviePage: NextPage<Props> = ({ media }) => {
  if (!media) return null;
  return <MediaDetailed media={media} />;
};

export default MoviePage;
