export default function ProfilePage() {
  const user = { name: "Viajero", email: "viajero@ejemplo.com" };
  const favCount = 0; // Aquí deberías mostrar la cantidad de favoritos

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Perfil de Usuario</h1>
      <p>Nombre: {user.name}</p>
      <p>Favoritos guardados: {favCount}</p>
    </div>
  );
}