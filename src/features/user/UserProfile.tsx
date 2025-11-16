import { useState, useEffect, type FormEvent } from 'react';

// Tipo para los datos del usuario que esperamos del backend
interface UserData {
  id: number; // o string, dependiendo de tu BD
  email: string;
  role: string;
  nombre: string;
}

export const UserProfile = () => {

  const [nombre, setName] = useState('');
  const [email, setEmail] = useState('');
  
  // Cambios: Estados para saber si la página está cargando o si hubo un error
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Cambios: Este Hook se ejecuta 1 sola vez cuando la página carga
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setIsLoading(true); // Ponemos en modo "cargando"
        setError(null);

        //Usamos la URL del backend
        //Usamos la URL del backend (¡Aquí va el puerto 3000!)
      const response = await fetch('http://localhost:5173', {
          method: 'GET',
          // ¡Esto es clave para que el 'VerifyToken' funcione!
          // Envía las cookies (incluyendo el token) al backend.
          credentials: 'include' 
        });

        if (!response.ok) {
          // Si el token es inválido o no existe, el backend dará un 401 o 403
          if (response.status === 401 || response.status === 403) {
            throw new Error('No estás autenticado. Por favor, inicia sesión.');
          }
          // Otros errores
          throw new Error('No se pudo cargar el perfil del usuario');
        }
        
        // El backend responde con los datos del usuario
        const data: UserData = await response.json();

        // Rellenamos el formulario con los datos recibidos (Tarea 4)
        setName(data.nombre); 
        setEmail(data.email);

      } catch (err: any) {
        // Si algo falla, guardamos el mensaje de error
        setError(err.message);
      } finally {
        // Haya éxito o error, dejamos de cargar
        setIsLoading(false);
      }
    };

    fetchUserProfile(); // Ejecutamos la función
  }, []); // El '[]' vacío significa "ejecutar solo 1 vez al montar"


  // Esta es tu función original para ACTUALIZAR (futuro 'PUT' o 'PATCH')
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault(); 

    try {
      // Usamos la misma URL (o la que tu backend designe para ACTUALIZAR)
      const response = await fetch('http://localhost:5173/api/auth/profile', { // <-- 2. Revisa esta URL
        method: 'PUT', // <-- 3. Especificamos el método
        credentials: 'include', // <-- 4. Mantenemos las credenciales
        headers: {
          'Content-Type': 'application/json' // <-- 5. MUY importante: avisamos que enviamos JSON
        },
        body: JSON.stringify({ nombre, email }) // <-- 6. Enviamos los datos del estado
      });

      if (!response.ok) {
        // Si el backend da un error (ej. validación falló)
        throw new Error('No se pudo actualizar el perfil. Intenta de nuevo.');
      }

      // Si todo sale bien
      alert("¡Perfil actualizado con éxito!");

    } catch (err: any) {
      // Si el 'fetch' falla (ej. sin conexión) o el backend dio error
      console.error("Error al guardar:", err);
      alert(`Error al guardar: ${err.message}`);
    } finally {
      // Quitar el estado de "guardando..."
      // setSaving(false);
    }
  };

  // --- CAMBIOS AÑADIDOS ---
  // Mientas carga, mostramos esto:
  if (isLoading) {
    return (
      <div className="w-full text-center p-4">
        Cargando perfil...
      </div>
    );
  }
  
  // Si hubo un error, mostramos esto:
  if (error) {
    return (
      <div className="w-full text-center p-4 text-red-500">
        Error: {error}
      </div>
    );
  }

  // Si todo salió bien (no hay carga, no hay error), mostramos el formulario
  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-center mb-6">
        Mi Perfil
      </h2>
    
      <form onSubmit={handleSubmit}>
        
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            Nombre
          </label>
          <input
            type="text"
            id="name"
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm"
            placeholder="Tu nombre completo"
            value={nombre} // El valor ahora viene del 'fetch'
            onChange={(e) => setName(e.target.value)} 
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm"
            placeholder="tu@email.com"
            value={email} // El valor ahora viene del 'fetch'
            onChange={(e) => setEmail(e.target.value)} 
            required
          />
        </div>

        <button 
          type="submit" 
          className="w-full bg-blue-600 text-white p-2.5 rounded-md hover:bg-blue-700 transition-colors"
        >
          Guardar Cambios
        </button>
      </form>
    </div>
  );
};