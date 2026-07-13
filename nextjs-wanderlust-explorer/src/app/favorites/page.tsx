'use client'; // Importante para usar hooks como el de favoritos

import { useFavorites } from '@/context/FavoritesContext';
import ExperienceCard from '@/components/ExperienceCard';
import { experiences } from '@/data/experiences';

export default function FavoritesPage() {
  const { favorites } = useFavorites();

  const favoriteExperiences = experiences.filter((exp) => favorites.includes(exp.id));

  return (
    <section className="px-4 py-8 md:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-slate-900">Mis favoritos</h1>
        <p className="text-slate-600 mb-6">{favoriteExperiences.length} experiencias guardadas.</p>

        {favoriteExperiences.length === 0 ? (
        <p className="rounded-xl border border-dashed border-slate-300 p-8 text-center text-slate-600">No tienes experiencias favoritas aun.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {favoriteExperiences.map((exp) => (
            <ExperienceCard key={exp.id} exp={exp} />
          ))}
        </div>
      )}
      </div>
    </section>
  );
}