import { useAuthenticatedAction } from '@/hooks/useAuthenticatedAction';
import { useCart } from '@/features/cart/hooks/useCart';
import { toast } from 'sonner';
import type { IProductForCard } from '@/interfaces/product';

//este hook solo recibe un producto, se encargara de toda la logica de la tarjeta
export const useProductCard = (product: IProductForCard) => {
    const { performAuthenticatedAction } = useAuthenticatedAction();
    const { addItem, isAddingItem } = useCart();

    // logica para favoritos
    const handleAddFavoriteLogic = () => {
        //! aqui ira tanstack query
        console.log('Añadiendo a favoritos:', product.id);
        toast.success('¡Añadido a favoritos!');
    };

    const handleFavoriteClick = (e: React.MouseEvent) => {
        e.preventDefault(); // Evita la navegación del <Link> padre
        performAuthenticatedAction(
            handleAddFavoriteLogic,
            'Inicia sesión para guardar favoritos'
        );
    };

    // logica de carrito
    const handleAddToCartLogic = () => {
        // NOTA: ¡Asegúrate de usar el SKU real!
        const skuSeleccionado = product.id; // <-- CAMBIA ESTO por el SKU real
        addItem({ sku: skuSeleccionado, cantidad: 1 });
    };

    const handleCartClick = (e: React.MouseEvent) => {
        e.preventDefault(); //evitar recarga
        performAuthenticatedAction(
            handleAddToCartLogic,
            'Inicia sesión para añadir al carrito'
        );
    };

    return {
        isAddingItem,
        handleFavoriteClick,
        handleCartClick,
    };
};