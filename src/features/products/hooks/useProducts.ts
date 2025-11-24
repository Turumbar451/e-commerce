import { useState } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
// Importa el tipo de respuesta completa que incluye la paginación
import type { IProductResponse } from '@/interfaces/product'; 
// Importa la nueva función de servicio que acepta page y limit
import { fetchProducts } from '@/services/productService'; 

// Productos a mostrar por página
const PRODUCTS_PER_PAGE = 10; 

// Hook para obtener la lista de productos con paginación
export const useProducts = () => {
    
    // 1. Estado para manejar la página actual
    const [currentPage, setCurrentPage] = useState(1); 

    const { 
        data, 
        isLoading, 
        isError,
        isFetching, // <--- CLAVE: Devuelve el estado de recarga
        error
    } = useQuery<IProductResponse, Error>({
        // 2. La llave de la caché cambia con la página para forzar el re-fetch
        queryKey: ['products', currentPage], 
        
        // 3. Función que llama a la API con la página y el límite
        queryFn: () => fetchProducts({ page: currentPage, limit: PRODUCTS_PER_PAGE }), 
        
        // Permite que la lista de productos anterior se quede visible mientras se carga la nueva página
        placeholderData: (keepPreviousData) => keepPreviousData, 
    });

    return { 
        // Devolvemos la lista de productos (data?.products)
        products: data?.products, 
        // Devolvemos la metadata de la paginación
        pagination: data?.paginationInfo, 
        isLoading, 
        isError,
        isFetching, // <--- CORRECCIÓN del Error 2339
        currentPage, 
        setCurrentPage,
        error,
    };
};