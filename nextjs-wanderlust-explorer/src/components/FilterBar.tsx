'use client';

import type { Experience } from '@/Types/experience';

interface FilterBarProps {
  category: string;
  destination: string;
  categories: Experience['category'][];
  destinations: string[];
  onCategoryChange: (value: string) => void;
  onDestinationChange: (value: string) => void;
}

export default function FilterBar({
  category,
  destination,
  categories,
  destinations,
  onCategoryChange,
  onDestinationChange,
}: FilterBarProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <select
        value={category}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="border border-slate-300 bg-white p-3 rounded-lg w-full"
        aria-label="Filtrar por categoría"
      >
        <option value="">Todas las categorías</option>
        {categories.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>

      <select
        value={destination}
        onChange={(e) => onDestinationChange(e.target.value)}
        className="border border-slate-300 bg-white p-3 rounded-lg w-full"
        aria-label="Filtrar por destino"
      >
        <option value="">Todos los destinos</option>
        {destinations.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
}
