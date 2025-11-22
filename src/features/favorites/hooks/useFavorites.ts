import { use } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getFavorites, addFavorite, removeFavorite } from '@/services/favoritesService';
import { GlobalContext } from '@/context/GlobalContext';
import { toast } from 'sonner';

export const useFavorites = () => {
  const queryClient = useQueryClient();
  const { authStatus } = use(GlobalContext);

  // Query para obtener la lista de SKUs favoritos
  const { data, isLoading } = useQuery({
    queryKey: ['favorites'],
    queryFn: getFavorites,
    enabled: authStatus === 'authenticated',
  });

  // Mutación para AÑADIR
  const addMutation = useMutation({
    mutationFn: addFavorite,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
      toast.success('¡Añadido a favoritos!');
    },
    onError: () => {
      toast.error('Error al añadir a favoritos');
    },
  });

  // Mutación para ELIMINAR
  const removeMutation = useMutation({
    mutationFn: removeFavorite,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
      toast.info('Eliminado de favoritos');
    },
    onError: () => {
      toast.error('Error al eliminar de favoritos');
    },
  });

  return {
    favoriteSKUs: data?.favorites || [],
    isLoadingFavorites: isLoading,
    
    addFavorite: addMutation.mutate,
    isAddingFavorite: addMutation.isPending,
    
    removeFavorite: removeMutation.mutate,
    isRemovingFavorite: removeMutation.isPending,
  };
};