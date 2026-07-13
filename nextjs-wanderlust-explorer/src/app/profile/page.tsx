"use client";

import { useFavorites } from '@/context/FavoritesContext';

export default function ProfilePage() {
  const user = { name: "Viajero", email: "viajero@ejemplo.com" };
  const { favorites } = useFavorites();
  const favCount = favorites.length;

  return (
    <section className="px-4 py-8 md:px-8">
      <div className="max-w-3xl mx-auto bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-slate-900 mb-6">Perfil de usuario</h1>
        <dl className="grid gap-4 text-slate-700">
          <div>
            <dt className="text-sm uppercase tracking-wide text-slate-500">Nombre</dt>
            <dd className="text-lg font-semibold">{user.name}</dd>
          </div>
          <div>
            <dt className="text-sm uppercase tracking-wide text-slate-500">Correo</dt>
            <dd className="text-lg font-semibold">{user.email}</dd>
          </div>
          <div>
            <dt className="text-sm uppercase tracking-wide text-slate-500">Favoritos guardados</dt>
            <dd className="text-lg font-semibold">{favCount}</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}