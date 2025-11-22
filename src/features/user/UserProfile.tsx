import { useContext } from 'react';
import { GlobalContext } from '@/context/GlobalContext';

export const UserProfile = () => {
  const { user, authStatus } = useContext(GlobalContext);

  if (authStatus === 'checking') {
    return (
      <div className="w-full">
        <h2 className="text-2xl font-bold text-center mb-6">Mi Perfil</h2>
        <p className="text-center text-gray-600">
          Cargando información de tu cuenta...
        </p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="w-full">
        <h2 className="text-2xl font-bold text-center mb-6">Mi Perfil</h2>
        <p className="text-center text-red-600">
          No se pudo cargar la información de tu cuenta.
        </p>
      </div>
    );
  }

  const nombreCompleto = `${user.nombre} ${user.apellido}`;

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-center mb-6">Mi Perfil</h2>

      <div className="space-y-4">
        <div>
          <p className="text-sm font-medium text-gray-500">Nombre completo</p>
          <p className="mt-1 text-base font-semibold">{nombreCompleto}</p>
        </div>

        <div>
          <p className="text-sm font-medium text-gray-500">Correo electrónico</p>
          <p className="mt-1 text-base font-semibold">{user.email}</p>
        </div>

        <div>
          <p className="text-sm font-medium text-gray-500">Rol</p>
          <p className="mt-1 inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
            {user.role}
          </p>
        </div>

        <div>
          <p className="text-sm font-medium text-gray-500">Historial de compras</p>
          <p className="mt-1 text-base">
            {Array.isArray(user.historial_compras) &&
            user.historial_compras.length > 0
              ? `Tienes ${user.historial_compras.length} compras registradas.`
              : 'Aún no tienes compras registradas.'}
          </p>
        </div>
      </div>
    </div>
  );
};