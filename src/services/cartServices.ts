import api from '@/lib/axios';

// 1. Actualizamos la interfaz para coincidir con el Backend (cartController.js)
export interface ICartItem {
  sku: string;
  quantity: number; // Antes: cantidad
  name: string;     // Antes: nombre_producto
  size: string;     // Antes: talla
  price: number;    // Antes: precio
  image: string;    // El backend envía 'image', no 'imageUrl'
  brand: string;    // El backend envía esto extra
  productId: string; // El backend envía esto extra
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
  // Mapeamos 'cantidad' del form a 'quantity' del backend
  const body = {
    sku: payload.sku,
    size: payload.size,
    quantity: payload.cantidad 
  };
  const { data } = await api.post('/cart', body);
  return data;
};

// PUT /api/cart/:sku/:size 
export const updateCartItem = async (payload: UpdateCartPayload) => {
  //creo que deberia incluir tamnien la talla...
  const { sku, size, cantidad } = payload;
  const body = { quantity: cantidad };
  const { data } = await api.put(`/cart/${sku}/${encodeURIComponent(size)}`, body);
  return data;
};

// DELETE /api/cart/:sku/:size
export const removeFromCart = async (payload: { sku: string, size: string }) => {
  const { sku, size } = payload;
  const { data } = await api.delete(`/cart/${sku}/${encodeURIComponent(size)}`);
  return data;
};