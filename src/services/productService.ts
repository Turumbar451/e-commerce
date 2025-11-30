import type { IProductDetail, IProductForCard, IProductResponse } from '@/interfaces/product';
import api from '@/lib/axios';

// 1. Añadimos 'category' como opcional (?) y 'search'
interface FetchProductsParams {
  page: number;
  limit: number;
  category?: string; 
  targetGender?: 'H' | 'M' | 'N';
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
}

export const fetchProducts = async ({
  page,
  limit,
  category,
  targetGender,
  brand,
  minPrice,
  maxPrice,
  search,
}: FetchProductsParams): Promise<IProductResponse> => {
  
  console.log(' fetchProducts llamada - INICIO'); // Debug
  console.log('fetchProducts - params:', { page, limit, category, targetGender, brand, minPrice, maxPrice, search }); // Debug
  
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

  if (search) {
    params.search = search;
  }

  console.log('fetchProducts - final params:', params); // Debug
  console.log(' Haciendo llamada a:', `/products?${new URLSearchParams(params as any).toString()}`); // Debug

  try {
    const { data } = await api.get('/products', { params });
    console.log('fetchProducts - response:', data); // Debug
    return data as IProductResponse;
  } catch (error) {
    console.error('fetchProducts - error:', error); // Debug
    throw error;
  }
};

export const getProducts = async (searchTerm: string = ''): Promise<IProductForCard[]> => {
  const url = searchTerm 
        ? `/products?search=${encodeURIComponent(searchTerm)}` 
        : '/products';

    const { data } = await api.get(url);
    return data;
};


//para paginas detalladas
export const getProductById = async (
    productId: string
): Promise<IProductDetail> => {
    const { data } = await api.get<IProductDetail>(`/products/${productId}`);
    return data;
};