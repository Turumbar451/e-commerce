import { useFavorites } from '@/features/favorites/hooks/useFavorites';
import { useAuthenticatedAction } from '@/hooks/useAuthenticatedAction';

export const useProductFavorites = (sku: string) => {
  const { performAuthenticatedAction } = useAuthenticatedAction();
  const { favoriteSKUs, addFavorite, removeFavorite } = useFavorites();

  // Lógica pura de datos
  const isFavorite = favoriteSKUs.includes(sku);

  const toggleFavoriteAction = () => {
    if (isFavorite) {
      removeFavorite(sku);
    } else {
      addFavorite(sku);
    }
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    performAuthenticatedAction(
      toggleFavoriteAction,
      'Inicia sesión para guardar favoritos'
    );
  };

  return {
    isFavorite,
    handleFavoriteClick,
  };
};