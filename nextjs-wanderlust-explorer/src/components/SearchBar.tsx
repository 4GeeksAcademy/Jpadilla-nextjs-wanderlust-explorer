// src/components/SearchBar.tsx
'use client';
import { useRouter, useSearchParams } from 'next/navigation';

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) params.set('search', term);
    else params.delete('search');
    
    // Actualiza la URL sin recargar la página
    router.push(`/experiences?${params.toString()}`);
  };

  return (
    <input 
      type="text"
      defaultValue={searchParams.get('search') || ''}
      onChange={(e) => handleSearch(e.target.value)}
      className="border p-2 rounded"
      placeholder="Buscar por título..."
    />
  );
}