import Image from 'next/image';
import { Media } from '../types';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import { getTmdbImageUrl } from '../lib/tmdb';

interface Props {
  movie: Media;
  style: 'Trending' | 'Popular' | 'Toprated' | 'Recommended';
}

export default function Movie({ movie, style }: Props) {
  const router = useRouter();

  if (!movie) return null;

  const stylesForCard = {
    Trending: 'w-[280px] sm:w-[380px] md:w-[440px] h-[220px] sm:h-[260px]',
    Popular: 'w-[180px] sm:w-[220px] md:w-[260px] h-[260px] sm:h-[320px]',
    Toprated: 'w-[150px] sm:w-[180px] md:w-[200px] h-[230px] sm:h-[280px]',
    Recommended: 'w-[150px] sm:w-[180px] md:w-[200px] h-[230px] sm:h-[280px]',
  };

  const cardDimensions = stylesForCard[style] || stylesForCard.Popular;
  const isBackdropPreferred = style === 'Trending';
  const imagePath = isBackdropPreferred
    ? movie.backdrop_path || movie.poster_path
    : movie.poster_path || movie.backdrop_path;
  const imageSrc = getTmdbImageUrl(imagePath, 'w500');
  const title = movie.name || movie.title || 'Untitled';

  const handleRedirect = () => {
    toast.loading('Loading title...');
    router.push(`/${movie.name ? 'tvshow' : 'movie'}/${movie.id}`);
  };

  return (
    <article
      onClick={handleRedirect}
      className={`${cardDimensions} flex-shrink-0 relative group rounded-2xl overflow-hidden cursor-pointer bg-zinc-900 border border-zinc-800/80 hover:border-red-600/70 shadow-lg hover:shadow-red-600/20 transition-all duration-300 transform hover:-translate-y-1`}
    >
      {imageSrc ? (
        <Image
          alt={title}
          fill
          sizes="(max-width: 768px) 280px, 440px"
          className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          src={imageSrc}
        />
      ) : (
        <div className="w-full h-full bg-zinc-800 flex items-center justify-center text-zinc-500 text-xs">
          No Image
        </div>
      )}

      {/* Cinematic gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent group-hover:from-black/95 group-hover:via-black/50 transition-colors" />

      {/* Badge: Vote Average */}
      {typeof movie.vote_average === 'number' && movie.vote_average > 0 && (
        <div className="absolute top-2.5 right-2.5 z-10 bg-black/70 backdrop-blur-md border border-zinc-700/60 px-2 py-0.5 rounded-full flex items-center gap-1 shadow">
          <span className="text-yellow-400 text-xs">★</span>
          <span className="text-white text-xs font-bold">{movie.vote_average.toFixed(1)}</span>
        </div>
      )}

      {/* Content footer */}
      <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 z-10 flex flex-col justify-end">
        <h2 className="text-white font-bold text-sm sm:text-base line-clamp-1 group-hover:text-red-400 transition-colors">
          {title}
        </h2>

        <div className="flex items-center justify-between mt-2 pt-1 border-t border-white/10 opacity-90 group-hover:opacity-100">
          <span className="text-[11px] sm:text-xs text-zinc-300 font-medium">
            {movie.name ? 'TV Series' : 'Movie'}
          </span>
          <span className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-bold text-red-500 group-hover:translate-x-0.5 transition-transform">
            Watch Now →
          </span>
        </div>
      </div>
    </article>
  );
}
