import type { Experience } from '@/Types/experience';

export const experiences: Experience[] = [
  {
    id: 'exp-1',
    title: 'Volcan Hike Sunrise',
    description: 'Guided sunrise hike with panoramic views and local breakfast.',
    category: 'Adventure',
    destination: 'Guatemala',
    price: 89,
    rating: 4.8,
    imageUrl:
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'exp-2',
    title: 'Old City Food Walk',
    description: 'Taste iconic street food and learn local culinary traditions.',
    category: 'Food',
    destination: 'Antigua',
    price: 55,
    rating: 4.6,
    imageUrl:
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'exp-3',
    title: 'Jungle River Retreat',
    description: 'Nature immersion with mindful activities and river kayaking.',
    category: 'Nature',
    destination: 'Rio Dulce',
    price: 120,
    rating: 4.7,
    imageUrl:
      'https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=1200&q=80',
  },
];
