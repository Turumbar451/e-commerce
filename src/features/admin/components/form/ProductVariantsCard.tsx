import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { useProductFormContext } from '../../context/ProductFormContext';
import { ProductVariantItem } from './ProductVariantItem';

export const ProductVariantsCard = () => {
  const { product, addVariant } = useProductFormContext();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Variantes, Tallas y Stock</CardTitle>
        <Button type="button" variant="outline" size="sm" onClick={addVariant}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Agregar Variante
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {product.variants?.map((_, vIndex) => (
          //renderizado de cada variante
          <ProductVariantItem key={vIndex} variantIndex={vIndex} />
        ))}
      </CardContent>
    </Card>
  );
};
