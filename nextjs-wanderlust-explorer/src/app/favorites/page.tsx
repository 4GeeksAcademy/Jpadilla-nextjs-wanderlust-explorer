'use client';

import { useEffect, useMemo, useState } from 'react';
import { useFavorites } from '@/context/FavoritesContext';
import { experiences } from '@/data/experiences';

const reviewerNames = [
  'Lindsey',
  'Mateo',
  'Camila',
  'Valentina',
  'Sofia',
  'Julian',
  'Daniela',
  'Nicolas',
  'Emma',
  'Noah',
];

const reviewerLocations = [
  'East Drayton, United Kingdom',
  'Bogota, Colombia',
  'Lima, Peru',
  'Madrid, Espana',
  'Ciudad de Mexico, Mexico',
  'Santiago, Chile',
  'Buenos Aires, Argentina',
  'Lisboa, Portugal',
  'Montevideo, Uruguay',
  'Quito, Ecuador',
];

const publishedAgo = [
  'Hace 1 semana',
  'Hace 2 semanas',
  'Hace 3 dias',
  'Hace 5 dias',
  'Hace 10 dias',
];

function getReviewerMeta(id: string) {
  const index = Number(id) % reviewerNames.length;
  const locationIndex = Number(id) % reviewerLocations.length;
  const agoIndex = Number(id) % publishedAgo.length;

  return {
    name: reviewerNames[index],
    location: reviewerLocations[locationIndex],
    ago: publishedAgo[agoIndex],
    avatar: `https://i.pravatar.cc/80?img=${(Number(id) % 70) + 1}`,
  };
}

function stripWrappingQuotes(value: string) {
  return value.replace(/^\s*["“”]+\s*/, '').replace(/\s*["“”]+\s*$/, '');
}

function displayWithQuotes(value: string) {
  const normalized = stripWrappingQuotes(value).trim();
  if (!normalized) return '';
  return `“${normalized}”`;
}

export default function FavoritesPage() {
  const { favorites, favoriteComments, setFavoriteComment } = useFavorites();
  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const [selectedExperienceId, setSelectedExperienceId] = useState('');
  const [draftComment, setDraftComment] = useState('');
  
  // Filtramos todas las experiencias para obtener solo las que están en el array de favoritos
  const favoriteExperiences = experiences.filter(exp => favorites.includes(exp.id));

  const selectedExperience = useMemo(
    () => favoriteExperiences.find((exp) => exp.id === selectedExperienceId),
    [favoriteExperiences, selectedExperienceId]
  );

  const handleAddComment = () => {
    if (!selectedExperience) return;
    setFavoriteComment(selectedExperience.id, stripWrappingQuotes(draftComment).trim());
    setIsComposerOpen(false);
  };

  useEffect(() => {
    if (!favoriteExperiences.length) {
      setSelectedExperienceId('');
      return;
    }

    const stillExists = favoriteExperiences.some((exp) => exp.id === selectedExperienceId);
    if (!stillExists) {
      setSelectedExperienceId(favoriteExperiences[0].id);
    }
  }, [favoriteExperiences, selectedExperienceId]);

  useEffect(() => {
    if (!selectedExperience) {
      setDraftComment('');
      return;
    }

    setDraftComment(favoriteComments[selectedExperience.id] ?? '');
  }, [selectedExperience, favoriteComments]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-slate-900 mb-2">Mis favoritos</h1>
      <p className="text-slate-600 mb-8">{favoriteExperiences.length} resenas guardadas.</p>

      {favoriteExperiences.length > 0 && (
        <>
          <button
            onClick={() => setIsComposerOpen((prev) => !prev)}
            className="mb-4 rounded-lg bg-emerald-600 px-4 py-2 font-semibold text-white hover:bg-emerald-500 transition-colors"
          >
            {isComposerOpen ? 'Cerrar comentario' : 'Agregar comentario'}
          </button>

          {isComposerOpen && selectedExperience && (
            <div className="mb-8 rounded-2xl border border-emerald-200 bg-emerald-50/50 p-4 md:p-6">
              <h2 className="text-lg font-bold text-slate-900 mb-3">Completar resena</h2>
              <div className="grid gap-3">
                <label className="text-sm font-semibold text-slate-700" htmlFor="review-exp-select">
                  Experiencia
                </label>
                <select
                  id="review-exp-select"
                  value={selectedExperienceId}
                  onChange={(e) => setSelectedExperienceId(e.target.value)}
                  className="rounded-lg border border-slate-300 bg-white px-3 py-2"
                >
                  {favoriteExperiences.map((exp) => (
                    <option key={exp.id} value={exp.id}>
                      {exp.title}
                    </option>
                  ))}
                </select>

                <label className="text-sm font-semibold text-slate-700" htmlFor="review-comment-input">
                  Comentario
                </label>
                <textarea
                  id="review-comment-input"
                  value={draftComment}
                  onChange={(e) => setDraftComment(e.target.value)}
                  placeholder="Escribe tu resena aqui..."
                  className="min-h-28 rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900"
                />
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs text-slate-500">Este comentario se publicara en el listado al confirmar.</p>
                  <button
                    type="button"
                    onClick={handleAddComment}
                    className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700"
                  >
                    Agregar comentario
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {favoriteExperiences.length === 0 ? (
        <p className="rounded-xl border border-dashed border-slate-300 p-8 text-center text-slate-600">
          No tienes experiencias favoritas aún.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {favoriteExperiences.map((exp) => {
            const reviewer = getReviewerMeta(exp.id);

            return (
              <article key={exp.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-500 mb-2">{exp.title}</p>

                <div className="flex items-center gap-3 text-sm text-slate-700 mb-4">
                  <span className="text-amber-500 tracking-wider">{'★★★★★'.slice(0, exp.rating)}</span>
                  <span className="text-slate-400">•</span>
                  <span>{reviewer.ago}</span>
                </div>

                <div className="mt-1">
                  <p className="min-h-28 py-1 text-[1.05rem] leading-relaxed text-slate-900">
                    {displayWithQuotes(favoriteComments[exp.id] || exp.description)}
                  </p>
                </div>

                <div className="mt-4 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={reviewer.avatar}
                      alt={reviewer.name}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-bold text-xl text-slate-900 leading-tight">{reviewer.name}</p>
                      <p className="text-slate-600 text-base">{reviewer.location}</p>
                    </div>
                  </div>
                </div>

                <p className="mt-3 text-xs uppercase tracking-wide text-slate-500">Experiencia en {exp.destination}</p>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}