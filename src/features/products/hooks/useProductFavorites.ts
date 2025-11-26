import { useFavorites } from '@/features/favorites/hooks/useFavorites';
import { useAuthenticatedAction } from '@/hooks/useAuthenticatedAction';

// Recibimos productId (el _id de mongo), NO el SKU
export const useProductFavorites = (productId: string) => {
  const { performAuthenticatedAction } = useAuthenticatedAction();
  const { favoriteIds, addFavorite, removeFavorite } = useFavorites();

  // Verificamos si el ID está en la lista
  const isFavorite = favoriteIds.includes(productId);

  const toggleFavoriteAction = () => {
    if (isFavorite) {
      removeFavorite(productId);
    } else {
      addFavorite(productId);
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