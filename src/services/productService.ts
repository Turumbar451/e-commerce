import type { IProductFromApi, IProductDetail } from '@/interfaces/product';
import api from '@/lib/axios';

export const getProducts = async (): Promise<IProductFromApi[]> => {
    const { data } = await api.get('/products');
    return data;
};


//para paginas detalladas
export const getProductById = async (productId: string): Promise<IProductDetail> => {
    // ruta del endpoint  /products/12345abcdef
    const { data } = await api.get(`/products/${productId}`);
    return data;
};