import type { Experience } from '@/Types/experience';

const categories: Experience['category'][] = ['Adventure', 'Culture', 'Food', 'Wellness', 'Nature'];

const destinations = [
  'Kyoto, Japon',
  'Lisboa, Portugal',
  'Cusco, Peru',
  'Reikiavik, Islandia',
  'Chiang Mai, Tailandia',
  'Marrakech, Marruecos',
  'Queenstown, Nueva Zelanda',
  'Oaxaca, Mexico',
  'Medellin, Colombia',
  'Split, Croacia',
  'Bangkok, Tailandia',
  'Ubud, Indonesia',
  'Copenhague, Dinamarca',
  'Sevilla, Espana',
  'Cartagena, Colombia',
];

const titleByCategory: Record<Experience['category'], string[]> = {
  Adventure: [
    'Ruta de trekking alpino',
    'Expedicion en canon',
    'Aventura en kayak costero',
    'Vuelo en parapente panoramico',
    'Escalada guiada en roca',
  ],
  Culture: [
    'Recorrido por barrios historicos',
    'Taller de artesania local',
    'Visita a museos y patrimonio',
    'Paseo de arquitectura tradicional',
    'Ruta de leyendas urbanas',
  ],
  Food: [
    'Tour gastronomico callejero',
    'Clase de cocina regional',
    'Cata de cafe y postres',
    'Mercado local con chef',
    'Cena de sabores de temporada',
  ],
  Wellness: [
    'Retiro de yoga al amanecer',
    'Sesion de spa termal',
    'Meditacion guiada en naturaleza',
    'Jornada de respiracion consciente',
    'Circuito de bienestar integral',
  ],
  Nature: [
    'Safari fotografico natural',
    'Sendero entre bosques nativos',
    'Avistamiento de fauna silvestre',
    'Ruta de cascadas escondidas',
    'Exploracion de reserva ecologica',
  ],
};

const descriptions = [
  'Una experiencia inmersiva con guias locales y recomendaciones autenticas.',
  'Ideal para quienes buscan descubrir el destino con una perspectiva diferente.',
  'Incluye paradas cuidadosamente seleccionadas para aprovechar al maximo el recorrido.',
  'Disenada para grupos pequenos, con ritmo comodo y atencion personalizada.',
  'Perfecta para viajeros curiosos que quieren combinar aprendizaje y diversion.',
];

const TOTAL_EXPERIENCES = 120;

export const experiences: Experience[] = Array.from({ length: TOTAL_EXPERIENCES }, (_, index) => {
  const id = String(index + 1);
  const category = categories[index % categories.length];
  const destination = destinations[index % destinations.length];
  const titleSeed = titleByCategory[category][index % titleByCategory[category].length];
  const title = `${titleSeed} #${id}`;
  const description = descriptions[index % descriptions.length];
  const price = 35 + ((index * 17) % 260);
  const rating = (index % 5) + 1;

  return {
    id,
    title,
    description,
    category,
    destination,
    price,
    rating,
    imageUrl: `https://picsum.photos/seed/wanderlust-${id}/640/420`,
  };
});
