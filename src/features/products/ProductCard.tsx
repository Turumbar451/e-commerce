import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Heart, Link, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { IProductForCard } from '@/interfaces/product';
import { useProductCard } from './hooks/useProductCard';
import { formatCurrency } from '@/lib/formatters';

interface ProductCardProps {
  product: IProductForCard;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  // toda la logica
  const { isAddingItem, handleFavoriteClick, handleCartClick } =
    useProductCard(product);

  return (
    <Link to={`/product/${product.id}`} className="group block">
      <Card className="border-none shadow-none rounded-lg overflow-hidden bg-transparent">
        <CardContent className="p-0 relative">
          {/* imagen del producto */}
          <div className="aspect-square w-full overflow-hidden bg-gray-100">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          {/* favoritos boton */}
          <button
            onClick={handleFavoriteClick} // <-- Handler limpio
            className="cursor-pointer absolute top-3 right-3 p-2 bg-background rounded-full shadow-md text-muted-foreground hover:text-red-500 hover:bg-secondary transition-colors"
            aria-label="Añadir a favoritos"
          >
            <Heart className="w-5 h-5" />
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
            {formatCurrency(product.price)} {/* <-- Función importada */}
          </p>

          <Button
            variant="outline"
            className="w-full mt-2"
            onClick={handleCartClick} // <-- Handler limpio
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
