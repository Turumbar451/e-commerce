import { useQuery } from '@tanstack/react-query';
import { getProductById } from '@/services/productService';
import type { IProductDetail, IProductVariant } from '@/interfaces/product';

export const usePosProductDetail = (productId: string | null) => {
  const { data, isLoading, isError, error } = useQuery<IProductDetail | undefined, Error>({
    queryKey: ['pos-product-detail', productId],
    queryFn: () => (productId ? getProductById(productId) : Promise.resolve(undefined)),
    enabled: !!productId,
  });

  const product = data;

  const defaultVariant: IProductVariant | null =
    product?.variants?.[0] || null;

  return {
    product,
    defaultVariant,
    isLoading,
    isError,
    error,
  };
};
