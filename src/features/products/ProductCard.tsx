import { Link } from 'react-router';

import { Heart,  Truck } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { type IProductForCard } from '@/interfaces/product';
import { useProductFavorites } from './hooks/useProductFavorites';
import { cn } from '@/lib/utils';

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

  const { isFavorite, handleFavoriteClick } = useProductFavorites(product.id);
  return (
    <Link to={`/product/${product.id}`} className="group block h-full">
      <Card className="h-full p-0 gap-0 border border-transparent hover:border-border/50 shadow-none hover:shadow-md transition-all duration-300 bg-card rounded-xl overflow-hidden flex flex-col">
        <div className="relative aspect-4/5 w-full bg-secondary/10 overflow-hidden">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />

          <Button
            onClick={handleFavoriteClick}
            className={cn(
              'absolute top-3 right-3 p-2.5 rounded-full transition-all duration-200 z-10',
              'bg-background/80 backdrop-blur-sm shadow-sm hover:scale-110',
              isFavorite
                ? 'text-red-500'
                : 'text-muted-foreground hover:text-red-500'
            )}
          >
            <Heart
              className={cn(
                'w-5 h-5 transition-colors',
                isFavorite ? 'fill-current' : 'fill-transparent'
              )}
            />

          </Button>

          <div className="absolute bottom-3 left-3">
            <span className="bg-background/90 backdrop-blur-sm text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider text-foreground shadow-sm flex items-center gap-1">
              <Truck className="w-3 h-3" /> Envío rápido
            </span>
          </div>
        </div>

        <CardContent className="flex flex-col items-start p-4 gap-2 grow w-full">
          <div className="w-full space-y-1">
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide">
              {product.brand}
            </p>
            <h3 className="font-medium text-sm text-foreground leading-snug line-clamp-2 group-hover:underline underline-offset-4 decoration-primary/50 min-h-10">
              {product.name}
            </h3>
          </div>

          <div className="w-full pt-3 border-t border-border/50 mt-auto flex items-end justify-between">
            <div className="flex flex-col">
              <span className="text-[10px] text-muted-foreground uppercase">
                Precio
              </span>
              <p className="font-bold text-lg text-primary">
                {formatCurrency(product.price)}
              </p>
            </div>

            <div className="flex items-center gap-1 text-xs text-muted-foreground font-medium group-hover:text-primary transition-colors">
              Ver detalles &rarr;
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};