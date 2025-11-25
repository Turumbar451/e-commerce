import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useProductFormContext } from '../../context/ProductFormContext';
import { Button } from '@/components/ui/button';
import { PlusCircle, Trash2 } from 'lucide-react';
import { Separator } from '@radix-ui/react-dropdown-menu';

export const ProductDetailsCard = () => {
  const {
    product,
    handleBaseChange,
    addDetail,
    removeDetail,
    handleDetailChange,
    setTargetGender,
  } = useProductFormContext();
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
        {/* Género objetivo */}
        <div className="space-y-2">
          <Label>Público objetivo</Label>
          <div className="flex gap-2">
            <Button
              type="button"
              variant={product.targetGender === 'H' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTargetGender('H')}
            >
              Hombres
            </Button>
            <Button
              type="button"
              variant={product.targetGender === 'M' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTargetGender('M')}
            >
              Mujeres
            </Button>
            <Button
              type="button"
              variant={product.targetGender === 'N' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTargetGender('N')}
            >
              Niños
            </Button>
          </div>
        </div>
        <Separator className="my-6" />

        <div className="space-y-3">
          <Label className="text-base font-medium">
            Detalles Adicionales (material superior, suela, tecnologia, tipo de
            ciere)
          </Label>
          {product.details?.map((detail, index) => (
            <div key={index} className="flex items-center gap-2">
              <Input
                name="title"
                value={detail.title}
                onChange={(e) => handleDetailChange(index, e)}
                placeholder="Título (Ej: Suela)"
                className="w-1/3" // El título es más corto
              />
              <Input
                name="content"
                value={detail.content}
                onChange={(e) => handleDetailChange(index, e)}
                placeholder="Contenido (Ej: Goma de alta tracción)"
                className="w-2/3" // El contenido es más largo
              />

              {/* Solo mostrar el botón de borrar si hay más de 1 */}
              {(product.details?.length || 0) > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="text-destructive shrink-0"
                  onClick={() => removeDetail(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
          {/* Botón para añadir una nueva fila de "detalle" */}
          <Button
            type="button"
            variant="secondary"
            size="sm"
            className="w-full"
            onClick={addDetail}
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Agregar Detalle
          </Button>
        </div>
        {/* --- FIN DE SECCIÓN NUEVA --- */}
      </CardContent>
    </Card>
  );
};
