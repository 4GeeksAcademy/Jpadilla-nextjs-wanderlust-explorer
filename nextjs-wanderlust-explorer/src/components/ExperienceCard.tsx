// src/components/ExperienceCard.tsx
import { Experience } from '@/Types/experience';

export default function ExperienceCard({ 
  exp, isFavorite, onToggle 
}: { 
  exp: Experience, isFavorite: boolean, onToggle: () => void 
}) {
  return (
    <div className="border p-4 rounded-lg shadow-sm">
      <img src={exp.imageUrl} alt={exp.title} className="w-full h-40 object-cover" />
      <h3 className="font-bold">{exp.title}</h3>
      <button onClick={onToggle}>
        {isFavorite ? '❤️' : '🤍'}
      </button>
    </div>
  );
}