import { useContext, useState, useEffect } from 'react';
import { GlobalContext } from '@/context/GlobalContext';
import { updateUserApi, changePasswordApi } from '@/services/authServices'; 

export const UserProfile = () => {
  const { user, authStatus, setUser } = useContext(GlobalContext);

  // --- ESTADOS PERFIL ---
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [msgProfile, setMsgProfile] = useState('');

  // --- ESTADOS PASSWORD ---
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

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingProfile(true);
    setMsgProfile('');

    if (!nombre.trim() || !apellido.trim()) {
        setMsgProfile('Nombre y Apellido son obligatorios.');
        setLoadingProfile(false);
        return;
    }

    try {
      // 1. Guardamos en Base de Datos
      await updateUserApi({ nombre, apellido });

      // 2. Actualizamos la APP inmediatamente (sin recargar)
      if (user && setUser) {
          // Creamos un usuario nuevo mezclando lo que ya teniamos + los cambios
          const usuarioActualizado = {
              ...user,           // Mantiene email, role, id, etc.
              nombre: nombre,    // Ponemos el nuevo nombre
              apellido: apellido // Ponemos el nuevo apellido
          };
          
          setUser(usuarioActualizado);
      }

      setMsgProfile('¡Perfil actualizado correctamente!');
      
    } catch (err: any) {
      console.error(err);
      setMsgProfile('Error al actualizar perfil.');
    } finally {
      setLoadingProfile(false);
    }
  };

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
      await changePasswordApi({ currentPassword, newPassword });
      setMsgPass('¡Contraseña cambiada con éxito!');
      setCurrentPassword('');
      setNewPassword('');
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || err.response?.data?.error || 'Error al cambiar contraseña.';
      setMsgPass(errorMsg);
    } finally {
      setLoadingPass(false);
    }
  };

  if (authStatus === 'checking') return <div className="p-10 text-center text-muted-foreground">Cargando...</div>;
  if (!user) return <div className="p-10 text-center text-red-500">Error de sesión</div>;

  const nombreCompleto = user.apellido ? `${user.nombre} ${user.apellido}` : user.nombre;

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 pb-10 animate-in fade-in duration-500">
      {/* Header */}
      <section className="flex items-center gap-4">
        {/* Usamos bg-primary y text-primary-foreground para que combine con el tema */}
        <div className="h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold shadow-md">
          {user.nombre?.charAt(0).toUpperCase()}
        </div>
        <div>
          {/* text-foreground se adapta a blanco en dark mode y negro en light mode */}
          <h1 className="text-2xl font-bold text-foreground">Mi cuenta</h1>
          <p className="text-sm text-muted-foreground">Gestiona tu información personal y seguridad.</p>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* COLUMNA IZQUIERDA (Resumen) */}
        <div className="md:col-span-1 space-y-4">
          {/* bg-background para tomar el color de fondo del tema (usualmente oscuro o negro en dark mode) */}
          <div className="border border-border rounded-lg p-4 bg-background shadow-sm">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Resumen</p>
            <p className="mt-2 text-lg font-semibold text-foreground">{nombreCompleto}</p>
            <p className="text-sm text-muted-foreground break-all">{user.email}</p>
            <div className="mt-3">
              <span className="inline-flex items-center rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
                {user.role}
              </span>
            </div>
          </div>
        </div>

        {/* COLUMNA DERECHA (Formularios) */}
        <div className="md:col-span-2 space-y-6">
          
          {/* 1. DATOS PERSONALES */}
          <div className="border border-border rounded-lg p-6 bg-background shadow-sm">
            <h2 className="text-lg font-semibold mb-4 text-foreground">Datos Personales</h2>
            <form onSubmit={handleProfileSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs font-medium text-muted-foreground uppercase mb-1">Nombre</label>
                    <input 
                        value={nombre} 
                        onChange={e => setNombre(e.target.value)} 
                        // bg-background y text-foreground aseguran que el input sea oscuro en dark mode
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all" 
                    />
                </div>
                <div>
                    <label className="block text-xs font-medium text-muted-foreground uppercase mb-1">Apellido</label>
                    <input 
                        value={apellido} 
                        onChange={e => setApellido(e.target.value)} 
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all" 
                    />
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-medium text-muted-foreground uppercase mb-1">Email <span className="opacity-70 font-normal">(No editable)</span></label>
                <input 
                    value={user.email} 
                    disabled 
                    // bg-muted para indicar deshabilitado respetando el tema
                    className="w-full rounded-md border border-input bg-muted px-3 py-2 text-sm text-muted-foreground cursor-not-allowed" 
                />
              </div>

              <div className="pt-2">
                <button 
                    type="submit" 
                    disabled={loadingProfile} 
                    className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                    {loadingProfile ? 'Guardando...' : 'Actualizar Datos'}
                </button>
                {msgProfile && (
                    <p className={`text-sm mt-3 ${msgProfile.includes('Error') ? 'text-red-500' : 'text-green-500'}`}>
                        {msgProfile}
                    </p>
                )}
              </div>
            </form>
          </div>

          {/* 2. SEGURIDAD */}
          <div className="border border-border rounded-lg p-6 bg-background shadow-sm">
            <h2 className="text-lg font-semibold mb-1 text-foreground">Seguridad</h2>
            <p className="text-sm text-muted-foreground mb-6">Cambia tu contraseña. Requiere confirmar tu clave actual.</p>
            
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <div>
                    <label className="block text-xs font-medium text-muted-foreground uppercase mb-1">Contraseña Actual</label>
                    <input 
                        type="password" 
                        value={currentPassword} 
                        onChange={e => setCurrentPassword(e.target.value)} 
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                        placeholder="••••••••"
                    />
                </div>
                <div>
                    <label className="block text-xs font-medium text-muted-foreground uppercase mb-1">Nueva Contraseña</label>
                    <input 
                        type="password" 
                        value={newPassword} 
                        onChange={e => setNewPassword(e.target.value)} 
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                        placeholder="••••••••"
                    />
                </div>

                <div className="pt-2">
                    <button 
                        type="submit" 
                        disabled={loadingPass} 
                        // Usamos secondary para botón secundario (generalmente gris oscuro o claro según tema)
                        className="bg-secondary text-secondary-foreground px-4 py-2 rounded-md text-sm font-medium hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                        {loadingPass ? 'Procesando...' : 'Cambiar Contraseña'}
                    </button>

                    {msgPass && (
                        <p className={`text-sm mt-3 ${msgPass.includes('éxito') ? 'text-green-500' : 'text-red-500'}`}>
                            {msgPass}
                        </p>
                    )}
                </div>
            </form>
          </div>

        </div>
      </section>
    </div>
  );
};