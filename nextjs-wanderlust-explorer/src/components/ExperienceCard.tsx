'use client';
import type { Experience } from '@/Types/experience';

interface Props {
  exp: Experience;
  isFavorite: boolean;
  onToggle: () => void;
}

export default function ExperienceCard({ exp, isFavorite, onToggle }: Props) {
  return (
    <div className="border p-4 rounded-lg shadow-sm relative">
      <img src={exp.imageUrl} alt={exp.title} className="w-full h-40 object-cover rounded" />
      <h3 className="font-bold mt-2">{exp.title}</h3>
      
      {/* Icono de corazón (toggle) */}
      <button 
        onClick={onToggle}
        className="absolute top-4 right-4 text-2xl transition-colors"
        aria-label={isFavorite ? "Quitar de favoritos" : "Añadir a favoritos"}
      >
        {isFavorite ? '❤️' : '🤍'}
      </button>
    </div>
  );
}