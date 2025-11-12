import type { IProductForCard, IProductFromApi } from '@/interfaces/product';
import { getProducts } from '@/services/productService';
import { useQuery } from '@tanstack/react-query';


// funcion transforma datos de la API (IProductFromApi)
// a estructura que nuestros componentes de UI (IProductForCard) esperan
const transformDataForCard = (data: IProductFromApi[]): IProductForCard[] => {
    return data.map(product => {
        return {
            id: product.product_id,
            name: product.nombre,
            price: product.precio_base,
            // datos de mientras, no se si el backend los regresara. 
            brand: 'Marca',
            imageUrl: '/placeholder-shoe.jpg' // en /public poner la imagen
        };
    });
};

//hook para obtener la lista de productos
export const useProducts = () => {
    const { data, isLoading, isError, error } = useQuery<
        IProductFromApi[], // tipo de dato que entra de la api
        Error,            //tipo de error
        IProductForCard[] // tipo de dato que sale
    >({
        queryKey: ['products'], // llave de cacke para tanstack (como en el localstorage)
        queryFn: getProducts,   // funcion que llama a la api en caso de no encontrar products
        select: transformDataForCard // funcion que transforma los datos de getProducts a algo que a mi me sirve
    });
    console.log(data);

    return {
        products: data, // renombramiento
        isLoading,
        isError,
        error,
    };
};