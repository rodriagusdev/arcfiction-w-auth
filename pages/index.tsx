import type { NextPage, NextPageContext } from 'next';
import { getSession } from 'next-auth/react';
import { MovieCollection } from '../components';
import { Media } from '../types';
import { getDiscover, getTrending, getTopRated } from '../lib/tmdb';

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) return { redirect: { destination: '/auth', permanent: false } };

  if (context.res) {
    context.res.setHeader(
      'Cache-Control',
      'public, s-maxage=3600, stale-while-revalidate=86400'
    );
  }

  const [popular, trending, toprated] = await Promise.all([
    getDiscover('movie'),
    getTrending('all'),
    getTopRated('movie'),
  ]);

  return { props: { popular, trending, toprated } };
}

interface Props {
  popular: Media[];
  trending: Media[];
  toprated: Media[];
}

const Home: NextPage<Props> = ({ popular = [], trending = [], toprated = [] }) => {
  return (
    <main className="pb-24 sm:pb-12 max-w-7xl mx-auto flex flex-col gap-6 pt-4">
      <MovieCollection movies={trending} category="Trending" />

      <MovieCollection movies={popular} category="Popular" />

      <MovieCollection movies={toprated} category="Toprated" />
    </main>
  );
};

export default Home;
