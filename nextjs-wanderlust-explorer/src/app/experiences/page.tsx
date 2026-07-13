// src/app/experiences/page.tsx
'use client';
import { useFilteredExperiences } from '@/hooks/useFilteredExperiences';
import ExperienceCard from '@/components/ExperienceCard';
import type { Experience } from '@/Types/experience';

export default function Explorador() {
  const filtered = useFilteredExperiences();
  
  return (
    <div className="p-8">
      {/* Aquí irían tus filtros (SearchBar, FilterBar) que actualizan el router.push */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filtered.length > 0 ? (
          filtered.map((exp: Experience) => (
            <ExperienceCard
              key={exp.id}
              exp={exp}
              isFavorite={false}
              onToggle={() => {}}
            />
          ))
        ) : (
          <p>No se encontraron resultados</p>
        )}
      </div>
    </div>
  );
}