import Link from 'next/link';
import UserProfile from './UserProfile';
import { useCurrentUser } from '../hooks';
import { useRouter } from 'next/router';
import { LoggedUser } from '../types';
import NavbarLinks from './NavbarLinks';

export default function Navbar() {
  const { data } = useCurrentUser();
  const user: LoggedUser = { name: data?.name, image: data?.image };

  const router = useRouter();
  const pathname = router.pathname;

  return (
    <>
      <header className="sticky top-0 w-full bg-customgray/95 backdrop-blur-md border-b border-zinc-800/80 z-[500] px-4 sm:px-8 h-[60px] flex items-center justify-between">
        <div className="flex items-center gap-6 md:gap-10">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-xl font-black tracking-wider text-white">
              ARC<span className="text-red-600 group-hover:text-red-500 transition-colors">Fiction</span>
            </span>
          </Link>

          {user.name && (
            <nav className="hidden sm:flex items-center">
              <ul className="flex gap-2 lg:gap-4 font-medium text-sm items-center">
                <NavbarLinks path={pathname} isMobile={false} />
              </ul>
            </nav>
          )}
        </div>

        {user.name ? (
          <UserProfile user={user} />
        ) : (
          <Link
            href="/auth"
            className="bg-red-600 hover:bg-red-700 text-white font-semibold text-xs sm:text-sm px-4 py-1.5 rounded-full transition-all shadow-md hover:shadow-red-600/30"
          >
            Sign In
          </Link>
        )}
      </header>

      {user.name && (
        <nav className="sm:hidden fixed bottom-0 left-0 right-0 bg-customgray/95 backdrop-blur-md border-t border-zinc-800/80 z-[500] h-[60px] flex items-center px-2">
          <ul className="w-full flex items-center justify-around">
            <NavbarLinks path={pathname} isMobile={true} />
          </ul>
        </nav>
      )}
    </>
  );
}
