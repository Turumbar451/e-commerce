import api from '@/lib/axios';

export interface CheckoutPosItem {
  sku: string;
  cantidad: number;
  size: string;
}

export interface CheckoutPosPayload {
  items: CheckoutPosItem[];
  metodo_pago: 'Efectivo' | 'Tarjeta';
  origen_venta?: string;
}

export interface CheckoutPosResponse {
  order_id: string;
  subtotal: number;
  iva: number;
  total_pagado: number;
  invoice_id: string;
  ticket_id?: string;
}

export const checkoutPosSale = async (
  payload: CheckoutPosPayload
): Promise<CheckoutPosResponse> => {
  const { data } = await api.post<CheckoutPosResponse>(
    '/orders/checkout-pos',
    payload
  );
  return data;
};

export interface OrderDetail {
  order_id: string;
  items: Array<{
    sku: string;
    size: string;
    cantidad: number;
    precio_unitario: number;
    nombre: string;
    imagen: string;
  }>;
  total: number;
  subtotal: number;
  iva: number;
  costo_envio: number;
  estatus: string;
  fecha: string;
  direccion_envio: {
    calle: string;
    numero: string;
    colonia: string;
    ciudad: string;
    estado: string;
    cp: string;
  };
}

export const getOrderById = async (orderId: string): Promise<OrderDetail> => {
  const { data } = await api.get<OrderDetail>(`/orders/${orderId}`);
  return data;
};