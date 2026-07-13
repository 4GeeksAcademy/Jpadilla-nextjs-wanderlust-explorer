import { useSearchParams } from 'next/navigation';
import { experiences } from '@/data/experiences';

export const useFilters = () => {
  const searchParams = useSearchParams();
  const term = searchParams.get('search') || '';
  const category = searchParams.get('category') || '';
  const destination = searchParams.get('destination') || '';

  const filteredData = experiences.filter((exp) => {
    const matchesSearch = new RegExp(term, 'i').test(exp.title);
    const matchesCategory = category ? exp.category === category : true;
    const matchesDestination = destination ? exp.destination.includes(destination) : true;
    return matchesSearch && matchesCategory && matchesDestination;
  });

  return { filteredData };
};