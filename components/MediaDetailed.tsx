import Link from 'next/link';
import Image from 'next/image';
import MovieCollection from './MovieCollection';
import PersonCollection from './PersonCollection';
import FavoriteButton from './FavoriteButton';
import { MediaDetails } from '../types';
import { getTmdbImageUrl } from '../lib/tmdb';

export default function MediaDetailed({ media }: { media: MediaDetails }) {
  const backdrops = media?.images?.backdrops || [];
  const randomBg = backdrops.length > 0 ? Math.floor(Math.random() * backdrops.length) : 0;
  const backgroundPath = backdrops[randomBg]?.file_path || media?.backdrop_path || media?.poster_path || '';
  const backgroundUrl = getTmdbImageUrl(backgroundPath, 'w1280');

  const similar = media?.recommendations?.results || [];
  const cast = media?.credits?.cast || [];
  const isTvShow = Array.isArray(media?.seasons) && media.seasons.length > 0;

  const posterPath = media?.poster_path || backgroundPath;
  const posterSrc = getTmdbImageUrl(posterPath, 'w500');
  const title = media?.name || media?.title || 'Untitled';
  const releaseYear = media?.release_date ? new Date(media.release_date).getFullYear() : null;

  return (
    <main className="min-h-screen pb-24 sm:pb-12">
      {/* Hero Section with Ambient Backdrop */}
      <section className="relative overflow-hidden w-full bg-gradient-to-b from-zinc-950/80 via-zinc-900/90 to-zinc-950 px-4 sm:px-8 md:px-16 py-8 md:py-14 border-b border-zinc-800/80">
        {/* Background Image Ambient Glow */}
        {backgroundUrl && (
          <div className="absolute inset-0 -z-10 overflow-hidden opacity-20 filter blur-sm">
            <Image
              alt={title}
              fill
              sizes="100vw"
              className="object-cover object-center scale-105"
              src={backgroundUrl}
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent" />
          </div>
        )}

        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12">
          {/* Poster Image */}
          {posterSrc && (
            <div className="w-[240px] sm:w-[280px] md:w-[340px] flex-shrink-0 aspect-[2/3] relative rounded-2xl overflow-hidden shadow-2xl border border-zinc-700/60">
              <Image
                alt={title}
                fill
                sizes="(max-width: 768px) 280px, 340px"
                className="object-cover"
                src={posterSrc}
                priority
              />
            </div>
          )}

          {/* Details & Metadata */}
          <div className="flex-1 flex flex-col gap-4 text-center md:text-left">
            <div>
              {media.homepage ? (
                <Link href={media.homepage} target="_blank" rel="noopener noreferrer">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white hover:text-red-500 transition-colors">
                    {title} {releaseYear && <span className="text-zinc-500 font-normal text-2xl sm:text-3xl">({releaseYear})</span>}
                  </h1>
                </Link>
              ) : (
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white">
                  {title} {releaseYear && <span className="text-zinc-500 font-normal text-2xl sm:text-3xl">({releaseYear})</span>}
                </h1>
              )}

              {/* Genre and Runtime Pills */}
              {Array.isArray(media.genres) && media.genres.length > 0 && (
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mt-3">
                  {media.genres.map((genre) => (
                    <span
                      key={genre.name}
                      className="px-3 py-1 bg-zinc-800/80 border border-zinc-700/60 rounded-full text-xs font-semibold text-blue-400"
                    >
                      {genre.name}
                    </span>
                  ))}
                  {media.runtime && (
                    <span className="px-3 py-1 bg-zinc-800/80 border border-zinc-700/60 rounded-full text-xs font-medium text-zinc-300">
                      ⏱ {media.runtime}m
                    </span>
                  )}
                  {media.status && (
                    <span className="px-3 py-1 bg-red-950/60 border border-red-800/60 rounded-full text-xs font-bold text-red-400">
                      {media.status}
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Score & Actions */}
            <div className="flex items-center justify-center md:justify-start gap-4 py-2">
              {typeof media.vote_average === 'number' && (
                <div className="flex items-center gap-2 bg-black/60 border border-zinc-800 px-3.5 py-1.5 rounded-full">
                  <span className="text-yellow-400 font-bold">★</span>
                  <span className="text-white font-bold text-sm">
                    {(media.vote_average * 10).toFixed(0)}% Score
                  </span>
                  {media.vote_count && (
                    <span className="text-zinc-500 text-xs">({media.vote_count} votes)</span>
                  )}
                </div>
              )}

              <FavoriteButton media={media} />
            </div>

            {/* Overview */}
            {media.overview && (
              <div className="flex flex-col gap-2 mt-2">
                <h2 className="text-lg font-bold text-zinc-200">Overview</h2>
                <p className="text-zinc-300 text-sm sm:text-base leading-relaxed max-w-3xl">
                  {media.overview}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Cast Section */}
      {cast.length > 0 && (
        <section className="mt-10 max-w-7xl mx-auto">
          <PersonCollection cast={cast} />
        </section>
      )}

      {/* TV Seasons Section */}
      {isTvShow && (
        <section className="mt-12 px-4 sm:px-10 max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6 border-b border-zinc-800 pb-2">
            Seasons ({media.seasons?.length})
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {media.seasons?.map((season) => (
              <article
                key={season.id}
                className="flex items-center gap-4 bg-zinc-900/70 border border-zinc-800/80 rounded-xl p-3 hover:border-zinc-700 transition"
              >
                {season.poster_path ? (
                  <div className="w-20 h-28 relative rounded-lg overflow-hidden flex-shrink-0 bg-zinc-800">
                    <Image
                      alt={season.name}
                      fill
                      sizes="80px"
                      className="object-cover"
                      src={getTmdbImageUrl(season.poster_path, 'w500')}
                    />
                  </div>
                ) : (
                  <div className="w-20 h-28 rounded-lg bg-zinc-800 flex items-center justify-center text-xs text-zinc-500 flex-shrink-0">
                    No Poster
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-bold text-white truncate">{season.name}</h3>
                  <p className="text-xs text-red-500 font-semibold mt-0.5">
                    {season.episode_count} Episodes {season.air_date ? `• ${season.air_date}` : ''}
                  </p>
                  {season.overview && (
                    <p className="text-xs text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
                      {season.overview}
                    </p>
                  )}
                </div>
              </article>
            ))}
          </div>

          {/* Networks */}
          {Array.isArray(media.networks) && media.networks.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-bold text-zinc-300 mb-3">Networks</h3>
              <div className="flex flex-wrap gap-4 items-center">
                {media.networks.map((network) => (
                  <div
                    key={network.id}
                    className="flex items-center gap-2 bg-zinc-900/80 border border-zinc-800 px-3 py-1.5 rounded-lg"
                  >
                    {network.logo_path && (
                      <div className="w-8 h-8 relative flex-shrink-0">
                        <Image
                          alt={network.name}
                          fill
                          sizes="32px"
                          className="object-contain"
                          src={getTmdbImageUrl(network.logo_path, 'w500')}
                        />
                      </div>
                    )}
                    <span className="text-xs font-semibold text-zinc-200">{network.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {/* Recommendations */}
      {similar.length > 0 && (
        <section className="mt-12 max-w-7xl mx-auto">
          <MovieCollection movies={similar} category="Recommended" />
        </section>
      )}
    </main>
  );
}
