import { Button } from '@/components/ui/button';
import { DialogHeader } from '@/components/ui/dialog';
import type { IProductDetail, IProductVariant } from '@/interfaces/product';
import { formatCurrency } from '@/lib/formatters';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@radix-ui/react-dialog';
import { RadioGroup, RadioGroupItem } from '@radix-ui/react-radio-group';
import { ToggleGroup, ToggleGroupItem } from '@radix-ui/react-toggle-group';
import { Heart, Ruler, Star } from 'lucide-react';
import { toast } from 'sonner';

// subcomponente: informacion y accion (buy box)
interface ProductInfoProps {
  product: IProductDetail;
  selectedVariant: IProductVariant;
  onVariantChange: (variant: IProductVariant) => void;
  selectedSize: string | null;
  onSizeChange: (size: string | null) => void;
}

export const ProductInfoActions = ({
  product,
  selectedVariant,
  onVariantChange,
  selectedSize,
  onSizeChange,
}: ProductInfoProps) => {
  // logica para añadir al carrito
  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error('Por favor, selecciona una talla.');
      return;
    }
    // hook useCart y tanstack
    // const { addItem } = useCart();
    // addItem({ sku: selectedVariant.sku, size: selectedSize, quantity: 1 }); o algo asi nose
    console.log('Añadiendo al carrito:', {
      sku: selectedVariant.sku,
      color: selectedVariant.colorName,
      size: selectedSize,
    });
    toast.success('¡Añadido al carrito!');
  };

  // añadir a favoritos
  const handleAddFavorite = () => {
    // mutacion de favoritos, añadir
    console.log('Añadiendo a favoritos:', product._id);
    toast.info('Añadido a favoritos (simulado)');
  };

  return (
    <div className="flex flex-col space-y-4">
      {/* informacion basica */}
      <p className="text-sm uppercase text-muted-foreground">{product.brand}</p>
      <h1 className="text-3xl font-bold tracking-tight">{product.name}</h1>
      <div className="flex items-center space-x-2">
        {product.salePrice ? (
          <>
            <p className="text-2xl font-semibold">
              {formatCurrency(product.salePrice)}
            </p>
            <p className="text-lg text-muted-foreground line-through">
              {formatCurrency(product.price)}
            </p>
          </>
        ) : (
          <p className="text-2xl font-semibold">
            {formatCurrency(product.price)}
          </p>
        )}
      </div>
      <div className="flex items-center gap-1">
        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
        <span className="font-medium">{product.reviews.averageRating}</span>
        <span className="text-sm text-muted-foreground">
          ({product.reviews.reviewCount} reseñas)
        </span>
      </div>

      {/* selector de color */}
      <div>
        <h3 className="text-sm font-medium">
          Color:{' '}
          <span className="text-muted-foreground">
            {selectedVariant.colorName}
          </span>
        </h3>
        <RadioGroup
          value={selectedVariant.sku}
          onValueChange={(sku) => {
            const newVariant = product.variants.find((v) => v.sku === sku);
            if (newVariant) onVariantChange(newVariant);
          }}
          className="mt-2 flex space-x-2"
        >
          {product.variants.map((variant) => (
            <RadioGroupItem
              key={variant.sku}
              value={variant.sku}
              id={variant.sku}
              className="h-8 w-8 rounded-full border-2 p-0"
              style={{ backgroundColor: variant.colorHex || 'gray' }}
              aria-label={variant.colorName}
            />
          ))}
        </RadioGroup>
      </div>

      {/* selector de talla */}
      <div>
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium">Selecciona tu talla</h3>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="link" size="sm" className="p-0">
                <Ruler className="mr-1 h-4 w-4" />
                Guía de tallas
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Guía de Tallas</DialogTitle>
              </DialogHeader>
              <p>Aquí iría tu contenido de guía de tallas...</p>
            </DialogContent>
          </Dialog>
        </div>

        <ToggleGroup
          type="single"
          value={selectedSize || ''}
          onValueChange={(value) => onSizeChange(value || null)} // permite deseleccionar
          className="mt-2 grid grid-cols-4 gap-2"
        >
          {selectedVariant.sizes.map((sizeInfo) => (
            <ToggleGroupItem
              key={sizeInfo.size}
              value={sizeInfo.size}
              disabled={sizeInfo.stock === 0}
              className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
            >
              {sizeInfo.size}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>

      {/* acciones */}
      <Button size="lg" onClick={handleAddToCart} disabled={!selectedSize}>
        {/* añadir item del useCArt tal vez */}
        {selectedSize ? 'Añadir al carrito' : 'Selecciona una talla'}
      </Button>
      <Button size="lg" variant="outline" onClick={handleAddFavorite}>
        <Heart className="mr-2 h-4 w-4" />
        Añadir a favoritos
      </Button>
    </div>
  );
};
