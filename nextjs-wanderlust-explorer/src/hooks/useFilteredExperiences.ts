// src/hooks/useFilteredExperiences.ts
import { useSearchParams } from 'next/navigation';
import { experiences } from '@/data/experiences';
import type { Experience } from '@/Types/experience';

export const useFilteredExperiences = () => {
  const searchParams = useSearchParams();
  const term = searchParams.get('search') || '';
  const category = searchParams.get('category') || '';
  const destination = searchParams.get('destination') || '';

  const filtered = experiences.filter((exp: Experience) => {
    const matchesSearch = new RegExp(term, 'i').test(exp.title);
    const matchesCategory = category ? exp.category === category : true;
    const matchesDestination = destination ? exp.destination.includes(destination) : true;
    return matchesSearch && matchesCategory && matchesDestination;
  });

  return filtered;
};