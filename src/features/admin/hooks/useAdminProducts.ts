import { useQuery, keepPreviousData } from '@tanstack/react-query';
import {
    getAdminProducts,
    type PaginatedAdminProducts,
} from '@/services/inventoryService';
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


        placeholderData: keepPreviousData,
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