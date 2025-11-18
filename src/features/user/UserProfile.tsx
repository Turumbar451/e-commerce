<<<<<<< HEAD
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
=======
import { useState, type FormEvent } from 'react';

export const UserProfile = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');


  const handleSubmit = (event: FormEvent) => {
    event.preventDefault(); 
    
    
    console.log("Datos del perfil guardados:", { name, email });
    alert("¡Perfil actualizado!"); // Un aviso simple
>>>>>>> main
  };

  return (
    <div className="w-full">
<<<<<<< HEAD
      <h2 className="text-2xl font-bold text-center mb-6">Mi Perfil</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2">Nombre</label>
          <input
            className="w-full p-2 border rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
=======
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
>>>>>>> main
          />
        </div>

        <div className="mb-6">
<<<<<<< HEAD
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
=======
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
>>>>>>> main
        </button>
      </form>
    </div>
  );
<<<<<<< HEAD
};
=======
};
>>>>>>> main
