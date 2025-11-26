import { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import type { IProductResponse } from '@/interfaces/product';
import { fetchProducts } from '@/services/productService';

const PRODUCTS_PER_PAGE = 12; //poner solo numeros multiplos de 4

// Aceptamos una categoría opcional, un género opcional (por defecto null -> todos los productos) y un término de búsqueda
export const useProducts = (
  initialCategory: string | null = null,
  initialTargetGender: 'H' | 'M' | 'N' | null = null,
  searchQuery: string = ''
) => {
  console.log('🚀 useProducts hook llamado - searchQuery:', searchQuery); // Debug
  const queryClient = useQueryClient();
  
  const [currentPage, setCurrentPage] = useState(1);
  const [activeCategory, setActiveCategory] = useState<string | null>(initialCategory);
  const [activeTargetGender, setActiveTargetGender] = useState<'H' | 'M' | 'N' | null>(initialTargetGender);
  const [activeBrand, setActiveBrand] = useState<string | null>(null);
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState(searchQuery);

  // Cuando cambie la categoría inicial, el género inicial o el término de búsqueda (por cambio de ruta),
  // sincronizamos el estado interno y regresamos a la página 1.
  useEffect(() => {
    setActiveCategory(initialCategory);
    setActiveTargetGender(initialTargetGender);
    setSearchTerm(searchQuery);
    setCurrentPage(1);
    
    // Invalidar cache cuando cambia la búsqueda
    console.log('🔄 Invalidando cache por cambio de búsqueda'); // Debug
    queryClient.invalidateQueries({ queryKey: ['products'] });
  }, [initialCategory, initialTargetGender, searchQuery, queryClient]);

  const { data, isLoading, isError, isFetching, error } = useQuery<IProductResponse, Error>({
    // La clave depende de la página, categoría, género, marca, precio y término de búsqueda
    queryKey: ['products', currentPage, activeCategory, activeTargetGender, activeBrand, minPrice, maxPrice, searchTerm],

    queryFn: () => {
      console.log('🔄 useQuery - ejecutando queryFn'); // Debug
      return fetchProducts({
        page: currentPage,
        limit: PRODUCTS_PER_PAGE,
        category: activeCategory || undefined, // Enviamos la categoría si existe
        targetGender: activeTargetGender || undefined, // Enviamos el género si existe
        brand: activeBrand || undefined,
        minPrice: minPrice ?? undefined,
        maxPrice: maxPrice ?? undefined,
        search: searchTerm || undefined, // Enviamos el término de búsqueda si existe
      });
    },

    // Anular configuración global para forzar búsqueda
    refetchOnWindowFocus: false,
    staleTime: 0, // Inmediatamente stale
    gcTime: 0, // No guardar cache
    enabled: true,
    refetchOnMount: 'always', // Siempre refrescar al montar
    // Desactivar placeholder para forzar fresh data
  });

  return {
    products: data?.products || [],
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
    activeBrand,
    setActiveBrand,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,

    error,
  };
};