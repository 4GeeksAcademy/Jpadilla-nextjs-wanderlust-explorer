'use client';
import Link from 'next/link';
import { useFavorites } from '@/context/FavoritesContext';
import type { Experience } from '@/Types/experience';

export default function ExperienceCard({ exp }: { exp: Experience }) {
  const { favorites, toggleFavorite } = useFavorites();
  const isFavorite = favorites.includes(exp.id);

  return (
    <article className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-200">
      <div className="relative h-56 overflow-hidden">
        <img 
          src={exp.imageUrl} 
          alt={exp.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
        />
        <button 
          onClick={() => toggleFavorite(exp.id)}
          className="absolute top-4 right-4 p-2.5 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:scale-110 transition-transform"
          aria-label={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
        >
          {isFavorite ? '❤️' : '🤍'}
        </button>
      </div>

      <div className="p-5">
        <div className="text-xs font-bold text-emerald-700 uppercase tracking-widest mb-2">
          {exp.category}
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-1">{exp.title}</h3>
        <p className="text-slate-500 text-sm mb-4">{exp.destination}</p>
        <p className="text-sm text-slate-600 line-clamp-2">{exp.description}</p>
        
        <div className="flex justify-between items-center mt-4 pt-4 border-t border-slate-100">
          <span className="text-lg font-bold text-slate-900">${exp.price}</span>
          <span className="text-sm text-amber-500 font-bold">★ {exp.rating}</span>
        </div>

        <div className="mt-4">
          <Link
            href={`/experiences/${exp.id}`}
            className="inline-flex rounded-lg bg-slate-900 text-white px-3 py-2 text-sm hover:bg-slate-700 transition-colors"
          >
            Ver detalle
          </Link>
        </div>
      </div>
    </article>
  );
}