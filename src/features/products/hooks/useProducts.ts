import type { IProductForCard } from '@/interfaces/product';
import { getProducts } from '@/services/productService';
import { useQuery } from '@tanstack/react-query';

//hook para obtener la lista de productos
export const useProducts = () => {
    const { data, isLoading, isError, error } = useQuery<
        IProductForCard[], // tipo de dato que entra
        Error            //tipo de error
    >({
        queryKey: ['products'], // llave de cacke para tanstack (como en el localstorage)
        queryFn: getProducts,   // funcion que llama a la api en caso de no encontrar products

    });
    console.log(data);

    return {
        products: data, // renombramiento
        isLoading,
        isError,
        error,
    };
};