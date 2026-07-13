import Link from 'next/link';

export default function HomePage() {
  return (
    <section className="min-h-[calc(100vh-88px)] grid place-items-center px-6">
      <div className="max-w-4xl text-center">
        <p className="uppercase tracking-[0.2em] text-sm text-emerald-700 font-semibold">Wanderlust Explorer</p>
        <h1 className="mt-3 text-4xl md:text-6xl font-extrabold text-slate-900 leading-tight">
          Encuentra experiencias unicas para tu proximo viaje
        </h1>
        <p className="mt-6 text-slate-600 text-lg md:text-xl">
          Explora 100 experiencias reales por categoria y destino, guarda tus favoritas y planifica tu proxima aventura.
        </p>
        <div className="mt-8">
          <Link
            href="/experiences"
            className="inline-flex items-center rounded-xl bg-emerald-600 px-6 py-3 text-white font-semibold hover:bg-emerald-500 transition-colors"
          >
            Ir al explorador
          </Link>
        </div>
      </div>
    </section>
  );
}