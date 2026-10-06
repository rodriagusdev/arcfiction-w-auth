import { Person } from '../types';
import Image from 'next/image';
import { getTmdbImageUrl } from '../lib/tmdb';

export default function PersonCard({ person }: { person: Person }) {
  if (!person || !person.profile_path) return null;

  const profileSrc = getTmdbImageUrl(person.profile_path, 'w500');

  return (
    <article className="w-[140px]">
      <div className="h-[140px] w-[140px] relative rounded-full border border-slate-400">
        <Image
          alt={person.name}
          fill={true}
          sizes="140px"
          className="opacity-90 p-1 object-cover object-top rounded-full -z-10"
          src={profileSrc}
        />
      </div>

      <h2 className="text-red-600 font-bold text-sm truncate max-w-[80%]">
        {person.name}
      </h2>

      <h3 className="text-[12px] text-white truncate">
        {person.character}
      </h3>

      <h3 className="text-[12px] text-white truncate">
        {person.known_for_department}
      </h3>
    </article>
  );
}
