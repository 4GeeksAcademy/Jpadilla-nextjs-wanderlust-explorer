// src/app/layout.tsx
import { FavoritesProvider } from '@/context/FavoritesContext';
import Navbar from '@/components/Navbar';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <FavoritesProvider>
          <Navbar />
          <main>{children}</main>
        </FavoritesProvider>
      </body>
    </html>
  );
}