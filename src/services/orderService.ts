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
