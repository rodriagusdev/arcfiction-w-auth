import type { NextPage, GetServerSideProps } from 'next';
import MainVideo from '../components/MainVideo';
import { MovieCollection } from '../components';
import { Media } from '../types';
import { getDiscover, getTrending, getTopRated } from '../lib/tmdb';

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (context.res) {
    context.res.setHeader(
      'Cache-Control',
      'public, s-maxage=3600, stale-while-revalidate=86400'
    );
  }

  const [popular, trending, toprated] = await Promise.all([
    getDiscover('tv'),
    getTrending('tv'),
    getTopRated('tv'),
  ]);

  return { props: { popular, trending, toprated } };
};

interface Props {
  popular: Media[];
  trending: Media[];
  toprated: Media[];
}

const TVShows: NextPage<Props> = ({ popular = [], trending = [], toprated = [] }) => {
  const randomVideo = toprated.length > 0 ? Math.floor(Math.random() * toprated.length) : 0;
  const video = toprated[randomVideo]?.id;

  return (
    <main className="pb-24 sm:pb-12 max-w-7xl mx-auto flex flex-col gap-6 pt-4">
      <MainVideo media={video} type="tv" />

      <MovieCollection movies={trending} category="Trending" />

      <MovieCollection movies={popular} category="Popular" />

      <MovieCollection movies={toprated} category="Toprated" />
    </main>
  );
};

export default TVShows;
