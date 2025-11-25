import api from '@/lib/axios';

export interface ICartItem {
  sku: string;
  cantidad: number;
  nombre_producto: string;
  talla: number;
  precio: number;
}

export interface AddToCartPayload {
  sku: string;
  size: string; // <-- AÑADIR ESTO
  cantidad: number;
}

export interface UpdateCartPayload {
  sku: string;
  size: string; // <-- AÑADIR ESTO
  cantidad: number;
}

interface CartApiResponse {
  items: ICartItem[];
}

// GET /api/cart
export const getCart = async (): Promise<CartApiResponse> => {
  const { data } = await api.get<CartApiResponse>('/cart');
  return data;
};

// POST /api/cart
export const addToCart = async (payload: AddToCartPayload) => {
  const { data } = await api.post('/cart', payload);
  return data;
};

// PUT /api/cart/:sku/:size 
export const updateCartItem = async (payload: UpdateCartPayload) => {
  //creo que deberia incluir tamnien la talla...
  const { sku, size, cantidad } = payload;
  const { data } = await api.put(`/cart/${sku}/${encodeURIComponent(size)}`, { cantidad });
  return data;
};

// DELETE /api/cart/:sku/:size
export const removeFromCart = async (payload: { sku: string, size: string }) => {
  const { sku, size } = payload;
  const { data } = await api.delete(`/cart/${sku}/${encodeURIComponent(size)}`);
  return data;
};