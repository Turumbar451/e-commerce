import { use } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getFavorites, addFavorite, removeFavorite } from '@/services/favoritesService';
import { GlobalContext } from '@/context/GlobalContext';
import { toast } from 'sonner';
import { ROLES } from '@/lib/constants';

interface FavoritesData {
  favorites: any[];
  favoriteIds: string[];
}

export const useFavorites = () => {
  const queryClient = useQueryClient();
  const { authStatus, user } = use(GlobalContext);

  // Clave única para la caché
  const queryKey = ['favorites'];

  const { data, isLoading } = useQuery({
    queryKey,
    queryFn: getFavorites,
    enabled: authStatus === 'authenticated' && user?.role === ROLES.CUSTOMER,
  });

  // --- MUTACIÓN AÑADIR (OPTIMISTA) ---
  const addMutation = useMutation({
    mutationFn: addFavorite,
    // Se ejecuta ANTES de que la petición salga
    onMutate: async (productId) => {
      // 1. Cancelar cualquier refetch en curso para no sobreescribir nuestra actualización optimista
      await queryClient.cancelQueries({ queryKey });

      // 2. Guardar el estado anterior (snapshot) por si hay error
      const previousData = queryClient.getQueryData<FavoritesData>(queryKey);

      // 3. Actualizar la caché con el nuevo valor INSTANTÁNEAMENTE
      if (previousData) {
        queryClient.setQueryData<FavoritesData>(queryKey, {
          ...previousData,
          favoriteIds: [...previousData.favoriteIds, productId], // Añadimos el ID visualmente
        });
      }

      return { previousData };
    },
    // Si falla el servidor, volvemos atrás
    onError: (_err, _newVar, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(queryKey, context.previousData);
      }
      toast.error('No se pudo añadir a favoritos');
    },
    // Siempre refrescar al final para asegurar sincronía real
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  // --- MUTACIÓN ELIMINAR (OPTIMISTA) ---
  const removeMutation = useMutation({
    mutationFn: removeFavorite,
    onMutate: async (productId) => {
      await queryClient.cancelQueries({ queryKey });
      const previousData = queryClient.getQueryData<FavoritesData>(queryKey);

      if (previousData) {
        queryClient.setQueryData<FavoritesData>(queryKey, {
          ...previousData,
          favoriteIds: previousData.favoriteIds.filter((id) => id !== productId), // Quitamos el ID visualmente
        });
      }

      return { previousData };
    },
    onError: (_err, _newVar, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(queryKey, context.previousData);
      }
      toast.error('No se pudo eliminar de favoritos');
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  return {
    favoriteIds: data?.favoriteIds || [],
    favoriteProducts: data?.favorites || [],
    isLoadingFavorites: isLoading,

    addFavorite: addMutation.mutate,
    removeFavorite: removeMutation.mutate,
  };
};