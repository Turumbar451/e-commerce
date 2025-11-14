import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useProductFormContext } from '../../context/ProductFormContext';

export const ProductDetailsCard = () => {
  const { product, handleBaseChange } = useProductFormContext();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Detalles del Producto</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nombre del Producto</Label>
          <Input
            id="name"
            name="name"
            value={product.name}
            onChange={handleBaseChange}
            placeholder="Ej: Botas de Montaña Impermeables"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Descripción</Label>
          <Textarea
            id="description"
            name="description"
            value={product.description}
            onChange={handleBaseChange}
            placeholder="Conquista cualquier sendero..."
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="brand">Marca</Label>
            <Input
              id="brand"
              name="brand"
              value={product.brand}
              onChange={handleBaseChange}
              placeholder="Ej: AventuraPro"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Categoría</Label>
            <Input
              id="category"
              name="category"
              value={product.category}
              onChange={handleBaseChange}
              placeholder="Ej: Calzado"
              required
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
