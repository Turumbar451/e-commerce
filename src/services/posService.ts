import api from '@/lib/axios';

export interface PosSaleSummary {
  order_id: string;
  fecha: string;
  total: number;
  subtotal: number;
  iva: number;
  metodo_pago: string;
}

export interface GetMySalesResponse {
  items: PosSaleSummary[];
  page: number;
  totalPages: number;
  totalCount: number;
}

export const getMyPosSales = async (page = 1, limit = 20): Promise<GetMySalesResponse> => {
  const { data } = await api.get<GetMySalesResponse>('/pos/my-sales', {
    params: { page, limit },
  });
  return data;
};

export interface CreatePosRefundItem {
  sku: string;
  size: string;
  cantidad: number;
}

export interface CreatePosRefundPayload {
  invoice_id: string;
  items: CreatePosRefundItem[];
  motivo?: string;
}

export interface CreatePosRefundResponse {
  refund_id: string;
  totalReembolsado: number;
}

export const createPosRefund = async (
  payload: CreatePosRefundPayload
): Promise<CreatePosRefundResponse> => {
  const { data } = await api.post<CreatePosRefundResponse>('/pos/refunds', payload);
  return data;
};
