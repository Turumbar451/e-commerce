import { useQuery } from '@tanstack/react-query';
import { getAdminProducts } from '@/services/inventoryService';
import type { IProductDetail } from '@/interfaces/product';

//este hook sera para obtener todos los productos para la tabla de admin de inventario, la conexion entre el servicio y el componente
export const useAdminProducts = () => {
    const { data, isLoading, isError, error } = useQuery<IProductDetail[], Error>({
        queryKey: ['adminProducts'], // esta data tendra esta clave
        queryFn: getAdminProducts,
    });

    return {
        products: data || [], // mientras carga []
        isLoading,
        isError,
        error,
    };
};