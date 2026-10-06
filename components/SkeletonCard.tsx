import React from 'react';

interface SkeletonCardProps {
  style?: 'Trending' | 'Popular' | 'Toprated' | 'Recommended' | 'Grid';
}

export default function SkeletonCard({ style = 'Popular' }: SkeletonCardProps) {
  const stylesForCard = {
    Trending: 'h-[300px] w-full sm:w-[450px]',
    Popular: 'h-[250px] w-full sm:w-[290px]',
    Toprated: 'h-[210px] w-full sm:w-[190px]',
    Recommended: 'h-[210px] w-full sm:w-[190px]',
    Grid: 'h-[250px] w-[270px] sm:w-[250px]',
  };

  const cardStyle = stylesForCard[style] || stylesForCard.Popular;

  return (
    <div
      className={`${cardStyle} relative rounded-2xl bg-zinc-800/60 animate-pulse overflow-hidden border border-zinc-700/30 flex flex-col justify-end p-4`}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/90 via-zinc-900/30 to-transparent" />
      <div className="relative z-10 flex flex-col gap-2">
        <div className="h-4 bg-zinc-700/80 rounded w-3/4" />
        <div className="h-3 bg-zinc-700/50 rounded w-1/3" />
      </div>
    </div>
  );
}
