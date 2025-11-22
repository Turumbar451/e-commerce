import api from '@/lib/axios';

interface FavoritesApiResponse {
  favorites: string[]; // Suponemos que la API devuelve un array de SKUs
}

// GET /api/favorites
export const getFavorites = async (): Promise<FavoritesApiResponse> => {
  const { data } = await api.get<FavoritesApiResponse>('/favorites');
  return data;
};

// POST /api/favorites
export const addFavorite = async (sku: string) => {
  const { data } = await api.post('/favorites', { sku });
  return data;
};

// DELETE /api/favorites/:sku
export const removeFavorite = async (sku: string) => {
  const { data } = await api.delete(`/favorites/${sku}`);
  return data;
};