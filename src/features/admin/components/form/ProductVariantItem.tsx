//una sola variante, sus tallas e imágenes.
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Spinner } from '@/components/ui/spinner';
import { ImageUp, PlusCircle, Trash2 } from 'lucide-react';
import { useProductFormContext } from '../../context/ProductFormContext';

interface Props {
  variantIndex: number;
}

export const ProductVariantItem = ({ variantIndex }: Props) => {
  const {
    product,
    isUploading,
    removeVariant,
    handleVariantChange,
    addSize,
    removeSize,
    handleSizeChange,
    handleImageUpload,
  } = useProductFormContext();

  const variant = product.variants?.[variantIndex];
  if (!variant) return null; // por si acaso

  return (
    <div className="border rounded-md p-4 space-y-3">
      <div className="flex justify-between items-center">
        <Label className="text-base">Variante {variantIndex + 1}</Label>
        {(product.variants?.length || 0) > 1 && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="text-destructive"
            onClick={() => removeVariant(variantIndex)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input
          name="colorName"
          value={variant.colorName}
          onChange={(e) => handleVariantChange(variantIndex, e)}
          placeholder="Nombre (Ej: Marrón Coyote)"
          required
        />

        <Input
          name="colorHex"
          value={variant.colorHex}
          onChange={(e) => handleVariantChange(variantIndex, e)}
          placeholder="Hex (Ej: #8D6E63)"
        />
      </div>

      <Label>Imágenes de esta variante</Label>
      <div className="border-2 border-dashed border-muted rounded-lg p-6 flex flex-col items-center justify-center text-center">
        <ImageUp className="h-8 w-8 text-muted-foreground" />
        <Input
          type="file"
          multiple
          className="mt-2"
          onChange={(e) => handleImageUpload(variantIndex, e.target.files)}
          disabled={isUploading}
        />
      </div>
      <div className="flex gap-2 flex-wrap">
        {variant.images.map((imgUrl, imgIndex) => (
          <img
            key={imgIndex}
            src={imgUrl}
            alt={`preview ${imgIndex}`}
            className="h-20 w-20 object-cover rounded-md border"
          />
        ))}
        {isUploading && <Spinner />}
      </div>

      <Separator />
      <Label>Tallas y Stock</Label>
      {variant.sizes.map((size, sIndex) => (
        <div key={sIndex} className="flex items-center gap-2">
          <Input
            name="size"
            value={size.size}
            onChange={(e) => handleSizeChange(variantIndex, sIndex, e)}
            placeholder="Talla (Ej: 27 MX)"
            className="w-1/2"
            required
          />
          <Input
            name="stock"
            type="number"
            value={size.stock}
            onChange={(e) => handleSizeChange(variantIndex, sIndex, e)}
            placeholder="Stock"
            className="w-1/2"
            required
          />
          {variant.sizes.length > 1 && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="text-destructive"
              onClick={() => removeSize(variantIndex, sIndex)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      ))}
      <Button
        type="button"
        variant="secondary"
        size="sm"
        className="w-full"
        onClick={() => addSize(variantIndex)}
      >
        <PlusCircle className="mr-2 h-4 w-4" />
        Agregar Talla
      </Button>
    </div>
  );
};
