import { useContext, useState, type FormEvent } from "react";
import { GlobalContext } from "@/context/GlobalContext";

export const UserProfile = () => {
  const { user } = useContext(GlobalContext);

  // Si por alguna razón no hay usuario
  if (!user) {
    return <div>No hay información del usuario.</div>;
  }

  const [name, setName] = useState(user.nombre);
  const [email, setEmail] = useState(user.email);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    alert("Aquí iría la actualización (aún no implementada en tu backend)");
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-center mb-6">Mi Perfil</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2">Nombre</label>
          <input
            className="w-full p-2 border rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <label className="block mb-2">Email</label>
          <input
            className="w-full p-2 border rounded"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button className="w-full bg-blue-600 text-white p-2 rounded">
          Guardar cambios
        </button>
      </form>
    </div>
  );
};
