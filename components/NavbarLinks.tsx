import Link from 'next/link';

interface NavbarLinksProps {
  path: string;
  isMobile?: boolean;
}

export default function NavbarLinks({ path, isMobile = false }: NavbarLinksProps) {
  const links = [
    { href: '/', label: 'Home', icon: '🏠' },
    { href: '/movies', label: 'Movies', icon: '🎬' },
    { href: '/tvshows', label: 'TV Shows', icon: '📺' },
    { href: '/mylist', label: 'My List', icon: '⭐' },
  ];

  if (isMobile) {
    return (
      <>
        {links.map((link) => {
          const isActive = path === link.href;
          return (
            <li key={link.href} className="flex-1 text-center">
              <Link
                href={link.href}
                className={`flex flex-col items-center justify-center py-1.5 px-2 transition-all ${
                  isActive
                    ? 'text-red-500 font-bold scale-105'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <span className="text-base">{link.icon}</span>
                <span className="text-[11px] mt-0.5">{link.label}</span>
              </Link>
            </li>
          );
        })}
      </>
    );
  }

  return (
    <>
      {links.slice(1).map((link) => {
        const isActive = path === link.href;
        return (
          <li key={link.href}>
            <Link
              href={link.href}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                isActive
                  ? 'text-white bg-zinc-800/80 shadow-inner'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800/40'
              }`}
            >
              {link.label}
            </Link>
          </li>
        );
      })}
    </>
  );
}
