import api from '@/lib/axios';
import type { IProductDetail } from '@/interfaces/product';

interface CreateProductResponse {
    message: string;
    product_id: string;
}


export const createProductV2 = async (productData: IProductDetail): Promise<CreateProductResponse> => {
    const { data } = await api.post<CreateProductResponse>('/admini/products-v2', productData);
    return data; //no es la respuesta de axios, es la data destructurada
};