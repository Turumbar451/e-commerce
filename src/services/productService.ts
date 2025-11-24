import type { 
    IProductResponse, 
    IProductDetail, 
    IProductForCard 
} from '@/interfaces/product';

// Define los tipos para los parámetros que vamos a enviar en la URL
interface FetchProductsParams {
    page: number;
    limit: number;
}

import api from '@/lib/axios';

// 1. FUNCIÓN MODIFICADA PARA PAGINACIÓN
export const fetchProducts = async ({
    page,
    limit,
}: FetchProductsParams): Promise<IProductResponse> => {
    
    // Enviamos los parámetros 'page' y 'limit' en la petición GET
    const { data } = await api.get('/products', {
        params: { page, limit }, // Axios serializa esto como /products?page=X&limit=Y
    });
    
    // Asumimos que el backend devuelve un objeto
    return data as IProductResponse;
};

// --- Tu función original se mantiene para el componente Card, pero ten cuidado con el retorno ---
export const getProducts = async (): Promise<IProductForCard[]> => {
    // NOTA: Si esta función ya no se usa, ¡puedes eliminarla! 
    const { data } = await api.get('/products');
    return data;
};


// para paginas detalladas
export const getProductById = async (
    productId: string
): Promise<IProductDetail> => {
    const { data } = await api.get<IProductDetail>(`/products/${productId}`);
    return data;
};