import { use } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getCart, addToCart, updateCartItem, removeFromCart } from '@/services/cartServices';
import { GlobalContext } from '@/context/GlobalContext';
import { toast } from 'sonner';
import { ROLES } from '@/lib/constants';

export const useCart = () => {
  const queryClient = useQueryClient();
  const { authStatus, user } = use(GlobalContext);

  // Obtener los datos del carrito
  const { data, isLoading, error } = useQuery({
    queryKey: ['cart'], // La "llave" única para el caché de este query
    queryFn: getCart,  // La función que se llamará para obtener los datos
    enabled: authStatus === 'authenticated' && user?.role === ROLES.CUSTOMER,
    retry: 1,
  });

  // Funciones para modificar el carrito

  // AÑADIR
  const addMutation = useMutation({
    mutationFn: addToCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      toast.success('¡Añadido al carrito!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Error al añadir al carrito');
    }
  });

  // ACTUALIZAR (Cantidad)
  const updateMutation = useMutation({
    mutationFn: updateCartItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      toast.success('Carrito actualizado')
    },
    onError: () => {
      toast.error('No se pudo actualizar la cantidad');
    }
  });

  // BORRAR
  const removeMutation = useMutation({
    mutationFn: removeFromCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      toast.info('Producto eliminado del carrito.');
    },
    onError: () => {
      toast.error('No se pudo eliminar el producto');
    }
  });

  return {
    cart: data?.items || [], // Los items del carrito (o un array vacío)
    isLoadingCart: isLoading,
    cartError: error,

    
    addItem: addMutation.mutate,
    isAddingItem: addMutation.isPending,
    
    updateItem: updateMutation.mutate,
    isUpdatingItem: updateMutation.isPending,
    
    // OJO: removeItem ahora espera un objeto { sku, size }
    removeItem: removeMutation.mutate, 
    isRemovingItem: removeMutation.isPending,
  };
};