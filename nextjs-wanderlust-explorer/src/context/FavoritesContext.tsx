'use client';
import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from 'react';

const FavoritesContext = createContext<{
  favorites: string[];
  toggleFavorite: (id: string) => void;
} | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const rawFavorites = window.localStorage.getItem('wanderlust-favorites');
    if (!rawFavorites) return;

    try {
      const parsed = JSON.parse(rawFavorites) as string[];
      if (Array.isArray(parsed)) {
        setFavorites(parsed);
      }
    } catch {
      // Ignore invalid persisted state.
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem('wanderlust-favorites', JSON.stringify(favorites));
  }, [favorites]);

  const value = useMemo(
    () => ({
      favorites,
      toggleFavorite: (id: string) => {
        setFavorites((prev) =>
          prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
        );
      },
    }),
    [favorites]
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error("useFavorites debe usarse dentro de un FavoritesProvider");
  return context;
};