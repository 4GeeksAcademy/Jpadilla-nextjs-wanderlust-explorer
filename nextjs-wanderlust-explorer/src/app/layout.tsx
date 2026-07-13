'use client';
import { useState } from 'react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Lista de IDs favoritos guardada en useState a nivel compartido
  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  // NOTA: Para pasar esto hacia abajo como props a las páginas,
  // puedes usar React.cloneElement si renderizas children aquí,
  // o utilizar un Contexto de React (nativo) si prefieres una estructura más limpia.
  
  return (
    <html lang="es">
      <body>
        {/* Aquí renderizas tus páginas pasando 'favorites' y 'toggleFavorite' */}
        {children}
      </body>
    </html>
  );
}