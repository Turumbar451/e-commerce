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
  size: string;
  cantidad: number;
}

export interface RemoveItemPayload {
  sku: string;
  size: string;
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

  // AQUI ESTA LA CORRECCION: Enviamos 'quantity' al backend
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
  const { sku, size, cantidad } = payload;
  // AQUI TAMBIEN: Enviamos 'quantity' al backend
  const body = { quantity: cantidad };
  
  const { data } = await api.put(`/cart/${sku}/${encodeURIComponent(size)}`, body);
  return data;
};

// DELETE /api/cart/:sku/:size
export const removeFromCart = async ({ sku, size }: RemoveItemPayload) => {
  const { data } = await api.delete(`/cart/${sku}/${encodeURIComponent(size)}`);
  return data;
};