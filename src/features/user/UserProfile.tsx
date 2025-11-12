import { useState, type FormEvent } from 'react';

export const UserProfile = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');


  const handleSubmit = (event: FormEvent) => {
    event.preventDefault(); 
    
    
    console.log("Datos del perfil guardados:", { name, email });
    alert("¡Perfil actualizado!"); // Un aviso simple
  };

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
            value={name} 
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
            value={email} 
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