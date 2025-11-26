import { useContext, useState, useEffect } from 'react';
import { GlobalContext } from '@/context/GlobalContext';
import { updateUserApi, changePasswordApi } from '@/services/authServices'; // <--- IMPORTA LA NUEVA API

export const UserProfile = () => {
  const { user, authStatus, login } = useContext(GlobalContext);

  // --- ESTADOS PERFIL ---
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [msgProfile, setMsgProfile] = useState('');

  // --- NUEVOS ESTADOS PASSWORD ---
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loadingPass, setLoadingPass] = useState(false);
  const [msgPass, setMsgPass] = useState('');

  useEffect(() => {
    if (user) {
      setNombre(user.nombre || '');
      setApellido(user.apellido || '');
    }
  }, [user]);

  // --- HANDLER ACTUALIZAR DATOS ---
  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingProfile(true);
    setMsgProfile('');

    if (!nombre || !apellido) {
        setMsgProfile('Nombre y Apellido son obligatorios.');
        setLoadingProfile(false);
        return;
    }

    try {
      const updated = await updateUserApi({ nombre, apellido });
      if (login) login(updated); 
      setMsgProfile('¡Perfil actualizado!');
    } catch (err: any) {
      setMsgProfile('Error al actualizar perfil.');
    } finally {
      setLoadingProfile(false);
    }
  };

  // --- NUEVO HANDLER CAMBIAR PASSWORD ---
  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingPass(true);
    setMsgPass('');

    if (!currentPassword || !newPassword) {
        setMsgPass('Ambos campos son obligatorios.');
        setLoadingPass(false);
        return;
    }
    
    if (newPassword.length < 6) {
        setMsgPass('La nueva contraseña debe tener al menos 6 caracteres.');
        setLoadingPass(false);
        return;
    }

    try {
      // Llamamos a la API
      await changePasswordApi({ currentPassword, newPassword });
      setMsgPass('¡Contraseña cambiada con éxito!');
      // Limpiamos campos
      setCurrentPassword('');
      setNewPassword('');
    } catch (err: any) {
      // Manejo de error específico del backend
      setMsgPass(err.response?.data?.error || 'Error al cambiar contraseña.');
    } finally {
      setLoadingPass(false);
    }
  };

  if (authStatus === 'checking') return <div className="p-10 text-center">Cargando...</div>;
  if (!user) return <div className="p-10 text-center text-red-500">Error de sesión</div>;

  const nombreCompleto = user.apellido ? `${user.nombre} ${user.apellido}` : user.nombre;

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 pb-10">
      {/* Header */}
      <section className="flex items-center gap-4">
        <div className="h-16 w-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold">
          {user.nombre?.charAt(0).toUpperCase()}
        </div>
        <div>
          <h1 className="text-2xl font-bold">Mi cuenta</h1>
          <p className="text-sm text-gray-600">Gestiona tu información personal y seguridad.</p>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* COLUMNA IZQUIERDA (Resumen) */}
        <div className="md:col-span-1 space-y-4">
          <div className="border rounded-lg p-4 bg-background">
            <p className="text-xs font-semibold text-gray-500 uppercase">Resumen</p>
            <p className="mt-2 text-base font-semibold">{nombreCompleto}</p>
            <p className="text-sm text-gray-600 break-all">{user.email}</p>
            <div className="mt-3">
              <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                {user.role}
              </span>
            </div>
          </div>
        </div>

        {/* COLUMNA DERECHA (Formularios) */}
        <div className="md:col-span-2 space-y-6">
          
          {/* 1. DATOS PERSONALES */}
          <div className="border rounded-lg p-4 bg-background">
            <h2 className="text-lg font-semibold mb-4">Datos Personales</h2>
            <form onSubmit={handleProfileSubmit} className="space-y-3 text-sm">
              <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="text-gray-500 text-xs uppercase">Nombre</label>
                    <input value={nombre} onChange={e => setNombre(e.target.value)} className="mt-1 w-full border rounded p-2" />
                </div>
                <div>
                    <label className="text-gray-500 text-xs uppercase">Apellido</label>
                    <input value={apellido} onChange={e => setApellido(e.target.value)} className="mt-1 w-full border rounded p-2" />
                </div>
              </div>
              
              <div>
                <label className="text-gray-500 text-xs uppercase">Email (No editable)</label>
                <input value={user.email} disabled className="mt-1 w-full border rounded p-2 bg-gray-100 text-gray-500" />
              </div>

              <button type="submit" disabled={loadingProfile} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50">
                {loadingProfile ? 'Guardando...' : 'Actualizar Datos'}
              </button>
              {msgProfile && <p className="text-center text-sm mt-2">{msgProfile}</p>}
            </form>
          </div>

          {/* 2. SEGURIDAD (CAMBIO DE CONTRASEÑA) */}
          <div className="border rounded-lg p-4 bg-background">
            <h2 className="text-lg font-semibold mb-1">Seguridad</h2>
            <p className="text-xs text-gray-500 mb-4">Cambia tu contraseña. Requiere confirmar tu clave actual.</p>
            
            <form onSubmit={handlePasswordSubmit} className="space-y-3 text-sm">
                <div>
                    <label className="text-gray-500 text-xs uppercase">Contraseña Actual</label>
                    <input 
                        type="password" 
                        value={currentPassword} 
                        onChange={e => setCurrentPassword(e.target.value)} 
                        className="mt-1 w-full border rounded p-2"
                        placeholder="••••••••"
                    />
                </div>
                <div>
                    <label className="text-gray-500 text-xs uppercase">Nueva Contraseña</label>
                    <input 
                        type="password" 
                        value={newPassword} 
                        onChange={e => setNewPassword(e.target.value)} 
                        className="mt-1 w-full border rounded p-2"
                        placeholder="••••••••"
                    />
                </div>

                <button type="submit" disabled={loadingPass} className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-black disabled:opacity-50">
                    {loadingPass ? 'Procesando...' : 'Cambiar Contraseña'}
                </button>

                {msgPass && (
                    <p className={`text-center text-sm mt-2 ${msgPass.includes('éxito') ? 'text-green-600' : 'text-red-500'}`}>
                        {msgPass}
                    </p>
                )}
            </form>
          </div>

        </div>
      </section>
    </div>
  );
};