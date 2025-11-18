import { useState } from 'react';
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { getProductById } from '@/services/productService';
import type { IProductVariant } from '@/interfaces/product';

export const useProductDetail = () => {
  // obtener ID
  const { productId } = useParams<{ productId: string }>();

  // 2. OBTENER DATOS (TanStack Query)
  const {
    data: product,
    isLoading,
    isError, //?(true o false)
    error, //?el error, el tipo de error
  } = useQuery({
    queryKey: ['product', productId], // clave de cache unica
    queryFn: () => getProductById(productId!), // llamar a servicio, esa funcion espera una promesa
    enabled: !!productId, // no ejecutar si no hauy id
  });

  // estados locales de la UI
  const [userSelectedVariant, setUserSelectedVariant] =
    useState<IProductVariant | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  //la variante por default
  const activeVariant =
    userSelectedVariant || (product?.variants?.[0] || null);

  // manejador de cambio de variante
  const handleVariantChange = (variant: IProductVariant) => {
    setUserSelectedVariant(variant); // el usuario elige
    setSelectedSize(null); // resetea la talla
  };

  return {
    product,
    isLoading,
    isError,
    error,
    activeVariant,
    selectedSize,
    onVariantChange: handleVariantChange,
    onSizeChange: setSelectedSize,
  };
};