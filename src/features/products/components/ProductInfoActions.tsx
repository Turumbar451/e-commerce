import { useState } from 'react'; // 1. Importamos useState
import { Button } from '@/components/ui/button';
import { DialogHeader } from '@/components/ui/dialog';
import { useCart } from '@/features/cart/hooks/useCart';
import { useAuthenticatedAction } from '@/hooks/useAuthenticatedAction';
import type { IProductDetail, IProductVariant } from '@/interfaces/product';
import { formatCurrency } from '@/lib/formatters';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

// 2. Agregamos Minus y Plus a los iconos
import { Heart, Ruler, Star, Minus, Plus } from 'lucide-react';

import { toast } from 'sonner';
import { useProductFavorites } from '../hooks/useProductFavorites';

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
  const { addItem, isAddingItem } = useCart();
  const { performAuthenticatedAction } = useAuthenticatedAction();

  const { isFavorite, handleFavoriteClick } = useProductFavorites(product._id);

  // 3. Estado local para la cantidad
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () => setQuantity((prev) => Math.max(1, prev - 1));

  // Lógica para añadir al carrito

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error('Por favor, selecciona una talla.');
      return;
    }

    const addToCartLogic = () => {
      addItem({
        sku: selectedVariant.sku,

        size: selectedSize,
        cantidad: quantity, // 4. Usamos la cantidad seleccionada

      });
    };

    performAuthenticatedAction(
      addToCartLogic,
      'Inicia sesión para añadir al carrito'
    );
  };

  return (
    <div className="flex flex-col space-y-4">
      {/* Informacion basica */}
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

      {/* Selector de color */}
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
              className="h-8 w-8 rounded-full border-2 p-0 cursor-pointer"
              style={{ backgroundColor: variant.colorHex || 'gray' }}
              aria-label={variant.colorName}
            />
          ))}
        </RadioGroup>
      </div>

      {/* Selector de talla */}
      <div>
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium">Selecciona tu talla</h3>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="link" size="sm" className="p-0 text-muted-foreground">
                <Ruler className="mr-1 h-4 w-4" />
                Guía de tallas
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Guía de Tallas</DialogTitle>
              </DialogHeader>
              <div className="py-4 text-sm text-muted-foreground">
                <p>Aquí puedes colocar una tabla de medidas o instrucciones.</p>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <ToggleGroup
          type="single"
          value={selectedSize || ''}
          onValueChange={(value) => onSizeChange(value || null)}
          className="mt-2 grid grid-cols-4 gap-2"
        >
          {selectedVariant.sizes.map((sizeInfo) => (
            <ToggleGroupItem
              key={sizeInfo.size}
              value={sizeInfo.size}
              disabled={sizeInfo.stock === 0}

              className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground cursor-pointer"

            >
              {sizeInfo.size}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>


      {/* 5. Selector de Cantidad (NUEVO SECCIÓN) */}
      <div>
        <h3 className="text-sm font-medium mb-2">Cantidad</h3>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-md cursor-pointer"
            onClick={handleDecrement}
            disabled={quantity <= 1}
          >
            <Minus className="h-4 w-4" />
          </Button>
          
          <span className="font-semibold min-w-[2rem] text-center text-lg">
            {quantity}
          </span>

          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-md cursor-pointer"
            onClick={handleIncrement}
            // Opcional: Podrías deshabilitar si supera el stock disponible de la talla seleccionada
            // disabled={selectedSize && quantity >= stockDisponible}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Acciones */}
      <div className="flex gap-4 pt-2">
        <Button
          size="lg"
          className="flex-1 cursor-pointer"

          onClick={handleAddToCart}
          disabled={!selectedSize || isAddingItem}
        >
          {isAddingItem
            ? 'Añadiendo...'
            : selectedSize
            ? 'Añadir al carrito'
            : 'Selecciona una talla'}
        </Button>
        
        <Button 
          size="lg" 
          variant="outline" 
          onClick={handleFavoriteClick}

          className={`cursor-pointer ${isFavorite ? "text-red-500 border-red-200 bg-red-50 hover:bg-red-100" : ""}`}

        >
          <Heart 
            className="mr-2 h-4 w-4" 
            fill={isFavorite ? "currentColor" : "none"} 
          />
          {isFavorite ? 'Guardado' : 'Añadir a favoritos'}
        </Button>
      </div>
    </div>
  );
};