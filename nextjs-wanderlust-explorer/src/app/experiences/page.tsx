'use client';
import { Suspense, useState } from 'react';
import { useFilters } from '@/hooks/useFilters';
import ExperienceCard from '@/components/ExperienceCard';
import { useRouter, useSearchParams } from 'next/navigation';

function ExploradorContent() {
  const { filteredData } = useFilters();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const toggleFavorite = (experienceId: string) => {
    setFavorites((currentFavorites) => {
      const nextFavorites = new Set(currentFavorites);

      if (nextFavorites.has(experienceId)) {
        nextFavorites.delete(experienceId);
      } else {
        nextFavorites.add(experienceId);
      }

      return nextFavorites;
    });
  };

  return (
    <div className="p-8">
      {/* Búsqueda y Filtros */}
      <input 
        className="border p-2 w-full mb-4"
        placeholder="Buscar..."
        defaultValue={searchParams.get('search') || ''}
        onChange={(e) => router.push(`/experiences?search=${e.target.value}`)}
      />
      
      {/* Mensaje de no resultados */}
      {filteredData.length === 0 && (
        <p className="text-center mt-10 text-gray-500">No se encontraron resultados</p>
      )}
      
      {/* Cuadrícula de tarjetas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredData.map(exp => (
          <ExperienceCard
            key={exp.id}
            exp={exp}
            isFavorite={favorites.has(exp.id)}
            onToggle={() => toggleFavorite(exp.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default function Explorador() {
  return (
    <Suspense fallback={<div className="p-8">Cargando experiencias...</div>}>
      <ExploradorContent />
    </Suspense>
  );
}