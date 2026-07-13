'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  
  const links = [
    { name: 'Home', href: '/' },
    { name: 'Explorador', href: '/experiences' },
    { name: 'Favoritos', href: '/favorites' },
    { name: 'Perfil', href: '/profile' },
  ];

  return (
    <nav className="sticky top-0 z-20 bg-white/90 backdrop-blur border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 py-4 flex gap-3 sm:gap-6 overflow-x-auto">
      {links.map((link) => {
        const isActive = link.href === '/'
          ? pathname === '/'
          : pathname === link.href || pathname.startsWith(`${link.href}/`);

        return (
          <Link 
            key={link.href} 
            href={link.href}
            className={`rounded-full px-3 py-2 whitespace-nowrap transition-colors ${
              isActive 
                ? 'font-bold text-white bg-emerald-600' 
                : 'text-slate-600 hover:text-emerald-700 hover:bg-emerald-50'
            }`}
          >
            {link.name}
          </Link>
        );
      })}
      </div>
    </nav>
  );
}