// src/services/cartServices.ts
import api from '@/lib/axios'; // Nuestra instancia de Axios configurada

// Definimos la forma de un item del carrito (basado en la respuesta del backend)
export interface ICartItem {
  sku: string;
  cantidad: number;
  nombre_producto: string;
  talla: number;
  precio: number;
}

// Definimos la respuesta de la API para GET /api/cart
interface CartApiResponse {
  items: ICartItem[];
}

// GET /api/cart
export const getCart = async (): Promise<CartApiResponse> => {
  const { data } = await api.get<CartApiResponse>('/cart');
  return data;
};

// POST /api/cart
export const addToCart = async (payload: { sku: string; cantidad: number }) => {
  const { data } = await api.post('/cart', payload);
  return data;
};

// PUT /api/cart/:sku
export const updateCartItem = async (payload: { sku: string; cantidad: number }) => {
  const { data } = await api.put(`/cart/${payload.sku}`, { cantidad: payload.cantidad });
  return data;
};

// DELETE /api/cart/:sku
export const removeFromCart = async (sku: string) => {
  const { data } = await api.delete(`/cart/${sku}`);
  return data;
};