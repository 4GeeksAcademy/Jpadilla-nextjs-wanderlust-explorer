"use client";

import ExperienceCard from '@/components/ExperienceCard';
import FilterBar from '@/components/FilterBar';
import SearchBar from '@/components/SearchBar';
import { useFilters } from '@/hooks/useFilters';

export default function Explorador() {
  const {
    term,
    category,
    destination,
    categories,
    destinations,
    filteredData,
    setTerm,
    setCategory,
    setDestination,
  } = useFilters();

  return (
    <section className="px-4 py-8 md:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <header>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900">Explorador de experiencias</h1>
          <p className="text-slate-600 mt-2">Filtra por titulo, categoria y destino.</p>
        </header>

        <div className="grid gap-3">
          <SearchBar value={term} onChange={setTerm} />
          <FilterBar
            category={category}
            destination={destination}
            categories={categories}
            destinations={destinations}
            onCategoryChange={setCategory}
            onDestinationChange={setDestination}
          />
        </div>

        {filteredData.length === 0 ? (
          <p className="rounded-xl border border-dashed border-slate-300 p-8 text-center text-slate-600">
            No se encontraron resultados
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredData.map((exp) => (
              <ExperienceCard key={exp.id} exp={exp} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}