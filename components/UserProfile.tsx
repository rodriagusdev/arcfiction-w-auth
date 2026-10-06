import { signOut } from 'next-auth/react';
import { LoggedUser } from '../types';
import defaultAvatar from '../public/images/default-slate.webp';
import Image from 'next/image';

export default function UserProfile({ user }: { user: LoggedUser }) {
  const profileImage =
    user?.image === '' || user?.image === undefined
      ? defaultAvatar.src
      : user.image;

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2">
        <div className="relative w-8 h-8 rounded-full overflow-hidden border border-zinc-700">
          <Image
            className="object-cover"
            src={profileImage}
            fill
            sizes="32px"
            alt={user.name || 'Avatar'}
          />
        </div>
        {user.name && (
          <span className="font-semibold text-sm text-zinc-200 hidden md:inline truncate max-w-[120px]">
            {user.name}
          </span>
        )}
      </div>

      <button
        className="bg-red-600/90 hover:bg-red-600 transition-all text-white text-xs sm:text-sm font-semibold px-3 sm:px-4 py-1.5 rounded-full shadow hover:shadow-red-600/30"
        onClick={() => signOut()}
      >
        Sign Out
      </button>
    </div>
  );
}
