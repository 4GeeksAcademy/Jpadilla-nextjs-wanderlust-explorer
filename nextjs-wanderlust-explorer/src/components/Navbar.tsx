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
    <nav className="flex gap-4 p-4 border-b">
      {links.map((link) => (
        <Link 
          key={link.href} 
          href={link.href}
          className={pathname === link.href ? 'font-bold text-blue-600' : ''}
        >
          {link.name}
        </Link>
      ))}
    </nav>
  );
}
// Dentro de tu Navbar.tsx
const pathname = usePathname();
// ...
<Link 
  href="/experiences" 
  className={pathname === '/experiences' ? 'border-b-2 border-blue-500' : ''}
>
  Explorador
</Link>