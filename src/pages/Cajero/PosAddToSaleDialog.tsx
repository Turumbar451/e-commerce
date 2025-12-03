import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import type { IProductForCard, IProductVariant } from '@/interfaces/product';
import { usePosProductDetail } from '@/features/pos/hooks/usePosProductDetail';
import { ToggleGroup, ToggleGroupItem } from '@radix-ui/react-toggle-group';
import { RadioGroup, RadioGroupItem } from '@radix-ui/react-radio-group';

interface PosAddToSaleDialogProps {
  product: IProductForCard;
  onAdd: (item: {
    productId: string;
    sku: string;
    name: string;
    brand: string;
    price: number;
    size: string;
    imageUrl?: string;
  }) => void;
}

export const PosAddToSaleDialog = ({ product, onAdd }: PosAddToSaleDialogProps) => {
  const [open, setOpen] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<IProductVariant | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const { product: detail, defaultVariant, isLoading } = usePosProductDetail(product.id);

  const activeVariant = selectedVariant || defaultVariant;

  const handleConfirm = () => {
    if (!detail || !activeVariant || !selectedSize) return;

    const fallbackImage = product.imageUrl;
    const variantImage = activeVariant.images?.[0] ?? detail.variants[0]?.images?.[0];
    const imageUrl = variantImage || fallbackImage;

    // usamos el sku de la variante y el precio base del producto
    onAdd({
      productId: detail._id,
      sku: activeVariant.sku,
      name: detail.name,
      brand: detail.brand,
      price: detail.salePrice ?? detail.price,
      imageUrl,
      size: selectedSize,
    });
    setOpen(false);
    setSelectedSize(null);
    setSelectedVariant(null);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="button" className="mt-auto w-full" variant="secondary">
          Agregar a venta
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Seleccionar talla para {product.name}</DialogTitle>
        </DialogHeader>
        {isLoading && <p className="text-sm text-muted-foreground">Cargando tallas...</p>}
        {!isLoading && detail && activeVariant && (
          <div className="space-y-4 mt-2">
            <div>
              <p className="text-sm font-medium">Color</p>
              <RadioGroup
                value={activeVariant.sku}
                onValueChange={(sku) => {
                  const v = detail.variants.find((vv) => vv.sku === sku);
                  if (v) {
                    setSelectedVariant(v);
                    setSelectedSize(null);
                  }
                }}
                className="mt-2 flex flex-wrap gap-2"
              >
                {detail.variants.map((variant) => (
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

            <div>
              <p className="text-sm font-medium">Talla (stock)</p>
              <ToggleGroup
                type="single"
                value={selectedSize || ''}
                onValueChange={(value) => setSelectedSize(value || null)}
                className="mt-2 grid grid-cols-4 gap-2"
              >
                {activeVariant.sizes.map((sizeInfo) => (
                  <ToggleGroupItem
                    key={sizeInfo.size}
                    value={sizeInfo.size}
                    disabled={sizeInfo.stock === 0}
                    className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground text-xs flex flex-col items-center justify-center"
                  >
                    <span>{sizeInfo.size}</span>
                    <span className="text-[10px] text-muted-foreground">
                      {sizeInfo.stock} en stock
                    </span>
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" type="button" onClick={() => setOpen(false)}>
                Cancelar
              </Button>
              <Button type="button" disabled={!selectedSize} onClick={handleConfirm}>
                Añadir a venta
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
