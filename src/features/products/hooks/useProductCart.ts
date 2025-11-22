import { useCart } from '@/features/cart/hooks/useCart';
import { useAuthenticatedAction } from '@/hooks/useAuthenticatedAction';

export const useProductCart = (sku: string, cantidad: number = 1) => {
  const { performAuthenticatedAction } = useAuthenticatedAction();
  const { addItem, isAddingItem } = useCart();

  const handleAddToCartAction = () => {
    addItem({ sku, cantidad });
  };

  const handleCartClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Evita la navegación del Link
    e.stopPropagation(); // Buena práctica para evitar conflictos
    
    performAuthenticatedAction(
      handleAddToCartAction,
      'Inicia sesión para añadir al carrito'
    );
  };

  return {
    handleCartClick,
    isAddingItem,
  };
};