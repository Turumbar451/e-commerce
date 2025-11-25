import api from '@/lib/axios';

// Nueva interfaz de respuesta
interface FavoritesApiResponse {
  favorites: any[]; // Aquí vendrán los productos completos
  favoriteIds: string[]; // Aquí solo los IDs strings
}

export const getFavorites = async (): Promise<FavoritesApiResponse> => {
  const { data } = await api.get<FavoritesApiResponse>('/favorites');
  return data;
};

// Cambiamos SKU por productId
export const addFavorite = async (productId: string) => {
  const { data } = await api.post('/favorites', { productId });
  return data;
};

export const removeFavorite = async (productId: string) => {
  const { data } = await api.delete(`/favorites/${productId}`);
  return data;
};