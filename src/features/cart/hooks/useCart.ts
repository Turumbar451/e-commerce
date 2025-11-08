// src/features/cart/hooks/useCart.ts
import { use } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getCart, addToCart, updateCartItem, removeFromCart } from '@/services/cartServices';
import { GlobalContext } from '@/context/GlobalContext';
import { toast } from 'sonner';

export const useCart = () => {
  const queryClient = useQueryClient();
  const { authStatus } = use(GlobalContext);

  // 1. EL QUERY: Obtener los datos del carrito
  const { data, isLoading, error } = useQuery({
    queryKey: ['cart'], // La "llave" única para el caché de este query
    queryFn: getCart,  // La función que se llamará para obtener los datos
    enabled: authStatus === 'authenticated', 
    retry: 1, 
  });

  // 2. LAS MUTACIONES: Funciones para modificar el carrito

  // Mutación para AÑADIR
  const addMutation = useMutation({
    mutationFn: addToCart,
    onSuccess: () => {
      // ¡LA MAGIA! Invalidamos el caché de ['cart'].
      // Esto le dice a TanStack Query que los datos están "viejos"
      // y automáticamente volverá a ejecutar el 'useQuery' de arriba.
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      toast.success('¡Añadido al carrito!');
    },
  });

  // Mutación para ACTUALIZAR
  const updateMutation = useMutation({
    mutationFn: updateCartItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      toast.success('Carrito actualizado')
    },
  });

  // Mutación para BORRAR
  const removeMutation = useMutation({
    mutationFn: removeFromCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      toast.info('Producto eliminado del carrito.');
    },
  });

  return {
    cart: data?.items || [], // Los items del carrito (o un array vacío)
    isLoadingCart: isLoading,
    cartError: error,
    addItem: addMutation.mutate,
    isAddingItem: addMutation.isPending,
    updateItem: updateMutation.mutate,
    isUpdatingItem: updateMutation.isPending,
    removeItem: removeMutation.mutate,
    isRemovingItem: removeMutation.isPending,
  };
};