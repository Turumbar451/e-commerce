import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { useAuthenticatedAction } from '@/hooks/useAuthenticatedAction';
import { type IProductForCard } from '@/interfaces/product';
import { Heart, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Hooks de nuestras features
import { useCart } from '@/features/cart/hooks/useCart';
import { useFavorites } from '@/features/favorites/hooks/useFavorites';

// Formateador de moneda
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
  }).format(value);
};

interface ProductCardProps {
  product: IProductForCard;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  // --- Hooks ---
  const { performAuthenticatedAction } = useAuthenticatedAction();
  const { addItem, isAddingItem } = useCart();
  const { favoriteSKUs, addFavorite, removeFavorite } = useFavorites();

  const sku = product.id; // <-- ESTO DEBE SER UN SKU REAL A FUTURO
  
  const isFavorite = favoriteSKUs.includes(sku);

  // --- Handlers de Favoritos ---
  const handleAddOrRemoveFavorite = () => {
    if (isFavorite) {
      removeFavorite(sku);
    } else {
      addFavorite(sku);
    }
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault(); 
    performAuthenticatedAction(
      handleAddOrRemoveFavorite,
      'Inicia sesión para guardar favoritos'
    );
  };

  // --- Handlers de Carrito ---
  const handleAddToCart = () => {
    // Usamos el hook 'useCart', que ya maneja los toasts de éxito/error
    addItem({ sku: sku, cantidad: 1 }); 
  };

  const handleCartClick = (e: React.MouseEvent) => {
    e.preventDefault(); 
    performAuthenticatedAction(
      handleAddToCart,
      'Inicia sesión para añadir al carrito'
    );
  };

  // --- Renderizado ---
  return (
    // La tarjeta entera es un link a la pagina de detalle del producto
    <a href={`/product/${product.id}`} className="group block">
      <Card className="border-none shadow-none rounded-lg overflow-hidden bg-transparent">
        <CardContent className="p-0 relative">
          {/* imagen del Producto */}
          <div className="aspect-square w-full overflow-hidden bg-gray-100">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          {/* favoritos boton */}
          <button
            onClick={handleFavoriteClick}
            className=" cursor-pointer absolute top-3 right-3 p-2 bg-background rounded-full shadow-md text-muted-foreground hover:text-red-500 hover:bg-secondary transition-colors"
            aria-label="Añadir a favoritos"
          >
            <Heart 
              className="w-5 h-5" 
              fill={isFavorite ? 'currentColor' : 'none'}
            />
          </button>
        </CardContent>

        <CardFooter className="flex flex-col items-start p-4 pt-3">
          {/* marca */}
          <span className="text-sm uppercase font-semibold text-gray-500 tracking-wider">
            {product.brand}
          </span>

          {/* nombre del producto */}
          <h3 className="font-medium text-base text-gray-800 mt-1">
            {product.name}
          </h3>

          {/* Precio */}
          <p className="font-bold text-lg text-gray-900 mt-1">
            {formatCurrency(product.price)}
          </p>

          {/* Botón de Carrito */}
          <Button 
            variant="outline" 
            className="w-full mt-2" 
            onClick={handleCartClick}
            disabled={isAddingItem}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            {isAddingItem ? 'Añadiendo...' : 'Añadir al carrito'}
          </Button>
        </CardFooter>
      </Card>
    </a>
  );
};