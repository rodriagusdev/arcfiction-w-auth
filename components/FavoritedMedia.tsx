import { useRouter } from 'next/router';
import { FavoriteMedia } from '../types';
import Image from 'next/image';
import { getTmdbImageUrl } from '../lib/tmdb';

export default function FavoritedMedia({ media }: { media: FavoriteMedia }) {
  const router = useRouter();

  if (!media) return null;

  const posterSrc = getTmdbImageUrl(media.poster, 'w500');

  const handleRedirect = () => {
    router.push(`/${media.type === 'tvshow' ? 'tvshow' : 'movie'}/${media.media_id}`);
  };

  return (
    <article
      onClick={handleRedirect}
      className="w-[260px] sm:w-[280px] h-[360px] relative group rounded-2xl overflow-hidden cursor-pointer bg-zinc-900 border border-zinc-800/80 hover:border-red-600/70 shadow-lg hover:shadow-red-600/20 transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col justify-end"
    >
      {posterSrc ? (
        <Image
          alt={media.title || 'Media'}
          fill={true}
          sizes="280px"
          className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          src={posterSrc}
        />
      ) : (
        <div className="w-full h-full bg-zinc-800 flex items-center justify-center text-zinc-500 text-xs">
          No Image
        </div>
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent group-hover:from-black/95 group-hover:via-black/50 transition-colors" />

      {/* Badge: Media Type */}
      <div className="absolute top-3 right-3 z-10 bg-black/70 backdrop-blur-md border border-zinc-700/60 px-2.5 py-0.5 rounded-full text-[11px] font-bold text-zinc-200 uppercase tracking-wider">
        {media.type === 'tvshow' ? 'TV Show' : 'Movie'}
      </div>

      {/* Content */}
      <div className="relative z-10 p-4 flex flex-col gap-2">
        <h2 className="text-white font-bold text-base line-clamp-1 group-hover:text-red-400 transition-colors">
          {media.title}
        </h2>

        <div className="flex items-center justify-between pt-2 border-t border-white/10">
          <span className="text-xs text-zinc-400">Favorited</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleRedirect();
            }}
            className="bg-red-600 hover:bg-red-700 text-white text-xs font-semibold px-3 py-1 rounded-full transition-all shadow hover:shadow-red-600/30"
          >
            Watch Now
          </button>
        </div>
      </div>
    </article>
  );
}
