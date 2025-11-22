import { Link } from 'react-router';
import { Heart, ShoppingCart } from 'lucide-react';

import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import { type IProductForCard } from '@/interfaces/product';

// nuevos hooks separados
import { useProductCart } from './hooks/useProductCart';
import { useProductFavorites } from './hooks/useProductFavorites';

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
  // lógica del carrito
  const { handleCartClick, isAddingItem } = useProductCart(product.sku);

  // lógica de favoritos
  const { isFavorite, handleFavoriteClick } = useProductFavorites(product.sku);

  return (
    <Link to={`/product/${product.id}`} className="group block">
      <Card className="border-none shadow-none rounded-lg overflow-hidden bg-transparent">
        <CardContent className="p-0 relative">
          {/* Imagen */}
          <div className="aspect-square w-full overflow-hidden bg-gray-100">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          {/* Botón Favoritos */}
          <button
            onClick={handleFavoriteClick}
            className="cursor-pointer absolute top-3 right-3 p-2 bg-background rounded-full shadow-md text-muted-foreground hover:text-red-500 hover:bg-secondary transition-colors"
            aria-label={isFavorite ? "Eliminar de favoritos" : "Añadir a favoritos"}
          >
            <Heart
              className="w-5 h-5"
              fill={isFavorite ? 'currentColor' : 'none'}
            />
          </button>
        </CardContent>

        <CardFooter className="flex flex-col items-start p-4 pt-3">
          <span className="text-sm uppercase font-semibold text-gray-500 tracking-wider">
            {product.brand}
          </span>
          
          <h3 className="font-medium text-base text-gray-800 mt-1">
            {product.name}
          </h3>
          
          <p className="font-bold text-lg text-gray-900 mt-1">
            {formatCurrency(product.price)}
          </p>

          {/* Botón Carrito */}
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
    </Link>
  );
};