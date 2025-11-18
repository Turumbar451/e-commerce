// solo del precio
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useProductFormContext } from '../../context/ProductFormContext';

export const ProductPricingCard = () => {
  const { product, handleBaseChange } = useProductFormContext();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Precio</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="price">Precio Base (MXN)</Label>
          <Input
            id="price"
            name="price"
            type="number"
            value={product.price}
            onChange={handleBaseChange}
            placeholder="2899.00"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="salePrice">Precio de Oferta (Opcional)</Label>
          <Input
            id="salePrice"
            name="salePrice"
            type="number"
            value={product.salePrice || ''}
            onChange={handleBaseChange}
            placeholder="2499.00"
          />
        </div>
      </CardContent>
    </Card>
  );
};
