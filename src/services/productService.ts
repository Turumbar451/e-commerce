import type { IProductDetail, IProductForCard, IProductResponse } from '@/interfaces/product';
import api from '@/lib/axios';

// 1. Añadimos 'category' como opcional (?)
interface FetchProductsParams {
  page: number;
  limit: number;
  category?: string; 
  targetGender?: 'H' | 'M' | 'N';
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
}

export const fetchProducts = async ({
  page,
  limit,
  category,
  targetGender,
  brand,
  minPrice,
  maxPrice,
}: FetchProductsParams): Promise<IProductResponse> => {
  
  // 2. Creamos el objeto de parámetros
  const params: Record<string, unknown> = { page, limit };
  
  // 3. Si hay categoría, la agregamos al envío
  if (category) {
    params.category = category;
  }

  // 4. Si hay targetGender, también lo agregamos
  if (targetGender) {
    params.targetGender = targetGender;
  }

  if (brand) {
    params.brand = brand;
  }

  if (typeof minPrice === 'number') {
    params.minPrice = minPrice;
  }

  if (typeof maxPrice === 'number') {
    params.maxPrice = maxPrice;
  }

  const { data } = await api.get('/products', { params });
  return data as IProductResponse;
};

export const getProducts = async (): Promise<IProductForCard[]> => {
    const { data } = await api.get('/products');
    return data;
};


//para paginas detalladas
export const getProductById = async (
    productId: string
): Promise<IProductDetail> => {
    const { data } = await api.get<IProductDetail>(`/products/${productId}`);
    return data;
};