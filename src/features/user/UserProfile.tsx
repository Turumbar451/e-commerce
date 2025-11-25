import { useContext } from 'react';
import { GlobalContext } from '@/context/GlobalContext';

export const UserProfile = () => {
  const { user, authStatus } = useContext(GlobalContext);

  if (authStatus === 'checking') {
    return (
      <div className="w-full flex justify-center items-center py-16">
        <p className="text-gray-600">Cargando información de tu cuenta...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="w-full flex justify-center items-center py-16">
        <p className="text-red-600">No se pudo cargar la información de tu cuenta.</p>
      </div>
    );
  }

  const nombreCompleto = user.apellido
    ? `${user.nombre} ${user.apellido}`
    : user.nombre;

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* Header de perfil */}
      <section className="flex items-center gap-4">
        <div className="h-16 w-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold">
          {user.nombre.charAt(0).toUpperCase()}
        </div>
        <div>
          <h1 className="text-2xl font-bold">Mi cuenta</h1>
          <p className="text-sm text-gray-600">
            Aquí podrás ver y gestionar la información de tu perfil.
          </p>
        </div>
      </section>

      {/* Contenido principal */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Columna izquierda: resumen */}
        <div className="md:col-span-1 space-y-4">
          <div className="border rounded-lg p-4 bg-background">
            <p className="text-xs font-semibold text-gray-500 uppercase">Resumen</p>
            <p className="mt-2 text-base font-semibold">{nombreCompleto}</p>
            <p className="text-sm text-gray-600 break-all">{user.email}</p>
            <div className="mt-3">
              <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Rol</p>
              <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                {user.role}
              </span>
            </div>
          </div>
          <div className="border rounded-lg p-4 bg-background">
            <p className="text-xs font-semibold text-gray-500 uppercase mb-1">
              Historial de compras
            </p>
            <p className="text-sm text-gray-600">
              {Array.isArray(user.historial_compras) && user.historial_compras.length > 0
                ? `Tienes ${user.historial_compras.length} compras registradas.`
                : 'Aún no tienes compras registradas.'}
            </p>
          </div>
        </div>

        {/* Columna derecha: secciones futuras */}
        <div className="md:col-span-2 space-y-4">
          <div className="border rounded-lg p-4 bg-background">
            <h2 className="text-lg font-semibold mb-2">Datos de la cuenta</h2>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-gray-500 text-xs uppercase">Nombre</p>
                <p className="mt-1 font-medium">{nombreCompleto}</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs uppercase">Correo electrónico</p>
                <p className="mt-1 font-medium break-all">{user.email}</p>
              </div>
            </div>
          </div>
          <div className="border rounded-lg p-4 bg-background">
            <h2 className="text-lg font-semibold mb-1">Seguridad y acceso (próximamente)</h2>
            <p className="text-sm text-gray-600">
              Aquí podrás cambiar tu contraseña, configurar métodos de recuperación y revisar dispositivos con sesión activa.
            </p>
          </div>
          <div className="border rounded-lg p-4 bg-background">
            <h2 className="text-lg font-semibold mb-1">Historial de compras (próximamente)</h2>
            <p className="text-sm text-gray-600">
              En esta sección se mostrará el detalle de tus pedidos anteriores.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};