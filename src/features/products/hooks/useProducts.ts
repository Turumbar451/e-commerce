import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import type { IProductResponse } from '@/interfaces/product';
import { fetchProducts } from '@/services/productService';

const PRODUCTS_PER_PAGE = 10;

// Aceptamos una categoría opcional (por defecto es null -> todos los productos)
export const useProducts = (initialCategory: string | null = null) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeCategory, setActiveCategory] = useState<string | null>(initialCategory);

  const { data, isLoading, isError, isFetching, error } = useQuery<IProductResponse, Error>({
    // La clave depende de la página Y de la categoría
    queryKey: ['products', currentPage, activeCategory],

    queryFn: () => fetchProducts({
      page: currentPage,
      limit: PRODUCTS_PER_PAGE,
      category: activeCategory || undefined, // Enviamos la categoría si existe
    }),

    // Mantiene los datos viejos mientras cargan los nuevos
    placeholderData: (previousData) => previousData,
  });

  return {
    products: data?.products,
    pagination: data?.pagination,
    isLoading,
    isError,
    isFetching,
    currentPage,
    setCurrentPage,
    // Devolvemos también el control de categoría por si lo necesitas luego
    activeCategory,
    setActiveCategory,
    error,
  };
};