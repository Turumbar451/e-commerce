// src/features/user/UserAddresses.tsx
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

// --- 1. Interfaz correcta (coincide con tu backend) ---
interface Address {
  _id: string; // MongoDB usa _id como string
  recipientName: string;
  phone: string;
  street: string;
  neighborhood: string;
  zipCode: string;
  city: string;
  state: string;
  // (y cualquier otro campo que definimos en el backend)
}

// --- 2. URL correcta del Backend ---
const API_URL = 'http://localhost:3000/api/address';

// --- 3. Funciones de API (ahora separadas) ---

// Función para OBTENER direcciones
const fetchUserAddresses = async (): Promise<Address[]> => {
  const { data } = await axios.get(API_URL, {
    withCredentials: true, // ¡Importante para enviar la cookie del token!
  });
  return data;
};

// Función para BORRAR una dirección
const deleteAddress = async (addressId: string) => {
  return axios.delete(`${API_URL}/${addressId}`, {
    withCredentials: true, // También necesita el token
  });
};

// --- 4. Componente de React ---
export function UserAddresses() {
  const queryClient = useQueryClient(); // Para actualizar la lista después de borrar

  // --- 5. Hook 'useQuery' para OBTENER las direcciones ---
  // Reemplaza a tu useEffect, useState de 'isLoading', 'error' y 'addresses'
  const {
    data: addresses,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['addresses'], // "Nombre" de esta consulta en caché
    queryFn: fetchUserAddresses, // Función que se llamará para fetchear
  });

  // --- 6. Hook 'useMutation' para BORRAR una dirección ---
  // Reemplaza a tu función 'handleDelete'
  const deleteMutation = useMutation({
    mutationFn: deleteAddress, // Función que se llamará al ejecutar la mutación
    
    // Esto se ejecuta si el borrado fue exitoso:
    onSuccess: () => {
      alert('Dirección eliminada');
      // Invalida el caché de 'addresses', lo que fuerza a useQuery a
      // volver a pedir los datos (y así la lista se refresca sola).
      queryClient.invalidateQueries({ queryKey: ['addresses'] });
    },
    // Esto se ejecuta si el borrado falla:
    onError: (err: any) => {
      alert(`Error al eliminar: ${err.message}`);
    },
  });

  // --- 7. Renderizado (con los datos correctos) ---
  if (isLoading) {
    return <div className="w-full text-center p-4">Cargando direcciones...</div>;
  }

  if (isError) {
    return (
      <div className="w-full text-center p-4 text-red-500">
        Error: {error?.message || 'Error al cargar'}
      </div>
    );
  }

  return (
    <div className="w-full mt-6">
      <h2 className="text-2xl font-bold text-center mb-6">Mis Direcciones</h2>

      <div className="mb-6 text-right">
        <button className="bg-green-600 text-white p-2.5 rounded-md hover:bg-green-700">
          + Añadir Nueva Dirección
        </button>
      </div>

      <div className="space-y-4">
        {addresses && addresses.length === 0 && (
          <p className="text-center text-gray-500">
            No tienes direcciones guardadas.
          </p>
        )}

        {/* 8. Mapeo con los nombres correctos de la API */}
        {addresses?.map((addr) => (
          <div
            key={addr._id} // <-- Usar _id
            className="p-4 border border-gray-300 rounded-md shadow-sm flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">{addr.recipientName}</p> {/* <-- Nombre correcto */}
              <p className="text-sm text-gray-600">{addr.street}</p> {/* <-- Nombre correcto */}
              <p className="text-sm text-gray-600">
                {addr.neighborhood}, {addr.zipCode}
              </p>
              <p className="text-sm text-gray-600">{addr.city}, {addr.state}</p>
            </div>

            <div className="space-x-2">
              <button
                onClick={() => alert('Función de editar pendiente')}
                className="text-blue-600 hover:underline"
              >
                Editar
              </button>
              <button
                onClick={() => {
                  if (window.confirm('¿Estás seguro?')) {
                    // Llama a la mutación de borrado
                    deleteMutation.mutate(addr._id); 
                  }
                }}
                className="text-red-600 hover:underline"
                disabled={deleteMutation.isPending} // Deshabilita el botón mientras borra
              >
                {deleteMutation.isPending ? 'Eliminando...' : 'Eliminar'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}