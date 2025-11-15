import { useQuery, keepPreviousData } from '@tanstack/react-query'; // 1. Importar 'keepPreviousData'
import {
    getAdminProducts,
    type PaginatedAdminProducts,
} from '@/services/inventoryService'; // 2. Importar el tipo de la respuesta
import { useState } from 'react';

const ITEMS_PER_PAGE = 20;

export const useAdminProducts = () => {
    const [page, setPage] = useState(1);

    const { data, isLoading, isError, error } = useQuery<
        PaginatedAdminProducts,
        Error
    >({
        queryKey: ['adminProducts', page, ITEMS_PER_PAGE],
        queryFn: () => getAdminProducts(page, ITEMS_PER_PAGE),

        // --- 3. ESTA ES LA CORRECCIÓN ---
        // 'keepPreviousData' se usa así en v5
        placeholderData: keepPreviousData,
    });

    return {
        products: data?.data || [],
        pagination: data?.pagination,
        isLoading,
        isError,
        error,
        page,
        setPage, // Esto se retorna correctamente
    };
};