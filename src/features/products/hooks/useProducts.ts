import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import type { IProductResponse } from '@/interfaces/product';
import { fetchProducts } from '@/services/productService';

const PRODUCTS_PER_PAGE = 12; //poner solo numeros multiplos de 4

// Aceptamos una categoría opcional y un género opcional (por defecto null -> todos los productos)
export const useProducts = (
  initialCategory: string | null = null,
  initialTargetGender: 'H' | 'M' | 'N' | null = null
) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeCategory, setActiveCategory] = useState<string | null>(initialCategory);
  const [activeTargetGender, setActiveTargetGender] = useState<'H' | 'M' | 'N' | null>(initialTargetGender);

  // Cuando cambie la categoría inicial o el género inicial (por cambio de ruta),
  // sincronizamos el estado interno y regresamos a la página 1.
  useEffect(() => {
    setActiveCategory(initialCategory);
    setActiveTargetGender(initialTargetGender);
    setCurrentPage(1);
  }, [initialCategory, initialTargetGender]);

  const { data, isLoading, isError, isFetching, error } = useQuery<IProductResponse, Error>({
    // La clave depende de la página, categoría y género
    queryKey: ['products', currentPage, activeCategory, activeTargetGender],

    queryFn: () => fetchProducts({
      page: currentPage,
      limit: PRODUCTS_PER_PAGE,
      category: activeCategory || undefined, // Enviamos la categoría si existe
      targetGender: activeTargetGender || undefined, // Enviamos el género si existe
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
    activeTargetGender,
    setActiveTargetGender,
    error,
  };
};