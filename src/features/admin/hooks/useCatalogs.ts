import { useQuery } from '@tanstack/react-query';
import { getBrands, getCategories, type IBrand, type ICategory } from '@/services/catalogService';

export const useBrands = () => {
  return useQuery<IBrand[], Error>({
    queryKey: ['brands'],
    queryFn: getBrands,
    staleTime: 1000 * 60 * 5,
  });
};

export const useCategories = () => {
  return useQuery<ICategory[], Error>({
    queryKey: ['categories'],
    queryFn: getCategories,
    staleTime: 1000 * 60 * 5,
  });
};
