import { useQuery, keepPreviousData } from '@tanstack/react-query';
import {
    getAdminProducts,
    type PaginatedAdminProducts,
} from '@/services/inventoryService';
import { useState } from 'react';

const ITEMS_PER_PAGE = 10;
//hook para la paginaccion del admin
export const useAdminProducts = () => {
    const [page, setPage] = useState(1);

    const { data, isLoading, isError, error } = useQuery<
        PaginatedAdminProducts,
        Error
    >({
        queryKey: ['adminProducts', page, ITEMS_PER_PAGE],
        queryFn: () => getAdminProducts(page, ITEMS_PER_PAGE),

        staleTime: 1000 * 60 * 5, //esto es para que la data sea fresca por 5 minutos

        placeholderData: keepPreviousData, // mantiene la data anterior mientras carga la nueva
    });

    return {
        products: data?.data || [],
        pagination: data?.pagination,
        isLoading,
        isError,
        error,
        page,
        setPage,
    };
};