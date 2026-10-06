import React from 'react';
import SkeletonCard from './SkeletonCard';

interface SkeletonCollectionProps {
  category: 'Trending' | 'Popular' | 'Toprated' | 'Recommended';
}

export default function SkeletonCollection({ category }: SkeletonCollectionProps) {
  const formatCategory = category === 'Trending' ? 'Trending This Week' : category;

  return (
    <section className="relative flex flex-col my-4">
      <h2 className="font-bold text-center sm:text-left text-xl text-slate-300 mb-3 mx-5">
        {formatCategory}
      </h2>
      <div className="flex gap-5 px-5 overflow-hidden">
        {[1, 2, 3, 4, 5].map((item) => (
          <SkeletonCard key={item} style={category} />
        ))}
      </div>
    </section>
  );
}
