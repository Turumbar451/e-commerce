import { use } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getFavorites, addFavorite, removeFavorite } from '@/services/favoritesService';
import { GlobalContext } from '@/context/GlobalContext';
import { toast } from 'sonner';

export const useFavorites = () => {
  const queryClient = useQueryClient();
  const { authStatus } = use(GlobalContext);

  const { data, isLoading } = useQuery({
    queryKey: ['favorites'],
    queryFn: getFavorites,
    enabled: authStatus === 'authenticated',
  });

  const addMutation = useMutation({
    mutationFn: addFavorite,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
      toast.success('¡Añadido a favoritos!');
    },
    onError: () => toast.error('Error al añadir'),
  });

  const removeMutation = useMutation({
    mutationFn: removeFavorite,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
      toast.info('Eliminado de favoritos');
    },
    onError: () => toast.error('Error al eliminar'),
  });

  return {
    favoriteIds: data?.favoriteIds || [], // Array de strings ["id1", "id2"]
    favoriteProducts: data?.favorites || [], // Array de objetos completos
    isLoadingFavorites: isLoading,
    
    addFavorite: addMutation.mutate,
    removeFavorite: removeMutation.mutate,
  };
};