import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { ImageUp, PlusCircle, Trash2 } from 'lucide-react';

export const ProductForm = () => {
  return (
    <form className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Columna Izquierda: Detalles y Variantes */}
      <div className="lg:col-span-2 space-y-6">
        {/* Detalles Básicos */}
        <Card>
          <CardHeader>
            <CardTitle>Detalles del Producto</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre del Producto</Label>
              <Input
                id="name"
                placeholder="Ej: Botas de Montaña Impermeables"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                placeholder="Conquista cualquier sendero..."
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="brand">Marca</Label>
                <Input id="brand" placeholder="Ej: AventuraPro" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Categoría</Label>
                <Input id="category" placeholder="Ej: Calzado" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Carga de Imágenes */}
        <Card>
          <CardHeader>
            <CardTitle>Imágenes</CardTitle>
          </CardHeader>
          <CardContent>
            {/* TODO: Crear un componente dropzone aquí */}
            <div className="border-2 border-dashed border-muted rounded-lg p-12 flex flex-col items-center justify-center text-center">
              <ImageUp className="h-12 w-12 text-muted-foreground" />
              <p className="mt-2 text-sm text-muted-foreground">
                Arrastra tus imágenes aquí o haz clic para subirlas
              </p>
              <Button variant="outline" className="mt-4">
                Adjuntar Archivos
              </Button>
            </div>
            {/* Aquí se mostrarían las imágenes subidas */}
          </CardContent>
        </Card>

        {/* Variantes (SKUs, Tallas, Stock) */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Variantes, Tallas y Stock</CardTitle>
            <Button variant="outline" size="sm">
              <PlusCircle className="mr-2 h-4 w-4" />
              Agregar Variante
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Esta sección se renderizaría por cada variante */}
            <div className="border rounded-md p-4 space-y-3">
              <div className="flex justify-between items-center">
                <Label className="text-base">Variante 1 (Color)</Label>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <Input placeholder="Nombre (Ej: Marrón Coyote)" />
                <Input placeholder="SKU (Ej: AP-BOTA-COY-01)" />
                <Input type="color" placeholder="Hex (Ej: #8D6E63)" />
              </div>
              <Separator />
              <Label>Tallas y Stock de esta variante</Label>
              {/* Esto se renderizaría por cada talla */}
              <div className="flex items-center gap-2">
                <Input placeholder="Talla (Ej: 27 MX)" className="w-1/2" />
                <Input type="number" placeholder="Stock" className="w-1/2" />
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <Button variant="secondary" size="sm" className="w-full">
                <PlusCircle className="mr-2 h-4 w-4" />
                Agregar Talla
              </Button>
            </div>
            {/* Fin de la sección de variante */}
          </CardContent>
        </Card>
      </div>

      {/* Columna Derecha: Precio y Estado */}
      <div className="lg:col-span-1 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Precio</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="price">Precio Base (MXN)</Label>
              <Input id="price" type="number" placeholder="2899.00" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="salePrice">Precio de Oferta (Opcional)</Label>
              <Input id="salePrice" type="number" placeholder="2499.00" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Estado</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="onSale">Marcar como "En Oferta"</Label>
              <Switch id="onSale" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="isFeatured">Marcar como "Destacado"</Label>
              <Switch id="isFeatured" />
            </div>
          </CardContent>
        </Card>

        <Button size="lg" className="w-full">
          Guardar Producto
        </Button>
      </div>
    </form>
  );
};
