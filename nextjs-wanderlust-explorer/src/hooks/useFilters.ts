import { useMemo } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import type { Experience } from '@/Types/experience';
import { experiences } from '@/data/experiences';

const categories: Experience['category'][] = ['Adventure', 'Culture', 'Food', 'Wellness', 'Nature'];

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export const useFilters = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const term = searchParams.get('search') || '';
  const category = searchParams.get('category') || '';
  const destination = searchParams.get('destination') || '';

  const filteredData = useMemo(
    () =>
      experiences.filter((exp) => {
        const safeTerm = escapeRegExp(term);
        const matchesSearch = safeTerm ? new RegExp(safeTerm, 'i').test(exp.title) : true;
        const matchesCategory = category ? exp.category === category : true;
        const matchesDestination = destination
          ? exp.destination.toLowerCase().includes(destination.toLowerCase())
          : true;

        return matchesSearch && matchesCategory && matchesDestination;
      }),
    [term, category, destination]
  );

  const destinations = useMemo(
    () => Array.from(new Set(experiences.map((exp) => exp.destination))).sort(),
    []
  );

  const updateParam = (key: 'search' | 'category' | 'destination', value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value.trim()) {
      params.set(key, value.trim());
    } else {
      params.delete(key);
    }

    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname);
  };

  return {
    term,
    category,
    destination,
    categories,
    destinations,
    filteredData,
    setTerm: (value: string) => updateParam('search', value),
    setCategory: (value: string) => updateParam('category', value),
    setDestination: (value: string) => updateParam('destination', value),
  };
};