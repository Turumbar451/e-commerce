import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { useCart } from '@/features/cart/hooks/useCart';
import { useAuthenticatedAction } from '@/hooks/useAuthenticatedAction';

export const useProductCart = (
  productId: string, 
  sku: string, 
  size?: string | null, 
  cantidad: number = 1
) => {
  const { performAuthenticatedAction } = useAuthenticatedAction();
  const { addItem, isAddingItem } = useCart();
  const navigate = useNavigate();

  const handleAddToCartAction = () => {
    // Doble validación por seguridad
    if (!size) {
      toast.info("Por favor selecciona una talla primero.");
      navigate(`/product/${productId}`);
      return;
    }

    addItem({ 
      sku, 
      size, // Ahora sí enviamos la talla
      cantidad 
    });
  };

  const handleCartClick = (e: React.MouseEvent) => {
    e.preventDefault(); 
    e.stopPropagation(); 
    
    // Si no hay talla (caso ProductCard), redirigimos al detalle
    if (!size) {
        // Opcional: Puedes quitar el toast si prefieres que solo navegue
        toast.info("Elige una talla para agregar al carrito");
        navigate(`/product/${productId}`);
        return;
    }

    // Si hay talla, procedemos con la lógica de autenticación y compra
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