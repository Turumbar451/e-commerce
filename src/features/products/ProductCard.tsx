import { Link } from 'react-router';
import { Heart, ShoppingCart } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { type IProductForCard } from '@/interfaces/product';
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
  const { handleCartClick, isAddingItem } = useProductCart(
    product.id, 
    product.sku, 
    null
  );
  
  const { isFavorite, handleFavoriteClick } = useProductFavorites(product.id);

  return (
    <Link to={`/product/${product.id}`} className="group block">
      <Card className="border-none shadow-none rounded-lg overflow-hidden bg-transparent">
        <CardContent className="p-0 relative">
          <div className="aspect-square w-full overflow-hidden rounded-lg bg-secondary/50">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          {/* Botón Favoritos */}
          <button
            onClick={handleFavoriteClick}
            className="cursor-pointer absolute top-3 right-3 p-2 bg-background/90 backdrop-blur-sm rounded-full shadow-sm text-muted-foreground hover:text-red-500 hover:bg-muted transition-colors"
            aria-label={
              isFavorite ? 'Eliminar de favoritos' : 'Añadir a favoritos'
            }
          >
            <Heart
              className="w-5 h-5"
              fill={isFavorite ? 'currentColor' : 'none'}
              // Si es favorito, forzamos el color rojo, si no, hereda el muted-foreground
              color={isFavorite ? '#ef4444' : 'currentColor'}
            />
          </button>
        </CardContent>

        <CardFooter className="flex flex-col items-start p-4 pt-3">
          <span className="text-sm uppercase font-semibold text-muted-foreground tracking-wider">
            {product.brand}
          </span>

          <h3 className="font-medium text-base text-foreground mt-1 line-clamp-1">
            {product.name}
          </h3>

          <p className="font-bold text-lg text-foreground mt-1">
            {formatCurrency(product.price)}
          </p>

          <Button
            variant="outline"
            className="w-full mt-2 hover:bg-primary hover:text-primary-foreground transition-colors"
            onClick={handleCartClick} // Esto ahora redirigirá al detalle
            disabled={isAddingItem}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            {/* Cambiamos el texto para que tenga más sentido UX */}
            {isAddingItem ? 'Añadiendo...' : 'Ver opciones'} 
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
};