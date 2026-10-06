import { NextPage, NextPageContext } from 'next';
import { getSession } from 'next-auth/react';
import { useFavorites } from '../hooks';
import { FavoriteMedia } from '../types';
import FavoritedMedia from '../components/FavoritedMedia';
import SkeletonCard from '../components/SkeletonCard';
import Link from 'next/link';

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    };
  }

  return { props: {} };
}

const MyList: NextPage = () => {
  const { data, isLoading } = useFavorites();

  const favorites: FavoriteMedia[] = data || [];

  return (
    <div className="min-h-[80vh] px-4 py-8">
      <h1 className="text-3xl font-bold text-white text-center mb-8">My Favorites List</h1>

      {isLoading ? (
        <div className="flex flex-col sm:flex-row flex-wrap gap-10 sm:p-10 justify-center items-center">
          {[1, 2, 3, 4].map((i) => (
            <SkeletonCard key={i} style="Grid" />
          ))}
        </div>
      ) : favorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center mt-20 gap-4">
          <p className="text-xl text-zinc-400">You haven&apos;t added any movies or TV shows to your list yet.</p>
          <Link
            href="/"
            className="px-6 py-2 bg-red-600 text-white rounded-full font-medium hover:bg-red-700 transition"
          >
            Explore Titles
          </Link>
        </div>
      ) : (
        <ul className="flex flex-col sm:flex-row flex-wrap gap-10 sm:p-10 justify-center items-center">
          {favorites.map((media) => (
            <FavoritedMedia media={media} key={media.media_id} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyList;
