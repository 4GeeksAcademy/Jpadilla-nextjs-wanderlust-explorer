'use client';
import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from 'react';

const FavoritesContext = createContext<{
  favorites: string[];
  toggleFavorite: (id: string) => void;
  addManyFavorites: (ids: string[]) => void;
  favoriteComments: Record<string, string>;
  setFavoriteComment: (id: string, comment: string) => void;
} | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [favoriteComments, setFavoriteComments] = useState<Record<string, string>>({});

  useEffect(() => {
    const rawFavorites = window.localStorage.getItem('wanderlust-favorites');
    const rawComments = window.localStorage.getItem('wanderlust-favorite-comments');

    if (!rawFavorites) return;

    try {
      const parsed = JSON.parse(rawFavorites) as string[];
      if (Array.isArray(parsed)) {
        setFavorites(parsed);
      }
    } catch {
      // Ignore invalid persisted state.
    }

    if (rawComments) {
      try {
        const parsedComments = JSON.parse(rawComments) as Record<string, string>;
        if (parsedComments && typeof parsedComments === 'object') {
          setFavoriteComments(parsedComments);
        }
      } catch {
        // Ignore invalid persisted comments.
      }
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem('wanderlust-favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    window.localStorage.setItem('wanderlust-favorite-comments', JSON.stringify(favoriteComments));
  }, [favoriteComments]);

  const value = useMemo(
    () => ({
      favorites,
      favoriteComments,
      toggleFavorite: (id: string) => {
        setFavorites((prev) =>
          prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
        );
      },
      addManyFavorites: (ids: string[]) => {
        setFavorites((prev) => Array.from(new Set([...prev, ...ids])));
      },
      setFavoriteComment: (id: string, comment: string) => {
        setFavoriteComments((prev) => ({ ...prev, [id]: comment }));
      },
    }),
    [favorites, favoriteComments]
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