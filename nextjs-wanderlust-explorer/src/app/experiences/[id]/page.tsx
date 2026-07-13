"use client";

import { useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { experiences } from '@/data/experiences';
import { useFavorites } from '@/context/FavoritesContext';

export default function ExperienceDetailPage() {
	const params = useParams<{ id: string }>();
	const { favorites, toggleFavorite } = useFavorites();
	const experience = experiences.find((item) => item.id === params.id);

	useEffect(() => {
		if (experience) {
			document.title = `${experience.title} | Wanderlust Explorer`;
		}
	}, [experience]);

	if (!experience) {
		return (
			<section className="px-4 py-8 md:px-8">
				<div className="max-w-3xl mx-auto text-center rounded-xl border border-dashed border-slate-300 p-10">
					<h1 className="text-2xl font-bold text-slate-900">Experiencia no encontrada</h1>
					<p className="text-slate-600 mt-3">El ID solicitado no existe en el dataset actual.</p>
					<Link href="/experiences" className="inline-block mt-6 px-4 py-2 rounded-lg bg-slate-900 text-white">
						Volver al explorador
					</Link>
				</div>
			</section>
		);
	}

	const isFavorite = favorites.includes(experience.id);

	return (
		<section className="px-4 py-8 md:px-8">
			<div className="max-w-5xl mx-auto grid gap-8 md:grid-cols-2">
				<img
					src={experience.imageUrl}
					alt={experience.title}
					className="w-full h-80 md:h-full object-cover rounded-2xl border border-slate-200"
				/>

				<article className="space-y-4">
					<p className="text-sm uppercase tracking-[0.2em] text-emerald-700 font-semibold">{experience.category}</p>
					<h1 className="text-3xl md:text-4xl font-bold text-slate-900">{experience.title}</h1>
					<p className="text-slate-600">{experience.description}</p>

					<div className="grid gap-3 py-4">
						<p><strong>Destino:</strong> {experience.destination}</p>
						<p><strong>Precio:</strong> ${experience.price}</p>
						<p><strong>Rating:</strong> {experience.rating} / 5</p>
						<p><strong>ID:</strong> {experience.id}</p>
					</div>

					<div className="flex gap-3">
						<button
							onClick={() => toggleFavorite(experience.id)}
							className="px-4 py-2 rounded-lg bg-rose-500 text-white hover:bg-rose-400 transition-colors"
						>
							{isFavorite ? 'Quitar de favoritos' : 'Guardar en favoritos'}
						</button>
						<Link href="/experiences" className="px-4 py-2 rounded-lg border border-slate-300 hover:bg-slate-100 transition-colors">
							Volver
						</Link>
					</div>
				</article>
			</div>
		</section>
	);
}
