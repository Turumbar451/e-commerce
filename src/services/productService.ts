//este servicio se encargara de llamar al endpoint de productos

import type { IProductFromApi } from '@/interfaces/product';
import api from '@/lib/axios';

export const getProducts = async (): Promise<IProductFromApi[]> => {
    const { data } = await api.get('/products');
    return data;
};